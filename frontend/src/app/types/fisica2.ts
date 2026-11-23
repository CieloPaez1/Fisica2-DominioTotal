export type CompetencyKey =
  | 'conceptos'
  | 'formulas'
  | 'planteo'
  | 'resolucion'
  | 'graficos'
  | 'razonamiento'
  | 'multipleChoice'
  | 'oral'
  | 'controlErrores';

export type ErrorCategory =
  | 'conceptual'
  | 'formula'
  | 'signo'
  | 'unidades'
  | 'algebraico'
  | 'limites'
  | 'simetria'
  | 'planteamiento'
  | 'interpretacion'
  | 'grafico'
  | 'oral';

export type SevenLevelDifficulty =
  | 'facil'
  | 'medio'
  | 'intermedio'
  | 'avanzado'
  | 'dificil'
  | 'final'
  | 'coloquio';

export type DifficultyLevel =
  | 'facil'
  | 'medio'
  | 'intermedio'
  | 'avanzado'
  | 'dificil'
  | 'final'
  | 'coloquio'
  | 'basico';

export interface UnitMultipleChoiceQuestion {
  id: string;
  unitNumber: number;
  level: SevenLevelDifficulty;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  distractorAnalysis?: string[];
  hint?: string;
  formulaUsed?: string;
  errorCategory: ErrorCategory;
}

export type CertificationStatus = 'en_progreso' | 'certificado' | 'inestable';

export interface CompetencyProfile {
  conceptos: number;
  formulas: number;
  planteo: number;
  resolucion: number;
  graficos: number;
  razonamiento: number;
  multipleChoice: number;
  oral: number;
  controlErrores: number;
}

export interface StageProgress {
  teoria: number; // 0-100 (pesa 20%)
  laboratorio: number; // 0-100 (pesa 25%)
  practico: number; // 0-100 (pesa 25%)
  pruebaDominio: number; // 0-100 (pesa 30%)
}

export interface SpacedRepetitionSchedule {
  day1Completed: boolean;
  day3Completed: boolean;
  day7Completed: boolean;
  day14Completed: boolean;
  day30Completed: boolean;
  lastReviewedIso: string | null;
  nextReviewDueIso: string | null;
  currentIntervalDays: 1 | 3 | 7 | 14 | 30;
}

export interface CatedraPdfFile {
  id: string;
  filename: string;
  category:
    | 'programa'
    | 'teoria'
    | 'tp'
    | 'resumen'
    | 'libro'
    | 'final';
  unitNumbers: number[];
  authors: string;
  description: string;
  sizeKB?: number;
}

/**
 * ETAPA A: Teoría "En Criollo" con los 11 apartados obligatorios
 * y distinción explícita entre Material Oficial de la Cátedra UNdeC y explicación IA.
 */
export interface TheoryTopic {
  id: string;
  unitNumber: number;
  title: string;
  sourcePdf: string;
  sourceBadge: 'Material Oficial Cátedra UNdeC' | 'Complemento Pedagógico IA';
  convencionCatedra: string;
  // Los 11 puntos obligatorios
  queEs: string;
  quePasaFisicamente: string;
  porQueOcurre: string;
  magnitudes: string[];
  simbolos: { simbolo: string; significado: string }[];
  unidades: string;
  cuandoSeUsa: string;
  cuandoNoSeUsa: string;
  erroresTipicos: string[];
  ejemploSencillo: string;
  ejemploNivelExamen: string;
}

export interface FormulaSymbolDetail {
  symbol: string;
  name: string;
  physicalMeaning: string;
  unitsSI: string;
  typicalError: string;
}

export interface InteractiveFormula {
  id: string;
  unitNumber: number;
  title: string;
  equationDisplay: string;
  sourcePdf: string;
  symbols: FormulaSymbolDetail[];
  physicalInterpretation: string;
  applicationConditions: string;
  whenCanExtractFromIntegral: string;
  whenProhibitedToExtract: string;
  howToIsolateVariables: string[];
  dimensionalVerification: string;
  frequentErrors: string[];
}

export interface StepQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  errorCategoryOnFail: ErrorCategory;
}

export interface WhatIfVariation {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  physicalExplanation: string;
}

/**
 * ETAPA C: Entrenador de Ejercicios Reales de los TPs de la Cátedra en 6 Pasos
 */
export interface GuidedExercise {
  id: string;
  unitNumber: number;
  tpReference: string; // ej. "TP N°3 - Ejercicio 2 (Cáscara Esférica)"
  sourcePdf: string;
  difficulty: DifficultyLevel;
  title: string;
  statement: string;
  givenData: string[];
  step1Strategy: StepQuestion;
  step2Differential: StepQuestion;
  step3VectorGeometry: StepQuestion;
  step4SetupEquation: StepQuestion;
  step5LineByLine: {
    algebraicSteps: string[];
    finalSymbolicFormula: string;
    finalNumericalValue: string;
    expectedUnit: string;
  };
  step6Verification: {
    question: StepQuestion;
    dimensionalAnalysisNote: string;
    limitingCaseNote: string;
  };
  whatIfVariations: WhatIfVariation[];
}

/**
 * MODO CAZATRAMPAS: Multiple Choice con análisis de trampa de examen
 */
export interface TrapQuestion {
  id: string;
  unitNumber: number;
  difficulty: DifficultyLevel;
  sourceReference: string;
  question: string;
  options: string[];
  correctIndex: number;
  errorCategory: ErrorCategory;
  cualEraLaTrampa: string;
  porQueIncorrecta: string;
  palabraSospechosa: string;
  comoReconocerEnExamen: string;
}

/**
 * MODO ORAL: Entrenador de Coloquio y Defensa en Pizarrón frente al Tribunal UNdeC
 */
export interface OralColloquiumQuestion {
  id: string;
  unitNumber: number;
  difficulty: DifficultyLevel;
  question: string;
  followUpWhatIf: string;
  boardDrawingInstruction: string;
  expectedKeyConcepts: string[];
  expectedFormula: string;
  expectedUnits: string;
  expectedConditions: string;
  catedraModelAnswer: string;
}

/**
 * REGISTRO DE ERRORES DEL ESTUDIANTE (Prioridad Máxima - 11 Categorías)
 */
export interface StudentErrorRecord {
  id: string;
  timestamp: string;
  unitNumber: number;
  category: ErrorCategory;
  sourceContext:
    | 'entrenador_practico'
    | 'cazatrampas'
    | 'prueba_dominio'
    | 'simulacro_60m'
    | 'modo_oral'
    | 'analisis_dimensional';
  topicTitle: string;
  mistakeDescription: string;
  correctionExplanation: string;
  occurrences: number;
  resolved: boolean;
}

export interface ProgramUnit {
  unitNumber: number;
  title: string;
  subtitle: string;
  parcialGroup: '1er Parcial (Guías 1 a 5)' | '2do Parcial (Guías 6 a 9)';
  officialContents: string[];
  officialPdfs: string[];
  labId:
    | 'gauss'
    | 'capacitores'
    | 'rc_kirchhoff'
    | 'magnetismo'
    | 'faraday_lenz'
    | 'rlc_fasores';
  stageProgress: StageProgress;
  competencies: CompetencyProfile;
  certificationStatus: CertificationStatus;
  spacedRepetition: SpacedRepetitionSchedule;
}
