import {
  CatedraPdfFile,
  GuidedExercise,
  InteractiveFormula,
  OralColloquiumQuestion,
  ProgramUnit,
  StudentErrorRecord,
  TheoryTopic,
  TrapQuestion,
} from '../types/fisica2';

export const CATEDRA_PDF_FILES: CatedraPdfFile[] = [
  {
    id: 'pdf-programa',
    filename: 'Física ll-2025-2013.pdf',
    category: 'programa',
    unitNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    authors: 'Prof. Titular Ing. Pablo Oscar Chade Vergara / JTP Ing. Franco Raúl Tejada Barrantes / Ing. Ruy Barros',
    description: 'Programa Analítico Oficial UNdeC (Unidades 1 a 9, régimen de parciales y reglamento de Examen Final con Tribunal en pizarra y papel).',
    sizeKB: 55,
  },
  {
    id: 'pdf-apunte-03',
    filename: '03-ELECTROSTATICA-SIS-AL.pdf',
    category: 'teoria',
    unitNumbers: [1, 2, 3],
    authors: 'Prof. Ing. Pablo Oscar Chade Vergara (UNdeC)',
    description: 'Apunte oficial de cátedra: Cargas, Conductores y Aislantes, Ley de Coulomb, Cuantización, Campo Eléctrico, Flujo, Ley de Gauss y Potencial Eléctrico.',
    sizeKB: 509,
  },
  {
    id: 'pdf-apunte-04',
    filename: '04-ELECTRODINAMICA-SIS-_AL.pdf',
    category: 'teoria',
    unitNumbers: [4, 5],
    authors: 'Prof. Ing. Pablo Oscar Chade Vergara (UNdeC)',
    description: 'Apunte oficial de cátedra: Corriente Eléctrica, Densidad j, Resistencia y Resistividad, Ley de Ohm, Efecto Joule, FEM, Reglas de Kirchhoff, Capacitores y Dieléctricos.',
    sizeKB: 1143,
  },
  {
    id: 'pdf-apunte-05',
    filename: '05-MAGNETISMO-SIS-AL.pdf',
    category: 'teoria',
    unitNumbers: [6, 8],
    authors: 'Prof. Ing. Pablo Oscar Chade Vergara (UNdeC)',
    description: 'Apunte oficial de cátedra: Campo Magnético B, Fuerza de Lorentz F = q(v x B), Flujo Magnético (Weber/Tesla), Ley de Gauss del Magnetismo, Materiales Diamagnéticos, Paramagnéticos y Ferromagnéticos.',
    sizeKB: 999,
  },
  {
    id: 'pdf-apunte-06',
    filename: '06-ELECTROMAGNETISMO-SIS-AL.pdf',
    category: 'teoria',
    unitNumbers: [6, 7, 9],
    authors: 'Prof. Ing. Pablo Oscar Chade Vergara (UNdeC)',
    description: 'Apunte oficial de cátedra: Ley de Ampère, Ley de Faraday, Ley de Lenz, Generadores y Motores (fem inversa), Corriente de Desplazamiento y las 4 Ecuaciones de Maxwell + Espectro Electromagnético.',
    sizeKB: 328,
  },
  {
    id: 'pdf-u2-slides',
    filename: 'Unidad_N2_-_Ley_de_Gauss-1.pdf',
    category: 'teoria',
    unitNumbers: [2],
    authors: 'Ing. Franco Raúl Tejada Barrantes (UNdeC)',
    description: 'Presentación de cátedra Unidad N°2: Flujo del campo eléctrico, vector dS saliente, ángulos de flujo máximo/nulo/negativo y demostración de Gauss.',
    sizeKB: 521,
  },
  {
    id: 'pdf-u8-faraday',
    filename: 'Unidad N°8 - Ley de Faraday.pdf',
    category: 'teoria',
    unitNumbers: [7],
    authors: 'Ing. Franco Raúl Tejada Barrantes (UNdeC)',
    description: 'Presentación de cátedra: Experimentos de Faraday, enlace de flujo N·dΦ/dt, Ley de Lenz (cara N y cara S), Corrientes Parásitas y Fem de Movimiento (ε = -Blv, Fap = B²l²v/R, P = ε²/R).',
    sizeKB: 1592,
  },
  {
    id: 'pdf-u9-inductancia',
    filename: 'Unidad N°9 - Inductancia.pdf',
    category: 'teoria',
    unitNumbers: [8],
    authors: 'Ing. Franco Raúl Tejada Barrantes (UNdeC)',
    description: 'Presentación de cátedra: Autoinductancia L, fem autoinducida εL = -L(di/dt), inductores con di/dt > 0 y di/dt < 0, solenoide L = μ0·n²·l·A, Curva de Histéresis y Energía U = ½LI².',
    sizeKB: 1198,
  },
  {
    id: 'pdf-tp1',
    filename: 'T.P.N1_Carga_y_Materia.pdf',
    category: 'tp',
    unitNumbers: [1],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar, Dr. Sandro Faner',
    description: 'Trabajo Práctico N°1 Resuelto (13 págs): Superposición vectorial de fuerzas de Coulomb, equilibrio de cargas, esferas suspendidas en hilos, cuantización en iones y permitividad relativa.',
    sizeKB: 889,
  },
  {
    id: 'pdf-tp2',
    filename: 'T.P.N2_Campo_Electrico.pdf',
    category: 'tp',
    unitNumbers: [1],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar, Dr. Sandro Faner',
    description: 'Trabajo Práctico N°2 Resuelto (9 págs): Punto de campo nulo entre dos cargas, equilibrio de péndulo en campo uniforme, cinemática del electrón entre placas paralelas y dipolo eléctrico.',
    sizeKB: 724,
  },
  {
    id: 'pdf-tp3',
    filename: 'TP3_-La_Ley_de_Gauss.pdf',
    category: 'tp',
    unitNumbers: [2],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar, Ing. Sandro Fanner',
    description: 'Trabajo Práctico N°3 Resuelto (12 págs): Cáscara esférica con densidad volumétrica ρ en 6 radios, tubo metálico cilíndrico con gráfica E(r), dos placas no conductoras (zonas A, B, C) y flujo en submarino.',
    sizeKB: 613,
  },
  {
    id: 'pdf-tp4',
    filename: 'Ingenieria_-_T.P.N4_-_Potencial_Electrico.pdf',
    category: 'tp',
    unitNumbers: [3],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar, Dr. Sandro Faner',
    description: 'Trabajo Práctico N°4 Resuelto (7 págs): Independencia de trayectoria (ad vs abcd), planos equipotenciales, energía potencial de 4 cargas en rectángulo, fusión de gotas esféricas y gradiente E = -∇V.',
    sizeKB: 826,
  },
  {
    id: 'pdf-tp5',
    filename: 'Ingenieria_-_T.P.N5_-_Capacitores.pdf',
    category: 'tp',
    unitNumbers: [4],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar, Dr. Sandro Faner',
    description: 'Trabajo Práctico N°5 Resuelto (8 págs): Coeficiente dieléctrico Ke, carga inducida en caras del dieléctrico, rigidez dieléctrica, doble dieléctrico, capacitor desconectado de batería, cable coaxial y llave conmutadora S.',
    sizeKB: 615,
  },
  {
    id: 'pdf-tp6',
    filename: 'Trabajo Practico N°6 - Circuitos Electricos.pdf',
    category: 'tp',
    unitNumbers: [5],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar',
    description: 'Trabajo Práctico N°6 (3 págs): Resistividad y variación térmica α, lecturas de voltímetro y amperímetro con resistencia interna, lámparas fundidas en serie/paralelo y mallas de Kirchhoff.',
    sizeKB: 340,
  },
  {
    id: 'pdf-tp7',
    filename: 'Trabajo Practico N°7 - Campo magnetico y fuentes de campo magnetico.pdf',
    category: 'tp',
    unitNumbers: [6],
    authors: 'Ing. Ruy Barros, Ing. Franco Tejada Barrantes, Ing. Ramiro Abilar',
    description: 'Trabajo Práctico N°7 (4 págs): Trayectoria helicoidal de protón, par de torsión τ = μ x B en bobina, Biot-Savart en segmento corto, solenoide con núcleo μr = 1150, cables en cuadrado y superconductividad Meissner en Niobio.',
    sizeKB: 389,
  },
];

