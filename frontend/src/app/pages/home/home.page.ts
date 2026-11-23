import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonMenuButton,
  IonContent,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, ProgramUnitDto, StudentErrorDto } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonMenuButton,
    IonContent,
    CieloIllustrationComponent,
  ],
  template: `
    <ion-content [fullscreen]="true" class="cielo-home-content">
      <div class="cielo-stage">

        <!-- ================================================================
             BARRA DE ESTRELLAS, ACCESOS RÁPIDOS, CAMPANA Y AVATAR ILUSTRADO
             ================================================================ -->
        <div class="top-cosmic-bar">
          <div class="cosmic-left">
            <ion-menu-button class="menu-trigger"></ion-menu-button>
            <svg viewBox="0 0 120 28" class="sparkles-Cluster">
              <text x="4" y="21" fill="#d7c6ff" font-size="18" font-weight="900">✦</text>
              <circle cx="34" cy="10" r="2.5" fill="#ffffff" />
              <text x="54" y="22" fill="#a78bfa" font-size="15" font-weight="900">✧</text>
              <text x="86" y="19" fill="#ffd166" font-size="14" font-weight="900">⋆</text>
            </svg>
          </div>

          <div class="cosmic-right">
            <button class="quick-chip" routerLink="/pdfs">📂 Biblioteca 45 PDFs</button>
            <button class="quick-chip" routerLink="/mapa">🗺️ Mapa Conceptual</button>
            <button class="quick-chip" routerLink="/podcasts">🔊 Podcasts 3m</button>
            <button class="quick-chip danger" (click)="showResetConfirm = true">🔄 Reiniciar 0%</button>

            <!-- Campana Ilustrada -->
            <div class="bell-btn" routerLink="/errors" title="Mis Errores y Alertas">
              <svg viewBox="0 0 36 36" class="bell-svg">
                <path d="M 18 5 C 12 5, 9 10, 9 17 L 6 24 L 30 24 L 27 17 C 27 10, 24 5, 18 5 Z"
                      fill="#d7c6ff" stroke="#1b1438" stroke-width="2.5" stroke-linejoin="round" />
                <circle cx="18" cy="27" r="3.5" fill="#ffd166" stroke="#1b1438" stroke-width="2" />
              </svg>
              <span class="bell-badge">{{ activeErrors.length || '!' }}</span>
            </div>

            <!-- Avatar Cartoon de Cielo -->
            <div class="cielo-profile-btn" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
              <div class="cielo-avatar-frame">
                <svg viewBox="0 0 54 54" class="cielo-face-svg">
                  <circle cx="27" cy="27" r="25" fill="#d7c6ff" stroke="#1b1438" stroke-width="2.5" />
                  <!-- Pelo largo castaño cartoon -->
                  <path d="M 11 28 C 11 10, 43 10, 43 28 L 45 44 C 39 42, 37 33, 37 26 L 17 26 C 17 33, 15 42, 9 44 Z"
                        fill="#6b3e26" stroke="#1b1438" stroke-width="2.2" />
                  <!-- Cara -->
                  <circle cx="27" cy="27" r="11" fill="#ffe0bd" stroke="#1b1438" stroke-width="2.2" />
                  <!-- Mejillas rosadas -->
                  <circle cx="20" cy="29" r="2.2" fill="#ff8fab" opacity="0.7" />
                  <circle cx="34" cy="29" r="2.2" fill="#ff8fab" opacity="0.7" />
                  <!-- Ojos y sonrisa -->
                  <circle cx="23" cy="26" r="1.8" fill="#1b1438" />
                  <circle cx="31" cy="26" r="1.8" fill="#1b1438" />
                  <path d="M 23 31 Q 27 34.5 31 31" fill="none" stroke="#1b1438" stroke-width="2" stroke-linecap="round" />
                  <!-- Suéter lila -->
                  <path d="M 14 49 C 17 39, 37 39, 40 49 Z" fill="#8c6df7" stroke="#1b1438" stroke-width="2.2" />
                </svg>
              </div>
              <span class="profile-caret">⌄</span>
            </div>
          </div>
        </div>

        <!-- MODAL DE REINICIO A 0% -->
        <div class="reset-overlay" *ngIf="showResetConfirm">
          <div class="reset-modal cielo-lavender-card">
            <h3>⚠️ ¿Reiniciar Progreso a 0%?</h3>
            <p>
              Esta acción pondrá en <strong>0%</strong> las 4 etapas de todas las unidades para comenzar desde cero. Tu registro de <em>Mis Errores</em> se mantiene intacto.
            </p>
            <div class="rm-actions">
              <button class="rm-cancel" (click)="showResetConfirm = false">Cancelar</button>
              <button class="rm-confirm" (click)="executeResetProgress()">Sí, Reiniciar a 0%</button>
            </div>
          </div>
        </div>

        <!-- ================================================================
             SECCIÓN 1: BANNER ILUSTRADO "¡HOLA CIELO! ♡" + TU PROGRESO GENERAL
             ================================================================ -->
        <div class="hero-and-progress-row">

          <!-- GRAN BANNER LAVANDA ILUSTRADO -->
          <div class="hola-cielo-illustrated-banner">
            <!-- Marcas de cinta adhesiva decorativa en las esquinas como en la ilustración -->
            <div class="corner-tape top-left"></div>
            <div class="corner-tape bottom-right"></div>

            <!-- Fórmula E=mc² y estrellitas dibujadas -->
            <div class="emc2-handwritten">E = mc²</div>
            <span class="hand-star hs-1">✦</span>
            <span class="hand-star hs-2">✦</span>
            <span class="hand-star hs-3">✧</span>
            <span class="hand-star hs-4">✦</span>

            <!-- ILUSTRACIÓN IZQUIERDA GRANDE: ÁTOMO CARTOON PROTAGONISTA -->
            <div class="hero-left-illustration">
              <svg viewBox="0 0 185 165" class="giant-atom-svg">
                <g transform="translate(92, 82)">
                  <!-- Sombra suave -->
                  <ellipse cx="4" cy="64" rx="54" ry="8" fill="rgba(27, 20, 56, 0.14)" />
                  <!-- 3 Órbitas gruesas con contorno cartoon -->
                  <ellipse rx="74" ry="26" fill="none" stroke="#1b1438" stroke-width="6" transform="rotate(-26)" />
                  <ellipse rx="74" ry="26" fill="none" stroke="#8c6df7" stroke-width="2.5" transform="rotate(-26)" />

                  <ellipse rx="74" ry="26" fill="none" stroke="#1b1438" stroke-width="6" transform="rotate(28)" />
                  <ellipse rx="74" ry="26" fill="none" stroke="#b79eff" stroke-width="2.5" transform="rotate(28)" />

                  <ellipse rx="74" ry="26" fill="none" stroke="#1b1438" stroke-width="6" transform="rotate(86)" />
                  <ellipse rx="74" ry="26" fill="none" stroke="#e07a9b" stroke-width="2.5" transform="rotate(86)" />

                  <!-- Núcleo central grande con brillo -->
                  <circle r="19" fill="#e56b92" stroke="#1b1438" stroke-width="4.5" />
                  <circle cx="-5" cy="-5" r="5.5" fill="#ffd6e4" />

                  <!-- Electrones orbitando -->
                  <circle cx="-58" cy="-26" r="8.5" fill="#b79eff" stroke="#1b1438" stroke-width="3.5" />
                  <circle cx="62" cy="-22" r="8" fill="#ff8fab" stroke="#1b1438" stroke-width="3.5" />
                  <circle cx="12" cy="66" r="8.5" fill="#a78bfa" stroke="#1b1438" stroke-width="3.5" />
                  <circle cx="-46" cy="36" r="6.5" fill="#ffd166" stroke="#1b1438" stroke-width="3" />
                </g>
              </svg>
            </div>

            <!-- TEXTO CENTRAL PROTAGONISTA -->
            <div class="hero-center-block">
              <h1 class="cielo-main-heading">
                ¡Hola Cielo! <span class="drawn-heart">♡</span>
              </h1>
              <p class="cielo-sub-heading">¿Lista para dominar Física 2?</p>

              <div class="cielo-motto-ribbon" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
                <span>Aprendé, practicá y alcanzá tu mejor versión ♡</span>
              </div>
            </div>

            <!-- ILUSTRACIÓN DERECHA GRANDE: BOMBILLA ENCENDIDA + IMÁN DE HERRADURA -->
            <div class="hero-right-illustration">
              <svg viewBox="0 0 195 165" class="giant-bulb-magnet-svg">
                <!-- BOMBILLA GRANDE ENCENDIDA -->
                <g transform="translate(8, 6)">
                  <!-- Rayos de luz -->
                  <line x1="56" y1="10" x2="56" y2="0" stroke="#1b1438" stroke-width="3.8" stroke-linecap="round" />
                  <line x1="22" y1="22" x2="12" y2="14" stroke="#1b1438" stroke-width="3.8" stroke-linecap="round" />
                  <line x1="90" y1="22" x2="100" y2="14" stroke="#1b1438" stroke-width="3.8" stroke-linecap="round" />
                  <line x1="10" y1="54" x2="0" y2="54" stroke="#1b1438" stroke-width="3.8" stroke-linecap="round" />
                  <!-- Cristal amarillo -->
                  <path d="M 24 56 C 24 22, 88 22, 88 56 C 88 74, 72 82, 70 98 L 42 98 C 40 82, 24 74, 24 56 Z"
                        fill="#ffd166" stroke="#1b1438" stroke-width="4.5" stroke-linejoin="round" />
                  <!-- Brillo blanco -->
                  <path d="M 35 44 C 37 33, 48 30, 56 30" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
                  <!-- Filamento con rulo -->
                  <path d="M 49 96 L 49 66 C 42 52, 70 52, 63 66 L 63 96" fill="none" stroke="#1b1438" stroke-width="3.2" />
                  <!-- Casquillo metálico -->
                  <rect x="40" y="98" width="32" height="20" rx="6" fill="#94a3b8" stroke="#1b1438" stroke-width="4" />
                  <line x1="40" y1="106" x2="72" y2="106" stroke="#1b1438" stroke-width="3.2" />
                  <path d="M 48 118 C 51 127, 61 127, 64 118 Z" fill="#1b1438" />
                </g>

                <!-- IMÁN DE HERRADURA GRANDE INCLINADO -->
                <g transform="translate(136, 102) rotate(24)">
                  <path d="M -28 32 L -28 -10 C -28 -38, 28 -38, 28 -10 L 28 32 L 10 32 L 10 -8 C 10 -18, -10 -18, -10 -8 L -10 32 Z"
                        fill="#ff4d6d" stroke="#1b1438" stroke-width="4.5" stroke-linejoin="round" />
                  <rect x="-28" y="16" width="18" height="16" rx="2" fill="#e2e8f0" stroke="#1b1438" stroke-width="3.8" />
                  <rect x="10" y="16" width="18" height="16" rx="2" fill="#e2e8f0" stroke="#1b1438" stroke-width="3.8" />
                </g>
              </svg>
            </div>
          </div>

          <!-- TARJETA DERECHA: TU PROGRESO GENERAL -->
          <div class="progress-summary-card cielo-dark-panel">
            <div class="psc-header">
              <svg viewBox="0 0 28 28" class="psc-bars-svg">
                <rect x="3" y="15" width="5" height="10" rx="1.5" fill="#38e595" />
                <rect x="11" y="9" width="5" height="16" rx="1.5" fill="#5ce1e6" />
                <rect x="19" y="4" width="5" height="21" rx="1.5" fill="#ffd166" />
              </svg>
              <h2>Tu Progreso General</h2>
            </div>

            <div class="psc-center-row">
              <!-- Medidor Circular Ilustrado -->
              <div class="psc-ring-box">
                <svg viewBox="0 0 136 136" class="psc-ring-svg">
                  <defs>
                    <linearGradient id="cieloDonutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#d7c6ff" />
                      <stop offset="50%" stop-color="#9d7eff" />
                      <stop offset="100%" stop-color="#6c4ce6" />
                    </linearGradient>
                  </defs>
                  <circle cx="68" cy="68" r="52" fill="none" stroke="rgba(157, 126, 255, 0.2)" stroke-width="15" />
                  <circle
                    cx="68"
                    cy="68"
                    r="52"
                    fill="none"
                    stroke="url(#cieloDonutGrad)"
                    stroke-width="15"
                    stroke-linecap="round"
                    [attr.stroke-dasharray]="donutCircumference"
                    [attr.stroke-dashoffset]="donutDashOffset"
                    transform="rotate(-90 68 68)"
                  />
                  <text x="68" y="76" text-anchor="middle" class="psc-pct-number">{{ globalMastery }}%</text>
                </svg>
              </div>

              <!-- Lista de Unidades con Iconos Vectoriales -->
              <div class="psc-unit-list">
                <div
                  *ngFor="let u of units.slice(0, 5)"
                  class="psc-unit-item"
                  (click)="goToUnit(u.unitNumber, 'teoria')"
                >
                  <!-- Icono estado -->
                  <span class="status-dot green" *ngIf="getUnitPct(u) >= 80 || u.unitNumber === 1">✓</span>
                  <span class="status-dot purple" *ngIf="getUnitPct(u) < 80 && u.unitNumber === 2">●</span>
                  <span class="status-dot lock" *ngIf="getUnitPct(u) === 0 && u.unitNumber > 2">🔒</span>
                  <span class="psc-u-txt" [class.bright]="u.unitNumber <= 2 || getUnitPct(u) > 0">
                    Unidad {{ u.unitNumber }}
                  </span>
                </div>
              </div>
            </div>

            <button class="vamos-por-mas-pill" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
              <span>¡Vamos por más!</span>
              <span class="gold-star">★</span>
            </button>
          </div>

        </div>

        <!-- ================================================================
             SECCIÓN 2: 📖 UNIDADES DEL PROGRAMA (CON ILUSTRACIONES GRANDES PROTAGONISTAS)
             ================================================================ -->
        <div class="program-section">
          <div class="program-top-bar">
            <div class="section-banner-wrap">
              <div class="cielo-section-pill">
                <svg viewBox="0 0 36 30" class="pill-book-svg">
                  <path d="M 3 6 Q 10 3 18 7 Q 26 3 33 6 L 33 25 Q 26 22 18 26 Q 10 22 3 25 Z"
                        fill="#fffbeb" stroke="#1b1438" stroke-width="2.5" />
                  <line x1="18" y1="7" x2="18" y2="26" stroke="#1b1438" stroke-width="2.5" />
                </svg>
                <span>Unidades del Programa</span>
              </div>
              <!-- Rayitos decorativos dibujados a la derecha de la píldora -->
              <svg viewBox="0 0 32 32" class="burst-lines-svg">
                <line x1="4" y1="12" x2="16" y2="4" stroke="#e2d6ff" stroke-width="2.8" stroke-linecap="round" />
                <line x1="8" y1="18" x2="24" y2="16" stroke="#ffd166" stroke-width="2.8" stroke-linecap="round" />
                <line x1="6" y1="25" x2="18" y2="28" stroke="#e2d6ff" stroke-width="2.8" stroke-linecap="round" />
              </svg>
            </div>

            <div class="parcial-pills-group">
              <button class="p-switch-btn" [class.active]="parcialView === '1er'" (click)="parcialView = '1er'">
                Unidades 1 a 5 (1° Parcial)
              </button>
              <button class="p-switch-btn" [class.active]="parcialView === '2do'" (click)="parcialView = '2do'">
                Unidades 6 a 9 (2° Parcial)
              </button>
              <button class="p-switch-btn" [class.active]="parcialView === 'all'" (click)="parcialView = 'all'">
                Todas las 9 Unidades
              </button>
            </div>
          </div>

          <!-- GRILLA DE TARJETAS DE UNIDADES CON ILUSTRACIONES GRANDES -->
          <div class="illustrated-units-row">
            <div
              *ngFor="let u of displayedProgramUnits"
              class="unit-showcase-card"
              [class.is-featured]="isUnitFeatured(u)"
              (click)="selectAndOpenUnit(u.unitNumber)"
            >
              <!-- Cabecera de la tarjeta -->
              <div class="usc-header">
                <span class="usc-unit-pill">Unidad {{ u.unitNumber }}</span>
                <span class="usc-corner-lock" *ngIf="!isUnitFeatured(u) && getUnitPct(u) === 0">🔒</span>
              </div>

              <h3 class="usc-title">{{ getShortIllustratedTitle(u.unitNumber) }}</h3>

              <!-- Cuerpo con Checklist a la izquierda e Ilustración Gigante a la derecha -->
              <div class="usc-body">
                <div class="usc-stages-list">
                  <div class="usc-stage-row" (click)="goToUnit(u.unitNumber, 'teoria'); $event.stopPropagation()">
                    <span class="st-bullet" [class.done]="u.progressTeoria >= 50 || isUnitFeatured(u)">
                      {{ (u.progressTeoria >= 50 || isUnitFeatured(u)) ? '✓' : '🔒' }}
                    </span>
                    <span>Teoría visual</span>
                  </div>
                  <div class="usc-stage-row" (click)="goToUnit(u.unitNumber, 'graficos'); $event.stopPropagation()">
                    <span class="st-bullet" [class.done]="u.progressLaboratorio >= 50 || isUnitFeatured(u)">
                      {{ (u.progressLaboratorio >= 50 || isUnitFeatured(u)) ? '✓' : '🔒' }}
                    </span>
                    <span>Laboratorio gráfico</span>
                  </div>
                  <div class="usc-stage-row" (click)="goToUnit(u.unitNumber, 'practica'); $event.stopPropagation()">
                    <span class="st-bullet" [class.done]="u.progressPractico >= 50 || isUnitFeatured(u)">
                      {{ (u.progressPractico >= 50 || isUnitFeatured(u)) ? '✓' : '🔒' }}
                    </span>
                    <span>Práctico guiado</span>
                  </div>
                  <div class="usc-stage-row" (click)="goToUnit(u.unitNumber, 'mcq'); $event.stopPropagation()">
                    <span class="st-bullet" [class.done]="u.progressPruebaDominio >= 50" [class.open-circle]="isUnitFeatured(u) && u.progressPruebaDominio < 50">
                      {{ u.progressPruebaDominio >= 50 ? '✓' : isUnitFeatured(u) ? '○' : '🔒' }}
                    </span>
                    <span>Prueba de dominio</span>
                  </div>
                </div>

                <!-- ILUSTRACIÓN GRANDE PROTAGONISTA (105x115px) -->
                <div class="usc-art-stage">
                  <app-cielo-art
                    [name]="getIllustrationType(u.unitNumber)"
                    [width]="104"
                    [height]="112"
                  ></app-cielo-art>
                </div>
              </div>

              <!-- Pie de la tarjeta: Barra de progreso o Estado -->
              <div class="usc-footer">
                <ng-container *ngIf="isUnitFeatured(u) || getUnitPct(u) > 0; else lockedCardFooter">
                  <div class="usc-bar-outer">
                    <div class="usc-bar-inner" [style.width.%]="getUnitPct(u) > 0 ? getUnitPct(u) : 100"></div>
                  </div>
                  <span class="usc-pct-badge">{{ getUnitPct(u) > 0 ? getUnitPct(u) : 100 }}%</span>
                </ng-container>
                <ng-template #lockedCardFooter>
                  <div class="usc-locked-bar">
                    <span>🔒 Bloqueada (Click para explorar)</span>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             SECCIÓN 3: LAS 3 COLUMNAS INFERIORES CON ILUSTRACIONES PROTAGONISTAS
             ================================================================ -->
        <div class="bottom-showcase-grid">

          <!-- COLUMNA 1: ⭐ HERRAMIENTAS DE ESTUDIO (6 TARJETAS CON ILUSTRACIONES GRANDES) -->
          <div class="cielo-dark-panel bottom-box">
            <div class="box-header-line">
              <span class="gold-star-big">★</span>
              <h2>Herramientas de Estudio</h2>
              <svg viewBox="0 0 28 24" class="mini-burst">
                <line x1="4" y1="10" x2="14" y2="3" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" />
                <line x1="8" y1="16" x2="22" y2="12" stroke="#d7c6ff" stroke-width="2.5" stroke-linecap="round" />
              </svg>
            </div>

            <div class="tools-illustrated-6grid">
              <div class="tool-big-card" (click)="goToUnit(featuredUnitNumber, 'teoria')">
                <app-cielo-art name="tool-book" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Teoría<br>Interactiva</div>
              </div>

              <div class="tool-big-card" (click)="goToUnit(featuredUnitNumber, 'graficos')">
                <app-cielo-art name="tool-lab" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Laboratorio<br>Virtual</div>
              </div>

              <div class="tool-big-card" routerLink="/machete">
                <app-cielo-art name="tool-chalkboard" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Traductor<br>de Fórmulas</div>
              </div>

              <div class="tool-big-card" routerLink="/speed-drill">
                <app-cielo-art name="tool-flashcards" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Flashcards</div>
              </div>

              <div class="tool-big-card" (click)="goToUnit(featuredUnitNumber, 'teoria')">
                <app-cielo-art name="tool-board-play" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Resolución<br>en Pizarrón</div>
              </div>

              <div class="tool-big-card" routerLink="/tribunal">
                <app-cielo-art name="tool-oral" [width]="88" [height]="72"></app-cielo-art>
                <div class="tbc-label">Entrenamiento<br>Oral</div>
              </div>
            </div>
          </div>

          <!-- COLUMNA 2: 🏆 DESAFÍOS Y EVALUACIONES (CON ILUSTRACIONES GRANDES) -->
          <div class="cielo-dark-panel bottom-box">
            <div class="box-header-line">
              <span class="trophy-ico">🏆</span>
              <h2>Desafíos y Evaluaciones</h2>
              <svg viewBox="0 0 28 24" class="mini-burst">
                <line x1="4" y1="10" x2="14" y2="3" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" />
                <line x1="8" y1="16" x2="22" y2="12" stroke="#d7c6ff" stroke-width="2.5" stroke-linecap="round" />
              </svg>
            </div>

            <div class="challenges-illustrated-stack">
              <div class="challenge-pill-card" (click)="goToUnit(featuredUnitNumber, 'mcq')">
                <app-cielo-art name="challenge-clipboard" [width]="58" [height]="58"></app-cielo-art>
                <div class="cpc-copy">
                  <div class="cpc-title">Simulacro de Examen</div>
                  <div class="cpc-sub">Pon a prueba tus conocimientos</div>
                </div>
                <div class="cpc-chevron">›</div>
              </div>

              <div class="challenge-pill-card" (click)="goToUnit(featuredUnitNumber, 'practica')">
                <app-cielo-art name="challenge-target" [width]="58" [height]="58"></app-cielo-art>
                <div class="cpc-copy">
                  <div class="cpc-title">Ejercicios por Tema</div>
                  <div class="cpc-sub">Resolvé y aprendé paso a paso</div>
                </div>
                <div class="cpc-chevron">›</div>
              </div>

              <div class="challenge-pill-card" routerLink="/limits">
                <app-cielo-art name="challenge-brain" [width]="58" [height]="58"></app-cielo-art>
                <div class="cpc-copy">
                  <div class="cpc-title">Repaso Inteligente</div>
                  <div class="cpc-sub">Repasá solo lo que necesitás</div>
                </div>
                <div class="cpc-chevron">›</div>
              </div>
            </div>

            <div class="fun-footer-banner">
              <span class="gold-star">★</span>
              <span>Aprender también puede ser divertido ♡</span>
            </div>
          </div>

          <!-- COLUMNA 3: SIMULACIONES INTERACTIVAS + TU PRÓXIMO OBJETIVO -->
          <div class="right-column-stack">

            <!-- SIMULACIONES INTERACTIVAS -->
            <div class="cielo-dark-panel sim-card">
              <div class="sim-header">
                <div class="sh-left">
                  <app-cielo-art name="tool-lab" [width]="34" [height]="30"></app-cielo-art>
                  <h3>Simulaciones Interactivas</h3>
                </div>
                <button class="ver-todas-btn" (click)="goToUnit(featuredUnitNumber, 'graficos')">
                  Ver todas →
                </button>
              </div>

              <div class="sim-visual-row" (click)="goToUnit(featuredUnitNumber, 'graficos')">
                <!-- Visualización grande de Campo Dipolar (+ y -) -->
                <div class="dipole-stage">
                  <svg viewBox="0 0 240 124" class="dipole-field-svg">
                    <g fill="none" stroke="rgba(235, 228, 255, 0.85)" stroke-width="1.8">
                      <path d="M 70 62 L 170 62" />
                      <path d="M 68 54 Q 120 26 172 54" />
                      <path d="M 68 70 Q 120 98 172 70" />
                      <path d="M 64 47 Q 120 2 176 47" />
                      <path d="M 64 77 Q 120 122 176 77" />
                      <path d="M 58 42 Q 120 -22 182 42" />
                      <path d="M 58 82 Q 120 146 182 82" />
                      <!-- Rayos exteriores -->
                      <path d="M 48 48 Q 22 22 4 12" />
                      <path d="M 44 62 L 4 62" />
                      <path d="M 48 76 Q 22 102 4 112" />
                      <path d="M 192 48 Q 218 22 236 12" />
                      <path d="M 196 62 L 236 62" />
                      <path d="M 192 76 Q 218 102 236 112" />
                    </g>
                    <!-- Carga + Roja -->
                    <circle cx="58" cy="62" r="14" fill="#ff4d6d" stroke="#1b1438" stroke-width="3" />
                    <text x="58" y="67" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="16">+</text>
                    <!-- Carga - Azul -->
                    <circle cx="182" cy="62" r="14" fill="#38bdf8" stroke="#1b1438" stroke-width="3" />
                    <text x="182" y="67" text-anchor="middle" fill="#1b1438" font-weight="900" font-size="18">-</text>
                  </svg>
                </div>

                <div class="sim-speech-card">
                  Experimentá y visualizá los fenómenos físicos ♡
                </div>
              </div>
            </div>

            <!-- TU PRÓXIMO OBJETIVO -->
            <div class="cielo-dark-panel goal-card">
              <div class="goal-header">
                <span class="flag-ico">🚩</span>
                <h3>Tu Próximo Objetivo</h3>
                <svg viewBox="0 0 28 24" class="mini-burst">
                  <line x1="4" y1="10" x2="14" y2="3" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="8" y1="16" x2="22" y2="12" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" />
                </svg>
              </div>

              <div class="goal-content-row">
                <div class="goal-atom-tile">
                  <svg viewBox="0 0 56 56" class="goal-atom-svg">
                    <ellipse cx="28" cy="28" rx="23" ry="8" fill="none" stroke="#d7c6ff" stroke-width="2.2" transform="rotate(30 28 28)" />
                    <ellipse cx="28" cy="28" rx="23" ry="8" fill="none" stroke="#d7c6ff" stroke-width="2.2" transform="rotate(-30 28 28)" />
                    <ellipse cx="28" cy="28" rx="23" ry="8" fill="none" stroke="#d7c6ff" stroke-width="2.2" transform="rotate(90 28 28)" />
                    <circle cx="28" cy="28" r="4.5" fill="#ffd166" />
                  </svg>
                </div>

                <p class="goal-text">
                  Completar <strong>Unidad {{ nextRecommendedUnit.unitNumber }}</strong> al 100% sin errores para desbloquear la siguiente unidad.
                </p>

                <button class="goal-continue-pill" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
                  Continuar →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .cielo-home-content {
      --background: #0f132e;
    }
    .cielo-stage {
      max-width: 1420px;
      margin: 0 auto;
      padding: 12px 22px 36px 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* BARRA SUPERIOR */
    .top-cosmic-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .cosmic-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .menu-trigger { color: #d7c6ff; }
    .sparkles-Cluster { width: 110px; height: 26px; }
    .cosmic-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .quick-chip {
      background: rgba(27, 34, 75, 0.92);
      border: 2px solid rgba(186, 164, 255, 0.35);
      color: #ebe4ff;
      padding: 6px 14px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-chip:hover {
      background: #8c6df7;
      color: #ffffff;
      border-color: #ffffff;
    }
    .quick-chip.danger {
      border-color: rgba(255, 93, 115, 0.45);
      color: #ffc2cb;
    }
    .bell-btn {
      position: relative;
      width: 42px;
      height: 42px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bell-svg { width: 34px; height: 34px; }
    .bell-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #ff4d6d;
      color: #ffffff;
      font-size: 0.68rem;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0f132e;
    }
    .cielo-profile-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .cielo-avatar-frame {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 14px rgba(183, 158, 255, 0.5);
    }
    .cielo-face-svg { width: 100%; height: 100%; display: block; }
    .profile-caret { color: #d7c6ff; font-size: 1.1rem; font-weight: 800; }

    /* MODAL REINICIO */
    .reset-overlay {
      position: fixed;
      inset: 0;
      background: rgba(8, 10, 26, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .reset-modal {
      max-width: 460px;
      padding: 24px;
    }
    .reset-modal h3 { margin: 0 0 10px 0; font-size: 1.4rem; color: #191538; }
    .reset-modal p { font-size: 0.92rem; color: #2d2654; line-height: 1.5; }
    .rm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
    .rm-cancel {
      background: #ffffff;
      border: 2px solid #191538;
      color: #191538;
      padding: 8px 16px;
      border-radius: 14px;
      font-weight: 800;
      cursor: pointer;
    }
    .rm-confirm {
      background: #ff4d6d;
      border: 2px solid #191538;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 14px;
      font-weight: 800;
      cursor: pointer;
    }

    /* ========================================================================
       SECCIÓN 1: BANNER ILUSTRADO "¡HOLA CIELO! ♡" + TU PROGRESO GENERAL
       ======================================================================== */
    .hero-and-progress-row {
      display: grid;
      grid-template-columns: 1fr 330px;
      gap: 20px;
      align-items: stretch;
    }
    @media (max-width: 1080px) {
      .hero-and-progress-row { grid-template-columns: 1fr; }
    }

    .hola-cielo-illustrated-banner {
      position: relative;
      background: linear-gradient(135deg, #e5dcff 0%, #d2c0ff 50%, #ede6ff 100%);
      border: 3.5px solid #9d7eff;
      border-radius: 36px;
      padding: 18px 26px;
      display: grid;
      grid-template-columns: 185px 1fr 195px;
      align-items: center;
      gap: 10px;
      box-shadow:
        0 18px 40px -8px rgba(5, 7, 22, 0.78),
        0 0 32px -4px rgba(157, 126, 255, 0.5),
        inset 0 3px 0 rgba(255, 255, 255, 0.9);
      overflow: hidden;
    }
    @media (max-width: 820px) {
      .hola-cielo-illustrated-banner {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
      }
    }
    .corner-tape {
      position: absolute;
      width: 64px;
      height: 22px;
      background: rgba(255, 255, 255, 0.45);
      border: 1.5px solid rgba(157, 126, 255, 0.4);
      pointer-events: none;
    }
    .corner-tape.top-left {
      top: 8px;
      left: -14px;
      transform: rotate(-28deg);
    }
    .corner-tape.bottom-right {
      bottom: 8px;
      right: -14px;
      transform: rotate(-28deg);
    }
    .emc2-handwritten {
      position: absolute;
      top: 14px;
      right: 175px;
      font-family: 'Caveat', cursive;
      font-size: 1.85rem;
      font-weight: 700;
      color: #1b1438;
      transform: rotate(-8deg);
      pointer-events: none;
    }
    .hand-star {
      position: absolute;
      color: #1b1438;
      font-weight: 900;
      pointer-events: none;
    }
    .hs-1 { top: 18px; left: 190px; font-size: 1.25rem; }
    .hs-2 { bottom: 20px; left: 165px; font-size: 1rem; }
    .hs-3 { top: 28px; left: 260px; font-size: 0.9rem; color: #7c5dfa; }
    .hs-4 { bottom: 16px; right: 190px; font-size: 1.3rem; }

    .giant-atom-svg {
      width: 185px;
      height: 155px;
      display: block;
    }
    .giant-bulb-magnet-svg {
      width: 195px;
      height: 155px;
      display: block;
    }
    .hero-center-block {
      text-align: center;
      z-index: 2;
    }
    .cielo-main-heading {
      font-family: 'Baloo 2', sans-serif;
      font-size: 3.1rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .drawn-heart {
      color: #7c5dfa;
      font-size: 2.8rem;
    }
    .cielo-sub-heading {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.55rem;
      font-weight: 700;
      color: #241d4d;
      margin: 4px 0 14px 0;
    }
    .cielo-motto-ribbon {
      display: inline-block;
      background: linear-gradient(90deg, #9b7bf7 0%, #7c5dfa 100%);
      border: 2.5px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.04rem;
      font-weight: 800;
      padding: 6px 24px;
      border-radius: 99px;
      box-shadow: 0 5px 0 #1b1438, 0 10px 20px rgba(124, 93, 250, 0.45);
      cursor: pointer;
      transition: transform 0.18s;
    }
    .cielo-motto-ribbon:hover {
      transform: translateY(-2px) scale(1.02);
    }

    /* TARJETA TU PROGRESO GENERAL */
    .progress-summary-card {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .psc-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .psc-bars-svg { width: 26px; height: 26px; }
    .psc-header h2 {
      font-size: 1.22rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
    }
    .psc-center-row {
      display: grid;
      grid-template-columns: 128px 1fr;
      align-items: center;
      gap: 14px;
      margin: 8px 0;
    }
    .psc-ring-svg {
      width: 128px;
      height: 128px;
      display: block;
    }
    .psc-pct-number {
      fill: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 28px;
      font-weight: 800;
    }
    .psc-unit-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .psc-unit-item {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      font-size: 0.9rem;
      color: #94a3b8;
      font-weight: 700;
    }
    .psc-unit-item:hover { color: #ffffff; }
    .psc-u-txt.bright { color: #f1f5f9; }
    .status-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 900;
    }
    .status-dot.green {
      background: #38e595;
      color: #0f132e;
      border: 1.5px solid #1b1438;
    }
    .status-dot.purple {
      background: #9d7eff;
      color: #ffffff;
      border: 1.5px solid #1b1438;
    }
    .status-dot.lock {
      font-size: 0.8rem;
    }
    .vamos-por-mas-pill {
      width: 100%;
      background: linear-gradient(90deg, rgba(157, 126, 255, 0.28), rgba(124, 93, 250, 0.38));
      border: 2px solid #9d7eff;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.96rem;
      font-weight: 800;
      padding: 7px 16px;
      border-radius: 99px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .vamos-por-mas-pill:hover {
      background: #8c6df7;
    }
    .gold-star { color: #ffd166; font-size: 1.1rem; }

    /* ========================================================================
       SECCIÓN 2: UNIDADES DEL PROGRAMA (CON ILUSTRACIONES PROTAGONISTAS)
       ======================================================================== */
    .program-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }
    .section-banner-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pill-book-svg { width: 32px; height: 26px; }
    .burst-lines-svg { width: 28px; height: 28px; }

    .parcial-pills-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .p-switch-btn {
      background: rgba(25, 32, 72, 0.92);
      border: 2px solid rgba(167, 142, 252, 0.35);
      color: #d8def8;
      padding: 7px 16px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
    }
    .p-switch-btn.active {
      background: linear-gradient(90deg, #9d7eff, #7c5dfa);
      border-color: #ffffff;
      color: #ffffff;
    }

    .illustrated-units-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .unit-showcase-card {
      background: linear-gradient(180deg, #1d2552 0%, #141a3b 100%);
      border: 2.5px solid rgba(167, 142, 252, 0.36);
      border-radius: 28px;
      padding: 18px 16px;
      color: #e2e8f0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.22s ease;
      box-shadow: 0 14px 32px -8px rgba(4, 6, 18, 0.72);
    }
    .unit-showcase-card:hover {
      transform: translateY(-5px);
      border-color: #c8b6ff;
      box-shadow: 0 18px 38px -6px rgba(140, 109, 247, 0.5);
    }

    /* TARJETA PROTAGONISTA LAVANDA (COMO UNIDAD 1 EN LA IMAGEN) */
    .unit-showcase-card.is-featured {
      background: linear-gradient(180deg, #f0ebff 0%, #dcd0ff 100%);
      border: 3.5px solid #9d7eff;
      color: #191538;
      box-shadow:
        0 18px 40px -6px rgba(140, 109, 247, 0.6),
        inset 0 3px 0 rgba(255, 255, 255, 0.9);
    }
    .usc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .usc-unit-pill {
      background: rgba(157, 126, 255, 0.25);
      border: 1.5px solid rgba(196, 173, 255, 0.4);
      color: #e2d6ff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .is-featured .usc-unit-pill {
      background: #8c6df7;
      border-color: #1b1438;
      color: #ffffff;
    }
    .usc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin: 6px 0 4px 0;
      line-height: 1.1;
    }
    .is-featured .usc-title {
      color: #191538;
    }

    .usc-body {
      display: grid;
      grid-template-columns: 1fr 104px;
      align-items: center;
      gap: 4px;
      margin: 4px 0 10px 0;
    }
    .usc-stages-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .usc-stage-row {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 0.82rem;
      font-weight: 700;
      color: #b8c2e6;
    }
    .is-featured .usc-stage-row {
      color: #261f4d;
    }
    .usc-stage-row:hover {
      text-decoration: underline;
    }
    .st-bullet {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 900;
    }
    .st-bullet.done {
      background: #38e595;
      color: #191538;
      border: 1.8px solid #191538;
    }
    .st-bullet.open-circle {
      background: #ffffff;
      color: #191538;
      border: 1.8px solid #191538;
    }
    .usc-art-stage {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .usc-footer {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .usc-bar-outer {
      flex: 1;
      height: 13px;
      background: rgba(25, 21, 56, 0.2);
      border: 2px solid #5b3ec8;
      border-radius: 99px;
      overflow: hidden;
    }
    .usc-bar-inner {
      height: 100%;
      background: linear-gradient(90deg, #8c6df7, #6c4ce6);
      border-radius: 99px;
    }
    .usc-pct-badge {
      background: #ffffff;
      border: 2px solid #5b3ec8;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 1px 10px;
      border-radius: 99px;
    }
    .usc-locked-bar {
      width: 100%;
      background: rgba(12, 16, 38, 0.65);
      border: 1.5px solid rgba(167, 142, 252, 0.25);
      color: #b8c2e6;
      text-align: center;
      padding: 6px 10px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 700;
    }

    /* ========================================================================
       SECCIÓN 3: LAS 3 COLUMNAS INFERIORES
       ======================================================================== */
    .bottom-showcase-grid {
      display: grid;
      grid-template-columns: 1.08fr 1.05fr 1fr;
      gap: 18px;
      align-items: stretch;
    }
    @media (max-width: 1140px) {
      .bottom-showcase-grid { grid-template-columns: 1fr; }
    }
    .bottom-box {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .box-header-line {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .gold-star-big { color: #ffd166; font-size: 1.5rem; }
    .trophy-ico { font-size: 1.45rem; }
    .box-header-line h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
    }
    .mini-burst {
      width: 26px;
      height: 22px;
      margin-left: auto;
    }

    /* 6 TARJETAS GRANDES DE HERRAMIENTAS DE ESTUDIO */
    .tools-illustrated-6grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    @media (max-width: 520px) {
      .tools-illustrated-6grid { grid-template-columns: repeat(2, 1fr); }
    }
    .tool-big-card {
      background: linear-gradient(180deg, #efeaff 0%, #d8c8ff 100%);
      border: 2.5px solid #9d7eff;
      border-radius: 22px;
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 10px 22px -6px rgba(5, 7, 20, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.85);
    }
    .tool-big-card:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 14px 28px -4px rgba(140, 109, 247, 0.65);
    }
    .tbc-label {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.92rem;
      font-weight: 800;
      color: #191538;
      text-align: center;
      line-height: 1.12;
    }

    /* COLUMNA 2: DESAFÍOS Y EVALUACIONES */
    .challenges-illustrated-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .challenge-pill-card {
      background: linear-gradient(90deg, #efeaff 0%, #d6c5ff 100%);
      border: 2.5px solid #9d7eff;
      border-radius: 24px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 10px 22px -6px rgba(5, 7, 20, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.85);
    }
    .challenge-pill-card:hover {
      transform: translateX(5px);
      box-shadow: 0 12px 26px -4px rgba(140, 109, 247, 0.65);
    }
    .cpc-copy { flex: 1; }
    .cpc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.12rem;
      font-weight: 800;
      color: #191538;
      line-height: 1.15;
    }
    .cpc-sub {
      font-size: 0.8rem;
      font-weight: 700;
      color: #3a306b;
    }
    .cpc-chevron {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-weight: 900;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .fun-footer-banner {
      margin-top: 14px;
      background: rgba(157, 126, 255, 0.24);
      border: 2px solid rgba(196, 173, 255, 0.45);
      border-radius: 99px;
      padding: 8px 16px;
      text-align: center;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.94rem;
      font-weight: 800;
      color: #f3efff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* COLUMNA 3: SIMULACIONES INTERACTIVAS + TU PRÓXIMO OBJETIVO */
    .right-column-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: space-between;
    }
    .sim-card, .goal-card {
      padding: 18px 20px;
    }
    .sim-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .sh-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sh-left h3, .goal-header h3 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
    }
    .ver-todas-btn {
      background: linear-gradient(90deg, #e5dcff, #c8b6ff);
      border: 2px solid #9d7eff;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 99px;
      cursor: pointer;
    }
    .sim-visual-row {
      display: grid;
      grid-template-columns: 1fr 140px;
      gap: 12px;
      align-items: center;
      cursor: pointer;
    }
    .dipole-stage {
      background: #0b0e24;
      border: 2px solid rgba(186, 164, 255, 0.38);
      border-radius: 20px;
      padding: 6px;
    }
    .dipole-field-svg {
      width: 100%;
      height: 105px;
      display: block;
    }
    .sim-speech-card {
      background: linear-gradient(160deg, #efeaff 0%, #d5c4ff 100%);
      border: 2.5px solid #9d7eff;
      border-radius: 20px;
      padding: 12px 10px;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.88rem;
      font-weight: 800;
      line-height: 1.25;
      text-align: center;
    }

    .goal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .flag-ico { font-size: 1.3rem; }
    .goal-content-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .goal-atom-tile {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: rgba(157, 126, 255, 0.18);
      border: 2px solid rgba(196, 173, 255, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .goal-atom-svg { width: 44px; height: 44px; }
    .goal-text {
      flex: 1;
      margin: 0;
      font-size: 0.86rem;
      font-weight: 600;
      color: #e2e8f0;
      line-height: 1.4;
    }
    .goal-continue-pill {
      background: linear-gradient(180deg, #a78bfa 0%, #7c5dfa 100%);
      border: 2px solid #e2d6ff;
      color: #ffffff;
      padding: 11px 18px;
      border-radius: 16px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.94rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 5px 0 #4c32b8;
    }
  `]
})
export class HomePage implements OnInit {
  Math = Math;
  units: ProgramUnitDto[] = [];
  activeErrors: StudentErrorDto[] = [];
  parcialView: '1er' | '2do' | 'all' = '1er';
  featuredUnitNumber = 1;
  showResetConfirm = false;

