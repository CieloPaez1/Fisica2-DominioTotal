export interface DerivationStep {
  stepNumber: number;
  title: string;
  explanation: string;
  formulaLatex?: string;
}

export interface FormulaDerivation {
  id: string;
  unitNumber: number;
  unitTitle: string;
  title: string;
  subtitle: string;
  targetFormulaLatex: string;
  physicalMeaning: string;
  diagramCaption: string;
  svgKey:
    | 'coulomb-field'
    | 'dipole-torque'
    | 'gauss-sphere'
    | 'potential-energy'
    | 'line-integral-v'
    | 'equipotentials'
    | 'parallel-capacitor'
    | 'spherical-capacitor'
    | 'dielectric-capacitor'
    | 'drift-current'
    | 'ohm-microscopic'
    | 'joule-power'
    | 'kirchhoff-resistors'
    | 'rc-charge'
    | 'rc-discharge'
    | 'cyclotron-radius'
    | 'velocity-selector'
    | 'wire-torque'
    | 'biot-savart-wire'
    | 'biot-savart-loop'
    | 'ampere-solenoid'
    | 'faraday-integral'
    | 'motional-emf'
    | 'solenoid-inductance'
    | 'magnetic-energy'
    | 'ampere-maxwell';
  docxImage?: string;
  examTip: string;
  steps: DerivationStep[];
}

