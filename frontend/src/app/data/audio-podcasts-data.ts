export interface UnitPodcastScript {
  unitNumber: number;
  title: string;
  durationLabel: string;
  summary: string;
  scriptParagraphs: {
    speaker: 'Profesor Guía';
    blockTitle: string;
    text: string;
  }[];
}

export const CATEDRA_PODCAST_SCRIPTS: UnitPodcastScript[] = [
  {
    unitNumber: 1,
    title: 'Podcast U1: Carga, Coulomb y Campo Eléctrico en 3 Minutos',
    durationLabel: '3:10 min',
    summary: 'La naturaleza de la carga, por qué el campo es un vector que se proyecta y cómo plantear la integral de Coulomb sin caer en la trampa de los escalares.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: El Fenómeno y la Ley Fundamental',
        text: 'Hola. Vamos a repasar la Unidad 1 en tres minutos. Lo primero que tenés que tener grabado a fuego es que el campo eléctrico no es un número: es un campo vectorial. La Ley de Coulomb te da la fuerza entre dos cargas puntuales en el vacío. Si tenés una distribución continua, como una varilla o un anillo, tenés que tomar un pedacito diferencial de carga dq y sumar los vectores dE mediante una integral. Jamás sumes las magnitudes como si fueran números escalares; siempre proyectá en los ejes x e y.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: La Demostración de Pizarra',
        text: 'En el pizarrón te van a pedir casi seguro el campo sobre el eje de un anillo o el de una varilla finita. Ahí tenés que lucirte con la simetría: mostrale al profesor que para cada diferencial de carga a la derecha existe un gemelo a la izquierda cuyas componentes perpendiculares se cancelan exactamente. Al cancelarse, la integral se reduce a una sola componente. Y acordate de expresar dq en función de lambda por dl o sigma por dA según corresponda.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: La Trampa que te Anula el Ejercicio',
        text: '¿Dónde caen todos en el parcial? En dos cosas: primero, sacar la distancia r fuera de la integral creyendo que es constante cuando varía para cada punto de la varilla; y segundo, olvidarse de pasar los microcoulombs a coulombs y los centímetros a metros. Si hacés la prueba del límite haciendo z mucho mayor que el radio, tenés que recuperar la fórmula de una carga puntual. Si no te da eso, revisá el álgebra.',
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Podcast U2: Ley de Gauss — El Arte de la Simetría',
    durationLabel: '3:05 min',
    summary: 'Por qué la superficie gaussiana debe ser cerrada, cómo justificar sacar el campo de la integral y el comportamiento dentro de conductores.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: Qué dice realmente Gauss',
        text: 'La Ley de Gauss es una de las cuatro ecuaciones fundamentales de Maxwell. Te dice que el flujo eléctrico neto que atraviesa cualquier superficie cerrada es directamente proporcional a la carga neta que quedó encerrada adentro dividida por épsilon cero. No importa cómo estén distribuidas las cargas adentro ni qué forma tenga la superficie; el flujo total no cambia. Pero ojo: para calcular el campo puntual, necesitás simetría geométrica.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: Las 3 Condiciones para Despejar E',
        text: 'En la mesa de examen el titular te va a preguntar: ¿Por qué pudiste sacar el campo E fuera de la integral de flujo? Tu respuesta tiene que ser impecable: primero, porque por simetría el módulo de E es constante en toda la superficie lateral; y segundo, porque el vector campo es perfectamente paralelo al diferencial de área en la pared, haciendo que el producto escalar sea simplemente E por dA. Y en las tapas, E es perpendicular a dA, por lo que el flujo por las tapas es cero.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: Conductores en Equilibrio',
        text: 'Dentro de cualquier conductor en equilibrio electrostático, el campo eléctrico es estrictamente cero. Si hubiera campo, los electrones libres se moverían, contradiciendo el equilibrio. Todo el exceso de carga se va a la superficie exterior. Y el campo inmediatamente afuera del conductor vale sigma sobre épsilon cero, no sigma sobre dos épsilon cero como en una lámina no conductora.',
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Podcast U4: Capacitores y Dieléctricos — ¿Batería Conectada o No?',
    durationLabel: '3:15 min',
    summary: 'La diferencia crucial entre capacitor conectado y desconectado al meter un dieléctrico, y la energía almacenada.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: Qué es la Capacidad',
        text: 'La capacidad de un condensador depende únicamente de su geometría y del medio dieléctrico que pongas entre las placas. No depende de cuánta carga le pongas ni de qué voltaje le apliques; si duplicás el voltaje, simplemente se duplica la carga acumulada, pero el cociente Q sobre delta V sigue siendo constante. Para placas planas paralelas, C vale épsilon r por épsilon cero por el área sobre la distancia.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: La Gran Pregunta de Final',
        text: 'Esta pregunta define si aprobás: ¿Qué pasa si introducís un dieléctrico con la batería conectada versus con la batería desconectada? Si la batería está conectada, el voltaje V permanece clavado en el voltaje de la fuente, y lo que aumenta es la carga Q y la energía almacenada. Si la batería está desconectada, la carga Q no tiene adónde irse y permanece constante, por lo que el voltaje disminuye y la energía disminuye porque el campo atrae al dieléctrico.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: El Vector Polarización',
        text: 'Las moléculas del dieléctrico se orientan creando dipolos. Esto engendra un campo inducido opuesto al campo libre original. Por eso el campo neto disminuye en un factor k. El vector desplazamiento D solo ve las cargas libres de las placas, mientras que el campo eléctrico E siente el efecto conjunto de las cargas libres y de las cargas ligadas de polarización.',
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Podcast U6: Campo Magnético y Fuerza de Lorentz',
    durationLabel: '2:55 min',
    summary: 'Por qué la fuerza magnética no hace trabajo, el radio de curvatura y la regla de la mano derecha sin errores.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: La Fuerza que no Gasta Energía',
        text: 'Una carga quieta no siente nada frente a un campo magnético. Para que haya fuerza magnética, la partícula tiene que estar en movimiento y su velocidad no puede ser paralela a B. La fuerza de Lorentz es q por v cruz B. Como la fuerza es siempre perpendicular al vector velocidad, el producto escalar F por v es cero. Eso significa que la fuerza magnética no realiza trabajo; jamás puede aumentar ni disminuir la rapidez de la partícula, solo desvía su dirección.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: El Ciclotrón y su Frecuencia Mágica',
        text: 'Si la velocidad es perpendicular a un campo homogéneo, la trayectoria es una circunferencia perfecta. Igualando la fuerza magnética a la masa por la aceleración centrípeta v cuadrado sobre R, despejás que el radio es m por v sobre q por B. Pero lo más loco es la frecuencia: la frecuencia angular omega es q por B sobre m. ¡No depende ni del radio ni de la velocidad! Partículas lentas y rápidas tardan exactamente el mismo tiempo en dar una vuelta.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: Cuidado con el Electrón',
        text: 'En el pizarrón usá siempre la mano derecha: pulgar en la dirección de la velocidad, índice o dedos en el campo magnético, y la palma empuja hacia la fuerza. Pero si la partícula es un electrón, con carga negativa, el vector resultante se da vuelta ciento ochenta grados. No te olvides de ese signo negativo.',
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Podcast U8: Inducción de Faraday-Lenz y Autoinductancia',
    durationLabel: '3:20 min',
    summary: 'El significado físico del signo menos de Lenz, cómo deducir la fem y el comportamiento transitorio de los inductores.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: El Flujo que Cambia',
        text: 'La Ley de Faraday te dice que lo que engendra una fem inducida no es el campo magnético, sino el cambio del flujo magnético en el tiempo. Podés cambiar el flujo variando el módulo de B, cambiando el área de la espira, o haciéndola girar como en un generador de alterna. La fem inducida vale menos la derivada del flujo respecto del tiempo.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: El Signo Menos y la Energía',
        text: 'El signo menos de la Ley de Lenz es el Principio de Conservación de la Energía disfrazado. La corriente que se induce genera un campo magnético propio que siempre se opone a la variación que la originó. Si el flujo entrante crece, la espira crea campo saliente para frenarlo; si el flujo decrece, crea campo entrante para sostenerlo. Si fuera al revés, tendríamos un móvil perpetuo creando energía de la nada.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: Inductores en Circuitos',
        text: 'Un inductor almacena energía en su campo magnético: un medio de L por I cuadrado. Su propiedad fundamental es que no permite cambios bruscos de corriente. En el instante inicial t igual cero al cerrar la llave, la corriente es estrictamente cero y el inductor se comporta como un circuito abierto. Mucho tiempo después, la corriente se estabiliza y el inductor actúa como un simple cable de resistencia cero.',
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Podcast U9: Corriente Alterna, Resonancia y Ecuaciones de Maxwell',
    durationLabel: '3:10 min',
    summary: 'Fasores, resonancia RLC donde la impedancia es mínima, y la síntesis final de Maxwell que predijo la luz.',
    scriptParagraphs: [
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 1: Fasores e Impedancia',
        text: 'En corriente alterna no podés sumar los voltajes algebraicamente porque no están en fase. En una resistencia, corriente y voltaje van de la mano. En un capacitor, la corriente adelanta noventa grados. En un inductor, el voltaje adelanta noventa grados. La impedancia Z es la hipotenusa de Pitágoras: raíz cuadrada de R cuadrado más la diferencia de reactancias al cuadrado.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 2: El Fenómeno de Resonancia',
        text: 'Cuando la reactancia inductiva omega L se iguala a la reactancia capacitiva uno sobre omega C, el circuito entra en resonancia. La impedancia se hace puramente resistiva y mínima, igual a R, por lo que la corriente alcanza su valor máximo. La caída de tensión en el conjunto L-C es cero en todo instante porque los voltajes del inductor y del capacitor están desfasados ciento ochenta grados y se cancelan mutuamente.',
      },
      {
        speaker: 'Profesor Guía',
        blockTitle: 'Bloque 3: La Síntesis de Maxwell',
        text: 'Maxwell completó el electromagnetismo agregando la corriente de desplazamiento a la Ley de Ampère. Un campo eléctrico variable engendra un campo magnético, y un campo magnético variable engendra un campo eléctrico. Al combinar estas dos leyes en el vacío, surge una ecuación de onda donde la velocidad de propagación es uno sobre la raíz de épsilon cero por mu cero. Esa velocidad dio trescientos mil kilómetros por segundo: ¡la luz es una onda electromagnética!',
      },
    ],
  },
];
