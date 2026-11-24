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
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

export interface ConversionUnitOption {
  id: string;
  label: string;
  symbol: string;
  factorToBase: number; // valor en unidad base = valor * factorToBase
  exponentLabel: string;
  calcKeysHint: string;
}

export interface ConversionCategory {
  id: string;
  name: string;
  icon: string;
  baseUnitName: string;
  baseSymbol: string;
  examRule: string;
  quickPairs: { label: string; fromId: string; toId: string; sampleVal: number }[];
  units: ConversionUnitOption[];
}

export interface ProblemSolverTemplate {
  id: string;
  unitNumber: number;
  title: string;
  shortDesc: string;
  traditionalFormulaLatex: string;
  sampleStatement: string;
  inputs: {
    key: string;
    label: string;
    symbol: string;
    value: number;
    unitOptions: { label: string; factorToSI: number; siSymbol: string }[];
    selectedUnitIdx: number;
  }[];
  solve: (valsSI: Record<string, number>, rawInputs: any[]) => {
    resultValue: number;
    resultSIUnit: string;
    secondaryResults: { label: string; valueStr: string }[];
    conversionSteps: string[];
    substitutionLatex: string;
    stepByStepExplanation: string[];
    calculatorKeys: string[];
    calculatorWarning: string;
    diagramType: string;
  };
}

export interface SavedCustomProblem {
  id: string;
  createdAt: string;
  statement: string;
  templateId: string;
  unitNumber: number;
  title: string;
  resultSummary: string;
  inputsSnapshot: { label: string; val: number; unitLabel: string }[];
}

const SAVED_CUSTOM_PROBLEMS_KEY = 'fisica2_cielo_custom_problems_v1';

