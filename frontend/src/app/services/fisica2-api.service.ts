import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { CATEDRA_PDF_FILES, ORAL_COLLOQUIUM_QUESTIONS } from '../data/undec-catedra-data';
import { SPEED_DRILL_QUESTIONS } from '../data/speed-drill-data';
import { GuidedExercise, TheoryTopic } from '../types/fisica2';

export interface ProgramUnitDto {
  unitNumber: number;
  title: string;
  subtitle: string;
  parcialGroup: string;
  labId: string;
  progressTeoria: number;
  progressLaboratorio: number;
  progressPractico: number;
  progressPruebaDominio: number;
  certificationStatus: string;
}

export interface SpeedDrillQuestionDto {
  id: string;
  unitNumber: number;
  category: string;
  difficulty?: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleHint: string;
}

export interface TribunalCaseDto {
  unitNumber: number;
  unitTitle?: string;
  titularQuestion: string;
  jtpRepregunta: string;
  boardDrawingInstruction?: string;
  expectedFormula?: string;
  keyExpectedKeywords: string[];
  expectedConceptualPoints?: string[];
  mortalMistakeNote: string;
}

export interface RubricAxisDto {
  axisName: string;
  score: number;
  comment: string;
}

export interface TribunalResultDto {
  grade: string;
  score: number;
  feedback: string;
  expectedPoints: string[];
  missingPoints?: string[];
  rubricBreakdown?: RubricAxisDto[];
  triggeredMortalMistake?: boolean;
}

export interface StudentErrorDto {
  id?: number;
  unitNumber?: number;
  category: string;
  sourceContext: string;
  topicTitle: string;
  mistakeDescription: string;
  correctionExplanation: string;
  studentAnswer?: string;
  correctAnswer?: string;
  occurrences: number;
  resolved: boolean;
  createdAt?: string;
}

export interface PdfMetadataDto {
  filename: string;
  sizeBytes?: number;
  sizeKB?: number;
  pageCount?: number;
  category?: string;
  unitNumbers?: number[];
  authors?: string;
  description?: string;
}

const LOCAL_UNITS_KEY = 'fisica2_enterprise_units_v3';
const LOCAL_ERRORS_KEY = 'fisica2_enterprise_errors_v3';
const LOCAL_COMPLETED_ACTIVITIES_KEY = 'fisica2_enterprise_activities_v3';
const LOCAL_DYNAMIC_THEORY_KEY = 'fisica2_dynamic_theory_v1';
const LOCAL_DYNAMIC_EXERCISES_KEY = 'fisica2_dynamic_exercises_v1';

@Injectable({
  providedIn: 'root'
})
export class Fisica2ApiService {
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  private unitsSubject = new BehaviorSubject<ProgramUnitDto[]>(this.loadLocalUnits());
  public units$ = this.unitsSubject.asObservable();

  private errorsSubject = new BehaviorSubject<StudentErrorDto[]>(this.loadLocalErrors());
  public errors$ = this.errorsSubject.asObservable();

  private dynamicTheorySubject = new BehaviorSubject<TheoryTopic[]>(this.loadDynamicTheory());
  public dynamicTheory$ = this.dynamicTheorySubject.asObservable();

  private dynamicExercisesSubject = new BehaviorSubject<GuidedExercise[]>(this.loadDynamicExercises());
  public dynamicExercises$ = this.dynamicExercisesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ============================================================================
  // 1. UNIDADES Y MOTOR DE PROGRESO REAL PONDERADO (20% / 25% / 25% / 30%)
  // ============================================================================
  getUnits(): Observable<ProgramUnitDto[]> {
    return this.http.get<ProgramUnitDto[]>(`${this.baseUrl}/units`).pipe(
      tap((remoteUnits) => {
        if (remoteUnits && remoteUnits.length > 0) {
          this.saveLocalUnits(remoteUnits);
          this.unitsSubject.next(remoteUnits);
        }
      }),
      catchError(() => {
        const local = this.loadLocalUnits();
        this.unitsSubject.next(local);
        return of(local);
      })
    );
  }

  /**
   * Registra una actividad específica aprobada (evitando duplicar puntos por la misma actividad)
   * y actualiza el progreso de la etapa en el backend y en local.
   */
  recordVerifiedActivity(unitNumber: number, stage: 'teoria' | 'laboratorio' | 'practico' | 'pruebaDominio', activityId: string, amount: number): Observable<ProgramUnitDto> {
    const completedSet = this.getCompletedActivities();
    const key = `u${unitNumber}_${stage}_${activityId}`;
    if (!completedSet.includes(key)) {
      completedSet.push(key);
      localStorage.setItem(LOCAL_COMPLETED_ACTIVITIES_KEY, JSON.stringify(completedSet));
    }
    return this.boostUnitProgress(unitNumber, stage, amount);
  }