export const FORMULA_DERIVATIONS: FormulaDerivation[] = [
  // =========================================================================
  // UNIDAD 1: CARGA Y CAMPO ELÉCTRICO
  // =========================================================================
  {
    id: 'u1-campo-puntual',
    unitNumber: 1,
    unitTitle: 'Unidad 1: Carga y Campo Eléctrico',
    title: 'Campo Eléctrico de una Carga Puntual',
    subtitle: 'Fusión de la definición operacional E = F / q₀ con la Ley de Coulomb',
    targetFormulaLatex: 'E = k \\frac{|q|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q|}{r^2}',
    physicalMeaning: 'Mide la intensidad de la perturbación eléctrica por unidad de carga de prueba positiva a distancia r, sin depender de la carga que pongas para medirlo.',
    diagramCaption: 'Líneas radiales saliendo de q > 0 y vector E sobre la carga de prueba q₀.',
    svgKey: 'coulomb-field',
    docxImage: 'assets/docx-media/image1.png',
    examTip: 'Recordá que el campo E existe en el punto P aunque no haya ninguna carga de prueba q₀ colocada allí.',
    steps: [
      {
        stepNumber: 1,
        title: 'Definición operacional del Campo Eléctrico',
        explanation: 'Colocamos una carga de prueba positiva diminuta q₀ en un punto P a distancia r de la carga generadora q y medimos la fuerza eléctrica F que siente.',
        formulaLatex: '\\vec{E} = \\frac{\\vec{F}}{q_0}'
      },
      {
        stepNumber: 2,
        title: 'Aplicamos la Ley de Coulomb entre q y q₀',
        explanation: 'Por la balanza de torsión de Coulomb, la magnitud de la fuerza electrostática entre ambas cargas separadas una distancia r es:',
        formulaLatex: 'F = k \\frac{|q|\\,|q_0|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q|\\,|q_0|}{r^2}'
      },
      {
        stepNumber: 3,
        title: 'Sustituimos F en la definición de E',
        explanation: 'Reemplazamos la fuerza de Coulomb en el numerador de la definición del campo eléctrico:',
        formulaLatex: 'E = \\frac{k \\frac{|q|\\,|q_0|}{r^2}}{q_0}'
      },
      {
        stepNumber: 4,
        title: 'Cancelamos la carga de prueba q₀',
        explanation: 'Al simplificar q₀ arriba y abajo, el resultado queda independiente de q₀ y depende únicamente de la carga fuente q y del cuadrado de la distancia r:',
        formulaLatex: 'E = k \\frac{|q|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q|}{r^2}'
      }
    ]
  },
  {
    id: 'u1-torque-dipolo',
    unitNumber: 1,
    unitTitle: 'Unidad 1: Carga y Campo Eléctrico',
    title: 'Torque sobre un Dipolo Eléctrico',
    subtitle: 'Par de fuerzas sobre +q y -q en un campo eléctrico uniforme',
    targetFormulaLatex: '\\tau = p\\,E\\,\\sin\\theta \\qquad \\left(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\right)',
    physicalMeaning: 'Aunque la fuerza neta sobre un dipolo en un campo uniforme es cero, las fuerzas opuestas forman una cupla que tiende a alinear el dipolo con el campo.',
    diagramCaption: 'Dipolo de brazo d formando ángulo θ con el campo E; fuerzas +qE y -qE generan un par.',
    svgKey: 'dipole-torque',
    docxImage: 'assets/docx-media/image6.png',
    examTip: 'θ = 0° es equilibrio estable (τ = 0, U mínima); θ = 90° es torque máximo; θ = 180° es equilibrio inestable.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fuerzas sobre los polos del dipolo',
        explanation: 'La carga +q siente una fuerza F₊ = qE en el sentido de E, y la carga -q siente F₋ = qE en sentido opuesto. La fuerza neta es F₊ - F₋ = 0.',
        formulaLatex: 'F_+ = +qE, \\qquad F_- = -qE \\implies \\vec{F}_{\\text{neta}} = \\vec{0}'
      },
      {
        stepNumber: 2,
        title: 'Brazo de palanca respecto al centro del dipolo',
        explanation: 'Cada carga está a distancia d/2 del centro geométrico. La componente perpendicular de cada brazo respecto a la línea de acción de la fuerza es (d/2)·sin(θ).',
        formulaLatex: 'r_{\\perp} = \\frac{d}{2}\\sin\\theta'
      },
      {
        stepNumber: 3,
        title: 'Suma de los dos momentos de torsión',
        explanation: 'Ambas fuerzas hacen girar al dipolo en el mismo sentido (horario hacia la alineación con E), por lo que sus torques se suman:',
        formulaLatex: '\\tau = F_+\\left(\\frac{d}{2}\\sin\\theta\\right) + F_-\\left(\\frac{d}{2}\\sin\\theta\\right) = qEd\\sin\\theta'
      },
      {
        stepNumber: 4,
        title: 'Definimos el momento dipolar eléctrico p = q·d',
        explanation: 'Agrupando p = q·d (vector que apunta de -q hacia +q), obtenemos la expresión vectorial y escalar final:',
        formulaLatex: '\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = p\\,E\\,\\sin\\theta'
      }
    ]
  },
  {
    id: 'u1-ley-gauss',
    unitNumber: 1,
    unitTitle: 'Unidad 1: Carga y Campo Eléctrico',
    title: 'Ley de Gauss y Campo de Simetría Esférica',
    subtitle: 'Deducción del flujo eléctrico neto y del campo de una esfera cargada',
    targetFormulaLatex: '\\Phi_E = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\varepsilon_0}',
    physicalMeaning: 'El flujo neto de campo eléctrico que atraviesa cualquier superficie cerrada depende exclusivamente de la carga neta encerrada en su interior.',
    diagramCaption: 'Superficie gaussiana esférica de radio r concéntrica con una carga puntual +q.',
    svgKey: 'gauss-sphere',
    docxImage: 'assets/docx-media/image7.png',
    examTip: 'Siempre justificá por simetría por qué E es constante en magnitud y paralelo a dA antes de sacarlo de la integral.',
    steps: [
      {
        stepNumber: 1,
        title: 'Elegimos una superficie gaussiana esférica de radio r',
        explanation: 'Rodeamos la carga +q con una esfera imaginaria de radio r. En cada punto de la esfera, el vector E y el vector normal dA apuntan radialmente hacia afuera (θ = 0°).',
        formulaLatex: '\\vec{E}\\cdot d\\vec{A} = E\\,dA\\,\\cos(0^\\circ) = E\\,dA'
      },
      {
        stepNumber: 2,
        title: 'Sacamos E de la integral por simetría',
        explanation: 'Como todos los puntos de la esfera están a la misma distancia r de la carga, la magnitud E es constante sobre toda la superficie:',
        formulaLatex: '\\Phi_E = \\oint E\\,dA = E \\oint dA'
      },
      {
        stepNumber: 3,
        title: 'Calculamos el área total de la esfera',
        explanation: 'La integral cerrada del diferencial de área dA es simplemente el área superficial de la esfera de radio r (4πr²):',
        formulaLatex: '\\Phi_E = E\\,(4\\pi r^2)'
      },
      {
        stepNumber: 4,
        title: 'Sustituimos E de Coulomb y verificamos el resultado',
        explanation: 'Al reemplazar E = q / (4πε₀r²), el factor 4πr² se cancela exactamente y el flujo resulta independiente del radio:',
        formulaLatex: '\\Phi_E = \\left(\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}\\right)(4\\pi r^2) = \\frac{q_{\\text{enc}}}{\\varepsilon_0}'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 2: POTENCIAL ELÉCTRICO Y ENERGÍA POTENCIAL
  // =========================================================================
  {
    id: 'u2-energia-potencial',
    unitNumber: 2,
    unitTitle: 'Unidad 2: Potencial Eléctrico',
    title: 'Energía Potencial Eléctrica de Dos Cargas',
    subtitle: 'Integración del trabajo conservativo desde rₐ hasta r_b (referencia en ∞)',
    targetFormulaLatex: 'U = k \\frac{q_1\\,q_2}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1\\,q_2}{r}',
    physicalMeaning: 'Es el trabajo necesario para traer una carga q₂ desde el infinito hasta una distancia r de q₁ contra (o a favor de) la fuerza eléctrica.',
    diagramCaption: 'Desplazamiento radial de q₀ desde rₐ hasta r_b en el campo de q₁.',
    svgKey: 'potential-energy',
    docxImage: 'assets/docx-media/image9.png',
    examTip: 'En U y en V siempre se colocan los signos (+ o -) de las cargas dentro de la fórmula.',
    steps: [
      {
        stepNumber: 1,
        title: 'Trabajo de una fuerza variable',
        explanation: 'Como la fuerza de Coulomb varía con 1/r², calculamos el trabajo de A a B mediante una integral de línea radial:',
        formulaLatex: 'W_{A\\to B} = \\int_{r_A}^{r_B} F(r)\\,dr = \\int_{r_A}^{r_B} \\frac{k\\,q_1\\,q_2}{r^2}\\,dr'
      },
      {
        stepNumber: 2,
        title: 'Resolvemos la integral de 1/r²',
        explanation: 'La primitiva de r⁻² es -r⁻¹ = -1/r. Evaluamos entre los límites rₐ y r_b:',
        formulaLatex: 'W_{A\\to B} = k\\,q_1\\,q_2 \\left[-\\frac{1}{r}\\right]_{r_A}^{r_B} = k\\,q_1\\,q_2 \\left(\\frac{1}{r_A} - \\frac{1}{r_B}\\right)'
      },
      {
        stepNumber: 3,
        title: 'Relación entre Trabajo y Energía Potencial',
        explanation: 'Por ser fuerza conservativa, el trabajo del campo es igual a menos la variación de energía potencial (W = -ΔU = Uₐ - U_b):',
        formulaLatex: 'U_A - U_B = \\frac{k\\,q_1\\,q_2}{r_A} - \\frac{k\\,q_1\\,q_2}{r_B}'
      },
      {
        stepNumber: 4,
        title: 'Tomamos referencia U(∞) = 0',
        explanation: 'Fijando que la energía potencial vale cero cuando las cargas están infinitamente separadas (r → ∞), obtenemos U en cualquier distancia r:',
        formulaLatex: 'U(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1\\,q_2}{r}'
      }
    ]
  },
  {
    id: 'u2-diferencia-potencial',
    unitNumber: 2,
    unitTitle: 'Unidad 2: Potencial Eléctrico',
    title: 'Diferencia de Potencial por Integral de Línea',
    subtitle: 'Relación integral entre Campo Eléctrico E y Potencial V',
    targetFormulaLatex: 'V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{l}',
    physicalMeaning: 'Cuando te movés a favor de las líneas de campo eléctrico, el potencial eléctrico siempre disminuye.',
    diagramCaption: 'Trayectoria cualquiera de A a B atravesando un campo eléctrico E.',
    svgKey: 'line-integral-v',
    docxImage: 'assets/docx-media/image13.png',
    examTip: 'Para campo uniforme paralelo al desplazamiento: ΔV = -E·d.',
    steps: [
      {
        stepNumber: 1,
        title: 'Definición de Potencial Eléctrico',
        explanation: 'El potencial V es la energía potencial por unidad de carga de prueba q₀:',
        formulaLatex: '\\Delta V = V_B - V_A = \\frac{U_B - U_A}{q_0} = \\frac{\\Delta U}{q_0}'
      },
      {
        stepNumber: 2,
        title: 'Trabajo eléctrico a lo largo de la trayectoria',
        explanation: 'El cambio de energía potencial es opuesto al trabajo hecho por la fuerza eléctrica F = q₀E:',
        formulaLatex: '\\Delta U = -W_{A\\to B} = -\\int_A^B \\vec{F}\\cdot d\\vec{l} = -q_0\\int_A^B \\vec{E}\\cdot d\\vec{l}'
      },
      {
        stepNumber: 3,
        title: 'Dividimos por q₀',
        explanation: 'Al dividir ambos miembros por q₀, la carga de prueba desaparece y queda la relación fundamental entre V y E:',
        formulaLatex: 'V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{l}'
      },
      {
        stepNumber: 4,
        title: 'Caso particular: Campo uniforme',
        explanation: 'Si E es constante y el desplazamiento d es paralelo a E, la integral se simplifica directamente:',
        formulaLatex: '\\Delta V = -E\\,d\\,\\cos\\theta \\xrightarrow{\\theta=0^\\circ} \\Delta V = -E\\,d'
      }
    ]
  },
  {
    id: 'u2-gradiente-equipotenciales',
    unitNumber: 2,
    unitTitle: 'Unidad 2: Potencial Eléctrico',
    title: 'Gradiente del Potencial y Equipotenciales',
    subtitle: 'Por qué el campo E es perpendicular a las superficies equipotenciales',
    targetFormulaLatex: '\\vec{E} = -\\nabla V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)',
    physicalMeaning: 'El campo eléctrico apunta en la dirección de máxima caída del potencial y es siempre normal a las superficies donde V es constante.',
    diagramCaption: 'Superficies equipotenciales concéntricas (V₁ > V₂) perpendiculares a las líneas de E.',
    svgKey: 'equipotentials',
    docxImage: 'assets/docx-media/image16.png',
    examTip: 'Mover una carga sobre una superficie equipotencial cuesta trabajo cero (W = -q·ΔV = 0).',
    steps: [
      {
        stepNumber: 1,
        title: 'Forma diferencial de la diferencia de potencial',
        explanation: 'Para un desplazamiento infinitesimal dl = (dx, dy, dz), el cambio dV vale:',
        formulaLatex: 'dV = -\\vec{E}\\cdot d\\vec{l} = -(E_x\\,dx + E_y\\,dy + E_z\\,dz)'
      },
      {
        stepNumber: 2,
        title: 'Diferencial total de V(x,y,z)',
        explanation: 'Por cálculo multivariable, el diferencial total de una función escalar V se escribe con derivadas parciales:',
        formulaLatex: 'dV = \\frac{\\partial V}{\\partial x}dx + \\frac{\\partial V}{\\partial y}dy + \\frac{\\partial V}{\\partial z}dz'
      },
      {
        stepNumber: 3,
        title: 'Igualamos componente a componente',
        explanation: 'Comparando ambas expresiones para dx, dy y dz arbitrarios obtenemos el vector gradiente negativo:',
        formulaLatex: 'E_x = -\\frac{\\partial V}{\\partial x},\\quad E_y = -\\frac{\\partial V}{\\partial y},\\quad E_z = -\\frac{\\partial V}{\\partial z} \\implies \\vec{E} = -\\nabla V'
      },
      {
        stepNumber: 4,
        title: 'Perpendicularidad con la equipotencial',
        explanation: 'Si el desplazamiento dl ocurre sobre una superficie equipotencial, V no cambia (dV = 0), por lo que el producto escalar es nulo y E ⟂ dl:',
        formulaLatex: 'dV = -\\vec{E}\\cdot d\\vec{l} = 0 \\implies E\\,dl\\,\\cos\\alpha = 0 \\implies \\alpha = 90^\\circ'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 3: CAPACITANCIA Y DIELÉCTRICOS
  // =========================================================================
  {
    id: 'u3-placas-paralelas',
    unitNumber: 3,
    unitTitle: 'Unidad 3: Capacitancia',
    title: 'Capacitancia de Placas Paralelas',
    subtitle: 'Deducción geométrica de C = ε₀·A / d usando Gauss y Potencial',
    targetFormulaLatex: 'C = \\frac{\\varepsilon_0\\,A}{d}',
    physicalMeaning: 'La capacitancia depende únicamente de la geometría (área A y separación d) y del medio aislante entre placas, nunca de la carga Q ni del voltaje V.',
    diagramCaption: 'Dos placas paralelas de área A separadas una distancia d con campo uniforme E.',
    svgKey: 'parallel-capacitor',
    examTip: 'Si duplicás la carga Q, también se duplica V, pero el cociente C = Q/V permanece constante.',
    steps: [
      {
        stepNumber: 1,
        title: 'Definición de Capacitancia',
        explanation: 'La capacitancia mide cuánta carga almacena un dispositivo por cada voltio de diferencia de potencial:',
        formulaLatex: 'C = \\frac{Q}{V_{ab}}'
      },
      {
        stepNumber: 2,
        title: 'Campo eléctrico entre las placas (por Gauss)',
        explanation: 'El campo entre dos láminas paralelas con densidad superficial σ = Q/A es uniforme:',
        formulaLatex: 'E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0\\,A}'
      },
      {
        stepNumber: 3,
        title: 'Diferencia de potencial entre placas',
        explanation: 'Como E es uniforme a lo largo de la distancia d entre placas:',
        formulaLatex: 'V_{ab} = E\\,d = \\frac{Q\\,d}{\\varepsilon_0\\,A}'
      },
      {
        stepNumber: 4,
        title: 'Sustituimos V_ab en C = Q / V_ab',
        explanation: 'La carga Q se cancela y queda la fórmula puramente geométrica:',
        formulaLatex: 'C = \\frac{Q}{\\frac{Q\\,d}{\\varepsilon_0\\,A}} = \\frac{\\varepsilon_0\\,A}{d}'
      }
    ]
  },
  {
    id: 'u3-esferico-cilindrico',
    unitNumber: 3,
    unitTitle: 'Unidad 3: Capacitancia',
    title: 'Capacitancia Esférica y Cilíndrica',
    subtitle: 'Integración radial del campo eléctrico en geometrías concéntricas',
    targetFormulaLatex: 'C_{\\text{esf}} = 4\\pi\\varepsilon_0\\frac{r_a\\,r_b}{r_b - r_a} \\qquad C_{\\text{cil}} = \\frac{2\\pi\\varepsilon_0\\,L}{\\ln(r_b/r_a)}',
    physicalMeaning: 'Permite modelar conductores coaxiales (cables de TV/internet) y esferas concéntricas integrando E(r) entre los radios rₐ y r_b.',
    diagramCaption: 'Conductores concéntricos de radios rₐ (interior) y r_b (exterior).',
    svgKey: 'spherical-capacitor',
    examTip: 'En el cilindro aparece ln(r_b/r_a) porque el campo decae como 1/r; en la esfera aparece (1/rₐ - 1/r_b) porque decae como 1/r².',
    steps: [
      {
        stepNumber: 1,
        title: 'Caso Esférico: Campo radial por Gauss',
        explanation: 'Entre dos cascarones esféricos concéntricos (rₐ < r < r_b), el campo de la esfera interior con carga Q es:',
        formulaLatex: 'E(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}'
      },
      {
        stepNumber: 2,
        title: 'Diferencia de potencial esférica y capacitancia',
        explanation: 'Integramos E(r) desde rₐ hasta r_b y despejamos C = Q / V_ab:',
        formulaLatex: 'V_{ab} = \\frac{Q}{4\\pi\\varepsilon_0}\\left(\\frac{1}{r_a}-\\frac{1}{r_b}\\right) \\implies C_{\\text{esf}} = 4\\pi\\varepsilon_0\\frac{r_a\\,r_b}{r_b - r_a}'
      },
      {
        stepNumber: 3,
        title: 'Caso Cilíndrico: Campo radial de un coaxial de longitud L',
        explanation: 'Aplicando Gauss sobre un cilindro coaxial de radio r y longitud L:',
        formulaLatex: 'E(r) = \\frac{\\lambda}{2\\pi\\varepsilon_0\\,r} = \\frac{Q}{2\\pi\\varepsilon_0\\,L\\,r}'
      },
      {
        stepNumber: 4,
        title: 'Integral logarítmica y capacitancia cilíndrica',
        explanation: 'Al integrar 1/r desde rₐ hasta r_b aparece el logaritmo natural:',
        formulaLatex: 'V_{ab} = \\frac{Q}{2\\pi\\varepsilon_0\\,L}\\ln\\left(\\frac{r_b}{r_a}\\right) \\implies C_{\\text{cil}} = \\frac{2\\pi\\varepsilon_0\\,L}{\\ln(r_b/r_a)}'
      }
    ]
  },
  {
    id: 'u3-dielectrico-energia',
    unitNumber: 3,
    unitTitle: 'Unidad 3: Capacitancia',
    title: 'Dieléctrico y Densidad de Energía Eléctrica',
    subtitle: 'Efecto de la constante dieléctrica κ y trabajo de carga del capacitor',
    targetFormulaLatex: 'C = \\kappa\\,C_0, \\qquad U = \\frac{1}{2}C\\,V^2, \\qquad u_E = \\frac{1}{2}\\varepsilon\\,E^2',
    physicalMeaning: 'Los dipolos del material dieléctrico crean un campo interno opuesto que reduce V y aumenta la capacitancia en un factor κ.',
    diagramCaption: 'Dipolos alineados en el dieléctrico reduciendo el campo neto E = E₀/κ.',
    svgKey: 'dielectric-capacitor',
    examTip: 'Si desconectás la batería, Q queda constante y V cae a V₀/κ. Si dejás la batería conectada, V queda constante y Q sube a κ·Q₀.',
    steps: [
      {
        stepNumber: 1,
        title: 'Reducción del campo y del voltaje con dieléctrico',
        explanation: 'Con carga libre Q fija, la polarización del dieléctrico reduce el campo eléctrico y el potencial en un factor κ > 1:',
        formulaLatex: 'E = \\frac{E_0}{\\kappa} \\implies V = \\frac{V_0}{\\kappa}'
      },
      {
        stepNumber: 2,
        title: 'Multiplicación de la capacitancia',
        explanation: 'Sustituyendo V = V₀/κ en C = Q/V se multiplica la capacitancia por κ (y definimos ε = κ·ε₀):',
        formulaLatex: 'C = \\frac{Q}{V_0/\\kappa} = \\kappa\\,C_0 = \\frac{\\varepsilon\\,A}{d}'
      },
      {
        stepNumber: 3,
        title: 'Trabajo infinitesimal para cargar el capacitor',
        explanation: 'A medida que subimos la carga de 0 a Q, el voltaje v = q/C crece linealmente. Integramos dW = v·dq:',
        formulaLatex: 'U = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{Q^2}{2C} = \\frac{1}{2}C\\,V^2 = \\frac{1}{2}Q\\,V'
      },
      {
        stepNumber: 4,
        title: 'Densidad de energía u_E en el volumen A·d',
        explanation: 'Dividiendo U = ½·(εA/d)·(Ed)² por el volumen A·d entre placas:',
        formulaLatex: 'u_E = \\frac{U}{A\\,d} = \\frac{1}{2}\\varepsilon\\,E^2'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 4: CORRIENTE ELÉCTRICA Y RESISTENCIA
  // =========================================================================
  {
    id: 'u4-corriente-arrastre',
    unitNumber: 4,
    unitTitle: 'Unidad 4: Corriente y Resistencia',
    title: 'Corriente Eléctrica y Velocidad de Arrastre',
    subtitle: 'Conexión microscópica entre portadores n, velocidad v_d y corriente I',
    targetFormulaLatex: 'I = n\\,|q|\\,v_d\\,A, \\qquad \\vec{J} = n\\,q\\,\\vec{v}_d',
    physicalMeaning: 'Explica la corriente macroscópica a partir de la concentración n de electrones libres que se desplazan lentamente a velocidad de arrastre v_d.',
    diagramCaption: 'Cilindro conductor de sección A y longitud Δx = v_d·Δt con portadores móviles.',
    svgKey: 'drift-current',
    examTip: 'Aunque la señal eléctrica viaja casi a la velocidad de la luz, v_d de los electrones es apenas ~0.1 mm/s.',
    steps: [
      {
        stepNumber: 1,
        title: 'Volumen barrido en un tiempo dt',
        explanation: 'En un intervalo dt, todos los portadores a distancia dx = v_d·dt de la sección transversal A logran cruzarla:',
        formulaLatex: 'dV = A\\,dx = A\\,v_d\\,dt'
      },
      {
        stepNumber: 2,
        title: 'Cantidad de carga dQ en ese volumen',
        explanation: 'Si hay n portadores por unidad de volumen, cada uno con carga |q|, la carga total que cruza es:',
        formulaLatex: 'dQ = n\\,|q|\\,dV = n\\,|q|\\,A\\,v_d\\,dt'
      },
      {
        stepNumber: 3,
        title: 'Definición de corriente eléctrica I = dQ/dt',
        explanation: 'Dividiendo dQ por el tiempo dt obtenemos la intensidad de corriente:',
        formulaLatex: 'I = \\frac{dQ}{dt} = n\\,|q|\\,v_d\\,A'
      },
      {
        stepNumber: 4,
        title: 'Densidad de corriente J = I/A',
        explanation: 'Dividiendo por el área transversal A obtenemos el vector densidad de corriente:',
        formulaLatex: 'J = \\frac{I}{A} = n\\,|q|\\,v_d \\implies \\vec{J} = n\\,q\\,\\vec{v}_d'
      }
    ]
  },
  {
    id: 'u4-ley-ohm',
    unitNumber: 4,
    unitTitle: 'Unidad 4: Corriente y Resistencia',
    title: 'Ley de Ohm y Resistencia de un Conductor',
    subtitle: 'Paso de la Ley de Ohm microscópica E = ρ·J a V = I·R',
    targetFormulaLatex: 'V = I\\,R \\qquad \\text{con} \\qquad R = \\rho\\frac{L}{A}',
    physicalMeaning: 'Relaciona la caída de voltaje con la corriente a través de la resistencia geométrica del alambre (largo L, sección A) y la resistividad ρ del material.',
    diagramCaption: 'Conductor cilíndrico de longitud L, sección A, campo interno E y caída de potencial V.',
    svgKey: 'ohm-microscopic',
    examTip: 'La resistividad ρ depende solo del material y la temperatura; la resistencia R depende además de L y A.',
    steps: [
      {
        stepNumber: 1,
        title: 'Ley de Ohm microscópica',
        explanation: 'En un material óhmico, el campo eléctrico interno E es proporcional a la densidad de corriente J mediante la resistividad ρ:',
        formulaLatex: '\\vec{E} = \\rho\\,\\vec{J}'
      },
      {
        stepNumber: 2,
        title: 'Relacionamos E con V y J con I',
        explanation: 'En un alambre uniforme de longitud L y sección A, E = V/L y J = I/A:',
        formulaLatex: '\\frac{V}{L} = \\rho\\,\\frac{I}{A}'
      },
      {
        stepNumber: 3,
        title: 'Despejamos la diferencia de potencial V',
        explanation: 'Multiplicando ambos lados por L:',
        formulaLatex: 'V = I\\left(\\rho\\frac{L}{A}\\right)'
      },
      {
        stepNumber: 4,
        title: 'Definimos la Resistencia R',
        explanation: 'Agrupamos los factores propios del conductor en la resistencia eléctrica R (medida en Ohms, Ω):',
        formulaLatex: 'R = \\rho\\frac{L}{A} \\implies V = I\\,R'
      }
    ]
  },
  {
    id: 'u4-potencia-joule',
    unitNumber: 4,
    unitTitle: 'Unidad 4: Corriente y Resistencia',
    title: 'Potencia Eléctrica y Efecto Joule',
    subtitle: 'Tasa de transferencia de energía eléctrica a calor en un resistor',
    targetFormulaLatex: 'P = V\\,I = I^2 R = \\frac{V^2}{R}',
    physicalMeaning: 'Cuantifica cuántos Joules por segundo (Watts) se disipan en forma de calor debido a los choques de los electrones con la red cristalina.',
    diagramCaption: 'Elemento de circuito con corriente I entrando por el terminal de mayor potencial.',
    svgKey: 'joule-power',
    examTip: 'Usá P = I²R para comparar resistores en serie (misma I) y P = V²/R para resistores en paralelo (misma V).',
    steps: [
      {
        stepNumber: 1,
        title: 'Energía potencial entregada a una carga dq',
        explanation: 'Al pasar una carga dq por una caída de potencial V_ab = V, la energía eléctrica cedida es:',
        formulaLatex: 'dU = V\\,dq'
      },
      {
        stepNumber: 2,
        title: 'Potencia instantánea P = dU/dt',
        explanation: 'Dividiendo por el intervalo de tiempo dt y usando I = dq/dt:',
        formulaLatex: 'P = \\frac{dU}{dt} = V\\frac{dq}{dt} = V\\,I'
      },
      {
        stepNumber: 3,
        title: 'Sustitución con Ley de Ohm (V = I·R)',
        explanation: 'Para un resistor óhmico obtenemos las dos formas equivalentes de la Ley de Joule:',
        formulaLatex: 'P = (I\\,R)\\,I = I^2 R, \\qquad P = V\\left(\\frac{V}{R}\\right) = \\frac{V^2}{R}'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 5: CIRCUITOS ELÉCTRICOS CC Y RC
  // =========================================================================
  {
    id: 'u5-kirchhoff-serie-paralelo',
    unitNumber: 5,
    unitTitle: 'Unidad 5: Circuitos Eléctricos',
    title: 'Resistores en Serie y Paralelo (Kirchhoff)',
    subtitle: 'Deducción de R_eq por conservación de carga (nodos) y energía (mallas)',
    targetFormulaLatex: 'R_{\\text{serie}} = \\sum R_i, \\qquad \\frac{1}{R_{\\text{paralelo}}} = \\sum \\frac{1}{R_i}',
    physicalMeaning: 'En serie comparten la misma corriente y suman voltajes; en paralelo comparten el mismo voltaje y suman corrientes.',
    diagramCaption: 'Comparación de malla serie (corriente única) y nodo paralelo (corriente dividida).',
    svgKey: 'kirchhoff-resistors',
    examTip: 'En paralelo la resistencia equivalente siempre es menor que la menor de las resistencias individuales.',
    steps: [
      {
        stepNumber: 1,
        title: 'Asociación en Serie: Regla de Mallas',
        explanation: 'Por conservación de la carga, la misma corriente I pasa por todos los resistores. El voltaje total es la suma de caídas:',
        formulaLatex: 'V = V_1 + V_2 + \\dots = I\\,R_1 + I\\,R_2 + \\dots = I\\,R_{\\text{eq}}'
      },
      {
        stepNumber: 2,
        title: 'Cancelamos I en Serie',
        explanation: 'Dividiendo todo por I obtenemos la resistencia equivalente en serie:',
        formulaLatex: 'R_{\\text{serie}} = R_1 + R_2 + \\dots + R_n'
      },
      {
        stepNumber: 3,
        title: 'Asociación en Paralelo: Regla de Nodos',
        explanation: 'En paralelo todos los resistores tienen el mismo voltaje V, mientras que la corriente total se divide en el nodo:',
        formulaLatex: 'I = I_1 + I_2 + \\dots = \\frac{V}{R_1} + \\frac{V}{R_2} + \\dots = \\frac{V}{R_{\\text{eq}}}'
      },
      {
        stepNumber: 4,
        title: 'Cancelamos V en Paralelo',
        explanation: 'Dividiendo por el voltaje común V llegamos a la suma de inversos:',
        formulaLatex: '\\frac{1}{R_{\\text{paralelo}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots + \\frac{1}{R_n}'
      }
    ]
  },
  {
    id: 'u5-carga-rc',
    unitNumber: 5,
    unitTitle: 'Unidad 5: Circuitos Eléctricos',
    title: 'Carga de un Capacitor en Circuito RC',
    subtitle: 'Resolución de la ecuación diferencial de malla para q(t) e i(t)',
    targetFormulaLatex: 'q(t) = C\\,\\varepsilon\\left(1 - e^{-t/RC}\\right), \\qquad i(t) = \\frac{\\varepsilon}{R}e^{-t/RC}',
    physicalMeaning: 'Al cerrar el interruptor en t=0, el capacitor está descargado (actúa como cable) y luego se carga exponencialmente con constante de tiempo τ = RC.',
    diagramCaption: 'Circuito serie ε-R-C y curva exponencial asintótica hacia Q_f = C·ε.',
    svgKey: 'rc-charge',
    examTip: 'En t = τ = RC el capacitor alcanza el 63.2% de su carga máxima (1 - e⁻¹ ≈ 0.632).',
    steps: [
      {
        stepNumber: 1,
        title: 'Ecuación de Malla de Kirchhoff',
        explanation: 'Recorriendo la malla en el sentido de la corriente i = dq/dt:',
        formulaLatex: '\\varepsilon - i\\,R - \\frac{q}{C} = 0 \\implies R\\frac{dq}{dt} + \\frac{q}{C} = \\varepsilon'
      },
      {
        stepNumber: 2,
        title: 'Separamos variables q y t',
        explanation: 'Reordenamos dq/(q - Cε) = -dt/(RC) e integramos desde q(0) = 0 hasta q(t):',
        formulaLatex: '\\int_0^{q(t)} \\frac{dq}{q - C\\varepsilon} = -\\frac{1}{RC}\\int_0^t dt'
      },
      {
        stepNumber: 3,
        title: 'Evaluamos el logaritmo y aplicamos exponencial',
        explanation: 'Integrando y aplicando e^(...) en ambos miembros:',
        formulaLatex: '\\ln\\left(\\frac{q - C\\varepsilon}{-C\\varepsilon}\\right) = -\\frac{t}{RC} \\implies 1 - \\frac{q}{C\\varepsilon} = e^{-t/RC}'
      },
      {
        stepNumber: 4,
        title: 'Despejamos q(t) y derivamos para i(t)',
        explanation: 'Obtenemos la carga y derivando respecto al tiempo la corriente instantánea:',
        formulaLatex: 'q(t) = C\\varepsilon\\left(1 - e^{-t/RC}\\right), \\qquad i(t) = \\frac{dq}{dt} = \\frac{\\varepsilon}{R}e^{-t/RC}'
      }
    ]
  },
  {
    id: 'u5-descarga-rc',
    unitNumber: 5,
    unitTitle: 'Unidad 5: Circuitos Eléctricos',
    title: 'Descarga de un Capacitor en Circuito RC',
    subtitle: 'Decaimiento exponencial de la carga y la corriente sin fuente',
    targetFormulaLatex: 'q(t) = Q_0\\,e^{-t/RC}, \\qquad i(t) = -\\frac{Q_0}{RC}e^{-t/RC}',
    physicalMeaning: 'El capacitor entrega toda su energía almacenada al resistor en forma de calor hasta quedar descargado.',
    diagramCaption: 'Circuito R-C sin batería y curva de decaimiento exponencial desde Q₀.',
    svgKey: 'rc-discharge',
    examTip: 'En t = τ = RC la carga cae al 36.8% de su valor inicial (e⁻¹ ≈ 0.368).',
    steps: [
      {
        stepNumber: 1,
        title: 'Ecuación de Malla sin fem (ε = 0)',
        explanation: 'Con el capacitor inicialmente cargado con Q₀, la suma de voltajes en la malla cerrada R-C es cero:',
        formulaLatex: 'R\\frac{dq}{dt} + \\frac{q}{C} = 0'
      },
      {
        stepNumber: 2,
        title: 'Separación de variables e integración',
        explanation: 'Pasamos q dividiendo e integramos desde Q₀ en t = 0 hasta q(t) en t:',
        formulaLatex: '\\int_{Q_0}^{q(t)} \\frac{dq}{q} = -\\frac{1}{RC}\\int_0^t dt \\implies \\ln\\left(\\frac{q}{Q_0}\\right) = -\\frac{t}{RC}'
      },
      {
        stepNumber: 3,
        title: 'Solución exponencial',
        explanation: 'Aplicando la función exponencial obtenemos la ley de descarga y la corriente:',
        formulaLatex: 'q(t) = Q_0\\,e^{-t/RC}, \\qquad i(t) = \\frac{dq}{dt} = -\\frac{Q_0}{RC}e^{-t/RC}'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 6: CAMPO MAGNÉTICO Y FUERZA DE LORENTZ
  // =========================================================================
  {
    id: 'u6-radio-ciclotron',
    unitNumber: 6,
    unitTitle: 'Unidad 6: Campo Magnético',
    title: 'Radio de Giro en Campo Magnético',
    subtitle: 'Dinámica circular uniforme bajo la fuerza magnética perpendicular',
    targetFormulaLatex: 'r = \\frac{m\\,v}{|q|\\,B}, \\qquad \\omega = \\frac{|q|\\,B}{m}',
    physicalMeaning: 'Como la fuerza magnética es siempre perpendicular a la velocidad, no cambia la rapidez (W = 0) y actúa como fuerza centrípeta pura.',
    diagramCaption: 'Partícula cargada describiendo una órbita circular de radio r perpendicular a B.',
    svgKey: 'cyclotron-radius',
    examTip: 'La frecuencia angular ω = |q|B/m (frecuencia de ciclotrón) no depende de la velocidad ni del radio.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fuerza magnética perpendicular a v y B',
        explanation: 'Cuando v es perpendicular a B (θ = 90°), la fuerza de Lorentz magnética tiene magnitud constante:',
        formulaLatex: 'F_B = |q|\\,v\\,B\\,\\sin(90^\\circ) = |q|\\,v\\,B'
      },
      {
        stepNumber: 2,
        title: 'Segunda Ley de Newton para movimiento circular',
        explanation: 'Igualamos la fuerza magnética con la fuerza centrípeta m·a_c = m·v²/r:',
        formulaLatex: '|q|\\,v\\,B = \\frac{m\\,v^2}{r}'
      },
      {
        stepNumber: 3,
        title: 'Despejamos el radio r y la frecuencia angular ω',
        explanation: 'Simplificando una v de ambos lados:',
        formulaLatex: 'r = \\frac{m\\,v}{|q|\\,B}, \\qquad \\omega = \\frac{v}{r} = \\frac{|q|\\,B}{m}'
      }
    ]
  },
  {
    id: 'u6-selector-velocidades',
    unitNumber: 6,
    unitTitle: 'Unidad 6: Campo Magnético',
    title: 'Selector de Velocidades (Campos Cruzados)',
    subtitle: 'Equilibrio entre Fuerza Eléctrica y Fuerza Magnética',
    targetFormulaLatex: 'v = \\frac{E}{B}',
    physicalMeaning: 'Solo las partículas que ingresan con rapidez exacta E/B pasan sin desviarse, independientemente de su masa o carga.',
    diagramCaption: 'Campos E y B perpendiculares entre sí produciendo fuerzas opuestas sobre q.',
    svgKey: 'velocity-selector',
    docxImage: 'assets/docx-media/image17.png',
    examTip: '¡Cuidado! La carga q se cancela: funciona igual para cargas positivas o negativas (ambas fuerzas se invierten a la vez).',
    steps: [
      {
        stepNumber: 1,
        title: 'Fuerza total de Lorentz',
        explanation: 'Una partícula q que entra con velocidad v perpendicular a E y B experimenta la suma vectorial de ambas fuerzas:',
        formulaLatex: '\\vec{F} = q\\left(\\vec{E} + \\vec{v} \\times \\vec{B}\\right)'
      },
      {
        stepNumber: 2,
        title: 'Condición de trayectoria rectilínea (F_neta = 0)',
        explanation: 'Para que no se desvíe, la fuerza eléctrica hacia abajo (qE) debe equilibrarse exactamente con la fuerza magnética hacia arriba (qvB):',
        formulaLatex: 'q\\,E = q\\,v\\,B'
      },
      {
        stepNumber: 3,
        title: 'Cancelamos q y despejamos v',
        explanation: 'La carga se simplifica y queda la relación pura entre campos:',
        formulaLatex: 'v = \\frac{E}{B}'
      }
    ]
  },
  {
    id: 'u6-fuerza-torque-espira',
    unitNumber: 6,
    unitTitle: 'Unidad 6: Campo Magnético',
    title: 'Fuerza en Conductor y Torque en Espira',
    subtitle: 'De la fuerza microscópica sobre portadores al momento dipolar magnético μ',
    targetFormulaLatex: '\\vec{F} = I\\,\\vec{L} \\times \\vec{B}, \\qquad \\vec{\\tau} = \\vec{\\mu} \\times \\vec{B} \\quad (\\mu = N\\,I\\,A)',
    physicalMeaning: 'Es el principio de funcionamiento de todos los motores eléctricos: un campo B ejerce un torque sobre una espira con corriente.',
    diagramCaption: 'Espira rectangular de área A = a·b con corriente I inmersa en campo B.',
    svgKey: 'wire-torque',
    examTip: 'θ es el ángulo entre el vector normal μ (regla mano derecha) y el campo B, NO entre el plano de la espira y B.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fuerza sobre un alambre recto de longitud L',
        explanation: 'Sumando la fuerza q(v_d × B) sobre los N = n·A·L portadores del alambre, y usando I = n|q|v_d A:',
        formulaLatex: '\\vec{F} = (n\\,A\\,L)\\,q(\\vec{v}_d \\times \\vec{B}) = I\\,\\vec{L} \\times \\vec{B}'
      },
      {
        stepNumber: 2,
        title: 'Fuerzas en los lados verticales de la espira',
        explanation: 'En una espira rectangular (lados a y b), los lados de longitud a sienten fuerzas opuestas F = I·a·B que forman una cupla.',
        formulaLatex: 'F = I\\,a\\,B'
      },
      {
        stepNumber: 3,
        title: 'Brazo de palanca respecto al eje central',
        explanation: 'Si la normal a la espira forma un ángulo θ con B, cada fuerza actúa a brazo (b/2)·sin(θ):',
        formulaLatex: '\\tau = 2\\cdot (I\\,a\\,B)\\left(\\frac{b}{2}\\sin\\theta\\right) = I\\,(a\\,b)\\,B\\sin\\theta'
      },
      {
        stepNumber: 4,
        title: 'Definimos el momento magnético μ = N·I·A',
        explanation: 'Con el área A = a·b y para N vueltas arrolladas, queda:',
        formulaLatex: '\\tau = N\\,I\\,A\\,B\\,\\sin\\theta = \\mu\\,B\\,\\sin\\theta \\implies \\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 7: FUENTES DE CAMPO MAGNÉTICO (BIOT-SAVART Y AMPÈRE)
  // =========================================================================
  {
    id: 'u7-biot-savart-alambre',
    unitNumber: 7,
    unitTitle: 'Unidad 7: Fuentes de Campo Magnético',
    title: 'Campo de un Alambre Recto Largo (Biot-Savart)',
    subtitle: 'Integración a lo largo de un conductor rectilíneo infinito',
    targetFormulaLatex: 'B = \\frac{\\mu_0\\,I}{2\\pi\\,r}',
    physicalMeaning: 'Las líneas de campo magnético forman circunferencias concéntricas alrededor del cable (regla de la mano derecha) y decaen como 1/r.',
    diagramCaption: 'Elemento diferencial dl a distancia R del punto P a distancia perpendicular r del alambre.',
    svgKey: 'biot-savart-wire',
    docxImage: 'assets/docx-media/image19.jpeg',
    examTip: 'Para un cable finito entre ángulos θ₁ y θ₂, la integral da B = (μ₀I / 4πr)·(sinθ₂ - sinθ₁).',
    steps: [
      {
        stepNumber: 1,
        title: 'Ley de Biot-Savart diferencial',
        explanation: 'Cada elemento de corriente I·dl produce en P un campo dB perpendicular al plano de dl y r̂:',
        formulaLatex: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec{l}\\times\\hat{r}}{R^2} \\implies dB = \\frac{\\mu_0\\,I}{4\\pi}\\frac{dy\\,\\sin\\phi}{R^2}'
      },
      {
        stepNumber: 2,
        title: 'Cambio de variables trigonométrico',
        explanation: 'Con distancia perpendicular r al cable: R = √(y² + r²) y sin(φ) = r / √(y² + r²):',
        formulaLatex: 'dB = \\frac{\\mu_0\\,I}{4\\pi}\\frac{r\\,dy}{(y^2 + r^2)^{3/2}}'
      },
      {
        stepNumber: 3,
        title: 'Integramos desde y = -∞ hasta +∞',
        explanation: 'Usando la integral estándar ∫ dy/(y²+r²)^(3/2) = y / (r²√(y²+r²)):',
        formulaLatex: 'B = \\frac{\\mu_0\\,I\\,r}{4\\pi}\\left[\\frac{y}{r^2\\sqrt{y^2+r^2}}\\right]_{-\\infty}^{+\\infty} = \\frac{\\mu_0\\,I\\,r}{4\\pi}\\left(\\frac{2}{r^2}\\right)'
      },
      {
        stepNumber: 4,
        title: 'Simplificamos',
        explanation: 'Obtenemos la expresión clásica del campo de un conductor recto muy largo:',
        formulaLatex: 'B = \\frac{\\mu_0\\,I}{2\\pi\\,r}'
      }
    ]
  },
  {
    id: 'u7-biot-savart-espira',
    unitNumber: 7,
    unitTitle: 'Unidad 7: Fuentes de Campo Magnético',
    title: 'Campo en el Eje de una Espira Circular',
    subtitle: 'Simetría axial y cancelación de componentes perpendiculares',
    targetFormulaLatex: 'B_x = \\frac{\\mu_0\\,I\\,R^2}{2\\,(x^2 + R^2)^{3/2}}',
    physicalMeaning: 'En el centro de la espira (x = 0) se reduce a B = μ₀I/(2R); muy lejos (x ≫ R) se comporta como un dipolo magnético.',
    diagramCaption: 'Espira circular de radio R en el plano yz y punto P sobre el eje x.',
    svgKey: 'biot-savart-loop',
    docxImage: 'assets/docx-media/image18.jpeg',
    examTip: 'Si hay N espiras apretadas formando una bobina plana, simplemente multiplicás por N.',
    steps: [
      {
        stepNumber: 1,
        title: 'Elemento dl perpendicular a r⃗',
        explanation: 'Todo elemento dl sobre el aro es perpendicular al vector posición r⃗ (de módulo √(x²+R²)), por lo que sin(90°) = 1:',
        formulaLatex: 'dB = \\frac{\\mu_0\\,I}{4\\pi}\\frac{dl}{x^2 + R^2}'
      },
      {
        stepNumber: 2,
        title: 'Descomposición por simetría axial',
        explanation: 'Las componentes perpendiculares al eje x se anulan por pares opuestos del aro. Solo sobrevive dB_x = dB·cos(α) con cos(α) = R / √(x²+R²):',
        formulaLatex: 'dB_x = \\frac{\\mu_0\\,I}{4\\pi}\\frac{R\\,dl}{(x^2 + R^2)^{3/2}}'
      },
      {
        stepNumber: 3,
        title: 'Integramos dl a lo largo de la circunferencia 2πR',
        explanation: 'Como x y R son constantes durante la vuelta alrededor de la espira:',
        formulaLatex: 'B_x = \\frac{\\mu_0\\,I\\,R}{4\\pi(x^2+R^2)^{3/2}}\\oint dl = \\frac{\\mu_0\\,I\\,R\\,(2\\pi R)}{4\\pi(x^2+R^2)^{3/2}}'
      },
      {
        stepNumber: 4,
        title: 'Resultado final',
        explanation: 'Simplificando 2π / 4π = 1/2:',
        formulaLatex: 'B_x = \\frac{\\mu_0\\,I\\,R^2}{2\\,(x^2 + R^2)^{3/2}} \\xrightarrow{x=0} B_{\\text{centro}} = \\frac{\\mu_0\\,I}{2R}'
      }
    ]
  },
  {
    id: 'u7-ampere-solenoide',
    unitNumber: 7,
    unitTitle: 'Unidad 7: Fuentes de Campo Magnético',
    title: 'Campo en un Solenoide Ideal (Ley de Ampère)',
    subtitle: 'Circulación magnética en una trayectoria rectangular amperiana',
    targetFormulaLatex: 'B = \\mu_0\\,n\\,I \\qquad \\left(n = \\frac{N}{L}\\right)',
    physicalMeaning: 'En el interior de un solenoide largo el campo magnético es uniforme y paralelo al eje, mientras que en el exterior es prácticamente nulo.',
    diagramCaption: 'Lazo amperiano rectangular abcd atravesando N = n·ℓ espiras del solenoide.',
    svgKey: 'ampere-solenoid',
    docxImage: 'assets/docx-media/image20.jpeg',
    examTip: 'El campo B interior no depende del radio del solenoide ni de la posición radial dentro del núcleo.',
    steps: [
      {
        stepNumber: 1,
        title: 'Elegimos un lazo amperiano rectangular abcd',
        explanation: 'El tramo ab (longitud ℓ) está adentro paralelo a B; los tramos bc y da son perpendiculares a B; el tramo cd está afuera donde B ≈ 0.',
        formulaLatex: '\\oint \\vec{B}\\cdot d\\vec{l} = \\int_a^b B\\,dl + 0 + 0 + 0 = B\\,\\ell'
      },
      {
        stepNumber: 2,
        title: 'Calculamos la corriente encerrada I_enc',
        explanation: 'Si el solenoide tiene n = N/L vueltas por metro, en el ancho ℓ quedan encerradas n·ℓ espiras, cada una con corriente I:',
        formulaLatex: 'I_{\\text{enc}} = (n\\,\\ell)\\,I'
      },
      {
        stepNumber: 3,
        title: 'Aplicamos la Ley de Ampère',
        explanation: 'Igualamos la circulación con μ₀·I_enc y cancelamos la longitud arbitraria ℓ:',
        formulaLatex: 'B\\,\\ell = \\mu_0\\,n\\,\\ell\\,I \\implies B = \\mu_0\\,n\\,I'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 8: INDUCCIÓN ELECTROMAGNÉTICA (FARADAY - LENZ)
  // =========================================================================
  {
    id: 'u8-faraday-integral',
    unitNumber: 8,
    unitTitle: 'Unidad 8: Ley de Faraday',
    title: 'Forma Integral de la Ley de Faraday',
    subtitle: 'Un flujo magnético variable induce un campo eléctrico no conservativo',
    targetFormulaLatex: '\\varepsilon = \\oint \\vec{E}\\cdot d\\vec{l} = -N\\frac{d\\Phi_B}{dt}',
    physicalMeaning: 'A diferencia del campo electrostático, el campo eléctrico inducido forma líneas cerradas con circulación distinta de cero.',
    diagramCaption: 'Lazo conductor estacionario atravesado por un flujo magnético B(t) creciente.',
    svgKey: 'faraday-integral',
    examTip: 'El signo menos (Ley de Lenz) indica que el sentido de la fem inducida se opone al cambio del flujo magnético que la origina.',
    steps: [
      {
        stepNumber: 1,
        title: 'Definición de Fuerza Electromotriz (fem)',
        explanation: 'La fem ε es el trabajo por unidad de carga que realiza la fuerza eléctrica F = qE alrededor de una vuelta cerrada:',
        formulaLatex: '\\varepsilon = \\frac{W}{q} = \\oint \\frac{\\vec{F}}{q}\\cdot d\\vec{l} = \\oint \\vec{E}\\cdot d\\vec{l}'
      },
      {
        stepNumber: 2,
        title: 'Ley experimental de Faraday-Lenz',
        explanation: 'Para N espiras atravesadas por el flujo magnético Φ_B = ∫ B·dA, la fem inducida es proporcional a su rapidez de cambio:',
        formulaLatex: '\\varepsilon = -N\\frac{d\\Phi_B}{dt}'
      },
      {
        stepNumber: 3,
        title: 'Igualamos ambas expresiones (3ª Ecuación de Maxwell)',
        explanation: 'Obtenemos la forma integral general que vincula la circulación de E con la variación temporal del flujo B:',
        formulaLatex: '\\oint \\vec{E}\\cdot d\\vec{l} = -\\frac{d}{dt}\\int \\vec{B}\\cdot d\\vec{A}'
      }
    ]
  },
  {
    id: 'u8-fem-movimiento',
    unitNumber: 8,
    unitTitle: 'Unidad 8: Ley de Faraday',
    title: 'FEM de Movimiento y Conservación de Energía',
    subtitle: 'Barra conductora deslizándose con rapidez v sobre rieles en campo B',
    targetFormulaLatex: '|\\varepsilon| = B\\,L\\,v, \\qquad P_{\\text{mec}} = P_{\\text{eléctrica}} = \\frac{B^2 L^2 v^2}{R}',
    physicalMeaning: 'Demuestra que la energía eléctrica disipada en la resistencia proviene exactamente del trabajo mecánico de la fuerza externa que mueve la barra.',
    diagramCaption: 'Barra de longitud L moviéndose a velocidad v sobre rieles en U con resistor R.',
    svgKey: 'motional-emf',
    examTip: 'Podés deducir |ε| = BLv tanto por fuerza magnética qvB = qE como por Faraday d(BLx)/dt = BLv.',
    steps: [
      {
        stepNumber: 1,
        title: 'Variación de flujo en el área rectangular',
        explanation: 'Si la barra avanza una distancia x(t), el área encerrada es A = L·x y el flujo magnético vale Φ_B = B·L·x:',
        formulaLatex: '|\\varepsilon| = \\left|\\frac{d\\Phi_B}{dt}\\right| = \\frac{d}{dt}(B\\,L\\,x) = B\\,L\\frac{dx}{dt} = B\\,L\\,v'
      },
      {
        stepNumber: 2,
        title: 'Corriente inducida en el circuito con resistencia R',
        explanation: 'Por la Ley de Ohm en la malla:',
        formulaLatex: 'I = \\frac{|\\varepsilon|}{R} = \\frac{B\\,L\\,v}{R}'
      },
      {
        stepNumber: 3,
        title: 'Fuerza magnética de frenado y fuerza aplicada',
        explanation: 'La corriente I en la barra sufre una fuerza magnética opuesta al movimiento F_B = I·L·B. Para mantener v constante debemos empujar con F_ext = F_B:',
        formulaLatex: 'F_{\\text{ext}} = I\\,L\\,B = \\frac{B^2 L^2 v}{R}'
      },
      {
        stepNumber: 4,
        title: 'Comprobación energética: P_mec = P_eléctrica',
        explanation: 'La potencia mecánica entregada coincide exactamente con la potencia Joule disipada I²R:',
        formulaLatex: 'P_{\\text{mec}} = F_{\\text{ext}}\\,v = \\frac{B^2 L^2 v^2}{R} = I^2 R = P_{\\text{eléctrica}}'
      }
    ]
  },

  // =========================================================================
  // UNIDAD 9: INDUCTANCIA, ENERGÍA MAGNÉTICA Y MAXWELL
  // =========================================================================
  {
    id: 'u9-autoinductancia-solenoide',
    unitNumber: 9,
    unitTitle: 'Unidad 9: Inductancia y Maxwell',
    title: 'Autoinductancia de un Solenoide Ideal',
    subtitle: 'Deducción geométrica de L = μ₀·n²·A·l a partir del flujo propio',
    targetFormulaLatex: 'L = \\mu_0\\,n^2\\,A\\,l = \\frac{\\mu_0\\,N^2\\,A}{l}',
    physicalMeaning: 'Al igual que la capacitancia C, la inductancia L depende exclusivamente de la geometría de la bobina y de la permeabilidad del núcleo.',
    diagramCaption: 'Solenoide de N vueltas, longitud l y sección A con flujo propio Φ_B.',
    svgKey: 'solenoid-inductance',
    docxImage: 'assets/docx-media/image21.png',
    examTip: 'Si introducís un núcleo ferromagnético de permeabilidad relativa μ_r = K_m, L se multiplica por K_m.',
    steps: [
      {
        stepNumber: 1,
        title: 'Definición de Autoinductancia L',
        explanation: 'La inductancia L vincula el flujo magnético total concatenado (N·Φ_B) con la corriente I que lo produce:',
        formulaLatex: 'L = \\frac{N\\,\\Phi_B}{I}'
      },
      {
        stepNumber: 2,
        title: 'Campo B interior del solenoide',
        explanation: 'Por la Ley de Ampère, con n = N/l espiras por unidad de longitud:',
        formulaLatex: 'B = \\mu_0\\,n\\,I'
      },
      {
        stepNumber: 3,
        title: 'Flujo magnético en una espira de área A',
        explanation: 'Multiplicamos el campo uniforme B por la sección transversal A:',
        formulaLatex: '\\Phi_B = B\\,A = \\mu_0\\,n\\,I\\,A'
      },
      {
        stepNumber: 4,
        title: 'Sustituimos N = n·l y Φ_B en L',
        explanation: 'La corriente I se cancela y queda la fórmula geométrica de L:',
        formulaLatex: 'L = \\frac{(n\\,l)(\\mu_0\\,n\\,I\\,A)}{I} = \\mu_0\\,n^2\\,A\\,l'
      }
    ]
  },
  {
    id: 'u9-energia-magnetica',
    unitNumber: 9,
    unitTitle: 'Unidad 9: Inductancia y Maxwell',
    title: 'Energía y Densidad de Energía Magnética',
    subtitle: 'Trabajo contra la fem autoinducida para establecer una corriente I',
    targetFormulaLatex: 'U_B = \\frac{1}{2}L\\,I^2, \\qquad u_B = \\frac{B^2}{2\\mu_0}',
    physicalMeaning: 'Un inductor almacena energía en su campo magnético de manera análoga a como un capacitor almacena energía en su campo eléctrico (½ε₀E²).',
    diagramCaption: 'Inductor L aumentando su corriente de 0 a I y almacenando energía en su campo B.',
    svgKey: 'magnetic-energy',
    docxImage: 'assets/docx-media/image22.png',
    examTip: 'Compará siempre las densidades de energía: u_E = ½ε₀E² y u_B = B²/(2μ₀).',
    steps: [
      {
        stepNumber: 1,
        title: 'Potencia entregada al inductor contra su fem',
        explanation: 'Para hacer crecer la corriente i, la fuente debe vencer la fem autoinducida |ε_L| = L·(di/dt):',
        formulaLatex: 'P = \\frac{dU_B}{dt} = i\\,|\\varepsilon_L| = L\\,i\\frac{di}{dt}'
      },
      {
        stepNumber: 2,
        title: 'Integramos desde i = 0 hasta I',
        explanation: 'Multiplicamos por dt e integramos para hallar la energía magnética total almacenada:',
        formulaLatex: 'U_B = \\int_0^I L\\,i\\,di = \\frac{1}{2}L\\,I^2'
      },
      {
        stepNumber: 3,
        title: 'Aplicamos al solenoide (L = μ₀n²Al e I = B/(μ₀n))',
        explanation: 'Sustituimos L e I en términos del campo B y dividimos por el volumen V = A·l:',
        formulaLatex: 'U_B = \\frac{1}{2}(\\mu_0 n^2 A l)\\left(\\frac{B}{\\mu_0 n}\\right)^2 = \\frac{B^2}{2\\mu_0}(A\\,l)'
      },
      {
        stepNumber: 4,
        title: 'Densidad de energía magnética u_B',
        explanation: 'Dividiendo por el volumen A·l resulta una fórmula universal para cualquier campo magnético en el vacío:',
        formulaLatex: 'u_B = \\frac{U_B}{A\\,l} = \\frac{B^2}{2\\mu_0}'
      }
    ]
  },
  {
    id: 'u9-ampere-maxwell',
    unitNumber: 9,
    unitTitle: 'Unidad 9: Inductancia y Maxwell',
    title: 'Corriente de Desplazamiento y Ampère-Maxwell',
    subtitle: 'Resolución de la paradoja del capacitor en carga',
    targetFormulaLatex: '\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0\\left(I_c + \\varepsilon_0\\frac{d\\Phi_E}{dt}\\right)',
    physicalMeaning: 'Un campo eléctrico variable en el tiempo genera un campo magnético igual que una corriente real, completando la simetría de las Ecuaciones de Maxwell.',
    diagramCaption: 'Dos superficies (plana S₁ cortando el cable, abombada S₂ pasando entre placas del capacitor).',
    svgKey: 'ampere-maxwell',
    examTip: 'Entre las placas del capacitor en vacío I_c = 0, pero I_d = ε₀·dΦ_E/dt iguala exactamente a la corriente I del cable.',
    steps: [
      {
        stepNumber: 1,
        title: 'El problema de la superficie S₂ entre las placas',
        explanation: 'Por el cable circula corriente de conducción I_c, pero entre las placas del capacitor no cruza carga real. Si usamos S₂, la Ley de Ampère original daría B = 0, contradiciendo a S₁.',
        formulaLatex: '\\Phi_E = E\\,A = \\frac{\\sigma}{\\varepsilon_0}A = \\frac{q}{\\varepsilon_0}'
      },
      {
        stepNumber: 2,
        title: 'Derivamos el flujo eléctrico respecto al tiempo',
        explanation: 'Al variar la carga q(t) del capacitor, cambia el flujo eléctrico entre sus placas:',
        formulaLatex: '\\frac{d\\Phi_E}{dt} = \\frac{1}{\\varepsilon_0}\\frac{dq}{dt} = \\frac{I_c}{\\varepsilon_0}'
      },
      {
        stepNumber: 3,
        title: 'Definimos la Corriente de Desplazamiento I_d',
        explanation: 'Despejamos ε₀·(dΦ_E/dt) como corriente equivalente entre las placas:',
        formulaLatex: 'I_d = \\varepsilon_0\\frac{d\\Phi_E}{dt}'
      },
      {
        stepNumber: 4,
        title: 'Ley de Ampère-Maxwell generalizada',
        explanation: 'Sumando I_c + I_d la ley da el mismo resultado coherente para cualquier superficie S₁ o S₂:',
        formulaLatex: '\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0\\left(I_c + \\varepsilon_0\\frac{d\\Phi_E}{dt}\\right)'
      }
    ]
  }
];
