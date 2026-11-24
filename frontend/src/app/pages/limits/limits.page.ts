import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { KatexRenderService } from '../../services/katex-render.service';
import { Fisica2ApiService } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent, CieloArtName } from '../../components/cielo-illustration.component';

interface LimitModel {
  id: string;
  unitNumber: number;
  name: string;
  formulaLatex: string;
  xLabel: string;
  yLabel: string;
  xUnit: string;
  yUnit: string;
  xMin: number;
  xMax: number;
  xStep: number;
  defaultX: number;
  paramLabel: string;
  paramSymbol: string;
  paramUnit: string;
  paramMin: number;
  paramMax: number;
  paramStep: number;
  defaultParam: number;
  evalFn: (x: number, param: number) => number;
  asymptoteInfo: (param: number) => { xAsymptote?: number; yAsymptote?: number; label: string };
  analyzeRegime: (x: number, param: number, yVal: number) => {
    regimeTitle: string;
    mathLimitExplanation: string;
    physicalMeaning: string;
    colloquiumRule: string;
  };
}

@Component({
  selector: 'app-limits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    CieloIllustrationComponent,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>✦ Simulaciones & Calculadora de Límites Físicos ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="limits-wrapper">

        <!-- BANNER HERO LAVANDA ILUSTRADO -->
        <div class="cielo-hero-banner limits-hero">
          <div class="lh-art">
            <app-cielo-art name="tool-lab" [width]="140" [height]="115"></app-cielo-art>
          </div>
          <div class="lh-copy">
            <span class="lh-pill">LABORATORIO INTERACTIVO DE FUNCIONES • ASÍNTOTAS Y PUNTOS CRÍTICOS</span>
            <h1>Simuladores & Calculadora de Límites en Vivo ♡</h1>
            <p>
              Mové los sliders o tocá los botones de límite para comprobar en el pizarrón qué ocurre cuando
              la distancia tiende a cero, cuando vas al infinito o cuando entrás en resonancia.
            </p>
          </div>
        </div>

        <!-- SELECTOR ILUSTRADO DE FENÓMENOS FÍSICOS (SOLO UNIDADES DESBLOQUEADAS) -->
        <div class="model-picker-bar">
          <button
            *ngFor="let m of unlockedModels"
            class="model-tab-btn"
            [class.active]="currentModel.id === m.id"
            (click)="selectModel(m)"
          >
            <app-cielo-art [name]="getUnitArt(m.unitNumber)" [width]="44" [height]="44"></app-cielo-art>
            <div class="mt-meta">
              <span class="mt-unit">🔓 UNIDAD {{ m.unitNumber }}</span>
              <span class="mt-name">{{ m.name }}</span>
            </div>
          </button>
        </div>

        <!-- PANEL PRINCIPAL: CONTROLES LAVANDA + PIZARRÓN CARTESIANO EN VIVO -->
        <div class="limits-main-grid" *ngIf="currentModel">

          <!-- COLUMNA IZQUIERDA: TARJETA LAVANDA DE CONTROLES Y ECUACIÓN KATEX -->
          <div class="cielo-lavender-card controls-card">
            <div class="cc-top">
              <div>
                <span class="kicker-purple">UNIDAD {{ currentModel.unitNumber }} • MODELO ANALÍTICO</span>
                <h2 class="model-title">{{ currentModel.name }}</h2>
              </div>
              <app-cielo-art [name]="getUnitArt(currentModel.unitNumber)" [width]="72" [height]="72"></app-cielo-art>
            </div>

            <div class="formula-stage" [innerHTML]="renderMath(currentModel.formulaLatex, true)"></div>

            <!-- Slider 1: Variable Independiente (z, t o omega) -->
            <div class="slider-box">
              <div class="sb-top">
                <span>Variable <strong>{{ currentModel.xLabel }}</strong>:</span>
                <strong class="val-pill">{{ currentX }} {{ currentModel.xUnit }}</strong>
              </div>
              <input
                type="range"
                [min]="currentModel.xMin"
                [max]="currentModel.xMax"
                [step]="currentModel.xStep"
                [(ngModel)]="currentX"
                class="cielo-slider"
              />
              <div class="quick-limit-btns">
                <button class="q-limit-btn" (click)="currentX = currentModel.xMin">
                  Límite → 0 ({{ currentModel.xMin }})
                </button>
                <button class="q-limit-btn highlight" (click)="setCharacteristicPoint()">
                  ⭐ Punto Crítico / Pico
                </button>
                <button class="q-limit-btn" (click)="currentX = currentModel.xMax">
                  Límite → ∞ ({{ currentModel.xMax }})
                </button>
              </div>
            </div>

            <!-- Slider 2: Parámetro Geométrico o Circuital (R, tau, omega_0) -->
            <div class="slider-box">
              <div class="sb-top">
                <span>{{ currentModel.paramLabel }} (<strong>{{ currentModel.paramSymbol }}</strong>):</span>
                <strong class="val-pill yellow">{{ currentParam }} {{ currentModel.paramUnit }}</strong>
              </div>
              <input
                type="range"
                [min]="currentModel.paramMin"
                [max]="currentModel.paramMax"
                [step]="currentModel.paramStep"
                [(ngModel)]="currentParam"
                class="cielo-slider"
              />
            </div>

            <!-- Resultado Instantáneo -->
            <div class="live-result-readout">
              <div class="lrr-lbl">MAGNITUD EVALUADA EN EL PUNTO ACTUAL</div>
              <div class="lrr-val">{{ currentY.toFixed(3) }} <span>{{ currentModel.yUnit }}</span></div>
              <div class="lrr-regime">{{ currentAnalysis.regimeTitle }}</div>
            </div>
          </div>

          <!-- COLUMNA DERECHA: PIZARRÓN CARTESIANO INTERACTIVO SVG + TARJETAS DE INTERPRETACIÓN -->
          <div class="cielo-dark-panel chart-card">
            <div class="chart-top-bar">
              <div>
                <span class="kicker-yellow">🖍️ PIZARRÓN GRÁFICO DE CÁTEDRA EN TIEMPO REAL</span>
                <h3>Curva {{ currentModel.yLabel }} en función de {{ currentModel.xLabel }}</h3>
              </div>
              <span class="asymptote-badge">{{ currentAsymptote.label }}</span>
            </div>

            <!-- Pizarrón Verde Universitario con Marco de Madera -->
            <div class="chalkboard-chart-stage">
              <svg viewBox="0 0 600 320" class="cartesian-svg">
                <!-- Grilla de tiza tenue -->
                <g stroke="rgba(255, 255, 255, 0.14)" stroke-width="1">
                  <line x1="65" y1="60" x2="565" y2="60" />
                  <line x1="65" y1="110" x2="565" y2="110" />
                  <line x1="65" y1="160" x2="565" y2="160" />
                  <line x1="65" y1="210" x2="565" y2="210" />
                  <line x1="165" y1="40" x2="165" y2="265" />
                  <line x1="265" y1="40" x2="265" y2="265" />
                  <line x1="365" y1="40" x2="365" y2="265" />
                  <line x1="465" y1="40" x2="465" y2="265" />
                </g>

                <!-- Ejes X e Y en tiza blanca -->
                <line x1="65" y1="265" x2="570" y2="265" stroke="#ffffff" stroke-width="2.5" />
                <line x1="65" y1="35" x2="65" y2="265" stroke="#ffffff" stroke-width="2.5" />

                <!-- Asíntota o línea característica vertical -->
                <line
                  *ngIf="asymptoteScreenX !== null"
                  [attr.x1]="asymptoteScreenX" y1="40"
                  [attr.x2]="asymptoteScreenX" y2="265"
                  stroke="#fde047" stroke-width="2.4" stroke-dasharray="6 4"
                />
                <text
                  *ngIf="asymptoteScreenX !== null"
                  [attr.x]="asymptoteScreenX" y="28"
                  text-anchor="middle" fill="#fde047" font-size="11" font-weight="800"
                >
                  {{ currentAsymptote.label }}
                </text>

                <!-- Asíntota horizontal -->
                <line
                  *ngIf="asymptoteScreenY !== null"
                  x1="65" [attr.y1]="asymptoteScreenY"
                  x2="565" [attr.y2]="asymptoteScreenY"
                  stroke="#6ee7b7" stroke-width="2.2" stroke-dasharray="6 4"
                />

                <!-- Área sombreada bajo la curva -->
                <path [attr.d]="curveAreaPath" fill="rgba(56, 189, 248, 0.22)" />

                <!-- Curva principal de la función física en tiza celeste brillante -->
                <path [attr.d]="curveLinePath" fill="none" stroke="#7dd3fc" stroke-width="4" stroke-linecap="round" />

                <!-- Líneas guía de coordenadas del punto actual -->
                <line
                  [attr.x1]="currentPointScreen.x" y1="265"
                  [attr.x2]="currentPointScreen.x" [attr.y2]="currentPointScreen.y"
                  stroke="#fb7185" stroke-width="2" stroke-dasharray="4 3"
                />
                <line
                  x1="65" [attr.y1]="currentPointScreen.y"
                  [attr.x2]="currentPointScreen.x" [attr.y2]="currentPointScreen.y"
                  stroke="#fb7185" stroke-width="2" stroke-dasharray="4 3"
                />

                <!-- Punto Luminoso Actual (x, f(x)) -->
                <circle
                  [attr.cx]="currentPointScreen.x"
                  [attr.cy]="currentPointScreen.y"
                  r="8"
                  fill="#fb7185"
                  stroke="#ffffff"
                  stroke-width="3"
                />

                <!-- Etiquetas de los ejes -->
                <text x="315" y="298" text-anchor="middle" fill="#fef08a" font-size="12" font-weight="800">
                  {{ currentModel.xLabel }} ({{ currentModel.xUnit }}) — Rango [{{ currentModel.xMin }} a {{ currentModel.xMax }}]
                </text>
                <text x="22" y="155" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="800" transform="rotate(-90 22 155)">
                  {{ currentModel.yLabel }} ({{ currentModel.yUnit }})
                </text>
              </svg>
            </div>

            <!-- Explicaciones Matemáticas y Físicas en Tarjetas Lavanda -->
            <div class="analysis-cards-grid">
              <div class="cielo-lavender-card an-box">
                <div class="an-kicker">📐 DEMOSTRACIÓN MATEMÁTICA DEL LÍMITE</div>
                <p>{{ currentAnalysis.mathLimitExplanation }}</p>
              </div>
              <div class="cielo-lavender-card an-box">
                <div class="an-kicker">⚡ QUÉ RESPONDER EN EL COLOQUIO ORAL</div>
                <p>{{ currentAnalysis.physicalMeaning }}</p>
                <div class="colloquium-tip">💡 <strong>Regla de Oro:</strong> {{ currentAnalysis.colloquiumRule }}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .limits-wrapper {
      max-width: 1320px;
      margin: 0 auto 44px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .limits-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 780px) {
      .limits-hero { grid-template-columns: 1fr; text-align: center; }
      .lh-art { display: flex; justify-content: center; }
    }
    .lh-pill {
      display: inline-block;
      background: #7c5dfa;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 6px;
    }
    .lh-copy h1 {
      font-family: var(--font-display);
      font-size: 1.95rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 6px 0;
    }
    .lh-copy p {
      color: #362f63;
      font-weight: 700;
      font-size: 0.94rem;
      margin: 0;
    }

    /* SELECTOR DE MODELOS ILUSTRADOS */
    .model-picker-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }
    .model-tab-btn {
      background: linear-gradient(180deg, #252b5c 0%, #191e45 100%);
      border: 2.5px solid #48508a;
      border-radius: 18px;
      padding: 10px 14px;
      color: #e4ddff;
      cursor: pointer;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 5px 0 #10132e;
      transition: all 0.18s ease;
    }
    .model-tab-btn:hover {
      transform: translateY(-2px);
      border-color: #a992ff;
    }
    .model-tab-btn.active {
      background: linear-gradient(180deg, #efeaff 0%, #d9cbff 100%);
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 6px 0 #5b3ec8;
    }
    .mt-meta {
      display: flex;
      flex-direction: column;
    }
    .mt-unit {
      font-size: 0.7rem;
      font-weight: 900;
      color: #b8abeb;
    }
    .model-tab-btn.active .mt-unit { color: #5b3ec8; }
    .mt-name {
      font-family: var(--font-display);
      font-size: 0.94rem;
      font-weight: 800;
      line-height: 1.2;
    }

    /* GRILLA PRINCIPAL */
    .limits-main-grid {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 20px;
    }
    @media (max-width: 1020px) {
      .limits-main-grid { grid-template-columns: 1fr; }
    }
    .controls-card, .chart-card {
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .cc-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .kicker-purple {
      display: inline-block;
      background: #7c5dfa;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 900;
      padding: 3px 10px;
      border-radius: 99px;
      margin-bottom: 4px;
    }
    .model-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
    }
    .formula-stage {
      background: #191538;
      color: #ffffff;
      border: 2.5px solid #7c5dfa;
      border-radius: 18px;
      padding: 14px 10px;
      text-align: center;
      overflow-x: auto;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.45);
    }

    .slider-box {
      background: rgba(255, 255, 255, 0.65);
      border: 2px solid #9d7eff;
      border-radius: 16px;
      padding: 14px;
    }
    .sb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.86rem;
      font-weight: 700;
      color: #191538;
      margin-bottom: 8px;
    }
    .val-pill {
      background: #191538;
      color: #7dd3fc;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 3px 10px;
      border-radius: 99px;
    }
    .val-pill.yellow {
      color: #fde047;
    }
    .cielo-slider {
      width: 100%;
      accent-color: #7c5dfa;
      cursor: pointer;
    }
    .quick-limit-btns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-top: 10px;
    }
    .q-limit-btn {
      background: #191538;
      border: 2px solid #5b3ec8;
      color: #efeaff;
      padding: 7px 6px;
      border-radius: 12px;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s;
    }
    .q-limit-btn.highlight {
      background: #7c5dfa;
      border-color: #191538;
      color: #ffffff;
    }
    .q-limit-btn:hover {
      transform: translateY(-2px);
      background: #5b3ec8;
    }

    .live-result-readout {
      background: #191538;
      border: 3px solid #7c5dfa;
      border-radius: 18px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 5px 0 #10132e;
    }
    .lrr-lbl {
      font-size: 0.7rem;
      font-weight: 900;
      color: #c4b5fd;
      letter-spacing: 0.06em;
    }
    .lrr-val {
      font-family: var(--font-mono);
      font-size: 2rem;
      font-weight: 800;
      color: #fde047;
      margin: 6px 0;
    }
    .lrr-val span {
      font-size: 1rem;
      color: #e2e8f0;
    }
    .lrr-regime {
      display: inline-block;
      background: #10b981;
      color: #052e16;
      font-size: 0.78rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 99px;
    }

    /* PIZARRÓN CARTESIANO DERECHO */
    .chart-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
    }
    .kicker-yellow {
      font-size: 0.74rem;
      font-weight: 900;
      color: #fde047;
      letter-spacing: 0.05em;
    }
    .chart-top-bar h3 {
      font-family: var(--font-display);
      margin: 4px 0 0 0;
      font-size: 1.35rem;
      color: #ffffff;
    }
    .asymptote-badge {
      background: #fde047;
      color: #191538;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 900;
      padding: 6px 14px;
      border-radius: 99px;
      border: 2px solid #191538;
    }
    .chalkboard-chart-stage {
      background: linear-gradient(180deg, #1b4332 0%, #122d22 100%);
      border: 8px solid #d97706;
      border-radius: 22px;
      padding: 12px;
      box-shadow: inset 0 0 28px rgba(0, 0, 0, 0.5), 0 8px 0 #0d1025;
    }
    .cartesian-svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .analysis-cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    @media (max-width: 720px) {
      .analysis-cards-grid { grid-template-columns: 1fr; }
    }
    .an-box {
      padding: 16px 18px;
    }
    .an-kicker {
      display: inline-block;
      background: #191538;
      color: #fde047;
      font-size: 0.72rem;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 99px;
      margin-bottom: 8px;
    }
    .an-box p {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #191538;
      line-height: 1.5;
    }
    .colloquium-tip {
      margin-top: 10px;
      padding: 8px 12px;
      background: #d1fae5;
      border: 2px solid #10b981;
      border-radius: 12px;
      font-size: 0.83rem;
      font-weight: 700;
      color: #064e3b;
    }
  `]
})
export class LimitsPage implements OnInit {
  currentX = 2.0;
  currentParam = 2.0;

  models: LimitModel[] = [
    {
      id: 'coulomb_r',
      unitNumber: 1,
      name: 'Ley de Coulomb (Decaimiento 1/r²)',
      formulaLatex: 'F(r) = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2}',
      xLabel: 'r (distancia entre cargas)',
      yLabel: 'F(r)',
      xUnit: 'm',
      yUnit: 'N',
      xMin: 0.5,
      xMax: 10,
      xStep: 0.1,
      defaultX: 2.0,
      paramLabel: 'Producto de cargas |q₁·q₂|',
      paramSymbol: 'q₁q₂',
      paramUnit: 'μC²',
      paramMin: 1,
      paramMax: 20,
      paramStep: 1,
      defaultParam: 8,
      evalFn: (r, qq) => (0.899 * qq) / Math.max(0.1, r * r),
      asymptoteInfo: () => ({
        yAsymptote: 0,
        label: 'Asíntota Horizontal F → 0 cuando r → ∞'
      }),
      analyzeRegime: (r) => {
        if (r <= 0.8) {
          return {
            regimeTitle: 'Límite de Corta Distancia (r → 0⁺)',
            mathLimitExplanation: 'Al tender r a cero en el denominador r², el cociente k·q₁q₂ / r² crece abruptamente hacia infinito.',
            physicalMeaning: 'A distancias muy pequeñas la repulsión o atracción electrostática se vuelve enorme.',
            colloquiumRule: 'Recordá que la Ley de Coulomb vale para cargas puntuales (tamaño mucho menor que r).'
          };
        }
        if (r >= 6.0) {
          return {
            regimeTitle: 'Límite Asintótico Lejano (r → ∞)',
            mathLimitExplanation: 'Cuando r crece mucho, 1/r² tiende rápidamente a la asíntota horizontal F = 0.',
            physicalMeaning: 'Cada vez que duplicás la distancia r, la fuerza cae 4 veces.',
            colloquiumRule: 'A distancia infinita (r → ∞) las cargas dejan de interactuar y se toma energía potencial U(∞) = 0.'
          };
        }
        return {
          regimeTitle: 'Régimen de Inversa del Cuadrado (1 / r²)',
          mathLimitExplanation: 'La pendiente negativa muestra cómo cae F(r) proporcionalmente a r⁻².',
          physicalMeaning: 'Comprobá con el slider que en r = 4 m la fuerza es exactamente la cuarta parte que en r = 2 m.',
          colloquiumRule: 'Siempre pasá r de centímetros a metros antes de elevar al cuadrado.'
        };
      }
    },
    {
      id: 'anillo_z',
      unitNumber: 1,
      name: 'Anillo Cargado en Eje z',
      formulaLatex: 'E_z(z) = \\frac{k \\cdot Q \\cdot z}{(z^2 + R^2)^{3/2}}',
      xLabel: 'z (distancia axial)',
      yLabel: 'E_z(z)',
      xUnit: 'm',
      yUnit: 'kN/C',
      xMin: 0,
      xMax: 10,
      xStep: 0.1,
      defaultX: 1.4,
      paramLabel: 'Radio del Anillo',
      paramSymbol: 'R',
      paramUnit: 'm',
      paramMin: 0.5,
      paramMax: 4.0,
      paramStep: 0.25,
      defaultParam: 2.0,
      evalFn: (z, R) => (90 * z) / Math.pow(z * z + R * R, 1.5),
      asymptoteInfo: (R) => ({
        xAsymptote: R / Math.SQRT2,
        label: `Máximo en z = R/√2 = ${(R / Math.SQRT2).toFixed(2)} m`
      }),
      analyzeRegime: (z, R) => {
        if (z < 0.05) {
          return {
            regimeTitle: 'Límite en el Centro del Anillo (z → 0)',
            mathLimitExplanation: 'Al evaluar z = 0 en el numerador, k·Q·0 / (0 + R²)^(3/2) = 0 exactamente.',
            physicalMeaning: 'En el centro del anillo cada elemento diferencial dq tiene un elemento diametralmente opuesto que anula su vector campo.',
            colloquiumRule: 'Por simetría radial perfecta, en el centro de todo anillo uniformemente cargado el campo es nulo (E=0), aunque el potencial es máximo (V=kQ/R).'
          };
        }
        if (z > 3.5 * R) {
          return {
            regimeTitle: 'Límite de Campo Lejano (z ≫ R)',
            mathLimitExplanation: 'Cuando z ≫ R, (z² + R²)^(3/2) ≈ (z²)^(3/2) = z³. Simplificando z/z³ queda E(z) ≈ kQ / z².',
            physicalMeaning: 'Visto desde una distancia mucho mayor que su radio, la geometría del anillo se vuelve indistinguible de una carga puntual Q.',
            colloquiumRule: 'Toda distribución finita con carga neta Q ≠ 0 debe converger a la Ley de Coulomb kQ/z² cuando z → ∞.'
          };
        }
        return {
          regimeTitle: `Régimen Intermedio Cercano al Pico (z = ${(R / Math.SQRT2).toFixed(2)} m)`,
          mathLimitExplanation: 'Derivando dE/dz = 0 se obtiene z² + R² - 3z² = 0 ⇒ z_max = R / √2 ≈ 0,707 R.',
          physicalMeaning: 'Compiten el aumento del coseno de proyección axial y el alejamiento geométrico r.',
          colloquiumRule: 'En el pizarrón siempre marcá el cero en z=0, el pico máximo en z=R/√2 y la caída asintótica 1/z².'
        };
      }
    },
    {
      id: 'disco_z',
      unitNumber: 2,
      name: 'Disco Cargado vs Plano Infinito',
      formulaLatex: 'E_z(z) = \\frac{\\sigma}{2\\varepsilon_0} \\left(1 - \\frac{z}{\\sqrt{z^2 + R^2}}\\right)',
      xLabel: 'z (distancia al disco)',
      yLabel: 'E_z(z)',
      xUnit: 'm',
      yUnit: 'kN/C',
      xMin: 0,
      xMax: 10,
      xStep: 0.1,
      defaultX: 0.5,
      paramLabel: 'Radio del Disco',
      paramSymbol: 'R',
      paramUnit: 'm',
      paramMin: 0.5,
      paramMax: 6.0,
      paramStep: 0.5,
      defaultParam: 3.0,
      evalFn: (z, R) => 56.5 * (1 - z / Math.sqrt(z * z + R * R)),
      asymptoteInfo: () => ({
        yAsymptote: 56.5,
        label: 'Límite Plano Infinito (z → 0 o R → ∞): E = σ/(2ε₀)'
      }),
      analyzeRegime: (z, R) => {
        if (z < 0.15 * R) {
          return {
            regimeTitle: 'Límite de Plano Infinito (z ≪ R)',
            mathLimitExplanation: 'Cuando z/R → 0, el cociente z/√(z²+R²) → 0, por lo que E(z) → σ / (2ε₀) = constante.',
            physicalMeaning: 'Muy cerca de la superficie del disco, los bordes quedan tan lejos que el disco actúa como un plano infinito de Gauss.',
            colloquiumRule: 'Esta es la demostración de por qué la fórmula del disco conecta Coulomb con la Ley de Gauss del plano infinito.'
          };
        }
        return {
          regimeTitle: 'Régimen de Disco Finito (Decaimiento con z)',
          mathLimitExplanation: 'A medida que z crece frente a R, el término z/√(z²+R²) se aproxima a 1 por debajo, reduciendo el campo.',
          physicalMeaning: 'Para z ≫ R, desarrollando por Taylor (1 + R²/z²)^(-1/2) ≈ 1 - R²/(2z²), se recupera E ≈ k(σπR²)/z².',
          colloquiumRule: 'Cerca del disco (z ≪ R) el campo es uniforme σ/2ε₀; lejos del disco (z ≫ R) decae como 1/z².'
        };
      }
    },
    {
      id: 'rc_carga',
      unitNumber: 5,
      name: 'Transitorio Circuito RC (Carga)',
      formulaLatex: 'v_C(t) = \\mathcal{E} \\cdot \\left(1 - e^{-t / \\tau}\\right)',
      xLabel: 't (tiempo)',
      yLabel: 'v_C(t)',
      xUnit: 's',
      yUnit: 'V',
      xMin: 0,
      xMax: 20,
      xStep: 0.2,
      defaultX: 3.0,
      paramLabel: 'Constante de Tiempo τ = RC',
      paramSymbol: 'τ',
      paramUnit: 's',
      paramMin: 1.0,
      paramMax: 6.0,
      paramStep: 0.5,
      defaultParam: 3.0,
      evalFn: (t, tau) => 24 * (1 - Math.exp(-t / tau)),
      asymptoteInfo: (tau) => ({
        xAsymptote: tau,
        yAsymptote: 24,
        label: `τ = ${tau}s (63.2%) | Asíntota ε = 24 V`
      }),
      analyzeRegime: (t, tau) => {
        if (t === 0) {
          return {
            regimeTitle: 'Instante Inicial t = 0⁺ (Cortocircuito)',
            mathLimitExplanation: 'Para t = 0, e⁰ = 1 ⇒ v_C(0⁺) = 24·(1 - 1) = 0 V, mientras i(0⁺) = ε/R es máxima.',
            physicalMeaning: 'El voltaje en un capacitor no puede saltar discontinuamente. En t=0⁺ actúa como un cable ideal (cortocircuito).',
            colloquiumRule: 'Capacitor descargado en t = 0⁺ equivale a cortocircuito (V_C = 0).'
          };
        }
        if (t >= 4.5 * tau) {
          return {
            regimeTitle: 'Régimen Estacionario t → ∞ (t ≥ 5τ • Circuito Abierto)',
            mathLimitExplanation: 'Para t ≫ τ, e^(-t/τ) → 0 ⇒ v_C(∞) = ε = 24 V e i(∞) = 0 A.',
            physicalMeaning: 'El capacitor completó su carga (>99%) e impide el paso de corriente continua.',
            colloquiumRule: 'En t → ∞ en corriente continua, todo capacitor actúa como un circuito abierto (corriente cero).'
          };
        }
        return {
          regimeTitle: `Régimen Transitorio Exponencial (t = ${(t / tau).toFixed(2)} τ)`,
          mathLimitExplanation: 'En t = τ la tensión alcanza (1 - 1/e) = 63,2% del valor final y la corriente cae al 36,8%.',
          physicalMeaning: 'La energía entregada por la fuente se reparte mitad en calor por efecto Joule en R y mitad almacenada en C.',
          colloquiumRule: 'Se considera prácticamente cargado el capacitor a partir de t = 5τ (99,3%).'
        };
      }
    },
    {
      id: 'rl_transitorio',
      unitNumber: 8,
      name: 'Transitorio Inductor RL (Conexión)',
      formulaLatex: 'i(t) = \\frac{\\mathcal{E}}{R} \\left(1 - e^{-t / \\tau_L}\\right), \\quad \\tau_L = \\frac{L}{R}',
      xLabel: 't (tiempo)',
      yLabel: 'i(t)',
      xUnit: 'ms',
      yUnit: 'A',
      xMin: 0,
      xMax: 20,
      xStep: 0.2,
      defaultX: 2.0,
      paramLabel: 'Constante Inductiva τ_L = L/R',
      paramSymbol: 'τ_L',
      paramUnit: 'ms',
      paramMin: 1.0,
      paramMax: 6.0,
      paramStep: 0.5,
      defaultParam: 2.5,
      evalFn: (t, tau) => 10 * (1 - Math.exp(-t / tau)),
      asymptoteInfo: (tau) => ({
        xAsymptote: tau,
        yAsymptote: 10,
        label: `τ_L = ${tau} ms | Corriente límite I_max = ε/R = 10 A`
      }),
      analyzeRegime: (t, tau) => {
        if (t === 0) {
          return {
            regimeTitle: 'Instante Inicial t = 0⁺ (Circuito Abierto)',
            mathLimitExplanation: 'Por la fem de Lenz ε_L = -L di/dt, la corriente no puede saltar de golpe: i(0⁺) = 0 A.',
            physicalMeaning: 'El inductor se opone inicialmente al establecimiento de la corriente actuando como circuito abierto en t=0⁺.',
            colloquiumRule: '¡Exactamente opuesto al capacitor! En t=0⁺ el inductor es circuito abierto (i=0) y en t→∞ es cortocircuito (V_L=0).'
          };
        }
        return {
          regimeTitle: t >= 4.5 * tau ? 'Régimen Estacionario t → ∞ (Cortocircuito)' : 'Crecimiento Inductivo Transitorio',
          mathLimitExplanation: 'A medida que di/dt disminuye, desaparece la fem autoinducida y la corriente tiende a ε/R.',
          physicalMeaning: 'La bobina almacena energía magnética U_B = ½ L i²(t) en su núcleo.',
          colloquiumRule: 'Recordá que la constante de tiempo inductiva es τ = L/R (no L·R).'
        };
      }
    },
    {
      id: 'rlc_resonancia',
      unitNumber: 9,
      name: 'Curva de Resonancia RLC Serie',
      formulaLatex: 'I(\\omega) = \\frac{V_0}{\\sqrt{R^2 + (\\omega L - 1/(\\omega C))^2}}',
      xLabel: 'ω (frecuencia angular)',
      yLabel: 'I(ω)',
      xUnit: 'rad/s',
      yUnit: 'A',
      xMin: 50,
      xMax: 500,
      xStep: 5,
      defaultX: 250,
      paramLabel: 'Frecuencia de Resonancia ω₀',
      paramSymbol: 'ω₀',
      paramUnit: 'rad/s',
      paramMin: 120,
      paramMax: 400,
      paramStep: 10,
      defaultParam: 250,
      evalFn: (w, w0) => {
        const R = 10;
        const netX = 0.25 * (w - (w0 * w0) / Math.max(10, w));
        return 100 / Math.sqrt(R * R + netX * netX);
      },
      asymptoteInfo: (w0) => ({
        xAsymptote: w0,
        label: `Pico de Resonancia en ω = ω₀ = ${w0} rad/s (I_max = V₀/R)`
      }),
      analyzeRegime: (w, w0) => {
        if (Math.abs(w - w0) <= 5) {
          return {
            regimeTitle: '⚡ En Frecuencia Exacta de Resonancia (ω = ω₀ = 1/√(LC))',
            mathLimitExplanation: 'En ω = ω₀, X_L = ωL iguala a X_C = 1/(ωC). El paréntesis reactivo se anula y Z_min = R.',
            physicalMeaning: 'La energía oscila íntegramente entre el campo eléctrico del capacitor y el magnético del inductor; la fuente solo suple pérdidas en R.',
            colloquiumRule: 'En resonancia v_L(t) + v_C(t) = 0 en todo instante porque están desfasados 180° con igual amplitud.'
          };
        }
        return {
          regimeTitle: w < w0 ? 'Régimen Predominantemente Capacitivo (ω < ω₀)' : 'Régimen Predominantemente Inductivo (ω > ω₀)',
          mathLimitExplanation: w < w0 ? 'A bajas frecuencias X_C = 1/(ωC) domina sobre X_L, atrasando el voltaje respecto a la corriente.' : 'A altas frecuencias X_L = ωL domina sobre X_C, atrasando la corriente respecto al voltaje.',
          physicalMeaning: 'En los límites extremos ω → 0 (bloqueo del capacitor) y ω → ∞ (bloqueo del inductor), la corriente tiende a cero.',
          colloquiumRule: 'A menor resistencia R, más aguda y selectiva (mayor factor de calidad Q) es la campana de resonancia.'
        };
      }
    }
  ];

  currentModel: LimitModel = this.models[0];
  highestUnlockedUnit = 1;

  constructor(
    private katex: KatexRenderService,
    private api: Fisica2ApiService
  ) {}

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.currentModel.unitNumber > this.highestUnlockedUnit) {
        this.selectModel(this.unlockedModels[0] || this.models[0]);
      }
    });
    this.selectModel(this.models[0]);
  }

  get unlockedModels(): LimitModel[] {
    return this.models.filter(m => m.unitNumber <= this.highestUnlockedUnit);
  }

  selectModel(m: LimitModel) {
    this.currentModel = m;
    this.currentX = m.defaultX;
    this.currentParam = m.defaultParam;
  }

  getUnitArt(unitNumber: number): CieloArtName {
    const map: Record<number, CieloArtName> = {
      1: 'bulb',
      2: 'gauss-sphere',
      3: 'equipotential',
      4: 'capacitor',
      5: 'resistor',
      6: 'magnet',
      7: 'compass-ampere',
      8: 'coil',
      9: 'maxwell-wave',
    };
    return map[unitNumber] || 'bulb';
  }

  renderMath(expr: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(expr, displayMode);
  }

  setCharacteristicPoint() {
    const asym = this.currentModel.asymptoteInfo(this.currentParam);
    if (asym.xAsymptote !== undefined) {
      this.currentX = Number(asym.xAsymptote.toFixed(1));
    } else {
      this.currentX = this.currentModel.defaultX;
    }
  }

  get currentY(): number {
    return this.currentModel.evalFn(this.currentX, this.currentParam);
  }

  get currentAsymptote() {
    return this.currentModel.asymptoteInfo(this.currentParam);
  }

  get currentAnalysis() {
    return this.currentModel.analyzeRegime(this.currentX, this.currentParam, this.currentY);
  }

  private get maxCurveY(): number {
    let maxVal = 0.001;
    const m = this.currentModel;
    const steps = 80;
    const dx = (m.xMax - m.xMin) / steps;
    for (let i = 0; i <= steps; i++) {
      const x = m.xMin + i * dx;
      const y = m.evalFn(x, this.currentParam);
      if (y > maxVal) maxVal = y;
    }
    return maxVal * 1.12;
  }

  get curveLinePath(): string {
    const m = this.currentModel;
    const maxY = this.maxCurveY;
    const steps = 90;
    const dx = (m.xMax - m.xMin) / steps;
    const pts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = m.xMin + i * dx;
      const y = m.evalFn(x, this.currentParam);
      const sx = 65 + ((x - m.xMin) / (m.xMax - m.xMin)) * 500;
      const sy = 265 - (y / maxY) * 210;
      pts.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  get curveAreaPath(): string {
    return `${this.curveLinePath} L 565 265 L 65 265 Z`;
  }

  get currentPointScreen(): { x: number; y: number } {
    const m = this.currentModel;
    const maxY = this.maxCurveY;
    const sx = 65 + ((this.currentX - m.xMin) / (m.xMax - m.xMin)) * 500;
    const sy = 265 - (this.currentY / maxY) * 210;
    return { x: sx, y: sy };
  }

  get asymptoteScreenX(): number | null {
    const asym = this.currentAsymptote;
    if (asym.xAsymptote === undefined) return null;
    const m = this.currentModel;
    if (asym.xAsymptote < m.xMin || asym.xAsymptote > m.xMax) return null;
    return 65 + ((asym.xAsymptote - m.xMin) / (m.xMax - m.xMin)) * 500;
  }

  get asymptoteScreenY(): number | null {
    const asym = this.currentAsymptote;
    if (asym.yAsymptote === undefined) return null;
    return 265 - (asym.yAsymptote / this.maxCurveY) * 210;
  }
}
