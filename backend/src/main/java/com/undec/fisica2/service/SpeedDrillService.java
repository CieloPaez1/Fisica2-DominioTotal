package com.undec.fisica2.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SpeedDrillService {

    public record SpeedDrillQuestion(
            String id,
            int unitNumber,
            String category,
            String difficulty,
            String prompt,
            List<String> options,
            int correctIndex,
            String explanation,
            String ruleHint
    ) {}

    private final List<SpeedDrillQuestion> questionBank = List.of(
            // UNIDAD 1: COULOMB Y CAMPO ELÉCTRICO
            new SpeedDrillQuestion(
                    "sd-1", 1, "unidades_si", "facil",
                    "Si la distancia entre dos cargas puntuales se reduce a la MITAD (r → r/2), ¿qué ocurre con el módulo de la fuerza de Coulomb?",
                    List.of("Se cuadruplica (4 F)", "Se duplica (2 F)", "Se reduce a la cuarta parte (F/4)", "No cambia"),
                    0,
                    "Por la ley de la inversa del cuadrado F ∝ 1/r², al dividir r por 2: 1/(1/2)² = 4.",
                    "F = k |q₁q₂| / r²."
            ),
            new SpeedDrillQuestion(
                    "sd-2", 1, "trampa_vf", "intermedio",
                    "En el punto medio exacto entre dos cargas IDÉNTICAS (+q y +q), ¿cuánto valen el campo eléctrico E y el potencial V?",
                    List.of("E = 0 y V = 2 kq / (d/2) ≠ 0", "E = 0 y V = 0", "E ≠ 0 y V = 0", "Ambos son infinitos"),
                    0,
                    "Los vectores campo E son opuestos y se cancelan (E = 0), pero el potencial V es escalar y se suma: V = V₁ + V₂ > 0.",
                    "Vectores opuestos se restan; escalares del mismo signo se suman."
            ),
            new SpeedDrillQuestion(
                    "sd-3", 1, "unidades_si", "medio",
                    "¿Cuál es la orientación del torque τ = p × E sobre un dipolo eléctrico en un campo externo uniforme?",
                    List.of("Tiende a alinear el momento dipolar p paralelo al campo E (θ → 0°)", "Alinea p perpendicular a E (θ → 90°)", "Desplaza al dipolo con aceleración constante", "El torque siempre es nulo"),
                    0,
                    "El producto vectorial τ = p × E genera un par restaurador que rota al dipolo hasta su posición de mínima energía U = -p·E (p ∥ E).",
                    "Equilibrio estable del dipolo: p paralelo a E."
            ),

            // UNIDAD 2: LEY DE GAUSS
            new SpeedDrillQuestion(
                    "sd-4", 2, "trampa_vf", "intermedio",
                    "Una superficie gaussiana esférica encierra un dipolo eléctrico neto (+q y -q). ¿Cuánto vale el flujo eléctrico neto Φ_E a través de la esfera?",
                    List.of("Φ_E = 0 (porque la carga neta encerrada es +q - q = 0)", "Φ_E = 2q / ε₀", "Φ_E = q / ε₀", "No se cumple la Ley de Gauss"),
                    0,
                    "Por la Ley de Gauss Φ_E = Q_enc / ε₀. Como Q_enc = +q - q = 0, el flujo neto total es exactamente cero (entra tanto flujo como el que sale).",
                    "Flujo neto cero NO implica campo cero en la superficie."
            ),
            new SpeedDrillQuestion(
                    "sd-5", 2, "unidades_si", "medio",
                    "¿Cuánto vale el campo eléctrico justo afuera de la superficie de un conductor en equilibrio con densidad superficial σ?",
                    List.of("E = σ / ε₀ (perpendicular a la superficie)", "E = σ / (2ε₀)", "E = 0", "E = σ · ε₀"),
                    0,
                    "Dentro del conductor E_int = 0, por lo que todo el flujo del cilindro gaussiano sale por la tapa exterior: E = σ / ε₀.",
                    "Conductor en equilibrio: E_sup = σ/ε₀. Lámina aislante: σ/(2ε₀)."
            ),

            // UNIDAD 3: POTENCIAL ELÉCTRICO
            new SpeedDrillQuestion(
                    "sd-6", 3, "trampa_vf", "avanzado",
                    "¿Verdadero o Falso? 'Si el campo eléctrico E es cero en un punto del espacio, el potencial V en ese punto debe ser obligatoriamente cero'.",
                    List.of("Falso (E = -∇V; si E = 0, V es localmente constante pero no necesariamente cero)", "Verdadero (Si no hay campo, no hay potencial)"),
                    0,
                    "¡Falso! Dentro de un conductor cargado en equilibrio E = 0 en todo punto, pero el potencial V es constante e igual a kQ/R ≠ 0.",
                    "E es la pendiente de V. Pendiente cero significa meseta constante."
            ),
            new SpeedDrillQuestion(
                    "sd-7", 3, "unidades_si", "facil",
                    "¿Qué ángulo forman SIEMPRE las líneas de campo eléctrico con las superficies equipotenciales?",
                    List.of("90° (Son estrictamente perpendiculares en todo punto)", "0° (Son paralelas)", "45°", "Depende de la magnitud de la carga"),
                    0,
                    "Al movernos sobre una equipotencial dV = -E·dl = 0, lo cual exige que cos(θ) = 0 ⇒ θ = 90°.",
                    "Las líneas de campo cortan ortogonalmente a las equipotenciales."
            ),

            // UNIDAD 4: CAPACITORES Y DIELÉCTRICOS
            new SpeedDrillQuestion(
                    "sd-8", 4, "unidades_si", "facil",
                    "¿A qué equivale 1 Faradio [F] en unidades fundamentales de carga y diferencia de potencial?",
                    List.of("1 Coulomb / Volt [C/V]", "1 Volt / Coulomb [V/C]", "1 Joule · s", "1 Weber / Ampere"),
                    0,
                    "Por definición de capacidad C = Q / ΔV ⇒ 1 Faradio = 1 Coulomb por cada Volt.",
                    "C = Q / V ⇒ [F] = [C]/[V]."
            ),
            new SpeedDrillQuestion(
                    "sd-9", 4, "trampa_vf", "dificil",
                    "Se introduce un dieléctrico (κ > 1) en un capacitor AISLADO (desconectado de la batería, Q = cte). ¿Qué ocurre con la energía almacenada U?",
                    List.of("Disminuye a U₀ / κ (el campo hace trabajo atrayendo al dieléctrico)", "Aumenta a κ · U₀", "Permanece igual", "Se anula"),
                    0,
                    "Como Q es constante y C aumenta a κ·C₀, la energía U = Q²/(2C) disminuye por un factor κ.",
                    "Desconectado (Q=cte): U baja. Conectado (V=cte): U sube."
            ),

            // UNIDAD 5: CORRIENTE Y CIRCUITOS RC
            new SpeedDrillQuestion(
                    "sd-10", 5, "circuito_rc_rl", "intermedio",
                    "En un circuito RC serie, en el instante t = 0⁺ justo al cerrar la llave con el capacitor descargado, ¿cómo actúa el capacitor?",
                    List.of("Como un cortocircuito (V_C = 0, corriente inicial máxima i = ε/R)", "Como un circuito abierto (i = 0)", "Como una resistencia infinita", "Como una bobina"),
                    0,
                    "En t = 0⁺ la carga q(0) = 0 ⇒ V_C = q/C = 0. Toda la fem cae en la resistencia y circula la corriente máxima ε/R.",
                    "Capacitor descargado en t=0⁺: cortocircuito. En t→∞: circuito abierto."
            ),
            new SpeedDrillQuestion(
                    "sd-11", 5, "unidades_si", "medio",
                    "¿En qué unidad se mide el producto R · C (resistencia por capacidad) en el Sistema Internacional?",
                    List.of("Segundos [s] (Constante de tiempo τ)", "Ohmios [Ω]", "Faradios [F]", "Amperes por segundo [A/s]"),
                    0,
                    "[R]·[C] = (V/A)·(C/V) = C / (C/s) = segundos [s]. Es la constante de tiempo τ del circuito RC.",
                    "τ = R · C tiene dimensión de tiempo [s]."
            ),

            // UNIDAD 6: CAMPO MAGNÉTICO Y FUERZA DE LORENTZ
            new SpeedDrillQuestion(
                    "sd-12", 6, "mano_derecha", "facil",
                    "Un protón (q > 0) viaja hacia la DERECHA (→) en un campo B que ENTRA a la pantalla (⊗). ¿Hacia dónde apunta la fuerza magnética?",
                    List.of("Hacia Arriba (↑)", "Hacia Abajo (↓)", "Hacia la Derecha (→)", "Fuerza nula (0)"),
                    0,
                    "Regla de la mano derecha: pulgar hacia la derecha (v), dedos entrando a la pantalla (B), la palma empuja hacia ARRIBA (↑).",
                    "F = q(v × B). Para carga positiva, sentido directo de la palma."
            ),
            new SpeedDrillQuestion(
                    "sd-13", 6, "mano_derecha", "medio",
                    "Un ELECTRÓN (q < 0) viaja hacia la DERECHA (→) en un campo B que ENTRA a la pantalla (⊗). ¿Hacia dónde apunta la fuerza magnética?",
                    List.of("Hacia Abajo (↓)", "Hacia Arriba (↑)", "Hacia la Izquierda (←)", "Hacia adentro (⊗)"),
                    0,
                    "El producto v × B apunta hacia arriba, pero al multiplicar por la carga negativa del electrón (q = -e), el vector fuerza se invierte 180° hacia ABAJO (↓).",
                    "¡Carga negativa invierte el sentido de la mano derecha!"
            ),
            new SpeedDrillQuestion(
                    "sd-14", 6, "mano_derecha", "facil",
                    "Un protón se mueve paralelamente a las líneas de un campo magnético uniforme (v ∥ B). ¿Cuánto vale la fuerza magnética?",
                    List.of("Fuerza nula (F = 0)", "F = q v B", "F = q v B / 2", "Fuerza máxima"),
                    0,
                    "Como θ = 0° entre v y B, sen(0°) = 0 ⇒ F = q v B sen(0°) = 0.",
                    "Cargas moviéndose paralelas a B no experimentan fuerza magnética."
            ),
            new SpeedDrillQuestion(
                    "sd-15", 6, "trampa_vf", "intermedio",
                    "¿Verdadero o Falso? 'La fuerza magnética estacionaria sobre una partícula cargada realiza trabajo aumentando su energía cinética'.",
                    List.of("Falso (F ⊥ v siempre, por lo tanto el trabajo es W = 0 y la rapidez es constante)", "Verdadero (Toda fuerza neta aumenta la rapidez)"),
                    0,
                    "Como F = q(v × B) es perpendicular a v, la potencia P = F · v = 0 en todo instante. Solo curva la trayectoria sin cambiar la rapidez.",
                    "F_B ⊥ v ⇒ Trabajo magnético = 0."
            ),

            // UNIDAD 7: BIOT-SAVART Y AMPÈRE
            new SpeedDrillQuestion(
                    "sd-16", 7, "mano_derecha", "medio",
                    "Un cable recto largo conduce corriente I hacia ARRIBA (↑). ¿Cómo son las líneas de campo magnético B a la DERECHA del cable?",
                    List.of("Entrando al plano de la pantalla (⊗)", "Saliendo del plano de la pantalla (⊙)", "Hacia arriba (↑)", "Hacia abajo (↓)"),
                    0,
                    "Regla del pulgar derecho: pulgar hacia arriba siguiendo a I; a la derecha del cable los cuatro dedos se curvan ENTRANDO al plano (⊗).",
                    "Pulgar con la corriente I, dedos arqueados indican el giro de B."
            ),
            new SpeedDrillQuestion(
                    "sd-17", 7, "unidades_si", "intermedio",
                    "Dos cables rectos paralelos llevan corrientes en el MISMO sentido (↑ y ↑). ¿Qué fuerza magnética se ejercen entre sí?",
                    List.of("Se ATRAEN mutuamente", "Se REPELEN mutuamente", "No se ejercen fuerza", "Giran a 90°"),
                    0,
                    "Por Biot-Savart y Lorentz, corrientes paralelas del mismo sentido se atraen con F/L = (μ₀ I₁ I₂)/(2π d); corrientes opuestas se repelen.",
                    "Corrientes del mismo sentido se atraen; sentidos opuestos se repelen."
            ),

            // UNIDAD 8: FARADAY-LENZ E INDUCTANCIA
            new SpeedDrillQuestion(
                    "sd-18", 8, "signo_lenz", "intermedio",
                    "El campo magnético que ENTRA a una espira en el plano (⊗) está AUMENTANDO con el tiempo. ¿Qué sentido tiene la corriente inducida?",
                    List.of("Antihorario (↺)", "Horario (↻)", "Corriente nula", "Radial hacia afuera"),
                    0,
                    "Para oponerse al aumento de flujo entrante (⊗), la espira genera un campo inducido saliente (⊙). Pulgar saliendo exige giro ANTIHORARIO (↺).",
                    "Lenz: si el flujo entrante aumenta, B_ind sale (⊙) ⇒ corriente antihoraria."
            ),
            new SpeedDrillQuestion(
                    "sd-19", 8, "signo_lenz", "intermedio",
                    "El campo magnético que ENTRA a una espira (⊗) está DISMINUYENDO con el tiempo. ¿Qué sentido tiene la corriente inducida?",
                    List.of("Horario (↻)", "Antihorario (↺)", "No se induce corriente", "Alterna"),
                    0,
                    "Para oponerse a la disminución del flujo entrante, la espira refuerza el campo generando B_ind entrante (⊗). Pulgar entrando exige giro HORARIO (↻).",
                    "Lenz: si el flujo disminuye, B_ind apunta igual que el campo externo."
            ),
            new SpeedDrillQuestion(
                    "sd-20", 8, "signo_lenz", "avanzado",
                    "Una espira rectangular se traslada con velocidad constante dentro de un campo magnético uniforme y estacionario (sin salir de él). ¿Cuánto vale la fem inducida?",
                    List.of("ε = 0 (Nula, porque el flujo Φ_B = B·A no cambia)", "ε = B · L · v", "ε = B · A / t", "ε = -L di/dt"),
                    0,
                    "Mientras toda la espira se mueva dentro de una región donde B es uniforme, el flujo Φ_B permanece constante ⇒ dΦ_B/dt = 0 ⇒ ε = 0.",
                    "Solo hay fem inducida si el flujo magnético CAMBIA con el tiempo."
            ),
            new SpeedDrillQuestion(
                    "sd-21", 8, "unidades_si", "facil",
                    "¿Cuál es la unidad de Autoinductancia (L) y la unidad de Flujo Magnético (Φ_B) en el Sistema Internacional?",
                    List.of("Inductancia: Henrio [H]  |  Flujo: Weber [Wb]", "Inductancia: Weber [Wb]  |  Flujo: Tesla [T]", "Inductancia: Tesla [T]  |  Flujo: Henrio [H]", "Inductancia: Faradio [F]  |  Flujo: Gauss [G]"),
                    0,
                    "La autoinductancia L se mide en Henrios [H = V·s/A = Wb/A] y el flujo magnético Φ_B en Webers [Wb = T·m²].",
                    "Φ_B = L · I ⇒ [Wb] = [H] · [A]."
            ),
            new SpeedDrillQuestion(
                    "sd-22", 8, "circuito_rc_rl", "avanzado",
                    "En un circuito RL serie, en el instante t = 0⁺ justo al cerrar el interruptor, ¿cómo se comporta el inductor ideal L?",
                    List.of("Como un circuito abierto (i(0⁺) = 0, se opone al salto brusco de corriente)", "Como un cortocircuito (V_L = 0)", "Como una fuente de corriente infinita", "Como un capacitor descargado"),
                    0,
                    "Por la fem autoinducida ε_L = -L di/dt, la corriente en un inductor no puede cambiar discontinuamente: i(0⁺) = i(0⁻) = 0 (circuito abierto).",
                    "Inductor en t=0⁺: circuito abierto (i=0). En t→∞: cortocircuito (V_L=0)."
            ),

            // UNIDAD 9: CORRIENTE ALTERNA Y MAXWELL
            new SpeedDrillQuestion(
                    "sd-23", 9, "unidades_si", "avanzado",
                    "En un circuito RLC serie en RESONANCIA (ω₀ = 1/√(LC)), ¿cuánto vale el ángulo de desfase φ entre tensión y corriente y cuánto vale la impedancia Z?",
                    List.of("φ = 0° (en fase, cos φ = 1) y Z = R (mínima)", "φ = 90° y Z = ∞", "φ = 180° y Z = 0", "φ = 45° y Z = R + X_L"),
                    0,
                    "En resonancia X_L = X_C, por lo que la parte imaginaria (X_L - X_C) se anula: Z = R pura y la corriente queda exactamente en fase con la tensión (φ = 0°).",
                    "Resonancia RLC serie: X_L = X_C ⇒ Z_min = R ⇒ I_max = V/R."
            ),
            new SpeedDrillQuestion(
                    "sd-24", 9, "unidades_si", "dificil",
                    "¿En qué unidad del SI se mide el Vector de Poynting S = (1/μ₀)(E × B) de una onda electromagnética?",
                    List.of("Watt / metro² [W/m²] (Flujo de potencia por unidad de área)", "Joule / metro³ [J/m³]", "Volt · Ampere [V·A]", "Tesla · metro [T·m]"),
                    0,
                    "El vector de Poynting mide la potencia electromagnética transportada por unidad de superficie transversal: [W/m²].",
                    "|S| = Intensidad instantánea de la onda [W/m²]."
            )
    );

    public List<SpeedDrillQuestion> getRandomRound(int count) {
        List<SpeedDrillQuestion> copy = new ArrayList<>(questionBank);
        Collections.shuffle(copy);
        if (count <= copy.size()) {
            return copy.subList(0, count);
        }
        return copy;
    }
}
