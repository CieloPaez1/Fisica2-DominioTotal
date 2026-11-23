package com.undec.fisica2.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OralTribunalService {

    public record TribunalCase(
            int unitNumber,
            String unitTitle,
            String titularQuestion,
            String jtpRepregunta,
            String boardDrawingInstruction,
            String expectedFormula,
            List<String> keyExpectedKeywords,
            List<String> expectedConceptualPoints,
            List<String> forbiddenTrapPhrases,
            String mortalMistakeNote
    ) {}

    public record RubricAxis(
            String axisName,
            int score,
            String comment
    ) {}

    public record TribunalEvaluationResult(
            String grade,
            int score,
            String feedback,
            List<String> expectedPoints,
            List<String> missingPoints,
            List<RubricAxis> rubricBreakdown,
            boolean triggeredMortalMistake
    ) {}

    private final Map<Integer, TribunalCase> casesByUnit = new LinkedHashMap<>();

    public OralTribunalService() {
        casesByUnit.put(1, new TribunalCase(
                1,
                "Unidad 1: Carga Eléctrica, Ley de Coulomb y Campo Eléctrico",
                "Pase al pizarrón y deduzca el campo eléctrico sobre el eje perpendicular (mediatriz) de una varilla delgada de longitud L con densidad lineal de carga uniforme +λ.",
                "Muy bien la integral, pero decime: ¿por qué pudiste cancelar la componente paralela a la varilla por simetría? ¿Qué pasaría con la dirección del campo total si la mitad derecha tuviera carga +λ y la mitad izquierda -λ?",
                "Dibujar ejes x-y, varilla sobre el eje, dos elementos simétricos dq₁ y dq₂, vectores dE₁ y dE₂ y su descomposición ortogonal.",
                "E = (1 / 4πε₀) · Q / [y · √(y² + (L/2)²)]",
                List.of("simetría", "cancela", "opuesto", "suman", "paralela", "vector", "integral", "coseno"),
                List.of(
                        "Plantear el diferencial de carga dq = λ dx y su distancia r = √(x² + y²) al punto de observación.",
                        "Justificar por paridad que para cada dq en +x existe otro en -x cuyas componentes paralelas se anulan.",
                        "Responder a la repregunta: si una mitad es +λ y la otra -λ, las componentes perpendiculares se cancelan y las paralelas SE SUMAN."
                ),
                List.of("se cancela igual", "da cero todo", "es escalar"),
                "Decir que se cancela igual porque la forma geométrica sigue siendo una varilla, o integrar el módulo de dE sin proyectar con coseno/seno."
        ));

        casesByUnit.put(2, new TribunalCase(
                2,
                "Unidad 2: Ley de Gauss y Conductores en Equilibrio",
                "Enuncie la Ley de Gauss en forma integral y deduzca en el pizarrón el campo eléctrico interior y exterior de un cilindro aislante infinito de radio R con densidad volumétrica uniforme ρ.",
                "Impecable el cilindro gaussiano. Pero ahora poné la mano sobre la mesa: si la superficie cilíndrica gaussiana no tuviera tapas cerradas o si el cilindro fuera corto de longitud L = 5 cm, ¿podrías despejar E sacándolo fuera de la integral? ¿Por qué?",
                "Dibujar corte transversal y longitudinal del cilindro, superficie gaussiana punteada de radio r < R y r > R, y versores normales dA en tapas y manto.",
                "r < R: E(r) = (ρ · r) / (2ε₀)  |  r ≥ R: E(r) = (ρ · R²) / (2ε₀ · r)",
                List.of("cerrada", "flujo", "simetría", "tapas", "perpendicular", "borde", "encerrada", "lineal"),
                List.of(
                        "La Ley de Gauss exige estrictamente una superficie CERRADA (∮ E·dA = Q_enc / ε₀).",
                        "Para r < R la carga encerrada es ρ·π·r²·L y el campo crece linealmente con r; para r > R decae como 1/r.",
                        "En un cilindro corto de 5 cm hay efectos de borde: el campo se curva en los extremos y no es uniforme ni perpendicular a las tapas, por lo que NO se puede despejar E de la integral."
                ),
                List.of("sí se puede sacar", "no importan las tapas"),
                "Sacar E fuera de la integral en un cilindro finito o usar el volumen total πR²L cuando r < R."
        ));

        casesByUnit.put(3, new TribunalCase(
                3,
                "Unidad 3: Potencial Eléctrico, Gradiente y Energía",
                "Defina la diferencia de potencial electrostático, explique el significado físico del signo menos en E = -∇V y grafique V(r) y E(r) para una esfera conductora cargada de radio R.",
                "Mirando tu gráfico: adentro de la esfera conductora pusiste que el campo eléctrico E es cero. Si E = 0 en todo el interior, ¿por qué el potencial V adentro NO vale cero sino que vale kQ/R constante?",
                "Trazar gráficas alineadas verticalmente de E(r) y V(r) mostrando la discontinuidad de E en r=R y la meseta constante de V(r) para r ≤ R.",
                "V_B - V_A = -∫ E · dl  |  E = -∇V  |  V_int = kQ / R = cte",
                List.of("derivada", "gradiente", "constante", "pendiente", "conservativo", "trabajo", "disminuye", "equipotencial"),
                List.of(
                        "El campo eléctrico es la derivada espacial negativa del potencial (E = -dV/dr).",
                        "Que la derivada sea cero (E = 0 en el interior) implica que la función primitiva V(r) es CONSTANTE, no necesariamente nula.",
                        "Como no cuesta trabajo mover una carga dentro del conductor desde la superficie r=R hasta el centro, V_interior = V_superficie = kQ/R."
                ),
                List.of("potencial adentro es cero", "v = 0 adentro"),
                "Afirmar que como E = 0 dentro del conductor, entonces el potencial V también es cero en el interior."
        ));

        casesByUnit.put(4, new TribunalCase(
                4,
                "Unidad 4: Capacidad, Condensadores y Dieléctricos",
                "Explique físicamente la polarización de un dieléctrico dentro de un capacitor de placas paralelas y deduzca cómo cambian el campo eléctrico, la tensión y la capacidad.",
                "Acabás de demostrar que C aumenta a κ·C₀. Ahora decime: si el capacitor permanece CONECTADO a una batería de 12 V mientras introducís el dieléctrico, la energía U = ½ C V² aumenta. ¿De dónde sale esa energía extra?",
                "Dibujar placas con carga libre ±σ_L, dipolos alineados en el dieléctrico, carga inducida de polarización ∓σ_P y vectores E₀, E_p y E_neto.",
                "C = κ · ε₀ · A / d  |  U = ½ C V² = Q² / (2C)",
                List.of("batería", "polarización", "fuente", "trabajo", "carga", "constante", "inducida", "reduce"),
                List.of(
                        "Los dipolos del dieléctrico generan un campo de polarización opuesto que reduce el campo neto a E = E₀/κ.",
                        "Con batería conectada (V = constante), la fuente inyecta carga adicional ΔQ = (κ - 1)C₀V a las placas.",
                        "La energía extra proviene del trabajo químico/eléctrico realizado por la batería al bombear esa carga adicional."
                ),
                List.of("la energía la crea el dieléctrico", "la carga se mantiene constante con batería"),
                "Confundir batería conectada (V = cte, U aumenta) con batería desconectada (Q = cte, U disminuye)."
        ));

        casesByUnit.put(5, new TribunalCase(
                5,
                "Unidad 5: Corriente Eléctrica, Kirchhoff y Transitorio RC",
                "Plantee la ecuación diferencial de carga de un circuito RC serie conectado a una fuente ideal ε, deduzca q(t) e i(t) y explique el significado físico de la constante de tiempo τ = R·C.",
                "Si en el instante t = 0⁺ el capacitor está totalmente descargado (q = 0), ¿por qué la corriente inicial es máxima (i = ε/R) en lugar de ser cero? ¿Qué leyes de conservación representan las dos reglas de Kirchhoff?",
                "Dibujar malla RC con interruptor, sentido de corriente, signos de caída en R y C, y curvas exponenciales de v_C(t) e i(t).",
                "q(t) = C·ε·(1 - e^(-t/RC))  |  i(t) = (ε/R)·e^(-t/RC)  |  τ = R·C",
                List.of("cortocircuito", "abierto", "carga", "energía", "exponencial", "tau", "kirchhoff", "caída"),
                List.of(
                        "En t = 0⁺ como q(0) = 0, la tensión en el capacitor es V_C = q/C = 0 (actúa como cortocircuito instantáneo) y toda la fem cae en R.",
                        "En t → ∞ el capacitor alcanza V_C = ε y bloquea la corriente (actúa como circuito abierto, i = 0).",
                        "1ª Ley de Kirchhoff (Nodos) = Conservación de la Carga; 2ª Ley de Kirchhoff (Mallas) = Conservación de la Energía."
                ),
                List.of("corriente inicial es cero", "capacitor descargado es circuito abierto"),
                "Tratar al capacitor descargado en t = 0⁺ como circuito abierto o decir que la corriente inicial es cero."
        ));

        casesByUnit.put(6, new TribunalCase(
                6,
                "Unidad 6: Campo Magnético, Fuerza de Lorentz y Efecto Hall",
                "Enuncie la expresión de la Fuerza de Lorentz sobre una partícula cargada, demuestre que un campo magnético estacionario no realiza trabajo mecánico y deduzca el radio de giro ciclotrónico.",
                "Demostraste que el radio es R = mv/(qB). Si ahora duplico la velocidad inicial con la que entra el protón al campo magnético, ¿tarda el doble de tiempo en completar una órbita circular?",
                "Dibujar vector velocidad v, campo magnético B (entrante ⊗), fuerza magnética F centrípeta perpendicular a v, y trayectoria circular de radio R.",
                "F = q(v × B)  |  R = (m · v) / (|q| · B)  |  T = (2π · m) / (|q| · B)",
                List.of("perpendicular", "trabajo", "cinética", "período", "independiente", "frecuencia", "centrípeta", "producto"),
                List.of(
                        "Como F = q(v × B) es siempre perpendicular a la velocidad v, la potencia P = F · v = 0 y el trabajo W = 0 (la energía cinética y rapidez son constantes).",
                        "Igualando fuerza magnética a fuerza centrípeta: qvB = mv²/R ⇒ R = mv/(qB).",
                        "El período T = 2πR/v = 2πm/(qB) se cancela con la velocidad v: es INDEPENDIENTE de la rapidez y del radio."
                ),
                List.of("tarda el doble", "aumenta su energía cinética", "acelera su rapidez"),
                "Afirmar que el campo magnético aumenta la energía cinética de la carga o que el período depende de la velocidad."
        ));

        casesByUnit.put(7, new TribunalCase(
                7,
                "Unidad 7: Fuentes de Campo Magnético (Biot-Savart y Ampère)",
                "Compare la Ley de Biot-Savart con la Ley de Ampère y deduzca en el pizarrón el campo magnético en el interior de un solenoide ideal muy largo de n espiras por unidad de longitud.",
                "¿Por qué no podés usar la Ley de Ampère (∮ B·dl = μ₀ I_enc) para calcular de forma directa el campo magnético sobre el eje de una única espira circular de radio R?",
                "Dibujar corte longitudinal del solenoide, rectángulo amperiano ABCD con un lado dentro y otro fuera, e indicar los 4 tramos de la integral de línea.",
                "∮ B · dl = μ₀ · I_enc  |  B_solenoide = μ₀ · n · I",
                List.of("simetría", "circulación", "espira", "biot", "solenoide", "constante", "perpendicular", "concatenada"),
                List.of(
                        "En el rectángulo amperiano del solenoide solo contribuye el tramo interior paralelo al eje: B·L = μ₀(n·L·I) ⇒ B = μ₀·n·I.",
                        "La Ley de Ampère siempre es cierta, pero solo permite despejar B cuando existe alta simetría (hilo infinito, solenoide, toroide) donde |B| sea constante a lo largo de la curva.",
                        "En una única espira circular no existe ninguna curva cerrada simple sobre la cual B sea constante y tangente en todo su recorrido; debe integrarse Biot-Savart."
                ),
                List.of("ampere no se cumple en una espira", "el campo afuera del solenoide es igual al de adentro"),
                "Intentar despejar B en una espira simple sacándolo de la integral de Ampère sin simetría traslacional/cilíndrica."
        ));

        casesByUnit.put(8, new TribunalCase(
                8,
                "Unidad 8: Inducción Electromagnética, Faraday-Lenz y Autoinductancia",
                "Enuncie la Ley de Inducción de Faraday-Lenz, explique qué formas existen de variar el flujo magnético Φ_B y deduzca la energía magnética almacenada en un inductor L.",
                "Escribiste ε = -dΦ_B/dt. ¿Ese signo menos de la Ley de Lenz proviene del principio de conservación de qué magnitud física fundamental? ¿Qué pasaría físicamente si fuera un signo más (+)?",
                "Dibujar espira, imán acercándose, vector flujo Φ_B, vector variación dΦ/dt, campo inducido B_ind opuesto y sentido de la corriente inducida.",
                "ε = - dΦ_B / dt  |  ε_L = - L (di / dt)  |  U_B = ½ L · I²",
                List.of("energía", "conservación", "opone", "flujo", "variación", "inductor", "avalancha", "trabajo"),
                List.of(
                        "La fem inducida solo aparece cuando existe VARIACIÓN temporal del flujo magnético (por cambio de B, de área A o del ángulo θ).",
                        "El signo menos de Lenz proviene directamente del Principio de Conservación de la Energía.",
                        "Si el signo fuera positivo, la corriente inducida reforzaría el aumento de flujo, induciendo aún más corriente en una avalancha perpetua que crearía energía de la nada."
                ),
                List.of("convención matemática", "flujo constante induce fem"),
                "Decir que el signo menos es una mera convención matemática o que un campo magnético intenso pero constante induce corriente."
        ));

        casesByUnit.put(9, new TribunalCase(
                9,
                "Unidad 9: Corriente Alterna, Resonancia RLC y Ecuaciones de Maxwell",
                "Explique mediante diagrama de fasores un circuito RLC serie en corriente alterna, defina la condición de resonancia y explique cómo corrigió Maxwell la Ley de Ampère.",
                "En un circuito RLC serie exactamente en frecuencia de resonancia ω₀ = 1/√(LC), la impedancia es mínima Z = R. ¿Cuánto vale la diferencia de potencial instantánea entre los extremos del conjunto inductor-capacitor (L+C) juntos?",
                "Dibujar diagrama fasorial con I en eje real, V_R en fase, V_L adelantado +90° y V_C atrasado -90°, más el triángulo de impedancias.",
                "Z = √[R² + (ωL - 1/ωC)²]  |  ω₀ = 1 / √(L·C)  |  I_d = ε₀ (dΦ_E / dt)",
                List.of("resonancia", "fasores", "desfasado", "cero", "cancelan", "desplazamiento", "maxwell", "impedancia"),
                List.of(
                        "En resonancia X_L = X_C (ωL = 1/ωC), por lo que la reactancia neta es cero, Z = R y la corriente está en fase con la fuente (cos φ = 1).",
                        "Como V_L está a +90° y V_C a -90° respecto a la corriente, están desfasados 180° entre sí con igual módulo: su suma instantánea v_L(t) + v_C(t) es CERO en todo instante.",
                        "Maxwell agregó la corriente de desplazamiento I_d = ε₀ dΦ_E/dt a la Ley de Ampère para explicar la continuidad del campo magnético entre las placas de un capacitor."
                ),
                List.of("se suman algebraicamente", "en resonancia la corriente es cero"),
                "Sumar algebraicamente los módulos V_R + V_L + V_C ignorando el desfase vectorial de 90°/180° en los fasores."
        ));
    }

    public List<TribunalCase> getAllCases() {
        return new ArrayList<>(casesByUnit.values());
    }

    public TribunalCase getCaseForUnit(int unitNumber) {
        return casesByUnit.getOrDefault(unitNumber, casesByUnit.get(1));
    }

    public TribunalEvaluationResult evaluateDefense(int unitNumber, String initialDefense, String followUpDefense) {
        TribunalCase tCase = getCaseForUnit(unitNumber);
        String initClean = initialDefense == null ? "" : initialDefense.trim().toLowerCase();
        String followClean = followUpDefense == null ? "" : followUpDefense.trim().toLowerCase();
        String combined = initClean + " " + followClean;

        // 1. Detectar si cayó en una frase de error mortal
        boolean triggeredMortal = tCase.forbiddenTrapPhrases().stream()
                .anyMatch(combined::contains);

        // 2. Contar conceptos clave cubiertos
        List<String> matchedKeywords = tCase.keyExpectedKeywords().stream()
                .filter(combined::contains)
                .toList();

        List<String> missingKeywords = tCase.keyExpectedKeywords().stream()
                .filter(k -> !combined.contains(k))
                .toList();

        // 3. Evaluar los 5 ejes académicos de la rúbrica universitaria
        int conceptualScore = Math.min(100, (int) ((matchedKeywords.size() / (double) Math.max(1, tCase.keyExpectedKeywords().size())) * 115));
        int clarityScore = initClean.length() >= 100 ? 95 : initClean.length() >= 50 ? 75 : initClean.length() >= 20 ? 50 : 20;
        int followUpScore = followClean.length() >= 80 ? 95 : followClean.length() >= 40 ? 75 : followClean.length() >= 15 ? 45 : 15;
        boolean hasMathNotation = combined.contains("=") || combined.contains("/") || combined.contains("integral")
                || combined.contains("flujo") || combined.contains("cos") || combined.contains("derivada") || combined.contains("ley");
        int mathScore = hasMathNotation ? 90 : 55;
        int reasoningScore = triggeredMortal ? 20 : Math.min(100, (conceptualScore + followUpScore) / 2);

        if (triggeredMortal) {
            conceptualScore = Math.min(conceptualScore, 35);
        }

        int finalScore = (int) Math.round(
                0.30 * conceptualScore +
                0.15 * clarityScore +
                0.25 * followUpScore +
                0.15 * mathScore +
                0.15 * reasoningScore
        );

        List<RubricAxis> rubric = List.of(
                new RubricAxis("Precisión Conceptual", conceptualScore,
                        matchedKeywords.isEmpty() ? "Faltan términos físicos clave de la unidad." : "Conceptos detectados: " + String.join(", ", matchedKeywords)),
                new RubricAxis("Claridad de Desarrollo", clarityScore,
                        initClean.length() >= 80 ? "Planteo inicial estructurado y claro." : "Desarrollo inicial demasiado breve para pizarrón."),
                new RubricAxis("Defensa ante Repregunta", followUpScore,
                        followClean.length() >= 50 ? "Buena argumentación ante la objeción del JTP." : "Falta profundizar la justificación de la repregunta."),
                new RubricAxis("Formalismo Matemático", mathScore,
                        hasMathNotation ? "Incluye relaciones matemáticas/leyes explícitas." : "Conviene explicitar la ecuación o relación funcional."),
                new RubricAxis("Razonamiento Físico", reasoningScore,
                        triggeredMortal ? "¡Alerta! Se detectó un error conceptual grave." : "Coherencia física general mantenida.")
        );

        String grade;
        String feedback;
        if (triggeredMortal) {
            grade = "Insuficiente (Error Conceptual Crítico)";
            feedback = "⚠️ El tribunal detectó un error conceptual invalidante en tu defensa. Criterio de cátedra: " + tCase.mortalMistakeNote();
        } else if (finalScore >= 82 && initClean.length() >= 50 && followClean.length() >= 35) {
            grade = "Aprobado con Distinción (Sobresaliente)";
            feedback = "🏆 ¡Defensa de pizarrón impecable! Fundamentaste la ley física, justificaste las condiciones de validez y respondiste con solvencia la repregunta capciosa del tribunal.";
        } else if (finalScore >= 60 && initClean.length() >= 30 && followClean.length() >= 20) {
            grade = "Aprobado";
            feedback = "✅ Defensa aprobada. El planteo físico central es correcto. Para alcanzar nota de distinción en el coloquio final, reforzá los conceptos: " + String.join(", ", missingKeywords) + ".";
        } else {
            grade = "Insuficiente";
            feedback = "❌ El tribunal considera que la defensa aún está incompleta para aprobar el coloquio oral. Revisá los puntos clave de pizarrón y cuidate de esta trampa: " + tCase.mortalMistakeNote();
        }

        return new TribunalEvaluationResult(
                grade,
                finalScore,
                feedback,
                tCase.expectedConceptualPoints(),
                missingKeywords,
                rubric,
                triggeredMortal
        );
    }
}