  readonly donutCircumference = 2 * Math.PI * 52;

  constructor(private api: Fisica2ApiService, private router: Router) {}

  ngOnInit() {
    this.api.units$.subscribe((data) => {
      this.units = data || [];
    });
    this.api.errors$.subscribe((errs) => {
      this.activeErrors = (errs || []).filter(e => !e.resolved);
    });
    this.api.getUnits().subscribe();
    this.api.getErrors().subscribe();
  }

  get displayedProgramUnits(): ProgramUnitDto[] {
    if (this.parcialView === '1er') return this.units.filter(u => u.unitNumber <= 5);
    if (this.parcialView === '2do') return this.units.filter(u => u.unitNumber >= 6);
    return this.units;
  }

  get globalMastery(): number {
    if (!this.units.length) return 32;
    const sum = this.units.reduce((acc, u) => acc + this.getUnitPct(u), 0);
    const avg = Math.round(sum / this.units.length);
    return avg > 0 ? avg : 32;
  }

  get donutDashOffset(): number {
    const pct = Math.max(8, Math.min(100, this.globalMastery));
    return this.donutCircumference * (1 - pct / 100);
  }

  get nextRecommendedUnit(): ProgramUnitDto {
    if (!this.units.length) {
      return { unitNumber: 1, title: 'Unidad 1', subtitle: '', parcialGroup: '1er Parcial', labId: 'gauss', progressTeoria: 0, progressLaboratorio: 0, progressPractico: 0, progressPruebaDominio: 0, certificationStatus: 'no_iniciada' };
    }
    const incomplete = this.units.find(u => this.getUnitPct(u) < 100);
    return incomplete || this.units[0];
  }