@Component({
  selector: 'app-calculadora',
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
        <ion-title>✦ Calculadora Científica, Conversor y Tus Prácticos ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="calc-studio-wrapper">

        <!-- ================================================================
             BANNER HERO ILUSTRADO
             ================================================================ -->
        <div class="cielo-hero-banner calc-hero">
          <div class="ch-art">
            <app-cielo-art name="tool-chalkboard" [width]="135" [height]="115"></app-cielo-art>
          </div>
          <div class="ch-copy">
            <span class="ch-pill">LABORATORIO DE CÁLCULO CIENTÍFICO • CONVERSIONES Y TUS PROPIOS TPs</span>
            <h1>Calculadora Científica, Conversor & Tus Ejercicios ♡</h1>
            <p>
              Ingresá cualquier ejercicio de tus prácticos para resolverlo paso a paso, convertí unidades
              (de cm a m, de pF a nF, de μC a C) y aprendé exactamente qué teclas apretar en tu calculadora científica.
            </p>
          </div>
        </div>

        <!-- ================================================================
             3 PESTAÑAS PRINCIPALES
             ================================================================ -->
        <div class="calc-tabs-bar">
          <button
            class="ct-btn"
            [class.active]="activeSection === 'resolver'"
            (click)="activeSection = 'resolver'"
          >
            <span class="ct-ico">📝</span>
            <div class="ct-txt">
              <strong>1. Ingresá tu Propio Ejercicio / TP</strong>
              <span>Pegá tu enunciado o cargá tus datos paso a paso</span>
            </div>
          </button>

          <button
            class="ct-btn"
            [class.active]="activeSection === 'conversor'"
            (click)="activeSection = 'conversor'"
          >
            <span class="ct-ico">🔄</span>
            <div class="ct-txt">
              <strong>2. Conversor de Unidades y Prefijos</strong>
              <span>cm ↔ m • pF ↔ nF ↔ μF • cm² ↔ m² • μC ↔ C</span>
            </div>
          </button>

          <button
            class="ct-btn"
            [class.active]="activeSection === 'cientifica'"
            (click)="activeSection = 'cientifica'"
          >
            <span class="ct-ico">🧮</span>
            <div class="ct-txt">
              <strong>3. Calculadora Científica & Entrenador</strong>
              <span>Teclado Casio FX en vivo + cómo teclear fórmulas</span>
            </div>
          </button>
        </div>

        <!-- ================================================================
             SECCIÓN 1: INGRESÁ TU PROPIO EJERCICIO DE PRÁCTICO (RESOLVEDOR PASO A PASO)
             ================================================================ -->
        <div *ngIf="activeSection === 'resolver'" class="section-pane">

          <!-- CAJA PARA ESCRIBIR O PEGAR ENUNCIADO LIBRE -->
          <div class="cielo-lavender-card custom-statement-card">
            <div class="csc-header">
              <div>
                <span class="badge-dark">✨ NUEVO MÓDULO DE PRÁCTICA PERSONALIZADA</span>
                <h2>Ingresá o pegá el enunciado de tu ejercicio de Práctico</h2>
                <p>
                  Escribí el problema que te dieron en clase o en la guía. El sistema detecta automáticamente el tema,
                  extrae los datos, convierte las unidades al Sistema Internacional, dibuja el esquema y te muestra cómo teclearlo en la calculadora.
                </p>
              </div>
            </div>

            <textarea
              [(ngModel)]="customProblemText"
              rows="3"
              class="statement-textarea"
              placeholder="Ejemplo: Dos cargas eléctricas de 4 uC y 6 nC están separadas 15 cm en el vacío. Calcular la fuerza eléctrica..."
            ></textarea>

            <div class="csc-actions">
              <button class="cielo-btn-purple" (click)="parseAndSolveFromStatement()">
                🔍 Analizar Enunciado y Resolver Paso a Paso
              </button>
              <button class="btn-outline-dark" (click)="saveCurrentCustomProblem()">
                💾 Guardar en Mis Prácticos ({{ savedProblems.length }})
              </button>
            </div>

            <div class="detected-banner" *ngIf="detectionMessage">
              {{ detectionMessage }}
            </div>
          </div>

          <!-- SELECTOR DE TIPO DE PROBLEMA / FÓRMULA TRADICIONAL (UNIDADES 1 A 9) -->
          <div class="cielo-dark-panel solver-workspace">
            <div class="sw-header">
              <span class="kicker-yellow">
                🔓 UNIDADES HABILITADAS: UNIDAD 1{{ highestUnlockedUnit > 1 ? (' A UNIDAD ' + highestUnlockedUnit) : ' (LAS DEMÁS SE SUMAN AL DESBLOQUEARLAS AL 100%)' }}
              </span>
              <h3>Plantillas Dinámicas de Resolución de Tus Unidades Desbloqueadas</h3>
            </div>

            <div class="template-pills-grid">
              <button
                *ngFor="let t of unlockedSolverTemplates"
                class="tpl-pill-btn"
                [class.active]="selectedTemplate.id === t.id"
                (click)="selectSolverTemplate(t)"
              >
                <span class="tp-unit">U{{ t.unitNumber }}</span>
                <span class="tp-title">{{ t.title }}</span>
              </button>
            </div>

            <div class="solver-two-cols" *ngIf="selectedTemplate && currentSolution as sol">

              <!-- COLUMNA IZQUIERDA: DATOS EDITABLES CON SUS UNIDADES + FÓRMULA TRADICIONAL -->
              <div class="cielo-lavender-card inputs-card">
                <span class="badge-dark">UNIDAD {{ selectedTemplate.unitNumber }} • FÓRMULA TRADICIONAL</span>
                <h3>{{ selectedTemplate.title }}</h3>
                <p class="ic-desc">{{ selectedTemplate.shortDesc }}</p>

                <!-- FÓRMULA TRADICIONAL ORDENADA EN TARJETA BLANCA DE CUADERNO -->
                <div class="traditional-formula-notebook">
                  <div class="tfn-tag">📐 FÓRMULA TRADICIONAL DE CÁTEDRA</div>
                  <div class="tfn-math" [innerHTML]="renderMath(selectedTemplate.traditionalFormulaLatex, true)"></div>
                </div>

                <!-- CAMPOS DE ENTRADA CON SELECTOR DE UNIDAD (cm, m, pF, nF, uF, etc.) -->
                <div class="inputs-stack">
                  <div class="input-row-box" *ngFor="let inp of selectedTemplate.inputs">
                    <label class="irb-label">
                      <span>{{ inp.label }} (<strong>{{ inp.symbol }}</strong>):</span>
                    </label>
                    <div class="irb-controls">
                      <input
                        type="number"
                        step="any"
                        [(ngModel)]="inp.value"
                        class="num-input"
                      />
                      <select [(ngModel)]="inp.selectedUnitIdx" class="unit-select">
                        <option *ngFor="let uOpt of inp.unitOptions; let idx = index" [ngValue]="idx">
                          {{ uOpt.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <button class="btn-load-sample" (click)="loadTemplateSample(selectedTemplate)">
                  📋 Cargar ejemplo típico de parcial de este tema
                </button>
              </div>

              <!-- COLUMNA DERECHA: RESOLUCIÓN PASO A PASO EN 4 ETAPAS + CALCULADORA CASIO -->
              <div class="solution-steps-column">

                <!-- PASO 1: ESQUEMA VISUAL EXPLICATIVO DEL EJERCICIO -->
                <div class="cielo-lavender-card step-result-card">
                  <div class="src-badge">🎨 PASO 1 • DIBUJO EXPLICATIVO DEL PROBLEMA</div>
                  <div class="problem-diagram-stage">
                    <!-- Diagrama Coulomb / Campo -->
                    <svg *ngIf="sol.diagramType === 'coulomb'" viewBox="0 0 460 125" class="prob-svg">
                      <rect x="6" y="6" width="448" height="113" rx="16" fill="#fffbeb" stroke="#191538" stroke-width="2.5" />
                      <line x1="115" y1="62" x2="345" y2="62" stroke="#64748b" stroke-width="2.5" stroke-dasharray="6 4" />
                      <!-- Flechas de fuerza -->
                      <line x1="115" y1="62" x2="48" y2="62" stroke="#e11d48" stroke-width="4" />
                      <polygon points="44,62 56,55 56,69" fill="#e11d48" />
                      <text x="68" y="45" fill="#e11d48" font-weight="900" font-size="13">F⃗₁₂</text>

                      <line x1="345" y1="62" x2="412" y2="62" stroke="#e11d48" stroke-width="4" />
                      <polygon points="416,62 404,55 404,69" fill="#e11d48" />
                      <text x="382" y="45" fill="#e11d48" font-weight="900" font-size="13">F⃗₂₁</text>

                      <!-- Carga 1 -->
                      <circle cx="115" cy="62" r="22" fill="#fb7185" stroke="#191538" stroke-width="3" />
                      <text x="115" y="67" text-anchor="middle" fill="#fff" font-weight="900" font-size="14">q₁</text>

                      <!-- Carga 2 -->
                      <circle cx="345" cy="62" r="22" fill="#38bdf8" stroke="#191538" stroke-width="3" />
                      <text x="345" y="67" text-anchor="middle" fill="#191538" font-weight="900" font-size="14">q₂</text>

                      <!-- Cota de distancia r -->
                      <line x1="115" y1="98" x2="345" y2="98" stroke="#191538" stroke-width="2" />
                      <text x="230" y="114" text-anchor="middle" fill="#191538" font-weight="900" font-size="12">
                        Distancia r convertida a metros (SI)
                      </text>
                    </svg>

                    <!-- Diagrama Capacitor Plano -->
                    <svg *ngIf="sol.diagramType === 'capacitor'" viewBox="0 0 460 125" class="prob-svg">
                      <rect x="6" y="6" width="448" height="113" rx="16" fill="#fffbeb" stroke="#191538" stroke-width="2.5" />
                      <!-- Placa superior +Q -->
                      <rect x="120" y="24" width="220" height="14" rx="4" fill="#fb7185" stroke="#191538" stroke-width="2.5" />
                      <text x="230" y="18" text-anchor="middle" fill="#be123c" font-weight="900" font-size="12">Placa Área A (+Q)</text>
                      <!-- Dieléctrico en el medio -->
                      <rect x="130" y="40" width="200" height="44" rx="6" fill="#ddd6fe" stroke="#7c5dfa" stroke-width="2" stroke-dasharray="5 3" />
                      <text x="230" y="66" text-anchor="middle" fill="#4c1d95" font-weight="900" font-size="13">Dieléctrico κ • Campo E⃗ ↓</text>
                      <!-- Placa inferior -Q -->
                      <rect x="120" y="86" width="220" height="14" rx="4" fill="#38bdf8" stroke="#191538" stroke-width="2.5" />
                      <text x="230" y="114" text-anchor="middle" fill="#0369a1" font-weight="900" font-size="12">Separación d en metros (-Q)</text>
                    </svg>

                    <!-- Diagrama Circuito RC / Ohm / RLC -->
                    <svg *ngIf="sol.diagramType === 'circuit'" viewBox="0 0 460 125" class="prob-svg">
                      <rect x="6" y="6" width="448" height="113" rx="16" fill="#fffbeb" stroke="#191538" stroke-width="2.5" />
                      <rect x="70" y="28" width="320" height="68" fill="none" stroke="#191538" stroke-width="3" />
                      <!-- Fuente -->
                      <circle cx="70" cy="62" r="18" fill="#fde047" stroke="#191538" stroke-width="2.5" />
                      <text x="70" y="67" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">ε / V</text>
                      <!-- Resistor -->
                      <rect x="175" y="18" width="75" height="20" rx="4" fill="#fca5a5" stroke="#191538" stroke-width="2.5" />
                      <text x="212" y="32" text-anchor="middle" fill="#191538" font-weight="900" font-size="12">R (Ω)</text>
                      <!-- Elemento Reactivo C o L -->
                      <rect x="355" y="45" width="70" height="34" rx="8" fill="#a7f3d0" stroke="#191538" stroke-width="2.5" />
                      <text x="390" y="66" text-anchor="middle" fill="#064e3b" font-weight="900" font-size="12">C / L</text>
                      <!-- Corriente i(t) -->
                      <text x="230" y="68" text-anchor="middle" fill="#7c5dfa" font-weight="900" font-size="13">Corriente I →</text>
                    </svg>

                    <!-- Diagrama Magnético / Solenoide / Ciclotrón -->
                    <svg *ngIf="sol.diagramType === 'magnetic'" viewBox="0 0 460 125" class="prob-svg">
                      <rect x="6" y="6" width="448" height="113" rx="16" fill="#fffbeb" stroke="#191538" stroke-width="2.5" />
                      <!-- Bobina / Solenoide y líneas de campo B -->
                      <line x1="45" y1="62" x2="415" y2="62" stroke="#10b981" stroke-width="4" />
                      <polygon points="420,62 406,54 406,70" fill="#10b981" />
                      <g fill="none" stroke="#d97706" stroke-width="4">
                        <ellipse cx="145" cy="62" rx="18" ry="34" />
                        <ellipse cx="185" cy="62" rx="18" ry="34" />
                        <ellipse cx="225" cy="62" rx="18" ry="34" />
                        <ellipse cx="265" cy="62" rx="18" ry="34" />
                        <ellipse cx="305" cy="62" rx="18" ry="34" />
                      </g>
                      <text x="230" y="114" text-anchor="middle" fill="#191538" font-weight="900" font-size="12">
                        Campo Magnético B⃗ en Teslas (T) • Regla de la Mano Derecha
                      </text>
                    </svg>
                  </div>
                </div>

                <!-- PASO 2: CONVERSIÓN DE UNIDADES AL SISTEMA INTERNACIONAL (SI) -->
                <div class="cielo-lavender-card step-result-card">
                  <div class="src-badge">🔄 PASO 2 • PASAR TODOS LOS DATOS AL SISTEMA INTERNACIONAL (SI)</div>
                  <p class="src-note">
                    ⚠️ <strong>Regla de Oro antes de usar la fórmula:</strong> Nunca metas centímetros, milímetros, microcoulombs o picofaradios directos sin pasarlos antes a metros, Coulombs y Faradios:
                  </p>
                  <ul class="conversion-steps-list">
                    <li *ngFor="let cs of sol.conversionSteps">{{ cs }}</li>
                  </ul>
                </div>

                <!-- PASO 3: REEMPLAZO EN LA FÓRMULA TRADICIONAL Y RESULTADO -->
                <div class="cielo-lavender-card step-result-card">
                  <div class="src-badge">📐 PASO 3 • REEMPLAZO ORDENADO EN LA FÓRMULA Y RESULTADO</div>
                  <div class="traditional-formula-notebook" style="margin: 10px 0;">
                    <div class="tfn-math" [innerHTML]="renderMath(sol.substitutionLatex, true)"></div>
                  </div>

                  <div class="final-answer-banner">
                    <div class="fab-lbl">RESULTADO FINAL EN UNIDADES DEL SISTEMA INTERNACIONAL</div>
                    <div class="fab-val">{{ formatNumberClean(sol.resultValue) }} {{ sol.resultSIUnit }}</div>
                    <div class="fab-sci">Notación científica: {{ sol.resultValue.toExponential(3) }} {{ sol.resultSIUnit }}</div>
                  </div>

                  <div class="secondary-results-row" *ngIf="sol.secondaryResults.length > 0">
                    <div class="sec-pill" *ngFor="let sr of sol.secondaryResults">
                      <span>{{ sr.label }}:</span>
                      <strong>{{ sr.valueStr }}</strong>
                    </div>
                  </div>

                  <div class="explanation-bullets">
                    <div class="eb-item" *ngFor="let st of sol.stepByStepExplanation">
                      {{ st }}
                    </div>
                  </div>
                </div>

                <!-- PASO 4: ¿CÓMO PONERLO EN LA CALCULADORA CIENTÍFICA? -->
                <div class="chalkboard-calc-guide">
                  <div class="ccg-badge">🧮 PASO 4 • ¿QUÉ TECLAS APRETAR EN TU CALCULADORA CIENTÍFICA?</div>
                  <h4>Secuencia exacta botón por botón (Casio fx-82 / fx-95 / fx-570 / fx-991):</h4>
                  <div class="calc-key-sequence">
                    <span class="calc-key-cap" *ngFor="let k of sol.calculatorKeys">{{ k }}</span>
                  </div>
                  <div class="calc-warning-box">
                    💡 <strong>Cuidado en la calculadora:</strong> {{ sol.calculatorWarning }}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- LISTA DE PRÁCTICOS GUARDADOS POR CIELO -->
          <div class="cielo-dark-panel saved-problems-panel" *ngIf="savedProblems.length > 0">
            <div class="sw-header">
              <span class="kicker-yellow">🗂️ TUS EJERCICIOS DE PRÁCTICO GUARDADOS</span>
              <h3>Mis Prácticos Personalizados ({{ savedProblems.length }})</h3>
            </div>
            <div class="saved-grid">
              <div class="cielo-lavender-card saved-item" *ngFor="let sp of savedProblems">
                <div class="si-top">
                  <span class="badge-dark">Unidad {{ sp.unitNumber }} • {{ sp.title }}</span>
                  <button class="si-del" (click)="deleteSavedProblem(sp.id)">✕</button>
                </div>
                <p class="si-stmt">"{{ sp.statement }}"</p>
                <div class="si-res">✅ {{ sp.resultSummary }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================================================================
             SECCIÓN 2: CONVERSOR DE UNIDADES Y PREFIJOS PASO A PASO
             ================================================================ -->
        <div *ngIf="activeSection === 'conversor'" class="section-pane">

          <!-- ESCALERA VISUAL DE PREFIJOS CIENTÍFICOS -->
          <div class="cielo-lavender-card prefix-ladder-card">
            <div class="plc-top">
              <span class="badge-dark">📏 TABLA VISUAL DE PREFIJOS DE FÍSICA 2</span>
              <h2>¿Cómo pasar de mili, micro, nano y pico a la unidad base?</h2>
              <p>
                En tu calculadora científica, la tecla <strong>[EXP]</strong> o <strong>[×10ˣ]</strong> reemplaza directamente al prefijo.
                Por ejemplo, para escribir <strong>5 pF</strong> (picofaradios), tecleás: <code>5</code> → <code>[×10ˣ]</code> → <code>[(-)]</code> → <code>12</code>.
              </p>
            </div>

            <div class="prefix-badges-strip">
              <div class="pf-tile mega">
                <span class="pf-sym">M (Mega)</span>
                <strong>× 10⁶</strong>
                <small>1 000 000</small>
              </div>
              <div class="pf-tile kilo">
                <span class="pf-sym">k (kilo)</span>
                <strong>× 10³</strong>
                <small>1 000</small>
              </div>
              <div class="pf-tile base">
                <span class="pf-sym">UNIDAD SI</span>
                <strong>× 10⁰ = 1</strong>
                <small>m, C, F, A, V, Ω, T, H</small>
              </div>
              <div class="pf-tile centi">
                <span class="pf-sym">c (centi)</span>
                <strong>× 10⁻²</strong>
                <small>÷ 100 (0,01)</small>
              </div>
              <div class="pf-tile mili">
                <span class="pf-sym">m (mili)</span>
                <strong>× 10⁻³</strong>
                <small>÷ 1 000</small>
              </div>
              <div class="pf-tile micro">
                <span class="pf-sym">μ (micro)</span>
                <strong>× 10⁻⁶</strong>
                <small>Millonésima</small>
              </div>
              <div class="pf-tile nano">
                <span class="pf-sym">n (nano)</span>
                <strong>× 10⁻⁹</strong>
                <small>Milmillonésima</small>
              </div>
              <div class="pf-tile pico">
                <span class="pf-sym">p (pico)</span>
                <strong>× 10⁻¹²</strong>
                <small>Billonésima</small>
              </div>
            </div>
          </div>

          <!-- SELECTOR DE LAS 8 CATEGORÍAS DE CONVERSIÓN -->
          <div class="cielo-dark-panel converter-main-panel">
            <div class="cat-buttons-grid">
              <button
                *ngFor="let cat of conversionCategories"
                class="cat-pill-btn"
                [class.active]="selectedConvCategory.id === cat.id"
                (click)="selectConversionCategory(cat)"
              >
                <span class="cp-ico">{{ cat.icon }}</span>
                <span class="cp-name">{{ cat.name }}</span>
              </button>
            </div>

            <!-- BOTONES RÁPIDOS 1-CLICK (EJ: pF a nF, cm a m, cm² a m²) -->
            <div class="quick-pairs-bar">
              <span class="qpb-lbl">⚡ Conversiones rápidas más pedidas en examen:</span>
              <button
                *ngFor="let qp of selectedConvCategory.quickPairs"
                class="qp-chip"
                (click)="applyQuickPair(qp)"
              >
                {{ qp.label }}
              </button>
            </div>

            <!-- CAJA INTERACTIVA DE CONVERSIÓN -->
            <div class="converter-two-cols">
              <div class="cielo-lavender-card conv-input-card">
                <span class="badge-dark">{{ selectedConvCategory.name | uppercase }}</span>
                <h3>Ingresá el valor y elegí las unidades</h3>

                <div class="conv-field-group">
                  <label>Valor que tenés en el enunciado:</label>
                  <input type="number" step="any" [(ngModel)]="convInputValue" class="conv-big-input" />
                </div>

                <div class="conv-field-group">
                  <label>De la unidad (Origen):</label>
                  <select [(ngModel)]="convFromUnitId" class="conv-select">
                    <option *ngFor="let u of selectedConvCategory.units" [ngValue]="u.id">
                      {{ u.label }} ({{ u.symbol }}) — [{{ u.exponentLabel }}]
                    </option>
                  </select>
                </div>

                <div class="swap-btn-row">
                  <button class="btn-swap" (click)="swapConversionUnits()">
                    ⇅ Invertir Unidades (De ↔ A)
                  </button>
                </div>

                <div class="conv-field-group">
                  <label>A la unidad que querés obtener (Destino):</label>
                  <select [(ngModel)]="convToUnitId" class="conv-select">
                    <option *ngFor="let u of selectedConvCategory.units" [ngValue]="u.id">
                      {{ u.label }} ({{ u.symbol }}) — [{{ u.exponentLabel }}]
                    </option>
                  </select>
                </div>
              </div>

              <!-- RESULTADO Y EXPLICACIÓN DE CÓMO SE HACE -->
              <div class="cielo-lavender-card conv-output-card">
                <span class="badge-dark">✅ RESULTADO Y EXPLICACIÓN PASO A PASO</span>
                <div class="conv-big-result-box">
                  <div class="cbr-from">{{ convInputValue }} {{ fromUnitObj.symbol }} equivale a:</div>
                  <div class="cbr-to">{{ formatNumberClean(convertedResultValue) }} {{ toUnitObj.symbol }}</div>
                  <div class="cbr-sci">
                    En notación científica: <strong>{{ convertedResultValue.toExponential(4) }} {{ toUnitObj.symbol }}</strong>
                  </div>
                  <div class="cbr-si">
                    En unidad base del SI ({{ selectedConvCategory.baseSymbol }}):
                    <strong>{{ valueInBaseSI.toExponential(4) }} {{ selectedConvCategory.baseSymbol }}</strong>
                  </div>
                </div>

                <!-- EXPLICACIÓN DE CÓMO SE HACE EN EL PAPEL -->
                <div class="how-to-paper-box">
                  <h4>📝 ¿Cómo se hace esta conversión paso a paso?</h4>
                  <p>{{ conversionStepExplanation }}</p>
                  <div class="traditional-formula-notebook" style="margin-top: 8px;">
                    <div class="tfn-math" [innerHTML]="renderMath(conversionLatexEquation, true)"></div>
                  </div>
                </div>

                <!-- CÓMO TECLEARLO EN LA CALCULADORA -->
                <div class="chalkboard-calc-guide" style="margin-top: 12px;">
                  <div class="ccg-badge">🧮 ¿CÓMO PONERLO EN LA CALCULADORA CIENTÍFICA?</div>
                  <div class="calc-key-sequence">
                    <span class="calc-key-cap" *ngFor="let k of conversionCalculatorKeys">{{ k }}</span>
                  </div>
                  <p style="margin: 8px 0 0 0; color: #fde047; font-size: 0.84rem; font-weight: 700;">
                    📌 {{ selectedConvCategory.examRule }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================================================================
             SECCIÓN 3: CALCULADORA CIENTÍFICA CASIO EN PANTALLA + GUÍA DE TECLAS
             ================================================================ -->
        <div *ngIf="activeSection === 'cientifica'" class="section-pane">
          <div class="scientific-calc-grid">

            <!-- SIMULADOR DE CALCULADORA CIENTÍFICA FÍSICA EN PANTALLA -->
            <div class="casio-frame">
              <div class="casio-top-brand">
                <div class="ctb-left">
                  <strong>CIELO FX-991 ES PLUS</strong>
                  <span>NATURAL-V.P.A.M. • FÍSICA 2 EDITION ♡</span>
                </div>
                <button class="deg-rad-pill" (click)="calcAngleMode = calcAngleMode === 'DEG' ? 'RAD' : 'DEG'">
                  MODO: {{ calcAngleMode }}
                </button>
              </div>

              <!-- PANTALLA LCD DE LA CALCULADORA -->
              <div class="casio-lcd">
                <div class="lcd-expr">{{ calcExpression || '0' }}</div>
                <div class="lcd-result">{{ calcDisplayResult }}</div>
                <div class="lcd-eng-row" *ngIf="calcNumericResult !== null">
                  <span>Notación Científica: <strong>{{ calcNumericResult.toExponential(4) }}</strong></span>
                  <span>Prefijo ENG: <strong>{{ formatEngineering(calcNumericResult) }}</strong></span>
                </div>
              </div>

              <!-- BOTONES DE CONSTANTES FÍSICAS DE 1 CLICK -->
              <div class="constants-strip">
                <button class="const-btn" (click)="insertConstant('8.99e9', 'k (9×10⁹)')">k = 8.99×10⁹</button>
                <button class="const-btn" (click)="insertConstant('8.854e-12', 'ε₀')">ε₀ = 8.85×10⁻¹²</button>
                <button class="const-btn" (click)="insertConstant('1.2566e-6', 'μ₀ (4π×10⁻⁷)')">μ₀ = 4π×10⁻⁷</button>
                <button class="const-btn" (click)="insertConstant('1.602e-19', 'qₑ')">qₑ = 1.6×10⁻¹⁹</button>
                <button class="const-btn" (click)="insertConstant('9.109e-31', 'mₑ')">mₑ = 9.11×10⁻³¹</button>
                <button class="const-btn" (click)="insertConstant('1.673e-27', 'mₚ')">mₚ = 1.67×10⁻²⁷</button>
              </div>

              <!-- TECLADO CIENTÍFICO -->
              <div class="casio-keypad">
                <button class="ck fn" (click)="appendCalc('(')">(</button>
                <button class="ck fn" (click)="appendCalc(')')">)</button>
                <button class="ck fn" (click)="appendCalc('^2')">x²</button>
                <button class="ck fn" (click)="appendCalc('^')">xʸ</button>
                <button class="ck fn" (click)="appendCalc('sqrt(')">√(</button>

                <button class="ck fn" (click)="appendCalc('exp(')">eˣ</button>
                <button class="ck fn" (click)="appendCalc('ln(')">ln(</button>
                <button class="ck fn" (click)="appendCalc('sin(')">sin</button>
                <button class="ck fn" (click)="appendCalc('cos(')">cos</button>
                <button class="ck fn" (click)="appendCalc('atan(')">tan⁻¹</button>

                <button class="ck num" (click)="appendCalc('7')">7</button>
                <button class="ck num" (click)="appendCalc('8')">8</button>
                <button class="ck num" (click)="appendCalc('9')">9</button>
                <button class="ck del" (click)="backspaceCalc()">DEL</button>
                <button class="ck ac" (click)="clearCalc()">AC</button>

                <button class="ck num" (click)="appendCalc('4')">4</button>
                <button class="ck num" (click)="appendCalc('5')">5</button>
                <button class="ck num" (click)="appendCalc('6')">6</button>
                <button class="ck op" (click)="appendCalc('*')">×</button>
                <button class="ck op" (click)="appendCalc('/')">÷</button>

                <button class="ck num" (click)="appendCalc('1')">1</button>
                <button class="ck num" (click)="appendCalc('2')">2</button>
                <button class="ck num" (click)="appendCalc('3')">3</button>
                <button class="ck op" (click)="appendCalc('+')">+</button>
                <button class="ck op" (click)="appendCalc('-')">−</button>

                <button class="ck num" (click)="appendCalc('0')">0</button>
                <button class="ck num" (click)="appendCalc('.')">.</button>
                <button class="ck exp-key" (click)="appendCalc('e')">×10ˣ (EXP)</button>
                <button class="ck fn" (click)="appendCalc('pi')">π</button>
                <button class="ck eq" (click)="evaluateCalc()">=</button>
              </div>
            </div>

            <!-- MANUAL PRÁCTICO DE USO DE LA CALCULADORA CIENTÍFICA EN EXÁMENES -->
            <div class="cielo-lavender-card calc-manual-card">
              <span class="badge-dark">🎓 CURSO RÁPIDO: CÓMO NO EQUIVOCARTE CON LA CALCULADORA EN EL PARCIAL</span>
              <h3>Los 5 Secretos de la Calculadora Científica en Física 2</h3>

              <div class="manual-tips-stack">
                <div class="mt-box">
                  <div class="mt-title">1. La tecla <code>[EXP]</code> o <code>[×10ˣ]</code> YA incluye el "10^"</div>
                  <p>
                    ¡El error número 1 en parciales! Para escribir <strong>8,85 × 10⁻¹²</strong>, <strong>NO</strong> aprietes
                    <code>× 10 ^ -12</code>. Apretá directamente:
                    <span class="inline-key">8.85</span> <span class="inline-key">×10ˣ</span> <span class="inline-key">(-)</span> <span class="inline-key">12</span>.
                    Si ponés <code>× 10</code> además de <code>EXP</code>, multiplicás por 10 de más.
                  </p>
                </div>

                <div class="mt-box">
                  <div class="mt-title">2. Paréntesis obligatorios en el denominador</div>
                  <p>
                    En fórmulas como <strong>E = λ / (2 · π · ε₀ · r)</strong> o <strong>X_C = 1 / (2 · π · f · C)</strong>,
                    siempre abrí paréntesis después del signo dividir:
                    <span class="inline-key">1</span> <span class="inline-key">÷</span> <span class="inline-key">(</span>
                    <span class="inline-key">2</span> <span class="inline-key">×</span> <span class="inline-key">π</span>
                    <span class="inline-key">×</span> <span class="inline-key">50</span> <span class="inline-key">×</span>
                    <span class="inline-key">10</span> <span class="inline-key">×10ˣ</span> <span class="inline-key">-6</span>
                    <span class="inline-key">)</span>.
                  </p>
                </div>

                <div class="mt-box">
                  <div class="mt-title">3. Tecla de signo negativo <code>[(-)]</code> vs Tecla de resta <code>[−]</code></div>
                  <p>
                    Para exponentes negativos (como <strong>10⁻⁶</strong> o <strong>e⁻ᵗ/τ</strong>), usá el botón <span class="inline-key">(-)</span>
                    que está entre paréntesis arriba a la izquierda del teclado, no el botón grande de resta.
                  </p>
                </div>

                <div class="mt-box">
                  <div class="mt-title">4. Cómo calcular la exponencial <strong>e⁻ᵗ/τ</strong> en Circuitos RC y RL</div>
                  <p>
                    En tu Casio apretá <span class="inline-key">SHIFT</span> + <span class="inline-key">ln</span> (aparece <code>e^(</code> en pantalla),
                    y luego poné <span class="inline-key">(-)</span> <span class="inline-key">t</span> <span class="inline-key">÷</span> <span class="inline-key">τ</span> <span class="inline-key">)</span>.
                  </p>
                </div>

                <div class="mt-box">
                  <div class="mt-title">5. La tecla mágica <code>[ENG]</code> para responder en <strong>μF, nF o pF</strong></div>
                  <p>
                    Cuando la calculadora te da un resultado y apretás <span class="inline-key">ENG</span> (o <span class="inline-key">SHIFT</span> + <span class="inline-key">ENG</span>),
                    el exponente salta de 3 en 3 (<strong>10⁻³ = mili</strong>, <strong>10⁻⁶ = micro</strong>, <strong>10⁻⁹ = nano</strong>, <strong>10⁻¹² = pico</strong>).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .calc-studio-wrapper {
      max-width: 1340px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .calc-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 780px) {
      .calc-hero { grid-template-columns: 1fr; text-align: center; }
      .ch-art { display: flex; justify-content: center; }
    }
    .ch-pill {
      display: inline-block;
      background: #7c5dfa;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 6px;
    }
    .ch-copy h1 {
      font-family: var(--font-display);
      font-size: 1.9rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 6px 0;
    }
    .ch-copy p {
      color: #362f63;
      font-weight: 700;
      font-size: 0.94rem;
      margin: 0;
    }

    /* PESTAÑAS */
    .calc-tabs-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    @media (max-width: 900px) {
      .calc-tabs-bar { grid-template-columns: 1fr; }
    }
    .ct-btn {
      background: linear-gradient(180deg, #252b5c 0%, #191e45 100%);
      border: 3px solid #48508a;
      border-radius: 20px;
      padding: 14px 18px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
      box-shadow: 0 6px 0 #10132e;
      transition: all 0.18s ease;
    }
    .ct-btn:hover {
      transform: translateY(-2px);
      border-color: #a992ff;
    }
    .ct-btn.active {
      background: linear-gradient(180deg, #efeaff 0%, #d9cbff 100%);
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 6px 0 #5b3ec8;
    }
    .ct-ico { font-size: 2rem; }
    .ct-txt { display: flex; flex-direction: column; gap: 2px; }
    .ct-txt strong { font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; }
    .ct-txt span { font-size: 0.78rem; font-weight: 700; opacity: 0.85; }

    .section-pane {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* SECCIÓN 1: INGRESO DE ENUNCIADO PERSONALIZADO */
    .custom-statement-card {
      padding: 22px 26px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .badge-dark {
      display: inline-block;
      background: #191538;
      color: #fde047;
      font-size: 0.72rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 6px;
    }
    .custom-statement-card h2 {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 4px 0;
    }
    .custom-statement-card p {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #362f63;
    }
    .statement-textarea {
      width: 100%;
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 18px;
      padding: 14px 16px;
      font-family: var(--font-sans);
      font-size: 0.96rem;
      font-weight: 700;
      color: #191538;
      resize: vertical;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.08);
    }
    .csc-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn-outline-dark {
      background: #ffffff;
      border: 2.5px solid #191538;
      color: #191538;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.92rem;
      padding: 10px 18px;
      border-radius: 99px;
      cursor: pointer;
      box-shadow: 0 4px 0 #191538;
    }
    .detected-banner {
      background: #d1fae5;
      border: 2.5px solid #10b981;
      color: #064e3b;
      padding: 10px 16px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 0.9rem;
    }

    /* WORKSPACE DE PLANTILLAS DE EJERCICIOS */
    .solver-workspace, .saved-problems-panel, .converter-main-panel {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .kicker-yellow {
      color: #fde047;
      font-size: 0.75rem;
      font-weight: 900;
      letter-spacing: 0.05em;
    }
    .sw-header h3 {
      font-family: var(--font-display);
      font-size: 1.45rem;
      color: #ffffff;
      margin: 4px 0 0 0;
    }
    .template-pills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
      gap: 10px;
    }
    .tpl-pill-btn {
      background: #191e45;
      border: 2.5px solid #48508a;
      border-radius: 16px;
      padding: 10px 12px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: left;
      transition: all 0.15s;
    }
    .tpl-pill-btn:hover { border-color: #a992ff; }
    .tpl-pill-btn.active {
      background: #efeaff;
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 4px 0 #7c5dfa;
    }
    .tp-unit {
      background: #7c5dfa;
      color: #ffffff;
      font-weight: 900;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .tp-title {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 800;
      line-height: 1.2;
    }

    .solver-two-cols {
      display: grid;
      grid-template-columns: 410px 1fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 1040px) {
      .solver-two-cols { grid-template-columns: 1fr; }
    }
    .inputs-card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .inputs-card h3 {
      font-family: var(--font-display);
      font-size: 1.35rem;
      color: #191538;
      margin: 0;
    }
    .ic-desc {
      margin: 0;
      font-size: 0.86rem;
      font-weight: 700;
      color: #362f63;
    }

    /* FÓRMULA TRADICIONAL ESTILO CUADERNO ORDENADO */
    .traditional-formula-notebook {
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 18px;
      padding: 14px 16px;
      text-align: center;
      box-shadow: 0 5px 0 #7c5dfa;
      overflow-x: auto;
    }
    .tfn-tag {
      font-size: 0.68rem;
      font-weight: 900;
      color: #5b3ec8;
      letter-spacing: 0.06em;
      margin-bottom: 6px;
    }
    .tfn-math {
      color: #191538;
      font-size: 1.25rem;
    }

    .inputs-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .input-row-box {
      background: rgba(255, 255, 255, 0.72);
      border: 2px solid #9d7eff;
      border-radius: 14px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .irb-label {
      font-size: 0.84rem;
      font-weight: 800;
      color: #191538;
    }
    .irb-controls {
      display: grid;
      grid-template-columns: 1fr 145px;
      gap: 8px;
    }
    .num-input, .unit-select {
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 10px;
      padding: 7px 10px;
      font-weight: 800;
      font-size: 0.9rem;
      color: #191538;
    }
    .btn-load-sample {
      background: #191538;
      color: #fde047;
      border: none;
      border-radius: 12px;
      padding: 10px;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }

    /* COLUMNA DE PASOS DE RESOLUCIÓN */
    .solution-steps-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .step-result-card {
      padding: 18px 20px;
    }
    .src-badge {
      display: inline-block;
      background: #7c5dfa;
      color: #ffffff;
      font-weight: 900;
      font-size: 0.74rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 10px;
    }
    .src-note {
      margin: 0 0 8px 0;
      font-size: 0.86rem;
      color: #2d2556;
    }
    .conversion-steps-list {
      margin: 0;
      padding-left: 20px;
      font-size: 0.92rem;
      font-weight: 800;
      color: #191538;
      line-height: 1.65;
    }
    .prob-svg {
      width: 100%;
      max-height: 130px;
      display: block;
    }
    .final-answer-banner {
      background: #191538;
      border: 3px solid #10b981;
      border-radius: 18px;
      padding: 14px 18px;
      text-align: center;
      margin: 12px 0;
    }
    .fab-lbl {
      color: #6ee7b7;
      font-size: 0.7rem;
      font-weight: 900;
      letter-spacing: 0.06em;
    }
    .fab-val {
      color: #fde047;
      font-family: var(--font-mono);
      font-size: 1.85rem;
      font-weight: 900;
      margin: 4px 0;
    }
    .fab-sci {
      color: #e2e8f0;
      font-size: 0.84rem;
      font-weight: 700;
    }
    .secondary-results-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
    .sec-pill {
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 12px;
      padding: 6px 12px;
      font-size: 0.84rem;
      color: #191538;
      display: flex;
      gap: 6px;
    }
    .explanation-bullets {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .eb-item {
      background: rgba(255, 255, 255, 0.7);
      border-left: 4px solid #7c5dfa;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.86rem;
      font-weight: 700;
      color: #191538;
    }

    /* PIZARRÓN DE TECLAS DE CALCULADORA */
    .chalkboard-calc-guide {
      background: linear-gradient(180deg, #1b4332 0%, #122d22 100%);
      border: 7px solid #d97706;
      border-radius: 22px;
      padding: 18px 20px;
      box-shadow: inset 0 0 24px rgba(0,0,0,0.45), 0 7px 0 #0f132e;
    }
    .ccg-badge {
      display: inline-block;
      background: #fde047;
      color: #191538;
      font-weight: 900;
      font-size: 0.74rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 8px;
    }
    .chalkboard-calc-guide h4 {
      color: #ffffff;
      font-family: var(--font-display);
      font-size: 1.05rem;
      margin: 0 0 10px 0;
    }
    .calc-key-sequence {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-bottom: 12px;
    }
    .calc-key-cap {
      background: #1e293b;
      border: 2px solid #94a3b8;
      border-bottom-width: 4px;
      color: #fde047;
      font-family: var(--font-mono);
      font-size: 0.86rem;
      font-weight: 900;
      padding: 6px 11px;
      border-radius: 10px;
    }
    .calc-warning-box {
      background: rgba(253, 224, 71, 0.16);
      border: 1.5px solid #fde047;
      color: #fef9c3;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
    }

    /* GUARDADOS */
    .saved-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 14px;
    }
    .saved-item { padding: 16px; }
    .si-top { display: flex; justify-content: space-between; align-items: center; }
    .si-del {
      background: #fb7185;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      font-weight: 900;
      cursor: pointer;
    }
    .si-stmt { font-size: 0.86rem; font-weight: 700; color: #191538; margin: 8px 0; }
    .si-res { font-size: 0.88rem; font-weight: 900; color: #065f46; background: #d1fae5; padding: 6px 10px; border-radius: 10px; }

    /* SECCIÓN 2: CONVERSOR */
    .prefix-ladder-card {
      padding: 22px;
    }
    .prefix-ladder-card h2 {
      font-family: var(--font-display);
      font-size: 1.45rem;
      color: #191538;
      margin: 4px 0;
    }
    .prefix-ladder-card p {
      margin: 0 0 14px 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #2f275c;
    }
    .prefix-badges-strip {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
    }
    @media (max-width: 1020px) {
      .prefix-badges-strip { grid-template-columns: repeat(4, 1fr); }
    }
    @media (max-width: 560px) {
      .prefix-badges-strip { grid-template-columns: repeat(2, 1fr); }
    }
    .pf-tile {
      background: #ffffff;
      border: 2.5px solid #191538;
      border-radius: 14px;
      padding: 10px 8px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 2px;
      box-shadow: 0 4px 0 #191538;
    }
    .pf-tile.base {
      background: #fde047;
    }
    .pf-sym { font-size: 0.78rem; font-weight: 900; color: #5b3ec8; }
    .pf-tile strong { font-family: var(--font-mono); font-size: 1rem; color: #191538; }
    .pf-tile small { font-size: 0.7rem; font-weight: 700; color: #475569; }

    .cat-buttons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
      gap: 10px;
    }
    .cat-pill-btn {
      background: #191e45;
      border: 2.5px solid #48508a;
      border-radius: 16px;
      padding: 10px 14px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.92rem;
    }
    .cat-pill-btn.active {
      background: #efeaff;
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 4px 0 #7c5dfa;
    }
    .cp-ico { font-size: 1.35rem; }

    .quick-pairs-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      background: rgba(25, 21, 56, 0.6);
      padding: 10px 14px;
      border-radius: 14px;
    }
    .qpb-lbl {
      color: #fde047;
      font-size: 0.82rem;
      font-weight: 800;
    }
    .qp-chip {
      background: #7c5dfa;
      border: 2px solid #ffffff;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.78rem;
      padding: 5px 12px;
      border-radius: 99px;
      cursor: pointer;
    }
    .qp-chip:hover { background: #5b3ec8; }

    .converter-two-cols {
      display: grid;
      grid-template-columns: 390px 1fr;
      gap: 20px;
    }
    @media (max-width: 980px) {
      .converter-two-cols { grid-template-columns: 1fr; }
    }
    .conv-input-card, .conv-output-card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .conv-input-card h3 {
      font-family: var(--font-display);
      font-size: 1.3rem;
      color: #191538;
      margin: 0;
    }
    .conv-field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .conv-field-group label {
      font-size: 0.84rem;
      font-weight: 800;
      color: #191538;
    }
    .conv-big-input, .conv-select {
      background: #ffffff;
      border: 2.5px solid #191538;
      border-radius: 14px;
      padding: 10px 14px;
      font-size: 1rem;
      font-weight: 800;
      color: #191538;
    }
    .swap-btn-row { display: flex; justify-content: center; }
    .btn-swap {
      background: #191538;
      color: #fde047;
      border: none;
      border-radius: 99px;
      padding: 7px 16px;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .conv-big-result-box {
      background: #191538;
      border: 3px solid #7c5dfa;
      border-radius: 18px;
      padding: 16px;
      text-align: center;
    }
    .cbr-from { color: #c4b5fd; font-size: 0.86rem; font-weight: 800; }
    .cbr-to { color: #fde047; font-family: var(--font-mono); font-size: 2rem; font-weight: 900; margin: 6px 0; }
    .cbr-sci, .cbr-si { color: #e2e8f0; font-size: 0.85rem; margin-top: 4px; }
    .how-to-paper-box {
      background: rgba(255, 255, 255, 0.72);
      border: 2px solid #9d7eff;
      border-radius: 16px;
      padding: 14px;
    }
    .how-to-paper-box h4 { margin: 0 0 6px 0; color: #191538; font-family: var(--font-display); font-size: 1.05rem; }
    .how-to-paper-box p { margin: 0; font-size: 0.88rem; font-weight: 700; color: #2d2556; line-height: 1.5; }

    /* SECCIÓN 3: CALCULADORA CIENTÍFICA EN PANTALLA */
    .scientific-calc-grid {
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 22px;
      align-items: start;
    }
    @media (max-width: 980px) {
      .scientific-calc-grid { grid-template-columns: 1fr; }
    }
    .casio-frame {
      background: linear-gradient(180deg, #283048 0%, #191e2e 100%);
      border: 4px solid #10132e;
      border-radius: 28px;
      padding: 20px;
      box-shadow: 0 12px 0 #0a0c1d, 0 20px 40px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .casio-top-brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #e2e8f0;
    }
    .ctb-left { display: flex; flex-direction: column; }
    .ctb-left strong { font-family: var(--font-mono); font-size: 0.95rem; color: #fde047; }
    .ctb-left span { font-size: 0.68rem; color: #94a3b8; font-weight: 800; }
    .deg-rad-pill {
      background: #7c5dfa;
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 99px;
      padding: 4px 12px;
      font-weight: 900;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .casio-lcd {
      background: #c7d9c4;
      border: 4px solid #0f172a;
      border-radius: 14px;
      padding: 12px 14px;
      color: #0f172a;
      font-family: var(--font-mono);
      box-shadow: inset 0 3px 8px rgba(0,0,0,0.25);
    }
    .lcd-expr {
      font-size: 0.95rem;
      font-weight: 700;
      min-height: 22px;
      word-break: break-all;
    }
    .lcd-result {
      font-size: 1.65rem;
      font-weight: 900;
      text-align: right;
      margin-top: 6px;
    }
    .lcd-eng-row {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed rgba(15, 23, 42, 0.35);
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
    }
    .constants-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .const-btn {
      background: #334155;
      border: 1.5px solid #64748b;
      color: #fef08a;
      border-radius: 8px;
      padding: 6px 4px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
    }
    .const-btn:hover { background: #475569; }
    .casio-keypad {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .ck {
      border-radius: 12px;
      padding: 12px 4px;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.92rem;
      cursor: pointer;
      border: 2px solid #0f172a;
      box-shadow: 0 4px 0 #0f172a;
    }
    .ck:active { transform: translateY(2px); box-shadow: 0 2px 0 #0f172a; }
    .ck.fn { background: #475569; color: #f8fafc; font-size: 0.82rem; }
    .ck.num { background: #f1f5f9; color: #0f172a; font-size: 1.05rem; }
    .ck.op { background: #cbd5e1; color: #0f172a; font-size: 1.05rem; }
    .ck.del, .ck.ac { background: #f43f5e; color: #ffffff; }
    .ck.exp-key { background: #fde047; color: #0f172a; font-size: 0.74rem; }
    .ck.eq { background: #10b981; color: #052e16; font-size: 1.15rem; }

    .calc-manual-card {
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .calc-manual-card h3 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: #191538;
      margin: 0;
    }
    .manual-tips-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .mt-box {
      background: rgba(255, 255, 255, 0.78);
      border: 2px solid #9d7eff;
      border-radius: 14px;
      padding: 12px 14px;
    }
    .mt-title {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 800;
      color: #191538;
      margin-bottom: 4px;
    }
    .mt-box p {
      margin: 0;
      font-size: 0.86rem;
      font-weight: 700;
      color: #2d2556;
      line-height: 1.5;
    }
    .inline-key {
      display: inline-block;
      background: #191538;
      color: #fde047;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 6px;
      margin: 0 2px;
    }
  `]
})
export class CalculadoraPage implements OnInit {
  activeSection: 'resolver' | 'conversor' | 'cientifica' = 'resolver';

  // ==========================================================================
  // 1. ESTADO DE INGRESO DE PRÁCTICOS PERSONALIZADOS Y PLANTILLAS DINÁMICAS
  // ==========================================================================
  customProblemText = '';
  detectionMessage = '';
  savedProblems: SavedCustomProblem[] = [];

  solverTemplates: ProblemSolverTemplate[] = [
    {
      id: 'coulomb',
      unitNumber: 1,
      title: 'Ley de Coulomb (Fuerza entre Cargas)',
      shortDesc: 'Calcula la fuerza eléctrica de atracción o repulsión entre dos cargas puntuales q₁ y q₂ separadas una distancia r.',
      traditionalFormulaLatex: 'F = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2}',
      sampleStatement: 'Dos cargas puntuales q1 = 4 uC y q2 = 6 nC están separadas una distancia r = 15 cm en el vacío. Calcular la fuerza eléctrica.',
      inputs: [
        {
          key: 'q1',
          label: 'Carga 1',
          symbol: 'q₁',
          value: 4,
          selectedUnitIdx: 2,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'miliCoulomb (mC = 10⁻³ C)', factorToSI: 1e-3, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
            { label: 'picoCoulomb (pC = 10⁻¹² C)', factorToSI: 1e-12, siSymbol: 'C' },
          ]
        },
        {
          key: 'q2',
          label: 'Carga 2',
          symbol: 'q₂',
          value: 6,
          selectedUnitIdx: 3,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'miliCoulomb (mC = 10⁻³ C)', factorToSI: 1e-3, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
            { label: 'picoCoulomb (pC = 10⁻¹² C)', factorToSI: 1e-12, siSymbol: 'C' },
          ]
        },
        {
          key: 'r',
          label: 'Distancia entre cargas',
          symbol: 'r',
          value: 15,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
            { label: 'milímetros (mm = 10⁻³ m)', factorToSI: 1e-3, siSymbol: 'm' },
          ]
        }
      ],
      solve: (si, raw) => {
        const k = 8.99e9;
        const q1 = Math.abs(si['q1']);
        const q2 = Math.abs(si['q2']);
        const r = Math.max(1e-9, si['r']);
        const F = (k * q1 * q2) / (r * r);
        const E1 = (k * q1) / (r * r);
        return {
          resultValue: F,
          resultSIUnit: 'N (Newtons)',
          secondaryResults: [
            { label: 'Campo E creado por q₁ a distancia r', valueStr: `${E1.toExponential(3)} N/C` },
            { label: 'Distancia al cuadrado r²', valueStr: `${(r * r).toExponential(3)} m²` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            const siVal = inp.value * u.factorToSI;
            return `${inp.symbol} = ${inp.value} ${u.label.split(' ')[0]} → multiplicamos por ${u.factorToSI} = ${siVal.toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `F = \\frac{8,99 \\times 10^9 \\cdot (${q1.toExponential(2)}) \\cdot (${q2.toExponential(2)})}{(${r})^2} = ${F.toFixed(4)}\\text{ N}`,
          stepByStepExplanation: [
            `1. Convertimos las cargas a Coulombs (C) y la distancia r a metros (m).`,
            `2. Elevamos la distancia en metros al cuadrado: r² = (${r} m)² = ${(r * r).toFixed(5)} m².`,
            `3. Multiplicamos k · |q₁| · |q₂| en el numerador y dividimos por r².`
          ],
          calculatorKeys: ['8.99', '×10ˣ', '9', '×', `${q1.toExponential(2)}`, '×', `${q2.toExponential(2)}`, '÷', `${r}`, 'x²', '='],
          calculatorWarning: '¡No olvides apretar la tecla [x²] sobre la distancia r ya pasada a metros!',
          diagramType: 'coulomb'
        };
      }
    },
    {
      id: 'campo_electrico_u1',
      unitNumber: 1,
      title: 'Campo Eléctrico E⃗ de Carga Puntual y Fuerza F = q₀·E',
      shortDesc: 'Calcula la intensidad del campo eléctrico E = k·|Q|/r² creado por una carga fuente Q y la fuerza sobre una carga de prueba q₀.',
      traditionalFormulaLatex: 'E = \\frac{k \\cdot |Q|}{r^2} \\quad ; \\quad F = |q_0| \\cdot E',
      sampleStatement: 'Calcular el campo eléctrico a r = 12 cm de una carga fuente Q = 9 uC y la fuerza que siente una carga de prueba q0 = 2 nC.',
      inputs: [
        {
          key: 'Q',
          label: 'Carga Fuente Q',
          symbol: 'Q',
          value: 9,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
          ]
        },
        {
          key: 'r',
          label: 'Distancia al punto P',
          symbol: 'r',
          value: 12,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
            { label: 'milímetros (mm = 10⁻³ m)', factorToSI: 1e-3, siSymbol: 'm' },
          ]
        },
        {
          key: 'q0',
          label: 'Carga de prueba en P',
          symbol: 'q₀',
          value: 2,
          selectedUnitIdx: 2,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
          ]
        }
      ],
      solve: (si, raw) => {
        const k = 8.99e9;
        const Q = Math.abs(si['Q']);
        const r = Math.max(1e-9, si['r']);
        const q0 = Math.abs(si['q0']);
        const E = (k * Q) / (r * r);
        const F = q0 * E;
        return {
          resultValue: E,
          resultSIUnit: 'N/C (Campo Eléctrico E)',
          secondaryResults: [
            { label: 'Fuerza sobre q₀ (F = |q₀|·E)', valueStr: `${F.toExponential(3)} N` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `E = \\frac{8,99 \\times 10^9 \\cdot (${Q.toExponential(2)})}{(${r})^2} = ${E.toExponential(3)}\\text{ N/C}`,
          stepByStepExplanation: [
            `1. Convertimos la carga fuente Q a Coulombs y la distancia r a metros.`,
            `2. Elevamos r al cuadrado en el denominador y dividimos k·|Q| por r².`
          ],
          calculatorKeys: ['8.99', '×10ˣ', '9', '×', `${Q.toExponential(2)}`, '÷', `${r}`, 'x²', '='],
          calculatorWarning: 'Recordá que el campo E depende solo de la carga fuente Q, no de q₀.',
          diagramType: 'coulomb'
        };
      }
    },
    {
      id: 'gauss_plano_hilo',
      unitNumber: 2,
      title: 'Ley de Gauss (Plano Infinito y Cable Cargado)',
      shortDesc: 'Calcula el campo eléctrico E de una lámina cargada con densidad superficial σ o un hilo con densidad lineal λ.',
      traditionalFormulaLatex: 'E_{\\text{plano}} = \\frac{\\sigma}{2 \\cdot \\varepsilon_0} \\quad ; \\quad E_{\\text{hilo}} = \\frac{\\lambda}{2 \\cdot \\pi \\cdot \\varepsilon_0 \\cdot r}',
      sampleStatement: 'Una lámina infinita tiene densidad superficial sigma = 5 uC/m2. Calcular el campo eléctrico a 4 cm.',
      inputs: [
        {
          key: 'sigma',
          label: 'Densidad superficial de carga',
          symbol: 'σ',
          value: 5,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'C/m² (SI)', factorToSI: 1, siSymbol: 'C/m²' },
            { label: 'μC/m² (10⁻⁶ C/m²)', factorToSI: 1e-6, siSymbol: 'C/m²' },
            { label: 'nC/m² (10⁻⁹ C/m²)', factorToSI: 1e-9, siSymbol: 'C/m²' },
          ]
        },
        {
          key: 'r',
          label: 'Distancia r (para comparar con hilo)',
          symbol: 'r',
          value: 4,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
          ]
        }
      ],
      solve: (si, raw) => {
        const eps0 = 8.854e-12;
        const sigma = Math.abs(si['sigma']);
        const E = sigma / (2 * eps0);
        return {
          resultValue: E,
          resultSIUnit: 'N/C (o V/m)',
          secondaryResults: [
            { label: 'Si fuera conductor en equilibrio (σ / ε₀)', valueStr: `${(sigma / eps0).toExponential(3)} N/C` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `E = \\frac{${sigma.toExponential(2)}}{2 \\cdot 8,854 \\times 10^{-12}} = ${E.toExponential(3)}\\text{ N/C}`,
          stepByStepExplanation: [
            `1. En un plano infinito aislante, el flujo sale por las 2 tapas del cilindro gaussiano (2·A).`,
            `2. Por eso dividimos σ por (2 · ε₀). ¡El campo no depende de la distancia r!`
          ],
          calculatorKeys: [`${sigma.toExponential(2)}`, '÷', '(', '2', '×', '8.854', '×10ˣ', '(-)', '12', ')', '='],
          calculatorWarning: '¡Poné paréntesis alrededor de (2 × 8.854 EXP -12)! Si no ponés paréntesis, la calculadora divide por 2 y multiplica por ε₀.',
          diagramType: 'coulomb'
        };
      }
    },
    {
      id: 'potencial_trabajo',
      unitNumber: 3,
      title: 'Potencial Eléctrico V y Trabajo W = q·ΔV',
      shortDesc: 'Calcula el potencial eléctrico V a distancia r de una carga Q y la energía potencial U al colocar otra carga q.',
      traditionalFormulaLatex: 'V = \\frac{k \\cdot Q}{r} \\quad ; \\quad U = q \\cdot V',
      sampleStatement: 'Calcular el potencial eléctrico a 20 cm de una carga Q = 8 uC y el trabajo para traer una carga q = 2 nC.',
      inputs: [
        {
          key: 'Q',
          label: 'Carga Fuente',
          symbol: 'Q',
          value: 8,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
          ]
        },
        {
          key: 'r',
          label: 'Distancia al punto',
          symbol: 'r',
          value: 20,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
          ]
        },
        {
          key: 'q',
          label: 'Carga de prueba',
          symbol: 'q',
          value: 2,
          selectedUnitIdx: 2,
          unitOptions: [
            { label: 'Coulomb (C)', factorToSI: 1, siSymbol: 'C' },
            { label: 'microCoulomb (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
            { label: 'nanoCoulomb (nC = 10⁻⁹ C)', factorToSI: 1e-9, siSymbol: 'C' },
          ]
        }
      ],
      solve: (si, raw) => {
        const k = 8.99e9;
        const Q = si['Q'];
        const r = Math.max(1e-9, si['r']);
        const q = si['q'];
        const V = (k * Q) / r;
        const U = q * V;
        return {
          resultValue: V,
          resultSIUnit: 'V (Voltios)',
          secondaryResults: [
            { label: 'Energía Potencial / Trabajo U = q · V', valueStr: `${U.toExponential(3)} Joules (J)` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `V = \\frac{8,99 \\times 10^9 \\cdot (${Q.toExponential(2)})}{${r}} = ${V.toFixed(1)}\\text{ V}`,
          stepByStepExplanation: [
            `1. A diferencia del campo eléctrico, en el potencial V = k·Q/r la distancia r NO va al cuadrado.`,
            `2. El potencial es un escalar: si la carga Q es negativa, se conserva el signo menos.`
          ],
          calculatorKeys: ['8.99', '×10ˣ', '9', '×', `${Q.toExponential(2)}`, '÷', `${r}`, '='],
          calculatorWarning: '¡Atención! En potencial V = kQ/r NO aprietes [x²] en el denominador.',
          diagramType: 'coulomb'
        };
      }
    },
    {
      id: 'capacitor_plano',
      unitNumber: 4,
      title: 'Capacitor Plano, Dieléctrico y Energía',
      shortDesc: 'Calcula la capacidad C = κ·ε₀·A/d, la carga Q = C·V y la energía U = ½·C·V² convirtiendo área cm² a m².',
      traditionalFormulaLatex: 'C = \\frac{\\kappa \\cdot \\varepsilon_0 \\cdot A}{d} \\quad ; \\quad Q = C \\cdot V \\quad ; \\quad U = \\frac{1}{2} \\cdot C \\cdot V^2',
      sampleStatement: 'Un capacitor plano tiene placas de área A = 25 cm2 separadas d = 2 mm con dieléctrico k = 3 conectado a V = 12 V.',
      inputs: [
        {
          key: 'A',
          label: 'Área de las placas',
          symbol: 'A',
          value: 25,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros cuadrados (m²)', factorToSI: 1, siSymbol: 'm²' },
            { label: 'centímetros cuadrados (cm² = 10⁻⁴ m²)', factorToSI: 1e-4, siSymbol: 'm²' },
            { label: 'milímetros cuadrados (mm² = 10⁻⁶ m²)', factorToSI: 1e-6, siSymbol: 'm²' },
          ]
        },
        {
          key: 'd',
          label: 'Separación entre placas',
          symbol: 'd',
          value: 2,
          selectedUnitIdx: 2,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
            { label: 'milímetros (mm = 10⁻³ m)', factorToSI: 1e-3, siSymbol: 'm' },
          ]
        },
        {
          key: 'kappa',
          label: 'Constante dieléctrica (1 = vacío)',
          symbol: 'κ',
          value: 3,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'Adimensional (κ)', factorToSI: 1, siSymbol: '' }]
        },
        {
          key: 'V',
          label: 'Voltaje aplicado',
          symbol: 'V',
          value: 12,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'Voltios (V)', factorToSI: 1, siSymbol: 'V' },
            { label: 'kiloVoltios (kV = 10³ V)', factorToSI: 1e3, siSymbol: 'V' },
          ]
        }
      ],
      solve: (si, raw) => {
        const eps0 = 8.854e-12;
        const A = si['A'];
        const d = Math.max(1e-9, si['d']);
        const kappa = si['kappa'];
        const V = si['V'];
        const C = (kappa * eps0 * A) / d;
        const Q = C * V;
        const U = 0.5 * C * V * V;
        return {
          resultValue: C,
          resultSIUnit: 'F (Faradios)',
          secondaryResults: [
            { label: 'En picofaradios (pF)', valueStr: `${(C * 1e12).toFixed(2)} pF` },
            { label: 'En nanofaradios (nF)', valueStr: `${(C * 1e9).toFixed(4)} nF` },
            { label: 'Carga almacenada Q = C·V', valueStr: `${(Q * 1e12).toFixed(2)} pC` },
            { label: 'Energía U = ½·C·V²', valueStr: `${U.toExponential(3)} J` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `C = \\frac{${kappa} \\cdot 8,854 \\times 10^{-12} \\cdot (${A.toExponential(2)})}{${d}} = ${(C * 1e12).toFixed(2)}\\text{ pF}`,
          stepByStepExplanation: [
            `1. ¡Ojo con el área! 1 cm² = 10⁻⁴ m² (porque 10⁻² m al cuadrado es 10⁻⁴ m²).`,
            `2. Multiplicamos κ · ε₀ · A y dividimos por la separación d en metros.`,
            `3. Para pasar el resultado de Faradios (F) a picofaradios (pF), multiplicamos por 10¹².`
          ],
          calculatorKeys: [`${kappa}`, '×', '8.854', '×10ˣ', '(-)', '12', '×', `${A.toExponential(2)}`, '÷', `${d}`, '='],
          calculatorWarning: 'Al pasar cm² a m², usá EXP -4 (no EXP -2). Al terminar, apretá la tecla [ENG] para leer directo en pF (10⁻¹²) o nF (10⁻⁹).',
          diagramType: 'capacitor'
        };
      }
    },
    {
      id: 'rc_transitorio',
      unitNumber: 5,
      title: 'Circuito RC (Constante τ, Carga y Corriente)',
      shortDesc: 'Calcula la constante de tiempo τ = R·C, el voltaje en el capacitor v_C(t) y la corriente i(t) en cualquier instante t.',
      traditionalFormulaLatex: '\\tau = R \\cdot C \\quad ; \\quad v_C(t) = \\mathcal{E} \\cdot \\left(1 - e^{-\\frac{t}{R \\cdot C}}\\right)',
      sampleStatement: 'Un circuito RC tiene R = 4 kOhm, C = 50 uF y una fuente de 24 V. Calcular el voltaje en el capacitor en t = 0.2 s.',
      inputs: [
        {
          key: 'R',
          label: 'Resistencia',
          symbol: 'R',
          value: 4,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Ohms (Ω)', factorToSI: 1, siSymbol: 'Ω' },
            { label: 'kiloOhms (kΩ = 10³ Ω)', factorToSI: 1e3, siSymbol: 'Ω' },
            { label: 'MegaOhms (MΩ = 10⁶ Ω)', factorToSI: 1e6, siSymbol: 'Ω' },
          ]
        },
        {
          key: 'C',
          label: 'Capacidad',
          symbol: 'C',
          value: 50,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Faradios (F)', factorToSI: 1, siSymbol: 'F' },
            { label: 'microFaradios (μF = 10⁻⁶ F)', factorToSI: 1e-6, siSymbol: 'F' },
            { label: 'nanoFaradios (nF = 10⁻⁹ F)', factorToSI: 1e-9, siSymbol: 'F' },
            { label: 'picoFaradios (pF = 10⁻¹² F)', factorToSI: 1e-12, siSymbol: 'F' },
          ]
        },
        {
          key: 'E',
          label: 'Voltaje de la fuente',
          symbol: 'ε',
          value: 24,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'Voltios (V)', factorToSI: 1, siSymbol: 'V' }]
        },
        {
          key: 't',
          label: 'Tiempo t a evaluar',
          symbol: 't',
          value: 0.2,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'segundos (s)', factorToSI: 1, siSymbol: 's' },
            { label: 'milisegundos (ms = 10⁻³ s)', factorToSI: 1e-3, siSymbol: 's' },
          ]
        }
      ],
      solve: (si, raw) => {
        const R = si['R'];
        const C = si['C'];
        const E = si['E'];
        const t = si['t'];
        const tau = R * C;
        const vc = E * (1 - Math.exp(-t / tau));
        const it = (E / R) * Math.exp(-t / tau);
        return {
          resultValue: vc,
          resultSIUnit: 'V (Voltios en el capacitor)',
          secondaryResults: [
            { label: 'Constante de tiempo τ = R·C', valueStr: `${tau.toFixed(4)} s` },
            { label: 'Corriente instantánea i(t)', valueStr: `${(it * 1e3).toFixed(3)} mA` },
            { label: 'Tiempo de carga total (5·τ)', valueStr: `${(5 * tau).toFixed(3)} s` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `v_C(${t}) = ${E} \\cdot \\left(1 - e^{-\\frac{${t}}{${tau.toFixed(4)}}}\\right) = ${vc.toFixed(2)}\\text{ V}`,
          stepByStepExplanation: [
            `1. Primero calculamos aparte la constante de tiempo τ = R · C = ${R} Ω · ${C} F = ${tau} s.`,
            `2. En t = τ el capacitor siempre llega al 63,2% del voltaje de la fuente.`,
            `3. Evaluamos e^(-t/τ) con la tecla [SHIFT] + [ln] en la calculadora.`
          ],
          calculatorKeys: [`${E}`, '×', '(', '1', '−', 'SHIFT', 'ln (eˣ)', '(', '(-)', `${t}`, '÷', `${tau}`, ')', ')', '='],
          calculatorWarning: 'Calculá primero τ = R·C y anotalo. Luego usá [SHIFT] + [ln] para que aparezca e^( en la pantalla.',
          diagramType: 'circuit'
        };
      }
    },
    {
      id: 'lorentz_ciclotron',
      unitNumber: 6,
      title: 'Fuerza Magnética de Lorentz y Radio de Ciclotrón',
      shortDesc: 'Calcula la fuerza magnética F = |q|·v·B·sin(θ) y el radio de la órbita circular R = (m·v)/(|q|·B).',
      traditionalFormulaLatex: 'F_B = |q| \\cdot v \\cdot B \\cdot \\sin(\\theta) \\quad ; \\quad R = \\frac{m \\cdot v}{|q| \\cdot B}',
      sampleStatement: 'Un protón entra con velocidad v = 2e6 m/s perpendicular a un campo magnético B = 0.5 T. Calcular la fuerza y el radio de giro.',
      inputs: [
        {
          key: 'q',
          label: 'Carga de la partícula',
          symbol: '|q|',
          value: 1.602e-19,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'Coulombs (C) — Protón/Electrón = 1.602e-19', factorToSI: 1, siSymbol: 'C' },
            { label: 'microCoulombs (μC = 10⁻⁶ C)', factorToSI: 1e-6, siSymbol: 'C' },
          ]
        },
        {
          key: 'v',
          label: 'Velocidad de la partícula',
          symbol: 'v',
          value: 2e6,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'm/s', factorToSI: 1, siSymbol: 'm/s' },
            { label: 'km/s (10³ m/s)', factorToSI: 1e3, siSymbol: 'm/s' },
          ]
        },
        {
          key: 'B',
          label: 'Campo Magnético',
          symbol: 'B',
          value: 0.5,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'Tesla (T)', factorToSI: 1, siSymbol: 'T' },
            { label: 'miliTesla (mT = 10⁻³ T)', factorToSI: 1e-3, siSymbol: 'T' },
            { label: 'Gauss (G = 10⁻⁴ T)', factorToSI: 1e-4, siSymbol: 'T' },
          ]
        },
        {
          key: 'm',
          label: 'Masa (Protón=1.67e-27 / Electrón=9.11e-31)',
          symbol: 'm',
          value: 1.673e-27,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'kilogramos (kg)', factorToSI: 1, siSymbol: 'kg' }]
        }
      ],
      solve: (si, raw) => {
        const q = Math.abs(si['q']);
        const v = si['v'];
        const B = Math.max(1e-12, si['B']);
        const m = si['m'];
        const F = q * v * B;
        const R = (m * v) / (q * B);
        return {
          resultValue: F,
          resultSIUnit: 'N (Newtons)',
          secondaryResults: [
            { label: 'Radio de órbita R = m·v / (|q|·B)', valueStr: `${R.toFixed(4)} m (${(R * 100).toFixed(2)} cm)` },
            { label: 'Trabajo magnético W', valueStr: '0 Joules (F⃗ ⊥ v⃗ siempre)' }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `F_B = (${q.toExponential(2)}) \\cdot (${v.toExponential(2)}) \\cdot (${B}) = ${F.toExponential(3)}\\text{ N}`,
          stepByStepExplanation: [
            `1. Si el campo magnético está en Gauss (G), multiplicamos por 10⁻⁴ para pasarlo a Teslas (T).`,
            `2. Para el radio R = (m·v) / (|q|·B), encerrá el denominador (|q| × B) entre paréntesis.`
          ],
          calculatorKeys: [`${m.toExponential(2)}`, '×', `${v.toExponential(2)}`, '÷', '(', `${q.toExponential(2)}`, '×', `${B}`, ')', '='],
          calculatorWarning: 'Al calcular el radio R = m·v / (q·B), es obligatorio poner paréntesis en ÷ ( q × B ).',
          diagramType: 'magnetic'
        };
      }
    },
    {
      id: 'solenoide_ampere',
      unitNumber: 7,
      title: 'Campo Magnético de un Solenoide y Cable Recto',
      shortDesc: 'Calcula el campo magnético B = μ₀·(N/L)·I dentro de un solenoide de N espiras y longitud L.',
      traditionalFormulaLatex: 'B_{\\text{solenoide}} = \\frac{\\mu_0 \\cdot N \\cdot I}{L} \\quad ; \\quad \\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}',
      sampleStatement: 'Un solenoide de N = 600 espiras y longitud L = 30 cm conduce una corriente I = 2.5 A. Calcular el campo magnético interior.',
      inputs: [
        {
          key: 'N',
          label: 'Número de espiras',
          symbol: 'N',
          value: 600,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'espiras (vueltas)', factorToSI: 1, siSymbol: 'espiras' }]
        },
        {
          key: 'L',
          label: 'Longitud del solenoide',
          symbol: 'L',
          value: 30,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'metros (m)', factorToSI: 1, siSymbol: 'm' },
            { label: 'centímetros (cm = 10⁻² m)', factorToSI: 1e-2, siSymbol: 'm' },
          ]
        },
        {
          key: 'I',
          label: 'Corriente eléctrica',
          symbol: 'I',
          value: 2.5,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'Amperes (A)', factorToSI: 1, siSymbol: 'A' },
            { label: 'miliAmperes (mA = 10⁻³ A)', factorToSI: 1e-3, siSymbol: 'A' },
          ]
        }
      ],
      solve: (si, raw) => {
        const mu0 = 4 * Math.PI * 1e-7;
        const N = si['N'];
        const L = Math.max(1e-6, si['L']);
        const I = si['I'];
        const B = (mu0 * N * I) / L;
        return {
          resultValue: B,
          resultSIUnit: 'T (Teslas)',
          secondaryResults: [
            { label: 'En miliTeslas (mT)', valueStr: `${(B * 1e3).toFixed(3)} mT` },
            { label: 'En Gauss (1 T = 10⁴ G)', valueStr: `${(B * 1e4).toFixed(1)} Gauss` },
            { label: 'Densidad de espiras n = N/L', valueStr: `${(N / L).toFixed(1)} espiras/m` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `B = \\frac{(4\\pi \\times 10^{-7}) \\cdot ${N} \\cdot ${I}}{${L}} = ${B.toFixed(5)}\\text{ T}`,
          stepByStepExplanation: [
            `1. Convertimos la longitud L del solenoide de centímetros a metros.`,
            `2. Multiplicamos μ₀ = 4π × 10⁻⁷ por N y por la corriente I, y dividimos por L en metros.`
          ],
          calculatorKeys: ['4', '×', 'SHIFT', 'π', '×10ˣ', '(-)', '7', '×', `${N}`, '×', `${I}`, '÷', `${L}`, '='],
          calculatorWarning: 'Para escribir μ₀ en la calculadora poné: 4 × [SHIFT][π] × 1.0 EXP -7 (o 1.2566 EXP -6).',
          diagramType: 'magnetic'
        };
      }
    },
    {
      id: 'rlc_alterna',
      unitNumber: 9,
      title: 'Circuito RLC Serie en Corriente Alterna',
      shortDesc: 'Calcula reactancias X_L y X_C, impedancia total Z, corriente máxima/eficaz, ángulo de desfase φ y frecuencia de resonancia.',
      traditionalFormulaLatex: 'X_L = 2\\pi f L \\quad ; \\quad X_C = \\frac{1}{2\\pi f C} \\quad ; \\quad Z = \\sqrt{R^2 + (X_L - X_C)^2}',
      sampleStatement: 'Un circuito RLC serie con R = 30 Ohm, L = 80 mH y C = 100 uF se conecta a V = 220 V y f = 50 Hz. Calcular Z, I y desfase.',
      inputs: [
        {
          key: 'R',
          label: 'Resistencia R',
          symbol: 'R',
          value: 30,
          selectedUnitIdx: 0,
          unitOptions: [
            { label: 'Ohms (Ω)', factorToSI: 1, siSymbol: 'Ω' },
            { label: 'kiloOhms (kΩ = 10³ Ω)', factorToSI: 1e3, siSymbol: 'Ω' },
          ]
        },
        {
          key: 'L',
          label: 'Inductancia L',
          symbol: 'L',
          value: 80,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Henrys (H)', factorToSI: 1, siSymbol: 'H' },
            { label: 'miliHenrys (mH = 10⁻³ H)', factorToSI: 1e-3, siSymbol: 'H' },
          ]
        },
        {
          key: 'C',
          label: 'Capacidad C',
          symbol: 'C',
          value: 100,
          selectedUnitIdx: 1,
          unitOptions: [
            { label: 'Faradios (F)', factorToSI: 1, siSymbol: 'F' },
            { label: 'microFaradios (μF = 10⁻⁶ F)', factorToSI: 1e-6, siSymbol: 'F' },
            { label: 'nanoFaradios (nF = 10⁻⁹ F)', factorToSI: 1e-9, siSymbol: 'F' },
          ]
        },
        {
          key: 'f',
          label: 'Frecuencia f',
          symbol: 'f',
          value: 50,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'Hertz (Hz)', factorToSI: 1, siSymbol: 'Hz' }]
        },
        {
          key: 'V',
          label: 'Tensión de la fuente V',
          symbol: 'V',
          value: 220,
          selectedUnitIdx: 0,
          unitOptions: [{ label: 'Voltios (V)', factorToSI: 1, siSymbol: 'V' }]
        }
      ],
      solve: (si, raw) => {
        const R = si['R'];
        const L = si['L'];
        const C = Math.max(1e-12, si['C']);
        const f = Math.max(1e-3, si['f']);
        const V = si['V'];
        const w = 2 * Math.PI * f;
        const XL = w * L;
        const XC = 1 / (w * C);
        const Z = Math.sqrt(R * R + Math.pow(XL - XC, 2));
        const I = V / Z;
        const phiDeg = (Math.atan2(XL - XC, R) * 180) / Math.PI;
        const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
        return {
          resultValue: Z,
          resultSIUnit: 'Ω (Impedancia Total Z)',
          secondaryResults: [
            { label: 'Reactancia Inductiva X_L', valueStr: `${XL.toFixed(2)} Ω` },
            { label: 'Reactancia Capacitiva X_C', valueStr: `${XC.toFixed(2)} Ω` },
            { label: 'Corriente I = V / Z', valueStr: `${I.toFixed(3)} A` },
            { label: 'Ángulo de desfase φ', valueStr: `${phiDeg.toFixed(2)}° (${XL > XC ? 'Inductivo' : 'Capacitivo'})` },
            { label: 'Frecuencia de resonancia f₀', valueStr: `${f0.toFixed(2)} Hz` }
          ],
          conversionSteps: raw.map(inp => {
            const u = inp.unitOptions[inp.selectedUnitIdx];
            return `${inp.symbol} = ${inp.value} → ${(inp.value * u.factorToSI).toExponential(3)} ${u.siSymbol}`;
          }),
          substitutionLatex: `Z = \\sqrt{${R}^2 + (${XL.toFixed(2)} - ${XC.toFixed(2)})^2} = ${Z.toFixed(2)}\\ \\Omega`,
          stepByStepExplanation: [
            `1. Calculamos ω = 2·π·f = ${(w).toFixed(2)} rad/s.`,
            `2. Hallamos X_L = ω·L = ${XL.toFixed(2)} Ω y X_C = 1 / (ω·C) = ${XC.toFixed(2)} Ω.`,
            `3. Aplicamos Pitágoras para la impedancia Z y ley de Ohm I = V / Z.`
          ],
          calculatorKeys: ['√(', `${R}`, 'x²', '+', '(', `${XL.toFixed(2)}`, '−', `${XC.toFixed(2)}`, ')', 'x²', ')', '='],
          calculatorWarning: 'Para calcular X_C = 1 / (2·π·f·C), usá el botón [x⁻¹] después de calcular (2 × π × f × C).',
          diagramType: 'circuit'
        };
      }
    }
  ];

  selectedTemplate: ProblemSolverTemplate = this.solverTemplates[0];

  // ==========================================================================
  // 2. ESTADO DEL CONVERSOR DE UNIDADES Y PREFIJOS
  // ==========================================================================
  conversionCategories: ConversionCategory[] = [
    {
      id: 'capacidad',
      name: 'Capacidad (Faradios)',
      icon: '🔋',
      baseUnitName: 'Faradio',
      baseSymbol: 'F',
      examRule: 'Cada salto entre mili (10⁻³), micro (10⁻⁶), nano (10⁻⁹) y pico (10⁻¹²) es un factor de 1000 (10³). Por ejemplo: 1 nF = 1000 pF.',
      quickPairs: [
        { label: 'De picofaradios (pF) a nanofaradios (nF)', fromId: 'pF', toId: 'nF', sampleVal: 500 },
        { label: 'De nanofaradios (nF) a picofaradios (pF)', fromId: 'nF', toId: 'pF', sampleVal: 4.7 },
        { label: 'De microfaradios (μF) a Faradios (F)', fromId: 'uF', toId: 'F', sampleVal: 25 },
        { label: 'De picofaradios (pF) a Faradios (F)', fromId: 'pF', toId: 'F', sampleVal: 120 },
      ],
      units: [
        { id: 'F', label: 'Faradio', symbol: 'F', factorToBase: 1, exponentLabel: '10⁰ F (Unidad SI)', calcKeysHint: '' },
        { id: 'mF', label: 'milifaradio', symbol: 'mF', factorToBase: 1e-3, exponentLabel: '10⁻³ F', calcKeysHint: '×10ˣ (-) 3' },
        { id: 'uF', label: 'microfaradio', symbol: 'μF', factorToBase: 1e-6, exponentLabel: '10⁻⁶ F', calcKeysHint: '×10ˣ (-) 6' },
        { id: 'nF', label: 'nanofaradio', symbol: 'nF', factorToBase: 1e-9, exponentLabel: '10⁻⁹ F', calcKeysHint: '×10ˣ (-) 9' },
        { id: 'pF', label: 'picofaradio', symbol: 'pF', factorToBase: 1e-12, exponentLabel: '10⁻¹² F', calcKeysHint: '×10ˣ (-) 12' },
      ]
    },
    {
      id: 'longitud',
      name: 'Longitud (m, cm, mm)',
      icon: '📏',
      baseUnitName: 'metro',
      baseSymbol: 'm',
      examRule: 'Para pasar de centímetros (cm) a metros (m) dividís por 100 (o multiplicás por 10⁻²). Para pasar de milímetros (mm) a metros (m) dividís por 1000 (10⁻³).',
      quickPairs: [
        { label: 'De centímetros (cm) a metros (m)', fromId: 'cm', toId: 'm', sampleVal: 15 },
        { label: 'De metros (m) a centímetros (cm)', fromId: 'm', toId: 'cm', sampleVal: 0.25 },
        { label: 'De milímetros (mm) a metros (m)', fromId: 'mm', toId: 'm', sampleVal: 4 },
        { label: 'De centímetros (cm) a milímetros (mm)', fromId: 'cm', toId: 'mm', sampleVal: 3.5 },
      ],
      units: [
        { id: 'km', label: 'kilómetro', symbol: 'km', factorToBase: 1e3, exponentLabel: '10³ m', calcKeysHint: '×10ˣ 3' },
        { id: 'm', label: 'metro', symbol: 'm', factorToBase: 1, exponentLabel: '10⁰ m (Unidad SI)', calcKeysHint: '' },
        { id: 'dm', label: 'decímetro', symbol: 'dm', factorToBase: 1e-1, exponentLabel: '10⁻¹ m', calcKeysHint: '×10ˣ (-) 1' },
        { id: 'cm', label: 'centímetro', symbol: 'cm', factorToBase: 1e-2, exponentLabel: '10⁻² m', calcKeysHint: '×10ˣ (-) 2' },
        { id: 'mm', label: 'milímetro', symbol: 'mm', factorToBase: 1e-3, exponentLabel: '10⁻³ m', calcKeysHint: '×10ˣ (-) 3' },
        { id: 'um', label: 'micrómetro', symbol: 'μm', factorToBase: 1e-6, exponentLabel: '10⁻⁶ m', calcKeysHint: '×10ˣ (-) 6' },
        { id: 'nm', label: 'nanómetro', symbol: 'nm', factorToBase: 1e-9, exponentLabel: '10⁻⁹ m', calcKeysHint: '×10ˣ (-) 9' },
      ]
    },
    {
      id: 'area',
      name: 'Área (m², cm², mm²)',
      icon: '⬛',
      baseUnitName: 'metro cuadrado',
      baseSymbol: 'm²',
      examRule: '¡Trampa clásica de capacitores y flujo! Como 1 cm = 10⁻² m, al elevar al cuadrado queda 1 cm² = (10⁻² m)² = 10⁻⁴ m² (se duplica el exponente).',
      quickPairs: [
        { label: 'De cm² a m² (Placas de Capacitor)', fromId: 'cm2', toId: 'm2', sampleVal: 25 },
        { label: 'De mm² a m² (Sección de Cable)', fromId: 'mm2', toId: 'm2', sampleVal: 2.5 },
        { label: 'De m² a cm²', fromId: 'm2', toId: 'cm2', sampleVal: 0.05 },
      ],
      units: [
        { id: 'm2', label: 'metro cuadrado', symbol: 'm²', factorToBase: 1, exponentLabel: '10⁰ m² (Unidad SI)', calcKeysHint: '' },
        { id: 'dm2', label: 'decímetro cuadrado', symbol: 'dm²', factorToBase: 1e-2, exponentLabel: '10⁻² m²', calcKeysHint: '×10ˣ (-) 2' },
        { id: 'cm2', label: 'centímetro cuadrado', symbol: 'cm²', factorToBase: 1e-4, exponentLabel: '10⁻⁴ m²', calcKeysHint: '×10ˣ (-) 4' },
        { id: 'mm2', label: 'milímetro cuadrado', symbol: 'mm²', factorToBase: 1e-6, exponentLabel: '10⁻⁶ m²', calcKeysHint: '×10ˣ (-) 6' },
      ]
    },
    {
      id: 'carga',
      name: 'Carga Eléctrica (Coulombs)',
      icon: '⚡',
      baseUnitName: 'Coulomb',
      baseSymbol: 'C',
      examRule: 'En la Ley de Coulomb y Gauss siempre pasá las cargas a Coulombs: microCoulomb (μC) es ×10⁻⁶ C y nanoCoulomb (nC) es ×10⁻⁹ C.',
      quickPairs: [
        { label: 'De microCoulombs (μC) a Coulombs (C)', fromId: 'uC', toId: 'C', sampleVal: 6 },
        { label: 'De nanoCoulombs (nC) a Coulombs (C)', fromId: 'nC', toId: 'C', sampleVal: 15 },
        { label: 'De microCoulombs (μC) a nanoCoulombs (nC)', fromId: 'uC', toId: 'nC', sampleVal: 2.5 },
      ],
      units: [
        { id: 'C', label: 'Coulomb', symbol: 'C', factorToBase: 1, exponentLabel: '10⁰ C (Unidad SI)', calcKeysHint: '' },
        { id: 'mC', label: 'miliCoulomb', symbol: 'mC', factorToBase: 1e-3, exponentLabel: '10⁻³ C', calcKeysHint: '×10ˣ (-) 3' },
        { id: 'uC', label: 'microCoulomb', symbol: 'μC', factorToBase: 1e-6, exponentLabel: '10⁻⁶ C', calcKeysHint: '×10ˣ (-) 6' },
        { id: 'nC', label: 'nanoCoulomb', symbol: 'nC', factorToBase: 1e-9, exponentLabel: '10⁻⁹ C', calcKeysHint: '×10ˣ (-) 9' },
        { id: 'pC', label: 'picoCoulomb', symbol: 'pC', factorToBase: 1e-12, exponentLabel: '10⁻¹² C', calcKeysHint: '×10ˣ (-) 12' },
      ]
    },
    {
      id: 'magnetismo',
      name: 'Campo Magnético (Tesla / Gauss)',
      icon: '🧲',
      baseUnitName: 'Tesla',
      baseSymbol: 'T',
      examRule: 'El Gauss (G) NO es del Sistema Internacional: 1 Gauss = 10⁻⁴ Teslas (y 1 Tesla = 10 000 Gauss).',
      quickPairs: [
        { label: 'De Gauss (G) a Teslas (T)', fromId: 'G', toId: 'T', sampleVal: 500 },
        { label: 'De miliTeslas (mT) a Teslas (T)', fromId: 'mT', toId: 'T', sampleVal: 25 },
        { label: 'De Teslas (T) a Gauss (G)', fromId: 'T', toId: 'G', sampleVal: 0.4 },
      ],
      units: [
        { id: 'T', label: 'Tesla', symbol: 'T', factorToBase: 1, exponentLabel: '10⁰ T (Unidad SI)', calcKeysHint: '' },
        { id: 'mT', label: 'miliTesla', symbol: 'mT', factorToBase: 1e-3, exponentLabel: '10⁻³ T', calcKeysHint: '×10ˣ (-) 3' },
        { id: 'G', label: 'Gauss', symbol: 'G', factorToBase: 1e-4, exponentLabel: '10⁻⁴ T', calcKeysHint: '×10ˣ (-) 4' },
        { id: 'uT', label: 'microTesla', symbol: 'μT', factorToBase: 1e-6, exponentLabel: '10⁻⁶ T', calcKeysHint: '×10ˣ (-) 6' },
      ]
    },
    {
      id: 'inductancia',
      name: 'Inductancia (Henry, mH, μH)',
      icon: '🌀',
      baseUnitName: 'Henry',
      baseSymbol: 'H',
      examRule: 'En circuitos RL y RLC expresá siempre la inductancia L en Henrys (H) antes de calcular τ = L/R o X_L = 2πfL.',
      quickPairs: [
        { label: 'De miliHenrys (mH) a Henrys (H)', fromId: 'mH', toId: 'H', sampleVal: 80 },
        { label: 'De microHenrys (μH) a miliHenrys (mH)', fromId: 'uH', toId: 'mH', sampleVal: 450 },
      ],
      units: [
        { id: 'H', label: 'Henry', symbol: 'H', factorToBase: 1, exponentLabel: '10⁰ H (Unidad SI)', calcKeysHint: '' },
        { id: 'mH', label: 'miliHenry', symbol: 'mH', factorToBase: 1e-3, exponentLabel: '10⁻³ H', calcKeysHint: '×10ˣ (-) 3' },
        { id: 'uH', label: 'microHenry', symbol: 'μH', factorToBase: 1e-6, exponentLabel: '10⁻⁶ H', calcKeysHint: '×10ˣ (-) 6' },
      ]
    }
  ];

  selectedConvCategory: ConversionCategory = this.conversionCategories[0];
  convInputValue = 500;
  convFromUnitId = 'pF';
  convToUnitId = 'nF';

  // ==========================================================================
  // 3. ESTADO DE LA CALCULADORA CIENTÍFICA EN PANTALLA
  // ==========================================================================
  calcExpression = '';
  calcDisplayResult = '0';
  calcNumericResult: number | null = null;
  calcAngleMode: 'DEG' | 'RAD' = 'DEG';
  highestUnlockedUnit = 1;

  constructor(
    private katex: KatexRenderService,
    private api: Fisica2ApiService
  ) {}

  ngOnInit() {
    this.loadSavedCustomProblems();
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedTemplate.unitNumber > this.highestUnlockedUnit) {
        this.selectedTemplate = this.unlockedSolverTemplates[0] || this.solverTemplates[0];
      }
    });
  }

  get unlockedSolverTemplates(): ProblemSolverTemplate[] {
    return this.solverTemplates.filter(t => t.unitNumber <= this.highestUnlockedUnit);
  }

  renderMath(latex: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(latex, displayMode);
  }

  // ==========================================================================
  // LÓGICA DE SECCIÓN 1: RESOLVEDOR DE ENUNCIADOS Y PLANTILLAS
  // ==========================================================================
  selectSolverTemplate(tpl: ProblemSolverTemplate) {
    this.selectedTemplate = tpl;
  }

  loadTemplateSample(tpl: ProblemSolverTemplate) {
    this.customProblemText = tpl.sampleStatement;
    this.parseAndSolveFromStatement();
  }

  get currentSolution() {
    const tpl = this.selectedTemplate;
    const siMap: Record<string, number> = {};
    for (const inp of tpl.inputs) {
      const unitOpt = inp.unitOptions[inp.selectedUnitIdx] || inp.unitOptions[0];
      siMap[inp.key] = (Number(inp.value) || 0) * unitOpt.factorToSI;
    }
    return tpl.solve(siMap, tpl.inputs);
  }

  /**
   * Analiza el enunciado en español ingresado por Cielo, detecta el tema de Física 2
   * y extrae los valores y unidades automáticamente.
   */
  parseAndSolveFromStatement() {
    const txt = (this.customProblemText || '').trim();
    if (!txt) {
      this.detectionMessage = '⚠️ Escribí o pegá primero el enunciado de tu ejercicio.';
      return;
    }
    const lower = txt.toLowerCase();

    // 1. Detectar plantilla por palabras clave
    let targetId = 'coulomb';
    if (lower.includes('impedancia') || lower.includes('rlc') || lower.includes('alterna') || lower.includes('hz') || lower.includes('resonancia')) {
      targetId = 'rlc_alterna';
    } else if (lower.includes('solenoide') || lower.includes('espira') || lower.includes('ampere') || lower.includes('bobina')) {
      targetId = 'solenoide_ampere';
    } else if (lower.includes('proton') || lower.includes('protón') || lower.includes('electron') || lower.includes('electrón') || lower.includes('lorentz') || lower.includes('tesla') || lower.includes('ciclotron') || lower.includes('ciclotrón')) {
      targetId = 'lorentz_ciclotron';
    } else if (lower.includes('transitorio') || lower.includes('constante de tiempo') || (lower.includes('rc') && lower.includes('ohm')) || lower.includes('kohm')) {
      targetId = 'rc_transitorio';
    } else if (lower.includes('capacitor') || lower.includes('condensador') || lower.includes('dielectrico') || lower.includes('dieléctrico') || lower.includes('placas')) {
      targetId = 'capacitor_plano';
    } else if (lower.includes('potencial') || lower.includes('trabajo') || lower.includes('voltaje a')) {
      targetId = 'potencial_trabajo';
    } else if (lower.includes('gauss') || lower.includes('lamina') || lower.includes('lámina') || lower.includes('sigma') || lower.includes('densidad superficial')) {
      targetId = 'gauss_plano_hilo';
    }

    const foundTpl = this.solverTemplates.find(t => t.id === targetId) || this.solverTemplates[0];
    if (foundTpl.unitNumber > this.highestUnlockedUnit) {
      this.detectionMessage = `🔒 Ese enunciado corresponde a la Unidad ${foundTpl.unitNumber} (${foundTpl.title}), que todavía está bloqueada. Primero completá la Unidad ${this.highestUnlockedUnit} al 100% para habilitarla.`;
      return;
    }
    this.selectedTemplate = foundTpl;

    // 2. Extraer números con sus unidades del texto
    const numUnitRegex = /([-+]?\d+(?:[.,]\d+)?(?:e[-+]?\d+)?)\s*(uc|μc|nc|pc|mc|cm2|cm²|mm2|mm²|m2|m²|cm|mm|m|pf|nf|uf|μf|kohm|kω|ohm|ω|mh|h|mt|t|g|hz|kv|v|ma|a|espiras)?/gi;
    const matches: { val: number; unit: string }[] = [];
    let m: RegExpExecArray | null;
    while ((m = numUnitRegex.exec(txt)) !== null) {
      const val = parseFloat(m[1].replace(',', '.'));
      const unit = (m[2] || '').toLowerCase();
      if (!isNaN(val)) {
        matches.push({ val, unit });
      }
    }

    // Asignar valores extraídos a los inputs de la plantilla
    let assignedCount = 0;
    for (const item of matches) {
      if (targetId === 'coulomb') {
        if (['uc', 'μc', 'nc', 'pc', 'mc'].includes(item.unit)) {
          const targetInp = assignedCount === 0 ? foundTpl.inputs[0] : foundTpl.inputs[1];
          targetInp.value = item.val;
          if (item.unit.includes('u') || item.unit.includes('μ')) targetInp.selectedUnitIdx = 2;
          else if (item.unit.includes('n')) targetInp.selectedUnitIdx = 3;
          else if (item.unit.includes('p')) targetInp.selectedUnitIdx = 4;
          else if (item.unit.includes('m')) targetInp.selectedUnitIdx = 1;
          assignedCount++;
        } else if (['cm', 'mm', 'm'].includes(item.unit)) {
          foundTpl.inputs[2].value = item.val;
          foundTpl.inputs[2].selectedUnitIdx = item.unit === 'cm' ? 1 : item.unit === 'mm' ? 2 : 0;
        }
      } else if (targetId === 'capacitor_plano') {
        if (['cm2', 'cm²', 'mm2', 'mm²', 'm2', 'm²'].includes(item.unit)) {
          foundTpl.inputs[0].value = item.val;
          foundTpl.inputs[0].selectedUnitIdx = item.unit.startsWith('cm') ? 1 : item.unit.startsWith('mm') ? 2 : 0;
        } else if (['mm', 'cm'].includes(item.unit)) {
          foundTpl.inputs[1].value = item.val;
          foundTpl.inputs[1].selectedUnitIdx = item.unit === 'mm' ? 2 : 1;
        } else if (item.unit === 'v') {
          foundTpl.inputs[3].value = item.val;
        }
      }
    }

    this.detectionMessage = `✅ Tema detectado: "Unidad ${foundTpl.unitNumber} — ${foundTpl.title}". Revisá o ajustá los datos abajo y seguí los 4 pasos de resolución.`;
  }

  saveCurrentCustomProblem() {
    const sol = this.currentSolution;
    const newSaved: SavedCustomProblem = {
      id: 'sp_' + Date.now(),
      createdAt: new Date().toLocaleDateString(),
      statement: this.customProblemText || this.selectedTemplate.sampleStatement,
      templateId: this.selectedTemplate.id,
      unitNumber: this.selectedTemplate.unitNumber,
      title: this.selectedTemplate.title,
      resultSummary: `${this.formatNumberClean(sol.resultValue)} ${sol.resultSIUnit}`,
      inputsSnapshot: this.selectedTemplate.inputs.map(i => ({
        label: i.symbol,
        val: i.value,
        unitLabel: i.unitOptions[i.selectedUnitIdx].label
      }))
    };
    this.savedProblems.unshift(newSaved);
    try {
      localStorage.setItem(SAVED_CUSTOM_PROBLEMS_KEY, JSON.stringify(this.savedProblems));
    } catch {}
    this.detectionMessage = '💾 ¡Ejercicio guardado en tu colección de Mis Prácticos!';
  }

  deleteSavedProblem(id: string) {
    this.savedProblems = this.savedProblems.filter(p => p.id !== id);
    try {
      localStorage.setItem(SAVED_CUSTOM_PROBLEMS_KEY, JSON.stringify(this.savedProblems));
    } catch {}
  }

  private loadSavedCustomProblems() {
    try {
      const raw = localStorage.getItem(SAVED_CUSTOM_PROBLEMS_KEY);
      if (raw) this.savedProblems = JSON.parse(raw);
    } catch {}
  }

  // ==========================================================================
  // LÓGICA DE SECCIÓN 2: CONVERSOR DE UNIDADES Y PREFIJOS
  // ==========================================================================
  selectConversionCategory(cat: ConversionCategory) {
    this.selectedConvCategory = cat;
    if (cat.quickPairs.length > 0) {
      this.applyQuickPair(cat.quickPairs[0]);
    } else {
      this.convFromUnitId = cat.units[0].id;
      this.convToUnitId = cat.units[1]?.id || cat.units[0].id;
    }
  }

  applyQuickPair(qp: { fromId: string; toId: string; sampleVal: number }) {
    this.convFromUnitId = qp.fromId;
    this.convToUnitId = qp.toId;
    this.convInputValue = qp.sampleVal;
  }

  swapConversionUnits() {
    const tmp = this.convFromUnitId;
    this.convFromUnitId = this.convToUnitId;
    this.convToUnitId = tmp;
  }

  get fromUnitObj(): ConversionUnitOption {
    return this.selectedConvCategory.units.find(u => u.id === this.convFromUnitId) || this.selectedConvCategory.units[0];
  }

  get toUnitObj(): ConversionUnitOption {
    return this.selectedConvCategory.units.find(u => u.id === this.convToUnitId) || this.selectedConvCategory.units[0];
  }

  get valueInBaseSI(): number {
    return (Number(this.convInputValue) || 0) * this.fromUnitObj.factorToBase;
  }

  get convertedResultValue(): number {
    return this.valueInBaseSI / this.toUnitObj.factorToBase;
  }

  get conversionRatio(): number {
    return this.fromUnitObj.factorToBase / this.toUnitObj.factorToBase;
  }

  get conversionStepExplanation(): string {
    const fromU = this.fromUnitObj;
    const toU = this.toUnitObj;
    const ratio = this.conversionRatio;
    const exp = Math.round(Math.log10(ratio));
    if (exp === 0) {
      return `Ambas unidades son iguales (${fromU.symbol}), por lo que el valor no cambia.`;
    }
    if (exp > 0) {
      return `Como 1 ${fromU.symbol} equivale a 10^${exp} (${Math.pow(10, exp).toLocaleString()}) ${toU.symbol}, multiplicamos ${this.convInputValue} por 10^${exp}.`;
    }
    return `Como 1 ${fromU.symbol} es más chico que 1 ${toU.symbol} (factor 10^${exp}), dividimos ${this.convInputValue} por ${Math.pow(10, Math.abs(exp)).toLocaleString()} (o multiplicamos por 10^${exp}).`;
  }

  get conversionLatexEquation(): string {
    const fromU = this.fromUnitObj;
    const toU = this.toUnitObj;
    const exp = Math.round(Math.log10(this.conversionRatio));
    return `${this.convInputValue}\\text{ ${fromU.symbol}} \\times 10^{${exp}} = ${this.formatNumberClean(this.convertedResultValue)}\\text{ ${toU.symbol}}`;
  }

  get conversionCalculatorKeys(): string[] {
    const exp = Math.round(Math.log10(this.conversionRatio));
    if (exp === 0) return [`${this.convInputValue}`, '='];
    if (exp < 0) {
      return [`${this.convInputValue}`, '×', '1', '×10ˣ (EXP)', '(-)', `${Math.abs(exp)}`, '='];
    }
    return [`${this.convInputValue}`, '×', '1', '×10ˣ (EXP)', `${exp}`, '='];
  }

  // ==========================================================================
  // LÓGICA DE SECCIÓN 3: CALCULADORA CIENTÍFICA EN PANTALLA
  // ==========================================================================
  appendCalc(token: string) {
    this.calcExpression += token;
  }

  insertConstant(valStr: string, _label: string) {
    this.calcExpression += valStr;
  }

  backspaceCalc() {
    this.calcExpression = this.calcExpression.slice(0, -1);
  }

  clearCalc() {
    this.calcExpression = '';
    this.calcDisplayResult = '0';
    this.calcNumericResult = null;
  }

  evaluateCalc() {
    if (!this.calcExpression.trim()) return;
    try {
      const degFactor = this.calcAngleMode === 'DEG' ? '(Math.PI/180)*' : '';
      const invDegFactor = this.calcAngleMode === 'DEG' ? '(180/Math.PI)*' : '';

      const sanitized = this.calcExpression
        .replace(/pi/g, 'Math.PI')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/atan\(/g, `${invDegFactor}Math.atan(`)
        .replace(/sin\(/g, `Math.sin(${degFactor}`)
        .replace(/cos\(/g, `Math.cos(${degFactor}`)
        .replace(/\^2/g, '**2')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${sanitized});`)();
      if (typeof val === 'number' && isFinite(val)) {
        this.calcNumericResult = val;
        this.calcDisplayResult = this.formatNumberClean(val);
      } else {
        this.calcDisplayResult = 'Error Matemático';
        this.calcNumericResult = null;
      }
    } catch {
      this.calcDisplayResult = 'Revisar Paréntesis';
      this.calcNumericResult = null;
    }
  }

  formatNumberClean(val: number): string {
    if (val === 0) return '0';
    const abs = Math.abs(val);
    if (abs >= 1e-3 && abs < 1e6) {
      return Number(val.toPrecision(6)).toString();
    }
    return val.toExponential(4);
  }

  formatEngineering(val: number): string {
    if (val === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(val)));
    const engExp = Math.floor(exp / 3) * 3;
    const mantissa = val / Math.pow(10, engExp);
    const prefixMap: Record<number, string> = {
      12: 'T (10¹²)',
      9: 'G (10⁹)',
      6: 'M (10⁶)',
      3: 'k (10³)',
      0: '(10⁰)',
      [-3]: 'm (10⁻³ mili)',
      [-6]: 'μ (10⁻⁶ micro)',
      [-9]: 'n (10⁻⁹ nano)',
      [-12]: 'p (10⁻¹² pico)'
    };
    return `${mantissa.toFixed(3)} × 10^${engExp} ${prefixMap[engExp] || ''}`;
  }
}