export const INITIAL_UNITS: ProgramUnit[] = [
  {
    unitNumber: 1,
    title: 'Unidad 1: Carga Eléctrica y Campo Eléctrico',
    subtitle: 'Ley de Coulomb, Superposición Vectorial, Dipolo y Cinemática en Campo E',
    parcialGroup: '1er Parcial (Guías 1 a 5)',
    officialContents: [
      'Carga eléctrica, cuantización (q = n·e) y conservación de la carga',
      'Conductores y aisladores; carga por contacto, fricción e inducción',
      'Ley de Coulomb en vacío y en medios materiales (permitividad relativa εr)',
      'Principio de Superposición de fuerzas y puntos de equilibrio electrostático',
      'Campo Eléctrico E = F/q0, líneas de fuerza y movimiento de partículas cargadas en E uniforme',
      'Densidades lineal (λ), superficial (σ) y volumétrica (ρ); Dipolo eléctrico',
    ],
    officialPdfs: [
      '03-ELECTROSTATICA-SIS-AL.pdf',
      'Unidad_N1_-_Carga_Electrico_y_Campo_Electrico_.pdf',
      'T.P.N1_Carga_y_Materia.pdf',
      'T.P.N2_Campo_Electrico.pdf',
    ],
    labId: 'gauss',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 2,
    title: 'Unidad 2: La Ley de Gauss',
    subtitle: 'Flujo Eléctrico, Simetrías Esférica/Cilíndrica/Plana y Conductores en Equilibrio',
    parcialGroup: '1er Parcial (Guías 1 a 5)',
    officialContents: [
      'Flujo del campo eléctrico ΦE = ∮ E · dS = E·A·cos(α)',
      'Ley de Gauss: ΦE = q_enc / ε0 e independencia del radio de la gaussiana',
      'Deducción de la Ley de Coulomb a partir de la Ley de Gauss',
      'Cáscara esférica con densidad volumétrica ρ (interior hueco r < a, pared a ≤ r ≤ b y exterior r ≥ b)',
      'Simetría cilíndrica infinita (E = λ / 2πε0r) y placas planas paralelas no conductoras (E = σ / 2ε0)',
      'Conductor aislado en equilibrio electrostático y conductor hueco con carga interior',
    ],
    officialPdfs: [
      '03-ELECTROSTATICA-SIS-AL.pdf',
      'Unidad_N2_-_Ley_de_Gauss-1.pdf',
      'TP3_-La_Ley_de_Gauss.pdf',
    ],
    labId: 'gauss',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 3,
    title: 'Unidad 3: Potencial Eléctrico y Energía Potencial',
    subtitle: 'Independencia de la Trayectoria, Superficies Equipotenciales y Gradiente E = -∇V',
    parcialGroup: '1er Parcial (Guías 1 a 5)',
    officialContents: [
      'Energía potencial electrostática ΔU = -W_ab = -q ∫ E · dl y carácter conservativo',
      'Diferencia de potencial ΔV = Vb - Va = ΔU / q y unidad Volt (J/C) y Electrón-Volt (eV)',
      'Potencial de una carga puntual y suma algebraica escalar para sistemas de cargas discretas',
      'Energía potencial total de configuración de múltiples cargas U = k Σ (qi·qj / rij)',
      'Superficies equipotenciales y obtención del vector campo mediante el gradiente E = -∇V',
      'Potencial de esferas conductoras y combinación de gotas cargadas',
    ],
    officialPdfs: [
      '03-ELECTROSTATICA-SIS-AL.pdf',
      'Unidad_N3_-__Potencial_Electrico_-1.pdf',
      'Ingenieria_-_T.P.N4_-_Potencial_Electrico.pdf',
    ],
    labId: 'gauss',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 4,
    title: 'Unidad 4: Capacitancia y Dieléctricos',
    subtitle: 'Capacitor Plano/Esférico/Coaxial, Dieléctricos (Ke), Rigidez y Energía U = ½CV²',
    parcialGroup: '1er Parcial (Guías 1 a 5)',
    officialContents: [
      'Definición de capacidad C = q/V (Faradio) e independencia de C respecto a q y V',
      'Deducción por Gauss de C = ε0·A/d (placas paralelas), C esférico y C cilíndrico/coaxial',
      'Efecto del dieléctrico (Ck = Ke·C0), carga inducida en caras q_face = Q(1 - 1/Ke) y rigidez dieléctrica E_max',
      'Diferencia crítica: Capacitor CON batería conectada (V cte) vs SIN batería (Q cte)',
      'Asociación de capacitores en serie (Q igual), paralelo (V igual) y mixtos',
      'Energía almacenada U = ½CV² = q²/(2C) y redistribución al conmutar llaves',
    ],
    officialPdfs: [
      '04-ELECTRODINAMICA-SIS-_AL.pdf',
      'Unidad_N4_-_Capacitancia.pdf',
      'Ingenieria_-_T.P.N5_-_Capacitores.pdf',
    ],
    labId: 'capacitores',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 5,
    title: 'Unidad 5: Circuitos Eléctricos (CC, Ley de Ohm y Kirchhoff)',
    subtitle: 'Densidad de Corriente, Resistividad Térmica, Efecto Joule, Mallas de Kirchhoff y RC',
    parcialGroup: '1er Parcial (Guías 1 a 5)',
    officialContents: [
      'Corriente eléctrica i = dq/dt, sentido convencional y vector densidad de corriente j = i/A',
      'Resistencia R = V/i, resistividad ρ = E/j = R·A/L, conductividad σ y variación térmica con α',
      'Materiales óhmicos vs no óhmicos (diodo), Ley de Joule P = i²R = V²/R',
      'Fuerza electromotriz (fem ε), resistencia interna de fuente real y conexión de Amperímetro (RA→0) y Voltímetro (RV→∞)',
      'Primera Ley de Kirchhoff (Nodos: Σi = 0, conservación de carga) y Segunda Ley (Mallas: ΣΔV = 0, conservación de energía)',
      'Circuitos de múltiples mallas y transitorios de carga y descarga en circuitos RC (t = 0 y t → ∞)',
    ],
    officialPdfs: [
      '04-ELECTRODINAMICA-SIS-_AL.pdf',
      'Unidad_N5_-_Circuitos_Electricos.pdf',
      'Trabajo Practico N°6 - Circuitos Electricos.pdf',
    ],
    labId: 'rc_kirchhoff',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 6,
    title: 'Unidad 6: Campo Magnético y Fuentes (Lorentz, Biot-Savart y Ampère)',
    subtitle: 'Fuerza Magnética, Trayectoria Helicoidal, Torque en Espiras, Biot-Savart y Ley de Ampère',
    parcialGroup: '2do Parcial (Guías 6 a 9)',
    officialContents: [
      'Campo magnético B (Tesla y Gauss), inexistencia de monopolos y Ley de Gauss del Magnetismo ∮ B·dA = 0',
      'Fuerza de Lorentz F = q(v × B), regla de la mano derecha y por qué el campo magnético estático NO realiza trabajo',
      'Movimiento circular y helicoidal de cargas en B uniforme (R = mv / qB, ω = qB / m)',
      'Fuerza sobre conductor con corriente F = i(L × B), momento magnético μ = N·i·A y par de torsión τ = μ × B',
      'Ley de Biot-Savart para segmentos y espiras; fuerza entre conductores paralelos',
      'Ley de Ampère ∮ B·dl = μ0·i_enc para cable recto, solenoide (B = μ0·n·i) y superconductores Tipo I (Efecto Meissner)',
    ],
    officialPdfs: [
      '05-MAGNETISMO-SIS-AL.pdf',
      '06-ELECTROMAGNETISMO-SIS-AL.pdf',
      'Unidad_N6_-_Campo_Magnetico_y_Fuentes_de_Campo_Magnetico.pdf',
      'Trabajo Practico N°7 - Campo magnetico y fuentes de campo magnetico.pdf',
    ],
    labId: 'magnetismo',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 7,
    title: 'Unidad 7: Ley de Faraday, Inducción y Ecuaciones de Maxwell',
    subtitle: 'Enlace de Flujo, Ley de Lenz, Fem de Movimiento en Rieles y Corriente de Desplazamiento',
    parcialGroup: '2do Parcial (Guías 6 a 9)',
    officialContents: [
      'Experimentos de Faraday: imán-espira y anillo de hierro con bobina primaria y secundaria',
      'Ley de Inducción de Faraday ε = -N dΦB/dt y las 4 formas de variar el flujo magnético',
      'Ley de Lenz: significado físico del signo menos (oposición al CAMBIO de flujo, cara N y cara S)',
      'Estudio cuantitativo de la Fem de Movimiento: ε = -B·l·v, fuerza frenadora Fap = B²l²v/R y potencia P = ε²/R',
      'Corrientes parásitas (Foucault), generadores de CA (alternadores) y motores eléctricos (fem inversa)',
      'Asimetría de Ampère, Corriente de Desplazamiento id = ε0(dΦE/dt) y las 4 Ecuaciones de Maxwell en el vacío',
    ],
    officialPdfs: [
      'Unidad N°8 - Ley de Faraday.pdf',
      '06-ELECTROMAGNETISMO-SIS-AL.pdf',
    ],
    labId: 'faraday_lenz',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 8,
    title: 'Unidad 8: Inductancia, Materiales Magnéticos y Circuitos CA / RLC',
    subtitle: 'Autoinductancia L, Solenoide, Energía ½LI², Histéresis y Diagramas de Fasores en CA',
    parcialGroup: '2do Parcial (Guías 6 a 9)',
    officialContents: [
      'Autoinducción y fem autoinducida εL = -L(di/dt); unidad Henry (H = V·s/A)',
      'Comportamiento de un inductor en un circuito según di/dt > 0, di/dt = 0 y di/dt < 0',
      'Deducción de la inductancia de un solenoide: L = μ0·n²·l·A = μ0·n²·V',
      'Energía magnética almacenada en un inductor: dU = L·i·di ⇒ U = ½ L·I²',
      'Vector Magnetización M, permeabilidad relativa Km: Paramagnéticos, Diamagnéticos y Ferromagnéticos (Dominios y Curva de Histéresis)',
      'Corriente Alterna, reactancia inductiva XL y capacitiva XC, impedancia Z, desfase y diagramas fasoriales',
    ],
    officialPdfs: [
      'Unidad N°9 - Inductancia.pdf',
      '05-MAGNETISMO-SIS-AL.pdf',
    ],
    labId: 'rlc_fasores',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
  {
    unitNumber: 9,
    title: 'Unidad 9: Ondas Electromagnéticas, Óptica y Termodinámica',
    subtitle: 'Velocidad de la Luz c = 1/√(ε0μ0), Espectro EM, Ley de Snell y Calorimetría',
    parcialGroup: '2do Parcial (Guías 6 a 9)',
    officialContents: [
      'Predicción de ondas electromagnéticas por Maxwell y verificación de c = 1 / √(ε0·μ0) ≈ 2,9986 × 10⁸ m/s',
      'Espectro electromagnético: ondas de radio, microondas, infrarrojo, visible, UV, rayos X y rayos gamma',
      'Óptica geométrica y física: reflexión, refracción (Ley de Snell n1·sen θ1 = n2·sen θ2) y espejos/lentes',
      'Temperatura, dilatación térmica, cantidad de calor Q = m·c·ΔT y calor latente de cambio de estado',
    ],
    officialPdfs: [
      '06-ELECTROMAGNETISMO-SIS-AL.pdf',
      'Física ll-2025-2013.pdf',
    ],
    labId: 'rlc_fasores',
    stageProgress: { teoria: 0, laboratorio: 0, practico: 0, pruebaDominio: 0 },
    competencies: {
      conceptos: 0,
      formulas: 0,
      planteo: 0,
      resolucion: 0,
      graficos: 0,
      razonamiento: 0,
      multipleChoice: 0,
      oral: 0,
      controlErrores: 0,
    },
    certificationStatus: 'en_progreso',
    spacedRepetition: {
      day1Completed: false,
      day3Completed: false,
      day7Completed: false,
      day14Completed: false,
      day30Completed: false,
      lastReviewedIso: null,
      nextReviewDueIso: null,
      currentIntervalDays: 1,
    },
  },
];

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'teo-u1-coulomb-campo',
    unitNumber: 1,
    title: 'Carga Eléctrica, Ley de Coulomb y Campo Eléctrico como Intermediario',
    sourcePdf: '03-ELECTROSTATICA-SIS-AL.pdf y T.P.N1 / T.P.N2',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En los TPs de la cátedra UNdeC (Ing. Barros / Ing. Tejada Barrantes), los módulos de fuerza y campo se calculan SIEMPRE con valores absolutos |q1·q2| y el signo (+ o - en los versores î, ĵ) se asigna dibujando el diagrama de cuerpo libre sobre la carga estudiada.',
    queEs:
      'La electrostática estudia las interacciones entre cargas eléctricas en reposo. En lugar de pensar en "acción a distancia instantánea", la cátedra introduce el Campo Eléctrico (E) como intermediario físico: Carga 1 ⇔ Campo Eléctrico E ⇔ Carga 2.',
    quePasaFisicamente:
      'Toda carga q altera el espacio que la rodea creando un campo vectorial E (radial saliente si q > 0, entrante si q < 0). Cuando colocamos otra carga q0 en ese punto, q0 no "siente" directamente a la carga lejana, sino al campo local E en ese punto exacto mediante F = q0·E.',
    porQueOcurre:
      'Porque la materia posee una propiedad fundamental discreta (cuantizada en múltiplos de la carga elemental e = 1,602 × 10⁻¹⁹ C) y conservativa. En conductores los electrones libres fluyen ante cualquier campo, mientras que en aislantes permanecen fijos.',
    magnitudes: [
      'Carga eléctrica (q, Q)',
      'Fuerza electrostática vectorial (F)',
      'Intensidad de Campo Eléctrico (E)',
      'Permitividad del vacío (ε0) y relativa del medio (εr)',
    ],
    simbolos: [
      { simbolo: 'q = n·e', significado: 'Carga cuantizada (n entero, e = 1,602×10⁻¹⁹ C)' },
      { simbolo: 'k = 1/(4πε0)', significado: 'Constante de Coulomb en el vacío (8,99 × 10⁹ N·m²/C²)' },
      { simbolo: 'εr', significado: 'Permitividad relativa del medio material (reduce la fuerza: F = F_vacío / εr)' },
      { simbolo: 'E = F/q0', significado: 'Campo eléctrico: fuerza por unidad de carga de prueba positiva' },
    ],
    unidades: 'Carga: Coulomb [C] (1 μC = 10⁻⁶ C, 1 nC = 10⁻⁹ C, 1 pC = 10⁻¹² C). Campo E: [N/C] = [V/m].',
    cuandoSeUsa:
      'La fórmula F = k|q1·q2|/r² y E = k|q|/r² se utilizan EXCLUSIVAMENTE para cargas puntuales (o esferas cuyas dimensiones sean mucho menores que la distancia o vistas desde el exterior).',
    cuandoNoSeUsa:
      'NO se usa E = k·q/r² directamente si la carga está distribuida en un alambre largo, placa o cilindro cerca del cuerpo sin antes integrar diferenciales dq o aplicar la Ley de Gauss.',
    erroresTipicos: [
      'Meter el signo negativo de la carga adentro de la ley de Coulomb escalar y confundir atracción con dirección hacia -x.',
      'Olvidar convertir centímetros a metros antes de elevar la distancia r al cuadrado.',
      'Olvidar descomponer las fuerzas oblicuas con cos(θ) y sen(θ) antes de sumar (la fuerza y el campo se suman VECTORIALMENTE, nunca escalarmente).',
    ],
    ejemploSencillo:
      'TP N°1 Ej. 5: Dos iones iguales a r = 5×10⁻¹⁰ m se repelen con F = 3,7×10⁻⁹ N. Despejando q = √(F·r²/k) = 3,2×10⁻¹⁹ C, y dividiendo por e = 1,6×10⁻¹⁹ C resulta n = 2 electrones faltantes.',
    ejemploNivelExamen:
      'TP N°1 Ej. 4 y B (Péndulo Electrostático): Dos esferas iguales de masa m y carga q colgadas de hilos de longitud l forman ángulo θ con la vertical. En equilibrio: ΣFx = Fe - T·sen(θ) = 0 y ΣFy = T·cos(θ) - m·g = 0 ⇒ tan(θ) = Fe / (m·g).',
  },
  {
    id: 'teo-u2-gauss',
    unitNumber: 2,
    title: 'Ley de Gauss, Simetrías y Conductores en Equilibrio Electrostático',
    sourcePdf: 'Unidad_N2_-_Ley_de_Gauss-1.pdf y TP3_-La_Ley_de_Gauss.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En los apuntes del Ing. Tejada Barrantes y el TP N°3, el vector diferencial de superficie se escribe dS (o dA) y SIEMPRE apunta hacia afuera de la superficie cerrada. El producto escalar se desarrolla explícitamente como E·dS·cos(θ) antes de sacar E de la integral.',
    queEs:
      'Es una de las 4 ecuaciones fundamentales de Maxwell que relaciona el flujo eléctrico neto que atraviesa cualquier superficie imaginaria cerrada (superficie gaussiana) con la carga neta encerrada en su interior: ΦE = ∮ E · dS = q_neta / ε0.',
    quePasaFisicamente:
      'Cuenta cuántas líneas de campo "nacen" o "mueren" dentro de una bolsa cerrada. Si una línea entra por un lado y sale por el otro (carga externa), aporta flujo negativo al entrar y positivo igual al salir, sumando cero. Solo las cargas ADENTRO de la bolsa generan flujo neto.',
    porQueOcurre:
      'Porque el campo de una carga puntual decae con 1/r² mientras que el área de una esfera crece con r². Al multiplicar E·A, el radio r² se cancela, haciendo que el flujo sea independiente del tamaño o forma de la superficie cerrada.',
    magnitudes: [
      'Flujo eléctrico escalar (ΦE)',
      'Vector diferencial de superficie saliente (dS o dA)',
      'Carga neta encerrada (q_enc o q_neta)',
      'Densidades de carga λ (C/m), σ (C/m²) y ρ (C/m³)',
    ],
    simbolos: [
      { simbolo: '∮', significado: 'Integral sobre una superficie CERRADA (gaussiana)' },
      { simbolo: 'dS', significado: 'Vector normal exterior a la superficie en cada punto' },
      { simbolo: 'q_neta', significado: 'Suma algebraica de las cargas estrictamente DENTRO de la gaussiana' },
    ],
    unidades: 'Flujo Eléctrico ΦE: [N·m²/C] o equivalentemente [V·m].',
    cuandoSeUsa:
      '1) SIEMPRE es válida para calcular el FLUJO ΦE a través de cualquier superficie cerrada (incluso un submarino irregular, TP3 Ej. 6). 2) Para DESPEJAR el campo E(r) SOLO se usa cuando hay alta simetría: Esférica, Cilíndrica infinita o Plana infinita.',
    cuandoNoSeUsa:
      'PROHIBIDO despejar E como ΦE/A si el módulo de E no es constante en la superficie o si el ángulo entre E y dS varía punto a punto (por ejemplo, una carga descentrada o un cubo).',
    erroresTipicos: [
      'Error gráfico remarcado en TP N°3 pág. 7: al graficar E(r) fuera de un cilindro o esfera, unir los puntos con una línea recta en lugar de dibujar la curva hiperbólica suave (1/r o 1/r²).',
      'En una cáscara esférica gruesa (a ≤ r ≤ b), integrar o tomar todo el volumen 4/3 π(b³ - a³) cuando r está en el medio: debe tomarse solo hasta el radio r de la gaussiana: V_enc = 4/3 π(r³ - a³).',
      'Confundir placa aislante infinita (E = σ / 2ε0) con la proximidad de un conductor en equilibrio (E = σ / ε0).',
    ],
    ejemploSencillo:
      'TP N°3 Ej. 6 (Submarino): Si dentro de un submarino hay cargas de +5, -9, +27 y -84 μC, sin importar la forma del submarino el flujo total es ΦE = (-61×10⁻⁶ C) / ε0 = -6,89×10⁶ N·m²/C (entran más líneas de las que salen).',
    ejemploNivelExamen:
      'TP N°3 Ej. 2 (Cáscara Esférica a ≤ r ≤ b): Para un punto intermedio r entre el radio interno a y externo b con densidad uniforme ρ, la carga encerrada es q_n = ρ·(4/3)π(r³ - a³). Aplicando Gauss: E·(4πr²) = q_n/ε0 ⇒ E(r) = ρ(r³ - a³) / (3·ε0·r²).',
  },
  {
    id: 'teo-u3-potencial',
    unitNumber: 3,
    title: 'Potencial Eléctrico, Energía de Configuración y Gradiente E = -∇V',
    sourcePdf: '03-ELECTROSTATICA-SIS-AL.pdf y Ingenieria_-_T.P.N4_-_Potencial_Electrico.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En el TP N°4 de la cátedra UNdeC se distingue explícitamente: el trabajo de una fuerza externa para mover la carga sin acelerarla es W_ext = +q(Vb - Va), mientras que el trabajo realizado por el propio campo eléctrico es W_campo = -ΔU = -q(Vb - Va).',
    queEs:
      'El potencial eléctrico V en un punto es la energía potencial electrostática por unidad de carga (V = U/q) necesaria para traer una carga de prueba desde el infinito hasta ese punto.',
    quePasaFisicamente:
      'Como la fuerza electrostática es conservativa, el trabajo para ir del punto A al punto B no depende del camino seguido (recto o quebrado abcd). Las líneas de campo eléctrico apuntan siempre hacia donde el potencial DISMINUYE más rápidamente.',
    porQueOcurre:
      'Porque el rotacional del campo electrostático es nulo (∮ E · dl = 0), lo que permite definir una función escalar V(x,y,z) cuyas derivadas parciales reconstruyen el vector campo E.',
    magnitudes: [
      'Potencial eléctrico escalar (V)',
      'Diferencia de potencial o tensión (ΔV = Vb - Va)',
      'Energía potencial electrostática (U)',
      'Gradiente de potencial (∇V)',
    ],
    simbolos: [
      { simbolo: 'ΔV = -∫ E·dl', significado: 'Diferencia de potencial integrando el campo eléctrico' },
      { simbolo: 'V = k Σ (qi / ri)', significado: 'Potencial de cargas puntuales (SUMA ALGEBRAICA CON SIGNO)' },
      { simbolo: 'E = -∇V', significado: 'Ex = -∂V/∂x, Ey = -∂V/∂y, Ez = -∂V/∂z' },
    ],
    unidades: 'Potencial: Volt [V] = [J/C]. Energía: Joule [J] o Electrón-Volt [1 eV = 1,602 × 10⁻¹⁹ J].',
    cuandoSeUsa:
      'Siempre que pidan trabajo para mover cargas, velocidad final por conservación de la energía (ΔK + ΔU = 0), o cuando resulte más fácil sumar escalares V y luego derivar para hallar E.',
    cuandoNoSeUsa:
      'No confundir V = 0 con E = 0: en el punto medio de un dipolo (+q y -q), el potencial escalar es V = 0, pero el campo eléctrico vectorial E NO es cero.',
    erroresTipicos: [
      'Olvidar poner el signo negativo de las cargas al sumar potenciales V = k(q1/r1 + q2/r2). ¡En potencial el signo de q VA ADENTRO de la cuenta!',
      'En la energía de un sistema de 4 cargas (TP4 Ej. 5), contar dos veces el mismo par o contar solo 4 lados del rectángulo olvidando las 2 diagonales (son 6 pares en total para 4 cargas).',
    ],
    ejemploSencillo:
      'TP N°4 Ej. 1: Mover q = 2×10⁻⁴ C en campo uniforme E = 400 N/C por trayectoria directa ad o quebrada abcd da exactamente el mismo módulo de trabajo |W| = q·E·d = 2,4 mJ porque el tramo perpendicular al campo tiene cos(90°) = 0.',
    ejemploNivelExamen:
      'TP N°4 Ej. 9 (Gradiente): Dado V(x,y) = 3x²y - 4xy - 5xy², el campo se obtiene derivando parcialmente y cambiando el signo: Ex = -∂V/∂x = -(6xy - 4y - 5y²) y Ey = -∂V/∂y = -(3x² - 4x - 10xy).',
  },
  {
    id: 'teo-u4-capacitores',
    unitNumber: 4,
    title: 'Capacitores, Dieléctricos (Ke) y Condición Con/Sin Batería',
    sourcePdf: '04-ELECTRODINAMICA-SIS-_AL.pdf y Ingenieria_-_T.P.N5_-_Capacitores.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En el TP N°5 la cátedra denota la constante dieléctrica como Ke (o κ en el apunte teórico), y utiliza la fórmula oficial Ec. (8.2) para la carga superficial inducida en el dieléctrico: q_face = Q · (1 - 1/Ke).',
    queEs:
      'Un capacitor o condensador es un sistema de dos conductores separados por un aislante (o vacío) con cargas iguales y opuestas (+q y -q) que almacena energía potencial en el campo eléctrico entre sus placas.',
    quePasaFisicamente:
      'Al insertar un dieléctrico polarizable entre las placas, las moléculas se orientan creando una carga inducida q_face en las caras del aislante que genera un campo interno opuesto al de las placas. Esto debilita el campo neto E = E0 / Ke y permite almacenar más carga al mismo voltaje.',
    porQueOcurre:
      'Porque la capacidad C = ε0·Ke·A / d depende exclusivamente de la geometría (A, d, radios) y del material (Ke), nunca de Q ni de V.',
    magnitudes: [
      'Capacidad o Capacitancia (C)',
      'Constante dieléctrica (Ke o κ ≥ 1)',
      'Rigidez dieléctrica (E_max en V/m antes de que salte chispa)',
      'Energía electrostática almacenada (U = ½ C·V²)',
    ],
    simbolos: [
      { simbolo: 'C = ε0·Ke·A / d', significado: 'Capacidad de placas paralelas con dieléctrico' },
      { simbolo: 'C = 2πε0·l / ln(rb/ra)', significado: 'Capacidad de un cable coaxial cilíndrico (TP5 Ej. 6)' },
      { simbolo: 'q_face = Q(1 - 1/Ke)', significado: 'Carga inducida en la cara del dieléctrico' },
    ],
    unidades: 'Capacidad: Faradio [F] = [C/V]. Submúltiplos habituales en TP5: μF (10⁻⁶ F), nF (10⁻⁹ F), pF (10⁻¹² F).',
    cuandoSeUsa:
      'En problemas de almacenamiento de energía, ruptura de aislación por rigidez dieléctrica y redes serie/paralelo.',
    cuandoNoSeUsa:
      'No usar las fórmulas de resistencias para sumar capacitores: en capacitores en PARALELO se suman directo (Ceq = C1 + C2) y en SERIE se suman las inversas (1/Ceq = 1/C1 + 1/C2).',
    erroresTipicos: [
      'Confundir qué se mantiene constante al meter el dieléctrico: si la batería sigue CONECTADA, V es constante y Q aumenta (Q = Ke·Q0). Si la batería se DESCONECTÓ antes (TP5 Ej. 4), Q queda atrapada constante y el voltaje CAE (V = V0 / Ke).',
      'En dos dieléctricos apilados en espesores d1 y d2 (TP5 Ej. 3), olvidar que el desplazamiento/carga es común y ΔV_total = E1·d1 + E2·d2.',
    ],
    ejemploSencillo:
      'TP N°5 Ej. 4: Un capacitor se carga a 12 V en aire, se DESCONECTA la batería y se introduce un dieléctrico, cayendo el voltaje a 4,2 V. Como Q es constante, Ke = V0 / Vk = 12 V / 4,2 V = 2,85.',
    ejemploNivelExamen:
      'TP N°5 Ej. Propuesto B (Llave conmutadora S de a → b): C1 se carga a V0 con carga Q0 = C1·V0 y luego se desconecta de la fuente y se conecta en paralelo con C2 y C3 descargados. La carga Q0 se conserva repartida entre C1 y la rama C2-C3, pero la energía final es MENOR que la inicial (se disipa energía en el chispazo/cables).',
  },
  {
    id: 'teo-u5-circuitos',
    unitNumber: 5,
    title: 'Corriente Eléctrica, Ley de Ohm, Instrumentos y Reglas de Kirchhoff',
    sourcePdf: '04-ELECTRODINAMICA-SIS-_AL.pdf y Trabajo Practico N°6 - Circuitos Electricos.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'El apunte del Prof. Chade Vergara (pág. 9) subraya una pregunta clásica de coloquio: "La relación V = i·R NO es el enunciado de la Ley de Ohm; R = V/i es la definición general de resistencia. La Ley de Ohm afirma que R es constante e independiente de V e i".',
    queEs:
      'Estudia el movimiento estacionario de portadores de carga en conductores impulsados por fuentes de fuerza electromotriz (fem ε) y el balance de carga y energía en redes de múltiples mallas.',
    quePasaFisicamente:
      'Una batería actúa como una "bomba de cargas" que eleva la energía potencial de los portadores de menor a mayor potencial. En los resistores, los electrones chocan con la red cristalina manteniendo una velocidad de arrastre constante y transformando su energía potencial eléctrica en calor (Efecto Joule).',
    porQueOcurre:
      'Por dos principios de conservación fundamentales: en un nudo no se acumula carga (1ra Ley de Kirchhoff: Σi = 0) y el campo electrostático es conservativo al dar una vuelta cerrada (2da Ley de Kirchhoff: ΣΔV = 0).',
    magnitudes: [
      'Corriente eléctrica (i en A) y Densidad de corriente (j = i/A en A/m²)',
      'Resistividad (ρ en Ω·m) y coeficiente térmico (α en 1/°C)',
      'Resistencia (R en Ω) y Potencia disipada (P = i²R en W)',
      'Fuerza electromotriz (ε en V) y resistencia interna (r)',
    ],
    simbolos: [
      { simbolo: 'R = ρ·L / A', significado: 'Resistencia geométrica de un conductor cilíndrico' },
      { simbolo: 'R(T) = R0[1 + α(T - T0)]', significado: 'Variación de resistencia con la temperatura' },
      { simbolo: 'ΣΔV = 0', significado: 'Ley de las Mallas: a favor de i en resistor es -i·R; de - a + en fem es +ε' },
    ],
    unidades: 'Corriente: Ampere [A = C/s]. Resistencia: Ohm [Ω = V/A]. Potencia: Watt [W = J/s = V·A].',
    cuandoSeUsa:
      'Cuando el circuito tiene más de una fuente en distintas ramas (que no se pueden reducir por simple serie/paralelo) se aplican obligatoriamente las Leyes de Kirchhoff.',
    cuandoNoSeUsa:
      'No conectar nunca un amperímetro en paralelo (tiene RA ≈ 0 y provoca cortocircuito) ni un voltímetro en serie (tiene RV → ∞ y abre el circuito dejando i = 0, como en el Ej. 3b del TP N°6).',
    erroresTipicos: [
      'Equivocarse en el signo al recorrer una malla de Kirchhoff: si recorres un resistor en sentido OPUESTO a la corriente elegida, el cambio de potencial es POSITIVO (+i·R).',
      'En un circuito RC, olvidar que en t = 0 (recién cerrado el interruptor) el capacitor descargado actúa como un cable en cortocircuito (Vc = 0, i_inicial = ε/R) y en t → ∞ actúa como una llave abierta (i = 0, Vc = ε).',
    ],
    ejemploSencillo:
      'TP N°6 Ej. 3: Si un voltímetro ideal (RV = ∞) se conecta por error EN SERIE con una batería de 12V y resistencias, la corriente del circuito cae a i = 0 A y el voltímetro marca los 12 V completos de la fuente.',
    ejemploNivelExamen:
      'TP N°6 Ej. 8 a 11 (Mallas de Kirchhoff): En un circuito de 2 mallas con fuentes enfrentadas, se asignan corrientes i1, i2, i3 en el nudo (i1 = i2 + i3), se plantean 2 ecuaciones de malla respetando los 4 signos de la Fig. 15 de la cátedra y se resuelve el sistema lineal.',
  },
  {
    id: 'teo-u6-magnetismo',
    unitNumber: 6,
    title: 'Campo Magnético, Fuerza de Lorentz, Biot-Savart y Ley de Ampère',
    sourcePdf: '05-MAGNETISMO-SIS-AL.pdf y Trabajo Practico N°7',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'El apunte del Prof. Chade Vergara enfatiza tres diferencias de examen entre fuerza eléctrica y magnética: 1) Fe es paralela a E, pero FB es SIEMPRE perpendicular a B y a v; 2) FB solo actúa si la carga se mueve; 3) Un campo magnético estático NUNCA realiza trabajo (W = 0) ni cambia el módulo de la velocidad.',
    queEs:
      'El magnetismo es la interacción entre cargas eléctricas en movimiento (corrientes). Las líneas de campo magnético B siempre forman anillos cerrados porque no existen monopolos magnéticos (∮ B·dA = 0).',
    quePasaFisicamente:
      'Una carga q moviéndose con velocidad v dentro de un campo B experimenta una fuerza lateral F = q(v × B) perpendicular a su trayectoria. Al no tener componente tangencial, no la frena ni la acelera en rapidez: solo curva su trayectoria en un círculo o hélice.',
    porQueOcurre:
      'Porque toda corriente eléctrica genera una circulación magnética a su alrededor cuantificada por la Ley de Biot-Savart (para elementos dl) y la Ley de Ampère (∮ B·dl = μ0·i_enc).',
    magnitudes: [
      'Inducción magnética (B en Tesla o Gauss: 1 T = 10⁴ G)',
      'Flujo magnético (ΦB en Weber: 1 T = 1 Wb/m²)',
      'Momento dipolar magnético (μ = N·i·A en A·m²)',
      'Par de torsión magnético (τ = μ × B en N·m)',
    ],
    simbolos: [
      { simbolo: 'F = q(v × B)', significado: 'Módulo F = |q|·v·B·sen(θ); dirección por regla de mano derecha' },
      { simbolo: 'R = m·v⊥ / (|q|·B)', significado: 'Radio de giro ciclotrónico de una partícula en B' },
      { simbolo: '∮ B·dl = μ0·i_enc', significado: 'Ley de Ampère (μ0 = 4π × 10⁻⁷ T·m/A)' },
    ],
    unidades: 'Campo B: Tesla [T = N / (A·m) = Wb / m²]. Flujo ΦB: Weber [Wb = T·m²].',
    cuandoSeUsa:
      'Ley de Ampère se usa para despejar B solo en alta simetría: hilo infinito (B = μ0·i / 2πr), solenoide largo (B = μ0·n·i) y toroide. Para segmentos cortos o espiras sobre el eje se usa Biot-Savart (TP7 Ej. 5 y 7).',
    cuandoNoSeUsa:
      'No usar B = μ0·i / (2πr) para un segmento corto de alambre ni para el eje de una espira circular.',
    erroresTipicos: [
      'En trayectoria helicoidal (TP7 Ej. 2), usar la velocidad total en R = mv/(qB) en lugar de usar solo la componente PERPENDICULAR al campo B.',
      'En par de torsión de una espira (TP7 Ej. 12), confundir el ángulo con el plano de la espira (30°) con el ángulo respecto al vector normal μ (que es el complementario: 90° - 30° = 60°).',
    ],
    ejemploSencillo:
      'TP N°7 Ej. 1: Un protón a v = 3×10⁵ m/s en B = 2 T con θ = 30° sufre F = q·v·B·sen(30°) = 4,8×10⁻¹⁴ N perpendicular al plano formado por v y B.',
    ejemploNivelExamen:
      'TP N°7 Ej. 16 (Superconductividad Efecto Meissner): En un alambre de Niobio de diámetro 5 mm (r = 2,5 mm), la superconductividad se destruye si B_superficial > 0,100 T. Por Ley de Ampère en el borde del alambre: B = μ0·I_max / (2πr) ⇒ I_max = 2π·r·B / μ0 = 1250 A.',
  },
  {
    id: 'teo-u7-faraday-maxwell',
    unitNumber: 7,
    title: 'Ley de Faraday-Lenz, Fem de Movimiento y las 4 Ecuaciones de Maxwell',
    sourcePdf: 'Unidad N°8 - Ley de Faraday.pdf y 06-ELECTROMAGNETISMO-SIS-AL.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En las diapositivas del Ing. Tejada Barrantes (Unidad 8) y el apunte del Prof. Chade Vergara (Unidad IV/VI), se exige demostrar tanto la regla de la "Cara N / Cara S" de Lenz como el balance energético de la barra móvil (P_mecánica = Fap·v = B²l²v²/R = ε²/R = P_eléctrica) y el argumento de simetría de Maxwell para la corriente de desplazamiento.',
    queEs:
      'La Ley de Faraday establece que un flujo magnético variable en el tiempo a través de un circuito induce una fuerza electromotriz ε = -N dΦB/dt. La Ley de Lenz explica que el sentido de la corriente inducida se opone al CAMBIO de flujo magnético.',
    quePasaFisicamente:
      'Si el flujo magnético que atraviesa una espira aumenta, la espira induce una corriente cuyo campo magnético propio B_ind apunta en sentido OPUESTO al externo para frenar el aumento. Si el flujo disminuye, B_ind apunta A FAVOR del campo externo para tratar de sostenerlo.',
    porQueOcurre:
      'Por conservación de la energía: si la corriente inducida ayudara al movimiento del imán o de la barra, el sistema se aceleraría solo desde el reposo creando energía de la nada.',
    magnitudes: [
      'Enlace de flujo magnético (N·ΦB)',
      'Fuerza electromotriz inducida (ε en Volts = Wb/s)',
      'Fem de movimiento en barra conductora (ε = -B·l·v)',
      'Corriente de desplazamiento de Maxwell (id = ε0 dΦE/dt)',
    ],
    simbolos: [
      { simbolo: 'ε = -N dΦB/dt', significado: 'Ley de Faraday-Lenz para bobina de N espiras' },
      { simbolo: 'Fap = B²·l²·v / R', significado: 'Fuerza externa necesaria para mover la barra a velocidad constante v' },
      { simbolo: '∮ B·ds = μ0·i + μ0·ε0(dΦE/dt)', significado: 'Ley de Ampère-Maxwell completa' },
    ],
    unidades: 'Fem inducida: [Volt] = [Weber / segundo] = [Tesla · m² / s].',
    cuandoSeUsa:
      'En todo problema donde varíe B(t), varíe el área A(t) (barra sobre rieles) o varíe el ángulo φ(t) = ω·t (generador de corriente alterna).',
    cuandoNoSeUsa:
      'Si el campo magnético es muy grande pero CONSTANTE en el tiempo, el área no cambia y la espira no gira, entonces dΦB/dt = 0 y la fem inducida es exactamente CERO.',
    erroresTipicos: [
      'Creer que la Ley de Lenz dice que "B_inducido siempre se opone a B_externo". ¡FALSO! Se opone al CAMBIO (dΦB/dt): cuando el imán se ALEJA, B_inducido apunta en el MISMO sentido que B_externo.',
      'Olvidar que en una barra móvil sobre rieles aparece una fuerza magnética F_B = i·l·B que siempre frena a la barra.',
    ],
    ejemploSencillo:
      'Si acercas el polo Norte de un imán a una espira, la cara de la espira que mira al imán genera un polo Norte (corriente antihoraria vista desde el imán) para repelerlo.',
    ejemploNivelExamen:
      'Demostración de Pizarrón (Apunte 06 pág. 8-9): Maxwell observó que ∮ E·ds = -dΦB/dt dice "un B que cambia crea E". Por simetría, un E que cambia debe crear B, agregando a la Ley de Ampère el término de corriente de desplazamiento id = ε0(dΦE/dt).',
  },
  {
    id: 'teo-u8-inductancia-ca',
    unitNumber: 8,
    title: 'Autoinductancia, Materiales Magnéticos (Histéresis) y Circuitos RLC',
    sourcePdf: 'Unidad N°9 - Inductancia.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En la presentación oficial de Unidad N°9 (Ing. Tejada Barrantes, diapo 5 y 6) se recalca con un cartel de CUIDADO: "La fem autoinducida NO se opone a la corriente i en sí, sino a cualquier cambio (di/dt) en la corriente".',
    queEs:
      'La autoinductancia L mide la oposición de una bobina a los cambios bruscos de su propia corriente mediante una fem autoinducida εL = -L(di/dt). Además, analiza cómo los materiales magnéticos alteran el campo y cómo responden R, L y C en corriente alterna.',
    quePasaFisicamente:
      'Al cerrar un interruptor, la corriente no salta instantáneamente a ε/R porque el aumento del flujo propio induce una fem opuesta que suaviza el crecimiento. Mientras conduce corriente I, el inductor almacena energía magnética U = ½ L·I² en su campo B.',
    porQueOcurre:
      'Porque el enlace de flujo propio N·ΦB es directamente proporcional a la corriente i (N·ΦB = L·i), donde L depende exclusivamente de la geometría (en un solenoide: L = μ0·n²·l·A).',
    magnitudes: [
      'Inductancia o Autoinductancia (L en Henry [H])',
      'Energía magnética almacenada (U = ½ L·I² en Joules)',
      'Vector Magnetización (M = Σμ / V) y permeabilidad relativa Km',
      'Impedancia (Z), reactancias XL = ωL y XC = 1/(ωC)',
    ],
    simbolos: [
      { simbolo: 'L = N·ΦB / i', significado: 'Definición general de autoinductancia' },
      { simbolo: 'L = μ0·n²·l·A', significado: 'Inductancia de un solenoide de longitud l y área A' },
      { simbolo: 'Vab = L(di/dt)', significado: 'Caída de potencial en inductor (>0 si i crece, <0 si i decrece)' },
    ],
    unidades: 'Inductancia: Henry [H] = [V·s / A] = [Wb / A] = [Ω·s].',
    cuandoSeUsa:
      'En transitorios RL, cálculo de energía en bobinas, clasificación de materiales (diamagnético Km < 1, paramagnético Km > 1 leve, ferromagnético Km ≫ 1 con histéresis) y circuitos de corriente alterna.',
    cuandoNoSeUsa:
      'En corriente continua constante estacionaria (di/dt = 0), un inductor ideal tiene Vab = 0 y se comporta como un simple cable sin resistencia.',
    erroresTipicos: [
      'Olvidar que la inductancia de un solenoide es proporcional al CUADRADO del número de vueltas (L ∝ N²): si duplicas las vueltas manteniendo la geometría, L se multiplica por 4.',
      'Confundir un resistor (que disipa energía P = i²R siempre en calor) con un inductor (que almacena energía ½LI² cuando i crece y la devuelve cuando i disminuye).',
    ],
    ejemploSencillo:
      'Si por un inductor de L = 2 H circula una corriente constante de 5 A, la diferencia de potencial entre sus bornes es Vab = L(di/dt) = 0 V, pero almacena una energía U = ½(2)(5²) = 25 J.',
    ejemploNivelExamen:
      'Deducción de cátedra (Unidad 9 diapo 7): Para un solenoide, B = μ0·n·i y el flujo por espira es ΦB = B·A. Como L = N·ΦB/i y N = n·l, reemplazando se cancela la corriente i y queda L = μ0·n²·l·A = μ0·n²·V.',
  },
  {
    id: 'teo-u9-ondas-optica-calor',
    unitNumber: 9,
    title: 'Ondas Electromagnéticas, Velocidad de la Luz, Óptica y Calor',
    sourcePdf: '06-ELECTROMAGNETISMO-SIS-AL.pdf y Física ll-2025-2013.pdf',
    sourceBadge: 'Material Oficial Cátedra UNdeC',
    convencionCatedra:
      'En el apunte 06 del Prof. Chade Vergara (pág. 11) se exige saber demostrar numéricamente cómo Maxwell obtuvo la velocidad de la luz a partir de las constantes eléctricas y magnéticas del vacío: c = 1 / √(ε0 · μ0) = 2,9986 × 10⁸ m/s.',
    queEs:
      'Unifica la Óptica como una rama del Electromagnetismo (ondas transversales de E y B perpendiculares entre sí y a la dirección de propagación) junto con las leyes de refracción y transferencia de energía térmica.',
    quePasaFisicamente:
      'Una carga acelerada u oscilante genera un campo eléctrico variable que induce un campo magnético variable, el cual a su vez induce un campo eléctrico, propagándose por el vacío a velocidad c sin necesitar medio material.',
    porQueOcurre:
      'Por el acoplamiento entre la Ley de Faraday y el término de corriente de desplazamiento de Maxwell.',
    magnitudes: [
      'Velocidad de la luz en el vacío (c ≈ 3 × 10⁸ m/s)',
      'Longitud de onda (λ) y frecuencia (f): c = λ·f',
      'Índice de refracción (n = c/v) y ángulos de incidencia/refracción',
      'Cantidad de calor (Q = m·c·ΔT)',
    ],
    simbolos: [
      { simbolo: 'c = 1 / √(ε0·μ0)', significado: 'Velocidad de propagación de ondas EM en el vacío' },
      { simbolo: 'n1·sen(θ1) = n2·sen(θ2)', significado: 'Ley de Snell de la refracción óptica' },
    ],
    unidades: 'Velocidad c: [m/s]. Frecuencia: Hertz [Hz = 1/s]. Calor: Joule [J] o caloría [1 cal = 4,184 J].',
    cuandoSeUsa:
      'En preguntas de coloquio sobre la unificación de Maxwell, clasificación del espectro electromagnético, refracción de rayos luminosos y balances calorimétricos.',
    cuandoNoSeUsa:
      'No asumir que las ondas de radio viajan más lento en el vacío que los rayos gamma: TODAS las ondas electromagnéticas viajan exactamente a la velocidad c en el vacío.',
    erroresTipicos: [
      'En la Ley de Snell, medir los ángulos respecto a la superficie del vidrio o agua en lugar de medirlos respecto a la recta NORMAL (perpendicular) a la interfaz.',
    ],
    ejemploSencillo:
      'Sustituyendo ε0 = 8,85×10⁻¹² C²/(N·m²) y μ0 = 1,26×10⁻⁶ T·m/A en c = 1/√(ε0·μ0) se obtiene c = 2,9986×10⁸ m/s.',
    ejemploNivelExamen:
      'Explicar en el oral por qué las ecuaciones de Maxwell son invariantes ante transformaciones de Lorentz (Relatividad Especial de Einstein) y cómo demuestran que E y B son perpendiculares en una onda radiada.',
  },
];