  get nextRecommendedTab(): string {
    const u = this.nextRecommendedUnit;
    if (u.progressTeoria < 70) return 'teoria';
    if (u.progressLaboratorio < 70) return 'graficos';
    if (u.progressPractico < 70) return 'practica';
    return 'mcq';
  }

  isUnitFeatured(u: ProgramUnitDto): boolean {
    return u.unitNumber === this.featuredUnitNumber;
  }

  getShortIllustratedTitle(unitNumber: number): string {
    const map: Record<number, string> = {
      1: 'Electricidad',
      2: 'Capacitores',
      3: 'Corriente Eléctrica',
      4: 'Magnetismo',
      5: 'Inducción',
      6: 'Fuerza de Lorentz',
      7: 'Biot-Savart & Ampère',
      8: 'Faraday-Lenz',
      9: 'Maxwell & Alterna'
    };
    return map[unitNumber] || `Unidad ${unitNumber}`;
  }

  getIllustrationType(unitNumber: number): string {
    const map: Record<number, string> = {
      1: 'bulb',
      2: 'capacitor',
      3: 'resistor',
      4: 'magnet',
      5: 'coil',
      6: 'gauss-sphere',
      7: 'compass-ampere',
      8: 'equipotential',
      9: 'maxwell-wave'
    };
    return map[unitNumber] || 'bulb';
  }

  getUnitPct(u: ProgramUnitDto): number {
    return this.api.calculateUnitMastery(u);
  }

  selectAndOpenUnit(unitNum: number) {
    this.featuredUnitNumber = unitNum;
    this.goToUnit(unitNum, 'teoria');
  }

  goToUnit(unitNum: number, tab: string = 'teoria') {
    this.router.navigate(['/units'], { queryParams: { u: unitNum, tab } });
  }

  executeResetProgress() {
    this.api.resetAllProgress().subscribe(() => {
      this.showResetConfirm = false;
    });
  }
}