  isActivityCompleted(unitNumber: number, stage: string, activityId: string): boolean {
    const completedSet = this.getCompletedActivities();
    return completedSet.includes(`u${unitNumber}_${stage}_${activityId}`);
  }

  getCompletedActivities(): string[] {
    try {
      const raw = localStorage.getItem(LOCAL_COMPLETED_ACTIVITIES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  boostUnitProgress(unitNumber: number, stage: string, amount: number = 25): Observable<ProgramUnitDto> {
    return this.http.post<ProgramUnitDto>(`${this.baseUrl}/units/${unitNumber}/boost`, { stage, amount }).pipe(
      tap((updated) => {
        const current = [...this.unitsSubject.value];
        const idx = current.findIndex(u => u.unitNumber === updated.unitNumber);
        if (idx >= 0) {
          current[idx] = updated;
          this.saveLocalUnits(current);
          this.unitsSubject.next(current);
        }
      }),
      catchError(() => {
        const current = [...this.unitsSubject.value];
        const u = current.find(item => item.unitNumber === unitNumber) || current[0];
        if (u) {
          const st = stage.toLowerCase();
          if (st === 'teoria') u.progressTeoria = Math.min(100, u.progressTeoria + amount);
          if (st === 'laboratorio') u.progressLaboratorio = Math.min(100, u.progressLaboratorio + amount);
          if (st === 'practico') u.progressPractico = Math.min(100, u.progressPractico + amount);
          if (st === 'pruebadominio' || st === 'mcq' || st === 'oral') {
            u.progressPruebaDominio = Math.min(100, u.progressPruebaDominio + amount);
          }
          const pct = this.calculateUnitMastery(u);
          if (u.progressTeoria === 100 && u.progressLaboratorio === 100 && u.progressPractico === 100 && u.progressPruebaDominio === 100) {
            u.certificationStatus = 'certificado';
          } else if (pct > 0) {
            u.certificationStatus = 'en_progreso';
          }
          this.saveLocalUnits(current);
          this.unitsSubject.next(current);
        }
        return of(u);
      })
    );
  }

  resetAllProgress(): Observable<{ message: string }> {
    localStorage.removeItem(LOCAL_COMPLETED_ACTIVITIES_KEY);
    const freshUnits = this.getDefaultZeroUnits();
    this.saveLocalUnits(freshUnits);
    this.unitsSubject.next(freshUnits);

    return this.http.post<{ message: string }>(`${this.baseUrl}/units/reset`, {}).pipe(
      catchError(() => of({ message: 'Progreso reiniciado a 0% en modo local.' }))
    );
  }

  calculateUnitMastery(u: ProgramUnitDto): number {
    if (!u) return 0;
    return Math.round(
      0.20 * (u.progressTeoria || 0) +
      0.25 * (u.progressLaboratorio || 0) +
      0.25 * (u.progressPractico || 0) +
      0.30 * (u.progressPruebaDominio || 0)
    );
  }

  /**
   * Desbloqueo secuencial estricto al 100%:
   * - La Unidad 1 siempre está desbloqueada.
   * - La Unidad N (N > 1) solo se desbloquea cuando TODAS las unidades anteriores (1 .. N-1)
   *   tienen un dominio total del 100% (Teoría 100%, Laboratorio 100%, Práctico 100%, Prueba de Dominio 100%).
   */
  isUnitUnlocked(unitNumber: number, customUnits?: ProgramUnitDto[]): boolean {
    if (unitNumber <= 1) return true;
    const list = customUnits && customUnits.length ? customUnits : this.unitsSubject.value;
    if (!list || list.length === 0) return unitNumber === 1;

    for (let prevNum = 1; prevNum < unitNumber; prevNum++) {
      const prevUnit = list.find(u => u.unitNumber === prevNum);
      if (!prevUnit || this.calculateUnitMastery(prevUnit) < 100) {
        return false;
      }
    }
    return true;
  }

  getHighestUnlockedUnitNumber(customUnits?: ProgramUnitDto[]): number {
    const list = customUnits && customUnits.length ? customUnits : this.unitsSubject.value;
    let highest = 1;
    for (let num = 2; num <= 9; num++) {
      if (this.isUnitUnlocked(num, list)) {
        highest = num;
      } else {
        break;
      }
    }
    return highest;
  }

  // ============================================================================
  // 2. MUERTE SÚBITA Y FLASHCARDS (FILTRADO ESTRICTO A UNIDADES DESBLOQUEADAS)
  // ============================================================================
  getSpeedDrillRound(count: number = 24): Observable<SpeedDrillQuestionDto[]> {
    const maxUnlocked = this.getHighestUnlockedUnitNumber();
    const localUnlocked: SpeedDrillQuestionDto[] = SPEED_DRILL_QUESTIONS
      .filter(q => q.unitNumber <= maxUnlocked)
      .map(q => ({
        id: q.id,
        unitNumber: q.unitNumber,
        category: q.category,
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        ruleHint: q.ruleHint
      }));

    return this.http.get<SpeedDrillQuestionDto[]>(`${this.baseUrl}/speed-drill/round?count=50`).pipe(
      tap(() => {}),
      catchError(() => of([] as SpeedDrillQuestionDto[]))
    ).pipe(
      mapRemoteAndLocalUnlocked(localUnlocked, maxUnlocked, count, (arr) => this.shuffleArray(arr))
    );
  }

  // ============================================================================
  // 3. TRIBUNAL ORAL (LAS 9 UNIDADES COMPLETAS)
  // ============================================================================
  getTribunalCase(unitNumber: number): Observable<TribunalCaseDto> {
    return this.http.get<TribunalCaseDto>(`${this.baseUrl}/tribunal/${unitNumber}`).pipe(
      catchError(() => of(this.getOfflineTribunalCase(unitNumber)))
    );
  }

  evaluateOralDefense(unitNumber: number, initialDefense: string, followUpDefense: string): Observable<TribunalResultDto> {
    return this.http.post<TribunalResultDto>(`${this.baseUrl}/tribunal/${unitNumber}/evaluate`, {
      initialDefense,
      followUpDefense
    }).pipe(
      catchError(() => of(this.evaluateOfflineOralDefense(unitNumber, initialDefense, followUpDefense)))
    );
  }

  // ============================================================================
  // 4. TRACKER DE ERRORES (11 CATEGORÍAS)
  // ============================================================================
  getErrors(): Observable<StudentErrorDto[]> {
    return this.http.get<StudentErrorDto[]>(`${this.baseUrl}/errors`).pipe(
      tap((remoteErrors) => {
        if (remoteErrors) {
          this.saveLocalErrors(remoteErrors);
          this.errorsSubject.next(remoteErrors);
        }
      }),
      catchError(() => {
        const local = this.loadLocalErrors();
        this.errorsSubject.next(local);
        return of(local);
      })
    );
  }

  logError(error: Partial<StudentErrorDto>): Observable<StudentErrorDto> {
    const newErr: StudentErrorDto = {
      id: Date.now(),
      unitNumber: error.unitNumber || 1,
      category: error.category || 'conceptual',
      sourceContext: error.sourceContext || 'prueba_dominio',
      topicTitle: error.topicTitle || 'Concepto de Física 2',
      mistakeDescription: error.mistakeDescription || 'Respuesta incorrecta seleccionada.',
      correctionExplanation: error.correctionExplanation || 'Revisar desarrollo teórico de la unidad.',
      occurrences: 1,
      resolved: false,
      createdAt: new Date().toISOString()
    };

    // Actualizar inmediatamente en local para reactividad instantánea
    const current = [...this.errorsSubject.value];
    const existingIdx = current.findIndex(
      e => e.unitNumber === newErr.unitNumber && e.topicTitle === newErr.topicTitle
    );
    if (existingIdx >= 0) {
      current[existingIdx].occurrences += 1;
      current[existingIdx].resolved = false;
      current[existingIdx].mistakeDescription = newErr.mistakeDescription;
      current[existingIdx].correctionExplanation = newErr.correctionExplanation;
    } else {
      current.unshift(newErr);
    }
    this.saveLocalErrors(current);
    this.errorsSubject.next(current);

    return this.http.post<StudentErrorDto>(`${this.baseUrl}/errors`, newErr).pipe(
      catchError(() => of(newErr))
    );
  }

  resolveError(id: number): Observable<StudentErrorDto> {
    const current = [...this.errorsSubject.value];
    const target = current.find(e => e.id === id);
    if (target) {
      target.resolved = true;
      this.saveLocalErrors(current);
      this.errorsSubject.next(current);
    }

    return this.http.patch<StudentErrorDto>(`${this.baseUrl}/errors/${id}/resolve`, {}).pipe(
      catchError(() => of(target as StudentErrorDto))
    );
  }

  // ============================================================================
  // 5. BIBLIOTECA DE PDFS DE LA CÁTEDRA
  // ============================================================================
  getPdfs(): Observable<PdfMetadataDto[]> {
    return this.http.get<PdfMetadataDto[]>(`${this.baseUrl}/pdfs`).pipe(
      mapPdfsWithCatalog(),
      catchError(() => of(this.getCatalogPdfs()))
    );
  }

  inspectPdf(filename: string, maxPages: number = 15): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pdfs/${encodeURIComponent(filename)}/inspect?maxPages=${maxPages}`).pipe(
      catchError(() => of(this.getOfflinePdfPreview(filename)))
    );
  }

  uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/pdfs/upload`, formData);
  }

  getRawPdfUrl(filename: string): string {
    return `${this.baseUrl}/pdfs/${encodeURIComponent(filename)}/raw`;
  }

  // ============================================================================
  // 6. MOTOR DE EXPANSIÓN DINÁMICA DE CONOCIMIENTO (PDFs, LIBROS Y TPs NUEVOS)
  // ============================================================================
  getDynamicTheoryTopics(): TheoryTopic[] {
    return this.dynamicTheorySubject.value;
  }

  getDynamicExercises(): GuidedExercise[] {
    return this.dynamicExercisesSubject.value;
  }

  /**
   * Procesa el texto extraído de un nuevo PDF, libro o Trabajo Práctico y genera
   * automáticamente nuevos temas teóricos (11 puntos) y nuevos ejercicios prácticos
   * graduados que se integran en vivo a la unidad correspondiente.
   */
  ingestNewKnowledgeFromDocument(
    sourceTitle: string,
    rawPagesOrText: string[] | string,
    explicitUnitNumber?: number
  ): { unitNumber: number; addedTheoryTitle: string; addedExerciseTitle: string } {
    const combinedText = Array.isArray(rawPagesOrText)
      ? rawPagesOrText.join('\n\n')
      : (rawPagesOrText || '');
    const cleanText = combinedText.trim() || `Contenido académico incorporado desde ${sourceTitle}.`;

    const detectedUnit = explicitUnitNumber && explicitUnitNumber >= 1 && explicitUnitNumber <= 9
      ? explicitUnitNumber
      : this.detectUnitFromText(sourceTitle + ' ' + cleanText);

    const paragraphs = cleanText
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 25);

    const summaryP1 = paragraphs[0] || `Desarrollo teórico y conceptual extraído de "${sourceTitle}" para la Unidad ${detectedUnit}.`;
    const summaryP2 = paragraphs[1] || summaryP1;
    const summaryP3 = paragraphs[2] || `Aplicación de leyes fundamentales de la Unidad ${detectedUnit} según material "${sourceTitle}".`;

    // 1. Crear nuevo Tópico Teórico de 11 Puntos vinculado a la Unidad
    const newTheory: TheoryTopic = {
      id: `dyn-th-u${detectedUnit}-${Date.now()}`,
      unitNumber: detectedUnit,
      title: `📚 Material Incorporado: ${sourceTitle}`,
      sourcePdf: sourceTitle,
      sourceBadge: 'Material Oficial Cátedra UNdeC',
      convencionCatedra: `Material complementario indexado automáticamente desde "${sourceTitle}" e integrado al programa de la Unidad ${detectedUnit}.`,
      queEs: summaryP1.slice(0, 420),
      quePasaFisicamente: summaryP2.slice(0, 420),
      porQueOcurre: summaryP3.slice(0, 420),
      magnitudes: [
        `Magnitudes principales extraídas de ${sourceTitle} (Unidad ${detectedUnit})`,
        'Expresadas obligatoriamente en el Sistema Internacional (SI: m, kg, s, A, C, V, F, Ω, T, H)'
      ],
      simbolos: [
        { simbolo: 'SI', significado: 'Unidades verificadas del Sistema Internacional antes de reemplazar en la fórmula' }
      ],
      unidades: 'Sistema Internacional (SI): metros [m], Coulombs [C], Voltios [V], Faradios [F], Amperes [A], Ohms [Ω], Teslas [T], Henrys [H].',
      cuandoSeUsa: `Se aplica al resolver problemas y demostraciones del documento "${sourceTitle}" dentro de la Unidad ${detectedUnit}.`,
      cuandoNoSeUsa: 'No aplicar sin verificar antes las hipótesis de simetría, régimen estacionario o conversión de prefijos (cm, mm, μC, nF, pF).',
      erroresTipicos: [
        'Omitir la conversión de prefijos (cm a m, cm² a m², pF/nF a F) antes de operar en la calculadora.',
        'Olvidar paréntesis en el denominador al dividir por constantes en notación científica (EXP).'
      ],
      ejemploSencillo: (paragraphs[3] || summaryP1).slice(0, 380),
      ejemploNivelExamen: (paragraphs[4] || summaryP2).slice(0, 450),
    };

    const currentTheory = [newTheory, ...this.dynamicTheorySubject.value];
    this.saveDynamicTheory(currentTheory);
    this.dynamicTheorySubject.next(currentTheory);

    // 2. Crear nuevo Ejercicio Práctico Guiado en 6 Pasos a partir del documento
    const exerciseSnippet = paragraphs.find(p => /\d/.test(p)) || summaryP1;
    const newExercise: GuidedExercise = {
      id: `dyn-ex-u${detectedUnit}-${Date.now()}`,
      unitNumber: detectedUnit,
      tpReference: `Práctico Incorporado — ${sourceTitle}`,
      sourcePdf: sourceTitle,
      difficulty: 'intermedio',
      title: `Ejercicio Extraído de "${sourceTitle}"`,
      statement: exerciseSnippet.slice(0, 460),
      givenData: [
        `Fuente: ${sourceTitle}`,
        `Unidad ${detectedUnit} — Convertir todos los datos al Sistema Internacional (SI) antes de calcular`,
      ],
      step1Strategy: {
        prompt: `PASO 1 (Estrategia Física para "${sourceTitle}"): ¿Cuál es el primer paso metodológico exigido por la cátedra para resolver este problema de la Unidad ${detectedUnit}?`,
        options: [
          'Identificar el fenómeno físico de la unidad, realizar el esquema geométrico con vectores/signos y pasar todos los datos con prefijos (cm, mm, μC, nF, pF) al Sistema Internacional.',
          'Reemplazar los números directamente sin convertir unidades.',
          'Omitir el diagrama y escribir solo un número final.',
          'Usar fórmulas de otra unidad sin justificar.',
        ],
        correctIndex: 0,
        explanation: 'Todo desarrollo válido en Física 2 comienza con el esquema físico, la conversión de datos al SI y el planteo de la ley fundamental.',
        errorCategoryOnFail: 'planteamiento',
      },
      step2Differential: {
        prompt: 'PASO 2 (Conversión de Unidades y Prefijos): Si el enunciado incluye centímetros (cm), áreas en cm² o submúltiplos (μ, n, p), ¿qué factores de conversión corresponden?',
        options: [
          '1 cm = 10⁻² m  |  1 cm² = 10⁻⁴ m²  |  micro (μ) = 10⁻⁶  |  nano (n) = 10⁻⁹  |  pico (p) = 10⁻¹².',
          '1 cm² = 10⁻² m².',
          'No hace falta convertir a unidades base.',
          '1 pF = 10⁻⁶ F.',
        ],
        correctIndex: 0,
        explanation: 'Convertir cada prefijo a su potencia de 10 evita errores de orden de magnitud en la calculadora científica.',
        errorCategoryOnFail: 'unidades',
      },
      step3VectorGeometry: {
        prompt: 'PASO 3 (Análisis Vectorial / Signos): ¿Qué debemos verificar respecto al carácter vectorial o escalar de la magnitud pedida?',
        options: [
          'Si es un vector (Fuerza, Campo E⃗ o Campo B⃗), definir dirección y sentido en el dibujo; si es un escalar (Potencial V, Capacidad C, Flujo Φ o Energía U), respetar su signo algebraico.',
          'Tratar todas las magnitudes como escalares sin dirección.',
          'Ignorar los signos de las cargas o de la Ley de Lenz.',
          'Sumar vectores de distinta dirección como si fueran paralelos.',
        ],
        correctIndex: 0,
        explanation: 'Distinguir vectores de escalares es uno de los criterios centrales de evaluación de la cátedra.',
        errorCategoryOnFail: 'conceptual',
      },
      step4SetupEquation: {
        prompt: 'PASO 4 (Uso Correcto de la Calculadora Científica): Al cargar la ecuación en la calculadora científica con notación exponencial, ¿qué precaución es obligatoria?',
        options: [
          'Usar la tecla [×10ˣ] (o [EXP]) sin escribir "×10" adicional, y encerrar todo el denominador entre paréntesis ( ... ) al dividir.',
          'Dividir sin usar paréntesis en el denominador.',
          'Apretar × 10 después de la tecla EXP.',
          'Redondear las constantes a cero.',
        ],
        correctIndex: 0,
        explanation: 'La tecla [EXP] ya representa "×10^", y los paréntesis en el denominador aseguran el orden correcto de operaciones.',
        errorCategoryOnFail: 'algebraico',
      },
      step5LineByLine: {
        algebraicSteps: [
          `1) Extracción de datos del documento "${sourceTitle}" y conversión al Sistema Internacional (SI).`,
          `2) Planteo de la ecuación fundamental tradicional de la Unidad ${detectedUnit}.`,
          `3) Sustitución ordenada con paréntesis en numerador y denominador.`,
          `4) Expresión del resultado con su unidad oficial del Sistema Internacional.`,
        ],
        finalSymbolicFormula: '\\text{Resultado}_{\\text{SI}} = \\frac{\\text{Numerador convertidos al SI}}{\\text{Denominador en SI}}',
        finalNumericalValue: 'Verificado',
        expectedUnit: 'SI',
      },
      step6Verification: {
        question: {
          prompt: 'PASO 6 (Verificación Dimensional y Física): ¿Cómo comprobamos que el resultado obtenido del práctico es físicamente coherente?',
          options: [
            'Verificando que las unidades de ambos miembros coincidan en el Sistema Internacional y evaluando el comportamiento en casos límite conocidos.',
            'No hace falta verificar las unidades.',
            'Solo mirando el primer dígito.',
            'Cambiando la unidad al azar.',
          ],
          correctIndex: 0,
          explanation: 'El análisis dimensional y la prueba de límites asintóticos permiten detectar cualquier error algebraico antes de entregar el examen.',
          errorCategoryOnFail: 'interpretacion',
        },
        dimensionalAnalysisNote: 'Toda ecuación física válida debe ser dimensionalmente homogénea en el SI.',
        limitingCaseNote: 'Podés usar el módulo "Calculadora & Tus TPs" para evaluar numéricamente cualquier variación de este problema.',
      },
      whatIfVariations: [],
    };

    const currentExercises = [newExercise, ...this.dynamicExercisesSubject.value];
    this.saveDynamicExercises(currentExercises);
    this.dynamicExercisesSubject.next(currentExercises);

    return {
      unitNumber: detectedUnit,
      addedTheoryTitle: newTheory.title,
      addedExerciseTitle: newExercise.title
    };
  }

