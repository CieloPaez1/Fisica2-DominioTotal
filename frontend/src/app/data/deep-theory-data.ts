// Contenido Teórico Profundo y Demostraciones de Pizarrón para las 9 Unidades de Física 2
export interface PizarraDerivation {
  title: string;
  steps: string[];
  physicalSignificance: string;
}

export interface DeepConcept {
  concept: string;
  explanation: string;
}

export interface TribunalQuestion {
  question: string;
  answer: string;
}

export interface DeepTheoryUnit {
  unitNumber: number;
  title: string;
  subtitle: string;
  pizarraDerivations: PizarraDerivation[];
  deepConcepts: DeepConcept[];
  tribunalQuestions: TribunalQuestion[];
}

export const DEEP_THEORY_DATA: DeepTheoryUnit[] = [
  {
    "unitNumber": 1,
    "title": "Unidad 1: Carga Eléctrica, Ley de Coulomb y Campo Eléctrico",
    "subtitle": "Interacción Electrostática, Principio de Superposición y Fenomenología de Cargas",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón 1: Deducción del Campo Eléctrico de un Dipolo sobre su Eje y en su Bisectriz",
        "steps": [
          "1) Configuración: Dos cargas +q y -q separadas una distancia d = 2a. Momento dipolar p = q · d en dirección de -q a +q.",
          "2) Sobre el eje del dipolo (a distancia r del centro con r ≫ a): E_eje = k q / (r - a)² - k q / (r + a)² = k q · [(r+a)² - (r-a)²] / (r² - a²)².",
          "3) Desarrollando el numerador: (r² + 2ar + a²) - (r² - 2ar + a²) = 4ar.",
          "4) Para r ≫ a, despreciamos a² frente a r²: E_eje ≈ k q (4ar) / r⁴ = 2 k (q · 2a) / r³ = 2 k p / r³.",
          "5) Conclusión física: El campo dipolar decae con 1/r³ (mucho más rápido que 1/r² de una carga puntual) porque desde lejos las cargas opuestas casi se cancelan mutuamente."
        ],
        "physicalSignificance": "Muestra por qué las fuerzas intermoleculares (entre dipolos moleculares) tienen un alcance mucho más corto que la atracción electrostática monopolar pura."
      },
      {
        "title": "Demostración de Pizarrón 2: Campo Eléctrico en el Eje de un Anillo Delgado Uniformemente Cargado",
        "steps": [
          "1) Un anillo circular de radio R tiene carga total Q uniforme (λ = Q / 2πR). Punto P sobre el eje a distancia x del centro.",
          "2) Elemento de carga dq genera dE = k dq / r² donde r² = x² + R².",
          "3) Por simetría azimutal, las componentes perpendiculares al eje dE_y se cancelan en parejas opuestas: Σ dE_perp = 0.",
          "4) Solo sobrevive la componente axial: dE_x = dE · cos(θ) = [k dq / (x² + R²)] · [x / √(x² + R²)] = k x dq / (x² + R²)^(3/2).",
          "5) Integrando dq sobre todo el anillo: E_x = k Q x / (x² + R²)^(3/2).",
          "6) Casos límite: En el centro x = 0 ⇒ E = 0 (simetría total). Para x ≫ R ⇒ E ≈ k Q / x² (se comporta como carga puntual lejana)."
        ],
        "physicalSignificance": "Ilustra el método general de integración de distribuciones continuas y la recuperación asintótica de la Ley de Coulomb."
      }
    ],
    "deepConcepts": [
      {
        "concept": "¿Por qué la carga eléctrica está cuantizada?",
        "explanation": "A nivel microscópico, toda carga libre observable en la naturaleza es un múltiplo entero exacto de la carga del electrón/protón: q = ±n · e (e = 1,602 × 10⁻¹⁹ C). En problemas macroscópicos con microcoulombs (10¹³ electrones), la discretitud se percibe como continua, de la misma forma que el agua parece un fluido continuo aunque esté formada por moléculas individuales."
      },
      {
        "concept": "Diferencia física entre Conductores y Aislantes (Dieléctricos)",
        "explanation": "En los conductores metálicos, los electrones de valencia están deslocalizados formando un \"gas de Fermi\" que fluye libremente ante la menor fuerza eléctrica. En los aislantes, los electrones están estrechamente unidos a sus núcleos atómicos: no pueden viajar, solo pueden desplazarse fracciones de ángstrom respecto al núcleo, polarizando la molécula."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Por qué en el centro geométrico de un conductor cargado hueco el campo eléctrico es cero sin importar la forma exterior?",
        "answer": "Porque en equilibrio electrostático, si hubiera campo dentro de la cavidad vacía, se podría trazar una trayectoria cerrada con trabajo neto no nulo ∮ E·dl ≠ 0, lo que contradice el carácter conservativo del campo electrostático. Toda la carga se ubica en la superficie exterior."
      },
      {
        "question": "¿Cuál es la diferencia entre sumar fuerzas de Coulomb y sumar campos eléctricos?",
        "answer": "La fuerza de Coulomb depende de la carga de prueba q₀ (F = q₀ E) y tiene unidades de Newton. El campo E es una propiedad intrínseca del espacio creado por las fuentes, independiente de que exista o no una carga de prueba que lo experimente, con unidades de N/C o V/m."
      }
    ]
  },
  {
    "unitNumber": 2,
    "title": "Unidad 2: Ley de Gauss, Flujo y Conductores en Equilibrio",
    "subtitle": "Teorema de Gauss, Simetrías Esférica, Cilíndrica y Plana, y Condiciones de Contorno",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón 1: Campo de un Hilo Infinito con Densidad Lineal λ",
        "steps": [
          "1) Geometría: Hilo rectilíneo infinito con carga lineal λ (C/m). Por simetría axial, E⃗ es puramente radial saliente y su módulo solo depende de la distancia r.",
          "2) Superficie Gaussiana: Cilindro coaxial de radio r y longitud L cerrado con dos tapas planas perpendiculares al hilo.",
          "3) Evaluación del flujo en las 3 superficies: Tapas planas: E⃗ ⊥ dA⃗ (θ = 90°, cos 90° = 0) ⇒ Φ_tapas = 0. Pared lateral: E⃗ ∥ dA⃗ (θ = 0°, cos 0° = 1) y |E| es constante sobre toda la pared.",
          "4) Miembro izquierdo de Gauss: ∮ E · dA = E · A_lateral = E · (2π r L).",
          "5) Miembro derecho: q_enc / ε₀ = (λ · L) / ε₀.",
          "6) Igualando y despejando: E · (2π r L) = (λ · L) / ε₀  ⇒  E(r) = λ / (2πε₀ · r).",
          "7) Interpretación: En simetría cilíndrica el campo decae con 1/r (no con 1/r²), porque el área lateral de un cilindro crece linealmente con r."
        ],
        "physicalSignificance": "Es la base para modelar cables de alta tensión, tubos de rayos catódicos y la región entre conductores de un cable coaxial."
      },
      {
        "title": "Demostración de Pizarrón 2: Campo en la Superficie de un Conductor Metálico",
        "steps": [
          "1) Conductor metálico en equilibrio con densidad superficial de carga local σ.",
          "2) Trazamos una pequeña caja de pastillas cilíndrica de sección ΔA: una tapa dentro del metal y la otra inmediatamente afuera en el aire.",
          "3) Flujo interior: dentro del metal en equilibrio E_int = 0 ⇒ Φ_int = 0.",
          "4) Flujo lateral: el campo solo tiene componente normal a la superficie ⇒ Φ_lateral = 0.",
          "5) Flujo exterior: E_ext · ΔA.",
          "6) Carga encerrada: q_enc = σ · ΔA.",
          "7) Por Gauss: E_ext · ΔA = (σ · ΔA) / ε₀  ⇒  E = σ / ε₀."
        ],
        "physicalSignificance": "Demuestra por qué el campo junto al conductor es el doble que junto a una lámina aislante: no hay líneas hacia adentro del metal."
      }
    ],
    "deepConcepts": [
      {
        "concept": "Diferencia crítica entre ΦE = ∮ E·dA = 0 y E = 0",
        "explanation": "Que el flujo neto a través de una superficie cerrada sea cero SOLO significa que la carga neta encerrada es cero (q_enc = 0). NO significa en absoluto que el campo E sea cero en los puntos de la superficie. Una carga exterior crea un campo intenso en la superficie, pero todo el flujo que entra por una cara sale por la opuesta."
      },
      {
        "concept": "Blindaje Electrostático (Jaula de Faraday)",
        "explanation": "En un conductor hueco, los electrones libres se redistribuyen en la superficie externa anulando cualquier campo eléctrico en la cavidad interior. Por eso los autos y aviones protegen de rayos y los cables coaxiales aíslan señales de interferencias externas."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Por qué no podemos aplicar la Ley de Gauss para despejar el campo eléctrico de un dipolo?",
        "answer": "Porque la Ley de Gauss sigue siendo matemáticamente válida (da flujo neto cero), pero carece de simetría suficiente: el módulo de E no es constante sobre ninguna superficie cerrada simple, impidiendo sacarlo fuera de la integral."
      }
    ]
  },
  {
    "unitNumber": 3,
    "title": "Unidad 3: Potencial Eléctrico, Trabajo y Gradiente",
    "subtitle": "Naturaleza Conservativa, Planos Equipotenciales y Energía de Ensamblaje",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Relación entre Campo Uniforme y Diferencia de Potencial V = E · d",
        "steps": [
          "1) Campo eléctrico uniforme E⃗ = -E₀ ĵ (apuntando hacia abajo).",
          "2) Definición general de diferencia de potencial: V_B - V_A = -∫_A^B E⃗ · dl⃗.",
          "3) Si nos desplazamos una distancia d en el mismo sentido del campo (dl⃗ = -dy ĵ con dy = d): E⃗ · dl⃗ = E₀ · d · cos(0°) = E₀ · d.",
          "4) Reemplazando: V_B - V_A = -E₀ · d  ⇒  ΔV = -E₀ · d  o en módulo: |ΔV| = E · d.",
          "5) Regla física mnemotécnica: Al viajar A FAVOR de las líneas de campo eléctrico, el potencial SIEMPRE DISMINUYE."
        ],
        "physicalSignificance": "Permite calcular voltajes en aceleradores de partículas, tubos de rayos X y entre placas de capacitores."
      }
    ],
    "deepConcepts": [
      {
        "concept": "Significado físico del signo menos en E = -∇V",
        "explanation": "El gradiente ∇V es un vector que apunta en la dirección de MÁXIMO CRECIMIENTO del potencial. Al anteponer el signo menos (-∇V), el campo eléctrico E⃗ apunta en la dirección en que el potencial DISMINUYE más rápidamente, igual que una pelota que rueda hacia el fondo de un valle gravitatorio."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Puede ser el potencial eléctrico cero en un punto donde el campo no es cero?",
        "answer": "Sí, totalmente. El ejemplo paradigmático es el plano mediador de un dipolo (+q y -q): los potenciales escalares se cancelan V = kq/r - kq/r = 0, pero los vectores campo apuntan en el mismo sentido y se suman: E ≠ 0."
      }
    ]
  },
  {
    "unitNumber": 4,
    "title": "Unidad 4: Capacitores, Dieléctricos y Energía",
    "subtitle": "Capacitancia Geométrica, Polarización Molecular y Densidad de Energía",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Densidad de Energía del Campo Eléctrico u_E = ½ ε₀ E²",
        "steps": [
          "1) Consideramos un capacitor plano de área A y separación d: C = ε₀ A / d y V = E · d.",
          "2) Energía total almacenada: U = ½ C V² = ½ · (ε₀ A / d) · (E · d)² = ½ ε₀ E² · (A · d).",
          "3) Reconocemos que el volumen comprendido entre las placas es Vol = A · d.",
          "4) Definimos la densidad de energía electrostática por unidad de volumen: u_E = U / Vol.",
          "5) u_E = ½ ε₀ E² (en el vacío) o u_E = ½ ε E² = ½ Ke ε₀ E² (con dieléctrico).",
          "6) Trascendencia física: La energía no está \"en las placas metálicas\", sino almacenada directamente en el espacio donde existe el Campo Eléctrico."
        ],
        "physicalSignificance": "Fundamenta la energía que transportan las ondas electromagnéticas por el espacio vacío."
      }
    ],
    "deepConcepts": [
      {
        "concept": "¿Por qué la capacidad C es una propiedad puramente geométrica?",
        "explanation": "Aunque se define como C = Q / V, duplicar Q duplica automáticamente el voltaje V al doble, cancelándose en el cociente. C depende solo de la forma de los conductores (área, separación, radios) y del medio interpuesto (Ke), nunca de la carga presente."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Qué le pasa a la energía de un capacitor si metemos un dieléctrico con la batería conectada vs desconectada?",
        "answer": "Con batería conectada (V = cte): C aumenta por Ke, y U = ½ C V² AUMENTA por factor Ke (la batería entrega energía). Con batería desconectada (Q = cte): C aumenta por Ke, y U = Q²/(2C) DISMINUYE por factor Ke (el campo eléctrico realiza trabajo positivo atrayendo al dieléctrico)."
      }
    ]
  },
  {
    "unitNumber": 5,
    "title": "Unidad 5: Circuitos Eléctricos, Ley de Ohm y Kirchhoff",
    "subtitle": "Densidad de Corriente, Balances de Malla y Transitorios RC",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Deducción de la Ecuación Diferencial del Transitorio RC",
        "steps": [
          "1) Malla cerrada con fem ε, interruptor, resistencia R y capacitor C inicialmente descargado.",
          "2) En t = 0 se cierra el circuito. Por 2da Ley de Kirchhoff: ε - i(t) · R - q(t) / C = 0.",
          "3) Como la corriente es la rapidez de carga de las placas: i(t) = dq/dt.",
          "4) Ecuación diferencial: R · (dq/dt) + q/C = ε  ⇒  dq/dt = (Cε - q) / (RC).",
          "5) Separación de variables: dq / (q - Cε) = -dt / (RC). Integrando desde q=0 hasta q(t): ln[(q - Cε) / (-Cε)] = -t / (RC).",
          "6) Despejando: q(t) = C · ε · [1 - e^(-t / RC)].",
          "7) Derivando para la corriente: i(t) = dq/dt = (ε / R) · e^(-t / RC)."
        ],
        "physicalSignificance": "Explica el tiempo de respuesta de circuitos de filtrado, marcapasos y memorias dinámicas."
      }
    ],
    "deepConcepts": [
      {
        "concept": "Velocidad de Arrastre de los Electrones vs Velocidad de la Señal",
        "explanation": "En un cable de cobre doméstico con 5 A, los electrones individuales avanzan con una velocidad de arrastre ridículamente lenta: v_d ≈ 0,1 mm/s (tardan horas en recorrer un metro). Sin embargo, la luz se enciende al instante porque la señal eléctrica es una onda electromagnética en el campo que viaja a velocidad cercana a la de la luz (~ 2 × 10⁸ m/s en el cable)."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Por qué la Primera Ley de Kirchhoff representa la conservación de la carga y la Segunda la conservación de la energía?",
        "answer": "En un nodo no hay acumulación ni pérdida de materia electrónica en estado estacionario (Σ i_entran = Σ i_salen, conservación de carga). En una malla cerrada, dar una vuelta completa en un campo electrostático conservativo devuelve el potencial al mismo valor inicial (∮ E·dl = 0 ⇒ Σ ΔV = 0, conservación de energía)."
      }
    ]
  },
  {
    "unitNumber": 6,
    "title": "Unidad 6: Campo Magnético, Fuentes y Ley de Ampère",
    "subtitle": "Fuerza de Lorentz, Trayectorias Helicoidales y Circulación de Ampère",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Ley de Biot-Savart para el Centro de una Espira Circular",
        "steps": [
          "1) Espira circular plana de radio R por la que circula corriente i.",
          "2) Por Biot-Savart: dB⃗ = (μ₀ · i / 4π) · (dl⃗ × r̂) / R².",
          "3) En cualquier punto de la espira, el elemento de longitud dl⃗ es perpendicular al radio vector r̂ (ángulo 90°, |dl × r̂| = dl · 1 · sin 90° = dl).",
          "4) Por regla de mano derecha, los vectores dB⃗ de todos los elementos dl apuntan perpendicularmente a la espira en el mismo sentido.",
          "5) Integrando: B = (μ₀ i / 4π R²) ∮ dl = (μ₀ i / 4π R²) · (2π R).",
          "6) Simplificando: B_centro = μ₀ · i / (2 · R)."
        ],
        "physicalSignificance": "Permite calcular el campo de electroimanes y bobinas de Helmholtz."
      }
    ],
    "deepConcepts": [
      {
        "concept": "¿Por qué el campo magnético estático no puede acelerar una partícula en rapidez?",
        "explanation": "Porque la fuerza magnética F = q(v × B) es el producto vectorial de la velocidad con el campo. Al ser siempre ortogonal a v, su componente tangencial es exactamente cero: F_tangencial = m · (dv/dt) = 0. Solo actúa como fuerza centrípeta alterando la dirección del vector velocidad, no su módulo ni su energía cinética."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Qué es el Efecto Hall y qué demostró sobre los portadores de carga?",
        "answer": "Al hacer pasar corriente por una cinta conductora en un campo B transversal, la fuerza de Lorentz desvía a los portadores hacia un borde generando una diferencia de potencial transversal (Voltaje Hall). El signo medido del voltaje Hall demostró experimentalmente que en los metales los portadores móviles son cargas NEGATIVAS (electrones)."
      }
    ]
  },
  {
    "unitNumber": 7,
    "title": "Unidad 7: Ley de Faraday-Lenz, Inducción y Maxwell",
    "subtitle": "Flujo Variable, Corrientes de Foucault y Corriente de Desplazamiento",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Conservación de Energía en la Barra Móvil sobre Rieles",
        "steps": [
          "1) Barra conductora de longitud l deslizando a velocidad v sobre rieles con resistencia R en campo B perpendicular.",
          "2) Fem inducida: ε = -d(B l x)/dt = -B l v.",
          "3) Corriente inducida: i = |ε| / R = (B l v) / R.",
          "4) Fuerza magnética sobre la barra: F_B = i l B = (B² l² v) / R en sentido opuesto a v.",
          "5) Para que la velocidad sea constante, una fuerza mecánica externa F_ap debe equilibrarla: F_ap = (B² l² v) / R.",
          "6) Potencia mecánica entregada por el operador: P_mec = F_ap · v = (B² l² v²) / R.",
          "7) Potencia eléctrica disipada por Joule en R: P_Joule = i² R = [(B l v) / R]² · R = (B² l² v²) / R.",
          "8) P_mec = P_Joule: El 100% del trabajo mecánico se transforma en energía eléctrica disipada."
        ],
        "physicalSignificance": "Demuestra que la inducción electromagnética es una manifestación directa de la conservación de la energía mecánica y eléctrica."
      }
    ],
    "deepConcepts": [
      {
        "concept": "Las 4 formas de generar Fuerza Electromotriz según Faraday",
        "explanation": "Como ΦB = ∫ B · dA · cos(θ), se puede inducir fem variando: 1) El campo magnético en el tiempo dB/dt (transformadores); 2) El área del circuito dA/dt (barra sobre rieles); 3) El ángulo dθ/dt = ω (generadores y alternadores); 4) Una combinación de ellas."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Qué son las corrientes parásitas o de Foucault y cómo se evitan en transformadores?",
        "answer": "Son corrientes inducidas en bucles cerrados dentro de masas metálicas sometidas a campos magnéticos variables que disipan calor por Joule. En transformadores se evitan construyendo el núcleo con chapas laminadas delgadas aisladas con barniz en lugar de un bloque macizo."
      }
    ]
  },
  {
    "unitNumber": 8,
    "title": "Unidad 8: Inductancia, Materiales Magnéticos y RLC",
    "subtitle": "Autoinductancia de Solenoides, Energía Magnética y Resonancia Fasorial",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Densidad de Energía del Campo Magnético u_B = B² / (2 μ₀)",
        "steps": [
          "1) Solenoide ideal de longitud l y sección A: B = μ₀ n i y L = μ₀ n² l A.",
          "2) Despejamos la corriente en función de B: i = B / (μ₀ n).",
          "3) Energía total almacenada en el inductor: U = ½ L i² = ½ · (μ₀ n² l A) · [B / (μ₀ n)]².",
          "4) Simplificando n² y μ₀: U = ½ · [B² / μ₀] · (l · A).",
          "5) Como el volumen interior del solenoide es Vol = l · A: u_B = U / Vol = B² / (2 μ₀).",
          "6) Comparación con electrostática: u_E = ½ ε₀ E² y u_B = ½ (1/μ₀) B² demuestran la profunda simetría energética del electromagnetismo."
        ],
        "physicalSignificance": "Permite calcular la densidad de energía que transportan los campos magnéticos en estrellas de neutrones, resonadores y ondas de radio."
      }
    ],
    "deepConcepts": [
      {
        "concept": "Diferencia de comportamiento entre Resistor, Capacitor e Inductor",
        "explanation": "El resistor disipa energía irreversiblemente en calor (P = i²R). El capacitor almacena energía en su campo eléctrico E (U = ½CV²) y se opone a cambios bruscos de VOLTAJE. El inductor almacena energía en su campo magnético B (U = ½LI²) y se opone a cambios bruscos de CORRIENTE."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Qué sucede en la frecuencia de resonancia de un circuito RLC serie?",
        "answer": "Las reactancias inductiva y capacitiva se cancelan exactamente (X_L = X_C), la impedancia es puramente resistiva y mínima (Z = R), la corriente alcanza su valor máximo y el desfasaje entre tensión y corriente es cero (factor de potencia cos φ = 1)."
      }
    ]
  },
  {
    "unitNumber": 9,
    "title": "Unidad 9: Ondas Electromagnéticas, Óptica y Espectro",
    "subtitle": "Unificación de Maxwell, Propagación Transversal y Leyes de Refracción",
    "pizarraDerivations": [
      {
        "title": "Demostración de Pizarrón: Deducción de la Ecuación de Onda a partir de las Ecuaciones de Maxwell",
        "steps": [
          "1) En el vacío sin cargas (ρ = 0) ni corrientes (j = 0): ∇ × E = -∂B/∂t y ∇ × B = μ₀ ε₀ ∂E/∂t.",
          "2) Aplicamos el rotor al rotor del campo eléctrico: ∇ × (∇ × E) = ∇(∇ · E) - ∇²E.",
          "3) Como no hay cargas libres, ∇ · E = 0, luego el término se reduce a -∇²E.",
          "4) Del otro lado: ∇ × (-∂B/∂t) = -∂(∇ × B)/∂t = -∂(μ₀ ε₀ ∂E/∂t)/∂t = -μ₀ ε₀ (∂²E/∂t²).",
          "5) Igualando: -∇²E = -μ₀ ε₀ (∂²E/∂t²)  ⇒  ∇²E = μ₀ ε₀ (∂²E/∂t²).",
          "6) Esta es la clásica ecuación tridimensional de onda d²ψ/dx² = (1/v²) d²ψ/dt² con velocidad v = 1 / √(μ₀ ε₀) = c."
        ],
        "physicalSignificance": "Es la demostración matemática más célebre de la historia de la física que predijo la existencia de las ondas de radio y la naturaleza electromagnética de la luz."
      }
    ],
    "deepConcepts": [
      {
        "concept": "¿Por qué todas las ondas electromagnéticas viajan a la misma velocidad en el vacío?",
        "explanation": "Porque la velocidad c depende únicamente de las dos constantes fundamentales de la permeabilidad μ₀ y permitividad ε₀ del espacio vacío. Rayos gamma, rayos X, luz visible y ondas de radio viajan exactamente a la misma velocidad c; solo difieren en su longitud de onda y frecuencia (c = λ · f)."
      }
    ],
    "tribunalQuestions": [
      {
        "question": "¿Cómo se demuestra la Ley de Snell a partir del Principio de Fermat?",
        "answer": "El Principio de Fermat establece que la luz sigue la trayectoria que minimiza el tiempo de viaje entre dos puntos. Al derivar la función del tiempo t(x) = (d₁/v₁) + (d₂/v₂) respecto a la posición en la interfaz e igualar a cero, se obtiene sin(θ₁)/v₁ = sin(θ₂)/v₂, que al sustituir v = c/n conduce exactamente a n₁ sin(θ₁) = n₂ sin(θ₂)."
      }
    ]
  }
];
