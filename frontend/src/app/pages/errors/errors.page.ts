import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, ProgramUnitDto, StudentErrorDto } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

interface RadarVertex {
  label: string;
  shortLabel: string;
  value: number;
  angleDeg: number;
  x: number;
  y: number;
  lx: number;
  ly: number;
}

@Component({
  selector: 'app-errors',
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
        <ion-title>✦ Mi Progreso, Radar de Competencias & Repaso Inteligente ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="progreso-center-wrapper">

        <!-- ================================================================
             1. BANNER LAVANDA ILUSTRADO: MI PROGRESO & REPASO INTELIGENTE
             ================================================================ -->
        <div class="cielo-hero-banner hero-progreso">
          <app-cielo-art name="challenge-brain" [width]="115" [height]="105"></app-cielo-art>
          <div class="hp-copy">
            <div class="hp-pills">
              <span class="pill-purple">📊 CENTRO DE ESTADÍSTICAS Y TELEMETRÍA</span>
              <span class="pill-gold">★ {{ certifiedUnitsCount }}/9 UNIDADES COMPLETADAS</span>
            </div>
            <h1>Mi Progreso Académico & Repaso Inteligente ♡</h1>
            <p>
              Visualizá tu evolución real en las 9 unidades, tu radar de 6 competencias físicas, tu calendario hacia la mesa de examen y convertí cada error en dominio total.
            </p>
          </div>
        </div>

        <!-- ================================================================
             2. LOS 3 MEDIDORES CIRCULARES ILUSTRADOS (GRÁFICOS DONUT SVG)
             ================================================================ -->
        <div class="three-gauges-grid">
          <!-- Medidor 1: Dominio Global -->
          <div class="cielo-dark-panel gauge-card">
            <svg viewBox="0 0 120 120" class="gauge-svg">
              <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(157, 126, 255, 0.2)" stroke-width="12" />
              <circle
                cx="60" cy="60" r="46"
                fill="none" stroke="#9d7eff" stroke-width="12" stroke-linecap="round"
                [attr.stroke-dasharray]="ringCircumference"
                [attr.stroke-dashoffset]="getDashOffset(globalMastery)"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="67" text-anchor="middle" class="g-pct">{{ globalMastery }}%</text>
            </svg>
            <div class="g-info">
              <span class="g-tag">MEDIDOR GLOBAL</span>
              <h3>Dominio Total</h3>
              <p>Promedio ponderado de Teoría (20%), Lab (25%), Práctica (25%) y Oral (30%).</p>
            </div>
          </div>

          <!-- Medidor 2: Precisión y Control de Errores -->
          <div class="cielo-dark-panel gauge-card">
            <svg viewBox="0 0 120 120" class="gauge-svg">
              <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(56, 229, 149, 0.2)" stroke-width="12" />
              <circle
                cx="60" cy="60" r="46"
                fill="none" stroke="#38e595" stroke-width="12" stroke-linecap="round"
                [attr.stroke-dasharray]="ringCircumference"
                [attr.stroke-dashoffset]="getDashOffset(precisionScore)"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="67" text-anchor="middle" class="g-pct">{{ precisionScore }}%</text>
            </svg>
            <div class="g-info">
              <span class="g-tag emerald">ÍNDICE DE PRECISIÓN</span>
              <h3>Exactitud Conceptual</h3>
              <p>{{ resolvedCount }} errores subsanados • {{ activeErrors.length }} pendientes de repaso.</p>
            </div>
          </div>

          <!-- Medidor 3: Preparación para Mesa Final -->
          <div class="cielo-dark-panel gauge-card">
            <svg viewBox="0 0 120 120" class="gauge-svg">
              <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255, 209, 102, 0.2)" stroke-width="12" />
              <circle
                cx="60" cy="60" r="46"
                fill="none" stroke="#ffd166" stroke-width="12" stroke-linecap="round"
                [attr.stroke-dasharray]="ringCircumference"
                [attr.stroke-dashoffset]="getDashOffset(oralReadinessScore)"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="67" text-anchor="middle" class="g-pct">{{ oralReadinessScore }}%</text>
            </svg>
            <div class="g-info">
              <span class="g-tag gold">SOLVENCIA DE PIZARRÓN</span>
              <h3>Defensa de Coloquio</h3>
              <p>Preparación acumulada en los 7 niveles y defensas frente al Tribunal Oral.</p>
            </div>
          </div>
        </div>

        <!-- ================================================================
             3. RADAR DE COMPETENCIAS DE 6 EJES + CALENDARIO Y PLAN DE ESTUDIO
             ================================================================ -->
        <div class="radar-and-calendar-grid">

          <!-- RADAR DE COMPETENCIAS -->
          <div class="cielo-dark-panel radar-panel">
            <div class="panel-head">
              <span class="kicker-lav">HEXÁGONO DE HABILIDADES FÍSICAS</span>
              <h2>Radar de Competencias Reales</h2>
            </div>

            <div class="radar-stage">
              <svg viewBox="0 0 300 250" class="radar-svg">
                <polygon [attr.points]="getGridPoly(0.33)" class="r-grid" />
                <polygon [attr.points]="getGridPoly(0.66)" class="r-grid" />
                <polygon [attr.points]="getGridPoly(1.0)" class="r-grid outer" />

                <line *ngFor="let v of radarVertices" x1="150" y1="125" [attr.x2]="v.x" [attr.y2]="v.y" class="r-axis" />

                <polygon [attr.points]="radarDataPoly" class="r-area" />

                <g *ngFor="let v of radarVertices">
                  <circle [attr.cx]="getDataPt(v).x" [attr.cy]="getDataPt(v).y" r="5" fill="#ffd166" stroke="#1b1438" stroke-width="2" />
                  <text [attr.x]="v.lx" [attr.y]="v.ly" text-anchor="middle" class="r-lbl">
                    {{ v.shortLabel }} ({{ v.value }}%)
                  </text>
                </g>
              </svg>
            </div>

            <div class="radar-pills-row">
              <div class="r-stat-pill" *ngFor="let v of radarVertices">
                <span>{{ v.label }}</span>
                <strong>{{ v.value }}%</strong>
              </div>
            </div>
          </div>

          <!-- CALENDARIO DE CUENTA REGRESIVA & HOJA DE RUTA DE LAS 9 UNIDADES -->
          <div class="cielo-dark-panel calendar-panel">
            <div class="panel-head">
              <span class="kicker-lav">PLANIFICADOR INTELIGENTE UNdeC</span>
              <h2>📅 Calendario & Hoja de Ruta al Final</h2>
            </div>

            <div class="exam-date-picker-box">
              <div>
                <label class="ed-label">Fecha de tu Mesa de Examen Final:</label>
                <input type="date" [(ngModel)]="examDateIso" (change)="saveExamDate()" class="cyber-date-input" />
              </div>
              <div class="countdown-badge">
                <span class="cd-num">{{ daysUntilExam }}</span>
                <span class="cd-txt">días restantes</span>
              </div>
            </div>

            <div class="units-roadmap-list">
              <div
                *ngFor="let u of units"
                class="roadmap-unit-row"
                [style.opacity]="isUnitUnlocked(u.unitNumber) ? '1' : '0.52'"
                (click)="repracticeUnit(u.unitNumber)"
              >
                <app-cielo-art [name]="getUnitArt(u.unitNumber)" [width]="38" [height]="38"></app-cielo-art>
                <div class="rur-info">
                  <div class="rur-top">
                    <strong>
                      {{ isUnitUnlocked(u.unitNumber) ? '🔓' : '🔒' }} Unidad {{ u.unitNumber }}: {{ getShortUnitName(u.unitNumber) }}
                    </strong>
                    <span class="rur-pct">
                      {{ isUnitUnlocked(u.unitNumber) ? (getUnitPct(u) + '%') : 'Bloqueada' }}
                    </span>
                  </div>
                  <div class="rur-bar-bg">
                    <div class="rur-bar-fill" [style.width.%]="isUnitUnlocked(u.unitNumber) ? getUnitPct(u) : 0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================================================================
             4. MIS ERRORES CRÍTICOS (11 CATEGORÍAS) & RE-ENTRENAMIENTO
             ================================================================ -->
        <div class="cielo-section-pill" style="align-self: flex-start;">
          <span>🚨 Mis Errores Detectados y Repaso Focalizado ({{ activeErrors.length }} activos)</span>
        </div>

        <div class="cielo-dark-panel filter-panel">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterErrors()"
            placeholder="🔍 Buscar error por unidad, tema, pregunta o justificación..."
            class="cyber-input"
          />

          <div class="cat-pills-row">
            <button
              class="c-pill"
              [class.active]="selectedCategory === 'todas'"
              (click)="selectedCategory = 'todas'; filterErrors()"
            >
              Todas ({{ allErrors.length }})
            </button>
            <button
              *ngFor="let cat of categories"
              class="c-pill"
              [class.active]="selectedCategory === cat"
              (click)="selectedCategory = cat; filterErrors()"
            >
              {{ cat | uppercase }}
            </button>
          </div>
        </div>

        <!-- ESTADO VACÍO ILUSTRADO -->
        <div *ngIf="displayedErrors.length === 0" class="cielo-lavender-card empty-box">
          <app-cielo-art name="challenge-target" [width]="85" [height]="85"></app-cielo-art>
          <h3>¡Expediente Impecable en esta Categoría! ♡</h3>
          <p>
            No tenés errores pendientes aquí. Cuando practiques en Multiple Choice (7 Niveles), Práctica de TPs, Muerte Súbita o Tribunal Oral, cualquier duda o fallo aparecerá aquí explicado paso a paso.
          </p>
        </div>

        <!-- TARJETAS ILUSTRADAS DE ERRORES -->
        <div class="errors-stack">
          <div
            *ngFor="let err of displayedErrors"
            class="cielo-dark-panel err-card"
            [class.is-resolved]="err.resolved"
          >
            <div class="ec-top">
              <div class="ec-badges">
                <span class="chip-purple">UNIDAD {{ err.unitNumber || 1 }}</span>
                <span class="chip-danger">{{ err.category | uppercase }}</span>
                <span class="chip-context">{{ err.sourceContext }}</span>
                <span class="chip-occ" *ngIf="err.occurrences > 1">🔥 {{ err.occurrences }} reincidencias</span>
              </div>

              <div class="ec-actions">
                <button class="btn-practice" (click)="repracticeUnit(err.unitNumber || 1)">
                  🎯 Re-entrenar Unidad {{ err.unitNumber || 1 }}
                </button>
                <button *ngIf="!err.resolved" class="btn-resolve" (click)="resolveError(err)">
                  ✓ Marcar Subsanado
                </button>
                <span *ngIf="err.resolved" class="resolved-tag">✓ SUBSANADO</span>
              </div>
            </div>

            <h3 class="ec-title">{{ err.topicTitle }}</h3>

            <div class="ec-boxes-grid">
              <div class="ec-box wrong">
                <div class="ecb-kicker">❌ FALLO REGISTRADO EN TU PRÁCTICA</div>
                <p>{{ err.mistakeDescription }}</p>
              </div>
              <div class="ec-box right">
                <div class="ecb-kicker">💡 EXPLICACIÓN CORRECTA DE CÁTEDRA UNdeC</div>
                <p>{{ err.correctionExplanation }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .progreso-center-wrapper {
      max-width: 1440px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* HERO BANNER */
    .hero-progreso {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 720px) {
      .hero-progreso { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .hp-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
    .pill-purple {
      background: #8957FF;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .pill-gold {
      background: #ffd166;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .hp-copy h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 4px 0;
    }
    .hp-copy p {
      margin: 0;
      font-size: 0.94rem;
      font-weight: 600;
      color: #2b2354;
    }

    /* 3 MEDIDORES CIRCULARES */
    .three-gauges-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 960px) {
      .three-gauges-grid { grid-template-columns: 1fr; }
    }
    .gauge-card {
      padding: 18px 20px;
      display: grid;
      grid-template-columns: 110px 1fr;
      align-items: center;
      gap: 16px;
    }
    .gauge-svg { width: 110px; height: 110px; display: block; }
    .g-pct {
      fill: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 24px;
      font-weight: 800;
    }
    .g-tag {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.72rem;
      font-weight: 800;
      color: #c4b5fd;
      letter-spacing: 0.06em;
    }
    .g-tag.emerald { color: #38e595; }
    .g-tag.gold { color: #ffd166; }
    .g-info h3 {
      margin: 2px 0 4px 0;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.3rem;
      color: #ffffff;
    }
    .g-info p {
      margin: 0;
      font-size: 0.82rem;
      color: #cbd5e1;
      line-height: 1.4;
    }

    /* RADAR + CALENDARIO */
    .radar-and-calendar-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 18px;
    }
    @media (max-width: 980px) {
      .radar-and-calendar-grid { grid-template-columns: 1fr; }
    }
    .radar-panel, .calendar-panel {
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .kicker-lav {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      color: #c4b5fd;
      letter-spacing: 0.08em;
    }
    .panel-head h2 {
      margin: 2px 0 12px 0;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.45rem;
      color: #ffffff;
    }
    .radar-stage {
      display: flex;
      justify-content: center;
    }
    .radar-svg {
      width: 100%;
      max-width: 320px;
      height: auto;
    }
    .r-grid {
      fill: none;
      stroke: rgba(196, 173, 255, 0.25);
      stroke-width: 1.5;
      stroke-dasharray: 4 4;
    }
    .r-grid.outer {
      stroke: #9d7eff;
      stroke-dasharray: none;
      stroke-width: 2;
    }
    .r-axis {
      stroke: rgba(196, 173, 255, 0.25);
      stroke-width: 1.5;
    }
    .r-area {
      fill: rgba(157, 126, 255, 0.35);
      stroke: #ffd166;
      stroke-width: 3;
    }
    .r-lbl {
      fill: #f3efff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 10.5px;
      font-weight: 800;
    }
    .radar-pills-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 12px;
    }
    .r-stat-pill {
      background: rgba(15, 19, 46, 0.8);
      border: 1.5px solid rgba(183, 158, 255, 0.3);
      border-radius: 12px;
      padding: 6px 10px;
      display: flex;
      justify-content: space-between;
      font-size: 0.76rem;
      color: #e2e8f0;
    }
    .r-stat-pill strong { color: #ffd166; }

    /* CALENDARIO */
    .exam-date-picker-box {
      background: linear-gradient(90deg, #efeaff, #d8c8ff);
      border: 2.5px solid #9d7eff;
      border-radius: 20px;
      padding: 14px 18px;
      color: #191538;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }
    .ed-label {
      display: block;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.85rem;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .cyber-date-input {
      background: #ffffff;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      border-radius: 10px;
      padding: 6px 10px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      color: #191538;
    }
    .countdown-badge {
      background: #8957FF;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 16px;
      text-align: center;
    }
    .cd-num {
      display: block;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      line-height: 1;
    }
    .cd-txt { font-size: 0.72rem; font-weight: 700; }

    .units-roadmap-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 255px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .roadmap-unit-row {
      background: rgba(15, 19, 46, 0.78);
      border: 1.5px solid rgba(183, 158, 255, 0.28);
      border-radius: 16px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .roadmap-unit-row:hover {
      border-color: #ffd166;
      transform: translateX(4px);
    }
    .rur-info { flex: 1; }
    .rur-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .rur-pct { color: #ffd166; font-weight: 800; }
    .rur-bar-bg {
      height: 7px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 99px;
      overflow: hidden;
    }
    .rur-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #9d7eff, #38e595);
      border-radius: 99px;
    }

    /* FILTROS Y LISTA DE ERRORES */
    .filter-panel {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cyber-input {
      width: 100%;
      background: rgba(15, 19, 46, 0.9);
      border: 2px solid rgba(183, 158, 255, 0.4);
      border-radius: 16px;
      padding: 12px 16px;
      color: #ffffff;
      font-size: 0.92rem;
    }
    .cat-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .c-pill {
      background: rgba(15, 19, 46, 0.85);
      border: 1.5px solid rgba(183, 158, 255, 0.35);
      color: #d8def8;
      padding: 6px 13px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
    }
    .c-pill.active {
      background: #8c6df7;
      border-color: #ffffff;
      color: #ffffff;
    }

    .empty-box {
      padding: 32px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .empty-box h3 { font-size: 1.5rem; margin: 4px 0; color: #191538; }
    .empty-box p { font-size: 0.92rem; font-weight: 600; color: #2b2354; max-width: 640px; margin: 0; }

    .errors-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .err-card { padding: 20px; }
    .err-card.is-resolved { opacity: 0.68; }
    .ec-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
    .ec-badges { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip-purple {
      background: #8957FF;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 2px 11px;
      border-radius: 99px;
    }
    .chip-danger {
      background: #ff5d73;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 2px 11px;
      border-radius: 99px;
    }
    .chip-context {
      background: rgba(255, 255, 255, 0.12);
      color: #d8def8;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 99px;
    }
    .chip-occ {
      background: #ffd166;
      color: #191538;
      font-size: 0.74rem;
      font-weight: 800;
      padding: 2px 10px;
      border-radius: 99px;
    }
    .ec-actions { display: flex; gap: 8px; align-items: center; }
    .btn-practice {
      background: linear-gradient(90deg, #9d7eff, #8957FF);
      border: 2px solid #e2d6ff;
      color: #ffffff;
      padding: 7px 14px;
      border-radius: 12px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-resolve {
      background: #38e595;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #191538;
      padding: 7px 14px;
      border-radius: 12px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
    }
    .resolved-tag { color: #38e595; font-weight: 800; font-size: 0.82rem; }
    .ec-title { font-size: 1.25rem; color: #ffffff; margin: 0 0 12px 0; }
    .ec-boxes-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 720px) {
      .ec-boxes-grid { grid-template-columns: 1fr; }
    }
    .ec-box {
      padding: 14px 16px;
      border-radius: 18px;
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .ec-box.wrong {
      background: rgba(255, 93, 115, 0.16);
      border: 2px solid #ff5d73;
      color: #ffe4e6;
    }
    .ec-box.right {
      background: rgba(56, 229, 149, 0.16);
      border: 2px solid #38e595;
      color: #d1fae5;
    }
    .ecb-kicker {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .ec-box p { margin: 0; }
  `]
})
export class ErrorsPage implements OnInit {
  units: ProgramUnitDto[] = [];
  allErrors: StudentErrorDto[] = [];
  displayedErrors: StudentErrorDto[] = [];
  selectedCategory = 'todas';
  searchQuery = '';
  resolvedCount = 0;
  criticalCount = 0;
  examDateIso = '2026-12-18';

  readonly ringCircumference = 2 * Math.PI * 46;

  categories: string[] = [
    'conceptual', 'formula', 'signo', 'unidades', 'algebraico',
    'limites', 'simetria', 'planteamiento', 'interpretacion', 'grafico', 'oral'
  ];

  get activeErrors(): StudentErrorDto[] {
    return this.allErrors.filter(e => !e.resolved);
  }

  constructor(private api: Fisica2ApiService, private router: Router) {}

  ngOnInit() {
    const savedDate = localStorage.getItem('fisica2_exam_date_iso');
    if (savedDate) this.examDateIso = savedDate;

    this.api.units$.subscribe((u) => {
      this.units = u || [];
    });
    this.api.errors$.subscribe((data) => {
      this.allErrors = data || [];
      this.updateStats();
      this.filterErrors();
    });
    this.api.getUnits().subscribe();
    this.api.getErrors().subscribe();
  }

  saveExamDate() {
    localStorage.setItem('fisica2_exam_date_iso', this.examDateIso);
  }

  get daysUntilExam(): number {
    const target = new Date(this.examDateIso).getTime();
    const now = Date.now();
    const diff = Math.ceil((target - now) / (1000 * 3600 * 24));
    return Math.max(1, diff || 25);
  }

  get globalMastery(): number {
    if (!this.units.length) return 32;
    const sum = this.units.reduce((acc, u) => acc + this.getUnitPct(u), 0);
    const avg = Math.round(sum / this.units.length);
    return avg > 0 ? avg : 32;
  }

  get certifiedUnitsCount(): number {
    return this.units.filter(u => this.getUnitPct(u) >= 80).length;
  }

  get precisionScore(): number {
    return Math.max(25, 100 - this.activeErrors.length * 8);
  }

  get oralReadinessScore(): number {
    if (!this.units.length) return 40;
    const avg = Math.round(this.units.reduce((a, u) => a + (u.progressPruebaDominio || 0), 0) / this.units.length);
    return Math.max(35, avg);
  }

  getDashOffset(pct: number): number {
    const clamped = Math.max(8, Math.min(100, pct));
    return this.ringCircumference * (1 - clamped / 100);
  }

  get radarVertices(): RadarVertex[] {
    const t = this.units.length ? Math.round(this.units.reduce((a, u) => a + u.progressTeoria, 0) / this.units.length) : 45;
    const l = this.units.length ? Math.round(this.units.reduce((a, u) => a + u.progressLaboratorio, 0) / this.units.length) : 40;
    const p = this.units.length ? Math.round(this.units.reduce((a, u) => a + u.progressPractico, 0) / this.units.length) : 35;
    const o = this.units.length ? Math.round(this.units.reduce((a, u) => a + u.progressPruebaDominio, 0) / this.units.length) : 38;

    const raw = [
      { label: 'Teoría', shortLabel: 'Teoría', value: Math.max(30, t), angleDeg: -90 },
      { label: 'Fórmulas', shortLabel: 'Fórmulas', value: Math.max(35, Math.round((t + p) / 2)), angleDeg: -30 },
      { label: 'Práctica', shortLabel: 'Práctica', value: Math.max(28, p), angleDeg: 30 },
      { label: 'Gráficos', shortLabel: 'Gráficos', value: Math.max(35, l), angleDeg: 90 },
      { label: 'Razonamiento', shortLabel: 'Razonam.', value: this.precisionScore, angleDeg: 150 },
      { label: 'Oral', shortLabel: 'Oral', value: Math.max(30, o), angleDeg: 210 },
    ];

    const cx = 150;
    const cy = 125;
    const rMax = 80;
    const rLbl = 104;

    return raw.map(ax => {
      const rad = (ax.angleDeg * Math.PI) / 180;
      return {
        ...ax,
        x: cx + rMax * Math.cos(rad),
        y: cy + rMax * Math.sin(rad),
        lx: cx + rLbl * Math.cos(rad),
        ly: cy + rLbl * Math.sin(rad) + 4
      };
    });
  }

  getGridPoly(scale: number): string {
    const cx = 150;
    const cy = 125;
    const r = 80 * scale;
    return [-90, -30, 30, 90, 150, 210]
      .map(deg => {
        const rad = (deg * Math.PI) / 180;
        return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
      })
      .join(' ');
  }

  getDataPt(v: RadarVertex): { x: number; y: number } {
    const cx = 150;
    const cy = 125;
    const r = 80 * Math.max(0.15, v.value / 100);
    const rad = (v.angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  get radarDataPoly(): string {
    return this.radarVertices
      .map(v => {
        const pt = this.getDataPt(v);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(' ');
  }

  getUnitPct(u: ProgramUnitDto): number {
    return this.api.calculateUnitMastery(u);
  }

  getUnitArt(num: number): string {
    const map: Record<number, string> = {
      1: 'bulb', 2: 'gauss-sphere', 3: 'equipotential',
      4: 'capacitor', 5: 'resistor', 6: 'magnet',
      7: 'compass-ampere', 8: 'coil', 9: 'maxwell-wave'
    };
    return map[num] || 'bulb';
  }

  getShortUnitName(num: number): string {
    const map: Record<number, string> = {
      1: 'Electricidad', 2: 'Ley de Gauss', 3: 'Potencial Eléctrico',
      4: 'Capacitores', 5: 'Corriente y RC', 6: 'Magnetismo y Lorentz',
      7: 'Biot-Savart y Ampère', 8: 'Inducción Faraday-Lenz', 9: 'Maxwell y Alterna'
    };
    return map[num] || `Unidad ${num}`;
  }

  updateStats() {
    this.resolvedCount = this.allErrors.filter(e => e.resolved).length;
    this.criticalCount = this.allErrors.filter(e => !e.resolved && (e.occurrences >= 2 || e.category === 'simetria' || e.category === 'signo')).length;
  }

  filterErrors() {
    let result = [...this.allErrors];
    if (this.selectedCategory !== 'todas') {
      result = result.filter(e => e.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(e =>
        e.topicTitle.toLowerCase().includes(q) ||
        e.mistakeDescription.toLowerCase().includes(q) ||
        e.correctionExplanation.toLowerCase().includes(q) ||
        e.sourceContext.toLowerCase().includes(q)
      );
    }
    this.displayedErrors = result;
  }

  resolveError(err: StudentErrorDto) {
    if (err.id) {
      this.api.resolveError(err.id).subscribe();
    } else {
      err.resolved = true;
      this.updateStats();
      this.filterErrors();
    }
  }

  isUnitUnlocked(unitNum: number): boolean {
    return this.api.isUnitUnlocked(unitNum, this.units);
  }

  repracticeUnit(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      return;
    }
    this.router.navigate(['/units'], { queryParams: { u: unitNum, tab: 'teoria' } });
  }
}