export const INTERACTIVE_FORMULAS: InteractiveFormula[] = [
  {
    id: 'form-gauss-elec',
    unitNumber: 2,
    title: 'Ley de Gauss de la Electricidad',
    equationDisplay: 'ΦE = ∮ E⃗ · dS⃗ = q_enc / ε₀',
    sourcePdf: 'Unidad_N2_-_Ley_de_Gauss-1.pdf y TP3_-La_Ley_de_Gauss.pdf',
    symbols: [
      {
        symbol: '∮',
        name: 'Integral de Superficie Cerrada',
        physicalMeaning: 'Indica que la suma del flujo se evalúa sobre una superficie gaussiana completamente cerrada (como una esfera, cilindro con tapas o caja que envuelve una región).',
        unitsSI: 'Operador adimensional',
        typicalError: 'Olvidar sumar el flujo en las 2 tapas de un cilindro además de la pared lateral (ΦT = Φ1 + Φ2 + Φ3).',
      },
      {
        symbol: 'E⃗',
        name: 'Vector Campo Eléctrico en la Superficie',
        physicalMeaning: 'Es el campo eléctrico evaluado exactamente sobre los puntos de la superficie gaussiana (puede ser creado por cargas internas y externas, aunque solo las internas dan flujo neto).',
        unitsSI: 'N/C o V/m',
        typicalError: 'Creer que si q_enc = 0 entonces E = 0 en cada punto de la superficie (solo el flujo total es cero).',
      },
      {
        symbol: 'dS⃗',
        name: 'Vector Diferencial de Superficie',
        physicalMeaning: 'Vector de módulo igual al área infinitesimal dS y dirección SIEMPRE perpendicular a la superficie apuntando hacia AFUERA.',
        unitsSI: 'm²',
        typicalError: 'Tomar el ángulo con la superficie en lugar del ángulo entre E⃗ y la normal exterior dS⃗.',
      },
      {
        symbol: 'q_enc',
        name: 'Carga Neta Encerrada',
        physicalMeaning: 'Suma algebraica (con sus signos + y -) de todas las cargas que están estrictamente ADENTRO de la superficie gaussiana en ese radio r.',
        unitsSI: 'Coulomb [C]',
        typicalError: 'En una esfera maciza o cáscara gruesa con r < b, poner la carga total en vez de integrar o recortar el volumen hasta el radio r de la gaussiana.',
      },
      {
        symbol: 'ε₀',
        name: 'Permitividad Eléctrica del Vacío',
        physicalMeaning: 'Constante fundamental que caracteriza la respuesta del vacío al campo eléctrico.',
        unitsSI: '8,854 × 10⁻¹² C² / (N·m²)',
        typicalError: 'Confundir ε₀ con k = 1/(4πε₀) y multiplicar por 4π dos veces.',
      },
    ],
    physicalInterpretation:
      'El número neto de líneas de campo eléctrico que atraviesan una superficie cerrada hacia afuera es directamente proporcional a la carga neta encerrada en su interior, sin importar el tamaño ni la forma de la superficie.',
    applicationConditions:
      'La ley ΦE = q_enc/ε₀ es universalmente válida. Sin embargo, para despejar E(r) requiere simetría esférica, cilíndrica infinita o plana infinita.',
    whenCanExtractFromIntegral:
      'SOLO puedes sacar el módulo |E| afuera de la integral (∮ E·dS·cosθ = E ∮ dS) cuando se cumplen DOS condiciones en esa porción de superficie: 1) El ángulo θ entre E⃗ y dS⃗ es constante (0° o 180°, donde cosθ = ±1), y 2) El módulo |E| vale exactamente lo mismo en todos los puntos de esa superficie por simetría.',
    whenProhibitedToExtract:
      'ESTÁ PROHIBIDO sacar E afuera de la integral si la superficie no respeta la simetría de la carga (ej. una esfera descentrada respecto a la carga puntual, o un alambre corto donde el campo varía en los extremos).',
    howToIsolateVariables: [
      'Esfera (simetría esférica): E · (4πr²) = q_enc / ε₀  ⇒  E(r) = q_enc / (4πε₀·r²)',
      'Cilindro largo (simetría cilíndrica): E · (2πr·L) = (λ·L) / ε₀  ⇒  E(r) = λ / (2πε₀·r)',
      'Placa aislante infinita (2 caras de flujo): 2·E·A = (σ·A) / ε₀  ⇒  E = σ / (2ε₀)',
    ],
    dimensionalVerification:
      '[E] · [A] = [N/C] · [m²] = [N·m²/C]. Del lado derecho: [q]/[ε₀] = [C] / [C²/(N·m²)] = [N·m²/C]. ¡Unidades idénticas!',
    frequentErrors: [
      'Olvidar el factor 2 en las dos caras de la gaussiana de una lámina infinita aislante.',
      'No anular el flujo en las tapas de un cilindro largo donde E⃗ ⊥ dS⃗ (cos 90° = 0).',
    ],
  },
  {
    id: 'form-capacitancia-diel',
    unitNumber: 4,
    title: 'Capacidad, Dieléctricos y Energía en Capacitores',
    equationDisplay: 'C = q / V = Ke · ε₀ · A / d   |   U = ½ C·V² = q² / (2C)',
    sourcePdf: '04-ELECTRODINAMICA-SIS-_AL.pdf y Ingenieria_-_T.P.N5_-_Capacitores.pdf',
    symbols: [
      {
        symbol: 'C',
        name: 'Capacidad o Capacitancia',
        physicalMeaning: 'Medida de cuánta carga puede almacenar el capacitor por cada Volt de diferencia de potencial. Depende SOLO de la geometría y del dieléctrico.',
        unitsSI: 'Faradio [F = C/V]',
        typicalError: 'Decir en el oral que "si duplico la carga q, se duplica la capacidad C". ¡Falso! Si duplicas q, se duplica V y el cociente C = q/V permanece constante.',
      },
      {
        symbol: 'Ke (o κ)',
        name: 'Constante Dieléctrica Relativa',
        physicalMeaning: 'Factor adimensional (Ke ≥ 1) en el que aumenta la capacidad al llenar el espacio entre placas con un material aislante respecto al vacío.',
        unitsSI: 'Adimensional (sin unidades)',
        typicalError: 'Dividir por Ke en lugar de multiplicar cuando se calcula la nueva capacidad Ck = Ke·C0.',
      },
      {
        symbol: 'A y d',
        name: 'Área de placa y Separación entre placas',
        physicalMeaning: 'A es el área enfrentada de una placa y d la distancia entre ellas. A mayor área y menor separación, mayor capacidad.',
        unitsSI: 'A en [m²] (1 cm² = 10⁻⁴ m²), d en [m] (1 mm = 10⁻³ m)',
        typicalError: 'Pasar mal cm² a m² (dividir por 100 en vez de multiplicar por 10⁻⁴).',
      },
      {
        symbol: 'U',
        name: 'Energía Potencial Electrostática Almacenada',
        physicalMeaning: 'Trabajo total realizado para cargar el capacitor, almacenado en el campo eléctrico entre sus placas.',
        unitsSI: 'Joule [J]',
        typicalError: 'Usar U = C·V² olvidando el factor 1/2 que proviene de integrar ∫ (q/C) dq.',
      },
    ],
    physicalInterpretation:
      'El capacitor almacena energía en el campo eléctrico E entre sus placas. El dieléctrico reduce el campo interno por polarización superficial, permitiendo mayor capacidad.',
    applicationConditions:
      'C = Ke·ε₀·A/d aplica a placas planas paralelas con d mucho menor que las dimensiones de la placa. Para cable coaxial usar C = 2πε₀·l / ln(rb/ra).',
    whenCanExtractFromIntegral:
      'Al deducir U = ∫ V(q\') dq\' = (1/C) ∫ q\' dq\', la capacidad C sale afuera de la integral porque C es constante durante el proceso de carga a geometría fija.',
    whenProhibitedToExtract:
      'No puedes tratar V como constante durante la integral de carga dW = V(q\') dq\' porque el voltaje de las placas crece linealmente desde 0 hasta V a medida que se deposita carga.',
    howToIsolateVariables: [
      'Batería CONECTADA al meter dieléctrico: V = cte, C aumenta (Ke·C0), Q aumenta (Ke·Q0), E = V/d = cte, U aumenta (Ke·U0).',
      'Batería DESCONECTADA al meter dieléctrico: Q = cte, C aumenta (Ke·C0), V cae (V0/Ke), E cae (E0/Ke), U disminuye (U0/Ke).',
    ],
    dimensionalVerification:
      '[U] = [C]·[V²] = [C/V]·[V²] = [C·V] = [C · (J/C)] = [Joule].',
    frequentErrors: [
      'No distinguir si el problema dice "con la batería conectada" o "se desconecta la batería antes de insertar el dieléctrico".',
    ],
  },
  {
    id: 'form-ampere-maxwell',
    unitNumber: 6,
    title: 'Ley de Ampère y Generalización de Maxwell',
    equationDisplay: '∮ B⃗ · dl⃗ = μ₀ · (i_c + ε₀ · dΦE / dt)',
    sourcePdf: '06-ELECTROMAGNETISMO-SIS-AL.pdf y Trabajo Practico N°7',
    symbols: [
      {
        symbol: '∮ B⃗ · dl⃗',
        name: 'Circulación del Campo Magnético',
        physicalMeaning: 'Integral de línea cerrada del campo magnético B a lo largo de una curva imaginaria cerrada (curva amperiana).',
        unitsSI: 'Tesla · metro [T·m]',
        typicalError: 'Confundir circulación de línea ∮ B·dl (longitud 2πr) con flujo de superficie ∮ B·dA (área 4πr²).',
      },
      {
        symbol: 'μ₀',
        name: 'Permeabilidad Magnética del Vacío',
        physicalMeaning: 'Constante magnética fundamental del vacío: μ₀ = 4π × 10⁻⁷ T·m/A ≈ 1,26 × 10⁻⁶ T·m/A.',
        unitsSI: 'T·m / A o N / A²',
        typicalError: 'Si hay un núcleo ferromagnético de permeabilidad relativa μr (como en TP7 Ej. 9b con μr = 1150), olvidar multiplicar por μr (B = μr·μ₀·n·i).',
      },
      {
        symbol: 'i_c',
        name: 'Corriente de Conducción Encerrada',
        physicalMeaning: 'Corriente neta de portadores de carga reales que atraviesa el interior de la curva amperiana.',
        unitsSI: 'Ampere [A]',
        typicalError: 'Incluir corrientes que pasan por afuera del anillo amperiano.',
      },
      {
        symbol: 'id = ε₀(dΦE/dt)',
        name: 'Corriente de Desplazamiento de Maxwell',
        physicalMeaning: 'Término agregado por Maxwell por simetría: un flujo eléctrico variable en el tiempo (ej. entre las placas de un capacitor cargándose) genera campo magnético igual que una corriente real.',
        unitsSI: 'Ampere [A]',
        typicalError: 'Pensar que id son cargas moviéndose por el vacío entre las placas.',
      },
    ],
    physicalInterpretation:
      'Los campos magnéticos son creados tanto por corrientes eléctricas en movimiento (i_c) como por campos eléctricos que varían en el tiempo (id).',
    applicationConditions:
      'Para despejar B de ∮ B·dl se requiere simetría cilíndrica (alambre largo), solenoidal (B = μ₀·n·i) o toroidal.',
    whenCanExtractFromIntegral:
      'Solo cuando elegimos una curva amperiana donde B es tangente a dl en todo el recorrido (cos 0° = 1) y el módulo |B| es uniforme sobre la curva (ej. circunferencia centrada en un hilo recto largo) o nulo en los tramos exteriores (solenoide ideal).',
    whenProhibitedToExtract:
      'PROHIBIDO sacar B de la integral para un cable de longitud corta (TP7 Ej. 5 y 13) o una espira circular finita; en esos casos debe usarse la Ley de Biot-Savart.',
    howToIsolateVariables: [
      'Conductor recto largo a distancia r: B · (2πr) = μ₀·i  ⇒  B = (μ₀·i) / (2πr)',
      'Interior de solenoide de N vueltas y longitud L (n = N/L): B · l = μ₀·(n·l·i)  ⇒  B = μ₀·n·i',
    ],
    dimensionalVerification:
      '[μ₀·i / r] = [(T·m/A) · A] / [m] = [Tesla].',
    frequentErrors: [
      'En el solenoide (B = μ₀·n·i), poner el número total de espiras N en vez de la densidad de espiras por metro n = N / L, o meter por error el radio del solenoide en la fórmula de B interior.',
    ],
  },
  {
    id: 'form-faraday-lenz',
    unitNumber: 7,
    title: 'Ley de Inducción de Faraday-Lenz y Fem de Movimiento',
    equationDisplay: 'ε = -N · (dΦB / dt)   |   ε_mov = -B · l · v',
    sourcePdf: 'Unidad N°8 - Ley de Faraday.pdf y 06-ELECTROMAGNETISMO-SIS-AL.pdf',
    symbols: [
      {
        symbol: 'ε',
        name: 'Fuerza Electromotriz Inducida',
        physicalMeaning: 'Trabajo por unidad de carga (o circulación ∮ E·dl del campo eléctrico inducido no conservativo) generado alrededor de la espira.',
        unitsSI: 'Volt [V = Wb/s]',
        typicalError: 'Confundir fem inducida ε (que existe aunque el anillo esté abierto) con corriente inducida i = |ε|/R (que requiere circuito cerrado).',
      },
      {
        symbol: 'Signo (-)',
        name: 'Ley de Lenz (Oposición al cambio)',
        physicalMeaning: 'Indica que la fem y la corriente inducida crean un campo magnético inducido B_ind que se opone a la VARIACIÓN del flujo magnético (no al campo B en sí).',
        unitsSI: 'Dirección física',
        typicalError: 'Suponer que el campo inducido siempre apunta en contra del campo externo incluso cuando el flujo está disminuyendo.',
      },
      {
        symbol: 'N',
        name: 'Número de Espiras de la Bobina',
        physicalMeaning: 'Cada vuelta enlaza el flujo ΦB, sumándose en serie como un enlace de flujo total N·ΦB.',
        unitsSI: 'Adimensional (vueltas)',
        typicalError: 'Olvidar multiplicar por N cuando el problema da una bobina de varias vueltas.',
      },
      {
        symbol: 'dΦB / dt',
        name: 'Rapidez de Cambio del Flujo Magnético',
        physicalMeaning: 'Derivada temporal de ΦB = ∫ B·dA·cos(φ). Puede variar porque cambia B(t), cambia el área A(t) = l·x(t) o cambia el ángulo φ(t) = ω·t.',
        unitsSI: 'Weber / segundo [Wb/s = V]',
        typicalError: 'Reemplazar directamente ΦB sin derivar respecto al tiempo.',
      },
    ],
    physicalInterpretation:
      'No es la presencia del campo magnético lo que induce voltaje, sino su RITMO DE CAMBIO temporal a través del área del circuito.',
    applicationConditions:
      'Universal para circuitos fijos o móviles en campos magnéticos constantes o variables.',
    whenCanExtractFromIntegral:
      'Al calcular ΦB = ∫ B·dA·cos(φ), puedes escribir ΦB = B·A·cos(φ) solo si en cada instante el campo B es espacialmente uniforme sobre toda el área plana A de la espira.',
    whenProhibitedToExtract:
      'ESTÁ PROHIBIDO escribir ΦB = B·A si la espira está al lado de un cable recto largo donde B(r) = μ₀i/(2πr) varía con la distancia dentro de la propia espira (ahí debes integrar dΦB = B(r)·L·dr).',
    howToIsolateVariables: [
      'Barra móvil sobre rieles: |ε| = B·l·v  ⇒  i = (B·l·v)/R  ⇒  F_aplicada = i·l·B = (B²·l²·v)/R',
      'Potencia mecánica = Potencia disipada en R: P = F_ap · v = (B²·l²·v²)/R = ε²/R',
    ],
    dimensionalVerification:
      '[B·l·v] = [T]·[m]·[m/s] = [N/(A·m)]·[m²/s] = [N·m / (A·s)] = [J / C] = [Volt].',
    frequentErrors: [
      'Olvidar que cuando el imán se detiene adentro de la bobina (v = 0), aunque el campo B es máximo, dΦB/dt = 0 y la corriente cae inmediatamente a cero.',
    ],
  },
  {
    id: 'form-inductancia-energia',
    unitNumber: 8,
    title: 'Autoinductancia, Solenoide y Energía Magnética',
    equationDisplay: 'εL = -L · (di / dt)   |   L_sol = μ₀ · n² · l · A   |   U = ½ L · I²',
    sourcePdf: 'Unidad N°9 - Inductancia.pdf',
    symbols: [
      {
        symbol: 'L',
        name: 'Autoinductancia del Inductor',
        physicalMeaning: 'Constante de proporcionalidad entre el enlace de flujo N·ΦB y la corriente i (L = N·ΦB/i). Depende solo de la geometría y del núcleo.',
        unitsSI: 'Henry [H = V·s/A = Wb/A]',
        typicalError: 'Pensar que L depende de la corriente i o de di/dt.',
      },
      {
        symbol: 'di / dt',
        name: 'Rapidez de Variación de la Corriente',
        physicalMeaning: 'Derivada temporal de la corriente. Si di/dt > 0 la corriente crece y el inductor se opone; si di/dt < 0 la corriente decrece y el inductor impulsa la corriente.',
        unitsSI: 'Ampere / segundo [A/s]',
        typicalError: 'Confundir i grande con di/dt grande: una corriente de 100 A constante tiene di/dt = 0 y εL = 0.',
      },
      {
        symbol: 'n = N / l',
        name: 'Densidad de Espiras por Unidad de Longitud',
        physicalMeaning: 'Número de vueltas por metro del solenoide. Aparece al cuadrado (n²) en la fórmula de L.',
        unitsSI: '1 / metro [m⁻¹]',
        typicalError: 'Olvidar elevar n al cuadrado en L = μ₀·n²·l·A.',
      },
      {
        symbol: 'U = ½ L·I²',
        name: 'Energía Almacenada en el Inductor',
        physicalMeaning: 'Trabajo entregado por la fuente contra la fem autoinducida para establecer la corriente I, acumulado en el campo magnético.',
        unitsSI: 'Joule [J]',
        typicalError: 'Confundir con la potencia instantánea P = L·i·(di/dt).',
      },
    ],
    physicalInterpretation:
      'El inductor es el dual magnético del capacitor: mientras el capacitor almacena energía ½CV² en un campo eléctrico y se opone a cambios bruscos de tensión, el inductor almacena energía ½LI² en un campo magnético y se opone a cambios bruscos de corriente.',
    applicationConditions:
      'L = μ₀·n²·l·A requiere un solenoide largo (l ≫ radio) con núcleo de aire/vacío (multiplicar por Km si tiene núcleo magnético).',
    whenCanExtractFromIntegral:
      'Al integrar la energía dU = L·i·di entre 0 e I, la inductancia L sale afuera de la integral siempre que el núcleo no sea ferromagnético saturado (L constante).',
    whenProhibitedToExtract:
      'Si el núcleo ferromagnético entra en saturación (Curva de Histéresis, Unidad 9 diapo 14), L deja de ser constante porque μ depende de i.',
    howToIsolateVariables: [
      'Si piden corriente a partir de energía almacenada: I = √(2·U / L)',
      'Si piden flujo por espira conociendo L e i: ΦB = (L · i) / N',
    ],
    dimensionalVerification:
      '[½ L·I²] = [H]·[A²] = [V·s/A]·[A²] = [V·A·s] = [W·s] = [Joule].',
    frequentErrors: [
      'Equivocarse en la polaridad de Vab en el inductor cuando la corriente está disminuyendo (di/dt < 0 ⇒ Vab < 0, el borne de salida queda a mayor potencial que el de entrada).',
    ],
  },
];

