// Dataset completo de Multiple Choice graduado en 7 niveles para las 9 unidades de Física 2
// Niveles: facil, medio, intermedio, avanzado, dificil, final, coloquio
import { UnitMultipleChoiceQuestion } from '../types/fisica2';

export const UNIT_MCQ_QUESTIONS: UnitMultipleChoiceQuestion[] = [
  {
    "id": "mcq-u1-facil",
    "unitNumber": 1,
    "level": "facil",
    "topic": "Carga Eléctrica y Cuantización",
    "question": "Si un cuerpo conductor inicialmente neutro adquiere una carga neta negativa de q = -3,2 μC, ¿cuántos electrones en exceso ha recibido?",
    "options": [
      "2,0 × 10¹³ electrones",
      "3,2 × 10¹⁹ electrones",
      "1,6 × 10¹³ electrones",
      "5,0 × 10¹² electrones"
    ],
    "correctIndex": 0,
    "explanation": "Por el principio de cuantización de la carga q = n · e, el número de electrones es n = |q| / e = (3,2 × 10⁻⁶ C) / (1,602 × 10⁻¹⁹ C/e⁻) ≈ 2,0 × 10¹³ electrones en exceso.",
    "distractorAnalysis": [
      "Opción correcta: aplica n = q/e con prefijo micro (10⁻⁶).",
      "Confunde el valor de la carga con el número de electrones.",
      "Divide erróneamente por 2 en vez de dividir por la carga elemental.",
      "Error de cálculo en las potencias de diez."
    ],
    "hint": "Recordá que la carga elemental es e = 1,602 × 10⁻¹⁹ C y 1 μC = 10⁻⁶ C.",
    "formulaUsed": "q = n · e",
    "errorCategory": "unidades"
  },
  {
    "id": "mcq-u1-medio",
    "unitNumber": 1,
    "level": "medio",
    "topic": "Ley de Coulomb Directa",
    "question": "Dos cargas puntuales q₁ = +2 μC y q₂ = -8 μC están separadas una distancia r = 30 cm en el vacío. ¿Cuál es el módulo de la fuerza electrostática y su carácter?",
    "options": [
      "1,6 N (fuerza atractiva)",
      "1,6 N (fuerza repulsiva)",
      "160 N (fuerza atractiva)",
      "0,48 N (fuerza atractiva)"
    ],
    "correctIndex": 0,
    "explanation": "F = k · |q₁ · q₂| / r² = (8,99 × 10⁹ N·m²/C²) · (2 × 10⁻⁶ C · 8 × 10⁻⁶ C) / (0,30 m)² = 0,1438 / 0,09 ≈ 1,60 N. Al ser de signos opuestos (+ y -), la fuerza es estrictamente atractiva.",
    "distractorAnalysis": [
      "Opción correcta: r = 0,30 m al cuadrado es 0,09 m² y signos opuestos se atraen.",
      "Cargas de signo contrario se atraen, no se repelen.",
      "Olvidó convertir 30 cm a 0,30 m o calculó mal el exponente.",
      "Omitió elevar la distancia al cuadrado."
    ],
    "hint": "Recordá pasar 30 cm a metros (0,30 m) antes de elevar al cuadrado en el denominador.",
    "formulaUsed": "F = k · |q₁ · q₂| / r²",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u1-intermedio",
    "unitNumber": 1,
    "level": "intermedio",
    "topic": "Proporcionalidad y Cuadrado Inverso",
    "question": "Dos cargas puntuales fijas se repelen con una fuerza F = 36 N. Si duplicamos el valor de ambas cargas y a la vez triplicamos la distancia entre ellas, ¿cuánto valdrá la nueva fuerza?",
    "options": [
      "16 N",
      "24 N",
      "48 N",
      "72 N"
    ],
    "correctIndex": 0,
    "explanation": "F_nueva = k · (2q₁)(2q₂) / (3r)² = (4/9) · [k q₁ q₂ / r²] = (4/9) · 36 N = 16 N.",
    "distractorAnalysis": [
      "Opción correcta: factor (2 · 2) / 3² = 4/9. 36 × (4/9) = 16 N.",
      "Calculó (4/6) en lugar de elevar 3 al cuadrado.",
      "Duplicó arriba y no elevó al cuadrado la distancia.",
      "Multiplicó por 2 en vez de considerar la atenuación de la distancia."
    ],
    "hint": "Escribí la razón: el numerador se multiplica por 2 × 2 = 4, y el denominador por 3² = 9.",
    "formulaUsed": "F ∝ (q₁ · q₂) / r²",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u1-avanzado",
    "unitNumber": 1,
    "level": "avanzado",
    "topic": "Punto de Campo Eléctrico Nulo (Superposición)",
    "question": "Dos cargas q₁ = +4 μC y q₂ = +1 μC se ubican sobre el eje x en x = 0 y x = 3,0 m respectivamente. ¿En qué coordenada x el campo eléctrico neto E_neto es igual a cero?",
    "options": [
      "x = 2,0 m (entre las cargas)",
      "x = 1,5 m (punto medio)",
      "x = 1,0 m (más cerca de q₁)",
      "x = 6,0 m (a la derecha de q₂)"
    ],
    "correctIndex": 0,
    "explanation": "Al ser ambas positivas, E_neto solo puede anularse entre ellas (0 < x < 3). Igualando módulos: k(4)/x² = k(1)/(3-x)². Sacando raíz cuadrada: 2/x = 1/(3-x) ⇒ 2(3-x) = x ⇒ 6 - 2x = x ⇒ 3x = 6 ⇒ x = 2,0 m. Queda a 2 m de q₁ y a 1 m de q₂ (la carga menor compensa su debilidad estando más cerca).",
    "distractorAnalysis": [
      "Opción correcta: resolución exacta de 4/x² = 1/(3-x)², dando x = 2,0 m.",
      "El punto medio solo anula si las dos cargas fueran exactamente iguales en magnitud.",
      "Quedaría más cerca de la carga mayor, lo que aumentaría aún más su campo relativo.",
      "Fuera del segmento las fuerzas apuntan en el mismo sentido y nunca se cancelan."
    ],
    "hint": "Como E decae con 1/r², la carga 4 veces mayor debe estar al doble de distancia para igualar el campo de la menor.",
    "formulaUsed": "k · q₁ / x² = k · q₂ / (d - x)²",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u1-dificil",
    "unitNumber": 1,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Campo vs Potencial",
    "question": "En el punto medio exacto de un dipolo eléctrico formado por dos cargas +q y -q separadas una distancia d, ¿cuáles son los valores del campo eléctrico E y del potencial eléctrico V?",
    "options": [
      "E ≠ 0 (apunta hacia la carga negativa) y V = 0",
      "E = 0 y V = 0",
      "E = 0 y V ≠ 0",
      "E ≠ 0 y V ≠ 0"
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa clásica número 1 de examen! Los campos son vectores: el campo de +q es saliente (hacia la derecha) y el de -q es entrante (también hacia la derecha), por lo que se SUMAN vectorialmente (E = 2kq/(d/2)² ≠ 0). En cambio, el potencial es escalar y suma algebraicamente con signo: V = kq/(d/2) + k(-q)/(d/2) = 0.",
    "distractorAnalysis": [
      "Opción correcta: vectores se suman en la misma dirección y escalares se anulan por signos opuestos.",
      "Trampa habitual: asumir que simetría geométrica implica anulación de vectores.",
      "Confundir dipolo con cargas del mismo signo (+q, +q).",
      "No reconocer que los potenciales escalares tienen signo algebraico."
    ],
    "hint": "Dibujá los dos vectores campo en el centro: ¿hacia dónde apunta el campo de +q? ¿Y el de -q?",
    "formulaUsed": "E_total = E₁ + E₂ (vectorial) | V_total = V₁ + V₂ (escalar)",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u1-final",
    "unitNumber": 1,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Péndulo Electrostático",
    "question": "Dos esferitas idénticas de masa m = 10 g y carga q cada una cuelgan de hilos aislantes de longitud L = 1 m desde el mismo punto del techo. En equilibrio estático, cada hilo forma un ángulo pequeño θ = 0,05 rad con la vertical. ¿Cuál es la relación física fundamental que rige el equilibrio?",
    "options": [
      "tan(θ) = F_electrostatica / (m · g)",
      "sin(θ) = (m · g) / F_electrostatica",
      "cos(θ) = F_electrostatica / (m · g)",
      "tan(θ) = m · g · F_electrostatica"
    ],
    "correctIndex": 0,
    "explanation": "Planteando diagrama de cuerpo libre para una esfera: ΣFy = T · cos(θ) - mg = 0 ⇒ T · cos(θ) = mg. ΣFx = Fe - T · sin(θ) = 0 ⇒ T · sin(θ) = Fe. Dividiendo miembro a miembro: tan(θ) = Fe / (mg). Para ángulos pequeños, tan(θ) ≈ sin(θ) ≈ x/(2L), permitiendo despejar q.",
    "distractorAnalysis": [
      "Opción correcta: cociente de componentes de la tensión T.",
      "Invirtió la tangente y las componentes.",
      "El coseno relaciona la componente vertical con la tensión, no con la fuerza horizontal.",
      "Multiplicó las fuerzas en lugar de plantear el cociente trigonométrico."
    ],
    "hint": "Planteá Newton en X y en Y con la tensión del hilo T, la fuerza electrostática Fe y el peso mg.",
    "formulaUsed": "tan(θ) = Fe / (m · g)",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u1-coloquio",
    "unitNumber": 1,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Concepto Físico de Campo",
    "question": "Frente al tribunal, el profesor pregunta: \"¿Por qué en Física Moderna introducimos el concepto de Campo Eléctrico en lugar de trabajar directamente con la acción a distancia de la Ley de Coulomb?\". ¿Cuál es la fundamentación física rigurosa de cátedra?",
    "options": [
      "Porque la acción a distancia instantánea viola la relatividad (nada viaja más rápido que c); la carga altera localmente el espacio creando un campo que se propaga a velocidad finita y almacena energía e impulso.",
      "Porque la Ley de Coulomb solo vale para masas y el campo eléctrico para cargas.",
      "Porque el campo eléctrico es un artificio matemático sin existencia física real para facilitar las integrales.",
      "Porque la fuerza de Coulomb deja de ser inversamente proporcional a r² en el vacío."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta modelo de coloquio: La Ley de Coulomb pura implicaría \"acción a distancia instantánea\", lo cual es incompatible con el límite de la velocidad de la luz c. La teoría de campos establece que la carga altera las propiedades del espacio que la rodea: el campo E existe en el punto P independientemente de que pongamos o no una carga de prueba, transporta energía, momento lineal y viaja a velocidad c.",
    "distractorAnalysis": [
      "Opción correcta: fundamenta la velocidad finita de propagación c y la realidad física del campo.",
      "Coulomb es estrictamente electrostático para cargas eléctricas.",
      "El campo posee energía demostrada físicamente (u = ½ ε₀ E²), no es mero artificio.",
      "Coulomb es rigurosamente 1/r² en el vacío."
    ],
    "hint": "Pensá qué pasaría si movés repentinamente una carga a 1 millón de km: ¿siente la otra la fuerza al instante?",
    "formulaUsed": "u_E = ½ ε₀ E² | c = 1 / √(ε₀ μ₀)",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u2-facil",
    "unitNumber": 2,
    "level": "facil",
    "topic": "Flujo Eléctrico Escalar y Unidades",
    "question": "¿Cuáles son las unidades del Flujo Eléctrico ΦE en el Sistema Internacional?",
    "options": [
      "N · m² / C (o equivalentemente V · m)",
      "N / C (o V / m)",
      "Joule (J)",
      "Coulomb / m² (C / m²)"
    ],
    "correctIndex": 0,
    "explanation": "Por definición ΦE = ∫ E · dA. Como E se mide en N/C o V/m, y el área en m², el flujo tiene unidades de (N/C) · m² = N·m²/C, o bien (V/m) · m² = V·m.",
    "distractorAnalysis": [
      "Opción correcta: [E] · [A] = (N/C) · m² = V·m.",
      "N/C es la unidad del Campo Eléctrico, no del Flujo.",
      "Joule es unidad de energía o trabajo.",
      "C/m² es la unidad de densidad superficial de carga σ."
    ],
    "hint": "Multiplicá las unidades de Campo Eléctrico (N/C o V/m) por las unidades de Área (m²).",
    "formulaUsed": "ΦE = ∮ E · dA",
    "errorCategory": "unidades"
  },
  {
    "id": "mcq-u2-medio",
    "unitNumber": 2,
    "level": "medio",
    "topic": "Ley de Gauss con Carga Puntual",
    "question": "Una carga puntual q = +8,85 nC está situada en el centro geométrico de un cubo de lado L = 20 cm. ¿Cuánto vale el flujo del campo eléctrico que atraviesa UNA SOLA de las seis caras del cubo?",
    "options": [
      "166,7 N·m²/C",
      "1000 N·m²/C",
      "6000 N·m²/C",
      "0 N·m²/C"
    ],
    "correctIndex": 0,
    "explanation": "Por la Ley de Gauss, el flujo a través de las 6 caras cerradas es Φ_total = q_enc / ε₀ = (8,85 × 10⁻⁹ C) / (8,85 × 10⁻¹² C²/N·m²) = 1000 N·m²/C. Al estar en el centro, por simetría las 6 caras reciben exactamente el mismo flujo: Φ_cara = Φ_total / 6 = 1000 / 6 ≈ 166,7 N·m²/C.",
    "distractorAnalysis": [
      "Opción correcta: divide el flujo total de 1000 N·m²/C por las 6 caras.",
      "1000 N·m²/C es el flujo total de las 6 caras combinadas.",
      "Multiplicó por 6 en lugar de dividir.",
      "El flujo solo sería cero si la carga estuviera afuera del cubo."
    ],
    "hint": "Calculá primero el flujo total cerrado con q_enc/ε₀ y luego dividilo por el número de caras simétricas.",
    "formulaUsed": "Φ_cara = (q_enc / ε₀) / 6",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u2-intermedio",
    "unitNumber": 2,
    "level": "intermedio",
    "topic": "Carga Externa a la Superficie Gaussiana",
    "question": "Una superficie esférica imaginaria de radio R = 15 cm no encierra ninguna carga en su interior. A 5 cm por fuera de la esfera hay una carga puntual Q = +50 μC. ¿Cuánto vale el flujo eléctrico neto a través de la esfera?",
    "options": [
      "Exactamente 0 N·m²/C",
      "5,65 × 10⁶ N·m²/C",
      "Depende del radio R de la esfera",
      "Infinito"
    ],
    "correctIndex": 0,
    "explanation": "Por la Ley de Gauss, ∮ E · dA = q_enc / ε₀. Como la carga Q está estrictamente fuera de la superficie gaussiana, q_enc = 0 y el flujo neto es CERO. Físicamente: toda línea de campo que entra por una cara de la esfera (flujo negativo) sale obligatoriamente por la cara opuesta (flujo positivo igual).",
    "distractorAnalysis": [
      "Opción correcta: q_enc = 0 implica flujo cerrado neto nulo.",
      "Calculó Q/ε₀ olvidando que la carga está afuera.",
      "El flujo es independiente del radio cuando la carga encerrada es cero.",
      "No hay singularidades sobre la superficie."
    ],
    "hint": "Mirá la fórmula de Gauss: ¿cuánta carga neta hay DENTRO de la superficie cerrada?",
    "formulaUsed": "∮ E · dA = q_enc / ε₀ = 0",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u2-avanzado",
    "unitNumber": 2,
    "level": "avanzado",
    "topic": "Cáscara Esférica Aislante con Densidad Volumétrica",
    "question": "Una cáscara esférica aislante de radio interior a y exterior b tiene densidad volumétrica de carga uniforme ρ. Para un punto intermedio dentro del material (a ≤ r ≤ b), ¿cuál es la expresión correcta del campo eléctrico E(r)?",
    "options": [
      "E(r) = ρ · (r³ - a³) / (3 · ε₀ · r²)",
      "E(r) = ρ · r / (3 · ε₀)",
      "E(r) = ρ · (b³ - a³) / (3 · ε₀ · r²)",
      "E(r) = 0 N/C"
    ],
    "correctIndex": 0,
    "explanation": "Elegimos superficie gaussiana esférica de radio r (a ≤ r ≤ b). Carga encerrada: solo el volumen de cáscara entre a y r: q_enc = ρ · (4/3)π(r³ - a³). Por Gauss: E · (4πr²) = q_enc / ε₀ ⇒ E(r) = ρ(r³ - a³) / (3ε₀r²). Notar que en r = a da E = 0 (continuo con el hueco) y en r = b empalma con la cáscara completa.",
    "distractorAnalysis": [
      "Opción correcta: resta el hueco interior a³ en la carga encerrada.",
      "Esta es la fórmula de una esfera maciza sin hueco (a = 0).",
      "Tomó toda la cáscara hasta b en lugar de integrar hasta el radio gaussiano r.",
      "En un aislante cargado el campo dentro del espesor NO es cero."
    ],
    "hint": "La carga encerrada por una gaussiana de radio r solo abarca desde el radio interno \"a\" hasta \"r\".",
    "formulaUsed": "E · 4πr² = [ρ · 4/3 π (r³ - a³)] / ε₀",
    "errorCategory": "limites"
  },
  {
    "id": "mcq-u2-dificil",
    "unitNumber": 2,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Campo en Conductor vs Aislante",
    "question": "En la superficie exterior de un conductor metálico en equilibrio electrostático el campo eléctrico vale E = σ / ε₀, mientras que junto a una lámina plana aislante infinita vale E = σ / (2ε₀). ¿Cuál es la razón física de esta diferencia de factor 2?",
    "options": [
      "En el conductor todo el campo se proyecta hacia afuera porque dentro del metal E = 0; en la lámina aislante las líneas salen simétricamente hacia AMBAS caras (repartiendo el flujo en 2 tapas).",
      "Porque la constante dieléctrica del metal vale exactamente 2.",
      "Porque el aislante absorbe la mitad del campo eléctrico.",
      "Porque en el conductor la carga se duplica por inducción espontánea."
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa reina de parciales! En una lámina aislante con carga σ, la superficie cilíndrica gaussiana tiene dos tapas exteriores paralelas que reciben flujo: 2·E·A = (σ·A)/ε₀ ⇒ E = σ/(2ε₀). En cambio, en un conductor en equilibrio electrostático, una de las tapas del cilindro gaussiano está DENTRO del metal donde E = 0, por lo que solo la tapa exterior aporta flujo: E·A = (σ·A)/ε₀ ⇒ E = σ/ε₀.",
    "distractorAnalysis": [
      "Opción correcta: explica la condición de contorno de Gauss con una tapa en E = 0.",
      "Los metales tienen constante dieléctrica formalmente infinita, no 2.",
      "El aislante no absorbe campo, simplemente tiene dos caras emitiendo líneas.",
      "La carga no se duplica, se conserva."
    ],
    "hint": "Pensá dónde colocás las dos tapas del cilindro gaussiano en cada caso: ¿dónde está una de las tapas en el conductor?",
    "formulaUsed": "Conductor: E = σ / ε₀ | Placa no conductora: E = σ / (2ε₀)",
    "errorCategory": "simetria"
  },
  {
    "id": "mcq-u2-final",
    "unitNumber": 2,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Tubo Conductor Coaxial",
    "question": "Un cilindro metálico macizo de radio R₁ = 2 cm con carga lineal +λ está rodeado por un cascarón cilíndrico metálico concéntrico de radio interno R₂ = 5 cm y externo R₃ = 7 cm con carga lineal neta -2λ. ¿Cuánto vale el campo eléctrico en la región entre ambos (R₁ < r < R₂) y en la región exterior (r > R₃)?",
    "options": [
      "Entre ambos: E = λ / (2πε₀r) (saliente) | Exterior: E = λ / (2πε₀r) (entrante)",
      "Entre ambos: E = 0 | Exterior: E = 0",
      "Entre ambos: E = 2λ / (2πε₀r) | Exterior: E = -3λ / (2πε₀r)",
      "Entre ambos: E = λ / (2πε₀r²) | Exterior: E = 2λ / (2πε₀r²)"
    ],
    "correctIndex": 0,
    "explanation": "Para R₁ < r < R₂: la gaussiana solo encierra el cilindro central (+λ), luego E(r) = λ / (2πε₀r) saliente. Para r > R₃: la gaussiana encierra ambos conductores: q_enc = (+λ) + (-2λ) = -λ por unidad de longitud. Por tanto E(r) = λ / (2πε₀r) en módulo, pero apuntando hacia adentro (radial entrante). En el espesor del cascarón (R₂ < r < R₃) el campo es cero por ser conductor en equilibrio.",
    "distractorAnalysis": [
      "Opción correcta: suma algebraica de densidades lineales encerradas (+λ - 2λ = -λ).",
      "Solo es cero dentro del material conductor, no en los espacios intermedios.",
      "Multiplicó erróneamente las densidades en vez de sumar algebraicamente.",
      "La simetría cilíndrica decae con 1/r, nunca con 1/r² (eso es esférico)."
    ],
    "hint": "Aplicá Gauss cilíndrico: el miembro izquierdo es E · (2π r L) y la carga encerrada es q_enc = λ_neta · L.",
    "formulaUsed": "E(r) = λ_enc / (2πε₀ · r)",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u2-coloquio",
    "unitNumber": 2,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Hipótesis de Simetría en Gauss",
    "question": "El tribunal te pide en el pizarrón: \"Escriba ∮ E · dA = q_enc / ε₀. ¿Bajo qué dos condiciones matemáticas y físicas rigurosas es legal extraer el módulo de E fuera de la integral cerrada para despejarlo?\".",
    "options": [
      "1) Que el módulo |E| sea estrictamente CONSTANTE en todos los puntos de la superficie gaussiana elegida; 2) Que el ángulo entre E⃗ y dA⃗ sea constante (preferentemente 0° o 90°) en cada sector.",
      "Solo se necesita que la superficie sea un cuadrado perfecto.",
      "Se puede sacar siempre porque la integral de Gauss es conmutativa.",
      "Solo se puede sacar si la carga encerrada es negativa."
    ],
    "correctIndex": 0,
    "explanation": "Deducción canónica de examen oral: ∮ E⃗ · dA⃗ = ∮ |E| · |dA| · cos(θ). Para sacar E fuera de la integral se requiere: 1) cos(θ) constante (típicamente cos 0° = 1 en superficies normales o cos 90° = 0 en tapas paralelas); 2) |E| constante en toda la superficie activa, quedando E ∮ dA = E · A_gaussiana = q_enc / ε₀. Si la carga está descentrada o la superficie no acompaña la simetría, la Ley de Gauss SIGUE SIENDO VÁLIDA pero es INÚTIL para despejar E.",
    "distractorAnalysis": [
      "Opción correcta: detalla las dos condiciones de simetría vectorial y escalar.",
      "Un cubo no permite sacar E porque E varía de las aristas al centro de las caras.",
      "No se puede extraer una variable que depende de la posición sobre la superficie.",
      "El signo de la carga no condiciona la simetría."
    ],
    "hint": "¿Cuándo puede salir una función f(x) fuera de una integral ∫ f(x) dx? Cuando es constante respecto a esa variable.",
    "formulaUsed": "∮ E · dA · cos(θ) = E · cos(0°) ∮ dA = E · A",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u3-facil",
    "unitNumber": 3,
    "level": "facil",
    "topic": "Definición de Potencial y Relación con el Trabajo",
    "question": "Si se realiza un trabajo externo W_ext = 0,60 J para trasladar lentamente una carga q = +3,0 mC desde el infinito hasta un punto P sin acelerarla, ¿cuál es el potencial eléctrico V_P en dicho punto?",
    "options": [
      "200 V",
      "1,8 V",
      "0,005 V",
      "600 V"
    ],
    "correctIndex": 0,
    "explanation": "Por definición de potencial electrostático: V_P = W_ext / q = 0,60 J / (3,0 × 10⁻³ C) = 200 J/C = 200 V.",
    "distractorAnalysis": [
      "Opción correcta: V = W / q = 0,60 / 0,003 = 200 V.",
      "Multiplicó W por q en lugar de dividir.",
      "Invirtió el cociente q / W.",
      "Error de prefijo mili (usó 10⁻⁶ en vez de 10⁻³)."
    ],
    "hint": "Recordá que Volt es Joule por Coulomb: V = W / q. Cuidado con pasar 3 mC a 0,003 C.",
    "formulaUsed": "V = W_ext / q",
    "errorCategory": "unidades"
  },
  {
    "id": "mcq-u3-medio",
    "unitNumber": 3,
    "level": "medio",
    "topic": "Potencial de Cargas Puntuales (Suma Escalar)",
    "question": "Dos cargas q₁ = +6 nC y q₂ = -6 nC se encuentran separadas 2,0 m en el vacío. En el punto medio exacto de la recta que las une, ¿cuánto vale el potencial eléctrico total?",
    "options": [
      "0 V",
      "54 V",
      "108 V",
      "-54 V"
    ],
    "correctIndex": 0,
    "explanation": "El potencial electrostático es un escalar y se suma con signo: V = k(q₁/r₁) + k(q₂/r₂). En el punto medio r₁ = r₂ = 1,0 m: V = (9×10⁹)(+6×10⁻⁹)/1 + (9×10⁹)(-6×10⁻⁹)/1 = +54 V - 54 V = 0 V.",
    "distractorAnalysis": [
      "Opción correcta: suma escalar con signos opuestos da cero exacto.",
      "Calculó solo la contribución de la carga positiva.",
      "Sumó los módulos ignorando el signo negativo de q₂.",
      "Tomó solo la negativa."
    ],
    "hint": "¡El potencial NO es un vector! Se suman los números reales conservando los signos + y - de las cargas.",
    "formulaUsed": "V = k · Σ (q_i / r_i)",
    "errorCategory": "signo"
  },
  {
    "id": "mcq-u3-intermedio",
    "unitNumber": 3,
    "level": "intermedio",
    "topic": "Independencia de la Trayectoria (Fuerza Conservativa)",
    "question": "Una partícula cargada se mueve en una región donde existe un campo eléctrico uniforme. Si viaja desde el punto A hasta el punto B por un camino recto directo, el trabajo del campo es W₁ = 12 mJ. Si viaja de A a B por una trayectoria en zigzag tres veces más larga, ¿cuánto vale el trabajo W₂ del campo?",
    "options": [
      "Exactamente 12 mJ (independiente de la trayectoria)",
      "36 mJ (se triplica por la longitud)",
      "4 mJ (se reduce a la tercera parte)",
      "0 mJ"
    ],
    "correctIndex": 0,
    "explanation": "El campo electrostático es estrictamente CONSERVATIVO: el trabajo W_campo = -q · ΔV depende exclusivamente de los potenciales en los puntos inicial (A) y final (B), y es completamente independiente de la forma o longitud del camino recorrido.",
    "distractorAnalysis": [
      "Opción correcta: propiedad conservativa fundamental de la electrostática.",
      "Confunde con fuerzas no conservativas como la fricción mecánica.",
      "Divide erróneamente por la distancia.",
      "Solo sería cero si el camino fuera cerrado (A → B → A)."
    ],
    "hint": "La fuerza electrostática es conservativa: ∮ E · dl = 0. ¿Depende el trabajo del camino?",
    "formulaUsed": "W_campo = -q · (V_B - V_A)",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u3-avanzado",
    "unitNumber": 3,
    "level": "avanzado",
    "topic": "Gradiente de Potencial E = -∇V",
    "question": "En cierta región del espacio el potencial eléctrico viene dado por V(x, y) = 4x²y - 3y². ¿Cuál es el vector campo eléctrico E⃗ en el punto (x = 2 m, y = 1 m)?",
    "options": [
      "E⃗ = -16 î - 10 ĵ (V/m)",
      "E⃗ = 16 î + 10 ĵ (V/m)",
      "E⃗ = -8 î + 6 ĵ (V/m)",
      "E⃗ = -16 î + 6 ĵ (V/m)"
    ],
    "correctIndex": 0,
    "explanation": "E⃗ = -∇V = -(∂V/∂x) î - (∂V/∂y) ĵ. Derivando parcialmente: ∂V/∂x = 8xy; evaluado en (2,1) da 8(2)(1) = 16  ⇒  Ex = -16 V/m. Derivando en y: ∂V/∂y = 4x² - 6y; evaluado en (2,1) da 4(2²) - 6(1) = 16 - 6 = 10  ⇒  Ey = -10 V/m. Por tanto E⃗ = -16 î - 10 ĵ V/m.",
    "distractorAnalysis": [
      "Opción correcta: aplica las derivadas parciales con el signo negativo del gradiente.",
      "Olvidó el signo menos de la relación E = -∇V.",
      "Derivó incorrectamente en x olvidando la potencia x².",
      "Omitió el término 4x² en la derivada respecto de y."
    ],
    "hint": "Recordá: Ex = -∂V/∂x y Ey = -∂V/∂y. ¡No te olvides del signo menos que antecede a cada derivada!",
    "formulaUsed": "E⃗ = -∇V = -(∂V/∂x î + ∂V/∂y ĵ + ∂V/∂z k̂)",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u3-dificil",
    "unitNumber": 3,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Energía de un Sistema de 4 Cargas",
    "question": "Se tienen 4 cargas puntuales iguales +q situadas en los 4 vértices de un cuadrado de lado L. ¿Cuántos términos de pares interactuantes componen la energía potencial electrostática total U del sistema?",
    "options": [
      "6 pares (4 lados de longitud L y 2 diagonales de longitud √2 L)",
      "4 pares (solo los 4 lados adyacentes)",
      "8 pares",
      "16 pares"
    ],
    "correctIndex": 0,
    "explanation": "¡Error clásico de examen! Para N cargas, el número total de pares de interacción sin repetir es N(N - 1) / 2 = 4 × 3 / 2 = 6 pares. En un cuadrado son los 4 lados adyacentes a distancia L (4kq²/L) más las 2 diagonales que cruzan el cuadrado a distancia √2 L (2kq²/(√2 L)). Quien cuenta solo 4 lados comete un error conceptual grave.",
    "distractorAnalysis": [
      "Opción correcta: N(N-1)/2 = 6 pares.",
      "Trampa común: olvidar que las cargas opuestas por las diagonales también interactúan.",
      "Cuenta los pares dos veces.",
      "Multiplica 4 × 4 incluyendo la autointeracción."
    ],
    "hint": "Usá la fórmula combinatoria de pares de cargas: N(N - 1) / 2 para N = 4.",
    "formulaUsed": "U = k · Σ (q_i · q_j / r_ij) para i < j",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u3-final",
    "unitNumber": 3,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Fusión de Gotas Cargadas",
    "question": "Una gota esférica de agua tiene carga q y potencial V₁ en su superficie. Si dos gotas idénticas con la misma carga q y mismo radio R₁ se fusionan formando una sola gota esférica mayor de radio R₂, ¿cuánto vale el nuevo potencial superficial V₂ en función de V₁?",
    "options": [
      "V₂ = 2^(2/3) · V₁ ≈ 1,59 · V₁",
      "V₂ = 2 · V₁",
      "V₂ = V₁ (no cambia)",
      "V₂ = 2^(1/3) · V₁ ≈ 1,26 · V₁"
    ],
    "correctIndex": 0,
    "explanation": "Problema favorito de final (TP4 Ej. 6). 1) Conservación de volumen: (4/3)π R₂³ = 2 · (4/3)π R₁³ ⇒ R₂ = 2^(1/3) · R₁. 2) Conservación de carga: Q₂ = 2q. 3) Potencial superficial: V₂ = k Q₂ / R₂ = k (2q) / [2^(1/3) R₁] = 2 / 2^(1/3) · (kq/R₁) = 2^(1 - 1/3) · V₁ = 2^(2/3) · V₁ ≈ 1,587 · V₁.",
    "distractorAnalysis": [
      "Opción correcta: combina la conservación del volumen (radio ∛2) con la duplicación de carga.",
      "Duplica el potencial olvidando que el radio de la gota también creció.",
      "El potencial no es invariante de escala.",
      "2^(1/3) es el factor de crecimiento del radio, no del potencial."
    ],
    "hint": "La carga se duplica (2q), pero el volumen se duplica, lo que hace que el radio crezca como 2^(1/3).",
    "formulaUsed": "V₂ / V₁ = (Q₂ / Q₁) · (R₁ / R₂)",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u3-coloquio",
    "unitNumber": 3,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Conductores y Superficies Equipotenciales",
    "question": "En el coloquio te preguntan: \"Demuestre físicamente por qué la superficie de un conductor metálico en equilibrio electrostático es obligatoriamente una SUPERFICIE EQUIPOTENCIAL y por qué las líneas de campo eléctrico siempre salen perpendiculares a ella\".",
    "options": [
      "Si hubiera diferencia de potencial entre dos puntos del metal, existiría un campo tangencial E_t = -dV/dl ≠ 0 que movería a los electrones libres; para que haya equilibrio (i = 0), E_tangencial debe ser cero, lo que implica V = cte y que el vector E solo puede ser normal.",
      "Porque los electrones se destruyen en la superficie del metal.",
      "Porque la permitividad de un metal es cero.",
      "Porque el potencial solo existe en el vacío."
    ],
    "correctIndex": 0,
    "explanation": "Demostración de cátedra: Por definición de conductor, existen electrones libres de conducción. Si existiera un campo tangencial a la superficie (E_t ≠ 0), los electrones experimentarían una fuerza F = -e · E_t y se moverían, generando corriente eléctrica. Como por hipótesis estamos en equilibrio electrostático (corriente neta i = 0), necesariamente E_t = 0. Luego dV = -E_t · dl = 0, lo que significa que el potencial V es constante en toda la superficie y el campo E⃗ debe ser estrictamente perpendicular a ella.",
    "distractorAnalysis": [
      "Opción correcta: fundamenta a partir del concepto de equilibrio electrostático y movilidad electrónica.",
      "La carga se conserva siempre.",
      "La permitividad no es cero.",
      "El potencial existe en todo el espacio."
    ],
    "hint": "¿Qué le pasa a un electrón libre si siente una fuerza paralela a la superficie? ¿Habría equilibrio?",
    "formulaUsed": "W = -q · ∫ E_tangencial · dl = 0  ⇒  V = constante",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u4-facil",
    "unitNumber": 4,
    "level": "facil",
    "topic": "Capacidad de Placas Paralelas en el Vacío",
    "question": "Si se duplica el área de las placas de un capacitor plano en el vacío y simultáneamente se reduce la distancia entre ellas a la mitad, ¿cómo cambia su capacidad C?",
    "options": [
      "Se cuadruplica (C_nueva = 4 · C₀)",
      "Se duplica (C_nueva = 2 · C₀)",
      "Permanece constante",
      "Se reduce a la cuarta parte"
    ],
    "correctIndex": 0,
    "explanation": "C = ε₀ · A / d. Si A' = 2A y d' = d/2: C' = ε₀ · (2A) / (d/2) = 4 · (ε₀ A / d) = 4 C₀. Se cuadruplica.",
    "distractorAnalysis": [
      "Opción correcta: 2 / (1/2) = 4.",
      "Olvidó que achicar la distancia en el denominador multiplica por 2.",
      "Pensó que el efecto del área y la distancia se cancelaban.",
      "Invirtió la relación de la distancia."
    ],
    "hint": "Escribí la fórmula C = ε₀ A / d y reemplazá 2A arriba y 1/2 d abajo.",
    "formulaUsed": "C = ε₀ · A / d",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u4-medio",
    "unitNumber": 4,
    "level": "medio",
    "topic": "Energía Almacenada en un Capacitor",
    "question": "Un capacitor de C = 10 μF se carga conectándolo a una batería de V = 200 V. ¿Cuánta energía potencial electrostática queda almacenada en el campo eléctrico?",
    "options": [
      "0,20 Joules",
      "2,0 Joules",
      "0,002 Joules",
      "40 Joules"
    ],
    "correctIndex": 0,
    "explanation": "U = ½ · C · V² = ½ · (10 × 10⁻⁶ F) · (200 V)² = 5 × 10⁻⁶ · 40.000 = 0,20 J.",
    "distractorAnalysis": [
      "Opción correcta: ½ · 10⁻⁵ · 4×10⁴ = 0,20 J.",
      "Olvidó el factor 1/2 de la fórmula ½ CV².",
      "Error al elevar 200 al cuadrado o con el prefijo micro.",
      "Multiplicó C por V sin elevar V al cuadrado."
    ],
    "hint": "Usá U = ½ C V² recordando que 10 μF = 10 × 10⁻⁶ F y 200² = 40.000.",
    "formulaUsed": "U = ½ · C · V²",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u4-intermedio",
    "unitNumber": 4,
    "level": "intermedio",
    "topic": "Capacitores en Serie vs en Paralelo",
    "question": "Se tienen dos capacitores idénticos de capacidad C cada uno. ¿Cuál es la relación entre la capacidad equivalente en paralelo (C_paralelo) y la capacidad equivalente en serie (C_serie)?",
    "options": [
      "C_paralelo = 4 · C_serie",
      "C_paralelo = 2 · C_serie",
      "C_paralelo = C_serie",
      "C_paralelo = 0,5 · C_serie"
    ],
    "correctIndex": 0,
    "explanation": "En paralelo se suman directamente: C_paralelo = C + C = 2C. En serie se suman las inversas: 1/C_serie = 1/C + 1/C = 2/C ⇒ C_serie = C / 2. El cociente es: C_paralelo / C_serie = (2C) / (C/2) = 4. La combinación en paralelo almacena 4 veces más capacidad que en serie.",
    "distractorAnalysis": [
      "Opción correcta: 2C dividido por C/2 da un factor 4.",
      "Confundió el cociente asumiendo factor 2.",
      "Fórmulas de serie y paralelo no son equivalentes.",
      "Invirtió la relación de serie y paralelo."
    ],
    "hint": "Calculá C_paralelo = C + C y C_serie = C / 2, y luego dividilos.",
    "formulaUsed": "C_paralelo = C₁ + C₂ | 1/C_serie = 1/C₁ + 1/C₂",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u4-avanzado",
    "unitNumber": 4,
    "level": "avanzado",
    "topic": "Carga Inducida en la Superficie del Dieléctrico",
    "question": "Un capacitor de placas de área A tiene una carga libre Q = 60 nC en el vacío. Se introduce un dieléctrico de constante Ke = 4 que llena totalmente el espacio entre las placas con el capacitor desconectado. ¿Cuál es el módulo de la carga de polarización inducida q_face en la cara del dieléctrico?",
    "options": [
      "q_face = 45 nC",
      "q_face = 15 nC",
      "q_face = 60 nC",
      "q_face = 240 nC"
    ],
    "correctIndex": 0,
    "explanation": "Por la fórmula oficial de cátedra (Ec. 8.2 del TP5): q_face = Q · (1 - 1/Ke). Reemplazando: q_face = 60 nC · (1 - 1/4) = 60 nC · (3/4) = 45 nC.",
    "distractorAnalysis": [
      "Opción correcta: 60 × 0,75 = 45 nC.",
      "15 nC es Q / Ke, que representa la carga neta efectiva no apantallada, no la carga inducida.",
      "La carga inducida en el dieléctrico solo igualaría a Q si Ke fuera infinito (un conductor).",
      "Multiplicó por Ke en lugar de usar (1 - 1/Ke)."
    ],
    "hint": "Usá la ecuación de la cátedra UNdeC: q_face = Q · (1 - 1/Ke).",
    "formulaUsed": "q_face = Q · (1 - 1/Ke)",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u4-dificil",
    "unitNumber": 4,
    "level": "dificil",
    "topic": "Trampa Clásica: Batería Conectada vs Desconectada",
    "question": "Un capacitor plano cargado se DESCONECTA de su batería. A continuación, un operador aleja las placas mecánicamente hasta triplicar su separación d. ¿Qué ocurre con la energía almacenada U y de dónde proviene físicamente la variación?",
    "options": [
      "La energía U se triplica (U_final = 3 U₀); el aumento proviene del trabajo mecánico positivo realizado por el operador al tirar de las placas en contra de la atracción electrostática.",
      "La energía se reduce a la tercera parte porque la capacidad cae.",
      "La energía permanece constante porque la carga está atrapada.",
      "La energía se triplica porque la batería le inyecta más corriente."
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa clásica de examen! Al estar DESCONECTADO de la fuente, la carga Q queda atrapada constante. Al triplicar d, la capacidad cae a C' = C₀ / 3. Usando la expresión de energía con carga constante: U = Q² / (2C), al reducirse C a un tercio, U se TRIPLICA: U' = Q² / [2(C₀/3)] = 3 U₀. El incremento de energía (ΔU = +2 U₀) proviene exactamente del trabajo mecánico W = ∫ F_atracción · dx que tuvo que realizar la mano del operador para vencer la atracción entre placas cargadas con signos opuestos.",
    "distractorAnalysis": [
      "Opción correcta: analiza Q constante, U = Q²/(2C) y el trabajo mecánico del operador.",
      "Usó erróneamente U = ½ C V² pensando que V era constante (V aumenta al triple al estar desconectado).",
      "Confunde conservación de carga con conservación de energía electrostática.",
      "La batería está desconectada, no puede inyectar corriente."
    ],
    "hint": "Si la batería está desconectada, ¿qué magnitud no puede cambiar? Usá la fórmula de U con esa magnitud.",
    "formulaUsed": "U = Q² / (2C) con Q = cte",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u4-final",
    "unitNumber": 4,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Cable Coaxial",
    "question": "Un cable coaxial cilíndrico de longitud L = 50 m tiene un conductor interno de radio ra = 1,5 mm y un conductor externo cilíndrico de radio rb = 4,5 mm. El espacio intermedio está lleno de aire (Ke ≈ 1). ¿Cuánto vale su capacitancia?",
    "options": [
      "2,53 nF",
      "0,84 nF",
      "5,06 nF",
      "12,8 pF"
    ],
    "correctIndex": 0,
    "explanation": "Para un capacitor coaxial cilíndrico: C = 2πε₀ · L / ln(rb / ra). Reemplazando: rb / ra = 4,5 / 1,5 = 3,0. ln(3,0) ≈ 1,0986. Luego: C = 2π · (8,854 × 10⁻¹² F/m) · 50 m / 1,0986 = 2,781 × 10⁻⁹ / 1,0986 ≈ 2,53 × 10⁻⁹ F = 2,53 nF.",
    "distractorAnalysis": [
      "Opción correcta: aplicación de C = 2πε₀L / ln(rb/ra).",
      "Dividió por 3 en lugar de dividir por el logaritmo natural ln(3).",
      "Duplicó la longitud o calculó mal el logaritmo.",
      "Omitió la longitud L de 50 m."
    ],
    "hint": "Fórmula de capacitor cilíndrico del TP5: C = 2πε₀ L / ln(rb/ra). Calculá primero rb/ra y sacale ln.",
    "formulaUsed": "C = 2πε₀ · L / ln(rb / ra)",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u4-coloquio",
    "unitNumber": 4,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Dieléctricos a Nivel Microscópico",
    "question": "En el coloquio frente al Ing. Chade Vergara te preguntan: \"Explique a nivel microscópico qué le ocurre a las moléculas de un dieléctrico no polar (como el aire o aceite) cuando lo introducimos entre las placas de un capacitor, y demuestre por qué el campo neto disminuye a E = E₀ / Ke\".",
    "options": [
      "El campo externo E₀ distorsiona las nubes electrónicas induciendo dipolos microscópicos alineados; en el seno del dieléctrico las cargas se anulan, pero en las superficies libres quedan capas de carga inducida q_face que crean un campo opuesto E_ind, haciendo que el campo neto sea E = E₀ - E_ind = E₀ / Ke.",
      "Los electrones saltan libremente de una placa a la otra descargando el capacitor.",
      "Las moléculas se ionizan destruyendo la rigidez dieléctrica.",
      "El dieléctrico bloquea la masa del electrón."
    ],
    "correctIndex": 0,
    "explanation": "Deducción canónica de la cátedra UNdeC (Apunte 04 Fig. 19): En moléculas no polares, el campo eléctrico externo E₀ desplaza los centros de carga positiva y negativa en sentidos opuestos, creando dipolos inducidos microscópicos (polarización electrónica). En el interior del material, la carga positiva de una molécula solapa con la negativa de la contigua cancelándose mutuamente; pero en las caras que tocan las placas metálicas no hay cancelación, formándose una densidad superficial de carga ligada σ_ind. Esta genera un campo interno opuesto E_ind, reduciendo el campo total a E = E₀ / Ke.",
    "distractorAnalysis": [
      "Opción correcta: polarización dipolar microscópica y generación de campo inducido opuesto.",
      "En un dieléctrico los electrones están fuertemente ligados, no hay flujo libre.",
      "La ionización solo ocurre si se supera la rigidez dieléctrica máxima (ruptura).",
      "No tiene relación con la masa del electrón."
    ],
    "hint": "Pensá en cómo se deforma una molécula neutra ante un campo externo: los protones son empujados a favor y los electrones en contra.",
    "formulaUsed": "E_neto = E₀ - E_ind = E₀ / Ke",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u5-facil",
    "unitNumber": 5,
    "level": "facil",
    "topic": "Resistencia Geométrica y Resistividad",
    "question": "Un cable de cobre cilíndrico de longitud L y sección transversal A tiene una resistencia R. Si se funde el metal y se vuelve a estirar en un cable del DOBLE de longitud (2L) conservando el mismo volumen total de cobre, ¿cuánto valdrá su nueva resistencia?",
    "options": [
      "4 · R",
      "2 · R",
      "R / 2",
      "8 · R"
    ],
    "correctIndex": 0,
    "explanation": "Como el volumen de cobre es constante (Vol = A · L), si la longitud se duplica (L' = 2L), el área debe reducirse a la mitad (A' = A/2). Luego: R' = ρ · L' / A' = ρ · (2L) / (A/2) = 4 · (ρ L / A) = 4R.",
    "distractorAnalysis": [
      "Opción correcta: duplica longitud y divide sección por 2, resultando en factor 4.",
      "Error típico: duplicó L pero olvidó que al estirarse el alambre se vuelve más fino.",
      "Invirtió la dependencia.",
      "El factor cúbico no corresponde a una sola dimensión."
    ],
    "hint": "Si estirás una masa de plastilina al doble de largo, ¿qué le pasa al grosor? El volumen se conserva.",
    "formulaUsed": "R = ρ · L / A con Vol = A · L = cte",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u5-medio",
    "unitNumber": 5,
    "level": "medio",
    "topic": "Potencia Disipada por Efecto Joule",
    "question": "Una resistencia calefactora de R = 44 Ω se conecta a la red eléctrica de 220 V. ¿Cuánta potencia eléctrica disipa en calor y qué corriente circula por ella?",
    "options": [
      "P = 1100 W (1,1 kW) e i = 5 A",
      "P = 550 W e i = 2,5 A",
      "P = 2200 W e i = 10 A",
      "P = 9680 W e i = 5 A"
    ],
    "correctIndex": 0,
    "explanation": "Por Ley de Ohm: i = V / R = 220 V / 44 Ω = 5,0 A. La potencia disipada por Efecto Joule es P = V · i = 220 V × 5 A = 1100 W (o P = V²/R = 220²/44 = 48400/44 = 1100 W).",
    "distractorAnalysis": [
      "Opción correcta: 220 / 44 = 5 A y 220 × 5 = 1100 W.",
      "Calculó la mitad de los valores.",
      "Duplicó la corriente.",
      "Multiplicó erróneamente V² sin dividir por R."
    ],
    "hint": "Usá i = V / R y luego P = V · i (o P = V² / R).",
    "formulaUsed": "P = V² / R = i² · R",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u5-intermedio",
    "unitNumber": 5,
    "level": "intermedio",
    "topic": "Conexión de Instrumentos de Medición",
    "question": "Un estudiante necesita medir la corriente y la tensión en una resistencia R conectada a una batería. ¿Cómo deben conectarse el Amperímetro y el Voltímetro y qué resistencias internas ideales deben poseer?",
    "options": [
      "Amperímetro en SERIE (con R_A → 0) y Voltímetro en PARALELO (con R_V → ∞)",
      "Amperímetro en PARALELO (con R_A → 0) y Voltímetro en SERIE (con R_V → ∞)",
      "Ambos en paralelo con resistencia nula",
      "Ambos en serie con resistencia infinita"
    ],
    "correctIndex": 0,
    "explanation": "El Amperímetro debe conectarse en SERIE para que toda la corriente del circuito lo atraviese, y su resistencia interna R_A debe tender a cero para no alterar la resistencia total. El Voltímetro debe conectarse en PARALELO entre los bornes del elemento para medir la diferencia de potencial, y su resistencia interna R_V debe tender a infinito para no desviar corriente de la rama analizada.",
    "distractorAnalysis": [
      "Opción correcta: Amperímetro en serie con RA=0 y Voltímetro en paralelo con RV=∞.",
      "Peligro mortal de laboratorio: conectar un amperímetro en paralelo provoca un CORTOCIRCUITO que quema el instrumento.",
      "Provocaría cortocircuito en toda la red.",
      "Dejaría el circuito abierto con corriente nula."
    ],
    "hint": "Pensá: para medir cuánta agua pasa por un caño tenés que poner el medidor en el medio del caño (serie).",
    "formulaUsed": "R_A(ideal) = 0 | R_V(ideal) = ∞",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u5-avanzado",
    "unitNumber": 5,
    "level": "avanzado",
    "topic": "Circuito RC en Régimen Transitorio",
    "question": "En un circuito RC serie conectado a una batería de fem ε a través de un interruptor que se cierra en t = 0 con el capacitor inicialmente descargado, ¿cuáles son los valores de la corriente i y de la tensión V_C en el capacitor en los instantes t = 0⁺ y t → ∞?",
    "options": [
      "En t = 0⁺: V_C = 0 e i = ε / R | En t → ∞: V_C = ε e i = 0",
      "En t = 0⁺: V_C = ε e i = 0 | En t → ∞: V_C = 0 e i = ε / R",
      "En ambos instantes: V_C = ε / 2 e i = ε / (2R)",
      "La corriente es constante en todo instante"
    ],
    "correctIndex": 0,
    "explanation": "En t = 0⁺ (recién cerrado el interruptor): el capacitor descargado no puede cambiar bruscamente su voltaje (q = 0 ⇒ V_C = 0), comportándose instantáneamente como un CABLE CORTOCIRCUITO; toda la fem cae en R, dando corriente máxima i_max = ε/R. Conforme se carga según q(t) = Cε(1 - e^(-t/RC)), la corriente decae exponencialmente. En t → ∞ (régimen estacionario): el capacitor completamente cargado a V_C = ε actúa como un CIRCUITO ABIERTO impidiendo el paso de corriente (i = 0).",
    "distractorAnalysis": [
      "Opción correcta: capacitor descargado es cortocircuito en t=0 y circuito abierto en t=infinito.",
      "Invirtió los comportamientos temporales.",
      "El régimen transitorio es exponencial, no promedio constante.",
      "La corriente no es constante en corriente continua con capacitores."
    ],
    "hint": "Recordá la analogía del tanque: al principio el tanque vacío no opone presión (V=0) y entra agua al máximo; al llenarse frena el flujo.",
    "formulaUsed": "q(t) = C·ε(1 - e^(-t/RC)) | i(t) = (ε/R)·e^(-t/RC)",
    "errorCategory": "limites"
  },
  {
    "id": "mcq-u5-dificil",
    "unitNumber": 5,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Lámparas que se Funden",
    "question": "Dos lámparas idénticas de 2 Ω están conectadas en PARALELO a una batería ideal de 8 V (r_int = 0). Si una de las lámparas se funde (su filamento se corta por completo), ¿qué sucede con el brillo y la potencia de la otra lámpara sana?",
    "options": [
      "La lámpara sana sigue brillando exactamente igual con la misma potencia de 32 W.",
      "La lámpara sana brilla el doble (64 W) porque recibe toda la corriente.",
      "La lámpara sana se apaga inmediatamente.",
      "La lámpara sana reduce su brillo a la mitad (16 W)."
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa clásica de examen (TP6 Ej. 4)! Al ser la batería ideal (r_interna = 0), la diferencia de potencial entre sus bornes es SIEMPRE 8 V constantes independientemente de la corriente que se le demande. Cada rama en paralelo es completamente independiente: la lámpara sana sigue conectada a 8 V, por lo que su corriente sigue siendo 8V / 2Ω = 4 A y su potencia sigue siendo (8V)² / 2Ω = 32 W. (Solo si la batería tuviera resistencia interna r > 0 cambiaría el voltaje).",
    "distractorAnalysis": [
      "Opción correcta: tensión constante de fuente ideal garantiza independencia de ramas en paralelo.",
      "Error muy común: creer que la corriente que iba a la otra lámpara se transfiere a la sana.",
      "Solo se apagaría si estuvieran en serie.",
      "No hay división de voltaje en paralelo."
    ],
    "hint": "La fuente es ideal (8 V constantes). ¿Qué voltaje recibe la lámpara sana antes y después de que se corte la otra?",
    "formulaUsed": "P = V² / R con V = constante",
    "errorCategory": "interpretacion"
  },
  {
    "id": "mcq-u5-final",
    "unitNumber": 5,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Mallas de Kirchhoff",
    "question": "En un circuito de dos mallas con dos fuentes de fem ε₁ = 12 V y ε₂ = 6 V enfrentadas con resistencias en las ramas, ¿cuál es el criterio riguroso de signos de cátedra para recorrer una malla ΣΔV = 0?",
    "options": [
      "Al atravesar una fuente de - a +: +ε; de + a -: -ε. Al atravesar un resistor a favor de la corriente elegida: -i·R; en contra de la corriente: +i·R.",
      "Todos los términos de la malla deben ser siempre positivos.",
      "Las fuentes siempre son negativas y las resistencias siempre positivas.",
      "El signo de la resistencia depende del tamaño de la batería."
    ],
    "correctIndex": 0,
    "explanation": "Regla de Kirchhoff de las Mallas (conservación de energía): Al recorrer la malla en un sentido dado: 1) En una fem: si entramos por el borne negativo (-) y salimos por el positivo (+), subimos de potencial (+ε); si entramos por el positivo y salimos por el negativo, caemos de potencial (-ε). 2) En un resistor: si nos movemos a favor de la corriente asignada, el potencial cae (-i·R); si nos movemos en contra de la corriente asignada, el potencial sube (+i·R).",
    "distractorAnalysis": [
      "Opción correcta: convención universal y de la cátedra UNdeC (Fig. 15 del Apunte 04).",
      "No se puede sumar todo positivo porque ΣΔV debe anularse en un circuito cerrado.",
      "Las fuentes pueden aportar o absorber energía (batería recargándose).",
      "El signo depende exclusivamente del sentido de recorrido vs sentido de corriente."
    ],
    "hint": "A favor de la corriente en una resistencia siempre perdés potencial (-iR). De - a + en una pila ganás potencial (+ε).",
    "formulaUsed": "Σ ΔV = 0 (Segunda Ley de Kirchhoff)",
    "errorCategory": "signo"
  },
  {
    "id": "mcq-u5-coloquio",
    "unitNumber": 5,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Verdadero Enunciado de la Ley de Ohm",
    "question": "En el coloquio el profesor pregunta: \"El estudiante promedio dice que la Ley de Ohm es V = i · R. ¿Por qué el apunte de cátedra recalca que eso NO es el enunciado de la Ley de Ohm y cuál es su verdadero significado físico?\".",
    "options": [
      "V = i·R es solo la definición general de resistencia para cualquier dispositivo (incluso no lineal); la verdadera Ley de Ohm es la propiedad empírica de ciertos materiales de mantener R estrictamente CONSTANTE e independiente de V y de i (gráfica V vs i recta que pasa por el origen).",
      "Porque la Ley de Ohm solo vale para corrientes alternas sinusoidales.",
      "Porque la relación verdadera es V = i² · R.",
      "Porque la Ley de Ohm fue refutada por Kirchhoff."
    ],
    "correctIndex": 0,
    "explanation": "Pregunta estelar de examen oral (Pág. 9 del apunte 04 del Prof. Chade Vergara): \"La relación V = i·R no es un enunciado de la Ley de Ohm; define la resistencia R para cualquier conductor (incluyendo un diodo o transistor semiconductor no óhmico). Un conductor obedece la Ley de Ohm sólo si su resistencia es una constante característica independiente del voltaje aplicado y de la corriente que lo atraviesa\".",
    "distractorAnalysis": [
      "Opción correcta: cita textual de la cátedra distinguiendo definición de ley física.",
      "Ohm desarrolló su ley en corriente continua.",
      "V = i²R es una fórmula dimensionalmente errónea.",
      "Kirchhoff complementó el análisis de circuitos, no refutó a Ohm."
    ],
    "hint": "¿Es un diodo un material óhmico? En un diodo V/i existe, pero ¿es constante?",
    "formulaUsed": "R = dV / di = constante (Conductor Óhmico)",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u6-facil",
    "unitNumber": 6,
    "level": "facil",
    "topic": "Fuerza de Lorentz y Trabajo Mecánico",
    "question": "Una carga eléctrica puntual q se mueve con velocidad constante v en el seno de un campo magnético estático y uniforme B. ¿Cuánto trabajo mecánico W realiza la fuerza magnética sobre la partícula a lo largo de su trayectoria?",
    "options": [
      "Exactamente 0 Joules (W = 0 en todo momento)",
      "W = q · v · B",
      "W = ½ m v²",
      "Depende del ángulo entre v y B"
    ],
    "correctIndex": 0,
    "explanation": "Por definición de la fuerza magnética de Lorentz: F⃗_B = q(v⃗ × B⃗). Por propiedad elemental del producto vectorial, F⃗_B es siempre estrictamente PERPENDICULAR a la velocidad v⃗ (y por ende al diferencial de desplazamiento ds⃗ = v⃗ dt). Por el Teorema del Trabajo: dW = F⃗_B · ds⃗ = |F| |ds| cos(90°) = 0. Un campo magnético estático puro NUNCA realiza trabajo mecánico sobre una partícula cargada y por lo tanto NO puede alterar su energía cinética ni su rapidez escalar.",
    "distractorAnalysis": [
      "Opción correcta: F es perpendicular al desplazamiento, luego W = 0 y rapidez constante.",
      "Confunde el módulo de la fuerza con trabajo.",
      "½mv² es la energía cinética, que no varía por acción magnética.",
      "Incluso para ángulos oblicuos la fuerza es siempre normal al vector velocidad instantáneo."
    ],
    "hint": "¿Cuál es el ángulo entre la fuerza magnética F = q(v × B) y el vector velocidad v? ¿Cuánto vale el coseno de 90°?",
    "formulaUsed": "dW = F⃗_B · ds⃗ = 0  ⇒  ΔK = 0",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u6-medio",
    "unitNumber": 6,
    "level": "medio",
    "topic": "Radio Ciclotrónico",
    "question": "Un protón (q = 1,6×10⁻¹⁹ C, m = 1,67×10⁻²⁷ kg) ingresa perpendicularmente a un campo magnético uniforme B = 0,20 T con velocidad v = 4,0×10⁶ m/s. ¿Cuál es el radio de su trayectoria circular?",
    "options": [
      "0,21 metros (21 cm)",
      "2,1 metros",
      "0,021 metros",
      "4,8 metros"
    ],
    "correctIndex": 0,
    "explanation": "La fuerza magnética actúa como fuerza centrípeta: q · v · B = m · v² / R  ⇒  R = m · v / (q · B). Reemplazando: R = (1,67 × 10⁻²⁷ kg · 4,0 × 10⁶ m/s) / (1,6 × 10⁻¹⁹ C · 0,20 T) = (6,68 × 10⁻²¹) / (3,2 × 10⁻²⁰) = 0,20875 m ≈ 0,21 m.",
    "distractorAnalysis": [
      "Opción correcta: R = mv / (qB) = 0,2088 m.",
      "Error de potencias de diez por factor 10.",
      "Error de coma decimal.",
      "Omitió dividir por el campo magnético B."
    ],
    "hint": "Igualá la fuerza de Lorentz q v B con la masa por aceleración centrípeta m v² / R.",
    "formulaUsed": "R = (m · v) / (q · B)",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u6-intermedio",
    "unitNumber": 6,
    "level": "intermedio",
    "topic": "Fuerza sobre un Conductor Rectilíneo",
    "question": "Un segmento de alambre recto de longitud L = 0,80 m transporta una corriente i = 5,0 A en presencia de un campo magnético uniforme B = 1,2 T formando un ángulo de 30° con la dirección de la corriente. ¿Cuál es la magnitud de la fuerza magnética que experimenta?",
    "options": [
      "2,4 N",
      "4,8 N",
      "4,15 N",
      "1,2 N"
    ],
    "correctIndex": 0,
    "explanation": "F = i · L · B · sin(θ). Reemplazando: F = (5,0 A) · (0,80 m) · (1,2 T) · sin(30°) = 4,8 N · 0,5 = 2,4 N.",
    "distractorAnalysis": [
      "Opción correcta: 5 × 0,8 × 1,2 × 0,5 = 2,4 N.",
      "Olvidó multiplicar por sin(30°) = 0,5.",
      "Multiplicó por cos(30°) ≈ 0,866 en lugar de sin(30°).",
      "Dividió por 2 dos veces."
    ],
    "hint": "La fuerza magnética sobre un cable con corriente lleva seno del ángulo: F = i L B sin(θ).",
    "formulaUsed": "F⃗ = i · (L⃗ × B⃗)  ⇒  |F| = i · L · B · sin(θ)",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u6-avanzado",
    "unitNumber": 6,
    "level": "avanzado",
    "topic": "Ley de Ampère en Solenoide Largo",
    "question": "Un solenoide ideal de longitud l = 40 cm tiene N = 800 espiras apretadas y transporta una corriente de i = 2,5 A. ¿Cuál es la intensidad del campo magnético B en el interior de su zona central?",
    "options": [
      "6,28 × 10⁻³ T (6,28 mT)",
      "1,57 × 10⁻³ T",
      "2,51 × 10⁻² T",
      "0,40 T"
    ],
    "correctIndex": 0,
    "explanation": "Para un solenoide: B = μ₀ · n · i = μ₀ · (N / l) · i. Densidad de espiras: n = 800 / 0,40 m = 2000 espiras/m. B = (4π × 10⁻⁷ T·m/A) · (2000 m⁻¹) · (2,5 A) = 4π × 10⁻⁷ · 5000 = 2π × 10⁻³ T ≈ 6,28 × 10⁻³ T = 6,28 mT.",
    "distractorAnalysis": [
      "Opción correcta: n = 800/0,40 = 2000 y B = μ₀ n i ≈ 6,28 mT.",
      "Omitió la corriente de 2,5 A o calculó mal n.",
      "Multiplicó por 40 cm en vez de pasar a metros (0,40 m).",
      "Omitió la constante μ₀."
    ],
    "hint": "Calculá primero n = N / l en espiras por metro (800 / 0,40 m) y luego aplicá B = μ₀ n i.",
    "formulaUsed": "B = μ₀ · (N / l) · i",
    "errorCategory": "unidades"
  },
  {
    "id": "mcq-u6-dificil",
    "unitNumber": 6,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Trayectoria Helicoidal",
    "question": "Un protón entra a una región de campo magnético uniforme B⃗ = B î con velocidad oblicua v⃗ = vx î + vz k̂. ¿Qué componente de la velocidad determina el radio de la hélice y qué componente determina el paso de avance (distancia entre vueltas)?",
    "options": [
      "El radio R = m vz / (q B) depende solo de vz (perpendicular a B); el paso p = vx · T depende solo de vx (paralela a B).",
      "El radio depende de la rapidez total v = √(vx² + vz²) y el paso depende de vz.",
      "Ambos dependen exclusivamente de la componente paralela vx.",
      "El campo B frena a vx hasta que queda una órbita circular plana."
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa clásica del TP N°7 Ej. 2! Como B⃗ apunta en el eje X: 1) La componente paralela vx tiene ángulo 0° con B (î × î = 0), por lo que NO experimenta fuerza magnética y avanza en MRU constante a lo largo del eje X, determinando el paso de la hélice p = vx · T. 2) La componente vz es perpendicular a B (k̂ × î = ĵ), sintiendo fuerza centrípeta y describiendo un MCU en el plano Y-Z con radio R = m vz / (qB).",
    "distractorAnalysis": [
      "Opción correcta: descompone el movimiento helicoidal en MRU axial y MCU transversal.",
      "Error común de parcial: usar la velocidad total √(vx² + vz²) en el radio del ciclo.",
      "La componente paralela no produce fuerza centrípeta.",
      "El campo magnético estático no frena componentes axiales."
    ],
    "hint": "El producto vectorial v × B anula la componente paralela a B. ¿Qué componente sobrevive en la fuerza?",
    "formulaUsed": "R = (m · v_perp) / (q · B) | p = v_paralela · (2πm / qB)",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u6-final",
    "unitNumber": 6,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Efecto Meissner en Superconductores",
    "question": "En un alambre superconductor de Niobio de radio R = 2,5 mm (TP7 Ej. 16), el estado superconductor se destruye si el campo magnético en su superficie supera B_crítico = 0,100 T. Usando la Ley de Ampère, ¿cuál es la máxima corriente eléctrica I_max que puede transportar sin perder la superconductividad?",
    "options": [
      "1250 A",
      "625 A",
      "2500 A",
      "157 A"
    ],
    "correctIndex": 0,
    "explanation": "Por la Ley de Ampère en una curva circular que rodea la superficie externa del cable (r = R): ∮ B · dl = B · (2πR) = μ₀ · I_max. Despejando: I_max = (B_crítico · 2π · R) / μ₀. Reemplazando: I_max = (0,100 T · 2π · 0,0025 m) / (4π × 10⁻⁷ T·m/A) = (0,0005π) / (4π × 10⁻⁷) = 0,0005 / (4 × 10⁻⁷) = 1250 A.",
    "distractorAnalysis": [
      "Opción correcta: aplicación de Ampère en el borde cilíndrico del superconductor.",
      "Omitió el factor 2 en 2πR.",
      "Multiplicó por 2 en vez de simplificar.",
      "Usó el diámetro en lugar del radio o calculó mal las potencias."
    ],
    "hint": "La Ley de Ampère en la superficie de un cable cilíndrico es B = μ₀ I / (2π R). Despejá I.",
    "formulaUsed": "B_superficial = (μ₀ · I) / (2π · R)",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u6-coloquio",
    "unitNumber": 6,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Inexistencia de Monopolos Magnéticos",
    "question": "En el coloquio te piden escribir la Segunda Ecuación de Maxwell: ∮ B⃗ · dA⃗ = 0 (Ley de Gauss del Magnetismo). ¿Cuál es su significado físico profundo y cómo se compara con ∮ E⃗ · dA⃗ = q_enc / ε₀?",
    "options": [
      "Establece que NO existen cargas magnéticas aisladas (monopolos magnéticos); las líneas de campo B son siempre bucles cerrados continuos sin principio ni fin, por lo que todo flujo que entra a una superficie cerrada obligatoriamente sale.",
      "Indica que el campo magnético siempre es cero en el vacío.",
      "Significa que los imanes no tienen fuerza fuera de la Tierra.",
      "Afirma que la corriente eléctrica no produce flujo magnético."
    ],
    "correctIndex": 0,
    "explanation": "Deducción canónica de examen oral: A diferencia del campo eléctrico, donde las cargas puntuales actúan como fuentes (flujo saliente de +q) o sumideros (flujo entrante de -q), en el magnetismo jamás se ha detectado un polo Norte o Sur aislado. Si cortamos un imán al medio, no aislamos los polos sino que obtenemos dos imanes completos con su par N-S. Por eso, cualquier superficie cerrada que tracemos encierra un número idéntico de líneas entrantes y salientes, haciendo que el flujo neto sea idénticamente cero: ∮ B · dA = 0.",
    "distractorAnalysis": [
      "Opción correcta: fundamenta la inexistencia de monopolos y la topología cerrada de las líneas de B.",
      "El campo B puede ser muy intenso en el vacío (ej. alrededor de un cable).",
      "No tiene relación con la gravedad terrestre.",
      "Las corrientes sí producen flujo a través de superficies abiertas."
    ],
    "hint": "Si cortás un imán por la mitad, ¿obtenés un polo norte solo o dos imanes con norte y sur?",
    "formulaUsed": "∮ B⃗ · dA⃗ = 0 (Líneas cerradas solenoides)",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u7-facil",
    "unitNumber": 7,
    "level": "facil",
    "topic": "Significado Físico del Signo Menos en la Ley de Faraday-Lenz",
    "question": "En la Ley de Inducción de Faraday ε = -dΦB / dt, ¿qué representa físicamente el signo MENOS según la Ley de Lenz?",
    "options": [
      "El principio de Conservación de la Energía: la corriente inducida genera un campo magnético propio que se OPONE al CAMBIO del flujo magnético original que la produjo.",
      "Que la fem inducida siempre tiene valor numérico negativo en Volts.",
      "Que el campo magnético inducido siempre apunta hacia abajo.",
      "Que la resistencia del circuito se vuelve negativa."
    ],
    "correctIndex": 0,
    "explanation": "El signo menos es la formulación matemática de la Ley de Lenz: si la corriente inducida ayudara al cambio de flujo (signo +), bastaría una perturbación infinitesimal para acelerar espontáneamente el sistema generando energía infinita de la nada. Por tanto, el efecto inducido se opone SIEMPRE a la CAUSA que lo genera para respetar la conservación de la energía.",
    "distractorAnalysis": [
      "Opción correcta: oposición al cambio de flujo impuesta por la conservación de la energía.",
      "La fem puede ser positiva o negativa según el signo de la derivada dΦB/dt.",
      "La dirección depende de si el flujo está aumentando o disminuyendo.",
      "La resistencia física siempre es positiva."
    ],
    "hint": "¿Qué pasaría con la energía si la corriente inducida empujara al imán más rápido hacia adentro?",
    "formulaUsed": "ε = -N · (dΦB / dt)",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u7-medio",
    "unitNumber": 7,
    "level": "medio",
    "topic": "Cálculo de Fem Inducida por Campo Variable",
    "question": "Una bobina plana de N = 200 vueltas circulares de radio R = 10 cm está orientada perpendicularmente a un campo magnético que varía linealmente de B₁ = 0,20 T a B₂ = 0,80 T en un intervalo de tiempo Δt = 0,40 segundos. ¿Cuál es el módulo de la fem inducida media?",
    "options": [
      "9,42 Volts",
      "4,71 Volts",
      "18,85 Volts",
      "0,30 Volts"
    ],
    "correctIndex": 0,
    "explanation": "Área de una espira: A = π · R² = π · (0,10 m)² = 0,01π m² ≈ 0,031416 m². Cambio de campo: ΔB = 0,80 - 0,20 = 0,60 T. Rapidez de cambio: ΔB/Δt = 0,60 / 0,40 = 1,5 T/s. Fem inducida: |ε| = N · A · (ΔB/Δt) = 200 · (0,01π) · 1,5 = 3π V ≈ 9,42 V.",
    "distractorAnalysis": [
      "Opción correcta: 200 × (0,01π) × 1,5 = 9,42 V.",
      "Olvidó multiplicar por el número de espiras N o dividió por 2.",
      "Duplicó el valor.",
      "Omitió el área de la espira."
    ],
    "hint": "Calculá el área de la espira A = π R², luego ΔB/Δt, y aplicá |ε| = N · A · (ΔB / Δt).",
    "formulaUsed": "|ε| = N · A · (ΔB / Δt)",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u7-intermedio",
    "unitNumber": 7,
    "level": "intermedio",
    "topic": "Sentido de la Corriente Inducida (Lenz en Cara N/S)",
    "question": "Se acerca el polo Norte de un imán recto hacia el plano de una espira conductora fija. Visto desde la posición del imán, ¿en qué sentido circula la corriente inducida y qué polo magnético forma esa cara de la espira?",
    "options": [
      "Circula en sentido ANTIHORARIO, formando un polo NORTE que repele al imán que se acerca.",
      "Circula en sentido HORARIO, formando un polo SUR que atrae al imán.",
      "Circula en sentido horario formando un polo Norte.",
      "No se induce corriente porque la espira está fija."
    ],
    "correctIndex": 0,
    "explanation": "Por la Ley de Lenz, la espira debe oponerse al acercamiento del polo Norte (aumento de flujo saliente hacia la espira). Para oponerse, la cara de la espira que mira al imán debe convertirse en un polo NORTE de repulsión. Por la regla de la mano derecha, un polo Norte corresponde a una corriente circulando en sentido ANTIHORARIO vista de frente.",
    "distractorAnalysis": [
      "Opción correcta: polo Norte repele al Norte que se acerca, corriente antihoraria.",
      "Si formara polo Sur lo atraería acelerándolo solo, violando la termodinámica.",
      "La regla mnemotécnica de la letra N tiene flechas antihorarias en sus puntas.",
      "El movimiento relativo imán-espira induce fem sin importar cuál de los dos se mueva."
    ],
    "hint": "Para frenar al polo Norte que se acerca, ¿con qué polo debe responder la cara de la espira?",
    "formulaUsed": "Regla de Lenz: Cara Norte = Sentido Antihorario",
    "errorCategory": "signo"
  },
  {
    "id": "mcq-u7-avanzado",
    "unitNumber": 7,
    "level": "avanzado",
    "topic": "Fem de Movimiento: Barra sobre Rieles Conductores",
    "question": "Una barra conductora de longitud l = 0,50 m desliza sin fricción a velocidad constante v = 4,0 m/s sobre dos rieles horizontales paralelos en un campo magnético uniforme B = 0,80 T perpendicular al plano de los rieles. Los rieles se cierran sobre una resistencia R = 2,0 Ω. ¿Cuánto valen la corriente inducida i, la fuerza externa aplicada F_ap y la potencia mecánica disipada?",
    "options": [
      "i = 0,80 A | F_ap = 0,32 N | P = 1,28 W",
      "i = 1,60 A | F_ap = 0,64 N | P = 2,56 W",
      "i = 0,80 A | F_ap = 0 N | P = 0 W",
      "i = 0,40 A | F_ap = 0,16 N | P = 0,64 W"
    ],
    "correctIndex": 0,
    "explanation": "Problema central de cátedra (Unidad 8 Diapo 15): 1) Fem inducida: |ε| = B · l · v = 0,80 T · 0,50 m · 4,0 m/s = 1,60 V. 2) Corriente: i = |ε| / R = 1,60 V / 2,0 Ω = 0,80 A. 3) Fuerza magnética frenadora: F_B = i · l · B = 0,80 A · 0,50 m · 0,80 T = 0,32 N. Para mantener v constante (a = 0), la fuerza externa aplicada debe equilibrarla: F_ap = 0,32 N. 4) Potencia mecánica: P_mec = F_ap · v = 0,32 N · 4,0 m/s = 1,28 W, que coincide exactamente con la disipación térmica por Joule en la resistencia: P_eléc = i² R = (0,80)² · 2 = 1,28 W.",
    "distractorAnalysis": [
      "Opción correcta: deduce ε=1,6V, i=0,8A, F=0,32N y verifica P_mec = P_elec = 1,28W.",
      "Duplicó la fem o dividió erróneamente.",
      "Ignoró la fuerza magnética de frenado F = i l B.",
      "Calculó la mitad de los valores."
    ],
    "hint": "Calculá primero ε = B l v, luego i = ε/R, luego F = i l B, y finalmente P = F v.",
    "formulaUsed": "|ε| = B · l · v | F_ap = (B² l² v) / R | P = (B² l² v²) / R",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u7-dificil",
    "unitNumber": 7,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Circuito Abierto en Barra Móvil",
    "question": "En el sistema de rieles de la pregunta anterior con la barra moviéndose a v = 4,0 m/s, se corta el cable de la resistencia (circuito ABIERTO, R → ∞). ¿Qué sucede con la fem inducida entre los extremos de la barra y con la fuerza necesaria para mantener la velocidad constante?",
    "options": [
      "La diferencia de potencial inducida ε = 1,60 V SIGUE EXISTIENDO entre los extremos de la barra, pero como la corriente es nula (i = 0), la fuerza magnética de frenado vale cero (F_ap = 0 N) y no hace falta empujarla para mantener v constante.",
      "Tanto la fem inducida como la fuerza desaparecen y valen cero.",
      "La barra se frena instantáneamente por choque eléctrico.",
      "La fem se hace infinita al estar abierto el circuito."
    ],
    "correctIndex": 0,
    "explanation": "¡Pregunta favorita de tribunal de final! La fem ε = B·l·v se genera por la separación de cargas dentro del metal debido a la fuerza magnética de Lorentz q(v × B) que empuja electrones a un extremo de la barra hasta equilibrarse con el campo eléctrico inducido. Por tanto, la diferencia de potencial de 1,60 V entre extremos existe SIEMPRE que la barra se mueva en el campo. Sin embargo, al estar abierto el circuito, los electrones no pueden circular en bucle cerrado (i = 0 A); sin corriente neta circulando, la fuerza frenadora F = i·l·B vale CERO y por la 1ra Ley de Newton la barra se mueve por inercia sin requerir fuerza externa.",
    "distractorAnalysis": [
      "Opción correcta: distingue con precisión entre fem inducida (separación de cargas) y corriente inducida.",
      "Confunde fem con corriente: la fem existe como la tensión en bornes de una pila sin conectar.",
      "Sin corriente no hay fuerza magnética de frenado.",
      "La fem depende de B, l y v, no de la resistencia externa."
    ],
    "hint": "Pensá en una batería desconectada en tu mesa: ¿tiene 1,5 V aunque no circule corriente?",
    "formulaUsed": "ε = B · l · v (independiente de R) | F_B = i · l · B = 0 si i = 0",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u7-final",
    "unitNumber": 7,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Generador de Corriente Alterna",
    "question": "Una espira rectangular de N = 50 vueltas y área A = 0,04 m² gira a velocidad angular constante ω = 100 rad/s alrededor de un eje perpendicular a un campo magnético uniforme B = 0,50 T. ¿Cuál es la expresión instantánea de la fem inducida ε(t) y su valor pico ε_máx?",
    "options": [
      "ε(t) = 100 · sin(100 t) V  con  ε_máx = 100 V",
      "ε(t) = 50 · cos(100 t) V  con  ε_máx = 50 V",
      "ε(t) = 200 · sin(100 t) V  con  ε_máx = 200 V",
      "ε(t) = 10 · sin(100 t) V  con  ε_máx = 10 V"
    ],
    "correctIndex": 0,
    "explanation": "Flujo instantáneo: ΦB(t) = B · A · cos(ω t). Por la Ley de Faraday: ε(t) = -N · (dΦB / dt) = -N · B · A · [-ω · sin(ω t)] = N · B · A · ω · sin(ω t). El valor máximo es ε_máx = N · B · A · ω = 50 · (0,50 T) · (0,04 m²) · (100 rad/s) = 100 V. Quedando ε(t) = 100 · sin(100 t) V. Este es el principio de todos los alternadores y generadores de energía hidroeléctrica y eólica.",
    "distractorAnalysis": [
      "Opción correcta: ε_max = N B A ω = 50 × 0,5 × 0,04 × 100 = 100 V.",
      "Olvidó multiplicar por el factor 2 de N o calculó mal.",
      "Duplicó el voltaje máximo.",
      "Omitió la velocidad angular ω en la amplitud pico."
    ],
    "hint": "Derivá el flujo Φ = B A cos(ωt) respecto al tiempo y aplicá la regla de la cadena.",
    "formulaUsed": "ε_máx = N · B · A · ω",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u7-coloquio",
    "unitNumber": 7,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Corriente de Desplazamiento de Maxwell",
    "question": "Frente al tribunal te piden: \"Escriba la Ley de Ampère-Maxwell ∮ B⃗ · ds⃗ = μ₀ i + μ₀ ε₀ (dΦE / dt). Explique por qué la Ley de Ampère original fallaba al aplicarse a un capacitor durante su proceso de carga y cómo Maxwell resolvió esta paradoja\".",
    "options": [
      "Ampère clásico daba resultados contradictorios según la superficie abierta elegida: si la superficie cruzaba el cable medía i, pero si pasaba entre las placas del capacitor (donde no pasan electrones) daba 0; Maxwell demostró que el campo eléctrico variable entre placas dΦE/dt actúa como una corriente de desplazamiento id = ε₀(dΦE/dt) exactamente igual a i, restableciendo la continuidad.",
      "Maxwell demostró que los capacitores no pueden cargarse con corriente continua.",
      "La paradoja era que los cables no tenían resistencia.",
      "Maxwell eliminó la corriente ordinaria i reemplazándola totalmente por ondas de luz."
    ],
    "correctIndex": 0,
    "explanation": "Deducción magistral de examen final (Apunte 06 del Prof. Chade Vergara, págs. 7-10): Al cargar un capacitor, consideramos un bucle ampariano alrededor del cable. Si apoyamos una superficie plana, el cable la perfora y ∮B·ds = μ₀ i. Pero si inflamos la superficie como una bolsa para que pase entre las placas del capacitor, ningún electrón atraviesa la bolsa (i = 0), violando el Teorema de Stokes. Maxwell argumentó que mientras se carga el capacitor, el campo eléctrico entre placas aumenta (dE/dt > 0). Calculando: id = ε₀ · dΦE/dt = ε₀ · d(E·A)/dt = ε₀ · A · d(Q / [ε₀A])/dt = dQ/dt = i. La corriente de desplazamiento continúa exactamente la corriente de conducción, unificando la electrodinámica.",
    "distractorAnalysis": [
      "Opción correcta: fundamenta la contradicción de superficies abiertas en el capacitor y demuestra que id = dQ/dt = i.",
      "Los capacitores sí se cargan en transitorios de CC.",
      "La resistencia del cable no altera la paradoja de Stokes.",
      "Maxwell sumó ambos términos (i + id), no eliminó la corriente real."
    ],
    "hint": "Pensá en dos superficies apoyadas en el mismo aro: una corta el cable y la otra pasa entre las placas sin tocar metal.",
    "formulaUsed": "i_d = ε₀ · (dΦE / dt) = dq / dt",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u8-facil",
    "unitNumber": 8,
    "level": "facil",
    "topic": "Definición de Autoinductancia y Unidades",
    "question": "¿Qué mide físicamente la Autoinductancia L de una bobina y cuál es su unidad en el Sistema Internacional?",
    "options": [
      "Mide la oposición de la bobina a los cambios en su propia corriente eléctrica; su unidad es el Henry [H = V · s / A = Wb / A].",
      "Mide la resistencia térmica del bobinado en Ohms.",
      "Mide la cantidad de carga electrostática atrapada en Coulombs.",
      "Mide la velocidad de giro de los electrones en Tesla."
    ],
    "correctIndex": 0,
    "explanation": "La autoinductancia L = N·ΦB / i mide la inercia electromagnética de un circuito frente a variaciones de su corriente, generando una fem autoinducida ε_L = -L(di/dt). Su unidad es el Henry (H), equivalente a Volt·segundo/Ampere o Weber/Ampere.",
    "distractorAnalysis": [
      "Opción correcta: definición física rigurosa y unidades en el SI.",
      "La resistencia óhmica disipa energía en calor, el inductor almacena energía magnética reversiblemente.",
      "La inductancia no es carga electrostática.",
      "Tesla es unidad de campo magnético B."
    ],
    "hint": "Recordá que la fem autoinducida es ε = -L (di/dt). Despejá las unidades de L: [Volt] / [A/s].",
    "formulaUsed": "L = N · ΦB / i | [H] = [V · s / A]",
    "errorCategory": "unidades"
  },
  {
    "id": "mcq-u8-medio",
    "unitNumber": 8,
    "level": "medio",
    "topic": "Energía Almacenada en un Inductor",
    "question": "Por un inductor de inductancia L = 4,0 Henry circula una corriente continua estacionaria de i = 3,0 A. ¿Cuánta energía magnética almacena en su campo B?",
    "options": [
      "18 Joules",
      "36 Joules",
      "12 Joules",
      "6 Joules"
    ],
    "correctIndex": 0,
    "explanation": "U_B = ½ · L · i² = ½ · (4,0 H) · (3,0 A)² = 2,0 · 9 = 18 Joules.",
    "distractorAnalysis": [
      "Opción correcta: ½ × 4 × 3² = 18 J.",
      "Olvidó el factor 1/2 de la fórmula ½ L i².",
      "Multiplicó L por i sin elevar al cuadrado.",
      "Dividió por 3."
    ],
    "hint": "Usá la fórmula análoga a la cinética: U_B = ½ L i².",
    "formulaUsed": "U_B = ½ · L · i²",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u8-intermedio",
    "unitNumber": 8,
    "level": "intermedio",
    "topic": "Dependencia Geométrica en un Solenoide",
    "question": "Si duplicamos el número de vueltas N de un solenoide manteniendo exactamente constantes su longitud l y su sección transversal A, ¿cómo cambia su autoinductancia L?",
    "options": [
      "Se cuadruplica (L_nueva = 4 · L₀)",
      "Se duplica (L_nueva = 2 · L₀)",
      "Permanece constante",
      "Se octuplica"
    ],
    "correctIndex": 0,
    "explanation": "Para un solenoide: B = μ₀ (N/l) i y el flujo por espira es ΦB = B·A = μ₀ (N/l) i A. La inductancia total es L = N · ΦB / i = μ₀ · (N² / l) · A. Como L es proporcional al CUADRADO del número de espiras (L ∝ N²), duplicar N multiplica L por 2² = 4.",
    "distractorAnalysis": [
      "Opción correcta: L es cuadrática con N (L ∝ N²), luego 2² = 4.",
      "Error muy común: creer que L es lineal con N como el largo de un cable.",
      "No permanece constante.",
      "El factor 8 correspondería a duplicar 3 variables a la vez."
    ],
    "hint": "Escribí la fórmula de la inductancia del solenoide: L = μ₀ N² A / l. ¿A qué potencia está elevada N?",
    "formulaUsed": "L = μ₀ · n² · l · A = μ₀ · (N² / l) · A",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u8-avanzado",
    "unitNumber": 8,
    "level": "avanzado",
    "topic": "Constante de Tiempo Inductiva en Circuito RL",
    "question": "En un circuito serie compuesto por una batería de 12 V, una resistencia R = 6,0 Ω y un inductor L = 1,8 H, ¿cuál es la constante de tiempo inductiva τ y qué corriente circula luego de transcurrido un tiempo t = τ tras cerrar el interruptor?",
    "options": [
      "τ = L / R = 0,30 s  e  i(τ) = 1,26 A (el 63,2% de la corriente final de 2,0 A)",
      "τ = R · L = 10,8 s  e  i(τ) = 2,0 A",
      "τ = 0,30 s  e  i(τ) = 0,74 A",
      "τ = 1,8 s  e  i(τ) = 1,0 A"
    ],
    "correctIndex": 0,
    "explanation": "La constante de tiempo inductiva es τ = L / R = 1,8 H / 6,0 Ω = 0,30 s. La corriente máxima estacionaria es i_max = ε / R = 12 V / 6 Ω = 2,0 A. La ecuación temporal de crecimiento es i(t) = i_max · (1 - e^(-t/τ)). En t = τ: i(τ) = 2,0 A · (1 - e⁻¹) = 2,0 · (1 - 0,368) = 2,0 · 0,632 ≈ 1,26 A.",
    "distractorAnalysis": [
      "Opción correcta: τ = L/R = 0,30 s y alcanza el 63,2% de la corriente máxima (1,26 A).",
      "Confundió τ con el producto R·C de los capacitores.",
      "0,74 A es el 36,8% (lo que falta para llegar al máximo).",
      "Cálculo incorrecto de la constante de tiempo."
    ],
    "hint": "En circuitos inductivos τ = L / R (a diferencia de RC donde τ = R · C). En t = τ la función 1 - e⁻¹ vale 0,632.",
    "formulaUsed": "τ = L / R | i(t) = (ε / R) · (1 - e^(-t/τ))",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u8-dificil",
    "unitNumber": 8,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Signo del Potencial en un Inductor",
    "question": "Por un inductor de L = 2 H circula una corriente i dirigida del borne A hacia el borne B. Si la corriente está DISMINUYENDO a razón de di/dt = -5 A/s, ¿cuál de los bornes se encuentra a mayor potencial eléctrico?",
    "options": [
      "El borne B (de salida) está a mayor potencial que A (V_B > V_A), porque el inductor actúa como fuente intentando sostener la corriente.",
      "El borne A siempre está a mayor potencial porque por allí entra la corriente.",
      "Ambos bornes están al mismo potencial.",
      "El potencial es cero porque el inductor no tiene resistencia."
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa reina de exámenes de la cátedra UNdeC (Unidad 9 Diapo 6)! Un inductor NO es un resistor. La fem autoinducida se opone al CAMBIO: como la corriente va de A a B pero está decreciendo (di/dt < 0), el inductor genera una fem en el MISMO sentido de la corriente para evitar que caiga. Esto significa que empuja las cargas hacia B, actuando como una batería cuyo borne positivo (+) es B y el negativo (-) es A. Por tanto, V_B > V_A.",
    "distractorAnalysis": [
      "Opción correcta: analiza di/dt < 0 y la función generadora del inductor que eleva el potencial hacia la salida.",
      "Trata al inductor erróneamente como un resistor donde el potencial siempre cae.",
      "Solo están al mismo potencial si di/dt = 0 (corriente constante).",
      "El voltaje de autoinducción es L(di/dt), independiente de la resistencia del cable."
    ],
    "hint": "El inductor se resiste a que la corriente baje: ¿hacia dónde debe empujar una batería para sostener la corriente que va de A a B?",
    "formulaUsed": "V_A - V_B = L · (di / dt) = 2 · (-5) = -10 V  ⇒  V_B = V_A + 10 V",
    "errorCategory": "signo"
  },
  {
    "id": "mcq-u8-final",
    "unitNumber": 8,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: Resonancia en Circuito RLC Serie",
    "question": "Un circuito RLC serie alimentado por un generador de corriente alterna V(t) = V₀ · sin(ω t) tiene R = 10 Ω, L = 25 mH y C = 10 μF. ¿Cuál es la frecuencia angular de resonancia ω₀ y cuánto vale la impedancia total Z del circuito en dicha frecuencia?",
    "options": [
      "ω₀ = 2000 rad/s  y  Z = R = 10 Ω (impedancia mínima puramente resistiva)",
      "ω₀ = 1000 rad/s  y  Z = 0 Ω",
      "ω₀ = 4000 rad/s  y  Z = 50 Ω",
      "ω₀ = 500 rad/s   y  Z = 20 Ω"
    ],
    "correctIndex": 0,
    "explanation": "En resonancia de un circuito RLC serie, la reactancia inductiva se cancela exactamente con la reactancia capacitiva: X_L = X_C ⇒ ω₀ L = 1 / (ω₀ C) ⇒ ω₀ = 1 / √(L · C). Reemplazando: L · C = (25 × 10⁻³ H) · (10 × 10⁻⁶ F) = 2,5 × 10⁻⁷ s² = 25 × 10⁻⁸ s². Sacando raíz: √(L C) = 5 × 10⁻⁴ s. Luego ω₀ = 1 / (5 × 10⁻⁴) = 2000 rad/s. En resonancia X_L - X_C = 0, por lo que la impedancia Z = √[R² + (X_L - X_C)²] = √[R² + 0] = R = 10 Ω, alcanzando la máxima corriente posible en fase con la tensión.",
    "distractorAnalysis": [
      "Opción correcta: ω₀ = 1/√(LC) = 2000 rad/s y Z = R = 10 Ω.",
      "La impedancia nunca puede ser cero porque siempre existe la resistencia óhmica R.",
      "Cálculo erróneo de la raíz cuadrada.",
      "Frecuencia angular mal despejada."
    ],
    "hint": "En resonancia XL = XC, por lo que la impedancia se reduce únicamente a la resistencia R.",
    "formulaUsed": "ω₀ = 1 / √(L · C) | Z = √[R² + (ωL - 1/ωC)²]",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u8-coloquio",
    "unitNumber": 8,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Clasificación de Materiales Magnéticos e Histéresis",
    "question": "En el pizarrón el tribunal te pide: \"Dibuje la Curva de Histéresis de un material ferromagnético y defina físicamente Magnetismo Remanente (B_r) y Campo Coercitivo (H_c). ¿Por qué los materiales diamagnéticos son repelidos por los imanes?\".",
    "options": [
      "En ferromagnéticos, los dominios quedan alineados tras retirar el campo (Remanencia B_r) y se requiere un campo inverso H_c para desmagnetizarlos; en diamagnéticos, el campo externo induce corrientes atómicas opuestas por Lenz que reducen el campo interior (Km < 1), provocando una fuerza de repulsión débil.",
      "Los diamagnéticos se repelen porque están cargados con electrones estáticos.",
      "La histéresis solo ocurre en el agua.",
      "El campo coercitivo es la resistencia eléctrica del imán."
    ],
    "correctIndex": 0,
    "explanation": "Demostración de cátedra (Unidad 9 Diapo 12-14): 1) Los materiales ferromagnéticos (Fe, Ni, Co) tienen dominios magnéticos de Weiss orientados por interacción de canje. Al aplicar un campo H crecen los dominios favorables hasta la saturación. Al retirar H, parte de la orientación no regresa a cero: es la inducción remanente B_r. Para anularla hay que aplicar un campo magnético inverso denominado campo coercitivo H_c. 2) En los diamagnéticos (todos los electrones apareados, μ_átomo = 0), un campo externo modifica las velocidades orbitales de los electrones induciendo dipolos contrarios al campo externo por Ley de Lenz (permeabilidad relativa Km < 1 levemente), provocando repulsión frente a polos magnéticos.",
    "distractorAnalysis": [
      "Opción correcta: define B_r, H_c a partir de los dominios de Weiss y fundamenta el diamagnetismo por inducción dipolar opuesta.",
      "El diamagnetismo es puramente magnético, no electrostático.",
      "La histéresis es característica de sólidos ferromagnéticos.",
      "El campo coercitivo tiene unidades de A/m o Oersted, no de resistencia en Ohms."
    ],
    "hint": "Remanente = lo que queda cuando apagás el campo externo. Coercitivo = lo que tenés que empujar al revés para borrarlo.",
    "formulaUsed": "B = μ₀ · (H + M) = Km · μ₀ · H",
    "errorCategory": "oral"
  },
  {
    "id": "mcq-u9-facil",
    "unitNumber": 9,
    "level": "facil",
    "topic": "Relación Fundamental de Ondas Electromagnéticas",
    "question": "Una estación de radio FM emite una onda electromagnética a una frecuencia f = 100 MHz (1,0 × 10⁸ Hz) en el aire/vacío. ¿Cuál es su longitud de onda λ?",
    "options": [
      "3,0 metros",
      "0,33 metros",
      "300 metros",
      "3,0 × 10¹⁶ metros"
    ],
    "correctIndex": 0,
    "explanation": "Todas las ondas electromagnéticas viajan a la velocidad de la luz c ≈ 3,0 × 10⁸ m/s en el vacío. Por la relación fundamental de ondas: c = λ · f  ⇒  λ = c / f = (3,0 × 10⁸ m/s) / (1,0 × 10⁸ s⁻¹) = 3,0 m.",
    "distractorAnalysis": [
      "Opción correcta: 3×10⁸ / 1×10⁸ = 3,0 metros.",
      "Invirtió el cociente f / c.",
      "Error de potencias con el prefijo Mega.",
      "Multiplicó la velocidad por la frecuencia."
    ],
    "hint": "Usá c = λ · f recordando que c = 3,0 × 10⁸ m/s y 100 MHz = 1,0 × 10⁸ Hz.",
    "formulaUsed": "c = λ · f  ⇒  λ = c / f",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u9-medio",
    "unitNumber": 9,
    "level": "medio",
    "topic": "Ley de Snell de la Refracción",
    "question": "Un haz de luz pasa desde el aire (n₁ = 1,00) hacia un bloque de vidrio crown (n₂ = 1,50) con un ángulo de incidencia θ₁ = 30° respecto a la normal. ¿Cuál es el ángulo de refracción θ₂ dentro del vidrio?",
    "options": [
      "19,47° (se acerca a la normal)",
      "45,00° (se aleja de la normal)",
      "30,00° (no se desvía)",
      "60,00°"
    ],
    "correctIndex": 0,
    "explanation": "Por la Ley de Snell: n₁ · sin(θ₁) = n₂ · sin(θ₂). Reemplazando: 1,00 · sin(30°) = 1,50 · sin(θ₂) ⇒ 0,50 = 1,50 · sin(θ₂) ⇒ sin(θ₂) = 0,50 / 1,50 = 1/3 ≈ 0,3333. Despejando: θ₂ = arcsin(0,3333) ≈ 19,47°. Al pasar a un medio más denso (n₂ > n₁), el rayo de luz se frena y se acerca a la normal.",
    "distractorAnalysis": [
      "Opción correcta: arcsin(1/3) = 19,47° acercándose a la recta normal.",
      "Se alejaría de la normal solo si pasara de vidrio a aire.",
      "Solo seguiría en 30° si los índices fueran iguales o si incidiera a 0°.",
      "Multiplicó por 1,5 en vez de dividir."
    ],
    "hint": "Aplicá n₁ sin(θ₁) = n₂ sin(θ₂). Despejá sin(θ₂) = (n₁/n₂) sin(θ₁).",
    "formulaUsed": "n₁ · sin(θ₁) = n₂ · sin(θ₂)",
    "errorCategory": "formula"
  },
  {
    "id": "mcq-u9-intermedio",
    "unitNumber": 9,
    "level": "intermedio",
    "topic": "Reflexión Total Interna y Ángulo Crítico",
    "question": "¿Bajo qué dos condiciones físicas ocurre el fenómeno de Reflexión Total Interna en una interfaz óptica?",
    "options": [
      "1) La luz debe viajar desde un medio de MAYOR índice a uno de MENOR índice (n₁ > n₂); 2) El ángulo de incidencia debe ser mayor que el ángulo crítico (θ₁ > θ_c con sin θ_c = n₂/n₁).",
      "La luz debe viajar desde el aire hacia el vidrio a cualquier ángulo.",
      "Solo ocurre con luz de color verde en espejos planos.",
      "Ocurre únicamente si los dos medios tienen exactamente el mismo índice de refracción."
    ],
    "correctIndex": 0,
    "explanation": "Para que exista ángulo crítico θ_c, en la Ley de Snell sin(θ₂) = (n₁/n₂) sin(θ₁) debe poder alcanzar 90° (sin 90° = 1), lo que exige obligatoriamente n₁ > n₂ (del medio más denso al menos denso, como de agua o vidrio al aire). Cuando θ₁ > θ_c, no existe solución real para θ₂ y el 100% de la energía de la onda se refleja de vuelta al medio original, base del funcionamiento de la fibra óptica.",
    "distractorAnalysis": [
      "Opción correcta: condiciones universales de n₁ > n₂ y θ₁ > θ_crítico.",
      "Del aire al vidrio (n₁ < n₂) el rayo se acerca a la normal y nunca alcanza 90°.",
      "Es un fenómeno puramente de interfaz, no de color exclusivo ni requiere metal.",
      "Si los índices son iguales no hay interfaz ni refracción."
    ],
    "hint": "¿Hacia dónde debe ir la luz para que el rayo refractado se aleje de la normal hasta rozar la superficie?",
    "formulaUsed": "sin(θ_c) = n₂ / n₁ con n₁ > n₂",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u9-avanzado",
    "unitNumber": 9,
    "level": "avanzado",
    "topic": "Vector de Poynting y Transporte de Energía",
    "question": "Una onda electromagnética plana en el vacío tiene una amplitud de campo eléctrico E_máx = 600 V/m. ¿Cuánto vale la amplitud de su campo magnético B_máx y la intensidad media transportada (módulo del vector de Poynting medio <S>)?",
    "options": [
      "B_máx = 2,0 μT  y  <S> = 478 W/m²",
      "B_máx = 1,8 × 10¹¹ T  y  <S> = 120 W/m²",
      "B_máx = 0,20 T  y  <S> = 900 W/m²",
      "B_máx = 2,0 μT  y  <S> = 955 W/m²"
    ],
    "correctIndex": 0,
    "explanation": "En una onda electromagnética plana en el vacío, E y B están relacionados por la velocidad de la luz: E = c · B  ⇒  B_máx = E_máx / c = (600 V/m) / (3,0 × 10⁸ m/s) = 2,0 × 10⁻⁶ T = 2,0 μT. La intensidad media transportada es el promedio temporal del vector de Poynting: <S> = E_máx² / (2 · μ₀ · c) = (600)² / [2 · (4π × 10⁻⁷) · (3 × 10⁸)] = 360.000 / (753,98) ≈ 477,5 W/m² ≈ 478 W/m².",
    "distractorAnalysis": [
      "Opción correcta: B = E/c = 2 μT e intensidad media S = E² / (2 μ₀ c) ≈ 478 W/m².",
      "Multiplicó por c en vez de dividir para hallar B.",
      "Valores de campo magnético desproporcionados.",
      "955 W/m² es el valor pico instantáneo sin el factor 1/2 del promedio temporal."
    ],
    "hint": "Recordá: B = E / c y la intensidad media es <S> = E_máx² / (2 μ₀ c).",
    "formulaUsed": "B_máx = E_máx / c | <S> = E_máx² / (2 · μ₀ · c)",
    "errorCategory": "algebraico"
  },
  {
    "id": "mcq-u9-dificil",
    "unitNumber": 9,
    "level": "dificil",
    "topic": "Trampa Clásica de Parcial: Ángulo de Incidencia en Snell",
    "question": "Un rayo de luz incide sobre la superficie horizontal de una piscina de agua (n = 1,33) formando un ángulo de 40° CON LA SUPERFICIE DEL AGUA. ¿Qué ángulo debe utilizarse en la Ley de Snell?",
    "options": [
      "50° (el ángulo respecto a la recta NORMAL a la superficie)",
      "40° (el ángulo dado directamente en el enunciado)",
      "90°",
      "10°"
    ],
    "correctIndex": 0,
    "explanation": "¡Trampa clásica número 1 de óptica geométrica! El enunciado dice con picardía: \"40° con la superficie del agua\". La Ley de Snell n₁ sin(θ₁) = n₂ sin(θ₂) exige ESTRICTAMENTE que los ángulos θ₁ y θ₂ se midan respecto a la recta NORMAL (perpendicular) a la superficie reflectora/refractora. Como la normal forma 90° con la superficie: θ_incidencia = 90° - 40° = 50°.",
    "distractorAnalysis": [
      "Opción correcta: 90° - 40° = 50° respecto a la normal.",
      "Trampa habitual: poner 40° directo en la calculadora y arruinar todo el ejercicio.",
      "90° sería paralelo a la normal.",
      "No tiene justificación."
    ],
    "hint": "Subrayá la frase: \"¿con la superficie o con la normal?\". La Ley de Snell siempre se mide desde la normal.",
    "formulaUsed": "θ_incidencia = 90° - θ_superficie",
    "errorCategory": "planteamiento"
  },
  {
    "id": "mcq-u9-final",
    "unitNumber": 9,
    "level": "final",
    "topic": "Problema Integrador de Examen Final: La Demostración de Maxwell de la Luz",
    "question": "En el apunte 06 oficial de la cátedra UNdeC (pág. 11), el Prof. Chade Vergara destaca el momento culminante del electromagnetismo cuando Maxwell dedujo la velocidad c a partir de constantes puramente electrostáticas y magnetostáticas: c = 1 / √(ε₀ · μ₀). Reemplazando ε₀ = 8,854 × 10⁻¹² C²/N·m² y μ₀ = 4π × 10⁻⁷ T·m/A, ¿qué velocidad exacta se obtiene y qué conclusión histórica extrajo Maxwell?",
    "options": [
      "c ≈ 2,998 × 10⁸ m/s; Maxwell concluyó que la Luz visible es una onda electromagnética transversal, unificando la Óptica con el Electromagnetismo.",
      "c = 340 m/s; Maxwell concluyó que la luz viaja a la velocidad del sonido.",
      "c = 1,5 × 10⁸ m/s; concluyó que la luz solo existe dentro de los metales.",
      "c = ∞; concluyó que la acción electrostática es instantánea."
    ],
    "correctIndex": 0,
    "explanation": "Cálculo histórico de cátedra: ε₀ · μ₀ = (8,854187 × 10⁻¹²) · (4π × 10⁻⁷) = 1,11265 × 10⁻¹⁷ s²/m². Al calcular 1 / √(1,11265 × 10⁻¹⁷) = 1 / (3,3356 × 10⁻⁹) = 2,9979 × 10⁸ m/s. Este número coincidió con asombrosa precisión con las mediciones astronómicas y mecánicas de la velocidad de la luz (Fizeau/Foucault), permitiendo a Maxwell escribir: \"Apenas podemos evitar la conclusión de que la luz consiste en las ondulaciones transversales del mismo medio que es la causa de los fenómenos eléctricos y magnéticos\".",
    "distractorAnalysis": [
      "Opción correcta: deducción numérica de c y unificación de la Óptica con el Electromagnetismo.",
      "340 m/s es la velocidad acústica en el aire.",
      "La velocidad en el vacío es universalmente 3×10⁸ m/s.",
      "La velocidad no es infinita, es finita e invariante."
    ],
    "hint": "Calculá 1 / √(ε₀ · μ₀): da la velocidad de la luz en el vacío ~ 300.000 km/s.",
    "formulaUsed": "c = 1 / √(ε₀ · μ₀) ≈ 2,9979 × 10⁸ m/s",
    "errorCategory": "conceptual"
  },
  {
    "id": "mcq-u9-coloquio",
    "unitNumber": 9,
    "level": "coloquio",
    "topic": "Defensa Oral de Tribunal: Propiedades de la Onda Electromagnética Plana",
    "question": "En el coloquio frente al tribunal de Física 2 te piden: \"Dibuje una onda electromagnética plana viajando en la dirección +x en el vacío. Indique las direcciones relativas de E⃗, B⃗ y de la velocidad de propagación c⃗, y demuestre por qué las ondas EM son TRANSVERSALES y no longitudinales\".",
    "options": [
      "Los vectores E⃗ y B⃗ son mutuamente perpendiculares entre sí y perpendiculares a la dirección de propagación (E⃗ × B⃗ apunta en la dirección de c⃗); son transversales porque las oscilaciones de los campos ocurren en el plano perpendicular a la dirección en que viaja la onda, no a lo largo de ella.",
      "Son longitudinales porque los campos apuntan en la misma dirección en que viaja la onda como el sonido.",
      "El campo E y el campo B son paralelos entre sí.",
      "En el vacío no existen ondas electromagnéticas porque no hay aire que oscile."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta modelo de examen oral: A partir de las ecuaciones de Maxwell en el vacío (sin cargas ni corrientes libres), ∇ · E = 0 y ∇ · B = 0 exigen que los campos no tengan componentes a lo largo de la dirección de propagación (Ex = 0, Bx = 0 si viaja en x), demostrando matemáticamente que la onda es estrictamente TRANSVERSAL. Si E⃗ oscila en el eje Y (Ey = E₀ sin(kx - ωt)) y B⃗ oscila en el eje Z (Bz = B₀ sin(kx - ωt)), el producto vectorial E⃗ × B⃗ apunta a lo largo del eje +x (dirección del Vector de Poynting S⃗ y de la velocidad de la luz c⃗). Además, están en fase y cumplen en todo instante E(t) = c · B(t).",
    "distractorAnalysis": [
      "Opción correcta: fundamenta la transversalidad a partir de las divergencias nulas de Maxwell y la ortogonalidad E ⊥ B ⊥ c.",
      "Las ondas acústicas son longitudinales; las electromagnéticas son transversales (por eso se pueden polarizar).",
      "E y B son perpendiculares entre sí, nunca paralelos.",
      "Las ondas EM no requieren medio material (viajan en el vacío absoluto a velocidad c)."
    ],
    "hint": "Pensá en los 3 ejes cartesianos: E en Y, B en Z, y la luz viaja en X. ¿Se puede polarizar una onda longitudinal?",
    "formulaUsed": "S⃗ = (1 / μ₀) · (E⃗ × B⃗) | E ⊥ B ⊥ c⃗",
    "errorCategory": "oral"
  }
];