  private detectUnitFromText(text: string): number {
    const lower = (text || '').toLowerCase();
    if (lower.includes('alterna') || lower.includes('rlc') || lower.includes('impedancia') || lower.includes('maxwell') || lower.includes('fasor') || lower.includes('u9') || lower.includes('tp9')) return 9;
    if (lower.includes('faraday') || lower.includes('lenz') || lower.includes('induc') || lower.includes('autoinduc') || lower.includes('u8') || lower.includes('tp8')) return 8;
    if (lower.includes('biot') || lower.includes('ampere') || lower.includes('ampère') || lower.includes('solenoide') || lower.includes('toroide') || lower.includes('u7')) return 7;
    if (lower.includes('lorentz') || lower.includes('ciclotron') || lower.includes('ciclotrón') || lower.includes('hall') || lower.includes('magnet') || lower.includes('u6') || lower.includes('tp7')) return 6;
    if (lower.includes('kirchhoff') || lower.includes('ohm') || lower.includes('corriente') || lower.includes('transitorio rc') || lower.includes('u5') || lower.includes('tp6')) return 5;
    if (lower.includes('capacitor') || lower.includes('condensador') || lower.includes('dielectrico') || lower.includes('dieléctrico') || lower.includes('faradio') || lower.includes('u4') || lower.includes('tp5')) return 4;
    if (lower.includes('potencial') || lower.includes('equipotencial') || lower.includes('voltaje') || lower.includes('u3') || lower.includes('tp4')) return 3;
    if (lower.includes('gauss') || lower.includes('flujo') || lower.includes('u2') || lower.includes('tp3')) return 2;
    return 1;
  }