export const GUIDED_EXERCISES: GuidedExercise[] = [
  {
    id: 'ej-tp1-2',
    unitNumber: 1,
    tpReference: 'TP N°1 — Ejercicio N°2 (Equilibrio Vectorial de 4 Cargas)',
    sourcePdf: 'T.P.N1_Carga_y_Materia.pdf (Págs. 3 a 5)',
    difficulty: 'intermedio',
    title: 'Equilibrio de Fuerzas de Coulomb sobre q₁ en el Origen',
    statement:
      'Calcular el valor y el signo de la carga q₄ (ubicada en x = +20 cm sobre el eje +x) para que el vector resultante de fuerzas electrostáticas sobre la carga q₁ = +2 μC (en el origen) sea igual al vector nulo, sabiendo que q₂ = q₃ = -3 μC están a 10 cm del origen en el segundo y tercer cuadrante formando un ángulo θ = 30° con el eje vertical y.',
    givenData: [
      'q₁ = +2 μC = 2 × 10⁻⁶ C en (0, 0)',
      'q₂ = -3 μC a r₂₁ = 10 cm = 0,10 m (2do cuadrante, 60° con el semieje -x)',
      'q₃ = -3 μC a r₃₁ = 10 cm = 0,10 m (3er cuadrante, 60° con el semieje -x)',
      'r₄₁ = 20 cm = 0,20 m sobre el semieje +x',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Estrategia y Simetría): Antes de hacer cuentas, analiza cómo tiran las cargas negativas q₂ y q₃ sobre la carga positiva q₁ = +2 μC. ¿Qué ocurre por simetría en el eje vertical Y y en el eje horizontal X?',
      options: [
        'Ambas repelen a q₁ hacia la derecha (+x) y sus componentes en Y se suman.',
        'Como q₂ y q₃ son negativas e iguales, atraen a q₁: las componentes verticales Fy (+4,68 N y -4,68 N) se cancelan entre sí, y ambas componentes horizontales tiran hacia la izquierda (-x).',
        'El campo se anula sin necesidad de q₄ porque q₂ y q₃ son iguales.',
        'Se debe aplicar la Ley de Gauss esférica sobre q₁.',
      ],
      correctIndex: 1,
      explanation:
        '¡Exacto! q₁ es positiva y tanto q₂ como q₃ son negativas (-3 μC). Por atracción y simetría respecto al eje X, F₂₁y = +F·sen(60°) y F₃₁y = -F·sen(60°) se anulan mutuamente (ΣFy = 0), mientras que en el eje X ambas tiran hacia la izquierda (-x).',
      errorCategoryOnFail: 'simetria',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Modelo de Carga y Signo de q₄): Si la suma de F₂₁x + F₃₁x tira de q₁ hacia la izquierda (-x) con 5,4 N y q₄ está ubicada a la DERECHA de q₁ (en +x), ¿hacia dónde debe apuntar F₄₁ y qué signo debe tener obligatoriamente q₄?',
      options: [
        'F₄₁ debe tirar hacia la derecha (+x), por lo que q₄ debe ATRAER a q₁ (+) ⇒ q₄ debe ser NEGATIVA.',
        'F₄₁ debe tirar hacia la derecha (+x), por lo que q₄ debe ser POSITIVA.',
        'F₄₁ debe tirar hacia la izquierda (-x), por lo que q₄ debe ser negativa.',
        'El signo de q₄ no importa porque en Coulomb se eleva al cuadrado.',
      ],
      correctIndex: 0,
      explanation:
        '¡Muy bien! Este es el paso que destaca la cátedra en la pág. 4 del TP1: como q₄ está a la derecha de q₁ (+), para generar una fuerza hacia la derecha (+x) necesita ATRAER a q₁, por lo que q₄ debe tener signo NEGATIVO.',
      errorCategoryOnFail: 'signo',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Geometría y Componentes): El módulo de F₂₁ y F₃₁ a r = 0,10 m es |F₂₁| = k|q₁q₂|/r² = 5,4 N. Como el ángulo con el eje vertical es 30° (es decir, 60° con el eje -x), ¿cuánto vale la fuerza total hacia la izquierda que q₄ debe equilibrar?',
      options: [
        '2 × 5,4 N × sen(60°) = 9,36 N',
        '2 × 5,4 N × cos(60°) = 2,7 N + 2,7 N = 5,4 N hacia la izquierda (-x)',
        '5,4 N / 2 = 2,7 N',
        '0 N porque se anulan en X',
      ],
      correctIndex: 1,
      explanation:
        'Cada una aporta Fx = -5,4 · cos(60°) = -2,7 N. Sumando ambas contribuciones en -x: -2,7 N - 2,7 N = -5,4 N. Por lo tanto, |F₄₁| debe valer exactamente 5,4 N hacia +x.',
      errorCategoryOnFail: 'planteamiento',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Planteamiento de la Ecuación): Sabiendo que |F₄₁| = 5,4 N y que q₄ está a una distancia r₄₁ = 20 cm = 0,20 m, ¿cuál es el despeje correcto de |q₄|?',
      options: [
        '|q₄| = (|F₄₁| · r₄₁) / (k · |q₁|)',
        '|q₄| = (|F₄₁| · r₄₁²) / (k · |q₁|) = [5,4 N · (0,20 m)²] / [9×10⁹ · 2×10⁻⁶ C]',
        '|q₄| = (k · |q₁|) / (|F₄₁| · r₄₁²)',
        '|q₄| = √(5,4 · 0,20² / 9×10⁹)',
      ],
      correctIndex: 1,
      explanation:
        'De |F₄₁| = k·|q₄|·|q₁| / r₄₁², despejamos |q₄| = (|F₄₁| · r₄₁²) / (k · |q₁|), cuidando de pasar 20 cm a 0,20 m antes de elevar al cuadrado.',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Módulo de F₂₁ y F₃₁: |F₂₁| = |F₃₁| = (9×10⁹ N·m²/C²) · (3×10⁻⁶ C · 2×10⁻⁶ C) / (0,10 m)² = 5,4 N',
        '2) Equilibrio en eje Y: F₂₁y + F₃₁y = +5,4·sen(60°) - 5,4·sen(60°) = 0 N',
        '3) Suma en eje X de q₂ y q₃: F_x(2,3) = -2 · 5,4·cos(60°) = -5,4 N (hacia -x)',
        '4) Condición de equilibrio ΣFx = 0: F₄₁ = +5,4 N ⇒ k·|q₄|·|q₁| / r₄₁² = 5,4 N',
        '5) Despeje numérico: |q₄| = [5,4 · (0,20)²] / [9×10⁹ · 2×10⁻⁶] = 0,216 / 18000 = 1,2 × 10⁻⁵ C = 12 μC',
        '6) Asignación vectorial del signo por atracción hacia +x: q₄ = -12 μC',
      ],
      finalSymbolicFormula: 'q₄ = - (2 · |F₂₁| · cos(60°) · r₄₁²) / (k · |q₁|)',
      finalNumericalValue: '-12',
      expectedUnit: 'μC',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Verificación Física y Dimensional): Observa que r₄₁ (20 cm) es el DOBLE de la distancia de q₂ y q₃ (10 cm). ¿Por qué tiene sentido físico que |q₄| = 12 μC haya dado 4 veces más grande que la componente efectiva de 3 μC?',
        options: [
          'Porque la fuerza de Coulomb decae con el cuadrado de la distancia (r²): al estar al doble de distancia (2r), necesita (2)² = 4 veces más carga para ejercer la misma fuerza.',
          'Es una coincidencia numérica del ángulo de 30°.',
          'Porque la constante k cambia con la distancia.',
          'Porque q₁ vale 2 μC.',
        ],
        correctIndex: 0,
        explanation:
          '¡Excelente intuición física! Como F ∝ q/r², estar al doble de distancia reduce el efecto en un factor 2² = 4, obligando a que |q₄| sea 4 veces mayor (4 × 3 μC = 12 μC).',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[N · m²] / [N·m²/C² · C] = [C² / C] = [Coulomb].',
      limitingCaseNote: 'Si r₄₁ → ∞, |q₄| necesitaría tender a infinito para compensar a q₂ y q₃.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp1-2-a',
        question:
          '¿Qué pasa si cambiamos el signo de la carga central q₁ de +2 μC a -2 μC (manteniendo q₂ = q₃ = -3 μC en sus lugares)? ¿Qué valor y signo debería tener ahora q₄ para mantener a q₁ en equilibrio?',
        options: [
          'q₄ debería cambiar a +12 μC.',
          '¡q₄ seguiría siendo exactamente -12 μC! Porque q₁ se cancela en la condición de equilibrio ΣF = q₁·ΣE = 0.',
          'q₄ debería valer -6 μC.',
          'No existiría equilibrio posible.',
        ],
        correctIndex: 1,
        physicalExplanation:
          '¡Pregunta clásica de final! Para que la fuerza sobre q₁ sea nula (q₁·E_total = 0), lo que estamos anulando en el origen es el CAMPO ELÉCTRICO neto creado por q₂, q₃ y q₄. Si q₁ pasa a ser negativa, q₂ y q₃ la repelen hacia +x, y q₄ (-12 μC) también la repele hacia -x, manteniendo el equilibrio exacto con el mismo valor q₄ = -12 μC.',
      },
    ],
  },
  {
    id: 'ej-tp3-2',
    unitNumber: 2,
    tpReference: 'TP N°3 — Ejercicio N°2 (Cáscara Esférica Gruesa con Densidad Volumétrica ρ)',
    sourcePdf: 'TP3_-La_Ley_de_Gauss.pdf (Págs. 3 a 5)',
    difficulty: 'final',
    title: 'Campo Eléctrico de una Cáscara Esférica Aislante en las 3 Regiones (r ≤ a, a ≤ r ≤ b, r ≥ b)',
    statement:
      'Una cáscara esférica aislante tiene densidad volumétrica de carga uniforme ρ = 1,84 nC/m³, radio interno a = 10 cm (0,10 m) y radio externo b = 2a = 20 cm (0,20 m). Determinar la expresión simbólica del campo eléctrico E(r) dentro del espesor del material (a ≤ r ≤ b) y su valor numérico en r = 1,5a = 15 cm.',
    givenData: [
      'ρ = 1,84 nC/m³ = 1,84 × 10⁻⁹ C/m³ (uniforme entre a y b)',
      'Radio interno a = 0,10 m (hueco vacío para r < a)',
      'Radio externo b = 2a = 0,20 m',
      'Punto de evaluación: r = 1,5a = 0,15 m (dentro de la cáscara)',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Estrategia y Simetría): Para hallar el campo eléctrico en r = 0,15 m (que cumple a ≤ r ≤ b), ¿qué ley y qué superficie gaussiana debemos trazar?',
      options: [
        'Ley de Coulomb puntual directamente porque toda esfera se comporta como carga puntual incluso adentro.',
        'Ley de Gauss trazando una superficie gaussiana esférica concéntrica de radio r = 0,15 m, donde E⃗ es radial y paralelo a dS⃗ (θ = 0°).',
        'Ley de Gauss con un cilindro de radio a.',
        'El campo es cero porque dentro de cualquier esfera el campo siempre vale cero.',
      ],
      correctIndex: 1,
      explanation:
        'Por simetría esférica trazamos una gaussiana esférica concéntrica de radio r (con a ≤ r ≤ b). OJO: solo en el hueco vacío (r ≤ a) el campo es cero; entre a y b hay material aislante cargado y E NO es cero.',
      errorCategoryOnFail: 'simetria',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Cálculo de la Carga Encerrada q_enc para a ≤ r ≤ b): Como la carga solo existe desde el radio interno "a" hasta donde llega nuestra superficie gaussiana de radio "r", ¿cuál es el volumen cargado encerrado V_enc y la carga q_enc?',
      options: [
        'q_enc = ρ · (4/3)π · r³ (toda la esfera desde el centro)',
        'q_enc = ρ · (4/3)π · (b³ - a³) (toda la cáscara completa)',
        'q_enc = ρ · V_enc = ρ · (4/3)π · (r³ - a³) (solo la cáscara comprendida entre el hueco "a" y el radio gaussiano "r")',
        'q_enc = ρ · 4π · (r² - a²)',
      ],
      correctIndex: 2,
      explanation:
        '¡Clave absoluta de examen final! Para un radio intermedio a ≤ r ≤ b, debemos restar el volumen del hueco vacío (4/3 π a³) al volumen de la esfera de radio r (4/3 π r³), quedando q_enc = ρ · (4/3)π(r³ - a³).',
      errorCategoryOnFail: 'limites',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Integral de Superficie Izquierda): En la integral ∮ E⃗ · dS⃗ sobre nuestra esfera gaussiana de radio r, ¿por qué área debemos multiplicar a E?',
      options: [
        'Por el área de la esfera de radio r: A_g = 4π·r²',
        'Por 4π·(r² - a²)',
        'Por (4/3)π·r³',
        'Por 4π·b²',
      ],
      correctIndex: 0,
      explanation:
        'El miembro izquierdo de la Ley de Gauss SIEMPRE lleva el área de la superficie gaussiana de radio r: ∮ E·dS·cos(0°) = E · (4πr²). Nunca se resta "a²" en el área gaussiana.',
      errorCategoryOnFail: 'planteamiento',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Planteamiento y Despeje Simbólico): Igualando E · (4πr²) = q_enc / ε₀ con q_enc = ρ·(4/3)π(r³ - a³), ¿qué expresión queda para E(r) en la región a ≤ r ≤ b?',
      options: [
        'E(r) = ρ · (r³ - a³) / (3 · ε₀ · r²)',
        'E(r) = ρ · r / (3 · ε₀)',
        'E(r) = ρ · (b³ - a³) / (3 · ε₀ · r²)',
        'E(r) = ρ · (r² - a²) / (4 · ε₀ · r)',
      ],
      correctIndex: 0,
      explanation:
        'Al dividir ambos miembros por 4πr², el 4π del volumen se simplifica con el 4π del área, quedando exactamente la ecuación de la pág. 4 del TP3: E(r) = ρ·(r³ - a³) / (3·ε₀·r²).',
      errorCategoryOnFail: 'formula',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Región I (r ≤ a = 0,10 m, hueco interno): q_enc = 0  ⇒  E(r) = 0 N/C',
        '2) Región II (a ≤ r ≤ b): q_enc = ρ · (4/3)π(r³ - a³)',
        '3) Ley de Gauss: E · (4πr²) = [ρ · (4/3)π(r³ - a³)] / ε₀  ⇒  E(r) = ρ·(r³ - a³) / (3·ε₀·r²)',
        '4) Evaluación en r = 0,15 m: r³ - a³ = (0,15)³ - (0,10)³ = 0,003375 - 0,001 = 0,002375 m³',
        '5) Numerador: 1,84×10⁻⁹ C/m³ · 0,002375 m³ = 4,37 × 10⁻¹² C',
        '6) Denominador: 3 · (0,15 m)² · (8,85×10⁻¹² C²/N·m²) = 5,97 × 10⁻¹³ C²/N',
        '7) Cociente final en r = 15 cm: E = 4,37×10⁻¹² / 5,97×10⁻¹³ = 7,32 N/C',
        '8) Región III (r ≥ b = 0,20 m, exterior): q_enc fija en ρ·(4/3)π(b³ - a³) ⇒ E(r) = ρ·(b³ - a³) / (3·ε₀·r²)',
      ],
      finalSymbolicFormula: 'E(r) = ρ · (r³ - a³) / (3 · ε₀ · r²)',
      finalNumericalValue: '7.32',
      expectedUnit: 'N/C',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Casos Extremos y Continuidad): Si reemplazas r = a en tu fórmula E(r) = ρ(r³ - a³)/(3ε₀r²), ¿qué valor obtienes y por qué eso confirma que tu integral está bien planteada?',
        options: [
          'Da E(a) = 0 N/C, lo cual coincide continuamente con el campo nulo del hueco interior r ≤ a.',
          'Da infinito porque se divide por cero.',
          'Da el campo máximo de la esfera.',
          'Da negativo.',
        ],
        correctIndex: 0,
        explanation:
          '¡Exacto! Como no hay una lámina de carga superficial infinitamente delgada en r = a, el campo eléctrico debe ser continuo: al evaluar r = a da (a³ - a³) = 0, empalmando perfectamente con E = 0 del hueco.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[C/m³ · m³] / [m² · C²/(N·m²)] = [C] / [C²/N] = [N/C].',
      limitingCaseNote: 'Si a → 0 (esfera maciza sin hueco), la fórmula se reduce a E = ρ·r / (3ε₀), creciendo linealmente con r.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp3-2-a',
        question:
          '¿Qué pasa si la cáscara esférica entre a y b fuera de COBRE (conductor metálico en equilibrio electrostático) con la misma carga total Q, en lugar de un aislante con densidad volumétrica ρ?',
        options: [
          'El campo entre a y b seguiría siendo E(r) = ρ(r³ - a³)/(3ε₀r²).',
          'En un conductor en equilibrio TODA la carga neta migra a la superficie exterior r = b, por lo que para todo a < r < b (dentro del metal) el campo sería exactamente E = 0 N/C.',
          'Toda la carga iría a la superficie interna r = a.',
          'El campo afuera para r > b sería nulo.',
        ],
        correctIndex: 1,
        physicalExplanation:
          '¡Diferencia vital de final y coloquio! En un conductor en equilibrio electrostático, el campo dentro del material metálico (a < r < b) es SIEMPRE CERO, y toda la carga neta Q (si no hay cargas en el hueco) se ubica en la superficie exterior r = b.',
      },
    ],
  },
  {
    id: 'ej-tp4-6',
    unitNumber: 3,
    tpReference: 'TP N°4 — Ejercicio N°6 (Fusión de Dos Gotas Esféricas Cargadas)',
    sourcePdf: 'Ingenieria_-_T.P.N4_-_Potencial_Electrico.pdf (Pág. 4)',
    difficulty: 'avanzado',
    title: 'Potencial en la Superficie al Combinarse Dos Gotas Esféricas Iguales',
    statement:
      'Una gota esférica de agua que tiene una carga q = 100 pC (10⁻¹⁰ C) tiene un potencial V₁ = 600 V en su superficie. a) ¿Cuál es el radio R₁ de la gota? b) Si dos gotas iguales de la misma carga y radio se combinan para formar una sola gota esférica mayor, ¿cuál es el potencial V₂ en la superficie de la nueva gota?',
    givenData: [
      'Carga de una gota: q₁ = 100 pC = 100 × 10⁻¹² C = 1,0 × 10⁻¹⁰ C',
      'Potencial superficial de una gota: V₁ = 600 V',
      'Se fusionan 2 gotas idénticas en una sola gota esférica',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Estrategia Física): Cuando dos gotas de agua líquida cargadas se unen en una sola gota más grande, ¿qué dos magnitudes físicas se CONSERVAN aditivamente?',
      options: [
        'Se conservan el radio (R₂ = 2·R₁) y el potencial (V₂ = 2·V₁).',
        'Se conservan la CARGA TOTAL (Q₂ = 2·q₁) y el VOLUMEN TOTAL de agua (Vol₂ = 2·Vol₁), pero el radio NO se duplica.',
        'Se conserva el campo eléctrico superficial.',
        'El potencial permanece igual en 600 V.',
      ],
      correctIndex: 1,
      explanation:
        '¡Brillante! La carga se conserva (Q₂ = 2·q₁) y la masa/volumen de agua incompresible se conserva (Vol₂ = 2·Vol₁). Como el volumen de una esfera es (4/3)πR³, duplicar el volumen multiplica el radio por ∛2 ≈ 1,26, ¡no por 2!',
      errorCategoryOnFail: 'conceptual',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Cálculo del Radio Inicial R₁): Usando la expresión del potencial en la superficie de una esfera V₁ = k·q₁ / R₁ (Ec. 7.6 del TP4), ¿cuánto vale el radio inicial R₁?',
      options: [
        'R₁ = k·q₁ / V₁ = (9×10⁹ · 10⁻¹⁰) / 600 = 0,0015 m = 1,5 mm',
        'R₁ = √(k·q₁ / V₁) = 3,87 cm',
        'R₁ = V₁ / (k·q₁) = 666 m',
        'R₁ = 1,5 cm',
      ],
      correctIndex: 0,
      explanation:
        'En potencial eléctrico la distancia R está elevada a la PRIMERA potencia (no al cuadrado como en campo): V₁ = k·q₁/R₁ ⇒ R₁ = (0,9 N·m²/C) / 600 V = 1,5 × 10⁻³ m = 1,5 mm.',
      errorCategoryOnFail: 'formula',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Geometría del Nuevo Radio R₂): Si Vol₂ = 2 · Vol₁, es decir (4/3)π·R₂³ = 2 · (4/3)π·R₁³, ¿cuál es la relación exacta entre R₂ y R₁?',
      options: [
        'R₂ = 2 · R₁ = 3,0 mm',
        'R₂ = 2^(1/3) · R₁ = ∛2 · (1,5 mm) ≈ 1,89 mm (0,189 cm)',
        'R₂ = √2 · R₁ = 2,12 mm',
        'R₂ = R₁ / 2 = 0,75 mm',
      ],
      correctIndex: 1,
      explanation:
        'Al cancelar (4/3)π en ambos lados queda R₂³ = 2·R₁³ ⇒ R₂ = 2^(1/3) · R₁ ≈ 1,26 × 1,5 mm = 1,89 mm.',
      errorCategoryOnFail: 'algebraico',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Planteamiento del Nuevo Potencial V₂): Con Q₂ = 2·q₁ = 200 pC y R₂ = 2^(1/3)·R₁ = 0,00189 m, ¿cómo se relaciona V₂ con V₁?',
      options: [
        'V₂ = k·Q₂ / R₂ = k·(2·q₁) / (2^(1/3)·R₁) = 2^(2/3) · V₁ ≈ 1,587 × 600 V = 952 V',
        'V₂ = 2 · 600 V = 1200 V',
        'V₂ = 600 V / 2 = 300 V',
        'V₂ = 600 V',
      ],
      correctIndex: 0,
      explanation:
        'Como la carga se multiplica por 2 y el radio solo crece por 2^(1/3), el cociente Q/R crece por un factor 2 / 2^(1/3) = 2^(2/3) ≈ 1,5874. Multiplicando por 600 V obtenemos exactamente 952 V (pág. 4 del TP4).',
      errorCategoryOnFail: 'planteamiento',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Potencial de una gota esférica: V₁ = k·q₁ / R₁  ⇒  R₁ = (9×10⁹ · 10⁻¹⁰) / 600 = 0,0015 m = 1,5 mm',
        '2) Volumen de una gota: Vol₁ = (4/3)π·R₁³ = 0,0141 cm³',
        '3) Volumen de la gota combinada: Vol₂ = 2 · Vol₁ = (4/3)π·R₂³  ⇒  R₂ = ∛2 · R₁ = 0,189 cm = 1,89×10⁻³ m',
        '4) Carga de la gota combinada: Q₂ = 2 · q₁ = 2 × 10⁻¹⁰ C',
        '5) Nuevo potencial superficial: V₂ = k·Q₂ / R₂ = (9×10⁹ · 2×10⁻¹⁰) / 0,00189 = 952 V',
      ],
      finalSymbolicFormula: 'V₂ = 2^(2/3) · V₁ = k · (2q₁) / (2^(1/3) · R₁)',
      finalNumericalValue: '952',
      expectedUnit: 'V',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Verificación Conceptual): ¿Por qué el potencial de la nueva gota (952 V) es MAYOR que 600 V pero MENOR que 1200 V?',
        options: [
          'Porque si el radio no hubiera cambiado daría el doble (1200 V), pero al expandirse el radio de la gota de 1,5 mm a 1,89 mm, las cargas quedan un poco más alejadas de la superficie, reduciendo el potencial de 1200 V a 952 V.',
          'Porque se perdió carga en el aire.',
          'Porque el agua absorbe potencial.',
          'Por error de redondeo.',
        ],
        correctIndex: 0,
        explanation:
          '¡Impecable razonamiento físico! Duplicar la carga intenta duplicar V a 1200 V, pero el aumento del radio R₂ = 1,26·R₁ amortigua el incremento dejándolo en 952 V.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[N·m²/C² · C] / [m] = [N·m / C] = [J / C] = [Volt].',
      limitingCaseNote: 'Si se combinaran N gotas iguales, el potencial superficial sería V_N = N^(2/3) · V₁.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp4-6-a',
        question:
          '¿Qué pasa si en lugar de 2 gotas iguales se combinan 8 gotas idénticas de 600 V cada una?',
        options: [
          'El radio se multiplica por ∛8 = 2 y la carga por 8, por lo que V₈ = (8 / 2) · 600 V = 4 × 600 V = 2400 V.',
          'El potencial sería 8 × 600 V = 4800 V.',
          'El potencial seguiría siendo 600 V.',
          'El radio se multiplicaría por 8.',
        ],
        correctIndex: 0,
        physicalExplanation:
          'Con 8 gotas, el volumen se multiplica por 8, así que el radio se duplica exactamente (∛8 = 2). Como Q se multiplica por 8 y R se multiplica por 2, el potencial V = kQ/R se multiplica por 8/2 = 4.',
      },
    ],
  },
  {
    id: 'ej-tp5-1',
    unitNumber: 4,
    tpReference: 'TP N°5 — Ejercicio N°1 (Dieléctrico, Carga Inducida y Rigidez Dieléctrica)',
    sourcePdf: 'Ingenieria_-_T.P.N5_-_Capacitores.pdf (Pág. 2)',
    difficulty: 'final',
    title: 'Coeficiente Dieléctrico, Carga Inducida en Caras y Carga Máxima sin Ruptura',
    statement:
      'Dos láminas paralelas de A = 100 cm² de superficie tienen cargas iguales y opuestas Q = 10⁻⁷ C. El espacio entre ellas está ocupado por un dieléctrico y la intensidad de campo eléctrico dentro del mismo es E = 3,3 × 10⁵ V/m. Calcular: a) Coeficiente dieléctrico Ke, b) Carga inducida total q_face sobre cada cara del dieléctrico, c) Carga máxima Q_max que podrán tener las placas si la rigidez dieléctrica es E_max = 50 × 10⁶ V/m.',
    givenData: [
      'Área A = 100 cm² = 100 × 10⁻⁴ m² = 1,0 × 10⁻² m²',
      'Carga en placas Q = 10⁻⁷ C = 100 nC',
      'Campo dentro del dieléctrico E = 3,3 × 10⁵ V/m',
      'Rigidez dieléctrica E_max = 50 × 10⁶ V/m',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Estrategia): ¿Cómo se relaciona el campo eléctrico E dentro de un capacitor de placas paralelas con la carga libre Q de las placas y el coeficiente dieléctrico Ke?',
      options: [
        'E = Q / (Ke · ε₀ · A) (el dieléctrico reduce el campo eléctrico respecto al vacío en un factor Ke).',
        'E = (Ke · Q) / (ε₀ · A)',
        'E = Q / (4πε₀ · A)',
        'El dieléctrico no modifica el campo eléctrico.',
      ],
      correctIndex: 0,
      explanation:
        'Exacto (Ec. 8.1 del TP5): En el vacío el campo entre placas es E₀ = σ/ε₀ = Q/(ε₀·A). Con un dieléctrico de constante Ke, el campo cae a E = Q / (Ke·ε₀·A).',
      errorCategoryOnFail: 'formula',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Conversión de Unidades y Despeje de Ke): Convirtiendo A = 100 cm² a m², ¿cuál es el planteo correcto para despejar Ke?',
      options: [
        'Ke = Q / (E · ε₀ · A) con A = 100 × 10⁻⁴ m² = 0,01 m²  ⇒  Ke = 3,42',
        'Ke = Q / (E · ε₀ · A) con A = 1 m²  ⇒  Ke = 0,0342',
        'Ke = E · ε₀ · A / Q  ⇒  Ke = 0,29',
        'Ke = 3,42 V/m',
      ],
      correctIndex: 0,
      explanation:
        '1 cm = 10⁻² m ⇒ 1 cm² = 10⁻⁴ m², por lo que 100 cm² = 0,01 m². Sustituyendo: Ke = 10⁻⁷ / (8,85×10⁻¹² · 3,3×10⁵ · 0,01) = 3,42 (adimensional).',
      errorCategoryOnFail: 'unidades',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Carga Inducida en las Caras del Dieléctrico): ¿Por qué el campo disminuyó en un factor Ke = 3,42 y qué fórmula oficial del TP5 (Ec. 8.2) calcula la carga inducida q_face en la superficie del aislante?',
      options: [
        'Porque en las caras del dieléctrico aparece una carga de polarización opuesta q_face = Q · (1 - 1/Ke) = 100 nC · (1 - 1/3,42) = 70,7 nC.',
        'Porque el dieléctrico absorbe toda la carga Q = 100 nC.',
        'q_face = Q / Ke = 29,2 nC.',
        'q_face = Q · Ke = 342 nC.',
      ],
      correctIndex: 0,
      explanation:
        '¡Fundamental! El campo neto en el dieléctrico equivale al de una carga efectiva Q/Ke = Q - q_face. Despejando la carga inducida de polarización obtenemos la Ec. (8.2) de la cátedra: q_face = Q·(1 - 1/Ke) = 70,7 nC.',
      errorCategoryOnFail: 'conceptual',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Rigidez Dieléctrica y Carga Máxima): Si el aislante soporta hasta E_max = 50 × 10⁶ V/m antes de perforarse eléctricamente, ¿cómo calculamos la carga máxima Q_max que pueden tener las placas?',
      options: [
        'De E_max = Q_max / (Ke · ε₀ · A) despejamos Q_max = E_max · Ke · ε₀ · A = 15,1 μC.',
        'Q_max = E_max / (Ke · ε₀ · A)',
        'Q_max = (E_max · ε₀ · A) / Ke',
        'Q_max = 10⁻⁷ C',
      ],
      correctIndex: 0,
      explanation:
        'Usando la misma relación E = Q/(Ke·ε₀·A) en el límite de ruptura E_max = 50×10⁶ V/m: Q_max = (50×10⁶) · 3,42 · (8,85×10⁻¹²) · 0,01 = 1,51 × 10⁻⁵ C = 15,1 μC.',
      errorCategoryOnFail: 'planteamiento',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Conversión de área: A = 100 cm² = 100 × 10⁻⁴ m² = 10⁻² m²',
        '2) Inciso a (Coeficiente dieléctrico): Ke = Q / (ε₀ · E · A) = 10⁻⁷ / (8,85×10⁻¹² · 3,3×10⁵ · 10⁻²) = 3,42',
        '3) Inciso b (Carga inducida en caras del dieléctrico): q_face = Q · (1 - 1/Ke) = 10⁻⁷ C · (1 - 1/3,42) = 7,07 × 10⁻⁸ C = 70,7 nC',
        '4) Inciso c (Carga máxima antes de ruptura): Q_max = Ke · ε₀ · A · E_max = 3,42 · 8,85×10⁻¹² · 10⁻² · 50×10⁶ = 15,1 × 10⁻⁶ C = 15,1 μC',
      ],
      finalSymbolicFormula: 'Ke = Q / (ε₀·E·A)  |  q_face = Q(1 - 1/Ke)  |  Q_max = Ke·ε₀·A·E_max',
      finalNumericalValue: '15.1',
      expectedUnit: 'μC',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Caso Extremo): ¿Qué valor daría la carga inducida q_face = Q(1 - 1/Ke) en dos casos límite: 1) si entre las placas hay vacío (Ke = 1), y 2) si metemos un metal conductor perfecto (Ke → ∞)?',
        options: [
          'En vacío (Ke = 1) da q_face = 0 (no hay moléculas que polarizar); en un conductor (Ke → ∞) da q_face = Q (cancela el 100% del campo interior E = 0).',
          'En vacío da q_face = Q y en un conductor da 0.',
          'En ambos casos da Q/2.',
          'La fórmula no sirve para Ke = 1.',
        ],
        correctIndex: 0,
        explanation:
          '¡Verificación de casos extremos perfecta! Si Ke = 1 ⇒ 1 - 1/1 = 0 (cero carga inducida en el vacío). Si Ke → ∞ ⇒ 1 - 0 = 1 ⇒ q_face = Q, anulando por completo el campo eléctrico dentro de un conductor.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[Ke] = [C] / [(C²/N·m²) · (N/C) · m²] = [C / C] = 1 (adimensional).',
      limitingCaseNote: 'q_face siempre cumple 0 ≤ q_face < Q en cualquier dieléctrico real.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp5-1-a',
        question:
          '¿Qué pasa si retiramos el dieléctrico (dejando aire Ke ≈ 1) sin descargar las placas (Q = 10⁻⁷ C constante)? ¿Cuánto valdría ahora el campo eléctrico entre las placas?',
        options: [
          'El campo aumentaría en un factor Ke = 3,42, pasando de 3,3×10⁵ V/m a E₀ = 3,42 × 3,3×10⁵ = 1,13 × 10⁶ V/m.',
          'El campo disminuiría 3,42 veces.',
          'El campo seguiría valiendo 3,3×10⁵ V/m.',
          'El campo se haría cero.',
        ],
        correctIndex: 0,
        physicalExplanation:
          'Al quitar el dieléctrico desaparece la carga inducida q_face = 70,7 nC que se oponía al campo de las placas libres, por lo que el campo eléctrico sube exactamente a su valor en el vacío E₀ = Ke · E.',
      },
    ],
  },
  {
    id: 'ej-tp6-4',
    unitNumber: 5,
    tpReference: 'TP N°6 — Ejercicio N°4 (Lámparas en Serie vs Paralelo y Filamento Fundido)',
    sourcePdf: 'Trabajo Practico N°6 - Circuitos Electricos.pdf (Pág. 1)',
    difficulty: 'intermedio',
    title: 'Comparación de Potencia en Serie vs Paralelo y Efecto de Lámpara Fundida',
    statement:
      'Dos lámparas idénticas (cada una de resistencia R = 2 Ω) se conectan a una fuente ideal de fem ε = 8 V. Calcular la corriente por cada lámpara, la caída de tensión y la potencia total entregada: a) Conectadas en serie, b) Conectadas en paralelo, c) ¿Qué ocurre con la otra lámpara si una se funde (su filamento se abre) en serie vs en paralelo?',
    givenData: [
      'Fuente ideal: ε = 8 V (resistencia interna r = 0 Ω)',
      'Resistencia de cada lámpara: R₁ = R₂ = 2 Ω',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Estrategia de Red): ¿Cuál es la diferencia fundamental de tensión y corriente entre conectar las dos lámparas de 2 Ω en SERIE frente a conectarlas en PARALELO a la fuente de 8 V?',
      options: [
        'En serie comparten la misma corriente y los 8 V se reparten (4 V cada una); en paralelo cada lámpara recibe los 8 V completos de la fuente independientemente.',
        'En serie cada lámpara recibe 8 V y en paralelo 4 V.',
        'La resistencia equivalente es 4 Ω en ambos casos.',
        'La potencia total es igual en serie y en paralelo.',
      ],
      correctIndex: 0,
      explanation:
        'En serie la corriente es única y la tensión se divide (V₁ = V₂ = 4 V). En paralelo ambos componentes están conectados directamente a los bornes de la batería de 8 V.',
      errorCategoryOnFail: 'conceptual',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Cálculo en Serie - Inciso a): Con R_eq(serie) = R₁ + R₂ = 4 Ω conectada a 8 V, ¿cuánto valen la corriente i_serie y la potencia total P_total(serie)?',
      options: [
        'i_serie = 8 V / 4 Ω = 2 A  |  P_total = ε · i = 8 V · 2 A = 16 W (8 W en cada lámpara).',
        'i_serie = 4 A  |  P_total = 32 W.',
        'i_serie = 1 A  |  P_total = 8 W.',
        'i_serie = 2 A  |  P_total = 64 W.',
      ],
      correctIndex: 0,
      explanation:
        'Tal como indica la solución oficial del TP6: i_serie = 8V / 4Ω = 2 A; V_R1 = V_R2 = 2A · 2Ω = 4 V; P_R1 = P_R2 = i²R = 4 · 2 = 8 W ⇒ P_total(serie) = 16 W.',
      errorCategoryOnFail: 'algebraico',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Cálculo en Paralelo - Inciso b): En paralelo cada lámpara de 2 Ω tiene 8 V entre sus bornes. ¿Cuánto valen la corriente por cada lámpara y la potencia total P_total(paralelo)?',
      options: [
        'Por cada lámpara pasan i = 8 V / 2 Ω = 4 A (8 A en total de la fuente); cada una disipa P = V²/R = 64/2 = 32 W ⇒ P_total(paralelo) = 64 W.',
        'P_total(paralelo) = 16 W igual que en serie.',
        'P_total(paralelo) = 32 W.',
        'Por cada lámpara pasan 2 A.',
      ],
      correctIndex: 0,
      explanation:
        '¡Fíjate la diferencia! En paralelo la potencia total (64 W) es 4 VECES MAYOR que en serie (16 W), porque R_eq(paralelo) = 1 Ω es 4 veces menor que R_eq(serie) = 4 Ω.',
      errorCategoryOnFail: 'algebraico',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Razonamiento Físico - Inciso c): Si una de las lámparas se FUNDE (su filamento se corta, pasando a ser un circuito abierto R → ∞), ¿qué ocurre con la otra lámpara en serie y qué ocurre en paralelo?',
      options: [
        'En SERIE se apaga también la otra lámpara porque se interrumpe el único camino de corriente (i = 0); en PARALELO la lámpara sana sigue encendida exactamente con la misma corriente (4 A) y potencia (32 W).',
        'En paralelo la lámpara sana brilla el doble (64 W) al fundirse la otra.',
        'En ambos casos se apagan las dos.',
        'En serie la lámpara sana sigue encendida.',
      ],
      correctIndex: 0,
      explanation:
        '¡Cuidado con la trampa clásica! Como la fuente de 8 V es ideal (r = 0), en paralelo la rama de la lámpara sana sigue recibiendo exactamente 8 V, por lo que su corriente sigue siendo 8V/2Ω = 4 A y su brillo NO cambia.',
      errorCategoryOnFail: 'razonamiento' as never,
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Conexión en Serie: R_eq = 2 Ω + 2 Ω = 4 Ω  ⇒  i_serie = 8 V / 4 Ω = 2 A',
        '2) Tensión y potencia en Serie: V₁ = V₂ = 4 V  |  P₁ = P₂ = (2 A)² · 2 Ω = 8 W  ⇒  P_total(serie) = 16 W',
        '3) Conexión en Paralelo: R_eq = (2·2)/(2+2) = 1 Ω  ⇒  i_rama = 8 V / 2 Ω = 4 A (i_fuente = 8 A)',
        '4) Potencia en Paralelo: P₁ = P₂ = (8 V)² / 2 Ω = 32 W  ⇒  P_total(paralelo) = 64 W',
        '5) Filamento roto (circuito abierto): En serie i cae a 0 A (ambas se apagan); en paralelo la otra rama conserva V = 8 V, i = 4 A y P = 32 W.',
      ],
      finalSymbolicFormula: 'P_paralelo = 2 · (ε² / R) = 4 · P_serie',
      finalNumericalValue: '64',
      expectedUnit: 'W',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Aplicación Real): ¿Por qué todas las luces y enchufes de una casa están conectados en PARALELO a los 220 V y nunca en serie?',
        options: [
          'Porque en paralelo todos los artefactos reciben 220 V constantes y si se quema una lamparita el resto de la casa sigue funcionando.',
          'Porque en paralelo se gasta menos corriente total.',
          'Porque en serie los cables serían más gruesos.',
          'Porque la Ley de Ohm solo vale en paralelo.',
        ],
        correctIndex: 0,
        explanation:
          'Exacto: la conexión en paralelo garantiza tensión constante (220 V) e independencia de funcionamiento entre ramas.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[P] = [V² / Ω] = [V² / (V/A)] = [V · A] = [J/C · C/s] = [J/s] = [Watt].',
      limitingCaseNote: 'Si la batería tuviera resistencia interna r > 0, al fundirse una lámpara en paralelo subiría levemente la tensión en bornes y la lámpara sana brillaría un poco más.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp6-4-a',
        question:
          '¿Qué pasa si la fuente de 8 V NO es ideal, sino que tiene una resistencia interna r = 2 Ω, y se funde una de las dos lámparas que estaban en paralelo?',
        options: [
          'Al abrirse una rama disminuye la corriente total que sale de la fuente, por lo que cae menos voltaje en la resistencia interna (i·r) y la lámpara sana recibe MÁS voltaje y brilla más.',
          'La lámpara sana brilla igual que antes.',
          'La lámpara sana brilla menos.',
          'La resistencia interna se anula.',
        ],
        correctIndex: 0,
        physicalExplanation:
          'Con las 2 lámparas en paralelo (R_p = 1 Ω) más r = 2 Ω, la corriente total era 8V/3Ω = 2,67 A y la tensión en las lámparas era 8 - 2,67(2) = 2,67 V. Al fundirse una lámpara, queda solo R = 2 Ω en serie con r = 2 Ω, la tensión en la lámpara sube a 4 V y brilla más.',
      },
    ],
  },
  {
    id: 'ej-tp7-2',
    unitNumber: 6,
    tpReference: 'TP N°7 — Ejercicio N°2 (Trayectoria Helicoidal de un Protón en Campo B)',
    sourcePdf: 'Trabajo Practico N°7 - Campo magnetico y fuentes de campo magnetico.pdf (Pág. 1)',
    difficulty: 'final',
    title: 'Fuerza de Lorentz, Radio Helicoidal y Velocidad Angular de un Protón',
    statement:
      'Un protón (q = 1,6×10⁻¹⁹ C, m = 1,67×10⁻²⁷ kg) se mueve en un campo magnético uniforme B = 0,5 T dirigido a lo largo del eje +x. En t = 0, el protón tiene componentes de velocidad vx = 1,5×10⁵ m/s y vz = 2,0×10⁵ m/s (vy = 0). Calcular: a) La fuerza magnética y aceleración en t = 0, b) El radio R de la trayectoria helicoidal y la velocidad angular ω.',
    givenData: [
      'q = +1,6 × 10⁻¹⁹ C  |  m = 1,67 × 10⁻²⁷ kg',
      'B⃗ = 0,5 T î (a lo largo del eje +x)',
      'v⃗ = (1,5×10⁵ î + 2,0×10⁵ k̂) m/s',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Descomposición Física del Movimiento): El campo B⃗ apunta en el eje X y la velocidad tiene una componente paralela al campo (vx) y otra perpendicular (vz). ¿Qué efecto produce B⃗ sobre cada componente de la velocidad?',
      options: [
        'La componente paralela vx NO sufre fuerza magnética (î × î = 0) y mantiene un MRU a lo largo del eje X; la componente perpendicular vz sufre fuerza centripeta (k̂ × î = +ĵ) generando un MCU en el plano Y-Z. La suma de ambos es una HÉLICE.',
        'Ambas componentes sufren fuerza magnética y el protón se frena hasta detenerse.',
        'Solo la componente vx produce fuerza magnética.',
        'El protón se mueve en una parábola como en un campo eléctrico.',
      ],
      correctIndex: 0,
      explanation:
        '¡Esa es la clave de todos los problemas de trayectoria helicoidal! v_paralela (vx) tiene ángulo 0° con B⃗ (sen 0° = 0), por lo que avanza con velocidad constante a lo largo del eje X haciendo avanzar el paso de la hélice, mientras v_perpendicular (vz) gira en círculo.',
      errorCategoryOnFail: 'conceptual',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Producto Vectorial para la Fuerza en t = 0): Calculando F⃗ = q (v⃗ × B⃗) con v⃗ = vx î + vz k̂ y B⃗ = B î, ¿cuánto vale F⃗?',
      options: [
        'F⃗ = q · vz · B (k̂ × î) = (1,6×10⁻¹⁹)(2×10⁵)(0,5) ĵ = 1,6 × 10⁻¹⁴ N en el eje Y.',
        'F⃗ = q · √(vx² + vz²) · B = 2,0 × 10⁻¹⁴ N.',
        'F⃗ = q · vx · B = 1,2 × 10⁻¹⁴ N.',
        'F⃗ = 0 N.',
      ],
      correctIndex: 0,
      explanation:
        'Como î × î = 0, solo sobrevive el término perpendicular: |F| = q · vz · B = 1,6×10⁻¹⁹ · 2×10⁵ · 0,5 = 1,6 × 10⁻¹⁴ N a lo largo del eje Y (según el sistema de ejes de la figura del TP7).',
      errorCategoryOnFail: 'planteamiento',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Radio de la Hélice R): Por segunda ley de Newton en el plano perpendicular al campo, la fuerza magnética actúa como fuerza centrípeta: q·v⊥·B = m·v⊥² / R. ¿Qué velocidad debe usarse en R = m·v / (q·B)?',
      options: [
        'Exclusivamente la componente perpendicular v⊥ = vz = 2,0 × 10⁵ m/s  ⇒  R = (1,67×10⁻²⁷ · 2×10⁵) / (1,6×10⁻¹⁹ · 0,5) = 0,004175 m = 4,175 mm.',
        'La rapidez total v = √(1,5² + 2²) × 10⁵ = 2,5 × 10⁵ m/s.',
        'La componente paralela vx = 1,5 × 10⁵ m/s.',
        'El promedio de vx y vz.',
      ],
      correctIndex: 0,
      explanation:
        '¡Error número 1 en parciales y finales! En el radio del giro R = m·v⊥/(q·B) SIEMPRE va únicamente la componente perpendicular al campo magnético (vz = 2×10⁵ m/s), dando R = 0,004175 m.',
      errorCategoryOnFail: 'formula',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Velocidad Angular Ciclotrónica ω): ¿Cómo se calcula la velocidad angular ω de rotación del protón?',
      options: [
        'ω = v⊥ / R = (q · B) / m = (1,6×10⁻¹⁹ · 0,5) / 1,67×10⁻²⁷ = 47,9 × 10⁶ rad/s (independiente de la velocidad del protón).',
        'ω = vx / R.',
        'ω = m / (q · B).',
        'ω = q · B · R.',
      ],
      correctIndex: 0,
      explanation:
        'La frecuencia angular ciclotrónica ω = q·B/m depende solo de la relación carga/masa de la partícula y del campo B: ω = 47,9 × 10⁶ 1/s.',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Fuerza magnética en t = 0: |F| = q · vz · B = (1,6×10⁻¹⁹ C)(2×10⁵ m/s)(0,5 T) = 1,6 × 10⁻¹⁴ N (eje y)',
        '2) Aceleración en t = 0: a = |F| / m = 1,6×10⁻¹⁴ N / 1,67×10⁻²⁷ kg = 9,58 × 10¹² m/s² (eje y)',
        '3) Radio de la trayectoria helicoidal: R = (m · vz) / (q · B) = (1,67×10⁻²⁷ · 2×10⁵) / (8×10⁻²⁰) = 0,004175 m = 4,175 mm',
        '4) Velocidad angular: ω = vz / R = (q · B) / m = 47,9 × 10⁶ rad/s',
      ],
      finalSymbolicFormula: 'R = (m · v⊥) / (q · B)   |   ω = (q · B) / m',
      finalNumericalValue: '0.004175',
      expectedUnit: 'm',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Energía Cinética): Después de dar 100 vueltas completas en la hélice, ¿cuánto cambió la energía cinética del protón?',
        options: [
          'Cero (ΔK = 0): la energía cinética permanece exactamente igual porque la fuerza magnética es siempre perpendicular a la velocidad y no realiza trabajo.',
          'Aumentó 100 veces.',
          'Disminuyó hasta detenerse.',
          'Solo cambió la energía asociada a vz.',
        ],
        correctIndex: 0,
        explanation:
          'Propiedad fundamental (Apunte 05 pág. 6): Como F⃗B ⊥ v⃗ en todo instante, la potencia magnética P = F⃗B · v⃗ = 0 y el trabajo magnético es nulo (W = 0), por lo que |v| y la energía cinética K son constantes.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[R] = [kg · m/s] / [C · N/(A·m)] = [kg · m/s] / [C · (kg·m/s²) / (C/s · m)] = [m].',
      limitingCaseNote: 'Si vx = 0 (tiro a 90° de B), el paso de la hélice es 0 y la trayectoria es una circunferencia plana.',
    },
    whatIfVariations: [
      {
        id: 'wi-tp7-2-a',
        question:
          '¿Qué pasa si reemplazamos el protón por un ELECTRÓN que entra con exactamente la misma velocidad y en el mismo campo B?',
        options: [
          'Gira en sentido opuesto (por su carga negativa) y con un radio R unos 1836 veces MÁS PEQUEÑO porque su masa es 1836 veces menor que la del protón.',
          'Describe exactamente el mismo radio R = 4,175 mm.',
          'Describe un radio 1836 veces más grande.',
          'No sufre fuerza magnética.',
        ],
        correctIndex: 0,
        physicalExplanation:
          'Como R = m·v⊥/(|q|·B) y el electrón tiene la misma carga elemental |e| pero masa 1836 veces menor, su radio de curvatura es 1836 veces menor y el producto vectorial se invierte de sentido.',
      },
    ],
  },
  {
    id: 'ej-u8-barra-rieles',
    unitNumber: 7,
    tpReference: 'Unidad N°8 Cátedra — Estudio Cuantitativo de la Fem de Movimiento (Diapos 9 a 11)',
    sourcePdf: 'Unidad N°8 - Ley de Faraday.pdf (Págs. 9 a 11)',
    difficulty: 'coloquio',
    title: 'Barra Conductora sobre Rieles: Ley de Lenz, Fuerza Frenadora y Conservación de Energía',
    statement:
      'Una barra conductora de longitud l = 0,50 m se desliza sin fricción hacia la derecha con velocidad constante v = 4,0 m/s sobre dos rieles paralelos cerrados por una resistencia R = 2,0 Ω. Todo el sistema está inmerso en un campo magnético uniforme B = 0,80 T entrante a la hoja (⊗). Determinar: a) La fem inducida y el sentido de la corriente, b) La fuerza externa F_ap necesaria para mantener velocidad constante, c) Demostrar que la potencia mecánica F_ap·v coincide con la potencia eléctrica ε²/R.',
    givenData: [
      'Longitud de la barra: l = 0,50 m',
      'Velocidad constante hacia la derecha (+x): v = 4,0 m/s',
      'Campo magnético uniforme entrante (⊗): B = 0,80 T',
      'Resistencia del circuito cerrado: R = 2,0 Ω',
    ],
    step1Strategy: {
      prompt:
        'PASO 1 (Deducción del Sentido por Ley de Lenz): A medida que la barra se mueve hacia la derecha, el área encerrada por el circuito A = l·x AUMENTA y entran más líneas de campo (⊗). Según la Ley de Lenz, ¿hacia dónde debe apuntar el campo inducido B_ind y en qué sentido circula la corriente inducida?',
      options: [
        'Para oponerse al aumento de flujo entrante (⊗), B_ind debe apuntar SALIENTE de la hoja (⊙); por regla de la mano derecha, la corriente inducida circula en sentido ANTIHORARIO (hacia arriba por la barra móvil).',
        'B_ind apunta entrante (⊗) y la corriente es horaria.',
        'No se induce corriente porque B es constante de 0,80 T.',
        'La corriente va de izquierda a derecha pero se anula en la resistencia.',
      ],
      correctIndex: 0,
      explanation:
        '¡Deducción perfecta de examen oral! Aunque B = 0,80 T es constante, el ÁREA crece (dx/dt = v > 0), por lo que el flujo entrante aumenta. La espira se defiende creando un B_ind saliente (⊙), lo que exige corriente antihoraria.',
      errorCategoryOnFail: 'signo',
    },
    step2Differential: {
      prompt:
        'PASO 2 (Diferencial de Área y Flujo): Escribiendo el área instantánea del rectángulo como A(t) = l · x(t), ¿cómo queda el diferencial de flujo dΦB / dt?',
      options: [
        'dΦB/dt = d(B · l · x) / dt = B · l · (dx/dt) = B · l · v',
        'dΦB/dt = B · l / t²',
        'dΦB/dt = 0 porque dB/dt = 0',
        'dΦB/dt = B · l² · v',
      ],
      correctIndex: 0,
      explanation:
        'Tal como demuestra el Ing. Tejada Barrantes en la diapositiva 9 de la Unidad 8: como B y l son constantes, salen de la derivada temporal y dx/dt es exactamente la velocidad v de la barra.',
      errorCategoryOnFail: 'limites',
    },
    step3VectorGeometry: {
      prompt:
        'PASO 3 (Fuerza Magnética sobre la Barra y Fuerza Aplicada): Al circular corriente i hacia arriba por la barra en un campo B entrante (⊗), ¿hacia dónde apunta la fuerza magnética F⃗B = i(l⃗ × B⃗) sobre la barra?',
      options: [
        'Apunta hacia la IZQUIERDA (-x), oponiéndose al movimiento de la barra; por eso para mantener velocidad constante hay que tirar hacia la derecha con una fuerza externa igual: F_ap = i·l·B = (B²·l²·v)/R.',
        'Apunta hacia la derecha (+x), acelerando sola a la barra.',
        'Apunta hacia arriba.',
        'Vale cero.',
      ],
      correctIndex: 0,
      explanation:
        'Por regla de la mano derecha (corriente hacia arriba × campo entrante ⊗), la fuerza magnética F_B apunta hacia la izquierda (frenadora). Para que v sea constante (a = 0), la fuerza externa aplicada debe equilibrarla: F_ap = B²l²v/R.',
      errorCategoryOnFail: 'planteamiento',
    },
    step4SetupEquation: {
      prompt:
        'PASO 4 (Cálculo Numérico de ε, i, F_ap y Potencia P): Con B = 0,80 T, l = 0,50 m, v = 4,0 m/s y R = 2,0 Ω, ¿cuánto valen |ε|, i, F_ap y la potencia P?',
      options: [
        '|ε| = 0,8·0,5·4 = 1,6 V  |  i = 1,6/2 = 0,8 A  |  F_ap = 0,8·0,5·0,8 = 0,32 N  |  P = F_ap·v = 0,32·4 = 1,28 W = ε²/R.',
        '|ε| = 3,2 V  |  i = 1,6 A  |  F_ap = 1,28 N  |  P = 2,56 W.',
        '|ε| = 1,6 V  |  i = 0,8 A  |  F_ap = 0 N  |  P = 0 W.',
        '|ε| = 0,8 V  |  i = 0,4 A  |  F_ap = 0,16 N  |  P = 0,64 W.',
      ],
      correctIndex: 0,
      explanation:
        '¡Exacto! |ε| = B·l·v = 1,6 V; i = 1,6V / 2Ω = 0,8 A; F_ap = i·l·B = 0,8·0,5·0,8 = 0,32 N. Y la potencia mecánica entregada por tu mano (F_ap·v = 0,32 N · 4 m/s = 1,28 W) es idéntica a la potencia disipada por Efecto Joule en la resistencia (i²R = 0,8² · 2 = 1,28 W).',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Flujo magnético instantáneo: ΦB(t) = B · A(t) = B · l · x(t)',
        '2) Magnitud de la fem inducida: |ε| = dΦB/dt = B · l · v = 0,80 T · 0,50 m · 4,0 m/s = 1,60 V',
        '3) Corriente inducida (antihoraria): i = |ε| / R = 1,60 V / 2,0 Ω = 0,80 A',
        '4) Fuerza aplicada externa necesaria (equilibra a F_B): F_ap = i·l·B = (B²·l²·v)/R = 0,32 N',
        '5) Potencia mecánica entregada: P_mec = F_ap · v = (B²·l²·v²)/R = 0,32 N · 4,0 m/s = 1,28 W',
        '6) Potencia térmica disipada en R: P_Joule = i² · R = ε² / R = (1,60 V)² / 2,0 Ω = 1,28 W (Conservación de la Energía verificada)',
      ],
      finalSymbolicFormula: 'P = F_ap · v = (B² · l² · v²) / R = ε² / R',
      finalNumericalValue: '1.28',
      expectedUnit: 'W',
    },
    step6Verification: {
      question: {
        prompt:
          'PASO 6 (Pregunta de Tribunal en el Oral): Si el circuito está ABIERTO (cortamos el cable de la resistencia R → ∞) y movemos la barra a 4 m/s, ¿se sigue induciendo fem ε = 1,6 V y cuánta fuerza F_ap hace falta para mantener su velocidad?',
        options: [
          'Sí se sigue induciendo la diferencia de potencial ε = 1,6 V entre los extremos de la barra (por separación de cargas por fuerza de Lorentz), pero como el circuito está abierto la corriente es i = 0 A y la fuerza frenadora F_B = i·l·B vale CERO (no hace falta fuerza externa para mantener v constante).',
          'No se induce fem ni corriente.',
          'Se induce corriente igual y hay que hacer 0,32 N de fuerza.',
          'La barra se detiene instantáneamente.',
        ],
        correctIndex: 0,
        explanation:
          '¡Pregunta favorita de coloquio! La fem inducida ε = B·l·v depende solo del movimiento de la barra en el campo B y sigue valiendo 1,6 V entre sus extremos; pero al estar abierto el circuito no circula corriente (i = 0) y por tanto no aparece fuerza magnética de frenado (F_B = 0).',
        errorCategoryOnFail: 'oral',
      },
      dimensionalAnalysisNote: '[B²·l²·v / R] = [T²·m²·(m/s)] / [V/A] = [(V·s/m²)² · m³ / s] / [V/A] = [V · A · s / m] = [J / m] = [Newton].',
      limitingCaseNote: 'Si R → ∞ (circuito abierto), i → 0 y F_ap → 0.',
    },
    whatIfVariations: [
      {
        id: 'wi-u8-barra-a',
        question:
          '¿Qué pasa con la fuerza externa F_ap y con la potencia disipada P si queremos mover la barra al DOBLE de velocidad (v\' = 2v = 8 m/s)?',
        options: [
          'La fuerza F_ap = B²l²v/R se DUPLICA (0,64 N), pero la potencia P = B²l²v²/R se CUADRUPLICA (4 × 1,28 W = 5,12 W).',
          'Tanto la fuerza como la potencia se duplican.',
          'La fuerza se cuadruplica y la potencia se duplica.',
          'No cambian porque B y R son constantes.',
        ],
        correctIndex: 0,
        physicalExplanation:
          'Como F_ap es lineal con v (F_ap ∝ v), duplicar la velocidad duplica la fuerza. Pero como P = F_ap · v, la potencia depende del cuadrado de la velocidad (P ∝ v²) y se multiplica por 4.',
      },
    ],
  },
  // ==========================================================================
  // EJERCICIOS ADICIONALES GRADUADOS DE MENOR A MAYOR DIFICULTAD (UNIDADES 1 A 9)
  // ==========================================================================
  {
    id: 'ej-u1-inicial-coulomb',
    unitNumber: 1,
    tpReference: 'TP N°1 — Ejercicio Inicial N°1 (Ley de Coulomb y Conversión cm / μC)',
    sourcePdf: 'Ingenieria_-_T.P.N1_-_Carga_y_Campo_Electrico.pdf (Pág. 1)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Fuerza de Coulomb entre Dos Cargas Puntuales con Conversión al SI',
    statement:
      'Dos pequeñas esferas cargadas con q₁ = +4 μC y q₂ = -6 μC están separadas una distancia r = 20 cm en el vacío. Calcular la magnitud de la fuerza eléctrica entre ellas e indicar si es atractiva o repulsiva.',
    givenData: [
      'q₁ = +4 μC = +4 × 10⁻⁶ C',
      'q₂ = -6 μC = -6 × 10⁻⁶ C',
      'r = 20 cm = 0,20 m',
      'k = 8,99 × 10⁹ N·m²/C²',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Estrategia): ¿Qué ley fundamental vincula la fuerza entre dos cargas puntuales en reposo y qué indica que tengan signos opuestos (+ y -)?',
      options: [
        'Se aplica la Ley de Coulomb F = (k · |q₁| · |q₂|) / r², y por tener signos opuestos la fuerza es de ATRACCIÓN a lo largo de la recta que las une.',
        'Se aplica la Ley de Ohm V = I·R y se repelen.',
        'La distancia no se eleva al cuadrado.',
        'Las cargas se restan en el numerador.',
      ],
      correctIndex: 0,
      explanation: '¡Correcto! En la Ley de Coulomb se multiplican los módulos de las cargas |q₁|·|q₂| y el signo se usa para dibujar el sentido atractivo de los vectores fuerza.',
      errorCategoryOnFail: 'conceptual',
    },
    step2Differential: {
      prompt: 'PASO 2 (Conversión de Unidades): Antes de usar la calculadora, ¿cómo deben expresarse q₁ = 4 μC, q₂ = 6 μC y r = 20 cm en el Sistema Internacional?',
      options: [
        'q₁ = 4 × 10⁻⁶ C, q₂ = 6 × 10⁻⁶ C y r = 0,20 m (dividiendo 20 cm por 100).',
        'Se dejan en μC y cm sin cambiar.',
        'r = 2000 m.',
        'q₁ = 4 × 10⁻³ C.',
      ],
      correctIndex: 0,
      explanation: 'El prefijo micro (μ) equivale a 10⁻⁶ y 1 cm = 10⁻² m (20 cm = 0,20 m).',
      errorCategoryOnFail: 'unidades',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Tercera Ley de Newton): Como |q₂| (6 μC) es mayor que |q₁| (4 μC), ¿cuál de las dos cargas siente una fuerza de mayor magnitud?',
      options: [
        'Ambas sienten EXACTAMENTE la misma magnitud de fuerza (|F₁₂| = |F₂₁|) en sentidos opuestos por el Principio de Acción y Reacción.',
        'La carga de 6 μC hace más fuerza que la de 4 μC.',
        'La carga más chica siente el doble de fuerza.',
        'Solo la carga positiva siente fuerza.',
      ],
      correctIndex: 0,
      explanation: '¡Clásico de examen! La fuerza depende del producto |q₁|·|q₂|, por lo que ambas cargas experimentan exactamente la misma intensidad de fuerza.',
      errorCategoryOnFail: 'conceptual',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Cálculo en Calculadora): Sustituyendo k = 8,99×10⁹, |q₁| = 4×10⁻⁶ C, |q₂| = 6×10⁻⁶ C y r = 0,20 m, ¿cuánto vale la fuerza F?',
      options: [
        'F = (8,99×10⁹ · 4×10⁻⁶ · 6×10⁻⁶) / (0,20)² = 0,21576 / 0,04 = 5,39 N',
        'F = 1,08 N (olvidando elevar 0,20 al cuadrado)',
        'F = 5,39 × 10⁻⁴ N (usando r = 20 sin pasar a metros)',
        'F = 53,9 N',
      ],
      correctIndex: 0,
      explanation: 'En la calculadora: 8.99 EXP 9 × 4 EXP -6 × 6 EXP -6 ÷ 0.20² = 5,394 N.',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Conversión al SI: |q₁| = 4 × 10⁻⁶ C  |  |q₂| = 6 × 10⁻⁶ C  |  r = 0,20 m',
        '2) Numerador: k · |q₁| · |q₂| = 8,99×10⁹ · 24×10⁻¹² = 0,21576 N·m²',
        '3) Denominador: r² = (0,20 m)² = 0,04 m²',
        '4) Cociente: F = 0,21576 / 0,04 = 5,39 N (Atractiva)',
      ],
      finalSymbolicFormula: 'F = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2}',
      finalNumericalValue: '5.39',
      expectedUnit: 'N',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Comprobación de Escala): Si ahora acercamos las cargas a la mitad de distancia (r = 10 cm = 0,10 m), ¿qué ocurre con la fuerza F?',
        options: [
          'Se multiplica por 4, pasando de 5,39 N a 21,58 N.',
          'Se reduce a la mitad.',
          'Se duplica.',
          'No cambia.',
        ],
        correctIndex: 0,
        explanation: 'Al dividir r por 2, el denominador r² se divide por 4, multiplicando la fuerza por 4.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[N·m²/C²] · [C · C] / [m²] = [N].',
      limitingCaseNote: 'Para r → ∞, la fuerza tiende a 0 N.',
    },
    whatIfVariations: [],
  },
  {
    id: 'ej-u2-inicial-gauss',
    unitNumber: 2,
    tpReference: 'TP N°3 — Ejercicio Inicial N°1 (Flujo Neto y Esfera Conductora)',
    sourcePdf: 'Ingenieria_-_T.P.N3_-_Ley_de_Gauss.pdf (Pág. 1)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Flujo Eléctrico a través de una Superficie Cerrada y Campo Exterior',
    statement:
      'Una esfera conductora de radio R = 10 cm tiene una carga neta Q = +5 nC en equilibrio electrostático. Calcular: a) El campo eléctrico en un punto interior r = 4 cm, b) El flujo total que atraviesa una esfera gaussiana de radio r = 30 cm, c) El campo eléctrico a r = 30 cm.',
    givenData: [
      'Radio del conductor: R = 10 cm = 0,10 m',
      'Carga neta: Q = +5 nC = 5 × 10⁻⁹ C',
      'ε₀ = 8,854 × 10⁻¹² C²/(N·m²)',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Interior del Conductor): ¿Cuánto vale el campo eléctrico en r = 4 cm (adentro de la esfera metálica de radio R = 10 cm)?',
      options: [
        'Vale exactamente E = 0 N/C porque en todo conductor en equilibrio toda la carga libre se ubica en la superficie exterior (r = 10 cm).',
        'Es máximo en el centro.',
        'Vale k·Q / (0,04)².',
        'Crece linealmente con r.',
      ],
      correctIndex: 0,
      explanation: 'Adentro de un conductor en equilibrio electrostático no hay carga encerrada (q_enc = 0) y el campo es siempre nulo.',
      errorCategoryOnFail: 'conceptual',
    },
    step2Differential: {
      prompt: 'PASO 2 (Flujo Total por Gauss): Según la Ley de Gauss Φ_E = Q_enc / ε₀, ¿cuánto vale el flujo total para la esfera gaussiana exterior de r = 30 cm?',
      options: [
        'Φ_E = (5 × 10⁻⁹ C) / (8,854 × 10⁻¹²) = 564,7 N·m²/C (y no depende del radio 30 cm mientras encierre a la esfera).',
        'Φ_E = 0.',
        'Depende del cubo de 30 cm.',
        'Φ_E = 5 × 10⁻⁹ N·m²/C.',
      ],
      correctIndex: 0,
      explanation: 'El flujo total depende exclusivamente de la carga encerrada Q dividida por ε₀.',
      errorCategoryOnFail: 'formula',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Simetría Esférica): Para r = 30 cm = 0,30 m > R, ¿cómo se despeja el campo eléctrico E de la integral ∮ E·dA = Q/ε₀?',
      options: [
        'Como E es constante sobre la esfera de área 4·π·r², queda E · (4·π·r²) = Q/ε₀ ⇒ E = Q / (4·π·ε₀·r²) = k·Q / r².',
        'Se divide por el área de un círculo π·r².',
        'Se divide por el volumen (4/3)·π·r³.',
        'El campo afuera es cero.',
      ],
      correctIndex: 0,
      explanation: 'El área de la superficie de una esfera de radio r es 4·π·r².',
      errorCategoryOnFail: 'simetria',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Cálculo Numérico para r = 0,30 m): Evaluando E = (8,99×10⁹ · 5×10⁻⁹) / (0,30)², ¿cuánto vale E?',
      options: [
        'E = 44,95 / 0,09 = 499,4 N/C ≈ 500 N/C',
        'E = 149,8 N/C (sin elevar 0,30 al cuadrado)',
        'E = 0,05 N/C (usando 30 cm sin pasar a metros)',
        'E = 4500 N/C',
      ],
      correctIndex: 0,
      explanation: 'Con r = 0,30 m ⇒ r² = 0,09 m² ⇒ E = 499,4 N/C.',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Interior del conductor (r = 0,04 m < 0,10 m): q_enc = 0  ⇒  E_interior = 0 N/C',
        '2) Flujo exterior (r = 0,30 m > 0,10 m): Φ_E = Q / ε₀ = 5×10⁻⁹ / 8,854×10⁻¹² = 564,7 N·m²/C',
        '3) Campo exterior: E = k · Q / r² = (8,99×10⁹ · 5×10⁻⁹) / (0,30)² = 499,4 N/C',
      ],
      finalSymbolicFormula: 'E(r > R) = \\frac{Q}{4\\pi\\varepsilon_0 r^2}',
      finalNumericalValue: '499.4',
      expectedUnit: 'N/C',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Repregunta): ¿Cuánto vale el potencial eléctrico V en el interior de la esfera conductora (por ejemplo en r = 4 cm)?',
        options: [
          'Es constante e igual al potencial de la superficie: V = k·Q / R = 44,95 / 0,10 = 449,5 V (¡NO es cero!).',
          'Vale 0 V porque E = 0.',
          'Es infinito.',
          'Vale k·Q / 0,04.',
        ],
        correctIndex: 0,
        explanation: 'Como adentro E = -dV/dr = 0, el potencial V no cambia al entrar a la esfera y conserva el valor de su superficie kQ/R.',
        errorCategoryOnFail: 'conceptual',
      },
      dimensionalAnalysisNote: '[N/C] = [V/m].',
      limitingCaseNote: 'Visto desde afuera (r ≥ R), toda esfera cargada simétricamente actúa como si su carga Q estuviera concentrada en el centro.',
    },
    whatIfVariations: [],
  },
  {
    id: 'ej-u3-inicial-potencial',
    unitNumber: 3,
    tpReference: 'TP N°4 — Ejercicio Inicial N°1 (Potencial y Trabajo Electrostático)',
    sourcePdf: 'Ingenieria_-_T.P.N4_-_Potencial_Electrico.pdf (Pág. 1)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Diferencia de Potencial y Trabajo para Mover una Carga',
    statement:
      'En una región con campo eléctrico uniforme E = 2000 V/m existen dos placas equipotenciales separadas una distancia d = 5 cm. Calcular: a) La diferencia de potencial ΔV entre las placas, b) La energía cinética en Joules que gana una carga q = 3 μC al acelerarse de una placa a la otra.',
    givenData: [
      'Campo uniforme: E = 2000 V/m',
      'Separación: d = 5 cm = 0,05 m',
      'Carga móvil: q = 3 μC = 3 × 10⁻⁶ C',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Fórmula en Campo Uniforme): Cuando el campo eléctrico E es constante y uniforme, ¿cómo se relacionan el voltaje ΔV, el campo E y la distancia d?',
      options: [
        '|ΔV| = E · d (el voltaje es el campo en V/m multiplicado por la distancia en metros).',
        '|ΔV| = E / d².',
        '|ΔV| = k · q / d².',
        'ΔV = 0.',
      ],
      correctIndex: 0,
      explanation: 'En un campo uniforme la integral ∫ E·dl se reduce simplemente al producto E · d.',
      errorCategoryOnFail: 'formula',
    },
    step2Differential: {
      prompt: 'PASO 2 (Conversión y Cálculo de ΔV): Pasando d = 5 cm a metros (0,05 m), ¿cuánto vale la diferencia de potencial entre las placas?',
      options: [
        '|ΔV| = 2000 V/m · 0,05 m = 100 V',
        '|ΔV| = 10 000 V (sin pasar cm a m)',
        '|ΔV| = 400 V',
        '|ΔV| = 10 V',
      ],
      correctIndex: 0,
      explanation: '2000 V/m × 0,05 m = 100 Voltios.',
      errorCategoryOnFail: 'unidades',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Sentido de Aceleración): ¿Hacia qué placa se acelera espontáneamente la carga positiva q = +3 μC?',
      options: [
        'Desde la placa de MAYOR potencial hacia la placa de MENOR potencial (a favor del vector campo eléctrico E⃗).',
        'Desde menor potencial hacia mayor potencial.',
        'Paralela a las placas sin acercarse a ninguna.',
        'Permanece en reposo.',
      ],
      correctIndex: 0,
      explanation: 'Las cargas positivas siempre son empujadas por E⃗ hacia las regiones de menor potencial.',
      errorCategoryOnFail: 'conceptual',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Trabajo y Energía Cinética): Con q = 3 × 10⁻⁶ C y |ΔV| = 100 V, ¿cuánto vale el trabajo W = q · |ΔV| (igual a la energía cinética ganada)?',
      options: [
        'W = (3 × 10⁻⁶ C) · (100 V) = 3 × 10⁻⁴ J = 0,0003 Joules (0,3 mJ)',
        'W = 300 J',
        'W = 3 × 10⁻⁸ J',
        'W = 33,3 J',
      ],
      correctIndex: 0,
      explanation: 'Multiplicando Coulombs por Voltios obtenemos directamente Joules: 3×10⁻⁶ × 100 = 3×10⁻⁴ J.',
      errorCategoryOnFail: 'algebraico',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Distancia en metros: d = 5 cm = 0,05 m',
        '2) Diferencia de potencial: |ΔV| = E · d = 2000 V/m · 0,05 m = 100 V',
        '3) Trabajo / Energía cinética: K = q · |ΔV| = (3 × 10⁻⁶ C) · 100 V = 3,0 × 10⁻⁴ J',
      ],
      finalSymbolicFormula: '|\\Delta V| = E \\cdot d \\quad ; \\quad W = q \\cdot |\\Delta V|',
      finalNumericalValue: '0.0003',
      expectedUnit: 'J',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Independencia del Camino): Si la carga q va de una placa a la otra siguiendo un camino inclinado o en zigzag en vez de ir en línea recta, ¿cambia el trabajo realizado por el campo eléctrico?',
        options: [
          'No cambia: sigue siendo exactamente 3 × 10⁻⁴ J porque el campo electrostático es CONSERVATIVO y el trabajo solo depende del potencial inicial y final.',
          'El trabajo es mayor por ser más largo el camino.',
          'El trabajo se anula.',
          'Se duplica.',
        ],
        correctIndex: 0,
        explanation: 'Al ser conservativo el campo electrostático, W_AB = q·(V_A - V_B) es independiente de la trayectoria.',
        errorCategoryOnFail: 'conceptual',
      },
      dimensionalAnalysisNote: '[C] · [V] = [C] · [J/C] = [Joule].',
      limitingCaseNote: 'Si el punto inicial y final están en la misma placa equipotencial, ΔV = 0 y W = 0.',
    },
    whatIfVariations: [],
  },
  {
    id: 'ej-u4-inicial-capacitores',
    unitNumber: 4,
    tpReference: 'TP N°5 — Ejercicio Inicial N°0 (Asociación Serie y Paralelo en pF / nF / μF)',
    sourcePdf: 'Ingenieria_-_T.P.N5_-_Capacitores.pdf (Pág. 1)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Capacitores en Serie y en Paralelo y Conversión pF ↔ nF',
    statement:
      'Se tienen dos capacitores de C₁ = 3000 pF y C₂ = 6 nF conectados a una fuente de V = 20 V. Calcular la capacidad equivalente C_eq y la carga total almacenada: a) Cuando se conectan en PARALELO, b) Cuando se conectan en SERIE.',
    givenData: [
      'C₁ = 3000 pF = 3 nF = 3 × 10⁻⁹ F',
      'C₂ = 6 nF = 6 × 10⁻⁹ F',
      'Fuente: V = 20 V',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Unificar Unidades pF y nF): Antes de sumar C₁ = 3000 pF y C₂ = 6 nF, ¿cómo pasamos C₁ = 3000 pF a nanofaradios (nF)?',
      options: [
        'Como 1 nF = 1000 pF, dividimos 3000 pF por 1000 y obtenemos C₁ = 3 nF.',
        'Multiplicamos por 1000.',
        'Se suman 3000 + 6 = 3006.',
        '3000 pF = 300 nF.',
      ],
      correctIndex: 0,
      explanation: '¡Regla fundamental! Nunca sumes capacidades con distinto prefijo. 3000 pF = 3000 × 10⁻¹² F = 3 × 10⁻⁹ F = 3 nF.',
      errorCategoryOnFail: 'unidades',
    },
    step2Differential: {
      prompt: 'PASO 2 (Capacidad en Paralelo): Con C₁ = 3 nF y C₂ = 6 nF conectados en PARALELO, ¿cuánto vale la capacidad equivalente C_paralelo?',
      options: [
        'En paralelo se suman directamente: C_paralelo = C₁ + C₂ = 3 nF + 6 nF = 9 nF.',
        'C_paralelo = (3 · 6) / (3 + 6) = 2 nF.',
        'C_paralelo = 18 nF.',
        'C_paralelo = 3 nF.',
      ],
      correctIndex: 0,
      explanation: 'En paralelo las placas se suman como un área más grande: C_eq = C₁ + C₂ = 9 nF.',
      errorCategoryOnFail: 'formula',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Capacidad en Serie): Cuando C₁ = 3 nF y C₂ = 6 nF se conectan en SERIE, ¿cuánto vale la capacidad equivalente C_serie?',
      options: [
        '1/C_serie = 1/3 + 1/6  ⇒  C_serie = (C₁ · C₂) / (C₁ + C₂) = (3 · 6) / (3 + 6) = 18 / 9 = 2 nF.',
        'C_serie = 9 nF.',
        'C_serie = 0,5 nF (olvidando invertir 1/C_eq al final).',
        'C_serie = 4,5 nF.',
      ],
      correctIndex: 0,
      explanation: 'En serie se suman las inversas y el resultado (2 nF) es siempre MENOR que el más chico de los capacitores.',
      errorCategoryOnFail: 'algebraico',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Carga y Energía en Serie): Con C_serie = 2 nF conectado a V = 20 V, ¿cuánto vale la carga Q que adquiere CADA capacitor en serie?',
      options: [
        'En serie ambos capacitores tienen la MISMA carga Q = C_serie · V = 2 nF · 20 V = 40 nC.',
        'Uno tiene 60 nC y el otro 120 nC.',
        'Ambos tienen 20 V de voltaje.',
        'La carga es cero.',
      ],
      correctIndex: 0,
      explanation: 'En serie la carga Q es idéntica en ambos capacitores (40 nC), mientras que los 20 V se reparten.',
      errorCategoryOnFail: 'conceptual',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Conversión a la misma unidad: C₁ = 3000 pF = 3 nF  |  C₂ = 6 nF',
        '2) En Paralelo: C_p = 3 nF + 6 nF = 9 nF  ⇒  Q_total(p) = 9 nF · 20 V = 180 nC',
        '3) En Serie: C_s = (3 · 6) / (3 + 6) = 2 nF  ⇒  Q_serie = 2 nF · 20 V = 40 nC en cada uno',
      ],
      finalSymbolicFormula: 'C_{\\text{paralelo}} = C_1 + C_2 \\quad ; \\quad C_{\\text{serie}} = \\frac{C_1 \\cdot C_2}{C_1 + C_2}',
      finalNumericalValue: '2',
      expectedUnit: 'nF',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Reparto de Voltaje en Serie): Con Q = 40 nC en serie, ¿cuál de los dos capacitores (C₁ = 3 nF o C₂ = 6 nF) se queda con mayor voltaje V = Q / C?',
        options: [
          'El capacitor MÁS CHICO (C₁ = 3 nF) recibe el MAYOR voltaje: V₁ = 40 nC / 3 nF = 13,33 V, y V₂ = 40 nC / 6 nF = 6,67 V (suman 20 V).',
          'El capacitor más grande recibe más voltaje.',
          'Reciben 10 V cada uno.',
          'Reciben 20 V cada uno.',
        ],
        correctIndex: 0,
        explanation: 'Como V = Q/C y Q es igual para ambos, a menor capacidad C mayor caída de tensión V.',
        errorCategoryOnFail: 'interpretacion',
      },
      dimensionalAnalysisNote: '[nF] · [V] = [10⁻⁹ F · V] = [10⁻⁹ C] = [nC].',
      limitingCaseNote: 'C_serie es siempre menor que el menor capacitor; C_paralelo es siempre mayor que el mayor capacitor.',
    },
    whatIfVariations: [],
  },
  {
    id: 'ej-u8-inicial-faraday',
    unitNumber: 8,
    tpReference: 'TP N°8 — Ejercicio N°1 (Ley de Faraday-Lenz y Autoinductancia RL)',
    sourcePdf: 'Unidad N°8 - Ley de Faraday.pdf (Pág. 4)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Fem Inducida en una Bobina y Constante de Tiempo RL',
    statement:
      'Una bobina de N = 200 espiras con área A = 40 cm² e inductancia L = 50 mH está en un campo magnético perpendicular que cambia de B₁ = 0,2 T a B₂ = 0,8 T en Δt = 0,10 s. Si la bobina se conecta en serie con una resistencia R = 10 Ω: a) Calcular la magnitud de la fem inducida ε, b) Calcular la corriente inducida y la constante de tiempo τ_L = L / R.',
    givenData: [
      'N = 200 espiras',
      'A = 40 cm² = 40 × 10⁻⁴ m² = 0,004 m²',
      'ΔB = 0,8 T - 0,2 T = 0,6 T en Δt = 0,10 s',
      'L = 50 mH = 0,050 H  |  R = 10 Ω',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Conversión del Área): Para calcular el flujo magnético Φ_B = B · A en Webers (T·m²), ¿a cuántos metros cuadrados equivalen A = 40 cm²?',
      options: [
        'A = 40 × 10⁻⁴ m² = 0,004 m² (porque 1 cm² = 10⁻⁴ m²).',
        'A = 0,40 m².',
        'A = 4 m².',
        'A = 40 × 10⁻² m².',
      ],
      correctIndex: 0,
      explanation: 'Al elevar centímetros al cuadrado: (10⁻² m)² = 10⁻⁴ m² ⇒ 40 cm² = 0,004 m².',
      errorCategoryOnFail: 'unidades',
    },
    step2Differential: {
      prompt: 'PASO 2 (Variación de Flujo en una Espira): Con A = 0,004 m² y ΔB = 0,6 T, ¿cuánto varía el flujo magnético ΔΦ_B en cada espira?',
      options: [
        'ΔΦ_B = ΔB · A = 0,6 T · 0,004 m² = 0,0024 Wb (2,4 mWb).',
        'ΔΦ_B = 24 Wb.',
        'ΔΦ_B = 0 Wb.',
        'ΔΦ_B = 0,24 Wb.',
      ],
      correctIndex: 0,
      explanation: '0,6 T × 0,004 m² = 0,0024 Webers por cada espira.',
      errorCategoryOnFail: 'formula',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Ley de Faraday con N = 200 espiras): Dividiendo por Δt = 0,10 s y multiplicando por N = 200 espiras, ¿cuánto vale la magnitud de la fem inducida |ε|?',
      options: [
        '|ε| = N · (ΔΦ_B / Δt) = 200 · (0,0024 Wb / 0,10 s) = 4,80 V.',
        '|ε| = 0,024 V.',
        '|ε| = 48 V.',
        '|ε| = 0,48 V.',
      ],
      correctIndex: 0,
      explanation: '|ε| = 200 × 0,024 V = 4,80 Voltios.',
      errorCategoryOnFail: 'algebraico',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Corriente y Constante de Tiempo Inductiva τ_L): Con R = 10 Ω y L = 50 mH = 0,050 H, ¿cuánto valen la corriente I = |ε|/R y la constante de tiempo τ_L = L / R?',
      options: [
        'I = 4,80 V / 10 Ω = 0,48 A  y  τ_L = L / R = 0,050 H / 10 Ω = 0,005 s = 5 ms.',
        'τ_L = L · R = 0,5 s (confundiendo con R·C).',
        'τ_L = R / L = 200 s.',
        'I = 48 A.',
      ],
      correctIndex: 0,
      explanation: '¡Atención! En un circuito RL la constante de tiempo es el cociente τ_L = L / R (no el producto): 0,050 H / 10 Ω = 5 milisegundos.',
      errorCategoryOnFail: 'formula',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Conversión al SI: A = 40 × 10⁻⁴ m² = 0,004 m²  |  L = 50 × 10⁻³ H = 0,050 H',
        '2) Variación de flujo por espira: ΔΦ_B = (0,8 - 0,2) T · 0,004 m² = 0,0024 Wb',
        '3) Fem inducida: |ε| = N · ΔΦ_B / Δt = 200 · 0,0024 / 0,10 = 4,80 V',
        '4) Corriente inducida: I = 4,80 V / 10 Ω = 0,48 A',
        '5) Constante de tiempo inductiva: τ_L = L / R = 0,050 H / 10 Ω = 0,005 s = 5 ms',
      ],
      finalSymbolicFormula: '|\\mathcal{E}| = N \\cdot \\frac{\\Delta \\Phi_B}{\\Delta t} \\quad ; \\quad \\tau_L = \\frac{L}{R}',
      finalNumericalValue: '4.80',
      expectedUnit: 'V',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Energía Magnética Almacenada): Cuando por la bobina de L = 0,050 H circula I = 0,48 A, ¿cuánta energía magnética U_B = ½ · L · I² almacena?',
        options: [
          'U_B = 0,5 · 0,050 H · (0,48 A)² = 0,00576 J = 5,76 mJ.',
          'U_B = 0 J.',
          'U_B = 57,6 J.',
          'U_B = 0,024 J.',
        ],
        correctIndex: 0,
        explanation: 'U_B = ½ · L · I² es el equivalente magnético exacto de ½ · C · V² del capacitor.',
        errorCategoryOnFail: 'formula',
      },
      dimensionalAnalysisNote: '[H / Ω] = [(V·s/A) / (V/A)] = [segundos].',
      limitingCaseNote: 'Si el campo magnético deja de variar (ΔB = 0), la fem inducida cae inmediatamente a 0 V.',
    },
    whatIfVariations: [],
  },
  {
    id: 'ej-u9-inicial-rlc',
    unitNumber: 9,
    tpReference: 'TP N°9 — Ejercicio N°1 (Impedancia RLC Serie, Desfase y Resonancia a 50 Hz)',
    sourcePdf: 'Unidad N°9 - Corriente Alterna y Maxwell.pdf (Pág. 6)',
    difficulty: 'facil',
    title: 'Nivel 1 (Inicial): Circuito RLC Serie en Corriente Alterna (Reactancias, Impedancia y Resonancia)',
    statement:
      'Un circuito RLC serie compuesto por R = 30 Ω, L = 127,3 mH y C = 318,3 μF se conecta a la red domiciliaria de V_rms = 220 V y frecuencia f = 50 Hz. Calcular: a) Las reactancias X_L y X_C, b) La impedancia total Z, c) La corriente eficaz I_rms y el ángulo de desfase φ.',
    givenData: [
      'R = 30 Ω',
      'L = 127,3 mH = 0,1273 H',
      'C = 318,3 μF = 318,3 × 10⁻⁶ F',
      'V_rms = 220 V  |  f = 50 Hz (ω = 2πf ≈ 314,16 rad/s)',
    ],
    step1Strategy: {
      prompt: 'PASO 1 (Frecuencia Angular y Reactancia Inductiva X_L): Con f = 50 Hz (ω = 2·π·50 = 314,16 rad/s) y L = 0,1273 H, ¿cuánto vale la reactancia inductiva X_L = ω · L?',
      options: [
        'X_L = 2 · π · 50 · 0,1273 H = 40,0 Ω.',
        'X_L = 40 000 Ω (olvidando pasar mH a H).',
        'X_L = 6,36 Ω (olvidando multiplicar por 2π).',
        'X_L = 0,025 Ω.',
      ],
      correctIndex: 0,
      explanation: 'Pasando 127,3 mH a 0,1273 H: X_L = 314,16 rad/s × 0,1273 H = 40,0 Ω.',
      errorCategoryOnFail: 'unidades',
    },
    step2Differential: {
      prompt: 'PASO 2 (Reactancia Capacitiva X_C): Con ω = 314,16 rad/s y C = 318,3 × 10⁻⁶ F, ¿cuánto vale la reactancia capacitiva X_C = 1 / (ω · C)?',
      options: [
        'X_C = 1 / (314,16 · 318,3 × 10⁻⁶) = 1 / 0,100 = 10,0 Ω.',
        'X_C = 0,10 Ω (olvidando hacer la inversa 1 / x).',
        'X_C = 100 Ω.',
        'X_C = 40 Ω.',
      ],
      correctIndex: 0,
      explanation: 'En la calculadora: ( 2 × π × 50 × 318.3 EXP -6 ) [x⁻¹] = 10,0 Ω.',
      errorCategoryOnFail: 'algebraico',
    },
    step3VectorGeometry: {
      prompt: 'PASO 3 (Triángulo de Impedancia Z): Con R = 30 Ω, X_L = 40 Ω y X_C = 10 Ω, ¿cómo se calcula la impedancia total Z del circuito RLC serie?',
      options: [
        'Z = √(R² + (X_L - X_C)²) = √(30² + (40 - 10)²) = √(900 + 900) = 42,43 Ω (¡NO se suman 30 + 40 + 10!).',
        'Z = 30 + 40 + 10 = 80 Ω.',
        'Z = 30 + 40 - 10 = 60 Ω.',
        'Z = √(30² + 40² + 10²) = 50,99 Ω.',
      ],
      correctIndex: 0,
      explanation: 'Como X_L (+90°) y X_C (-90°) están en oposición se restan (40 - 10 = 30 Ω) y forman un triángulo rectángulo con R = 30 Ω: Z = √(30² + 30²) = 42,43 Ω.',
      errorCategoryOnFail: 'formula',
    },
    step4SetupEquation: {
      prompt: 'PASO 4 (Corriente Eficaz y Ángulo de Desfase): Con V_rms = 220 V y Z = 42,43 Ω, ¿cuánto valen la corriente I_rms = V_rms / Z y el ángulo de desfase φ = arctan((X_L - X_C) / R)?',
      options: [
        'I_rms = 220 V / 42,43 Ω = 5,185 A  y  φ = arctan(30 / 30) = +45° (predominantemente inductivo porque X_L > X_C).',
        'I_rms = 7,33 A  y  φ = 0°.',
        'I_rms = 5,185 A  y  φ = -45° (capacitivo).',
        'I_rms = 2,75 A  y  φ = 90°.',
      ],
      correctIndex: 0,
      explanation: 'Como X_L (40 Ω) > X_C (10 Ω), el ángulo φ = +45° es positivo (la tensión adelanta 45° a la corriente).',
      errorCategoryOnFail: 'interpretacion',
    },
    step5LineByLine: {
      algebraicSteps: [
        '1) Frecuencia angular: ω = 2·π·f = 2·π·50 = 314,16 rad/s',
        '2) Reactancia inductiva: X_L = ω·L = 314,16 · 0,1273 = 40,0 Ω',
        '3) Reactancia capacitiva: X_C = 1 / (ω·C) = 1 / (314,16 · 318,3×10⁻⁶) = 10,0 Ω',
        '4) Impedancia total: Z = √(30² + (40 - 10)²) = √1800 = 42,43 Ω',
        '5) Corriente eficaz y desfase: I_rms = 220 / 42,43 = 5,185 A  |  φ = arctan(30/30) = +45°',
      ],
      finalSymbolicFormula: 'Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad ; \\quad I = \\frac{V}{Z}',
      finalNumericalValue: '42.43',
      expectedUnit: 'Ω',
    },
    step6Verification: {
      question: {
        prompt: 'PASO 6 (Condición de Resonancia): ¿A qué frecuencia f₀ entraría en RESONANCIA exacta (X_L = X_C) este circuito con L = 0,1273 H y C = 318,3 μF, y cuánto valdría Z en ese caso?',
        options: [
          'En f₀ = 1 / (2π√(L·C)) = 25 Hz ambas reactancias se igualan (X_L = X_C = 20 Ω), por lo que se cancelan y la impedancia cae a su mínimo Z = R = 30 Ω.',
          'En resonancia Z se hace infinita y la corriente es cero.',
          'En resonancia Z = 0 Ω.',
          'Nunca puede entrar en resonancia.',
        ],
        correctIndex: 0,
        explanation: 'En resonancia X_L = X_C ⇒ Z_mín = R = 30 Ω, el desfase es φ = 0° y la corriente alcanza su pico máximo I_max = 220V / 30Ω = 7,33 A.',
        errorCategoryOnFail: 'conceptual',
      },
      dimensionalAnalysisNote: '[√(Ω² + Ω²)] = [Ω].',
      limitingCaseNote: 'Para f → 0 el capacitor bloquea la continua (X_C → ∞, I → 0); para f → ∞ el inductor bloquea la alta frecuencia (X_L → ∞, I → 0).',
    },
    whatIfVariations: [],
  },
];

