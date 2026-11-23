export interface CheatsheetFormulaItem {
  name: string;
  latex: string;
  interpretation: string;
  siUnits: string;
  conditionsOfValidity: string[];
  mortalTrap: string;
}

export interface UnitCheatsheet {
  unitNumber: number;
  title: string;
  shortTitle: string;
  parcialGroup: '1er Parcial' | '2do Parcial';
  corePrinciples: string[];
  formulas: CheatsheetFormulaItem[];
  blackboardDiagramNote: string;
  topExamTraps: string[];
}

export const CATEDRA_CHEATSHEETS: UnitCheatsheet[] = [
  {
    unitNumber: 1,
    title: 'Unidad 1: Carga Eléctrica, Ley de Coulomb y Campo Eléctrico',
    shortTitle: 'Coulomb y Campo E',
    parcialGroup: '1er Parcial',
    corePrinciples: [
      'La carga está cuantizada: q = ± N·e.',
      'Principio de superposición lineal: E_neto = ∑ E_i (o integral de dE).',
      'El campo eléctrico E es una magnitud vectorial; nunca sumar magnitudes escalares directamente sin proyectar en versores i, j, k.',
    ],
    formulas: [
      {
        name: 'Ley de Coulomb',
        latex: '\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2} \\hat{r}_{12}',
        interpretation: 'Fuerza electrostática entre dos cargas puntuales en reposo en el vacío.',
        siUnits: 'Newton [N]',
        conditionsOfValidity: ['Cargas puntuales', 'En reposo relativo', 'En el vacío o medio lineal isótropo'],
        mortalTrap: 'Olvidar el versor r̂ y sumar fuerzas como si fueran números escalares sin descomponer en x e y.',
      },
      {
        name: 'Campo Eléctrico de Carga Puntual',
        latex: '\\vec{E} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r^2} \\hat{r}',
        interpretation: 'Fuerza eléctrica por unidad de carga testigo positiva colocada en el punto.',
        siUnits: 'Newton/Coulomb [N/C] o Volt/metro [V/m]',
        conditionsOfValidity: ['Carga puntual q en el origen de coordenadas'],
        mortalTrap: 'Ponerle signo a q adentro de la fórmula y cambiar el sentido del versor dos veces por error de regla de signos.',
      },
      {
        name: 'Campo de Distribución Continua',
        latex: '\\vec{E} = \\frac{1}{4\\pi\\varepsilon_0} \\int \\frac{dq}{r^2} \\hat{r}',
        interpretation: 'Integración vectorial donde dq = λ dl, σ dA o ρ dV según la dimensión.',
        siUnits: 'N/C',
        conditionsOfValidity: ['Distribución continua de carga en reposo'],
        mortalTrap: 'Sacar r de la integral como si fuera constante cuando los elementos dq están a distancias variables del punto P.',
      },
    ],
    blackboardDiagramNote: 'Dibujá en la pizarra los ejes x, y, el elemento diferencial dq sobre la varilla/anillo, el vector posición r y la descomposición dE_x y dE_y aclarando qué componente se anula por simetría.',
    topExamTraps: [
      'Decir que el campo es cero adentro de una región sin justificar por simetría o ley de Gauss.',
      'Olvidar pasar microcoulombs (μC = 10⁻⁶ C) y milímetros (10⁻³ m) a unidades del SI antes de operar.',
      'No aclarar las hipótesis de distribución uniforme (λ = cte).',
    ],
  },
  {
    unitNumber: 2,
    title: 'Unidad 2: Ley de Gauss del Campo Eléctrico',
    shortTitle: 'Ley de Gauss',
    parcialGroup: '1er Parcial',
    corePrinciples: [
      'El flujo eléctrico neto a través de cualquier superficie CERRADA depende únicamente de la carga neta encerrada.',
      'Para despejar E de la integral de flujo, E debe ser constante en módulo y colineal o perpendicular a dA en toda la superficie gaussiana.',
      'Dentro de un conductor en equilibrio electrostático, E = 0 y el exceso de carga reside íntegramente en su superficie exterior.',
    ],
    formulas: [
      {
        name: 'Ley de Gauss Integral',
        latex: '\\Phi_E = \\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}',
        interpretation: 'Flujo neto saliente de una superficie cerrada S es proporcional a la carga interior.',
        siUnits: 'N·m²/C o V·m',
        conditionsOfValidity: ['Superficie S debe ser estrictamente cerrada (gaussiana)'],
        mortalTrap: 'Usar Gauss para una geometría sin alta simetría (ej. un cubo con carga en un vértice) pretendiendo sacar E de la integral.',
      },
      {
        name: 'Cilindro Infinito / Hilo Largo',
        latex: 'E(r) = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}',
        interpretation: 'Campo radial que decae con 1/r, perpendicular al eje del cilindro.',
        siUnits: 'N/C',
        conditionsOfValidity: ['Hilo o cilindro infinitamente largo', 'r exterior al radio del conductor'],
        mortalTrap: 'Ignorar las tapas de la superficie gaussiana cilíndrica (debés demostrar explícitamente que E·dA = 0 en las tapas).',
      },
      {
        name: 'Plano Infinito Uniforme',
        latex: 'E = \\frac{\\sigma}{2\\varepsilon_0}',
        interpretation: 'Campo uniforme independiente de la distancia z al plano.',
        siUnits: 'N/C',
        conditionsOfValidity: ['Plano no conductor infinito', 'Distribución de carga superficial uniforme'],
        mortalTrap: 'Confundir el campo de un plano no conductor (σ/2ε₀) con el campo inmediatamente afuera de un conductor (σ/ε₀).',
      },
    ],
    blackboardDiagramNote: 'Dibujá la superficie gaussiana con línea punteada, indicá los vectores dĀ en paredes y tapas, y sombreá la carga encerrada Q_enc.',
    topExamTraps: [
      'No escribir el circulito en la integral cerrada ∮.',
      'Olvidar analizar las regiones interior (r < R) y exterior (r > R) por separado.',
      'Decir que E = 0 en la superficie si Q_enc = 0 (el flujo es 0, no necesariamente el campo puntual).',
    ],
  },
  {
    unitNumber: 3,
    title: 'Unidad 3: Potencial Eléctrico y Energía Electroestática',
    shortTitle: 'Potencial Eléctrico',
    parcialGroup: '1er Parcial',
    corePrinciples: [
      'El campo electrostático es conservativo: ∮ E·dl = 0. Por ende, existe una función escalar potencial V.',
      'El campo eléctrico siempre apunta hacia potenciales decrecientes (E = -∇V).',
      'La diferencia de potencial es independiente del camino elegido.',
    ],
    formulas: [
      {
        name: 'Diferencia de Potencial',
        latex: '\\Delta V = V_B - V_A = -\\int_A^B \\vec{E} \\cdot d\\vec{l}',
        interpretation: 'Trabajo por unidad de carga que realiza una fuerza externa para mover la carga sin aceleración.',
        siUnits: 'Volt [V] = Joule/Coulomb [J/C]',
        conditionsOfValidity: ['Campo electrostático estático (sin campos magnéticos variables dB/dt)'],
        mortalTrap: 'Invertir el signo menos y decir que el campo apunta a potenciales mayores.',
      },
      {
        name: 'Relación Diferencial E y V',
        latex: '\\vec{E} = -\\vec{\\nabla} V = -\\left( \\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k} \\right)',
        interpretation: 'El campo es el gradiente negativo del potencial.',
        siUnits: 'V/m',
        conditionsOfValidity: ['V diferenciable en el punto considerado'],
        mortalTrap: 'Olvidar la derivada parcial al calcular componentes vectoriales.',
      },
      {
        name: 'Energía de un Sistema de Cargas',
        latex: 'U = \\frac{1}{2} \\sum_{i} q_i V_i = \\frac{\\varepsilon_0}{2} \\int E^2 dV',
        interpretation: 'Trabajo necesario para ensamblar el sistema trayendo las cargas desde el infinito.',
        siUnits: 'Joule [J]',
        conditionsOfValidity: ['Referencia V(∞) = 0'],
        mortalTrap: 'Contar las parejas de cargas dos veces si no se divide por 2.',
      },
    ],
    blackboardDiagramNote: 'Graficá en simultáneo las curvas de E(r) y V(r) alineando los ejes verticales. Recordá que V(r) es continuo en la frontera del conductor aunque E(r) sea discontinuo.',
    topExamTraps: [
      'Decir que si E = 0 en un punto, entonces V = 0 (ejemplo clásico: centro de un anillo o interior de una esfera conductora donde E=0 pero V=constante ≠ 0).',
      'Olvidar definir el punto de referencia de potencial nulo en el infinito.',
    ],
  },
  {
    unitNumber: 4,
    title: 'Unidad 4: Capacidad, Condensadores y Dieléctricos',
    shortTitle: 'Capacitores y Dieléctricos',
    parcialGroup: '1er Parcial',
    corePrinciples: [
      'La capacidad C depende pura y exclusivamente de la geometría del dispositivo y del medio dieléctrico interpuesto (no de Q ni de V).',
      'Con batería CONECTADA: V = constante, Q varía con el dieléctrico.',
      'Con batería DESCONECTADA: Q = constante, V disminuye con el dieléctrico.',
      'El dieléctrico se polariza, generando un campo inducido E_ind opuesto al campo libre.',
    ],
    formulas: [
      {
        name: 'Definición de Capacidad',
        latex: 'C = \\frac{Q}{\\Delta V} = \\varepsilon_r \\varepsilon_0 \\frac{A}{d}',
        interpretation: 'Relación entre carga acumulada y diferencia de potencial entre placas.',
        siUnits: 'Faradio [F] = Coulomb/Volt [C/V]',
        conditionsOfValidity: ['Placas paralelas con separación d mucho menor que el área A (sin efecto de borde)'],
        mortalTrap: 'Pensar que si duplicás el voltaje se duplica la capacidad (solo se duplica la carga Q).',
      },
      {
        name: 'Energía Almacenada en un Capacitor',
        latex: 'U = \\frac{1}{2} C (\\Delta V)^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q \\Delta V',
        interpretation: 'Energía electrostática almacenada en el campo eléctrico entre placas.',
        siUnits: 'Joule [J]',
        conditionsOfValidity: ['Cte dieléctrica lineal'],
        mortalTrap: 'Usar (1/2)CV² cuando Q permanece constante, lo que induce a confusiones con el signo de variación de energía.',
      },
      {
        name: 'Vector Vector Polarización y Desplazamiento',
        latex: '\\vec{D} = \\varepsilon_0 \\vec{E} + \\vec{P} = \\varepsilon_r \\varepsilon_0 \\vec{E}',
        interpretation: 'D solo depende de las cargas libres; E incluye el efecto de las cargas ligadas o de polarización.',
        siUnits: 'C/m²',
        conditionsOfValidity: ['Dieléctrico lineal e isótropo'],
        mortalTrap: 'Confundir densidad de carga libre σ_libre con densidad de carga inducida σ_ligada = P·n̂.',
      },
    ],
    blackboardDiagramNote: 'Dibujá las placas con cargas +Q y -Q, los dipolos alineados adentro del dieléctrico, y los vectores E_0, E_ind y E_total = E_0 - E_ind.',
    topExamTraps: [
      'No distinguir si el capacitor está conectado o desconectado de la fuente al introducir el dieléctrico.',
      'Asociación en serie: se suman las inversas (1/C_eq = 1/C₁ + 1/C₂) y la carga Q es idéntica en todos.',
      'Asociación en paralelo: se suman directamente (C_eq = C₁ + C₂) y el voltaje V es idéntico.',
    ],
  },
  {
    unitNumber: 5,
    title: 'Unidad 5: Corriente Eléctrica, Resistencia y Circuitos de CC (Kirchhoff)',
    shortTitle: 'Corriente y Kirchhoff',
    parcialGroup: '1er Parcial',
    corePrinciples: [
      'La corriente i = dq/dt es el flujo neto de carga. La densidad de corriente J = n·q·v_d es un vector.',
      '1ª Ley de Kirchhoff (Nodos): Conservación estricta de la carga eléctrica (∑ i = 0).',
      '2ª Ley de Kirchhoff (Mallas): Conservación de la energía a lo largo de un camino cerrado (∑ ΔV = 0).',
    ],
    formulas: [
      {
        name: 'Ley de Ohm Microscópica y Macroscópica',
        latex: '\\vec{J} = \\sigma \\vec{E} \\quad \\Longleftrightarrow \\quad \\Delta V = I R',
        interpretation: 'Relación lineal entre campo/voltaje y densidad de corriente/intensidad.',
        siUnits: 'Ohm [Ω] = Volt/Ampere [V/A]',
        conditionsOfValidity: ['Materiales óhmicos a temperatura constante'],
        mortalTrap: 'Aplicar Ohm a elementos no lineales (como diodos o tubos de descarga) o no considerar la resistencia interna r de la batería.',
      },
      {
        name: 'Resistencia Geométrica',
        latex: 'R = \\rho \\frac{L}{A}',
        interpretation: 'Resistencia de un conductor cilíndrico en función de su resistividad ρ, longitud y sección.',
        siUnits: 'Ohm [Ω], con resistividad ρ en [Ω·m]',
        conditionsOfValidity: ['Conductor homogéneo y sección uniforme'],
        mortalTrap: 'Confundir resistividad ρ [Ω·m] con densidad volumétrica de carga ρ [C/m³].',
      },
      {
        name: 'Circuito RC en Carga y Descarga',
        latex: 'q(t) = Q_{\\text{max}} (1 - e^{-t/RC}), \\quad i(t) = \\frac{\\mathcal{E}}{R} e^{-t/RC}',
        interpretation: 'Evolución transitoria con constante de tiempo τ = RC.',
        siUnits: 'τ en Segundos [s] = [Ω]·[F]',
        conditionsOfValidity: ['Capacitor inicialmente descargado q(0)=0'],
        mortalTrap: 'En t=0 el capacitor se comporta como un cortocircuito (R_eq=0); en t→∞ se comporta como circuito abierto (i=0).',
      },
    ],
    blackboardDiagramNote: 'Dibujá el circuito marcando el sentido arbitrario de las corrientes en cada rama y el sentido de recorrido de cada malla con flechas circulares para defender los signos de Kirchhoff.',
    topExamTraps: [
      'Equivocar el signo de la fem al recorrer la batería: de - a + es SUBIDA de potencial (+E); de + a - es BAJADA (-E).',
      'Confundir potencia entregada por la fem (P = E·I) con potencia disipada por Joule en la resistencia (P = I²·R).',
    ],
  },
  {
    unitNumber: 6,
    title: 'Unidad 6: Campo Magnético y Fuerza de Lorentz',
    shortTitle: 'Campo Magnético y Lorentz',
    parcialGroup: '2do Parcial',
    corePrinciples: [
      'Una carga en reposo NO experimenta fuerza magnética. La fuerza requiere velocidad y que v no sea paralela a B.',
      'La fuerza magnética F = q(v × B) es siempre perpendicular tanto a v como a B; por lo tanto, NO realiza trabajo y la energía cinética se conserva.',
      'El campo B solo cambia la dirección de la velocidad, jamás su módulo escalar.',
    ],
    formulas: [
      {
        name: 'Fuerza de Lorentz General',
        latex: '\\vec{F} = q (\\vec{E} + \\vec{v} \\times \\vec{B})',
        interpretation: 'Fuerza total sobre una carga en presencia de campos eléctricos y magnéticos simultáneos.',
        siUnits: 'Newton [N]',
        conditionsOfValidity: ['Partícula puntual con carga q'],
        mortalTrap: 'Olvidar el signo de q en cargas negativas (electrón): el producto vectorial se invierte 180°.',
      },
      {
        name: 'Radio del Ciclotrón',
        latex: 'R = \\frac{m v}{q B}, \\quad \\omega = \\frac{q B}{m}',
        interpretation: 'Radio de la trayectoria circular cuando v es perpendicular a B homogéneo.',
        siUnits: 'Metro [m], frecuencia angular en [rad/s]',
        conditionsOfValidity: ['v estrictamente perpendicular a B uniforme', 'Régimen no relativista'],
        mortalTrap: 'Creer que la frecuencia ciclotrón depende del radio o de la velocidad: ¡es independiente del radio!',
      },
      {
        name: 'Fuerza sobre Conductor con Corriente',
        latex: '\\vec{F} = I (\\vec{L} \\times \\vec{B}) = \\int I (d\\vec{l} \\times \\vec{B})',
        interpretation: 'Fuerza resultante sobre las cargas en movimiento confinadas en el cable.',
        siUnits: 'Newton [N]',
        conditionsOfValidity: ['Conductor rectilíneo en campo uniforme (o versión diferencial para curvas)'],
        mortalTrap: 'Tomar L como longitud escalar en vez de vector orientado en el sentido de la corriente I.',
      },
    ],
    blackboardDiagramNote: 'Mostrá la regla de la mano derecha con tres dedos: pulgar (v o I), índice (B), mayor perpendicular (Fuerza). En la pizarra marcá círculos con cruz (⊗ entrando) y con punto (⊙ saliendo).',
    topExamTraps: [
      'Decir que la fuerza magnética acelera la partícula aumentando su rapidez (¡falso! realiza aceleración centrípeta, no tangencial).',
      'No distinguir espira en equilibrio: el momento dipolar magnético μ = I·A tiende a alinearse con B.',
    ],
  },
  {
    unitNumber: 7,
    title: 'Unidad 7: Fuentes de Campo Magnético (Biot-Savart y Ley de Ampère)',
    shortTitle: 'Biot-Savart y Ampère',
    parcialGroup: '2do Parcial',
    corePrinciples: [
      'Las corrientes eléctricas son fuentes de campo magnético.',
      'Ley de Gauss del Magnetismo: ∮ B·dA = 0 (no existen monopolos magnéticos aislados; las líneas de B son siempre lazos cerrados).',
      'Ley de Ampère: La circulación de B a lo largo de una curva CERRADA depende de las corrientes concatenadas.',
    ],
    formulas: [
      {
        name: 'Ley de Biot-Savart',
        latex: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}',
        interpretation: 'Campo magnético diferencial generado por un elemento de corriente I dl a distancia r.',
        siUnits: 'Tesla [T] = N/(A·m)',
        conditionsOfValidity: ['Corrientes estacionarias (sin acumulación de carga con el tiempo)'],
        mortalTrap: 'Confundir el versor r̂ con el vector r⃗ (si ponés r⃗ en el numerador, abajo va r³).',
      },
      {
        name: 'Ley de Ampère Circuital',
        latex: '\\oint_C \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}',
        interpretation: 'Circulación de B sobre una curva cerrada C arbitraria que encierra la corriente neta I_enc.',
        siUnits: 'T·m',
        conditionsOfValidity: ['Corrientes estacionarias', 'Simetría cilíndrica, plana o toroidal'],
        mortalTrap: 'Usar Ampère sin simetría suficiente para sacar el módulo de B fuera de la integral de línea.',
      },
      {
        name: 'Solenoide Ideal',
        latex: 'B = \\mu_0 n I = \\mu_0 \\frac{N}{L} I',
        interpretation: 'Campo uniforme en el interior de un solenoide largo y nulo en su exterior.',
        siUnits: 'Tesla [T]',
        conditionsOfValidity: ['Solenoide muy largo (L >> radio R)', 'Vueltas apretadas'],
        mortalTrap: 'Confundir n (vueltas por unidad de longitud N/L) con N (número total de vueltas).',
      },
    ],
    blackboardDiagramNote: 'Dibujá el contorno amperiano cerrado punteado, la regla de la mano derecha para asignar el signo positivo a las corrientes que lo atraviesan, y justificá B interior y exterior.',
    topExamTraps: [
      'Corrientes paralelas en el mismo sentido SE ATRAEN; corrientes en sentidos opuestos SE REPELEN (lo opuesto a las cargas electrostáticas).',
      'Olvidar demostrar que B = 0 en el exterior del solenoide ideal.',
    ],
  },
  {
    unitNumber: 8,
    title: 'Unidad 8: Inducción Electromagnética y Ley de Faraday-Lenz',
    shortTitle: 'Faraday-Lenz e Inductancia',
    parcialGroup: '2do Parcial',
    corePrinciples: [
      'Un flujo magnético variable en el tiempo a través de un circuito induce una fuerza electromotriz (fem).',
      'Ley de Lenz (el signo menos): La fem inducida genera una corriente cuyo campo propio se opone a la VARIACIÓN del flujo inductor.',
      'El campo eléctrico inducido es NO CONSERVATIVO: ∮ E_ind · dl = -dΦ_B/dt ≠ 0.',
    ],
    formulas: [
      {
        name: 'Ley de Faraday-Lenz',
        latex: '\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt} \\int_S \\vec{B} \\cdot d\\vec{A}',
        interpretation: 'fem inducida por variación de B, variación de área A o giro del ángulo θ.',
        siUnits: 'Volt [V] = Weber/segundo [Wb/s]',
        conditionsOfValidity: ['Circuito cerrado que delimita una superficie orientada S'],
        mortalTrap: 'Pensar que la fem se opone al campo B: ¡se opone al CAMBIO de flujo dΦ/dt, no a B!',
      },
      {
        name: 'Autoinductancia de un Solenoide',
        latex: 'L = \\frac{N \\Phi_B}{I} = \\mu_0 n^2 A l = \\mu_0 \\frac{N^2}{l} A',
        interpretation: 'Capacidad de un inductor de oponerse a variaciones de su propia corriente.',
        siUnits: 'Henrio [H] = Volt·s / Ampere = Ω·s',
        conditionsOfValidity: ['Geometría fija y núcleo de permeabilidad constante μ'],
        mortalTrap: 'Olvidar que L es proporcional al cuadrado del número de vueltas N².',
      },
      {
        name: 'Energía en un Campo Magnético',
        latex: 'U = \\frac{1}{2} L I^2 = \\frac{1}{2\\mu_0} \\int B^2 dV',
        interpretation: 'Energía almacenada en el campo magnético del inductor.',
        siUnits: 'Joule [J]',
        conditionsOfValidity: ['Medio lineal magnético'],
        mortalTrap: 'En t=0 un inductor desconectado se comporta como un circuito abierto (i=0 no puede cambiar bruscamente); en t→∞ se comporta como cortocircuito.',
      },
    ],
    blackboardDiagramNote: 'Hacé el dibujo de una espira con el imán acercándose norte-sur. Marcá el vector área, el flujo B creciendo, el campo inducido B_ind en contra y el sentido de la corriente con la mano derecha.',
    topExamTraps: [
      'Si una varilla se desliza en un riel con B saliente, la fuerza magnética sobre la varilla siempre se opone al movimiento (freno magnético de Lenz).',
      'El campo eléctrico inducido NO tiene potencial electrostático asociado: no podés definir V entre dos puntos sin especificar la trayectoria.',
    ],
  },
  {
    unitNumber: 9,
    title: 'Unidad 9: Corriente Alterna, Fasores y Ecuaciones de Maxwell',
    shortTitle: 'CA, Fasores y Maxwell',
    parcialGroup: '2do Parcial',
    corePrinciples: [
      'En régimen senoidal permanente, la corriente y el voltaje se representan como vectores giratorios (fasores) a frecuencia angular ω.',
      'En un capacitor, la corriente adelanta 90° al voltaje (I adelanta a V_C).',
      'En un inductor, el voltaje adelanta 90° a la corriente (V_L adelanta a I).',
      'Maxwell completó la Ley de Ampère agregando la corriente de desplazamiento: i_d = ε₀ dΦ_E/dt.',
    ],
    formulas: [
      {
        name: 'Impedancia de un Circuito RLC Serie',
        latex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad X_L = \\omega L, \\quad X_C = \\frac{1}{\\omega C}',
        interpretation: 'Oposición total al paso de corriente alterna; en resonancia X_L = X_C y Z = R (mínima).',
        siUnits: 'Ohm [Ω]',
        conditionsOfValidity: ['Régimen permanente senoidal'],
        mortalTrap: 'Sumar reactancias y resistencia algebraicamente en vez de vectorialmente con Pitágoras (Z ≠ R + X_L + X_C).',
      },
      {
        name: 'Ley de Ampère-Maxwell Completa',
        latex: '\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 \\left( I_{\\text{conducción}} + \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\right)',
        interpretation: 'Un campo eléctrico variable con el tiempo engendra un campo magnético exactamente como una corriente real.',
        siUnits: 'T·m',
        conditionsOfValidity: ['Válida universalmente en electrodinámica clásica'],
        mortalTrap: 'Olvidar la corriente de desplazamiento entre las placas de un capacitor en proceso de carga.',
      },
      {
        name: 'Vector de Poynting e Intensidad',
        latex: '\\vec{S} = \\frac{1}{\\mu_0} \\vec{E} \\times \\vec{B}, \\quad \\langle S \\rangle = \\frac{E_{\\text{max}} B_{\\text{max}}}{2\\mu_0} = \\frac{E_{\\text{max}}^2}{2\\mu_0 c}',
        interpretation: 'Densidad de flujo de energía transportada por la onda electromagnética por unidad de área y tiempo.',
        siUnits: 'Watt/m² [W/m²]',
        conditionsOfValidity: ['Onda electromagnética en el vacío o medio dieléctrico'],
        mortalTrap: 'Confundir el valor instantáneo de S con el valor medio temporal <S> (que lleva el factor 1/2 por el valor eficaz).',
      },
    ],
    blackboardDiagramNote: 'Dibujá el diagrama fasorial con I sobre el eje real horizontal, V_R en fase, V_L a +90° arriba y V_C a -90° abajo, mostrando el ángulo de desfasaje tg(φ) = (X_L - X_C)/R.',
    topExamTraps: [
      'Potencia media activa es P = V_rms · I_rms · cos(φ). El factor de potencia cos(φ) es 1 en resonancia y 0 en circuitos puramente L o C.',
      'En el vacío, E y B en una onda electromagnética viajan en fase y cumplen siempre E = c·B.',
    ],
  },
];
