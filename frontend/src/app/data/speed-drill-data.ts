export type SpeedDrillCategory =
  | 'mano_derecha'
  | 'signo_lenz'
  | 'unidades_si'
  | 'trampa_vf'
  | 'circuito_rc_rl';

export interface SpeedDrillQuestion {
  id: string;
  unitNumber: number;
  category: SpeedDrillCategory;
  prompt: string;
  scenarioVisual?: {
    type: 'lorentz_cross' | 'lenz_loop' | 'rc_switch' | 'unit_badge';
    vDir?: 'derecha' | 'izquierda' | 'arriba' | 'abajo';
    bDir?: 'entrando' | 'saliendo' | 'arriba' | 'abajo' | 'derecha' | 'izquierda';
    chargeSign?: '+' | '-';
    fluxChange?: 'aumenta' | 'disminuye';
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleHint: string;
}

export const SPEED_DRILL_QUESTIONS: SpeedDrillQuestion[] = [
  // --- FUERZA MAGNÉTICA Y REGLA DE LA MANO DERECHA ---
  {
    id: 'sd-1',
    unitNumber: 6,
    category: 'mano_derecha',
    prompt: 'Un protón (q > 0) se mueve hacia la DERECHA en un campo B que ENTRA a la pantalla (⊗). ¿Hacia dónde apunta la fuerza magnética?',
    scenarioVisual: {
      type: 'lorentz_cross',
      vDir: 'derecha',
      bDir: 'entrando',
      chargeSign: '+',
    },
    options: ['Hacia Arriba (↑)', 'Hacia Abajo (↓)', 'Hacia la Derecha (→)', 'Fuerza nula (0)'],
    correctIndex: 0,
    explanation: 'Regla de la mano derecha: pulgar a la derecha, dedos entrando a la pantalla, la palma empuja hacia ARRIBA.',
    ruleHint: 'F = q(v × B). Si q > 0, sentido directo del producto vectorial.',
  },
  {
    id: 'sd-2',
    unitNumber: 6,
    category: 'mano_derecha',
    prompt: 'Un ELECTRÓN (q < 0) se mueve hacia la DERECHA en un campo B que ENTRA a la pantalla (⊗). ¿Hacia dónde apunta la fuerza magnética?',
    scenarioVisual: {
      type: 'lorentz_cross',
      vDir: 'derecha',
      bDir: 'entrando',
      chargeSign: '-',
    },
    options: ['Hacia Arriba (↑)', 'Hacia Abajo (↓)', 'Hacia la Izquierda (←)', 'Hacia adentro (⊗)'],
    correctIndex: 1,
    explanation: 'El producto v × B da hacia arriba, pero como el electrón tiene carga negativa q = -e, la fuerza se invierte 180° apuntando hacia ABAJO.',
    ruleHint: '¡Alerta de carga negativa! Invertí el resultado de la mano derecha.',
  },
  {
    id: 'sd-3',
    unitNumber: 6,
    category: 'mano_derecha',
    prompt: 'Un protón se mueve en la misma dirección y sentido que un campo magnético uniforme (v // B). ¿Cuánto vale la fuerza magnética?',
    scenarioVisual: {
      type: 'lorentz_cross',
      vDir: 'derecha',
      bDir: 'derecha',
      chargeSign: '+',
    },
    options: ['F = q v B', 'Fuerza nula (F = 0)', 'F = q v B / 2', 'Fuerza infinita'],
    correctIndex: 1,
    explanation: 'Como el ángulo entre v y B es θ = 0°, sen(0°) = 0, por lo que el producto vectorial v × B es nulo.',
    ruleHint: 'Si v es paralelo o antiparalelo a B, no hay fuerza magnética.',
  },
  {
    id: 'sd-4',
    unitNumber: 6,
    category: 'mano_derecha',
    prompt: 'Una corriente recta viaja hacia ARRIBA (↑). ¿Cuál es el sentido de las líneas de campo B a la DERECHA del conductor?',
    scenarioVisual: {
      type: 'lorentz_cross',
      vDir: 'arriba',
      bDir: 'entrando',
      chargeSign: '+',
    },
    options: ['Entrando al plano (⊗)', 'Saliendo del plano (⊙)', 'Hacia arriba (↑)', 'Hacia abajo (↓)'],
    correctIndex: 0,
    explanation: 'Pulgar apuntando hacia arriba: a la derecha del cable los dedos entran al plano (⊗), a la izquierda salen (⊙).',
    ruleHint: 'Regla del sacacorchos / pulgar sobre el conductor rectilíneo.',
  },

  // --- LEY DE LENZ Y FEM INDUCIDA ---
  {
    id: 'sd-5',
    unitNumber: 8,
    category: 'signo_lenz',
    prompt: 'El campo magnético que ENTRA a una espira plana (⊗) está AUMENTANDO con el tiempo. ¿Qué sentido tiene la corriente inducida?',
    scenarioVisual: {
      type: 'lenz_loop',
      bDir: 'entrando',
      fluxChange: 'aumenta',
    },
    options: ['Antihorario (↺)', 'Horario (↻)', 'No hay corriente inducida', 'Alterna cada 1 ms'],
    correctIndex: 0,
    explanation: 'El flujo entrante crece. Para oponerse al aumento, la espira debe generar un campo propio saliente (⊙). Por regla de la mano derecha, dedos saliendo requieren corriente ANTIHORARIA.',
    ruleHint: 'Lenz: el campo inducido se opone al aumento creando flujo en sentido contrario.',
  },
  {
    id: 'sd-6',
    unitNumber: 8,
    category: 'signo_lenz',
    prompt: 'El campo magnético que ENTRA a una espira (⊗) está DISMINUYENDO con el tiempo. ¿Qué sentido tiene la corriente inducida?',
    scenarioVisual: {
      type: 'lenz_loop',
      bDir: 'entrando',
      fluxChange: 'disminuye',
    },
    options: ['Horario (↻)', 'Antihorario (↺)', 'Corriente nula', 'Hacia el centro'],
    correctIndex: 0,
    explanation: 'El flujo entrante disminuye. Para oponerse a la disminución, la espira debe reforzar el campo creando B_ind entrante (⊗). Pulgar adentro exige corriente HORARIA.',
    ruleHint: 'Lenz: si el flujo disminuye, el campo inducido tiene el MISMO sentido que el campo inductor.',
  },
  {
    id: 'sd-7',
    unitNumber: 8,
    category: 'signo_lenz',
    prompt: 'Una espira se mueve con velocidad constante dentro de una región de campo magnético uniforme y constante. ¿Cuánto vale la fem inducida?',
    scenarioVisual: {
      type: 'lenz_loop',
      bDir: 'entrando',
    },
    options: ['ε = B·L·v', 'ε = 0 (Nula)', 'ε = B·A·ω', 'ε = ∞'],
    correctIndex: 1,
    explanation: 'Mientras la espira esté totalmente inmersa en el campo uniforme, el flujo Φ = B·A es constante. Si dΦ/dt = 0, no hay fem inducida.',
    ruleHint: '¡Solo hay fem si cambia el flujo! Moverse dentro de un campo constante no engendra fem.',
  },

  // --- UNIDADES DEL SISTEMA INTERNACIONAL (SI) ---
  {
    id: 'sd-8',
    unitNumber: 8,
    category: 'unidades_si',
    prompt: '¿Cuál es la unidad de Autoinductancia (L) en el Sistema Internacional?',
    options: ['Henrio [H] = Volt · s / A', 'Weber [Wb]', 'Faradio [F]', 'Tesla [T]'],
    correctIndex: 0,
    explanation: 'La inductancia se mide en Henrios [H], equivalente a [V·s/A] o [Ω·s].',
    ruleHint: 'ε = -L di/dt ⇒ [L] = [V] / ([A]/[s]) = V·s/A = H.',
  },
  {
    id: 'sd-9',
    unitNumber: 7,
    category: 'unidades_si',
    prompt: '¿Cuál es la unidad de Flujo Magnético (Φ_B) en el Sistema Internacional?',
    options: ['Weber [Wb] = Tesla · m²', 'Tesla [T]', 'Henrio [H]', 'Gauss [G]'],
    correctIndex: 0,
    explanation: 'El flujo es la integral de B·dA, por lo que se mide en [T·m²] = Weber [Wb].',
    ruleHint: 'Φ = B · A ⇒ [T] · [m²] = [Wb].',
  },
  {
    id: 'sd-10',
    unitNumber: 4,
    category: 'unidades_si',
    prompt: '¿A qué equivale 1 Faradio [F] en unidades de carga y potencial?',
    options: ['1 Coulomb / Volt [C/V]', '1 Volt / Coulomb [V/C]', '1 Joule · s', '1 Ampere / Volt'],
    correctIndex: 0,
    explanation: 'C = Q / ΔV ⇒ 1 Faradio = 1 Coulomb por cada Volt aplicado.',
    ruleHint: 'Capacidad = Carga / Voltaje.',
  },
  {
    id: 'sd-11',
    unitNumber: 9,
    category: 'unidades_si',
    prompt: '¿En qué unidad del SI se expresa el Vector de Poynting S = (1/μ₀)(E × B)?',
    options: ['Watt / metro² [W/m²]', 'Joule [J]', 'Volt / metro [V/m]', 'Tesla / segundo'],
    correctIndex: 0,
    explanation: 'El vector de Poynting representa la densidad de flujo de potencia por unidad de superficie: [Potencia]/[Área] = W/m².',
    ruleHint: 'S transporta energía por unidad de tiempo y de área = W/m² = J/(s·m²).',
  },

  // --- TRAMPAS CONCEPTUALES Y VERDADERO / FALSO ---
  {
    id: 'sd-12',
    unitNumber: 3,
    category: 'trampa_vf',
    prompt: '¿Verdadero o Falso? "Si el campo eléctrico E es cero en un punto, el potencial V en ese punto debe ser necesariamente cero".',
    options: ['Falso (E es la derivada de V; si E=0, V es constante pero no necesariamente cero)', 'Verdadero (Si no hay campo, no hay potencial)'],
    correctIndex: 0,
    explanation: '¡Falso! El campo es E = -dV/dr. Dentro de un conductor en equilibrio E = 0 en todo punto, pero el potencial V es constante y tiene el mismo valor que en la superficie.',
    ruleHint: 'E es la pendiente del potencial. Pendiente cero significa meseta (constante), no altura cero.',
  },
  {
    id: 'sd-13',
    unitNumber: 6,
    category: 'trampa_vf',
    prompt: '¿Verdadero o Falso? "La fuerza magnética que actúa sobre una carga en movimiento realiza trabajo aumentando su rapidez".',
    options: ['Falso (F es perpendicular a v, por ende W = 0 y la rapidez se mantiene constante)', 'Verdadero (Toda fuerza neta realiza trabajo)'],
    correctIndex: 0,
    explanation: '¡Falso! Como F = q(v × B) ⊥ v, la potencia instantánea P = F · v = 0. La fuerza magnética no realiza trabajo; solo curva la trayectoria.',
    ruleHint: 'Fuerza perpendicular a velocidad ⇒ Trabajo = 0 y Rapidez = constante.',
  },
  {
    id: 'sd-14',
    unitNumber: 4,
    category: 'trampa_vf',
    prompt: 'Se introduce un dieléctrico de constante k > 1 en un capacitor desconectado de la batería (Q = cte). ¿Qué le ocurre a la energía almacenada U?',
    options: ['Disminuye a U_0 / k', 'Aumenta a k · U_0', 'Permanece exactamente igual', 'Se hace negativa'],
    correctIndex: 0,
    explanation: 'Como Q es constante y C aumenta a k·C_0, la energía U = Q²/(2C) = U_0 / k. El capacitor atrae al dieléctrico realizando trabajo mecánico.',
    ruleHint: 'Q = cte ⇒ U = Q²/(2C). Al aumentar C en el denominador, U disminuye.',
  },

  // --- TRANSITORIOS RC Y RL ---
  {
    id: 'sd-15',
    unitNumber: 5,
    category: 'circuito_rc_rl',
    prompt: 'En un circuito RC serie, en el instante exacto t = 0⁺ justo al cerrar el interruptor con el capacitor descargado, ¿cómo se comporta el capacitor?',
    options: ['Como un cortocircuito (R = 0, caída de potencial V_C = 0)', 'Como un circuito abierto (i = 0)', 'Como una resistencia infinita', 'Como una fuente de voltaje'],
    correctIndex: 0,
    explanation: 'En t=0⁺ la carga q(0)=0, por ende V_C = q/C = 0. Toda la tensión de la fuente cae en la resistencia R y la corriente inicial es máxima: i(0) = E/R.',
    ruleHint: 'Capacitor en t=0 descargado: cortocircuito. En t→∞: circuito abierto.',
  },
  {
    id: 'sd-16',
    unitNumber: 8,
    category: 'circuito_rc_rl',
    prompt: 'En un circuito RL serie, en el instante exacto t = 0⁺ justo al cerrar el interruptor, ¿cómo se comporta el inductor ideal?',
    options: ['Como un circuito abierto (i = 0, la corriente no puede variar instantáneamente)', 'Como un cortocircuito (V_L = 0)', 'Como una resistencia pura', 'Como un capacitor'],
    correctIndex: 0,
    explanation: 'El inductor se opone a cambios bruscos de corriente por su fem autoinducida ε_L = -L di/dt. Por eso i(0⁺) = 0 (circuito abierto). En t→∞ se comporta como cortocircuito.',
    ruleHint: 'Inductor en t=0: circuito abierto (i=0). En t→∞: cortocircuito (V_L=0).',
  },
];