  private loadDynamicTheory(): TheoryTopic[] {
    try {
      const raw = localStorage.getItem(LOCAL_DYNAMIC_THEORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveDynamicTheory(list: TheoryTopic[]) {
    try {
      localStorage.setItem(LOCAL_DYNAMIC_THEORY_KEY, JSON.stringify(list));
    } catch {}
  }

  private loadDynamicExercises(): GuidedExercise[] {
    try {
      const raw = localStorage.getItem(LOCAL_DYNAMIC_EXERCISES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveDynamicExercises(list: GuidedExercise[]) {
    try {
      localStorage.setItem(LOCAL_DYNAMIC_EXERCISES_KEY, JSON.stringify(list));
    } catch {}
  }

  // ============================================================================
  // HELPERS PRIVADOS Y DATOS DE CONTINGENCIA OFFLINE
  // ============================================================================
  private getCatalogPdfs(): PdfMetadataDto[] {
    return CATEDRA_PDF_FILES.map(f => ({
      filename: f.filename,
      sizeKB: f.sizeKB || 250,
      category: f.category,
      unitNumbers: f.unitNumbers,
      authors: f.authors,
      description: f.description
    }));
  }

  private getOfflinePdfPreview(filename: string) {
    const found = CATEDRA_PDF_FILES.find(f => f.filename === filename);
    return {
      filename,
      totalPages: 12,
      extractedPagesCount: 3,
      unitNumbers: found?.unitNumbers || [1],
      category: found?.category || 'teoria',
      pages: [
        `=== UNIVERSIDAD NACIONAL DE CHILECITO (UNdeC) ===\nDocumento Oficial: ${filename}\nAutores: ${found?.authors || 'Cátedra Física 2'}\n\nResumen Analítico:\n${found?.description || 'Material oficial de la cátedra.'}`,
        `=== CONTENIDOS Y ECUACIONES CLAVE ===\nUnidades vinculadas: ${found?.unitNumbers?.join(', ') || '1 a 9'}\n\n• Verificación de hipótesis de simetría antes de integrar.\n• Expresión diferencial rigurosa con vectores unitarios.\n• Análisis de casos límite asintóticos (r → 0, r → ∞, t = 0⁺, t → ∞).`,
        `=== CRITERIOS DE EVALUACIÓN FINAL (PIZARRÓN Y PAPEL) ===\n1. Todo desarrollo debe iniciar con un esquema geométrico claro.\n2. Las unidades en el Sistema Internacional (SI) son obligatorias en cada resultado.\n3. La justificación física de los signos (Lenz, gradiente de potencial, polarización) es condición necesaria para aprobar.`
      ]
    };
  }

  private getOfflineTribunalCase(unitNumber: number): TribunalCaseDto {
    const q = ORAL_COLLOQUIUM_QUESTIONS.find(item => item.unitNumber === unitNumber) || ORAL_COLLOQUIUM_QUESTIONS[0];
    return {
      unitNumber,
      unitTitle: `Unidad ${unitNumber}`,
      titularQuestion: q.question,
      jtpRepregunta: q.followUpWhatIf,
      boardDrawingInstruction: q.boardDrawingInstruction,
      expectedFormula: q.expectedFormula,
      keyExpectedKeywords: q.expectedKeyConcepts,
      expectedConceptualPoints: [
        `Dibujo en pizarra: ${q.boardDrawingInstruction}`,
        `Fórmula central: ${q.expectedFormula} [${q.expectedUnits}]`,
        `Condiciones de validez: ${q.expectedConditions}`
      ],
      mortalMistakeNote: `No justificar las condiciones de aplicación (${q.expectedConditions}) o confundir carácter vectorial con escalar.`
    };
  }

  private evaluateOfflineOralDefense(unitNumber: number, initialDefense: string, followUpDefense: string): TribunalResultDto {
    const tCase = this.getOfflineTribunalCase(unitNumber);
    const combined = `${initialDefense} ${followUpDefense}`.toLowerCase();
    const matched = tCase.keyExpectedKeywords.filter(k => combined.includes(k.toLowerCase()));
    const missing = tCase.keyExpectedKeywords.filter(k => !combined.includes(k.toLowerCase()));

    const score = Math.min(100, Math.round((matched.length / Math.max(1, tCase.keyExpectedKeywords.length)) * 75 + (combined.length > 80 ? 25 : 10)));
    const grade = score >= 80 ? 'Aprobado con Distinción' : score >= 60 ? 'Aprobado' : 'Insuficiente';

    return {
      grade,
      score,
      feedback: score >= 60
        ? `Defensa sólida (${score}/100). Cubriste los ejes fundamentales del coloquio.`
        : `Defensa incompleta (${score}/100). Es indispensable desarrollar: ${missing.join(', ')}.`,
      expectedPoints: tCase.expectedConceptualPoints || tCase.keyExpectedKeywords,
      missingPoints: missing,
      rubricBreakdown: [
        { axisName: 'Precisión Conceptual', score, comment: `Conceptos clave incluidos: ${matched.length}/${tCase.keyExpectedKeywords.length}` },
        { axisName: 'Claridad de Pizarrón', score: initialDefense.length > 60 ? 85 : 45, comment: 'Evaluación de estructura deductiva.' },
        { axisName: 'Respuesta a Repregunta', score: followUpDefense.length > 40 ? 85 : 40, comment: 'Defensa ante situación límite "¿Qué pasa si...?"' }
      ]
    };
  }

  private loadLocalUnits(): ProgramUnitDto[] {
    try {
      const raw = localStorage.getItem(LOCAL_UNITS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 9) return parsed;
      }
    } catch {}
    return this.getDefaultZeroUnits();
  }

  private saveLocalUnits(units: ProgramUnitDto[]) {
    try {
      localStorage.setItem(LOCAL_UNITS_KEY, JSON.stringify(units));
    } catch {}
  }

  private loadLocalErrors(): StudentErrorDto[] {
    try {
      const raw = localStorage.getItem(LOCAL_ERRORS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  }

  private saveLocalErrors(errors: StudentErrorDto[]) {
    try {
      localStorage.setItem(LOCAL_ERRORS_KEY, JSON.stringify(errors));
    } catch {}
  }

  private getDefaultZeroUnits(): ProgramUnitDto[] {
    return [
      { unitNumber: 1, title: 'Unidad 1: Carga Eléctrica y Campo Eléctrico', subtitle: 'Ley de Coulomb, distribuciones continuas e integrales de dE', parcialGroup: '1er Parcial', labId: 'gauss', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 2, title: 'Unidad 2: Ley de Gauss', subtitle: 'Flujo eléctrico, superficies cerradas y conductores en equilibrio', parcialGroup: '1er Parcial', labId: 'gauss', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 3, title: 'Unidad 3: Potencial Eléctrico y Energía', subtitle: 'Diferencia de potencial, gradiente E = -∇V y equipotenciales', parcialGroup: '1er Parcial', labId: 'gauss', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 4, title: 'Unidad 4: Capacidad y Dieléctricos', subtitle: 'Condensadores, energía electrostática y polarización', parcialGroup: '1er Parcial', labId: 'capacitores', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 5, title: 'Unidad 5: Corriente y Circuitos CC', subtitle: 'Ley de Ohm, Leyes de Kirchhoff y transitorios RC', parcialGroup: '1er Parcial', labId: 'rc_kirchhoff', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 6, title: 'Unidad 6: Campo Magnético y Lorentz', subtitle: 'Fuerza magnética q(v × B), ciclotrón y efecto Hall', parcialGroup: '2do Parcial', labId: 'magnetismo', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 7, title: 'Unidad 7: Fuentes de Campo Magnético', subtitle: 'Ley de Biot-Savart, Ley de Ampère, solenoide y toroide', parcialGroup: '2do Parcial', labId: 'magnetismo', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 8, title: 'Unidad 8: Inducción de Faraday-Lenz', subtitle: 'fem inducida, Ley de Lenz, autoinductancia L y circuitos RL', parcialGroup: '2do Parcial', labId: 'faraday_lenz', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' },
      { unitNumber: 9, title: 'Unidad 9: Corriente Alterna y Maxwell', subtitle: 'Fasores RLC, resonancia, corriente de desplazamiento y Poynting', parcialGroup: '2do Parcial', labId: 'rlc_fasores', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' }
    ];
  }

  private shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

function mapRemoteAndLocalUnlocked(
  localUnlocked: SpeedDrillQuestionDto[],
  maxUnlocked: number,
  count: number,
  shuffleFn: (arr: SpeedDrillQuestionDto[]) => SpeedDrillQuestionDto[]
) {
  return (source: Observable<SpeedDrillQuestionDto[]>) =>
    new Observable<SpeedDrillQuestionDto[]>(subscriber => {
      source.subscribe({
        next: (remoteList) => {
          const validRemote = (remoteList || []).filter(q => (q.unitNumber || 1) <= maxUnlocked);
          const mergedMap = new Map<string, SpeedDrillQuestionDto>();
          for (const item of [...localUnlocked, ...validRemote]) {
            mergedMap.set(item.prompt, item);
          }
          const finalPool = Array.from(mergedMap.values());
          subscriber.next(shuffleFn(finalPool).slice(0, count));
          subscriber.complete();
        },
        error: () => {
          subscriber.next(shuffleFn(localUnlocked).slice(0, count));
          subscriber.complete();
        }
      });
    });
}

function mapPdfsWithCatalog() {
  return (source: Observable<PdfMetadataDto[]>) =>
    new Observable<PdfMetadataDto[]>(subscriber => {
      source.subscribe({
        next: (remoteList) => {
          if (!remoteList || remoteList.length === 0) {
            subscriber.next(CATEDRA_PDF_FILES.map(f => ({
              filename: f.filename,
              sizeKB: f.sizeKB || 250,
              category: f.category,
              unitNumbers: f.unitNumbers,
              authors: f.authors,
              description: f.description
            })));
            subscriber.complete();
            return;
          }
          const enriched = remoteList.map(r => {
            const cat = CATEDRA_PDF_FILES.find(c => c.filename.toLowerCase() === r.filename.toLowerCase());
            return {
              ...r,
              sizeKB: r.sizeKB || (r.sizeBytes ? Math.round(r.sizeBytes / 1024) : cat?.sizeKB || 200),
              category: r.category || cat?.category || 'teoria',
              unitNumbers: r.unitNumbers && r.unitNumbers.length ? r.unitNumbers : (cat?.unitNumbers || [1, 2, 3, 4, 5, 6, 7, 8, 9]),
              authors: cat?.authors || 'Cátedra Física 2 — UNdeC',
              description: cat?.description || r.description || 'Documento Oficial de la Cátedra de Física 2 (UNdeC).'
            };
          });
          subscriber.next(enriched);
          subscriber.complete();
        },
        error: (err) => subscriber.error(err)
      });
    });
}