export const TRAP_QUESTIONS: TrapQuestion[] = [
  {
    id: 'trap-u1-1',
    unitNumber: 1,
    difficulty: 'final',
    sourceReference: '03-ELECTROSTATICA-SIS-AL.pdf y TP N°2',
    question:
      'En una región del espacio sabemos que el campo eléctrico E⃗ es nulo en un punto P. ¿Cuál de las siguientes afirmaciones es necesariamente verdadera?',
    options: [
      'El potencial eléctrico V en el punto P debe ser obligatoriamente igual a cero.',
      'No puede existir ninguna carga eléctrica en las cercanías del punto P.',
      'Una carga puntual q colocada en reposo exactamente en el punto P experimentará una fuerza electrostática neta igual a cero, aunque el potencial V en P puede ser distinto de cero.',
      'El flujo eléctrico a través de cualquier superficie que pase por P es nulo.',
    ],
    correctIndex: 2,
    errorCategory: 'conceptual',
    cualEraLaTrampa:
      'La trampa clásica es confundir "Campo Eléctrico nulo (E⃗ = 0)" con "Potencial Eléctrico nulo (V = 0)".',
    porQueIncorrecta:
      'En el punto medio entre dos cargas iguales positivas (+q y +q), los vectores campo eléctrico se oponen y se anulan (E⃗ = 0), pero los potenciales escalares se suman positivamente (V = 2kq/r ≠ 0).',
    palabraSospechosa:
      '"el potencial eléctrico V en el punto P debe ser obligatoriamente igual a cero"',
    comoReconocerEnExamen:
      'Siempre que una pregunta vincule E = 0 con V = 0, dibuja mentalmente dos cargas iguales (+q, +q) para recordar que E = 0 pero V ≠ 0, y un dipolo (+q, -q) para recordar que en el medio V = 0 pero E ≠ 0.',
  },
  {
    id: 'trap-u2-1',
    unitNumber: 2,
    difficulty: 'final',
    sourceReference: 'Unidad_N2_-_Ley_de_Gauss-1.pdf y TP N°3',
    question:
      'Una superficie gaussiana esférica no encierra ninguna carga neta (q_enc = 0), pero a 10 cm por afuera de la esfera hay una carga puntual +Q. ¿Qué podemos asegurar sobre el flujo ΦE y el campo eléctrico E⃗ en los puntos de la superficie gaussiana?',
    options: [
      'Tanto el flujo neto ΦE como el campo eléctrico E⃗ en cada punto de la superficie valen cero.',
      'El flujo eléctrico neto ΦE a través de la superficie cerrada es exactamente cero, pero el campo eléctrico E⃗ en los puntos de la superficie NO es cero.',
      'El flujo neto vale +Q/ε₀ porque las líneas de +Q atraviesan la esfera.',
      'Se puede despejar E = 0 sacando E afuera de la integral de Gauss.',
    ],
    correctIndex: 1,
    errorCategory: 'simetria',
    cualEraLaTrampa:
      'Creer que como ∮ E⃗·dS⃗ = 0 entonces el integrando E⃗ debe ser cero en todo punto de la superficie.',
    porQueIncorrecta:
      'La carga externa +Q sí genera campo eléctrico en todos los puntos de la esfera, pero todas las líneas de campo que entran por una cara de la esfera salen por la cara opuesta, haciendo que la integral cerrada neta dé cero.',
    palabraSospechosa:
      '"el campo eléctrico E⃗ en cada punto de la superficie vale cero"',
    comoReconocerEnExamen:
      'Recuerda: en la Ley de Gauss, E⃗ dentro de la integral es el campo TOTAL (de cargas internas + externas), mientras que el resultado del flujo neto depende SOLO de las cargas internas.',
  },
  {
    id: 'trap-u4-1',
    unitNumber: 4,
    difficulty: 'coloquio',
    sourceReference: 'Ingenieria_-_T.P.N5_-_Capacitores.pdf (Ej. 4) y Apunte 04',
    question:
      'Un capacitor de placas paralelas se carga con una batería de 12 V, luego SE DESCONECTA de la batería y a continuación se introduce un dieléctrico de constante Ke = 3 llenando el espacio entre las placas. ¿Qué ocurre con la carga Q, la diferencia de potencial V y la energía almacenada U?',
    options: [
      'Q permanece constante, V se reduce a la tercera parte (4 V) y la energía U disminuye a la tercera parte.',
      'V permanece constante en 12 V, Q se triplica y la energía U se triplica.',
      'Tanto Q como V permanecen constantes y la energía se triplica.',
      'La capacidad C se reduce a la tercera parte.',
    ],
    correctIndex: 0,
    errorCategory: 'interpretacion',
    cualEraLaTrampa:
      'Mezclar el caso de "batería conectada" con el caso de "batería desconectada" (TP5 Ej. 4).',
    porQueIncorrecta:
      'Al estar desconectada la batería, las cargas no tienen a dónde ir ni de dónde venir, por lo que Q es constante. Como C aumenta a 3·C₀ y V = Q/C, el voltaje cae a V₀/3 y la energía U = Q²/(2C) cae a U₀/3 (el campo eléctrico realiza trabajo atrayendo al dieléctrico hacia adentro de las placas).',
    palabraSospechosa:
      '"luego SE DESCONECTA de la batería"',
    comoReconocerEnExamen:
      'Subraya siempre en el enunciado si la fuente sigue conectada (V = constante) o si se desconectó/abrió la llave antes del cambio (Q = constante).',
  },
  {
    id: 'trap-u5-1',
    unitNumber: 5,
    difficulty: 'intermedio',
    sourceReference: '04-ELECTRODINAMICA-SIS-_AL.pdf (Pág. 9)',
    question:
      'De acuerdo con el apunte oficial de la cátedra UNdeC (Prof. Chade Vergara), ¿cuál es el verdadero enunciado físico de la Ley de Ohm?',
    options: [
      'La diferencia de potencial es igual al producto de la corriente por la resistencia (V = i·R) para cualquier material de la naturaleza.',
      'La resistencia R de un dispositivo conductor óhmico es una constante independiente de la magnitud y polaridad de la diferencia de potencial aplicada (gráfica V vs i lineal).',
      'La resistencia siempre aumenta exponencialmente con la corriente.',
      'La corriente es un vector que cumple las leyes de adición vectorial.',
    ],
    correctIndex: 1,
    errorCategory: 'conceptual',
    cualEraLaTrampa:
      'Confundir la definición general de resistencia (R = V/i) con la Ley de Ohm.',
    porQueIncorrecta:
      'La página 9 del apunte 04-ELECTRODINAMICA dice textualmente: "La relación V = i·R no es un enunciado de la Ley de Ohm. Un conductor obedece la Ley de Ohm sólo si su gráfica V en función de i es lineal, es decir, si R es independiente de V y de i".',
    palabraSospechosa:
      '"para cualquier material de la naturaleza"',
    comoReconocerEnExamen:
      'En exámenes teóricos y coloquios de la UNdeC, siempre aclara que R = V/i define la resistencia para cualquier elemento (incluso un diodo no óhmico), pero la Ley de Ohm afirma que R = constante.',
  },
  {
    id: 'trap-u6-1',
    unitNumber: 6,
    difficulty: 'final',
    sourceReference: '05-MAGNETISMO-SIS-AL.pdf (Pág. 6)',
    question:
      'Un electrón ingresa con velocidad v = 10⁶ m/s formando un ángulo de 60° con un campo magnético estático y uniforme B = 1,5 T. ¿Qué sucede con el módulo de su velocidad y su energía cinética mientras se mueve dentro del campo?',
    options: [
      'Su energía cinética aumenta debido al trabajo realizado por la fuerza de Lorentz.',
      'Su velocidad se reduce gradualmente hasta quedar en reposo por el ángulo de 60°.',
      'El vector velocidad cambia continuamente de dirección (describiendo una hélice), pero su módulo |v| y su energía cinética permanecen estrictamente constantes porque la fuerza magnética es perpendicular al desplazamiento y realiza trabajo nulo (W = 0).',
      'Solo se conserva la componente perpendicular de la velocidad.',
    ],
    correctIndex: 2,
    errorCategory: 'conceptual',
    cualEraLaTrampa:
      'Pensar que porque existe una fuerza neta F = qvB·sen(60°) ≠ 0, la rapidez o la energía cinética deben cambiar.',
    porQueIncorrecta:
      'Por propiedad del producto vectorial F⃗ = q(v⃗ × B⃗), la fuerza magnética es siempre perpendicular a v⃗ (y por ende a ds⃗). Por el teorema del trabajo y la energía, dW = F⃗·ds⃗ = 0 ⇒ ΔK = 0.',
    palabraSospechosa:
      '"módulo de su velocidad y su energía cinética"',
    comoReconocerEnExamen:
      'Distingue siempre entre el VECTOR velocidad v⃗ (que sí cambia porque gira su dirección, habiendo aceleración centrípeta) y el MÓDULO de la velocidad |v| (que no cambia jamás en un campo B estático puro).',
  },
  {
    id: 'trap-u7-1',
    unitNumber: 7,
    difficulty: 'coloquio',
    sourceReference: 'Unidad N°8 - Ley de Faraday.pdf (Diapo 7) y Apunte 06 (Pág. 4)',
    question:
      'Según la Ley de Lenz, cuando alejamos el polo Norte de un imán de una espira conductora fija, ¿cómo es la dirección del campo magnético inducido B⃗_ind dentro del área de la espira respecto al campo magnético B⃗_imán del imán?',
    options: [
      'B⃗_ind tiene dirección OPUESTA a B⃗_imán porque la Ley de Lenz dice que el campo inducido siempre se opone al campo del imán.',
      'B⃗_ind tiene la MISMA dirección que B⃗_imán, porque al alejarse el imán el flujo está disminuyendo y la corriente inducida trata de sostener el flujo oponiéndose a su disminución (creando una cara Sur frente al Norte que se aleja).',
      'No se induce corriente al alejar el imán, solo al acercarlo.',
      'B⃗_ind es perpendicular al eje del imán.',
    ],
    correctIndex: 1,
    errorCategory: 'signo',
    cualEraLaTrampa:
      'Repetir de memoria "el campo inducido se opone al campo externo" en vez de "se opone al CAMBIO de flujo".',
    porQueIncorrecta:
      'El apunte 06 (pág. 4) lo aclara entre paréntesis: "la corriente inducida se opone al cambio en el flujo a través del circuito (no al flujo en sí)". Si el flujo disminuye, B_ind suma a favor del campo original.',
    palabraSospechosa:
      '"siempre se opone al campo del imán"',
    comoReconocerEnExamen:
      'Pregunta primero: ¿el flujo aumenta o disminuye? Si aumenta → B_ind opuesto a B_ext. Si disminuye → B_ind a favor de B_ext.',
  },
  {
    id: 'trap-u8-1',
    unitNumber: 8,
    difficulty: 'coloquio',
    sourceReference: 'Unidad N°9 - Inductancia.pdf (Diapos 5 y 6)',
    question:
      'Por una bobina de inductancia L = 5 H circula una corriente de izquierda (borne a) a derecha (borne b) cuya intensidad está DISMINUYENDO a razón de di/dt = -4 A/s. ¿Cuál de los bornes está a mayor potencial eléctrico y por qué?',
    options: [
      'El borne "a" está a mayor potencial porque la corriente entra por "a" igual que en una resistencia.',
      'El borne "b" (de salida de la corriente) está a 20 V MÁS de potencial que "a" (Vab = L·di/dt = -20 V), porque al disminuir la corriente la fem autoinducida actúa en el mismo sentido de la corriente para oponerse a su caída.',
      'Ambos bornes están al mismo potencial.',
      'El inductor disipa 80 W en calor como un resistor.',
    ],
    correctIndex: 1,
    errorCategory: 'signo',
    cualEraLaTrampa:
      'Tratar a un inductor como si fuera un resistor donde el potencial siempre cae en el sentido de la corriente.',
    porQueIncorrecta:
      'La diapositiva 6 de la Unidad 9 (Ing. Tejada Barrantes) muestra los 4 casos: cuando i es decreciente (di/dt < 0), el potencial SE INCREMENTA de "a" a "b" ( borne - en "a" y borne + en "b") porque el inductor devuelve energía magnética intentando sostener la corriente.',
    palabraSospechosa:
      '"cuya intensidad está DISMINUYENDO"',
    comoReconocerEnExamen:
      'En un inductor no mires hacia dónde va la corriente i para poner los signos + y - de la fem: mira el signo de la derivada di/dt.',
  },
];

