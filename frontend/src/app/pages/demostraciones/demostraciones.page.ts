import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
              <div class="svg-frame" *ngIf="diagramMode === 'svg' || !d.docxImage">
                <ng-container [ngSwitch]="d.svgKey">

                  <!-- 1. CAMPO PUNTUAL -->
                  <svg *ngSwitchCase="'coulomb-field'" viewBox="0 0 460 180" class="phys-svg">
                    <defs>
                      <marker id="arrY" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#ffd166"/></marker>
                      <marker id="arrC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#5ce1e6"/></marker>
                    </defs>
                    <circle cx="110" cy="90" r="24" fill="#ff758f" stroke="#191538" stroke-width="3"/>
                    <text x="110" y="96" text-anchor="middle" fill="#191538" font-weight="900" font-size="16">+q</text>
                    <line x1="138" y1="90" x2="270" y2="90" stroke="#9b87f5" stroke-width="2" stroke-dasharray="5,4"/>
                    <text x="205" y="80" text-anchor="middle" fill="#d7c6ff" font-size="13" font-weight="700">distancia r</text>
                    <circle cx="280" cy="90" r="11" fill="#5ce1e6" stroke="#191538" stroke-width="2.5"/>
                    <text x="280" y="122" text-anchor="middle" fill="#5ce1e6" font-size="13" font-weight="800">q₀ (+)</text>
                    <line x1="295" y1="90" x2="415" y2="90" stroke="#ffd166" stroke-width="3.5" marker-end="url(#arrY)"/>
                    <text x="360" y="76" text-anchor="middle" fill="#ffd166" font-size="14" font-weight="900">E = F / q₀</text>
                    <line x1="110" y1="62" x2="110" y2="20" stroke="#5ce1e6" stroke-width="2" marker-end="url(#arrC)"/>
                    <line x1="110" y1="118" x2="110" y2="160" stroke="#5ce1e6" stroke-width="2" marker-end="url(#arrC)"/>
                    <line x1="82" y1="90" x2="36" y2="90" stroke="#5ce1e6" stroke-width="2" marker-end="url(#arrC)"/>
                  </svg>

                  <!-- 2. TORQUE DIPOLO -->
                  <svg *ngSwitchCase="'dipole-torque'" viewBox="0 0 460 190" class="phys-svg">
                    <line x1="40" y1="40" x2="420" y2="40" stroke="#5ce1e6" stroke-width="2" stroke-dasharray="6,4"/>
                    <line x1="40" y1="95" x2="420" y2="95" stroke="#5ce1e6" stroke-width="2"/>
                    <line x1="40" y1="150" x2="420" y2="150" stroke="#5ce1e6" stroke-width="2" stroke-dasharray="6,4"/>
                    <text x="410" y="30" fill="#5ce1e6" font-size="13" font-weight="800">E uniforme →</text>
                    <line x1="165" y1="138" x2="295" y2="52" stroke="#d7c6ff" stroke-width="6" stroke-linecap="round"/>
                    <circle cx="165" cy="138" r="14" fill="#60a5fa" stroke="#191538" stroke-width="2.5"/>
                    <text x="165" y="143" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">-q</text>
                    <circle cx="295" cy="52" r="14" fill="#ff758f" stroke="#191538" stroke-width="2.5"/>
                    <text x="295" y="57" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">+q</text>
                    <line x1="312" y1="52" x2="395" y2="52" stroke="#ffd166" stroke-width="3.5"/>
                    <text x="360" y="42" fill="#ffd166" font-size="13" font-weight="800">+qE →</text>
                    <line x1="148" y1="138" x2="70" y2="138" stroke="#ffd166" stroke-width="3.5"/>
                    <text x="95" y="128" fill="#ffd166" font-size="13" font-weight="800">← -qE</text>
                    <text x="245" y="112" fill="#38e595" font-size="13" font-weight="800">θ (brazo d/2·sinθ)</text>
                  </svg>

                  <!-- 3. LEY DE GAUSS -->
                  <svg *ngSwitchCase="'gauss-sphere'" viewBox="0 0 460 190" class="phys-svg">
                    <circle cx="230" cy="95" r="72" fill="rgba(92,225,230,0.08)" stroke="#5ce1e6" stroke-width="2.5" stroke-dasharray="7,5"/>
                    <circle cx="230" cy="95" r="16" fill="#ff758f" stroke="#191538" stroke-width="2.5"/>
                    <text x="230" y="100" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">+q</text>
                    <line x1="230" y1="95" x2="302" y2="95" stroke="#d7c6ff" stroke-width="2"/>
                    <text x="266" y="88" text-anchor="middle" fill="#d7c6ff" font-size="12" font-weight="800">r</text>
                    <line x1="302" y1="95" x2="365" y2="95" stroke="#ffd166" stroke-width="3.5"/>
                    <text x="355" y="82" fill="#ffd166" font-size="13" font-weight="800">E ∥ dA →</text>
                    <line x1="230" y1="23" x2="230" y2="4" stroke="#ffd166" stroke-width="2.5"/>
                    <line x1="230" y1="167" x2="230" y2="186" stroke="#ffd166" stroke-width="2.5"/>
                    <line x1="158" y1="95" x2="105" y2="95" stroke="#ffd166" stroke-width="2.5"/>
                    <text x="68" y="34" fill="#5ce1e6" font-size="12" font-weight="800">Superficie Gaussiana (4πr²)</text>
                  </svg>

                  <!-- 4. ENERGÍA POTENCIAL / INTEGRAL -->
                  <svg *ngSwitchCase="'potential-energy'" viewBox="0 0 460 180" class="phys-svg">
                    <circle cx="80" cy="90" r="20" fill="#ff758f" stroke="#191538" stroke-width="2.5"/>
                    <text x="80" y="95" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">q₁</text>
                    <line x1="104" y1="90" x2="395" y2="90" stroke="#9b87f5" stroke-width="2" stroke-dasharray="5,4"/>
                    <circle cx="195" cy="90" r="10" fill="#ffd166"/>
                    <text x="195" y="120" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="800">A (r_A)</text>
                    <circle cx="330" cy="90" r="10" fill="#38e595"/>
                    <text x="330" y="120" text-anchor="middle" fill="#38e595" font-size="13" font-weight="800">B (r_B)</text>
                    <path d="M 205 74 Q 262 46 320 74" fill="none" stroke="#5ce1e6" stroke-width="2.5"/>
                    <text x="262" y="48" text-anchor="middle" fill="#5ce1e6" font-size="12" font-weight="800">∫ F(r) dr = U_A - U_B</text>
                  </svg>

                  <!-- 5. INTEGRAL DE LÍNEA V -->
                  <svg *ngSwitchCase="'line-integral-v'" viewBox="0 0 460 180" class="phys-svg">
                    <line x1="40" y1="45" x2="420" y2="45" stroke="#5ce1e6" stroke-width="2"/>
                    <line x1="40" y1="95" x2="420" y2="95" stroke="#5ce1e6" stroke-width="2"/>
                    <line x1="40" y1="145" x2="420" y2="145" stroke="#5ce1e6" stroke-width="2"/>
                    <text x="380" y="34" fill="#5ce1e6" font-size="13" font-weight="800">E →</text>
                    <circle cx="115" cy="95" r="8" fill="#ffd166"/>
                    <text x="115" y="122" text-anchor="middle" fill="#ffd166" font-weight="900" font-size="13">A (V mayor)</text>
                    <circle cx="325" cy="95" r="8" fill="#38e595"/>
                    <text x="325" y="122" text-anchor="middle" fill="#38e595" font-weight="900" font-size="13">B (V menor)</text>
                    <path d="M 115 95 C 170 40, 250 140, 325 95" fill="none" stroke="#f472b6" stroke-width="3"/>
                    <text x="220" y="166" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="800">ΔV = -∫ E·dl (independiente del camino)</text>
                  </svg>

                  <!-- 6. EQUIPOTENCIALES -->
                  <svg *ngSwitchCase="'equipotentials'" viewBox="0 0 460 185" class="phys-svg">
                    <circle cx="230" cy="92" r="32" fill="none" stroke="#38e595" stroke-width="2.2" stroke-dasharray="5,4"/>
                    <circle cx="230" cy="92" r="58" fill="none" stroke="#5ce1e6" stroke-width="2.2" stroke-dasharray="5,4"/>
                    <circle cx="230" cy="92" r="82" fill="none" stroke="#a78bfa" stroke-width="2.2" stroke-dasharray="5,4"/>
                    <circle cx="230" cy="92" r="12" fill="#ff758f"/>
                    <text x="230" y="96" text-anchor="middle" fill="#191538" font-weight="900" font-size="12">+q</text>
                    <line x1="242" y1="92" x2="345" y2="92" stroke="#ffd166" stroke-width="3"/>
                    <text x="355" y="96" fill="#ffd166" font-size="13" font-weight="800">E ⟂ V=cte</text>
                    <text x="72" y="34" fill="#38e595" font-size="12" font-weight="800">V₁ &gt; V₂ &gt; V₃</text>
                  </svg>

                  <!-- 7. CAPACITOR PLACAS PARALELAS -->
                  <svg *ngSwitchCase="'parallel-capacitor'" viewBox="0 0 460 185" class="phys-svg">
                    <rect x="130" y="30" width="22" height="125" rx="4" fill="#ff758f" stroke="#191538" stroke-width="2.5"/>
                    <rect x="308" y="30" width="22" height="125" rx="4" fill="#60a5fa" stroke="#191538" stroke-width="2.5"/>
                    <text x="141" y="22" text-anchor="middle" fill="#ff758f" font-weight="900" font-size="13">+Q (Área A)</text>
                    <text x="319" y="22" text-anchor="middle" fill="#60a5fa" font-weight="900" font-size="13">-Q</text>
                    <line x1="158" y1="55" x2="300" y2="55" stroke="#ffd166" stroke-width="2.5"/>
                    <line x1="158" y1="92" x2="300" y2="92" stroke="#ffd166" stroke-width="2.5"/>
                    <line x1="158" y1="130" x2="300" y2="130" stroke="#ffd166" stroke-width="2.5"/>
                    <text x="230" y="84" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="900">E = σ / ε₀ →</text>
                    <line x1="152" y1="168" x2="308" y2="168" stroke="#5ce1e6" stroke-width="2"/>
                    <text x="230" y="164" text-anchor="middle" fill="#5ce1e6" font-size="12" font-weight="800">separación d</text>
                  </svg>

                  <!-- 8. ESFÉRICO / CILÍNDRICO -->
                  <svg *ngSwitchCase="'spherical-capacitor'" viewBox="0 0 460 185" class="phys-svg">
                    <circle cx="230" cy="92" r="76" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" stroke-width="5"/>
                    <circle cx="230" cy="92" r="32" fill="#ff758f" stroke="#191538" stroke-width="3"/>
                    <text x="230" y="97" text-anchor="middle" fill="#191538" font-weight="900" font-size="13">+Q</text>
                    <line x1="230" y1="92" x2="262" y2="92" stroke="#ffd166" stroke-width="2"/>
                    <text x="246" y="84" text-anchor="middle" fill="#ffd166" font-size="11" font-weight="800">r_a</text>
                    <line x1="230" y1="92" x2="178" y2="38" stroke="#5ce1e6" stroke-width="2"/>
                    <text x="168" y="34" fill="#5ce1e6" font-size="12" font-weight="800">r_b (-Q)</text>
                    <text x="360" y="96" fill="#d7c6ff" font-size="12" font-weight="800">∫ E(r) dr</text>
                  </svg>

                  <!-- 9. DIELÉCTRICO -->
                  <svg *ngSwitchCase="'dielectric-capacitor'" viewBox="0 0 460 185" class="phys-svg">
                    <rect x="115" y="28" width="20" height="128" fill="#ff758f"/>
                    <rect x="325" y="28" width="20" height="128" fill="#60a5fa"/>
                    <rect x="145" y="34" width="170" height="116" rx="8" fill="rgba(167,139,250,0.22)" stroke="#a78bfa" stroke-width="2.5"/>
                    <text x="230" y="65" text-anchor="middle" fill="#d7c6ff" font-size="13" font-weight="900">Dieléctrico κ</text>
                    <text x="230" y="95" text-anchor="middle" fill="#ffd166" font-size="14" font-weight="900">E = E₀ / κ</text>
                    <text x="230" y="125" text-anchor="middle" fill="#38e595" font-size="13" font-weight="800">C = κ · C₀</text>
                  </svg>

                  <!-- 10. CORRIENTE Y ARRASTRE -->
                  <svg *ngSwitchCase="'drift-current'" viewBox="0 0 460 180" class="phys-svg">
                    <rect x="70" y="50" width="320" height="80" rx="16" fill="rgba(92,225,230,0.14)" stroke="#5ce1e6" stroke-width="2.5"/>
                    <ellipse cx="170" cy="90" rx="10" ry="38" fill="rgba(255,209,102,0.25)" stroke="#ffd166" stroke-width="2"/>
                    <ellipse cx="290" cy="90" rx="10" ry="38" fill="rgba(255,209,102,0.25)" stroke="#ffd166" stroke-width="2"/>
                    <text x="170" y="42" text-anchor="middle" fill="#ffd166" font-size="12" font-weight="800">Área A</text>
                    <line x1="170" y1="145" x2="290" y2="145" stroke="#38e595" stroke-width="2.5"/>
                    <text x="230" y="164" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">dx = v_d · dt</text>
                    <circle cx="210" cy="80" r="6" fill="#ff758f"/><circle cx="245" cy="102" r="6" fill="#ff758f"/>
                    <text x="230" y="70" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">v_d →</text>
                  </svg>

                  <!-- 11. OHM / JOULE -->
                  <svg *ngSwitchCase="'ohm-microscopic'" viewBox="0 0 460 180" class="phys-svg">
                    <rect x="95" y="55" width="270" height="70" rx="12" fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="3"/>
                    <text x="230" y="44" text-anchor="middle" fill="#5ce1e6" font-size="13" font-weight="800">Longitud L, Resistividad ρ, Sección A</text>
                    <text x="230" y="95" text-anchor="middle" fill="#ffd166" font-size="15" font-weight="900">E = ρ·J  ⇒  V = I·R</text>
                    <text x="230" y="152" text-anchor="middle" fill="#38e595" font-size="13" font-weight="800">R = ρ · L / A</text>
                  </svg>

                  <!-- 12. JOULE -->
                  <svg *ngSwitchCase="'joule-power'" viewBox="0 0 460 180" class="phys-svg">
                    <line x1="60" y1="90" x2="145" y2="90" stroke="#5ce1e6" stroke-width="3"/>
                    <polyline points="145,90 160,65 180,115 200,65 220,115 240,65 260,115 275,90" fill="none" stroke="#ffd166" stroke-width="4" stroke-linejoin="round"/>
                    <line x1="275" y1="90" x2="400" y2="90" stroke="#5ce1e6" stroke-width="3"/>
                    <text x="210" y="45" text-anchor="middle" fill="#ff758f" font-size="14" font-weight="900">Calor disipado: P = I²R = V·I</text>
                    <text x="100" y="76" fill="#38e595" font-size="13" font-weight="800">I →</text>
                  </svg>

                  <!-- 13. KIRCHHOFF -->
                  <svg *ngSwitchCase="'kirchhoff-resistors'" viewBox="0 0 460 180" class="phys-svg">
                    <rect x="40" y="30" width="175" height="120" rx="12" fill="rgba(255,255,255,0.04)" stroke="#5ce1e6" stroke-width="2"/>
                    <text x="128" y="55" text-anchor="middle" fill="#5ce1e6" font-weight="900" font-size="13">SERIE (misma I)</text>
                    <text x="128" y="95" text-anchor="middle" fill="#ffd166" font-weight="800" font-size="13">R_eq = R₁ + R₂</text>
                    <text x="128" y="125" text-anchor="middle" fill="#d7c6ff" font-size="11">V = V₁ + V₂</text>
                    <rect x="245" y="30" width="175" height="120" rx="12" fill="rgba(255,255,255,0.04)" stroke="#38e595" stroke-width="2"/>
                    <text x="332" y="55" text-anchor="middle" fill="#38e595" font-weight="900" font-size="13">PARALELO (misma V)</text>
                    <text x="332" y="95" text-anchor="middle" fill="#ffd166" font-weight="800" font-size="13">1/R_eq = 1/R₁ + 1/R₂</text>
                    <text x="332" y="125" text-anchor="middle" fill="#d7c6ff" font-size="11">I = I₁ + I₂</text>
                  </svg>

                  <!-- 14. RC CARGA -->
                  <svg *ngSwitchCase="'rc-charge'" viewBox="0 0 460 185" class="phys-svg">
                    <line x1="65" y1="150" x2="410" y2="150" stroke="#9b87f5" stroke-width="2"/>
                    <line x1="65" y1="25" x2="65" y2="150" stroke="#9b87f5" stroke-width="2"/>
                    <line x1="65" y1="45" x2="405" y2="45" stroke="#ffd166" stroke-width="1.5" stroke-dasharray="5,4"/>
                    <text x="385" y="38" text-anchor="end" fill="#ffd166" font-size="12" font-weight="800">Q_máx = C·ε</text>
                    <path d="M 65 150 Q 140 58 400 47" fill="none" stroke="#38e595" stroke-width="3.5"/>
                    <text x="235" y="102" fill="#38e595" font-size="13" font-weight="900">q(t) = Cε(1 - e^(-t/RC))</text>
                    <text x="235" y="170" text-anchor="middle" fill="#d7c6ff" font-size="12">tiempo t (en t = τ = RC llega al 63.2%)</text>
                  </svg>

                  <!-- 15. RC DESCARGA -->
                  <svg *ngSwitchCase="'rc-discharge'" viewBox="0 0 460 185" class="phys-svg">
                    <line x1="65" y1="150" x2="410" y2="150" stroke="#9b87f5" stroke-width="2"/>
                    <line x1="65" y1="25" x2="65" y2="150" stroke="#9b87f5" stroke-width="2"/>
                    <path d="M 65 40 Q 135 138 400 148" fill="none" stroke="#ff758f" stroke-width="3.5"/>
                    <text x="58" y="42" text-anchor="end" fill="#ffd166" font-size="12" font-weight="800">Q₀</text>
                    <text x="245" y="88" fill="#ff758f" font-size="13" font-weight="900">q(t) = Q₀ · e^(-t/RC)</text>
                    <text x="235" y="170" text-anchor="middle" fill="#d7c6ff" font-size="12">tiempo t (en t = τ = RC cae al 36.8%)</text>
                  </svg>

                  <!-- 16. CICLOTRÓN -->
                  <svg *ngSwitchCase="'cyclotron-radius'" viewBox="0 0 460 185" class="phys-svg">
                    <circle cx="230" cy="92" r="64" fill="none" stroke="#5ce1e6" stroke-width="3" stroke-dasharray="6,4"/>
                    <circle cx="230" cy="28" r="9" fill="#ff758f"/>
                    <line x1="230" y1="28" x2="295" y2="28" stroke="#38e595" stroke-width="3"/>
                    <text x="305" y="32" fill="#38e595" font-size="13" font-weight="800">v →</text>
                    <line x1="230" y1="28" x2="230" y2="78" stroke="#ffd166" stroke-width="3"/>
                    <text x="244" y="65" fill="#ffd166" font-size="13" font-weight="800">F_B = qvB</text>
                    <text x="115" y="96" fill="#d7c6ff" font-size="12" font-weight="800">B entrante (⊗)</text>
                    <text x="230" y="176" text-anchor="middle" fill="#ffd166" font-size="12" font-weight="800">r = m·v / (|q|·B)</text>
                  </svg>

                  <!-- 17. SELECTOR VELOCIDADES -->
                  <svg *ngSwitchCase="'velocity-selector'" viewBox="0 0 460 185" class="phys-svg">
                    <rect x="90" y="25" width="280" height="14" fill="#ff758f"/>
                    <rect x="90" y="145" width="280" height="14" fill="#60a5fa"/>
                    <line x1="60" y1="92" x2="400" y2="92" stroke="#38e595" stroke-width="2.5" stroke-dasharray="5,4"/>
                    <circle cx="230" cy="92" r="10" fill="#ffd166"/>
                    <line x1="230" y1="92" x2="230" y2="52" stroke="#5ce1e6" stroke-width="3"/>
                    <text x="242" y="58" fill="#5ce1e6" font-size="12" font-weight="800">F_B = qvB ↑</text>
                    <line x1="230" y1="92" x2="230" y2="132" stroke="#ff758f" stroke-width="3"/>
                    <text x="242" y="132" fill="#ff758f" font-size="12" font-weight="800">F_E = qE ↓</text>
                    <text x="350" y="84" fill="#38e595" font-size="13" font-weight="900">v = E / B</text>
                  </svg>

                  <!-- 18. TORQUE ESPIRA -->
                  <svg *ngSwitchCase="'wire-torque'" viewBox="0 0 460 185" class="phys-svg">
                    <rect x="150" y="42" width="160" height="100" fill="none" stroke="#ffd166" stroke-width="4" rx="4"/>
                    <line x1="230" y1="92" x2="230" y2="25" stroke="#5ce1e6" stroke-width="3"/>
                    <text x="240" y="34" fill="#5ce1e6" font-size="13" font-weight="800">μ = N·I·A</text>
                    <line x1="340" y1="92" x2="425" y2="92" stroke="#38e595" stroke-width="3"/>
                    <text x="380" y="80" fill="#38e595" font-size="13" font-weight="800">B →</text>
                    <text x="230" y="168" text-anchor="middle" fill="#d7c6ff" font-size="13" font-weight="800">τ = μ × B = N·I·A·B·sinθ</text>
                  </svg>

                  <!-- 19. BIOT-SAVART ALAMBRE -->
                  <svg *ngSwitchCase="'biot-savart-wire'" viewBox="0 0 460 185" class="phys-svg">
                    <line x1="120" y1="20" x2="120" y2="165" stroke="#ffd166" stroke-width="5"/>
                    <text x="102" y="45" fill="#ffd166" font-size="13" font-weight="900">I ↑</text>
                    <line x1="120" y1="92" x2="310" y2="92" stroke="#5ce1e6" stroke-width="2" stroke-dasharray="5,4"/>
                    <text x="215" y="84" text-anchor="middle" fill="#5ce1e6" font-size="12" font-weight="800">distancia r</text>
                    <line x1="120" y1="138" x2="310" y2="92" stroke="#38e595" stroke-width="2.5"/>
                    <text x="225" y="132" fill="#38e595" font-size="12" font-weight="800">R = √(y² + r²)</text>
                    <circle cx="310" cy="92" r="8" fill="#ff758f"/>
                    <text x="330" y="96" fill="#ff758f" font-size="13" font-weight="900">P: B = μ₀I / (2πr)</text>
                  </svg>

                  <!-- 20. BIOT-SAVART ESPIRA -->
                  <svg *ngSwitchCase="'biot-savart-loop'" viewBox="0 0 460 185" class="phys-svg">
                    <ellipse cx="145" cy="92" rx="28" ry="68" fill="none" stroke="#ffd166" stroke-width="4"/>
                    <line x1="145" y1="92" x2="370" y2="92" stroke="#9b87f5" stroke-width="2" stroke-dasharray="5,4"/>
                    <line x1="145" y1="24" x2="320" y2="92" stroke="#5ce1e6" stroke-width="2"/>
                    <text x="128" y="55" fill="#ffd166" font-size="12" font-weight="800">R</text>
                    <circle cx="320" cy="92" r="8" fill="#38e595"/>
                    <line x1="320" y1="92" x2="405" y2="92" stroke="#38e595" stroke-width="3.5"/>
                    <text x="360" y="80" text-anchor="middle" fill="#38e595" font-size="13" font-weight="900">B_x →</text>
                    <text x="235" y="172" text-anchor="middle" fill="#d7c6ff" font-size="12" font-weight="800">Las componentes dB_⊥ se cancelan por simetría</text>
                  </svg>

                  <!-- 21. SOLENOIDE AMPÈRE -->
                  <svg *ngSwitchCase="'ampere-solenoid'" viewBox="0 0 460 185" class="phys-svg">
                    <rect x="85" y="45" width="290" height="80" fill="rgba(92,225,230,0.08)" stroke="#ffd166" stroke-width="2.5"/>
                    <rect x="165" y="20" width="130" height="65" fill="none" stroke="#38e595" stroke-width="3" stroke-dasharray="6,4"/>
                    <text x="230" y="15" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">Lazo Amperiano (B_ext ≈ 0)</text>
                    <line x1="115" y1="85" x2="345" y2="85" stroke="#5ce1e6" stroke-width="3"/>
                    <text x="230" y="108" text-anchor="middle" fill="#5ce1e6" font-size="13" font-weight="900">B = μ₀·n·I →</text>
                  </svg>

                  <!-- 22. FARADAY INTEGRAL / MOVIMIENTO -->
                  <svg *ngSwitchCase="'faraday-integral'" viewBox="0 0 460 185" class="phys-svg">
                    <circle cx="230" cy="92" r="65" fill="rgba(255,209,102,0.12)" stroke="#ffd166" stroke-width="3.5"/>
                    <text x="230" y="88" text-anchor="middle" fill="#5ce1e6" font-size="15" font-weight="900">⊗ B(t) variable</text>
                    <text x="230" y="112" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="800">∮ E·dl = -dΦ_B/dt</text>
                  </svg>

                  <svg *ngSwitchCase="'motional-emf'" viewBox="0 0 460 185" class="phys-svg">
                    <polyline points="350,40 100,40 100,145 350,145" fill="none" stroke="#5ce1e6" stroke-width="3.5"/>
                    <line x1="255" y1="34" x2="255" y2="152" stroke="#ffd166" stroke-width="6"/>
                    <line x1="255" y1="92" x2="330" y2="92" stroke="#38e595" stroke-width="3"/>
                    <text x="340" y="96" fill="#38e595" font-size="13" font-weight="900">v →</text>
                    <text x="72" y="96" fill="#ff758f" font-size="13" font-weight="900">R</text>
                    <text x="230" y="172" text-anchor="middle" fill="#ffd166" font-size="13" font-weight="800">|ε| = B·L·v   |   P_mec = P_eléctrica</text>
                  </svg>

                  <!-- 23. INDUCTANCIA / ENERGÍA / MAXWELL -->
                  <svg *ngSwitchDefault viewBox="0 0 460 185" class="phys-svg">
                    <rect x="90" y="45" width="280" height="90" rx="14" fill="rgba(167,139,250,0.16)" stroke="#ffd166" stroke-width="3"/>
                    <text x="230" y="84" text-anchor="middle" fill="#5ce1e6" font-size="14" font-weight="900">{{ d.title }}</text>
                    <text x="230" y="112" text-anchor="middle" fill="#38e595" font-size="12" font-weight="800">{{ d.diagramCaption }}</text>
                  </svg>

                </ng-container>
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
    .phys-svg {
      width: 100%;
      max-height: 220px;
      display: block;
      margin: 0 auto;
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
