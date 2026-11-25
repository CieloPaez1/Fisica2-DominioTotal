import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { SafeHtml } from '@angular/platform-browser';
import { Fisica2ApiService, ProgramUnitDto } from '../../services/fisica2-api.service';
import { KatexRenderService } from '../../services/katex-render.service';
import { VoiceTutorService } from '../../services/voice-tutor.service';
import { FORMULA_DERIVATIONS, FormulaDerivation } from '../../data/demostraciones-data';

@Component({
  selector: 'app-demostraciones',
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
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>✦ Demostraciones Paso a Paso con Dibujos — Física 2 UNdeC ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="demo-wrapper">

        <!-- HERO BANNER -->
        <div class="cielo-hero-banner demo-hero">
          <div class="dh-copy">
            <div class="dh-badges">
              <span class="pill-purple">📐 DEDUCCIONES DE FÓRMULAS + DIBUJOS DE CÁTEDRA</span>
              <span class="pill-gold">🔓 {{ unlockedUnitsCount }} / 9 UNIDADES DESBLOQUEADAS</span>
            </div>
            <h1>Demostraciones Paso a Paso ♡</h1>
            <p>
              Cada fórmula explicada desde su principio físico hasta la ecuación final, acompañada de su dibujo vectorial y gráficos del apunte maestro <strong>FISICA2.docx</strong>.
            </p>
          </div>
        </div>

        <!-- SELECTOR DE UNIDADES CON BLOQUEO SECUENCIAL ESTRICTO -->
        <div class="unit-tabs-row">
          <button
            *ngFor="let u of unitNumbers"
            class="unit-tab-btn"
            [class.active]="selectedUnit === u"
            [class.locked]="!isUnitUnlocked(u)"
            (click)="selectUnit(u)"
          >
            <span *ngIf="isUnitUnlocked(u)">Unidad {{ u }}</span>
            <span *ngIf="!isUnitUnlocked(u)">🔒 U{{ u }}</span>
          </button>
        </div>

        <!-- AVISO SI UNIDAD BLOQUEADA -->
        <div *ngIf="!isUnitUnlocked(selectedUnit)" class="cielo-lavender-card locked-notice">
          <h3>🔒 Unidad {{ selectedUnit }} Bloqueada</h3>
          <p>
            Para mantener el orden estricto de estudio, completá al 100% las unidades anteriores antes de acceder a estas demostraciones.
          </p>
        </div>

        <!-- CONTENIDO DE LA UNIDAD DESBLOQUEADA -->
        <div *ngIf="isUnitUnlocked(selectedUnit)" class="demo-grid">

          <!-- LISTA DE DEMOSTRACIONES DE LA UNIDAD -->
          <div class="cielo-dark-panel demo-sidebar">
            <h3 class="ds-title">Fórmulas de la Unidad {{ selectedUnit }}</h3>
            <div class="ds-list">
              <button
                *ngFor="let d of unitDerivations"
                class="ds-item-btn"
                [class.active]="selectedDerivation?.id === d.id"
                (click)="selectDerivation(d)"
              >
                <span class="ds-item-title">{{ d.title }}</span>
                <span class="ds-item-sub">{{ d.steps.length }} pasos + dibujo</span>
              </button>
            </div>
          </div>

          <!-- PANEL PRINCIPAL DE DEMOSTRACIÓN -->
          <div class="cielo-dark-panel demo-stage" *ngIf="selectedDerivation as d">
            <div class="stage-head">
              <div>
                <span class="pill-purple">{{ d.unitTitle }}</span>
                <h2 class="stage-title">{{ d.title }}</h2>
                <p class="stage-sub">{{ d.subtitle }}</p>
              </div>
              <div class="stage-audio-actions">
                <button class="cielo-btn-gold" (click)="speakDerivation(d)">
                  {{ isSpeaking ? '⏹ Detener Voz' : '🔊 Escuchar Paso a Paso' }}
                </button>
              </div>
            </div>

            <!-- FÓRMULA OBJETIVO -->
            <div class="target-formula-box">
              <div class="tf-label">FÓRMULA A DEMOSTRAR</div>
              <div class="tf-math" [innerHTML]="renderFormula(d.targetFormulaLatex)"></div>
              <p class="tf-meaning">💡 <strong>Sentido físico:</strong> {{ d.physicalMeaning }}</p>
            </div>

            <!-- DIBUJO VECTORIAL + IMAGEN DEL WORD -->
            <div class="drawing-section">
              <div class="drawing-header">
                <span class="dh-label">🎨 DIBUJO ESQUEMÁTICO Y DIAGRAMAS</span>
                <div class="drawing-toggle" *ngIf="d.docxImage">
                  <button
                    class="toggle-chip"
                    [class.active]="diagramMode === 'svg'"
                    (click)="diagramMode = 'svg'"
                  >
                    📐 Diagrama Vectorial
                  </button>
                  <button
                    class="toggle-chip"
                    [class.active]="diagramMode === 'docx'"
                    (click)="diagramMode = 'docx'"
                  >
                    📄 Gráfico de FISICA2.docx
                  </button>
                </div>
              </div>

              <!-- IMAGEN EXTRAÍDA DEL WORD -->
              <div class="docx-img-frame" *ngIf="diagramMode === 'docx' && d.docxImage">
                <img [src]="d.docxImage" [alt]="d.title" class="docx-img" />
                <p class="diagram-caption">Gráfico original del apunte FISICA2.docx — {{ d.diagramCaption }}</p>
              </div>

              <!-- DIBUJO SVG INTERACTIVO POR CADA DEMOSTRACIÓN -->
              <div class="svg-frame" [class.anim-paused]="!animateSvg" *ngIf="diagramMode === 'svg' || !d.docxImage">
                <div class="svg-stage-box">
                  <ng-container [ngSwitch]="d.svgKey">

                    <!-- 1. CAMPO PUNTUAL INTERACTIVO -->
                    <svg *ngSwitchCase="'coulomb-field'" viewBox="0 0 520 220" class="phys-svg">
                      <defs>
                        <pattern id="bpGrid1" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
                        </pattern>
                        <radialGradient id="gPos1" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stop-color="#ffb3c1"/>
                          <stop offset="55%" stop-color="#ff4d6d"/>
                          <stop offset="100%" stop-color="#a4133c"/>
                        </radialGradient>
                        <radialGradient id="gTest1" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stop-color="#a5f3fc"/>
                          <stop offset="100%" stop-color="#0891b2"/>
                        </radialGradient>
                        <marker id="arrGold1" markerWidth="9" markerHeight="9" refX="6" refY="3.5" orient="auto">
                          <path d="M0,0 L8,3.5 L0,7 Z" fill="#ffd166"/>
                        </marker>
                        <marker id="arrCyan1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                          <path d="M0,0 L6,3 L0,6 Z" fill="#5ce1e6"/>
                        </marker>
                      </defs>
                      <rect width="520" height="220" rx="14" fill="url(#bpGrid1)"/>
                      <!-- Ondas de campo pulsantes -->
                      <circle cx="115" cy="110" r="45" fill="none" stroke="rgba(92,225,230,0.22)" stroke-width="1.5" class="pulse-ring"/>
                      <circle cx="115" cy="110" r="82" fill="none" stroke="rgba(92,225,230,0.14)" stroke-width="1.5" stroke-dasharray="5,5"/>
                      <!-- Líneas radiales animadas -->
                      <line x1="115" y1="80" x2="115" y2="18" stroke="#5ce1e6" stroke-width="2" class="flow-dash" marker-end="url(#arrCyan1)"/>
                      <line x1="115" y1="140" x2="115" y2="202" stroke="#5ce1e6" stroke-width="2" class="flow-dash" marker-end="url(#arrCyan1)"/>
                      <line x1="85" y1="110" x2="22" y2="110" stroke="#5ce1e6" stroke-width="2" class="flow-dash" marker-end="url(#arrCyan1)"/>
                      <line x1="94" y1="89" x2="48" y2="43" stroke="#5ce1e6" stroke-width="1.8" class="flow-dash" marker-end="url(#arrCyan1)"/>
                      <line x1="94" y1="131" x2="48" y2="177" stroke="#5ce1e6" stroke-width="1.8" class="flow-dash" marker-end="url(#arrCyan1)"/>
                      <!-- Carga fuente -->
                      <circle cx="115" cy="110" [attr.r]="18 + simParam2 * 0.14" fill="url(#gPos1)" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="115" y="115" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="14">+q ({{ (simParam2 / 10).toFixed(1) }} μC)</text>
                      <!-- Línea distancia r -->
                      <line x1="142" y1="110" [attr.x2]="190 + simParam1 * 1.9" y2="110" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="6,4"/>
                      <text [attr.x]="165 + simParam1 * 0.95" y="97" text-anchor="middle" fill="#d7c6ff" font-size="12" font-weight="800">r = {{ (1 + simParam1 / 25).toFixed(1) }} m</text>
                      <!-- Carga de prueba q0 -->
                      <circle [attr.cx]="195 + simParam1 * 1.9" cy="110" r="12" fill="url(#gTest1)" stroke="#ffffff" stroke-width="2"/>
                      <text [attr.x]="195 + simParam1 * 1.9" y="140" text-anchor="middle" fill="#5ce1e6" font-size="12" font-weight="900">q₀ (+)</text>
                      <!-- Vector E dinámico -->
                      <line
                        [attr.x1]="209 + simParam1 * 1.9"
                        y1="110"
                        [attr.x2]="209 + simParam1 * 1.9 + coulombArrowLen"
                        y2="110"
                        stroke="#ffd166"
                        stroke-width="4.5"
                        stroke-linecap="round"
                        marker-end="url(#arrGold1)"
                      />
                      <text [attr.x]="209 + simParam1 * 1.9 + coulombArrowLen / 2" y="88" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="900">
                        E ∝ {{ coulombRelativeE }}
                      </text>
                      <!-- Etiqueta telemetría -->
                      <rect x="330" y="14" width="176" height="44" rx="10" fill="rgba(16,20,50,0.88)" stroke="#7c5dfa" stroke-width="1.8"/>
                      <text x="418" y="33" text-anchor="middle" fill="#ffd166" font-size="11.5" font-weight="900">Ley Inversa del Cuadrado</text>
                      <text x="418" y="49" text-anchor="middle" fill="#5ce1e6" font-size="11" font-weight="800">E = k·q / r² = {{ coulombRelativeE }} u.a.</text>
                    </svg>

                    <!-- 2. TORQUE DIPOLO INTERACTIVO -->
                    <svg *ngSwitchCase="'dipole-torque'" viewBox="0 0 520 220" class="phys-svg">
                      <defs>
                        <pattern id="bpGrid2" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
                        </pattern>
                        <marker id="arrE2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L7,3 L0,6 Z" fill="#5ce1e6"/>
                        </marker>
                        <marker id="arrF2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L7,3 L0,6 Z" fill="#ffd166"/>
                        </marker>
                      </defs>
                      <rect width="520" height="220" rx="14" fill="url(#bpGrid2)"/>
                      <!-- Campo uniforme animado -->
                      <line x1="35" y1="45" x2="485" y2="45" stroke="rgba(92,225,230,0.55)" stroke-width="2" class="flow-dash" marker-end="url(#arrE2)"/>
                      <line x1="35" y1="110" x2="485" y2="110" stroke="rgba(92,225,230,0.4)" stroke-width="2" stroke-dasharray="6,5"/>
                      <line x1="35" y1="175" x2="485" y2="175" stroke="rgba(92,225,230,0.55)" stroke-width="2" class="flow-dash" marker-end="url(#arrE2)"/>
                      <text x="450" y="34" fill="#5ce1e6" font-size="12" font-weight="900">E uniforme →</text>
                      <!-- Dipolo rotando según simParam1 (0..180°) -->
                      <g [attr.transform]="'translate(250,110) rotate(' + (-dipoleAngleDeg) + ')'">
                        <line x1="-68" y1="0" x2="68" y2="0" stroke="#d7c6ff" stroke-width="7" stroke-linecap="round"/>
                        <circle cx="-68" cy="0" r="16" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5"/>
                        <text x="-68" y="5" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="13">-q</text>
                        <circle cx="68" cy="0" r="16" fill="#ff4d6d" stroke="#ffffff" stroke-width="2.5"/>
                        <text x="68" y="5" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="13">+q</text>
                        <circle cx="0" cy="0" r="5" fill="#ffd166"/>
                      </g>
                      <!-- Fuerzas sobre los polos (siempre horizontales) -->
                      <line [attr.x1]="250 + 68 * dipoleCos" [attr.y1]="110 - 68 * dipoleSin" [attr.x2]="250 + 68 * dipoleCos + 65" [attr.y2]="110 - 68 * dipoleSin" stroke="#ffd166" stroke-width="3.5" marker-end="url(#arrF2)"/>
                      <line [attr.x1]="250 - 68 * dipoleCos" [attr.y1]="110 + 68 * dipoleSin" [attr.x2]="250 - 68 * dipoleCos - 65" [attr.y2]="110 + 68 * dipoleSin" stroke="#ffd166" stroke-width="3.5" marker-end="url(#arrF2)"/>
                      <!-- Telemetría -->
                      <rect x="16" y="12" width="215" height="44" rx="10" fill="rgba(16,20,50,0.88)" stroke="#ffd166" stroke-width="1.8"/>
                      <text x="123" y="30" text-anchor="middle" fill="#ffd166" font-size="11.5" font-weight="900">θ = {{ dipoleAngleDeg }}°  |  sin(θ) = {{ dipoleSin.toFixed(2) }}</text>
                      <text x="123" y="47" text-anchor="middle" fill="#38e595" font-size="11" font-weight="800">{{ dipoleRegimeLabel }}</text>
                    </svg>

                    <!-- 3. LEY DE GAUSS INTERACTIVA -->
                    <svg *ngSwitchCase="'gauss-sphere'" viewBox="0 0 520 220" class="phys-svg">
                      <defs>
                        <pattern id="bpGrid3" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
                        </pattern>
                        <radialGradient id="gGauss" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="rgba(92,225,230,0.22)"/>
                          <stop offset="100%" stop-color="rgba(92,225,230,0.03)"/>
                        </radialGradient>
                      </defs>
                      <rect width="520" height="220" rx="14" fill="url(#bpGrid3)"/>
                      <!-- Superficie gaussiana dinámica -->
                      <circle cx="220" cy="110" [attr.r]="38 + simParam1 * 0.52" fill="url(#gGauss)" stroke="#5ce1e6" stroke-width="3" stroke-dasharray="8,5"/>
                      <circle cx="220" cy="110" r="17" fill="#ff4d6d" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="220" y="115" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="13">+q</text>
                      <!-- Líneas radiales atravesando la esfera -->
                      <line x1="220" y1="90" x2="220" y2="14" stroke="#ffd166" stroke-width="2.2" class="flow-dash"/>
                      <line x1="220" y1="130" x2="220" y2="206" stroke="#ffd166" stroke-width="2.2" class="flow-dash"/>
                      <line x1="200" y1="110" x2="112" y2="110" stroke="#ffd166" stroke-width="2.2" class="flow-dash"/>
                      <line x1="240" y1="110" x2="328" y2="110" stroke="#ffd166" stroke-width="2.5" class="flow-dash"/>
                      <line x1="234" y1="96" x2="296" y2="34" stroke="#ffd166" stroke-width="2" class="flow-dash"/>
                      <line x1="234" y1="124" x2="296" y2="186" stroke="#ffd166" stroke-width="2" class="flow-dash"/>
                      <rect x="336" y="64" width="170" height="84" rx="12" fill="rgba(16,20,50,0.9)" stroke="#5ce1e6" stroke-width="2"/>
                      <text x="421" y="88" text-anchor="middle" fill="#5ce1e6" font-size="12" font-weight="900">Radio r = {{ (1 + simParam1 / 25).toFixed(1) }} m</text>
                      <text x="421" y="110" text-anchor="middle" fill="#ffd166" font-size="12" font-weight="800">E ∝ 1/r²  |  Área = 4πr²</text>
                      <text x="421" y="132" text-anchor="middle" fill="#38e595" font-size="12.5" font-weight="900">Φ_E = q/ε₀ = CTE ✓</text>
                    </svg>

                    <!-- 4. ENERGÍA POTENCIAL / INTEGRAL DE LÍNEA / EQUIPOTENCIALES -->
                    <svg *ngSwitchCase="'potential-energy'" viewBox="0 0 520 220" class="phys-svg">
                      <defs>
                        <pattern id="bpGrid4" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
                        </pattern>
                      </defs>
                      <rect width="520" height="220" rx="14" fill="url(#bpGrid4)"/>
                      <circle cx="85" cy="110" r="22" fill="#ff4d6d" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="85" y="115" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="14">q₁</text>
                      <line x1="112" y1="110" x2="475" y2="110" stroke="#9b87f5" stroke-width="2" stroke-dasharray="6,4"/>
                      <circle cx="195" cy="110" r="7" fill="#ffd166"/>
                      <text x="195" y="136" text-anchor="middle" fill="#ffd166" font-size="12" font-weight="800">r_A</text>
                      <circle cx="420" cy="110" r="7" fill="#38e595"/>
                      <text x="420" y="136" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">r_B</text>
                      <!-- Carga móvil q2 -->
                      <circle [attr.cx]="195 + simParam1 * 2.25" cy="110" r="14" fill="#5ce1e6" stroke="#ffffff" stroke-width="2.5"/>
                      <text [attr.x]="195 + simParam1 * 2.25" y="84" text-anchor="middle" fill="#5ce1e6" font-size="12.5" font-weight="900">q₂ (r = {{ (1 + simParam1 / 25).toFixed(1) }} m)</text>
                      <rect x="275" y="14" width="225" height="44" rx="10" fill="rgba(16,20,50,0.9)" stroke="#38e595" stroke-width="1.8"/>
                      <text x="387" y="33" text-anchor="middle" fill="#ffd166" font-size="11.5" font-weight="900">U(r) = k·q₁·q₂ / r</text>
                      <text x="387" y="49" text-anchor="middle" fill="#38e595" font-size="11" font-weight="800">U relativa = {{ (100 / (25 + simParam1)).toFixed(2) }} u.a.</text>
                    </svg>

                    <svg *ngSwitchCase="'line-integral-v'" viewBox="0 0 520 220" class="phys-svg">
                      <rect width="520" height="220" rx="14" fill="rgba(92,225,230,0.04)"/>
                      <line x1="40" y1="50" x2="480" y2="50" stroke="#5ce1e6" stroke-width="2" class="flow-dash"/>
                      <line x1="40" y1="110" x2="480" y2="110" stroke="#5ce1e6" stroke-width="2" class="flow-dash"/>
                      <line x1="40" y1="170" x2="480" y2="170" stroke="#5ce1e6" stroke-width="2" class="flow-dash"/>
                      <text x="435" y="38" fill="#5ce1e6" font-size="12" font-weight="900">E uniforme →</text>
                      <path d="M 110 110 C 190 42, 310 178, 410 110" fill="none" stroke="#f472b6" stroke-width="3.5"/>
                      <circle cx="110" cy="110" r="8" fill="#ffd166"/>
                      <text x="110" y="138" text-anchor="middle" fill="#ffd166" font-weight="900" font-size="12">A (V = 100 V)</text>
                      <circle cx="410" cy="110" r="8" fill="#38e595"/>
                      <text x="410" y="138" text-anchor="middle" fill="#38e595" font-weight="900" font-size="12">B (V = 0 V)</text>
                      <circle [attr.cx]="110 + simParam1 * 3.0" [attr.cy]="110 - Math.sin((simParam1 / 100) * Math.PI * 2) * 34" r="11" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
                      <text x="260" y="202" text-anchor="middle" fill="#ffd166" font-size="12.5" font-weight="900">
                        Potencial en la carga: V = {{ (100 - simParam1).toFixed(0) }} V (ΔV = -E·d)
                      </text>
                    </svg>

                    <svg *ngSwitchCase="'equipotentials'" viewBox="0 0 520 220" class="phys-svg">
                      <circle cx="240" cy="110" r="34" fill="none" stroke="#38e595" stroke-width="2.5" stroke-dasharray="5,4"/>
                      <circle cx="240" cy="110" r="62" fill="none" stroke="#5ce1e6" stroke-width="2.5" stroke-dasharray="5,4"/>
                      <circle cx="240" cy="110" r="90" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-dasharray="5,4"/>
                      <circle cx="240" cy="110" r="13" fill="#ff4d6d" stroke="#ffffff" stroke-width="2"/>
                      <text x="240" y="114" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="12">+q</text>
                      <line x1="255" y1="110" [attr.x2]="280 + simParam1 * 1.4" y2="110" stroke="#ffd166" stroke-width="3.5" class="flow-dash"/>
                      <circle [attr.cx]="274 + simParam1 * 0.6" cy="110" r="7" fill="#ffd166"/>
                      <text x="415" y="96" text-anchor="middle" fill="#ffd166" font-size="12.5" font-weight="900">E = -∇V ⟂ Equipot.</text>
                      <text x="80" y="34" fill="#38e595" font-size="12" font-weight="900">V₁ &gt; V₂ &gt; V₃</text>
                    </svg>

                    <!-- 5. CAPACITORES -->
                    <svg *ngSwitchCase="'parallel-capacitor'" viewBox="0 0 520 220" class="phys-svg">
                      <rect [attr.x]="200 - simParam1 * 0.8" y="30" width="22" height="140" rx="5" fill="#ff4d6d" stroke="#ffffff" stroke-width="2"/>
                      <rect [attr.x]="298 + simParam1 * 0.8" y="30" width="22" height="140" rx="5" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                      <line [attr.x1]="224 - simParam1 * 0.8" y1="60" [attr.x2]="294 + simParam1 * 0.8" y2="60" stroke="#ffd166" stroke-width="2.5" class="flow-dash"/>
                      <line [attr.x1]="224 - simParam1 * 0.8" y1="100" [attr.x2]="294 + simParam1 * 0.8" y2="100" stroke="#ffd166" stroke-width="2.5" class="flow-dash"/>
                      <line [attr.x1]="224 - simParam1 * 0.8" y1="140" [attr.x2]="294 + simParam1 * 0.8" y2="140" stroke="#ffd166" stroke-width="2.5" class="flow-dash"/>
                      <text x="260" y="200" text-anchor="middle" fill="#5ce1e6" font-size="13" font-weight="900">
                        Separación d = {{ (1 + simParam1 / 25).toFixed(1) }} mm  |  C = ε₀A/d ∝ {{ (100 / (25 + simParam1)).toFixed(2) }}
                      </text>
                    </svg>

                    <svg *ngSwitchCase="'spherical-capacitor'" viewBox="0 0 520 220" class="phys-svg">
                      <circle cx="240" cy="110" [attr.r]="62 + simParam1 * 0.35" fill="rgba(59,130,246,0.14)" stroke="#60a5fa" stroke-width="5"/>
                      <circle cx="240" cy="110" r="30" fill="#ff4d6d" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="240" y="115" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="13">+Q</text>
                      <line x1="270" y1="110" [attr.x2]="302 + simParam1 * 0.35" y2="110" stroke="#ffd166" stroke-width="2.5" class="flow-dash"/>
                      <text x="415" y="106" text-anchor="middle" fill="#ffd166" font-size="12.5" font-weight="900">r_b / r_a = {{ ((62 + simParam1 * 0.35) / 30).toFixed(2) }}</text>
                      <text x="415" y="128" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">∫ E(r) dr entre r_a y r_b</text>
                    </svg>

                    <svg *ngSwitchCase="'dielectric-capacitor'" viewBox="0 0 520 220" class="phys-svg">
                      <rect x="115" y="30" width="22" height="145" rx="4" fill="#ff4d6d" stroke="#ffffff" stroke-width="2"/>
                      <rect x="383" y="30" width="22" height="145" rx="4" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                      <rect x="148" y="36" width="224" height="133" rx="10" [attr.fill]="'rgba(167,139,250,' + (0.12 + simParam1 * 0.004) + ')'" stroke="#a78bfa" stroke-width="2.5"/>
                      <text x="260" y="74" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">Constante Dieléctrica κ = {{ (1 + simParam1 / 20).toFixed(1) }}</text>
                      <text x="260" y="108" text-anchor="middle" fill="#ffd166" font-size="14" font-weight="900">E_neto = E₀ / {{ (1 + simParam1 / 20).toFixed(1) }}</text>
                      <text x="260" y="140" text-anchor="middle" fill="#38e595" font-size="14" font-weight="900">C = {{ (1 + simParam1 / 20).toFixed(1) }} · C₀</text>
                    </svg>

                    <!-- 6. CORRIENTE / OHM / JOULE -->
                    <svg *ngSwitchCase="'drift-current'" viewBox="0 0 520 220" class="phys-svg">
                      <rect x="65" y="55" width="390" height="96" rx="20" fill="rgba(92,225,230,0.12)" stroke="#5ce1e6" stroke-width="3"/>
                      <ellipse cx="185" cy="103" rx="12" ry="46" fill="rgba(255,209,102,0.22)" stroke="#ffd166" stroke-width="2"/>
                      <ellipse cx="335" cy="103" rx="12" ry="46" fill="rgba(255,209,102,0.22)" stroke="#ffd166" stroke-width="2"/>
                      <line x1="90" y1="84" x2="430" y2="84" stroke="#ff758f" stroke-width="4" stroke-dasharray="10,14" class="flow-dash"/>
                      <line x1="90" y1="122" x2="430" y2="122" stroke="#ff758f" stroke-width="4" stroke-dasharray="10,14" class="flow-dash"/>
                      <text x="260" y="40" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="900">I = n·|q|·v_d·A  (v_d = {{ (0.1 + simParam1 * 0.02).toFixed(2) }} mm/s)</text>
                      <text x="260" y="182" text-anchor="middle" fill="#38e595" font-size="12.5" font-weight="800">Volumen barrido dV = A · v_d · dt</text>
                    </svg>

                    <svg *ngSwitchCase="'ohm-microscopic'" viewBox="0 0 520 220" class="phys-svg">
                      <rect x="90" [attr.y]="105 - (25 + simParam1 * 0.35)" width="340" [attr.height]="50 + simParam1 * 0.7" rx="14" fill="rgba(167,139,250,0.22)" stroke="#a78bfa" stroke-width="3"/>
                      <text x="260" y="102" text-anchor="middle" fill="#ffd166" font-size="15" font-weight="900">E = ρ·J  ⇒  R = ρ·L / A</text>
                      <text x="260" y="198" text-anchor="middle" fill="#5ce1e6" font-size="12.5" font-weight="900">Sección A relativa: {{ (1 + simParam1 / 25).toFixed(1) }}  →  R inversa a A</text>
                    </svg>

                    <svg *ngSwitchCase="'joule-power'" viewBox="0 0 520 220" class="phys-svg">
                      <line x1="50" y1="105" x2="155" y2="105" stroke="#5ce1e6" stroke-width="3.5" class="flow-dash"/>
                      <polyline points="155,105 175,72 200,138 225,72 250,138 275,72 300,138 320,105" fill="none" [attr.stroke]="simParam1 > 60 ? '#ff4d6d' : '#ffd166'" [attr.stroke-width]="3.5 + simParam1 * 0.04" stroke-linejoin="round"/>
                      <line x1="320" y1="105" x2="470" y2="105" stroke="#5ce1e6" stroke-width="3.5" class="flow-dash"/>
                      <text x="260" y="42" text-anchor="middle" fill="#ff758f" font-size="14" font-weight="900">Corriente I = {{ (simParam1 / 10).toFixed(1) }} A  →  Potencia P = I²R ∝ {{ ((simParam1 / 10) * (simParam1 / 10)).toFixed(1) }}</text>
                    </svg>

                    <!-- 7. CIRCUITOS RC INTERACTIVOS -->
                    <svg *ngSwitchCase="'rc-charge'" viewBox="0 0 520 220" class="phys-svg">
                      <line x1="70" y1="175" x2="470" y2="175" stroke="#9b87f5" stroke-width="2.5"/>
                      <line x1="70" y1="25" x2="70" y2="175" stroke="#9b87f5" stroke-width="2.5"/>
                      <line x1="70" y1="45" x2="465" y2="45" stroke="#ffd166" stroke-width="1.8" stroke-dasharray="6,4"/>
                      <text x="455" y="36" text-anchor="end" fill="#ffd166" font-size="12" font-weight="900">Q_máx = C·ε (100%)</text>
                      <path d="M 70 175 C 120 75, 220 50, 460 46" fill="none" stroke="#38e595" stroke-width="4"/>
                      <circle [attr.cx]="70 + simParam1 * 3.9" [attr.cy]="175 - 129 * (1 - Math.exp(-(simParam1 / 20)))" r="9" fill="#ffd166" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="270" y="204" text-anchor="middle" fill="#38e595" font-size="13" font-weight="900">
                        t = {{ (simParam1 / 20).toFixed(2) }} τ  |  Carga = {{ ((1 - Math.exp(-(simParam1 / 20))) * 100).toFixed(1) }}%
                      </text>
                    </svg>

                    <svg *ngSwitchCase="'rc-discharge'" viewBox="0 0 520 220" class="phys-svg">
                      <line x1="70" y1="175" x2="470" y2="175" stroke="#9b87f5" stroke-width="2.5"/>
                      <line x1="70" y1="25" x2="70" y2="175" stroke="#9b87f5" stroke-width="2.5"/>
                      <path d="M 70 42 C 130 142, 230 168, 460 173" fill="none" stroke="#ff4d6d" stroke-width="4"/>
                      <circle [attr.cx]="70 + simParam1 * 3.9" [attr.cy]="175 - 133 * Math.exp(-(simParam1 / 20))" r="9" fill="#ffd166" stroke="#ffffff" stroke-width="2.5"/>
                      <text x="270" y="204" text-anchor="middle" fill="#ff758f" font-size="13" font-weight="900">
                        t = {{ (simParam1 / 20).toFixed(2) }} τ  |  Carga restante = {{ (Math.exp(-(simParam1 / 20)) * 100).toFixed(1) }}%
                      </text>
                    </svg>

                    <!-- 8. MAGNETISMO: CICLOTRÓN / SELECTOR / TORQUE -->
                    <svg *ngSwitchCase="'cyclotron-radius'" viewBox="0 0 520 220" class="phys-svg">
                      <circle cx="240" cy="110" [attr.r]="32 + simParam1 * 0.55" fill="rgba(92,225,230,0.08)" stroke="#5ce1e6" stroke-width="3.5" stroke-dasharray="7,5"/>
                      <g [attr.transform]="'translate(240,110)'" class="spin-orbit">
                        <circle [attr.cx]="32 + simParam1 * 0.55" cy="0" r="9" fill="#ff4d6d" stroke="#ffffff" stroke-width="2"/>
                      </g>
                      <text x="410" y="96" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="900">r = mv / (|q|B)</text>
                      <text x="410" y="120" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">r relativo = {{ (1 + simParam1 / 30).toFixed(2) }}</text>
                    </svg>

                    <svg *ngSwitchCase="'velocity-selector'" viewBox="0 0 520 220" class="phys-svg">
                      <rect x="90" y="26" width="340" height="14" rx="4" fill="#ff4d6d"/>
                      <rect x="90" y="170" width="340" height="14" rx="4" fill="#3b82f6"/>
                      <line x1="65" y1="105" x2="455" y2="105" stroke="#38e595" stroke-width="2.5" stroke-dasharray="6,4"/>
                      <circle [attr.cx]="100 + simParam1 * 3.1" cy="105" r="11" fill="#ffd166" stroke="#ffffff" stroke-width="2"/>
                      <text x="260" y="206" text-anchor="middle" fill="#38e595" font-size="13" font-weight="900">F_B = F_E  ⇒  v = E / B (trayectoria recta sin desvío)</text>
                    </svg>

                    <!-- 9. BIOT-SAVART / AMPÈRE / FARADAY / MAXWELL -->
                    <svg *ngSwitchCase="'biot-savart-wire'" viewBox="0 0 520 220" class="phys-svg">
                      <line x1="130" y1="20" x2="130" y2="200" stroke="#ffd166" stroke-width="6" stroke-linecap="round"/>
                      <text x="106" y="46" fill="#ffd166" font-size="14" font-weight="900">I ↑</text>
                      <line x1="130" y1="110" [attr.x2]="210 + simParam1 * 2.1" y2="110" stroke="#5ce1e6" stroke-width="2.5" stroke-dasharray="5,4"/>
                      <circle [attr.cx]="210 + simParam1 * 2.1" cy="110" r="10" fill="#ff4d6d" stroke="#ffffff" stroke-width="2"/>
                      <text [attr.x]="210 + simParam1 * 2.1" y="86" text-anchor="middle" fill="#5ce1e6" font-size="12.5" font-weight="900">B = μ₀I / (2πr)</text>
                      <text x="340" y="185" text-anchor="middle" fill="#38e595" font-size="12.5" font-weight="900">r = {{ (1 + simParam1 / 25).toFixed(1) }} m  |  B ∝ {{ (100 / (25 + simParam1)).toFixed(2) }}</text>
                    </svg>

                    <svg *ngSwitchCase="'motional-emf'" viewBox="0 0 520 220" class="phys-svg">
                      <polyline points="420,42 100,42 100,165 420,165" fill="none" stroke="#5ce1e6" stroke-width="4"/>
                      <line [attr.x1]="180 + simParam1 * 2.1" y1="32" [attr.x2]="180 + simParam1 * 2.1" y2="175" stroke="#ffd166" stroke-width="7" stroke-linecap="round"/>
                      <text [attr.x]="195 + simParam1 * 2.1" y="108" fill="#38e595" font-size="13" font-weight="900">v →</text>
                      <text x="260" y="204" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="900">|ε| = B·L·v  (área Φ_B creciente)</text>
                    </svg>

                    <!-- FALLBACK ENRIQUECIDO PARA EL RESTO -->
                    <svg *ngSwitchDefault viewBox="0 0 520 220" class="phys-svg">
                      <defs>
                        <pattern id="bpGridDef" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
                        </pattern>
                      </defs>
                      <rect width="520" height="220" rx="14" fill="url(#bpGridDef)"/>
                      <circle cx="260" cy="110" [attr.r]="42 + simParam1 * 0.4" fill="rgba(92,225,230,0.12)" stroke="#5ce1e6" stroke-width="3" stroke-dasharray="7,5"/>
                      <rect x="85" y="55" width="350" height="110" rx="18" fill="rgba(16,20,50,0.85)" stroke="#ffd166" stroke-width="2.5"/>
                      <text x="260" y="96" text-anchor="middle" fill="#5ce1e6" font-size="15" font-weight="900">{{ d.title }}</text>
                      <text x="260" y="124" text-anchor="middle" fill="#38e595" font-size="12.5" font-weight="800">{{ d.diagramCaption }}</text>
                      <text x="260" y="148" text-anchor="middle" fill="#ffd166" font-size="11.5" font-weight="700">Intensidad / Parámetro: {{ simParam1 }}%</text>
                    </svg>

                  </ng-container>
                </div>

                <!-- CONTROLES INTERACTIVOS DEL GRÁFICO -->
                <div class="svg-controls-bar">
                  <div class="slider-group">
                    <label>🎛️ {{ primarySliderLabel }}: <strong>{{ simParam1 }}%</strong></label>
                    <input type="range" min="5" max="100" [(ngModel)]="simParam1" class="cielo-range" />
                  </div>
                  <div class="slider-group" *ngIf="d.svgKey === 'coulomb-field'">
                    <label>⚡ Carga q: <strong>{{ (simParam2 / 10).toFixed(1) }} μC</strong></label>
                    <input type="range" min="10" max="100" [(ngModel)]="simParam2" class="cielo-range" />
                  </div>
                  <button class="anim-toggle-btn" (click)="animateSvg = !animateSvg">
                    {{ animateSvg ? '⏸ Pausar Flujo' : '▶ Animar Flujo' }}
                  </button>
                </div>

                <p class="diagram-caption">{{ d.diagramCaption }}</p>
              </div>
            </div>

            <!-- CONTROLES PASO A PASO -->
            <div class="steps-toolbar">
              <span class="st-progress">Mostrando {{ visibleStepsCount }} de {{ d.steps.length }} pasos</span>
              <div class="st-btns">
                <button class="st-btn" (click)="revealNextStep(d)" [disabled]="visibleStepsCount >= d.steps.length">
                  ➕ Siguiente Paso
                </button>
                <button class="st-btn" (click)="showAllSteps(d)">
                  👁 Ver Todos
                </button>
                <button class="st-btn" (click)="resetSteps()">
                  ↺ Paso a Paso
                </button>
              </div>
            </div>

            <!-- LISTA NUMERADA DE PASOS -->
            <div class="steps-list">
              <div
                *ngFor="let step of d.steps.slice(0, visibleStepsCount)"
                class="step-card"
              >
                <div class="step-badge">Paso {{ step.stepNumber }}</div>
                <div class="step-body">
                  <h4>{{ step.title }}</h4>
                  <p>{{ step.explanation }}</p>
                  <div *ngIf="step.formulaLatex" class="step-math" [innerHTML]="renderFormula(step.formulaLatex)"></div>
                </div>
              </div>
            </div>

            <!-- TIP DE EXAMEN -->
            <div class="exam-tip-box">
              <strong>🎯 Clave para el Examen Final:</strong> {{ d.examTip }}
            </div>

          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .demo-wrapper {
      max-width: 1320px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .demo-hero {
      padding: 20px 26px;
    }
    .dh-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }
    .pill-purple {
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
      display: inline-block;
    }
    .pill-gold {
      background: #ffd166;
      border: 2px solid #1b1438;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
      display: inline-block;
    }
    .dh-copy h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      color: #191538;
      margin: 4px 0;
    }
    .dh-copy p {
      margin: 0;
      color: #2b2354;
      font-weight: 600;
      font-size: 0.94rem;
    }
    .unit-tabs-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .unit-tab-btn {
      background: #1a1f47;
      color: #d7c6ff;
      border: 2px solid rgba(167, 139, 250, 0.35);
      border-radius: 14px;
      padding: 8px 16px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .unit-tab-btn.active {
      background: #ffd166;
      color: #191538;
      border-color: #191538;
      box-shadow: 0 4px 0 #191538;
    }
    .unit-tab-btn.locked {
      opacity: 0.55;
      background: #121633;
      color: #9ca3af;
    }
    .locked-notice {
      padding: 22px;
      text-align: center;
    }
    .locked-notice h3 {
      margin: 0 0 6px 0;
      font-family: 'Baloo 2', sans-serif;
      color: #191538;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 18px;
      align-items: start;
    }
    @media (max-width: 960px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
    .demo-sidebar {
      padding: 16px;
    }
    .ds-title {
      font-family: 'Baloo 2', sans-serif;
      color: #ffd166;
      font-size: 1.15rem;
      margin: 0 0 12px 0;
    }
    .ds-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ds-item-btn {
      text-align: left;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(167, 139, 250, 0.25);
      border-radius: 14px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      color: #ffffff;
    }
    .ds-item-btn.active {
      background: rgba(124, 93, 250, 0.35);
      border-color: #ffd166;
    }
    .ds-item-title {
      font-weight: 800;
      font-size: 0.92rem;
    }
    .ds-item-sub {
      font-size: 0.78rem;
      color: #c4b5fd;
    }
    .demo-stage {
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .stage-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 12px;
    }
    .stage-title {
      font-family: 'Baloo 2', sans-serif;
      color: #ffffff;
      font-size: 1.55rem;
      margin: 6px 0 2px 0;
    }
    .stage-sub {
      color: #d7c6ff;
      margin: 0;
      font-size: 0.92rem;
    }
    .target-formula-box {
      background: #101432;
      border: 2px solid #7c5dfa;
      border-radius: 16px;
      padding: 14px 18px;
    }
    .tf-label {
      font-size: 0.74rem;
      font-weight: 900;
      color: #ffd166;
      letter-spacing: 0.05em;
    }
    .tf-math {
      margin: 8px 0;
      font-size: 1.25rem;
      color: #ffffff;
      overflow-x: auto;
    }
    .tf-meaning {
      margin: 0;
      font-size: 0.88rem;
      color: #d7c6ff;
    }
    .drawing-section {
      background: #0d112b;
      border: 2px solid rgba(92, 225, 230, 0.35);
      border-radius: 16px;
      padding: 14px;
    }
    .drawing-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    .dh-label {
      font-weight: 800;
      font-size: 0.82rem;
      color: #5ce1e6;
    }
    .drawing-toggle {
      display: flex;
      gap: 6px;
    }
    .toggle-chip {
      background: #1a1f47;
      color: #d7c6ff;
      border: 1.5px solid rgba(167, 139, 250, 0.4);
      border-radius: 99px;
      padding: 4px 12px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
    }
    .toggle-chip.active {
      background: #5ce1e6;
      color: #101432;
      border-color: #101432;
    }
    .svg-stage-box {
      background: radial-gradient(circle at 50% 45%, #161d4a 0%, #090d24 100%);
      border: 2px solid rgba(167, 139, 250, 0.35);
      border-radius: 16px;
      padding: 10px;
      box-shadow: inset 0 0 28px rgba(92, 225, 230, 0.08);
    }
    .phys-svg {
      width: 100%;
      max-height: 245px;
      display: block;
      margin: 0 auto;
    }
    .flow-dash {
      stroke-dasharray: 8 6;
      animation: cieloDashFlow 1.2s linear infinite;
    }
    .pulse-ring {
      animation: cieloPulseRing 2.2s ease-in-out infinite;
    }
    .spin-orbit {
      animation: cieloOrbitSpin 4.5s linear infinite;
    }
    .anim-paused .flow-dash,
    .anim-paused .pulse-ring,
    .anim-paused .spin-orbit {
      animation-play-state: paused !important;
    }
    @keyframes cieloDashFlow {
      to {
        stroke-dashoffset: -28;
      }
    }
    @keyframes cieloPulseRing {
      0%, 100% {
        opacity: 0.25;
      }
      50% {
        opacity: 0.78;
      }
    }
    @keyframes cieloOrbitSpin {
      from {
        transform: translate(240px, 110px) rotate(0deg);
      }
      to {
        transform: translate(240px, 110px) rotate(360deg);
      }
    }
    .svg-controls-bar {
      margin-top: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(215, 198, 255, 0.25);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .slider-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1 1 220px;
    }
    .slider-group label {
      font-size: 0.82rem;
      color: #d7c6ff;
      white-space: nowrap;
    }
    .cielo-range {
      flex: 1;
      accent-color: #ffd166;
      cursor: pointer;
    }
    .anim-toggle-btn {
      background: #1a1f47;
      color: #5ce1e6;
      border: 1.5px solid #5ce1e6;
      border-radius: 10px;
      padding: 6px 12px;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
    }
    .docx-img-frame {
      text-align: center;
    }
    .docx-img {
      max-width: 100%;
      max-height: 260px;
      border-radius: 10px;
      background: #ffffff;
      padding: 6px;
    }
    .diagram-caption {
      margin: 8px 0 0 0;
      text-align: center;
      font-size: 0.82rem;
      color: #c4b5fd;
    }
    .steps-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .st-progress {
      color: #ffd166;
      font-weight: 800;
      font-size: 0.88rem;
    }
    .st-btns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .st-btn {
      background: #7c5dfa;
      color: #ffffff;
      border: 2px solid #191538;
      border-radius: 12px;
      padding: 6px 14px;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .st-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .steps-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .step-card {
      display: grid;
      grid-template-columns: 82px 1fr;
      gap: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(215, 198, 255, 0.25);
      border-radius: 14px;
      padding: 12px 14px;
      align-items: start;
    }
    .step-badge {
      background: #ffd166;
      color: #191538;
      font-weight: 900;
      font-size: 0.8rem;
      text-align: center;
      padding: 4px 8px;
      border-radius: 10px;
      border: 2px solid #191538;
    }
    .step-body h4 {
      margin: 0 0 4px 0;
      color: #ffffff;
      font-size: 1rem;
    }
    .step-body p {
      margin: 0 0 8px 0;
      color: #d7c6ff;
      font-size: 0.88rem;
      line-height: 1.45;
    }
    .step-math {
      background: #101432;
      border-radius: 10px;
      padding: 8px 12px;
      color: #ffffff;
      overflow-x: auto;
    }
    .exam-tip-box {
      background: rgba(56, 229, 149, 0.14);
      border: 2px solid #38e595;
      border-radius: 14px;
      padding: 12px 16px;
      color: #e6fff3;
      font-size: 0.9rem;
    }
  `]
})
export class DemostracionesPage implements OnInit {
  unitNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  units: ProgramUnitDto[] = [];
  selectedUnit = 1;
  selectedDerivation: FormulaDerivation | null = null;
  visibleStepsCount = 1;
  diagramMode: 'svg' | 'docx' = 'svg';
  isSpeaking = false;
  simParam1 = 45;
  simParam2 = 50;
  animateSvg = true;
  Math = Math;

  get primarySliderLabel(): string {
    const key = this.selectedDerivation?.svgKey;
    switch (key) {
      case 'dipole-torque': return 'Ángulo θ';
      case 'rc-charge':
      case 'rc-discharge': return 'Tiempo t / τ';
      case 'dielectric-capacitor': return 'Constante κ';
      case 'joule-power': return 'Corriente I';
      case 'drift-current': return 'Velocidad v_d';
      case 'ohm-microscopic': return 'Sección A';
      case 'motional-emf': return 'Posición barra x(t)';
      case 'line-integral-v':
      case 'potential-energy': return 'Posición carga';
      default: return 'Parámetro r / d';
    }
  }

  get coulombArrowLen(): number {
    const r = 1 + this.simParam1 / 25;
    const q = this.simParam2 / 10;
    return Math.min(130, Math.max(20, (q / (r * r)) * 18));
  }

  get coulombRelativeE(): string {
    const r = 1 + this.simParam1 / 25;
    const q = this.simParam2 / 10;
    return (q / (r * r)).toFixed(2);
  }

  get dipoleAngleDeg(): number {
    return Math.round((this.simParam1 / 100) * 180);
  }

  get dipoleSin(): number {
    return Math.sin((this.dipoleAngleDeg * Math.PI) / 180);
  }

  get dipoleCos(): number {
    return Math.cos((this.dipoleAngleDeg * Math.PI) / 180);
  }

  get dipoleRegimeLabel(): string {
    const deg = this.dipoleAngleDeg;
    if (deg <= 12) return 'Equilibrio Estable (τ ≈ 0)';
    if (deg >= 168) return 'Equilibrio Inestable (U máx)';
    if (deg >= 78 && deg <= 102) return 'Torque Máximo (sinθ ≈ 1)';
    return 'Giro hacia alineación con E';
  }

  constructor(
    private api: Fisica2ApiService,
    private katex: KatexRenderService,
    private voiceTutor: VoiceTutorService
  ) {}

  ngOnInit() {
    this.api.units$.subscribe((units) => {
      this.units = units || [];
      if (!this.isUnitUnlocked(this.selectedUnit)) {
        this.selectedUnit = this.api.getHighestUnlockedUnitNumber();
      }
      this.refreshSelection();
    });
    this.api.getUnits().subscribe();
    this.voiceTutor.isSpeaking$.subscribe((sp) => (this.isSpeaking = sp));
    this.refreshSelection();
  }

  get unlockedUnitsCount(): number {
    return this.unitNumbers.filter((u) => this.isUnitUnlocked(u)).length;
  }

  get unitDerivations(): FormulaDerivation[] {
    return FORMULA_DERIVATIONS.filter((d) => d.unitNumber === this.selectedUnit);
  }

  isUnitUnlocked(u: number): boolean {
    return this.api.isUnitUnlocked(u);
  }

  selectUnit(u: number) {
    if (!this.isUnitUnlocked(u)) return;
    this.selectedUnit = u;
    this.refreshSelection();
  }

  refreshSelection() {
    const list = this.unitDerivations;
    this.selectedDerivation = list.length > 0 ? list[0] : null;
    this.visibleStepsCount = this.selectedDerivation ? this.selectedDerivation.steps.length : 1;
    this.diagramMode = 'svg';
  }

  selectDerivation(d: FormulaDerivation) {
    this.selectedDerivation = d;
    this.visibleStepsCount = d.steps.length;
    this.diagramMode = 'svg';
  }

  revealNextStep(d: FormulaDerivation) {
    if (this.visibleStepsCount < d.steps.length) {
      this.visibleStepsCount++;
    }
  }

  showAllSteps(d: FormulaDerivation) {
    this.visibleStepsCount = d.steps.length;
  }

  resetSteps() {
    this.visibleStepsCount = 1;
  }

  renderFormula(latex: string): SafeHtml {
    return this.katex.renderMath(latex, true);
  }

  speakDerivation(d: FormulaDerivation) {
    if (this.isSpeaking) {
      this.voiceTutor.stop();
      return;
    }
    const text = [
      `${d.title}. ${d.physicalMeaning}`,
      ...d.steps.map((s) => `Paso ${s.stepNumber}: ${s.title}. ${s.explanation}`),
      `Clave de examen: ${d.examTip}`,
    ].join(' ');
    this.voiceTutor.speakFluid(text);
  }
}