export const ORAL_COLLOQUIUM_QUESTIONS: OralColloquiumQuestion[] = [
  {
    id: 'oral-u2-gauss',
    unitNumber: 2,
    difficulty: 'coloquio',
    question:
      'Pase al pizarrón: Enuncie y escriba la Ley de Gauss de la Electricidad. Explique qué representa físicamente el flujo eléctrico, bajo qué condiciones exactas puede extraer el módulo del campo eléctrico E fuera de la integral cerrada y demuestre cómo se deduce la Ley de Coulomb a partir de Gauss.',
    followUpWhatIf:
      '¿Qué sucede con el flujo total y con la validez de la Ley de Gauss si desplazamos la carga puntual q lejos del centro de la esfera (sin sacarla afuera)? ¿Podríamos seguir despejando E de la integral?',
    boardDrawingInstruction:
      'Dibuja en el pizarrón: 1) Una carga puntual +q en el centro, 2) La superficie gaussiana esférica punteada de radio r, 3) El vector campo E⃗ radial saliente y el vector diferencial de superficie dS⃗ paralelo a E⃗ (θ = 0°).',
    expectedKeyConcepts: [
      'Flujo eléctrico como medida de líneas de campo que atraviesan un área',
      'Superficie cerrada gaussiana y vector normal saliente dS',
      'Carga neta encerrada q_enc dividida por permitividad ε0',
      'Condición de simetría: E constante en módulo sobre la superficie y paralelo a dS (cos 0° = 1)',
      'Área de la esfera 4πr² y recuperación de E = q / (4πε0r²)',
    ],
    expectedFormula: '∮ E⃗ · dS⃗ = q_enc / ε₀  ⇒  E · (4πr²) = q / ε₀  ⇒  E = q / (4πε₀·r²)',
    expectedUnits: 'Flujo ΦE en [N·m²/C] o [V·m]; Campo E en [N/C] o [V/m].',
    expectedConditions:
      'La ley ΦE = q_enc/ε₀ vale siempre para cualquier superficie cerrada, pero solo permite despejar E(r) fuera de la integral cuando existe simetría esférica, cilíndrica infinita o plana infinita.',
    catedraModelAnswer:
      'La Ley de Gauss establece que el flujo del campo eléctrico a través de cualquier superficie cerrada es igual a la carga neta encerrada dividida por ε₀: ΦE = ∮ E⃗·dS⃗ = q_enc/ε₀. Para una carga puntual +q, elegimos una superficie gaussiana esférica concéntrica de radio r. Por simetría, en todos los puntos de la esfera el vector E⃗ es radial igual que dS⃗ (ángulo 0°, cos 0° = 1) y su módulo E es constante. Solo por esas dos razones podemos sacar E fuera de la integral: E ∮ dS = E·(4πr²) = q/ε₀, de donde despejamos E = q/(4πε₀r²) y al multiplicar por una carga de prueba q₀ obtenemos la Ley de Coulomb. Si la carga se descentra dentro de la esfera, el flujo total sigue valiendo q/ε₀, pero E ya no es constante en la esfera y está prohibido sacarlo de la integral.',
  },
  {
    id: 'oral-u4-capacitores',
    unitNumber: 4,
    difficulty: 'final',
    question:
      'Explique físicamente qué es la capacitancia de un condensador, demuestre usando la Ley de Gauss que para placas paralelas vale C = ε₀·A/d, y explique qué ocurre microscópicamente cuando insertamos un dieléctrico de constante Ke.',
    followUpWhatIf:
      'Compare en el pizarrón qué pasa con Q, V, C, E y la energía U al introducir el dieléctrico en dos casos: 1) Con la batería conectada, y 2) Habiendo desconectado la batería previamente.',
    boardDrawingInstruction:
      'Dibuja las dos placas paralelas (+q arriba, -q abajo), el cilindro gaussiano con una tapa dentro del conductor superior (donde E = 0) y la otra tapa entre las placas, y los dipolos alineados del dieléctrico.',
    expectedKeyConcepts: [
      'Capacidad C = q/V como propiedad puramente geométrica y del medio',
      'Campo nulo dentro del conductor en equilibrio electrostático',
      'Aplicación de Gauss entre las placas: q = ε0·E·A y V = E·d',
      'Polarización del dieléctrico y carga superficial inducida q_face = Q(1 - 1/Ke)',
      'Distinción entre V constante (con fuente) y Q constante (sin fuente)',
    ],
    expectedFormula: 'q = ε₀·E·A  y  V = E·d  ⇒  C = q/V = ε₀·A / d  (con dieléctrico: Ck = Ke·ε₀·A / d)',
    expectedUnits: 'Capacidad en Faradios [F = C/V]; Energía U = ½CV² en Joules [J].',
    expectedConditions:
      'Válido para placas planas paralelas donde la separación d es mucho menor que el área A (despreciando deformación de bordes).',
    catedraModelAnswer:
      'Según la demostración del apunte 04 de la cátedra (Fig. 19), trazamos una superficie gaussiana cilíndrica con una tapa dentro del metal de la placa (donde E = 0 por equilibrio electrostático) y la otra tapa entre las placas donde E es uniforme. Por Gauss: ε₀∮E·dA = ε₀·E·A = q. Como la diferencia de potencial entre placas en campo uniforme es V = E·d, al dividir C = q/V = (ε₀·E·A)/(E·d) se cancela el campo E y queda C = ε₀·A/d. Al insertar un dieléctrico, sus moléculas se polarizan induciendo cargas superficiales opuestas que reducen el campo eléctrico para una misma carga libre, aumentando la capacidad a C = Ke·ε₀·A/d.',
  },
  {
    id: 'oral-u7-maxwell',
    unitNumber: 7,
    difficulty: 'coloquio',
    question:
      'Tema de Final en Pizarrón: Escriba las 4 Ecuaciones de Maxwell en el vacío. Explique el significado físico de cada una y desarrolle el argumento de simetría por el cual Maxwell modificó la Ley de Ampère introduciendo la Corriente de Desplazamiento.',
    followUpWhatIf:
      '¿Qué sucedería con las 4 ecuaciones de Maxwell si algún día se descubrieran monopolos magnéticos aislados en la naturaleza, y cómo predijo Maxwell la velocidad de la luz c?',
    boardDrawingInstruction:
      'Escribe en una tabla las 4 integrales cerradas (2 de flujo superficial ∮dA y 2 de circulación de línea ∮ds) señalando el término μ₀·ε₀(dΦE/dt) y la ecuación c = 1/√(ε₀·μ₀).',
    expectedKeyConcepts: [
      'I. Ley de Gauss eléctrica (cargas como fuentes/sumideros de E)',
      'II. Ley de Gauss magnética ∮B·dA = 0 (inexistencia de monopolos magnéticos, líneas cerradas)',
      'III. Ley de Faraday ∮E·ds = -dΦB/dt (flujo magnético variable induce campo eléctrico)',
      'IV. Ley de Ampère-Maxwell y corriente de desplazamiento id = ε0·dΦE/dt',
      'Predicción de ondas electromagnéticas con velocidad c = 1/√(ε0·μ0) ≈ 3×10⁸ m/s',
    ],
    expectedFormula: '∮B⃗·ds⃗ = μ₀·i + μ₀·ε₀·(dΦE/dt)   con   id = ε₀·(dΦE/dt)   y   c = 1 / √(ε₀·μ₀)',
    expectedUnits: 'Corriente de desplazamiento id en Amperes [A]; velocidad c en [m/s].',
    expectedConditions:
      'Ecuaciones fundamentales del Electromagnetismo en el vacío, invariantes ante transformaciones de Lorentz.',
    catedraModelAnswer:
      'Como desarrolla el Prof. Chade Vergara en el apunte 06 (págs. 7 a 11), los miembros izquierdos de las 4 ecuaciones son simétricos en parejas: dos integrales de superficie cerrada (flujos de E y B) y dos integrales de línea cerrada (circulaciones de E y B). En la ecuación III (Faraday), el término -dΦB/dt indica que si un campo magnético cambia en el tiempo, produce un campo eléctrico. Por simetría física, Maxwell postuló que si un campo eléctrico cambia en el tiempo (dΦE/dt), debe producir un campo magnético, agregando a la Ley de Ampère la corriente de desplazamiento id = ε₀(dΦE/dt). Gracias a este término, los campos E y B variables se regeneran mutuamente en el espacio viajando a velocidad c = 1/√(ε₀·μ₀) = 2,9986×10⁸ m/s, unificando la Óptica con el Electromagnetismo.',
  },
];

export const INITIAL_STUDENT_ERRORS: StudentErrorRecord[] = [];

