import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, ProgramUnitDto } from '../../services/fisica2-api.service';
import { KatexRenderService } from '../../services/katex-render.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';
import {
  GUIDED_EXERCISES,
  INTERACTIVE_FORMULAS,
  ORAL_COLLOQUIUM_QUESTIONS,
  THEORY_TOPICS,
  TRAP_QUESTIONS,
} from '../../data/undec-catedra-data';
import { DEEP_THEORY_DATA, DeepTheoryUnit, PizarraDerivation } from '../../data/deep-theory-data';
import { UNIT_MCQ_QUESTIONS } from '../../data/unit-mcq-data';
import {
  GuidedExercise,
  InteractiveFormula,
  OralColloquiumQuestion,
  SevenLevelDifficulty,
  TheoryTopic,
  TrapQuestion,
  UnitMultipleChoiceQuestion,
} from '../../types/fisica2';

@Component({
  selector: 'app-units',
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonBadge,
    CieloIllustrationComponent,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          <div class="u-toolbar-title">
            <span>✦ UNIDADES DEL PROGRAMA — FÍSICA 2 DOMINIO TOTAL ♡</span>
            <span class="u-toolbar-badge">Unidad {{ selectedUnitNumber }} • {{ currentMastery }}%</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="hub-container">

        <!-- ================================================================
             1. SELECTOR ILUSTRADO DE LAS 9 UNIDADES (DESBLOQUEO ESTRICTO AL 100%)
             ================================================================ -->
        <div class="unit-pills-bar">
          <button
            *ngFor="let u of units"
            class="u-pill-btn"
            [class.active]="u.unitNumber === selectedUnitNumber"
            [class.certified]="getUnitPct(u) >= 100"
            [style.opacity]="isUnitUnlocked(u.unitNumber) ? '1' : '0.62'"
            (click)="selectUnit(u.unitNumber)"
          >
            <app-cielo-art [name]="getUnitIllustration(u.unitNumber)" [width]="44" [height]="46"></app-cielo-art>
            <span class="up-num">
              {{ isUnitUnlocked(u.unitNumber) ? (getUnitPct(u) >= 100 ? '✅' : '🔓') : '🔒' }} Unidad {{ u.unitNumber }}
            </span>
            <span class="up-pct">
              {{ getShortUnitName(u.unitNumber) }} • {{ isUnitUnlocked(u.unitNumber) ? (getUnitPct(u) + '%') : 'Bloqueada' }}
            </span>
          </button>
        </div>

        <!-- AVISO / MODAL SI INTENTA ACCEDER A UNA UNIDAD BLOQUEADA -->
        <div class="cielo-lavender-card" *ngIf="lockedUnitNotice as notice" style="padding: 18px 22px; border: 3px solid #f43f5e; background: #ffe4e6;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <strong style="color: #881337; font-size: 1.1rem; display: block;">
                🔒 La Unidad {{ notice.attemptedUnit }} está bloqueada todavía
              </strong>
              <span style="color: #9f1239; font-weight: 700; font-size: 0.9rem;">
                Para desbloquear la Unidad {{ notice.attemptedUnit }}, primero tenés que llegar al <strong>100%</strong> en la
                <strong>Unidad {{ notice.requiredUnitNumber }}</strong> (actualmente en <strong>{{ currentMastery }}%</strong>:
                Teoría {{ currentUnit?.progressTeoria }}%, Laboratorio {{ currentUnit?.progressLaboratorio }}%,
                Práctico {{ currentUnit?.progressPractico }}%, Multiple Choice {{ currentUnit?.progressPruebaDominio }}%).
              </span>
            </div>
            <button class="cielo-btn-purple" (click)="lockedUnitNotice = null">
              ¡Entendido, completaré la Unidad {{ notice.requiredUnitNumber }} al 100%! ♡
            </button>
          </div>
        </div>

        <!-- BANNER LAVANDA ILUSTRADO PROTAGONISTA DE LA UNIDAD -->
        <div class="cielo-hero-banner unit-illustrated-banner" *ngIf="currentUnit">
          <div class="uib-art-left">
            <app-cielo-art [name]="getUnitIllustration(selectedUnitNumber)" [width]="135" [height]="135"></app-cielo-art>
          </div>

          <div class="uib-center">
            <div class="uib-badges">
              <span class="uib-pill-purple">Unidad {{ currentUnit.unitNumber }} • {{ currentUnit.parcialGroup }}</span>
              <span class="uib-pill-status">
                {{ currentMastery >= 80 ? '★ Unidad Completada ♡' : '✦ Aprendé y Practicá Paso a Paso' }}
              </span>
            </div>
            <h1 class="uib-title">{{ currentUnit.title }}</h1>
            <p class="uib-sub">{{ currentUnit.subtitle }}</p>
          </div>

          <div class="uib-right-gauge">
            <div class="uib-pct-circle">
              <span class="uib-pct-val">{{ currentMastery }}%</span>
              <span class="uib-pct-lbl">Dominio</span>
            </div>
          </div>
        </div>

        <!-- ================================================================
             2. LAS 5 TARJETAS ILUSTRADAS DE SECCIÓN (TEORÍA, LAB, EJERCICIOS, 7 NIVELES, ORAL)
             ================================================================ -->
        <div class="five-illustrated-tabs" *ngIf="currentUnit">
          <div class="illo-tab-card" [class.active]="activeTab === 'teoria'" (click)="activeTab = 'teoria'">
            <app-cielo-art name="tool-book" [width]="68" [height]="56"></app-cielo-art>
            <div class="itc-info">
              <div class="itc-title">1. Teoría Visual</div>
              <div class="itc-sub">11 Puntos & Pizarrón ({{ currentUnit.progressTeoria }}%)</div>
            </div>
          </div>

          <div class="illo-tab-card" [class.active]="activeTab === 'graficos'" (click)="activeTab = 'graficos'">
            <app-cielo-art name="tool-lab" [width]="68" [height]="56"></app-cielo-art>
            <div class="itc-info">
              <div class="itc-title">2. Laboratorio Gráfico</div>
              <div class="itc-sub">Simulador en Vivo ({{ currentUnit.progressLaboratorio }}%)</div>
            </div>
          </div>

          <div class="illo-tab-card" [class.active]="activeTab === 'practica'" (click)="activeTab = 'practica'">
            <app-cielo-art name="challenge-target" [width]="60" [height]="56"></app-cielo-art>
            <div class="itc-info">
              <div class="itc-title">3. Práctico Guiado</div>
              <div class="itc-sub">TPs en 6 Pasos ({{ currentUnit.progressPractico }}%)</div>
            </div>
          </div>

          <div class="illo-tab-card" [class.active]="activeTab === 'mcq'" (click)="activeTab = 'mcq'">
            <app-cielo-art name="challenge-clipboard" [width]="60" [height]="56"></app-cielo-art>
            <div class="itc-info">
              <div class="itc-title">4. Multiple Choice</div>
              <div class="itc-sub">7 Niveles Graduados ({{ currentUnit.progressPruebaDominio }}%)</div>
            </div>
          </div>

          <div class="illo-tab-card" [class.active]="activeTab === 'oral'" (click)="activeTab = 'oral'">
            <app-cielo-art name="tool-oral" [width]="68" [height]="56"></app-cielo-art>
            <div class="itc-info">
              <div class="itc-title">5. Entrenamiento Oral</div>
              <div class="itc-sub">Coloquio & Tribunal</div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             PESTAÑA 1: TEORÍA VISUAL (DIBUJOS EXPLICATIVOS + PROFESOR + 11 PUNTOS + PIZARRÓN)
             ================================================================ -->
        <div *ngIf="activeTab === 'teoria'" class="tab-pane">

          <!-- NUEVO ÁLBUM VISUAL EXPLICATIVO CON DIBUJOS GRANDES ("¿QUÉ ES Y DE DÓNDE SALE?") -->
          <div class="cielo-lavender-card" style="padding: 22px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
              <div>
                <span style="background: #191538; color: #fde047; font-weight: 900; font-size: 0.74rem; padding: 4px 12px; border-radius: 99px;">
                  🎨 GUÍA VISUAL ILUSTRADA • UNIDAD {{ selectedUnitNumber }}
                </span>
                <h2 style="font-family: var(--font-display); font-size: 1.55rem; color: #191538; margin: 6px 0 2px 0;">
                  Dibujos Explicativos: ¿Qué es físicamente, cómo se ve por dentro y de dónde sale?
                </h2>
                <p style="margin: 0; color: #362f63; font-weight: 700; font-size: 0.9rem;">
                  Mirá los esquemas ilustrados antes de leer las fórmulas para entender exactamente qué ocurre en la realidad.
                </p>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="cielo-btn-purple" (click)="openProfessorForCurrentUnit()">
                  👩‍🏫 Ver Clase Animada con Voz del Profesor →
                </button>
                <button class="cielo-btn-purple" style="background: linear-gradient(180deg, #10b981, #059669);" (click)="openCalculatorPage()">
                  🧮 Calculadora & Conversor de Unidades
                </button>
              </div>
            </div>

            <!-- GRILLA DE 2 GRANDES LÁMINAS ILUSTRADAS EXPLICATIVAS POR UNIDAD -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
              <div
                *ngFor="let card of currentVisualExplanatoryCards"
                style="background: #ffffff; border: 3px solid #191538; border-radius: 20px; padding: 16px 18px; box-shadow: 0 6px 0 #7c5dfa; display: flex; flex-direction: column; gap: 10px;"
              >
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="background: #7c5dfa; color: #fff; font-weight: 900; font-size: 0.72rem; padding: 3px 10px; border-radius: 99px;">
                    {{ card.badge }}
                  </span>
                  <span style="font-size: 1.3rem;">{{ card.emoji }}</span>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #191538; margin: 0;">
                  {{ card.questionTitle }}
                </h3>

                <!-- ESQUEMA GRÁFICO SVG EXPLICATIVO -->
                <div style="background: #1b4332; border: 5px solid #d97706; border-radius: 16px; padding: 10px; color: #fff;">
                  <div style="font-family: var(--font-mono); font-size: 0.82rem; color: #fde047; font-weight: 800; text-align: center; margin-bottom: 6px;">
                    {{ card.diagramHeader }}
                  </div>
                  <div style="background: rgba(0,0,0,0.28); border-radius: 10px; padding: 10px 12px; font-size: 0.86rem; font-weight: 700; color: #ecfdf5; line-height: 1.5;">
                    <div *ngFor="let stepLine of card.diagramLines" style="margin-bottom: 4px;">
                      ✦ {{ stepLine }}
                    </div>
                  </div>
                </div>

                <p style="margin: 0; font-size: 0.9rem; font-weight: 700; color: #241d4d; line-height: 1.52;">
                  {{ card.plainExplanation }}
                </p>

                <!-- FÓRMULA TRADICIONAL ORDENADA -->
                <div style="background: #f8fafc; border: 2.5px solid #191538; border-radius: 14px; padding: 10px; text-align: center;">
                  <div style="font-size: 0.68rem; font-weight: 900; color: #5b3ec8; margin-bottom: 4px;">FÓRMULA TRADICIONAL ORDENADA:</div>
                  <div style="color: #191538; font-size: 1.15rem;" [innerHTML]="renderMath(card.traditionalFormulaLatex, true)"></div>
                </div>

                <div style="background: #fef9c3; border: 2px solid #eab308; border-radius: 12px; padding: 8px 12px; font-size: 0.82rem; font-weight: 800; color: #713f12;">
                  💡 <strong>¿De dónde sale?:</strong> {{ card.whereItComesFrom }}
                </div>
              </div>
            </div>

            <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
              <button
                class="cyber-btn-emerald"
                [disabled]="isActivityDone('teoria', 'visual_guide_u' + selectedUnitNumber)"
                (click)="completeVerifiedActivity('teoria', 'visual_guide_u' + selectedUnitNumber, 40)"
              >
                {{ isActivityDone('teoria', 'visual_guide_u' + selectedUnitNumber) ? '✓ Dibujos Explicativos Acreditados' : '✅ Comprendí los Dibujos Explicativos (+40% Teoría)' }}
              </button>
            </div>
          </div>

          <!-- Sub-selector de Tópicos Teóricos de la Unidad -->
          <div class="cyber-glass-card inner-card" *ngIf="unitTheoryTopics.length > 0">
            <div class="section-head-flex">
              <div>
                <span class="kicker-cyan">ETAPA A • MATERIAL OFICIAL CÁTEDRA UNdeC</span>
                <h2 class="pane-title">Los 11 Puntos Obligatorios de Teoría</h2>
              </div>
              <div class="topic-selector-pills" *ngIf="unitTheoryTopics.length > 1">
                <button
                  *ngFor="let t of unitTheoryTopics; let idx = index"
                  class="sub-pill"
                  [class.active]="selectedTheoryIndex === idx"
                  (click)="selectedTheoryIndex = idx"
                >
                  Tema {{ idx + 1 }}: {{ t.title }}
                </button>
              </div>
            </div>

            <div *ngIf="currentTheoryTopic as topic" class="theory-11-wrapper">
              <div class="topic-banner">
                <div class="tb-badges">
                  <span class="badge-official">{{ topic.sourceBadge }}</span>
                  <span class="badge-pdf">📄 Fuente: {{ topic.sourcePdf }}</span>
                </div>
                <h3 class="topic-main-title">{{ topic.title }}</h3>
                <div class="catedra-convention">
                  <strong>📌 Convención de Cátedra UNdeC:</strong> {{ topic.convencionCatedra }}
                </div>
              </div>

              <!-- GRILLA DE LOS 11 PUNTOS -->
              <div class="eleven-points-grid">
                <div class="point-box">
                  <div class="pt-num">PUNTO 1 • DEFINICIÓN CONCEPTUAL</div>
                  <h4>¿Qué es?</h4>
                  <p>{{ topic.queEs }}</p>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 2 • FENOMENOLOGÍA</div>
                  <h4>¿Qué pasa físicamente?</h4>
                  <p>{{ topic.quePasaFisicamente }}</p>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 3 • CAUSA FÍSICA</div>
                  <h4>¿Por qué ocurre?</h4>
                  <p>{{ topic.porQueOcurre }}</p>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 4 • MAGNITUDES FÍSICAS</div>
                  <h4>Magnitudes Involucradas</h4>
                  <ul class="clean-list">
                    <li *ngFor="let m of topic.magnitudes">{{ m }}</li>
                  </ul>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 5 • NOMENCLATURA Y SÍMBOLOS</div>
                  <h4>Interpretación de Variables</h4>
                  <div class="symbols-mini-table">
                    <div class="sym-row" *ngFor="let s of topic.simbolos">
                      <span class="sym-code" [innerHTML]="renderMath(s.simbolo)"></span>
                      <span class="sym-desc">{{ s.significado }}</span>
                    </div>
                  </div>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 6 • SISTEMA INTERNACIONAL (SI)</div>
                  <h4>Unidades Oficiales</h4>
                  <div class="cyber-formula-display" [innerHTML]="renderMath(topic.unidades)"></div>
                </div>

                <div class="point-box emerald-border">
                  <div class="pt-num emerald-txt">PUNTO 7 • CONDICIONES DE VALIDEZ</div>
                  <h4>¿Cuándo SÍ se usa?</h4>
                  <p>{{ topic.cuandoSeUsa }}</p>
                </div>

                <div class="point-box danger-border">
                  <div class="pt-num danger-txt">PUNTO 8 • LÍMITES Y RESTRICCIONES</div>
                  <h4>¿Cuándo NO se puede usar?</h4>
                  <p>{{ topic.cuandoNoSeUsa }}</p>
                </div>

                <div class="point-box warning-border">
                  <div class="pt-num warning-txt">PUNTO 9 • PREVENCIÓN DE FALLOS</div>
                  <h4>Errores Típicos de Parcial y Final</h4>
                  <ul class="clean-list">
                    <li *ngFor="let err of topic.erroresTipicos">⚠️ {{ err }}</li>
                  </ul>
                </div>

                <div class="point-box">
                  <div class="pt-num">PUNTO 10 • INTUICIÓN RÁPIDA</div>
                  <h4>Ejemplo Sencillo</h4>
                  <p>{{ topic.ejemploSencillo }}</p>
                </div>

                <div class="point-box full-span cyan-border">
                  <div class="pt-num cyan-txt">PUNTO 11 • APLICACIÓN RIGUROSA DE EXAMEN</div>
                  <h4>Ejemplo de Nivel Examen Final UNdeC</h4>
                  <p>{{ topic.ejemploNivelExamen }}</p>
                </div>
              </div>

              <!-- Verificación de lectura comprensiva para acreditar progreso real -->
              <div class="checkpoint-verify-bar">
                <div>
                  <strong>✅ Certificación de Estudio del Tema:</strong>
                  <span>Al completar el análisis de los 11 puntos de "{{ topic.title }}", registrá tu avance verificado.</span>
                </div>
                <button
                  class="cyber-btn-emerald"
                  [disabled]="isActivityDone('teoria', topic.id)"
                  (click)="completeVerifiedActivity('teoria', topic.id, 40)"
                >
                  {{ isActivityDone('teoria', topic.id) ? '✓ Tema Teórico Acreditado' : 'Acreditar Lectura de los 11 Puntos (+40% Teoría)' }}
                </button>
              </div>
            </div>
          </div>

          <!-- DEMOSTRACIONES DE PIZARRÓN PASO A PASO (DEEP THEORY) -->
          <div class="cyber-glass-card inner-card" *ngIf="currentDeepTheory as deep">
            <span class="kicker-cyan">PIZARRÓN DE COLOQUIO • PASO A PASO</span>
            <h2 class="pane-title">Demostraciones Analíticas de Pizarrón ({{ deep.title }})</h2>
            <p class="pane-desc">
              Avanzá paso por paso en cada deducción matemática tal como lo exige el tribunal en el pizarrón.
            </p>

            <div class="derivations-list">
              <div class="derivation-card" *ngFor="let d of deep.pizarraDerivations; let dIdx = index">
                <div class="deriv-header">
                  <h3>📐 {{ d.title }}</h3>
                  <div class="deriv-controls">
                    <button class="mini-step-btn" (click)="revealNextDerivationStep(dIdx, d.steps.length)">
                      Revelar Siguiente Paso ({{ getVisibleStepsCount(dIdx, d.steps.length) }}/{{ d.steps.length }})
                    </button>
                    <button class="mini-step-btn ghost" (click)="revealAllDerivationSteps(dIdx, d.steps.length)">
                      Ver Todos
                    </button>
                  </div>
                </div>

                <div class="blackboard-steps">
                  <div
                    *ngFor="let st of d.steps.slice(0, getVisibleStepsCount(dIdx, d.steps.length)); let sIdx = index"
                    class="bb-step-row"
                  >
                    <span class="bb-step-badge">Paso {{ sIdx + 1 }}</span>
                    <div class="bb-step-text" [innerHTML]="renderMath(st)"></div>
                  </div>
                </div>

                <div class="deriv-significance">
                  <strong>💡 Significado Físico en Coloquio:</strong> {{ d.physicalSignificance }}
                </div>

                <div style="margin-top: 10px; text-align: right;">
                  <button
                    class="cyber-btn-cyan-sm"
                    [disabled]="isActivityDone('teoria', 'deriv_' + selectedUnitNumber + '_' + dIdx)"
                    (click)="completeVerifiedActivity('teoria', 'deriv_' + selectedUnitNumber + '_' + dIdx, 30)"
                  >
                    {{ isActivityDone('teoria', 'deriv_' + selectedUnitNumber + '_' + dIdx) ? '✓ Demostración Dominada' : 'Marcar Demostración Dominada (+30% Teoría)' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Conceptos Profundos de la Unidad -->
            <div class="deep-concepts-grid" *ngIf="deep.deepConcepts.length > 0">
              <div class="deep-concept-box" *ngFor="let c of deep.deepConcepts">
                <h4>🧠 {{ c.concept }}</h4>
                <p>{{ c.explanation }}</p>
              </div>
            </div>
          </div>

          <!-- TRADUCTOR INTERACTIVO DE FÓRMULAS CON KATEX -->
          <div class="cyber-glass-card inner-card" *ngIf="unitFormulas.length > 0">
            <span class="kicker-cyan">ANATOMÍA MATEMÁTICA & INTEGRALES</span>
            <h2 class="pane-title">Traductor Interactivo de Fórmulas de la Unidad {{ selectedUnitNumber }}</h2>

            <div class="formula-cards-stack">
              <div class="formula-anatomizer-card" *ngFor="let f of unitFormulas">
                <div class="fa-header">
                  <div>
                    <span class="badge-pdf">{{ f.sourcePdf }}</span>
                    <h3>{{ f.title }}</h3>
                  </div>
                </div>

                <div class="cyber-formula-display large-formula" [innerHTML]="renderMath(f.equationDisplay, true)"></div>

                <p class="fa-interp"><strong>Interpretación física:</strong> {{ f.physicalInterpretation }}</p>

                <div class="fa-two-cols">
                  <div class="fa-rule-box ok">
                    <strong>✅ ¿Cuándo SÍ sale fuera de la integral?</strong>
                    <p>{{ f.whenCanExtractFromIntegral }}</p>
                  </div>
                  <div class="fa-rule-box no">
                    <strong>🚫 ¿Cuándo está PROHIBIDO sacarlo de la integral?</strong>
                    <p>{{ f.whenProhibitedToExtract }}</p>
                  </div>
                </div>

                <div class="fa-symbols-grid">
                  <div class="fa-sym-item" *ngFor="let sym of f.symbols">
                    <div class="fas-top">
                      <span class="fas-symbol" [innerHTML]="renderMath(sym.symbol)"></span>
                      <span class="fas-unit">{{ sym.unitsSI }}</span>
                    </div>
                    <div class="fas-name">{{ sym.name }}</div>
                    <div class="fas-meaning">{{ sym.physicalMeaning }}</div>
                    <div class="fas-err">⚠️ {{ sym.typicalError }}</div>
                  </div>
                </div>

                <div class="fa-footer-bar">
                  <span><strong>Análisis Dimensional:</strong> {{ f.dimensionalVerification }}</span>
                  <button
                    class="cyber-btn-cyan-sm"
                    [disabled]="isActivityDone('teoria', f.id)"
                    (click)="completeVerifiedActivity('teoria', f.id, 30)"
                  >
                    {{ isActivityDone('teoria', f.id) ? '✓ Fórmula Verificada' : 'Acreditar Dominio de Fórmula (+30% Teoría)' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================================================================
             PESTAÑA 2: LABORATORIO GRÁFICO INTERACTIVO (SIMULADORES SVG EN VIVO POR UNIDAD)
             ================================================================ -->
        <div *ngIf="activeTab === 'graficos'" class="tab-pane">
          <div class="cyber-glass-card inner-card">
            <div class="section-head-flex">
              <div>
                <span class="kicker-cyan">ETAPA B • SIMULACIÓN FÍSICA INTERACTIVA EN TIEMPO REAL</span>
                <h2 class="pane-title">Laboratorio Virtual — {{ currentUnit?.title }}</h2>
                <p class="pane-desc">
                  Modificá los parámetros físicos con los sliders y entradas numéricas: las curvas, vectores, líneas de campo y telemetría se recalculan instantáneamente.
                </p>
              </div>
              <span class="lab-live-badge">● 60 FPS REAL-TIME SVG</span>
            </div>

            <div class="lab-workbench-grid">
              <!-- PANEL DE CONTROLES INTERACTIVOS (SLIDERS + INPUTS) -->
              <div class="lab-controls-panel">
                <h3>🎛️ Parámetros del Experimento</h3>

                <!-- Controles para U1, U2, U3 (Electrostática / Gauss / Potencial) -->
                <div *ngIf="selectedUnitNumber <= 3" class="control-stack">
                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Carga Fuente Q (o densidad):</span>
                      <strong class="cyan-txt">{{ labChargeQ }} μC</strong>
                    </div>
                    <input type="range" min="1" max="50" step="1" [(ngModel)]="labChargeQ" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Radio de la Esfera / Anillo R:</span>
                      <strong class="violet-txt">{{ labRadiusR }} m</strong>
                    </div>
                    <input type="range" min="0.5" max="4.0" step="0.25" [(ngModel)]="labRadiusR" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Posición de Sonda r (observación):</span>
                      <strong class="emerald-txt">{{ labProbeDist }} m</strong>
                    </div>
                    <input type="range" min="0.2" max="8.0" step="0.2" [(ngModel)]="labProbeDist" class="cyber-slider" />
                  </div>
                </div>

                <!-- Controles para U4 (Capacitores y Dieléctricos) -->
                <div *ngIf="selectedUnitNumber === 4" class="control-stack">
                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Constante Dieléctrica (κ):</span>
                      <strong class="cyan-txt">{{ labKappa }}</strong>
                    </div>
                    <input type="range" min="1" max="8" step="0.5" [(ngModel)]="labKappa" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Separación entre Placas (d):</span>
                      <strong class="violet-txt">{{ labPlateDist }} mm</strong>
                    </div>
                    <input type="range" min="1" max="10" step="0.5" [(ngModel)]="labPlateDist" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Régimen de Conexión:</span>
                    </div>
                    <div class="toggle-pair">
                      <button class="sub-pill" [class.active]="labBatteryConnected" (click)="labBatteryConnected = true">
                        🔋 Batería Conectada (V=12V cte)
                      </button>
                      <button class="sub-pill" [class.active]="!labBatteryConnected" (click)="labBatteryConnected = false">
                        🔌 Aislado (Q=cte)
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Controles para U5 (Transitorio Circuito RC) -->
                <div *ngIf="selectedUnitNumber === 5" class="control-stack">
                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Fuente de Alimentación (ε):</span>
                      <strong class="cyan-txt">{{ labVoltageE }} V</strong>
                    </div>
                    <input type="range" min="5" max="48" step="1" [(ngModel)]="labVoltageE" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Constante de Tiempo (τ = R·C):</span>
                      <strong class="violet-txt">{{ labTau }} s</strong>
                    </div>
                    <input type="range" min="1" max="10" step="0.5" [(ngModel)]="labTau" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Instante de Medición (t):</span>
                      <strong class="emerald-txt">{{ labTimeT }} s ({{ (labTimeT / labTau).toFixed(1) }}τ)</strong>
                    </div>
                    <input type="range" min="0" max="25" step="0.5" [(ngModel)]="labTimeT" class="cyber-slider" />
                  </div>
                </div>

                <!-- Controles para U6 y U7 (Magnetismo, Lorentz y Ampère) -->
                <div *ngIf="selectedUnitNumber === 6 || selectedUnitNumber === 7" class="control-stack">
                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Campo Magnético B / Corriente I:</span>
                      <strong class="cyan-txt">{{ labMagB }} T (o A)</strong>
                    </div>
                    <input type="range" min="0.5" max="5.0" step="0.25" [(ngModel)]="labMagB" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Velocidad de Partícula v:</span>
                      <strong class="violet-txt">{{ labVelocityV }} ×10⁵ m/s</strong>
                    </div>
                    <input type="range" min="1" max="10" step="0.5" [(ngModel)]="labVelocityV" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label"><span>Signo de la Partícula:</span></div>
                    <div class="toggle-pair">
                      <button class="sub-pill" [class.active]="labChargePositive" (click)="labChargePositive = true">
                        ➕ Protón (q > 0)
                      </button>
                      <button class="sub-pill" [class.active]="!labChargePositive" (click)="labChargePositive = false">
                        ➖ Electrón (q < 0)
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Controles para U8 y U9 (Faraday-Lenz, RLC y Fasores) -->
                <div *ngIf="selectedUnitNumber >= 8" class="control-stack">
                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Frecuencia Angular (ω) / Velocidad:</span>
                      <strong class="cyan-txt">{{ labOmega }} rad/s</strong>
                    </div>
                    <input type="range" min="50" max="600" step="10" [(ngModel)]="labOmega" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Reactancia Inductiva (X_L = ωL):</span>
                      <strong class="violet-txt">{{ labXL }} Ω</strong>
                    </div>
                    <input type="range" min="10" max="150" step="5" [(ngModel)]="labXL" class="cyber-slider" />
                  </div>

                  <div class="ctrl-group">
                    <div class="ctrl-label">
                      <span>Reactancia Capacitiva (X_C = 1/ωC):</span>
                      <strong class="emerald-txt">{{ labXC }} Ω</strong>
                    </div>
                    <input type="range" min="10" max="150" step="5" [(ngModel)]="labXC" class="cyber-slider" />
                  </div>
                </div>

                <!-- TELEMETRÍA NUMÉRICA EN VIVO -->
                <div class="lab-telemetry-readout">
                  <div class="ltr-title">📊 TELEMETRÍA CALCULADA EN VIVO</div>
                  <div class="ltr-row" *ngFor="let item of currentLabReadouts">
                    <span>{{ item.label }}:</span>
                    <strong class="cyan-txt">{{ item.value }}</strong>
                  </div>
                </div>
              </div>

              <!-- LIENZO SVG DINÁMICO DEL LABORATORIO -->
              <div class="lab-canvas-stage">

                <!-- SIMULADOR SVG UNIDADES 1, 2, 3: ESFERA GAUSSIANA Y CURVAS E(r), V(r) -->
                <svg *ngIf="selectedUnitNumber <= 3" viewBox="0 0 600 320" class="lab-svg">
                  <!-- Panel Izquierdo: Geometría Física y Superficie Gaussiana -->
                  <rect x="10" y="10" width="250" height="300" rx="14" fill="rgba(6, 9, 22, 0.85)" stroke="rgba(167,139,250,0.25)" />
                  <text x="135" y="32" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="800">GEOMETRÍA & SONDA GAUSSIANA</text>

                  <!-- Esfera cargada de radio R -->
                  <circle cx="135" cy="165" [attr.r]="labRadiusR * 18" fill="rgba(124, 58, 237, 0.28)" stroke="#a78bfa" stroke-width="2" />
                  <!-- Superficie Gaussiana en posición r -->
                  <circle cx="135" cy="165" [attr.r]="labProbeDist * 13" fill="none" stroke="#00f2fe" stroke-width="2" stroke-dasharray="5 4" />
                  <!-- Punto sonda -->
                  <circle [attr.cx]="135 + labProbeDist * 13" cy="165" r="5" fill="#f43f5e" />
                  <!-- Vector Campo E en la sonda -->
                  <line
                    [attr.x1]="135 + labProbeDist * 13" y1="165"
                    [attr.x2]="135 + labProbeDist * 13 + Math.min(45, currentLabFieldE * 1.4)" y2="165"
                    stroke="#00f2fe" stroke-width="3"
                  />
                  <text x="135" y="295" text-anchor="middle" fill="#cbd5e1" font-size="11">
                    {{ labProbeDist < labRadiusR ? 'REGIÓN INTERIOR (r < R)' : 'REGIÓN EXTERIOR (r ≥ R)' }}
                  </text>

                  <!-- Panel Derecho: Gráfico Cartesiano E(r) en Vivo -->
                  <rect x="275" y="10" width="315" height="300" rx="14" fill="rgba(6, 9, 22, 0.85)" stroke="rgba(0,242,254,0.25)" />
                  <text x="432" y="32" text-anchor="middle" fill="#00f2fe" font-size="11" font-weight="800">CURVA EN VIVO E(r) vs DISTANCIA r</text>

                  <!-- Ejes cartesianos -->
                  <line x1="310" y1="265" x2="570" y2="265" stroke="#64748b" stroke-width="1.5" />
                  <line x1="310" y1="55" x2="310" y2="265" stroke="#64748b" stroke-width="1.5" />
                  <!-- Línea vertical de frontera r = R -->
                  <line
                    [attr.x1]="310 + labRadiusR * 30" y1="55"
                    [attr.x2]="310 + labRadiusR * 30" y2="265"
                    stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4 3"
                  />
                  <text [attr.x]="310 + labRadiusR * 30" y="282" text-anchor="middle" fill="#a78bfa" font-size="10">r = R</text>

                  <!-- Curva generada dinámicamente -->
                  <path [attr.d]="gaussCurvePath" fill="none" stroke="#00f2fe" stroke-width="3" />

                  <!-- Punto actual de la sonda sobre la curva -->
                  <circle
                    [attr.cx]="310 + labProbeDist * 30"
                    [attr.cy]="265 - Math.min(195, currentLabFieldE * 6)"
                    r="6"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    stroke-width="2"
                  />
                </svg>

                <!-- SIMULADOR SVG UNIDAD 4: CAPACITOR Y POLARIZACIÓN DIELÉCTRICA -->
                <svg *ngIf="selectedUnitNumber === 4" viewBox="0 0 600 320" class="lab-svg">
                  <rect x="15" y="15" width="570" height="290" rx="16" fill="rgba(6, 9, 22, 0.88)" stroke="rgba(0,242,254,0.3)" />
                  <text x="300" y="42" text-anchor="middle" fill="#00f2fe" font-size="13" font-weight="800">
                    CONDENSADOR PLANO CON DIELÉCTRICO (κ = {{ labKappa }}) — {{ labBatteryConnected ? 'V = 12V CONSTANTE' : 'Q CONSTANTE (AISLADO)' }}
                  </text>

                  <!-- Placa Superior Positiva -->
                  <rect x="130" y="70" width="340" height="18" rx="4" fill="#f43f5e" />
                  <text x="300" y="83" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">+ + + PLACA CONDUCTORA SUPERIOR (+Q) + + +</text>

                  <!-- Bloque Dieléctrico Polarizado -->
                  <rect x="145" y="96" width="310" [attr.height]="90 + labPlateDist * 6" rx="8" fill="rgba(124, 58, 237, 0.28)" stroke="#a78bfa" stroke-width="2" />
                  <text x="300" y="114" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="700">- - - Carga Inducida de Polarización (-σ_p) - - -</text>
                  <text x="300" [attr.y]="145 + labPlateDist * 3" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">
                    E_neto = E₀ / κ  |  C = {{ (labKappa * 10 / labPlateDist).toFixed(1) }} pF
                  </text>
                  <text x="300" [attr.y]="178 + labPlateDist * 6" text-anchor="middle" fill="#fda4af" font-size="11" font-weight="700">+ + + Carga Inducida de Polarización (+σ_p) + + +</text>

                  <!-- Placa Inferior Negativa -->
                  <rect x="130" [attr.y]="194 + labPlateDist * 6" width="340" height="18" rx="4" fill="#0284c7" />
                  <text x="300" [attr.y]="207 + labPlateDist * 6" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">- - - PLACA CONDUCTORA INFERIOR (-Q) - - -</text>
                </svg>

                <!-- SIMULADOR SVG UNIDAD 5: OSCILOSCOPIO TRANSITORIO RC -->
                <svg *ngIf="selectedUnitNumber === 5" viewBox="0 0 600 320" class="lab-svg">
                  <rect x="15" y="15" width="570" height="290" rx="16" fill="rgba(6, 9, 22, 0.9)" stroke="rgba(16,185,129,0.35)" />
                  <text x="300" y="38" text-anchor="middle" fill="#34d399" font-size="12" font-weight="800">
                    OSCILOSCOPIO DIGITAL RC — CURVA DE CARGA v_C(t) Y CORRIENTE i(t)
                  </text>

                  <!-- Ejes -->
                  <line x1="60" y1="260" x2="555" y2="260" stroke="#64748b" stroke-width="1.5" />
                  <line x1="60" y1="60" x2="60" y2="260" stroke="#64748b" stroke-width="1.5" />
                  <!-- Asíntota horizontal V = E -->
                  <line x1="60" y1="75" x2="555" y2="75" stroke="#00f2fe" stroke-width="1" stroke-dasharray="5 4" />
                  <text x="530" y="68" fill="#00f2fe" font-size="10">Asíntota ε = {{ labVoltageE }}V</text>

                  <!-- Línea vertical de t = tau -->
                  <line [attr.x1]="60 + labTau * 18" y1="60" [attr.x2]="60 + labTau * 18" y2="260" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4 3" />
                  <text [attr.x]="60 + labTau * 18" y="278" text-anchor="middle" fill="#a78bfa" font-size="10">τ = {{ labTau }}s (63.2%)</text>

                  <!-- Curva v_C(t) creciente -->
                  <path [attr.d]="rcVoltageCurvePath" fill="none" stroke="#00f2fe" stroke-width="3" />
                  <!-- Curva i(t) decreciente -->
                  <path [attr.d]="rcCurrentCurvePath" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="5 3" />

                  <!-- Punto actual en t -->
                  <circle
                    [attr.cx]="60 + labTimeT * 18"
                    [attr.cy]="260 - 185 * (1 - Math.exp(-labTimeT / labTau))"
                    r="6"
                    fill="#34d399"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </svg>

                <!-- SIMULADOR SVG UNIDADES 6 Y 7: CICLOTRÓN DE LORENTZ Y CAMPO MAGNÉTICO -->
                <svg *ngIf="selectedUnitNumber === 6 || selectedUnitNumber === 7" viewBox="0 0 600 320" class="lab-svg">
                  <rect x="15" y="15" width="570" height="290" rx="16" fill="rgba(6, 9, 22, 0.9)" stroke="rgba(0,242,254,0.35)" />
                  <text x="300" y="38" text-anchor="middle" fill="#00f2fe" font-size="12" font-weight="800">
                    CÁMARA MAGNÉTICA (B = {{ labMagB }} T ENTRANTE ⊗) — {{ labChargePositive ? 'PROTÓN (+q)' : 'ELECTRÓN (-q)' }}
                  </text>

                  <!-- Grilla de cruces de campo magnético B entrante -->
                  <g fill="rgba(167,139,250,0.32)" font-size="14" font-family="monospace">
                    <text x="90" y="95">⊗</text><text x="190" y="95">⊗</text><text x="290" y="95">⊗</text><text x="390" y="95">⊗</text><text x="490" y="95">⊗</text>
                    <text x="90" y="165">⊗</text><text x="190" y="165">⊗</text><text x="290" y="165">⊗</text><text x="390" y="165">⊗</text><text x="490" y="165">⊗</text>
                    <text x="90" y="235">⊗</text><text x="190" y="235">⊗</text><text x="290" y="235">⊗</text><text x="390" y="235">⊗</text><text x="490" y="235">⊗</text>
                  </g>

                  <!-- Trayectoria Circular Ciclotrónica -->
                  <circle
                    cx="300"
                    cy="170"
                    [attr.r]="Math.min(105, Math.max(25, (labVelocityV * 18) / labMagB))"
                    fill="rgba(0, 242, 254, 0.06)"
                    [attr.stroke]="labChargePositive ? '#00f2fe' : '#f43f5e'"
                    stroke-width="3"
                    stroke-dasharray="6 3"
                  />

                  <!-- Partícula en la parte inferior de la órbita -->
                  <circle
                    cx="300"
                    [attr.cy]="170 + Math.min(105, Math.max(25, (labVelocityV * 18) / labMagB))"
                    r="8"
                    [attr.fill]="labChargePositive ? '#00f2fe' : '#f43f5e'"
                  />
                  <!-- Vector velocidad v (tangencial) -->
                  <line
                    x1="300"
                    [attr.y1]="170 + Math.min(105, Math.max(25, (labVelocityV * 18) / labMagB))"
                    [attr.x2]="labChargePositive ? 360 : 240"
                    [attr.y2]="170 + Math.min(105, Math.max(25, (labVelocityV * 18) / labMagB))"
                    stroke="#34d399"
                    stroke-width="3"
                  />
                  <!-- Vector Fuerza Magnética F_B (centrípeta hacia el centro) -->
                  <line
                    x1="300"
                    [attr.y1]="170 + Math.min(105, Math.max(25, (labVelocityV * 18) / labMagB))"
                    x2="300"
                    y2="170"
                    stroke="#f59e0b"
                    stroke-width="3"
                  />
                  <text x="300" y="294" text-anchor="middle" fill="#e2e8f0" font-size="11">
                    Vector Verde: Velocidad v (tangente)  |  Vector Ámbar: Fuerza F_B = q(v × B) centrípeta (W = 0 J)
                  </text>
                </svg>

                <!-- SIMULADOR SVG UNIDADES 8 Y 9: FASORES RLC, RESONANCIA E INDUCCIÓN -->
                <svg *ngIf="selectedUnitNumber >= 8" viewBox="0 0 600 320" class="lab-svg">
                  <rect x="15" y="15" width="570" height="290" rx="16" fill="rgba(6, 9, 22, 0.9)" stroke="rgba(167,139,250,0.35)" />
                  <text x="300" y="38" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="800">
                    DIAGRAMA FASORIAL EN PLANO COMPLEJO & TRIÁNGULO DE IMPEDANCIA RLC
                  </text>

                  <!-- Ejes Real e Imaginario -->
                  <line x1="80" y1="170" x2="360" y2="170" stroke="#475569" stroke-width="1.5" />
                  <line x1="160" y1="55" x2="160" y2="285" stroke="#475569" stroke-width="1.5" />

                  <!-- Fasor V_R (Eje Real 0°) -->
                  <line x1="160" y1="170" x2="270" y2="170" stroke="#34d399" stroke-width="4" />
                  <text x="278" y="174" fill="#34d399" font-size="11" font-weight="800">V_R (en fase)</text>

                  <!-- Fasor V_L (+90° hacia arriba) -->
                  <line x1="160" y1="170" x2="160" [attr.y2]="170 - labXL * 0.7" stroke="#00f2fe" stroke-width="3.5" />
                  <text x="168" [attr.y]="170 - labXL * 0.7" fill="#00f2fe" font-size="11" font-weight="800">V_L (+90°)</text>

                  <!-- Fasor V_C (-90° hacia abajo) -->
                  <line x1="160" y1="170" x2="160" [attr.y2]="170 + labXC * 0.7" stroke="#f43f5e" stroke-width="3.5" />
                  <text x="168" [attr.y]="170 + labXC * 0.7" fill="#f43f5e" font-size="11" font-weight="800">V_C (-90°)</text>

                  <!-- Fasor Resultante V_total -->
                  <line x1="160" y1="170" x2="270" [attr.y2]="170 - (labXL - labXC) * 0.7" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5 3" />

                  <!-- Estado del Circuito -->
                  <rect x="375" y="85" width="190" height="150" rx="12" fill="rgba(16, 24, 52, 0.9)" stroke="#00f2fe" />
                  <text x="470" y="112" text-anchor="middle" fill="#00f2fe" font-size="11" font-weight="800">RÉGIMEN DEL CIRCUITO</text>
                  <text x="470" y="142" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">
                    {{ labXL === labXC ? '⚡ EN RESONANCIA' : labXL > labXC ? '🧲 INDUCTIVO (X_L > X_C)' : '🔋 CAPACITIVO (X_C > X_L)' }}
                  </text>
                  <text x="470" y="172" text-anchor="middle" fill="#cbd5e1" font-size="11">
                    Desfase φ = {{ getPhaseAngleDeg() }}°
                  </text>
                  <text x="470" y="200" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">
                    cos(φ) = {{ getPowerFactor() }}
                  </text>
                </svg>

              </div>
            </div>

            <!-- MISIÓN EXPERIMENTAL VERIFICADA DE LABORATORIO -->
            <div class="lab-mission-card">
              <div class="lm-header">
                <span class="chip-cyan">MISIÓN EXPERIMENTAL DE LABORATORIO • UNIDAD {{ selectedUnitNumber }}</span>
                <h4>🔬 Comprobación de Fenómeno Gráfico</h4>
              </div>
              <p class="lm-prompt">{{ currentLabChallenge.prompt }}</p>
              <div class="lm-options">
                <button
                  *ngFor="let opt of currentLabChallenge.options; let idx = index"
                  class="lm-opt-btn"
                  [class.correct]="labChallengeSelected === idx && idx === currentLabChallenge.correctIndex"
                  [class.wrong]="labChallengeSelected === idx && idx !== currentLabChallenge.correctIndex"
                  (click)="verifyLabChallenge(idx)"
                >
                  {{ opt }}
                </button>
              </div>
              <div *ngIf="labChallengeFeedback" class="lm-feedback" [class.ok]="labChallengeSuccess">
                {{ labChallengeFeedback }}
              </div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             PESTAÑA 3: PRÁCTICA GUIADA DE TPs EN 6 PASOS (DE MENOR A MAYOR DIFICULTAD)
             ================================================================ -->
        <div *ngIf="activeTab === 'practica'" class="tab-pane">

          <!-- BANNER PARA INGRESAR TUS PROPIOS PRÁCTICOS O USAR LA CALCULADORA CIENTÍFICA -->
          <div class="cielo-lavender-card" style="padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            <div>
              <span style="background: #191538; color: #fde047; font-weight: 900; font-size: 0.72rem; padding: 3px 10px; border-radius: 99px;">
                ✨ RESOLVÉ TUS PROPIOS EJERCICIOS Y USÁ LA CALCULADORA CIENTÍFICA
              </span>
              <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #191538; margin: 4px 0 2px 0;">
                ¿Tenés un ejercicio propio de tu guía o querés convertir unidades (cm a m, pF a nF)?
              </h3>
              <p style="margin: 0; font-size: 0.86rem; font-weight: 700; color: #362f63;">
                Los trabajos prácticos de abajo están ordenados de <strong>Menor Dificultad a Mayor Dificultad</strong>. También podés ingresar cualquier práctico propio:
              </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="cielo-btn-purple" (click)="openCalculatorPage()">
                📝 Ingresar Mi Propio Ejercicio / Abrir Calculadora →
              </button>
              <button class="cielo-btn-purple" style="background: linear-gradient(180deg, #10b981, #059669);" (click)="openProfessorForCurrentUnit()">
                👩‍🏫 Ver al Profesor Resolver con Voz
              </button>
            </div>
          </div>

          <div class="cyber-glass-card inner-card">
            <div class="section-head-flex">
              <div>
                <span class="kicker-cyan">ETAPA C • TRABAJOS PRÁCTICOS GRADUADOS DE MENOR A MAYOR DIFICULTAD</span>
                <h2 class="pane-title">Resolución Guiada en 6 Pasos — Unidad {{ selectedUnitNumber }}</h2>
              </div>
              <div class="topic-selector-pills" *ngIf="unitExercises.length > 0">
                <button
                  *ngFor="let ex of unitExercises; let idx = index"
                  class="sub-pill"
                  [class.active]="selectedExerciseIndex === idx"
                  (click)="selectExercise(idx)"
                >
                  {{ getDifficultyOrderLabel(ex.difficulty, idx) }} • {{ ex.tpReference }}
                </button>
              </div>
            </div>

            <div *ngIf="currentExercise as ex" class="exercise-6steps-wrapper">
              <!-- Enunciado y Datos -->
              <div class="ex-statement-box">
                <div class="ex-badges">
                  <span class="badge-official">{{ ex.tpReference }}</span>
                  <span class="badge-pdf">📄 {{ ex.sourcePdf }}</span>
                  <span class="chip-violet">Dificultad: {{ ex.difficulty | uppercase }}</span>
                </div>
                <h3>{{ ex.title }}</h3>
                <p class="ex-text">{{ ex.statement }}</p>
                <div class="given-data-pills">
                  <span class="gd-pill" *ngFor="let d of ex.givenData">📌 {{ d }}</span>
                </div>
              </div>

              <!-- Barra de progreso de los 6 pasos -->
              <div class="steps-indicator-bar">
                <button
                  *ngFor="let sNum of [1, 2, 3, 4, 5, 6]"
                  class="step-tab-pill"
                  [class.active]="currentExerciseStep === sNum"
                  [class.completed]="completedExerciseSteps[sNum]"
                  (click)="currentExerciseStep = sNum"
                >
                  Paso {{ sNum }} {{ completedExerciseSteps[sNum] ? '✓' : '' }}
                </button>
              </div>

              <!-- PASO 1, 2, 3, 4: Preguntas interactivas de razonamiento -->
              <div class="step-active-panel" *ngIf="currentExerciseStep <= 4 && currentStepQuestion as sq">
                <div class="step-kicker">{{ getStepTitle(currentExerciseStep) }}</div>
                <h4 class="step-prompt">{{ sq.prompt }}</h4>

                <div class="mcq-options-stack">
                  <button
                    *ngFor="let opt of sq.options; let idx = index"
                    class="cyber-opt-btn"
                    [class.correct]="stepSelectedOption === idx && idx === sq.correctIndex"
                    [class.wrong]="stepSelectedOption === idx && idx !== sq.correctIndex"
                    (click)="answerExerciseStep(idx, sq, ex)"
                  >
                    <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                    <span class="opt-txt" [innerHTML]="renderMath(opt)"></span>
                  </button>
                </div>

                <div *ngIf="stepFeedback" class="step-feedback-box" [class.ok]="stepIsCorrect">
                  <strong>{{ stepIsCorrect ? '✅ ¡Paso Correcto!' : '⚠️ Error de Planteo (Registrado en Mis Errores):' }}</strong>
                  <p>{{ stepFeedback }}</p>
                  <button *ngIf="stepIsCorrect && currentExerciseStep < 6" class="cyber-btn-cyan-sm" (click)="currentExerciseStep = currentExerciseStep + 1; stepSelectedOption = null; stepFeedback = null">
                    Avanzar al Paso {{ currentExerciseStep + 1 }} →
                  </button>
                </div>
              </div>

              <!-- PASO 5: Desarrollo Matemático Línea por Línea y Fórmula Final -->
              <div class="step-active-panel" *ngIf="currentExerciseStep === 5">
                <div class="step-kicker">PASO 5 • DESARROLLO MATEMÁTICO Y RESULTADO SIMBÓLICO / NUMÉRICO</div>
                <h4>Álgebra Línea por Línea en Hoja de Examen</h4>

                <div class="blackboard-steps">
                  <div class="bb-step-row" *ngFor="let line of ex.step5LineByLine.algebraicSteps; let lIdx = index">
                    <span class="bb-step-badge">Línea {{ lIdx + 1 }}</span>
                    <div class="bb-step-text" [innerHTML]="renderMath(line)"></div>
                  </div>
                </div>

                <div class="final-results-grid">
                  <div class="fr-box">
                    <span class="fr-lbl">Expresión Simbólica Final:</span>
                    <div class="cyber-formula-display" [innerHTML]="renderMath(ex.step5LineByLine.finalSymbolicFormula, true)"></div>
                  </div>
                  <div class="fr-box">
                    <span class="fr-lbl">Valor Numérico y Unidad SI:</span>
                    <div class="cyber-formula-display">{{ ex.step5LineByLine.finalNumericalValue }} [{{ ex.step5LineByLine.expectedUnit }}]</div>
                  </div>
                </div>

                <button class="cyber-btn-primary" style="margin-top: 14px;" (click)="completedExerciseSteps[5] = true; currentExerciseStep = 6">
                  ✓ Comprendido el Desarrollo — Ir al Paso 6 (Verificación de Límites) →
                </button>
              </div>

              <!-- PASO 6: Verificación Dimensional, Casos Límite y "¿Qué pasa si...?" -->
              <div class="step-active-panel" *ngIf="currentExerciseStep === 6">
                <div class="step-kicker">PASO 6 • VERIFICACIÓN DIMENSIONAL, LÍMITES Y VARIACIONES DE EXAMEN</div>
                <h4 class="step-prompt">{{ ex.step6Verification.question.prompt }}</h4>

                <div class="mcq-options-stack">
                  <button
                    *ngFor="let opt of ex.step6Verification.question.options; let idx = index"
                    class="cyber-opt-btn"
                    [class.correct]="stepSelectedOption === idx && idx === ex.step6Verification.question.correctIndex"
                    [class.wrong]="stepSelectedOption === idx && idx !== ex.step6Verification.question.correctIndex"
                    (click)="answerExerciseStep(idx, ex.step6Verification.question, ex)"
                  >
                    <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                    <span class="opt-txt" [innerHTML]="renderMath(opt)"></span>
                  </button>
                </div>

                <div class="fa-two-cols" style="margin-top: 16px;">
                  <div class="fa-rule-box ok">
                    <strong>📐 Análisis Dimensional:</strong>
                    <p>{{ ex.step6Verification.dimensionalAnalysisNote }}</p>
                  </div>
                  <div class="fa-rule-box ok">
                    <strong>🔭 Caso Límite Asintótico:</strong>
                    <p>{{ ex.step6Verification.limitingCaseNote }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CAZATRAMPAS DE PARCIAL DE ESTA UNIDAD -->
          <div class="cyber-glass-card inner-card" *ngIf="unitTrapQuestions.length > 0">
            <span class="kicker-cyan">ENTRENAMIENTO DE OJO CLÍNICO</span>
            <h2 class="pane-title">🎯 Cazatrampas de Parcial — Unidad {{ selectedUnitNumber }}</h2>

            <div class="trap-card" *ngFor="let tq of unitTrapQuestions">
              <div class="ex-badges">
                <span class="badge-pdf">{{ tq.sourceReference }}</span>
                <span class="chip-violet">Palabra sospechosa: "{{ tq.palabraSospechosa }}"</span>
              </div>
              <h4>{{ tq.question }}</h4>
              <div class="mcq-options-stack">
                <button
                  *ngFor="let opt of tq.options; let idx = index"
                  class="cyber-opt-btn"
                  [class.correct]="trapAnswers[tq.id] === idx && idx === tq.correctIndex"
                  [class.wrong]="trapAnswers[tq.id] === idx && idx !== tq.correctIndex"
                  (click)="answerTrapQuestion(tq, idx)"
                >
                  <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                  <span class="opt-txt">{{ opt }}</span>
                </button>
              </div>
              <div class="trap-reveal" *ngIf="trapAnswers[tq.id] !== undefined">
                <p><strong>🕵️ ¿Cuál era la trampa?:</strong> {{ tq.cualEraLaTrampa }}</p>
                <p><strong>💡 Cómo reconocerla en el examen:</strong> {{ tq.comoReconocerEnExamen }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             PESTAÑA 4: MULTIPLE CHOICE — 7 NIVELES (63 PREGUNTAS ORIGINALES)
             ================================================================ -->
        <div *ngIf="activeTab === 'mcq'" class="tab-pane">
          <div class="cyber-glass-card inner-card">
            <div class="section-head-flex">
              <div>
                <span class="kicker-cyan">ETAPA D • MOTOR DE EVALUACIÓN GRADUADA (63 PREGUNTAS)</span>
                <h2 class="pane-title">Multiple Choice en 7 Niveles — Unidad {{ selectedUnitNumber }}</h2>
                <p class="pane-desc">
                  Seleccioná el nivel de dificultad desde Fácil hasta Nivel Coloquio. Las respuestas correctas acreditan dominio real; los errores se registran automáticamente en Mis Errores con desglose de distractores.
                </p>
              </div>
            </div>

            <!-- Barra de los 7 Niveles -->
            <div class="seven-levels-bar">
              <button
                *ngFor="let lvl of sevenLevels; let idx = index"
                class="level-pill-btn"
                [class.active]="selectedMcqLevel === lvl.key"
                [class.passed]="isLevelPassed(lvl.key)"
                (click)="selectMcqLevel(lvl.key)"
              >
                <span class="lvl-num">Nivel {{ idx + 1 }}</span>
                <span class="lvl-name">{{ lvl.label }} {{ isLevelPassed(lvl.key) ? '✓' : '' }}</span>
              </button>
            </div>

            <!-- Tarjeta de la Pregunta Activa -->
            <div *ngIf="currentMcqQuestion as q" class="mcq-active-card">
              <div class="mcq-meta-header">
                <div class="ex-badges">
                  <span class="chip-cyan">UNIDAD {{ q.unitNumber }}</span>
                  <span class="chip-violet">NIVEL: {{ q.level | uppercase }}</span>
                  <span class="badge-pdf">Tema: {{ q.topic }}</span>
                </div>
                <button class="mini-step-btn ghost" (click)="showMcqHint = !showMcqHint">
                  {{ showMcqHint ? 'Ocultar Pista' : '💡 Ver Pista y Fórmula' }}
                </button>
              </div>

              <!-- Pista Opcional -->
              <div *ngIf="showMcqHint" class="mcq-hint-box">
                <div><strong>💡 Pista Pedagógica:</strong> {{ q.hint }}</div>
                <div *ngIf="q.formulaUsed" style="margin-top: 6px;">
                  <strong>Fórmula vinculada:</strong> <span [innerHTML]="renderMath(q.formulaUsed)"></span>
                </div>
              </div>

              <h3 class="mcq-question-prompt">{{ q.question }}</h3>

              <!-- Opciones -->
              <div class="mcq-options-stack">
                <button
                  *ngFor="let opt of q.options; let idx = index"
                  class="cyber-opt-btn"
                  [disabled]="mcqAnswered"
                  [class.correct]="mcqAnswered && idx === q.correctIndex"
                  [class.wrong]="mcqAnswered && mcqSelectedOption === idx && idx !== q.correctIndex"
                  (click)="submitMcqAnswer(q, idx)"
                >
                  <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                  <span class="opt-txt" [innerHTML]="renderMath(opt)"></span>
                </button>
              </div>

              <!-- Evaluación y Desglose de Distractores tras responder -->
              <div *ngIf="mcqAnswered" class="mcq-explanation-panel" [class.ok]="mcqIsCorrect">
                <div class="mep-verdict">
                  <strong>
                    {{ mcqIsCorrect ? '🎉 ¡Respuesta Correcta! (+15% Dominio Acreditado)' : '❌ Respuesta Incorrecta (Error registrado en Mis Errores para repaso)' }}
                  </strong>
                </div>
                <p class="mep-main-exp">{{ q.explanation }}</p>

                <div class="distractors-box" *ngIf="q.distractorAnalysis && q.distractorAnalysis.length">
                  <h5>🔍 Análisis Detallado de Cada Opción:</h5>
                  <div class="dist-row" *ngFor="let dText of q.distractorAnalysis; let dIdx = index">
                    <span class="dist-badge" [class.is-right]="dIdx === q.correctIndex">
                      Opción {{ ['A', 'B', 'C', 'D'][dIdx] }}
                    </span>
                    <span>{{ dText }}</span>
                  </div>
                </div>

                <div class="mep-actions">
                  <button *ngIf="!mcqIsCorrect" class="cyber-btn-secondary" (click)="resetCurrentMcq()">
                    🔄 Intentar Nuevamente
                  </button>
                  <button class="cyber-btn-primary" (click)="goToNextMcqLevel()">
                    Siguiente Nivel de Dificultad →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             PESTAÑA 5: ENTRENAMIENTO ORAL & CONEXIÓN CON TRIBUNAL
             ================================================================ -->
        <div *ngIf="activeTab === 'oral'" class="tab-pane">
          <div class="cyber-glass-card inner-card">
            <div class="section-head-flex">
              <div>
                <span class="kicker-cyan">PREPARACIÓN PARA DEFENSA EN PIZARRÓN</span>
                <h2 class="pane-title">Entrenamiento Oral y Coloquio — Unidad {{ selectedUnitNumber }}</h2>
                <p class="pane-desc">
                  Practicá las preguntas conceptuales, instrucciones de dibujo en pizarrón y repreguntas antes de pasar al Tribunal Evaluador en Vivo.
                </p>
              </div>
              <button class="cyber-btn-primary" (click)="openTribunalForCurrentUnit()">
                🎙️ Rendir Unidad {{ selectedUnitNumber }} en Tribunal Oral en Vivo →
              </button>
            </div>

            <!-- Tarjetas de Coloquio Oficiales de la Unidad -->
            <div class="oral-cards-stack">
              <div class="oral-prep-card" *ngFor="let oq of unitOralQuestions">
                <div class="ex-badges">
                  <span class="badge-official">PREGUNTA DE MESA EXAMINADORA</span>
                  <span class="chip-violet">Nivel: {{ oq.difficulty | uppercase }}</span>
                </div>
                <h3 class="oral-q-title">"{{ oq.question }}"</h3>

                <div class="oral-repregunta-box">
                  <strong>👨‍🏫 Repregunta "¿Qué pasa si...?" del Tribunal:</strong>
                  <p>"{{ oq.followUpWhatIf }}"</p>
                </div>

                <div class="fa-two-cols">
                  <div class="fa-rule-box ok">
                    <strong>🖍️ Esquema Obligatorio en el Pizarrón:</strong>
                    <p>{{ oq.boardDrawingInstruction }}</p>
                  </div>
                  <div class="fa-rule-box ok">
                    <strong>⚖️ Fórmula Central y Condiciones:</strong>
                    <div class="cyber-formula-display" [innerHTML]="renderMath(oq.expectedFormula)"></div>
                    <p style="margin-top: 6px; font-size: 0.78rem;">Unidades: {{ oq.expectedUnits }} • Validez: {{ oq.expectedConditions }}</p>
                  </div>
                </div>

                <div class="given-data-pills" style="margin: 10px 0;">
                  <span class="gd-pill" *ngFor="let kc of oq.expectedKeyConcepts">🔑 {{ kc }}</span>
                </div>

                <!-- Práctica de redacción / voz antes de revelar respuesta modelo -->
                <div class="oral-self-test">
                  <textarea
                    rows="3"
                    [(ngModel)]="oralDrafts[oq.id]"
                    placeholder="Escribí aquí tu argumento de defensa antes de ver la respuesta modelo de la cátedra..."
                    class="cyber-textarea"
                  ></textarea>
                  <div class="oral-actions-bar">
                    <button class="cyber-btn-secondary" (click)="oralRevealed[oq.id] = !oralRevealed[oq.id]">
                      {{ oralRevealed[oq.id] ? 'Ocultar Respuesta Modelo' : '👁️ Comparar con Respuesta Modelo de Cátedra' }}
                    </button>
                    <button
                      class="cyber-btn-emerald"
                      [disabled]="isActivityDone('pruebaDominio', oq.id) || !(oralDrafts[oq.id]?.length >= 25)"
                      (click)="completeVerifiedActivity('pruebaDominio', oq.id, 25)"
                    >
                      {{ isActivityDone('pruebaDominio', oq.id) ? '✓ Defensa Oral Acreditada' : 'Acreditar Defensa Oral (+25% Dominio)' }}
                    </button>
                  </div>
                </div>

                <div *ngIf="oralRevealed[oq.id]" class="catedra-model-answer">
                  <strong>🏆 Respuesta Modelo Oficial de la Cátedra UNdeC:</strong>
                  <p>{{ oq.catedraModelAnswer }}</p>
                </div>
              </div>
            </div>

            <!-- Preguntas extra de Tribunal de Deep Theory -->
            <div *ngIf="currentDeepTheory?.tribunalQuestions?.length" style="margin-top: 22px;">
              <h3 class="pane-title" style="font-size: 1.1rem; margin-bottom: 12px;">⚡ Preguntas Capciosas Frecuentes en el Final Oral</h3>
              <div class="deep-concepts-grid">
                <div class="deep-concept-box" *ngFor="let tq of currentDeepTheory?.tribunalQuestions">
                  <h4>❓ {{ tq.question }}</h4>
                  <p><strong>Respuesta fundamentada:</strong> {{ tq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .hub-container {
      max-width: 1240px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .u-toolbar-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 0.95rem;
    }
    .u-toolbar-badge {
      background: rgba(0, 242, 254, 0.16);
      border: 1px solid #00f2fe;
      color: #00f2fe;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 2px 10px;
      border-radius: 99px;
    }

    /* BANNER LAVANDA ILUSTRADO DE LA UNIDAD */
    .unit-illustrated-banner {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 140px 1fr 125px;
      align-items: center;
      gap: 18px;
    }
    @media (max-width: 820px) {
      .unit-illustrated-banner {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
      }
    }
    .uib-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }
    .uib-pill-purple {
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .uib-pill-status {
      background: #ffd166;
      border: 2px solid #1b1438;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .uib-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #191538;
      margin: 2px 0;
      line-height: 1.1;
    }
    .uib-sub {
      font-size: 0.96rem;
      font-weight: 700;
      color: #2d2459;
      margin: 0;
    }
    .uib-pct-circle {
      width: 108px;
      height: 108px;
      border-radius: 50%;
      background: #1b224b;
      border: 4px solid #7c5dfa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(27, 20, 56, 0.35);
    }
    .uib-pct-val {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.85rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
    }
    .uib-pct-lbl {
      font-size: 0.72rem;
      font-weight: 800;
      color: #d7c6ff;
      text-transform: uppercase;
    }

    /* LAS 5 TARJETAS ILUSTRADAS DE SECCIÓN */
    .five-illustrated-tabs {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
    @media (max-width: 980px) {
      .five-illustrated-tabs { grid-template-columns: repeat(2, 1fr); }
    }
    .illo-tab-card {
      background: linear-gradient(180deg, #1d2552 0%, #141a3b 100%);
      border: 2.5px solid rgba(167, 142, 252, 0.36);
      border-radius: 22px;
      padding: 12px 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .illo-tab-card:hover {
      transform: translateY(-3px);
      border-color: #c8b6ff;
    }
    .illo-tab-card.active {
      background: linear-gradient(180deg, #f0ebff 0%, #d8c8ff 100%);
      border: 3px solid #9d7eff;
      box-shadow: 0 12px 26px -4px rgba(140, 109, 247, 0.55);
    }
    .itc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.98rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
    }
    .illo-tab-card.active .itc-title {
      color: #191538;
    }
    .itc-sub {
      font-size: 0.74rem;
      font-weight: 700;
      color: #b8c2e6;
    }
    .illo-tab-card.active .itc-sub {
      color: #3a306b;
    }

    /* SELECTOR DE UNIDADES CON ILUSTRACIONES PROPIAS */
    .unit-selector-panel {
      padding: 20px;
    }
    .unit-pills-bar {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    @media (max-width: 960px) {
      .unit-pills-bar {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .u-pill-btn {
      background: linear-gradient(180deg, #1d2552 0%, #141a3b 100%);
      border: 2.5px solid rgba(167, 142, 252, 0.36);
      border-radius: 22px;
      padding: 10px 6px;
      color: #e2e8f0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
      box-shadow: 0 10px 22px -6px rgba(4, 6, 18, 0.65);
    }
    .u-pill-btn:hover {
      border-color: #c8b6ff;
      transform: translateY(-3px);
    }
    .u-pill-btn.active {
      background: linear-gradient(180deg, #f0ebff 0%, #d8c8ff 100%);
      border: 3px solid #9d7eff;
      color: #191538;
      box-shadow: 0 14px 28px -4px rgba(140, 109, 247, 0.6);
    }
    .u-pill-btn.certified {
      border-color: #38e595;
    }
    .up-num { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 0.92rem; line-height: 1.1; }
    .up-pct { font-size: 0.72rem; font-weight: 700; color: #c4b5fd; text-align: center; }
    .u-pill-btn.active .up-pct { color: #3b306b; }

    .unit-hero-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .uh-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .chip-cyan {
      background: rgba(0, 242, 254, 0.14);
      border: 1px solid rgba(0, 242, 254, 0.4);
      color: #00f2fe;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 99px;
    }
    .chip-violet {
      background: rgba(124, 58, 237, 0.25);
      border: 1px solid rgba(167, 139, 250, 0.45);
      color: #ddd6fe;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 99px;
    }
    .chip-status {
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fcd34d;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 99px;
    }
    .chip-status.ok {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      color: #34d399;
    }
    .uh-title {
      font-size: 1.55rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 4px 0;
    }
    .uh-subtitle {
      font-size: 0.88rem;
      color: #94a3b8;
      margin: 0;
    }
    .uh-mastery-box {
      background: rgba(8, 12, 28, 0.8);
      border: 1px solid rgba(0, 242, 254, 0.4);
      border-radius: 16px;
      padding: 12px 20px;
      text-align: center;
    }
    .uh-mastery-num {
      font-family: var(--font-mono);
      font-size: 1.8rem;
      font-weight: 800;
      color: #00f2fe;
    }
    .uh-mastery-lbl {
      font-size: 0.68rem;
      color: #cbd5e1;
      text-transform: uppercase;
      font-weight: 700;
    }

    /* 4 PILARES */
    .four-pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 16px;
    }
    @media (max-width: 768px) {
      .four-pillars-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .pillar-card {
      background: rgba(8, 12, 28, 0.68);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .pillar-card.active-pillar {
      border-color: #00f2fe;
      background: rgba(0, 242, 254, 0.08);
    }
    .p-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.74rem;
      font-weight: 700;
      color: #cbd5e1;
    }
    .p-weight { color: #94a3b8; font-family: var(--font-mono); }
    .p-val {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      font-weight: 800;
      margin: 4px 0 6px 0;
    }
    .p-val.cyan { color: #00f2fe; }
    .p-val.violet { color: #c4b5fd; }
    .p-val.emerald { color: #34d399; }
    .p-val.pink { color: #fb7185; }

    .cyber-bar-track {
      width: 100%;
      height: 6px;
      background: rgba(15, 23, 42, 0.9);
      border-radius: 99px;
      overflow: hidden;
    }
    .cyber-bar-fill { height: 100%; border-radius: 99px; transition: width 0.4s; }
    .cyan-fill { background: linear-gradient(90deg, #0284c7, #00f2fe); }
    .violet-fill { background: linear-gradient(90deg, #6d28d9, #a78bfa); }
    .emerald-fill { background: linear-gradient(90deg, #059669, #34d399); }
    .pink-fill { background: linear-gradient(90deg, #db2777, #f43f5e); }

    /* BARRA DE 5 SECCIONES */
    .five-tabs-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: rgba(11, 17, 38, 0.88);
      border: 1px solid rgba(167, 139, 250, 0.28);
      padding: 6px;
      border-radius: 16px;
    }
    .tab-nav-btn {
      flex: 1;
      min-width: 170px;
      background: transparent;
      border: 1px solid transparent;
      color: #94a3b8;
      padding: 11px 14px;
      border-radius: 12px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab-nav-btn:hover { color: #ffffff; background: rgba(124, 58, 237, 0.15); }
    .tab-nav-btn.active {
      background: linear-gradient(135deg, rgba(109, 40, 217, 0.65), rgba(2, 132, 199, 0.55));
      border-color: #00f2fe;
      color: #ffffff;
      box-shadow: 0 4px 16px -4px rgba(0, 242, 254, 0.35);
    }

    .tab-pane {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .inner-card {
      padding: 24px;
    }
    .section-head-flex {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 18px;
    }
    .kicker-cyan {
      font-size: 0.68rem;
      font-weight: 800;
      color: #00f2fe;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      display: block;
    }
    .pane-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin: 3px 0 0 0;
    }
    .pane-desc {
      font-size: 0.86rem;
      color: #94a3b8;
      margin: 6px 0 0 0;
      max-width: 760px;
    }
    .topic-selector-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .sub-pill {
      background: rgba(8, 12, 28, 0.8);
      border: 1px solid rgba(167, 139, 250, 0.35);
      color: #cbd5e1;
      padding: 7px 14px;
      border-radius: 10px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
    }
    .sub-pill.active {
      background: rgba(0, 242, 254, 0.18);
      border-color: #00f2fe;
      color: #00f2fe;
    }

    /* TEORÍA EDITORIAL ILUSTRADA (11 PUNTOS) */
    .topic-banner {
      background: linear-gradient(145deg, #efeaff 0%, #dcd0ff 100%);
      border: 3px solid #9d7eff;
      border-radius: 26px;
      padding: 20px 24px;
      margin-bottom: 20px;
      color: #191538;
      box-shadow: 0 12px 28px -6px rgba(8, 10, 28, 0.55);
    }
    .tb-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .badge-official {
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 12px;
      border-radius: 99px;
    }
    .badge-pdf {
      background: #ffd166;
      border: 2px solid #1b1438;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 12px;
      border-radius: 99px;
    }
    .topic-main-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: #191538;
      margin: 4px 0 10px 0;
    }
    .catedra-convention {
      font-size: 0.9rem;
      font-weight: 600;
      color: #241c4c;
      background: rgba(255, 255, 255, 0.65);
      padding: 12px 16px;
      border-radius: 16px;
      border: 2px solid #9d7eff;
    }

    .eleven-points-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 820px) {
      .eleven-points-grid { grid-template-columns: 1fr; }
    }
    .point-box {
      background: linear-gradient(180deg, #212a5e 0%, #171e45 100%);
      border: 2.5px solid rgba(183, 158, 255, 0.36);
      border-radius: 24px;
      padding: 18px 20px;
      box-shadow: 0 10px 24px -6px rgba(4, 6, 18, 0.55);
    }
    .point-box.full-span {
      grid-column: 1 / -1;
      background: linear-gradient(145deg, #efeaff 0%, #dcd0ff 100%);
      border: 3px solid #9d7eff;
      color: #191538;
    }
    .point-box.full-span h4, .point-box.full-span p, .point-box.full-span .pt-num {
      color: #191538 !important;
    }
    .point-box.emerald-border { border-color: #38e595; background: linear-gradient(180deg, rgba(16, 185, 129, 0.16), #171e45); }
    .point-box.danger-border { border-color: #ff5d73; background: linear-gradient(180deg, rgba(255, 93, 115, 0.16), #171e45); }
    .point-box.warning-border { border-color: #ffd166; background: linear-gradient(180deg, rgba(255, 209, 102, 0.14), #171e45); }
    .point-box.cyan-border { border-color: #9d7eff; }

    .pt-num {
      display: inline-block;
      background: rgba(157, 126, 255, 0.25);
      border: 1.5px solid rgba(196, 173, 255, 0.45);
      padding: 2px 12px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      color: #e2d6ff;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    .emerald-txt { color: #38e595 !important; }
    .danger-txt { color: #ff8fab !important; }
    .warning-txt { color: #ffd166 !important; }
    .cyan-txt { color: #c4b5fd !important; }
    .violet-txt { color: #e2d6ff !important; }

    .point-box h4 {
      margin: 0 0 8px 0;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffffff;
    }
    .point-box p {
      margin: 0;
      font-size: 0.92rem;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .clean-list {
      margin: 0;
      padding-left: 18px;
      font-size: 0.9rem;
      color: #e2e8f0;
      line-height: 1.55;
    }
    .clean-list li { margin-bottom: 6px; }
    .symbols-mini-table {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sym-row {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(15, 19, 46, 0.85);
      border: 1.5px solid rgba(183, 158, 255, 0.28);
      padding: 8px 12px;
      border-radius: 14px;
      font-size: 0.86rem;
    }
    .sym-code {
      min-width: 60px;
      color: #ffd166;
      font-weight: 800;
    }
    .sym-desc { color: #e2e8f0; }

    .checkpoint-verify-bar {
      margin-top: 20px;
      background: linear-gradient(90deg, rgba(56, 229, 149, 0.18), rgba(140, 109, 247, 0.22));
      border: 2.5px solid #38e595;
      border-radius: 22px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 0.92rem;
    }
    .checkpoint-verify-bar span {
      display: block;
      color: #e2e8f0;
      font-size: 0.84rem;
      margin-top: 2px;
    }

    /* DEMOSTRACIONES EN PIZARRÓN VERDE CON MARCO DE MADERA ILUSTRADO */
    .derivations-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 16px;
    }
    .derivation-card {
      background: linear-gradient(160deg, #1b4332 0%, #112a20 100%);
      border: 7px solid #d97706;
      border-radius: 28px;
      padding: 22px;
      box-shadow:
        0 16px 36px rgba(0, 0, 0, 0.65),
        inset 0 0 28px rgba(0, 0, 0, 0.45);
    }
    .deriv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 2px dashed rgba(255, 255, 255, 0.25);
    }
    .deriv-header h3 {
      margin: 0;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.28rem;
      color: #ffd166;
    }
    .deriv-controls {
      display: flex;
      gap: 8px;
    }
    .mini-step-btn {
      background: #ffd166;
      border: 2px solid #1b1438;
      color: #191538;
      padding: 7px 14px;
      border-radius: 12px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      cursor: pointer;
    }
    .mini-step-btn.ghost {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.45);
      color: #ffffff;
    }
    .blackboard-steps {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .bb-step-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: rgba(12, 32, 23, 0.78);
      border: 1.5px solid rgba(255, 255, 255, 0.22);
      border-left: 5px solid #ffd166;
      padding: 12px 16px;
      border-radius: 14px;
    }
    .bb-step-badge {
      background: #7c5dfa;
      border: 1.5px solid #ffffff;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 10px;
      border-radius: 99px;
      white-space: nowrap;
    }
    .bb-step-text {
      font-size: 0.94rem;
      color: #fffbeb;
      line-height: 1.55;
    }
    .deriv-significance {
      margin-top: 14px;
      font-size: 0.88rem;
      color: #191538;
      font-weight: 700;
      background: linear-gradient(90deg, #efeaff, #dcd0ff);
      border: 2px solid #9d7eff;
      padding: 12px 16px;
      border-radius: 16px;
    }

    .deep-concepts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
      margin-top: 16px;
    }
    .deep-concept-box {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(167, 139, 250, 0.25);
      border-radius: 14px;
      padding: 14px;
    }
    .deep-concept-box h4 {
      margin: 0 0 6px 0;
      color: #c4b5fd;
      font-size: 0.95rem;
    }
    .deep-concept-box p {
      margin: 0;
      font-size: 0.82rem;
      color: #cbd5e1;
      line-height: 1.5;
    }

    /* TRADUCTOR DE FÓRMULAS */
    .formula-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-top: 14px;
    }
    .formula-anatomizer-card {
      background: rgba(8, 12, 28, 0.75);
      border: 1px solid rgba(167, 139, 250, 0.28);
      border-radius: 16px;
      padding: 18px;
    }
    .fa-header h3 {
      margin: 6px 0 10px 0;
      color: #ffffff;
      font-size: 1.1rem;
    }
    .large-formula {
      font-size: 1.15rem;
      text-align: center;
      margin-bottom: 12px;
    }
    .fa-interp {
      font-size: 0.85rem;
      color: #cbd5e1;
      margin-bottom: 12px;
    }
    .fa-two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 14px;
    }
    @media (max-width: 700px) {
      .fa-two-cols { grid-template-columns: 1fr; }
    }
    .fa-rule-box {
      padding: 12px;
      border-radius: 12px;
      font-size: 0.82rem;
    }
    .fa-rule-box.ok {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #d1fae5;
    }
    .fa-rule-box.no {
      background: rgba(244, 63, 94, 0.1);
      border: 1px solid rgba(244, 63, 94, 0.35);
      color: #ffe4e6;
    }
    .fa-rule-box p { margin: 4px 0 0 0; line-height: 1.45; }

    .fa-symbols-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 10px;
      margin-bottom: 14px;
    }
    .fa-sym-item {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px;
    }
    .fas-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .fas-symbol { color: #00f2fe; font-weight: 800; font-size: 1rem; }
    .fas-unit {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      background: rgba(0, 242, 254, 0.12);
      color: #7dd3fc;
      padding: 2px 6px;
      border-radius: 6px;
    }
    .fas-name { font-weight: 800; font-size: 0.82rem; color: #ffffff; }
    .fas-meaning { font-size: 0.75rem; color: #94a3b8; margin: 3px 0; }
    .fas-err { font-size: 0.72rem; color: #fda4af; }
    .fa-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.8rem;
      color: #cbd5e1;
    }

    /* LABORATORIO GRÁFICO */
    .lab-live-badge {
      background: rgba(16, 185, 129, 0.16);
      border: 1px solid #10b981;
      color: #34d399;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 99px;
    }
    .lab-workbench-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 18px;
      align-items: stretch;
    }
    @media (max-width: 960px) {
      .lab-workbench-grid { grid-template-columns: 1fr; }
    }
    .lab-controls-panel {
      background: rgba(8, 12, 28, 0.78);
      border: 1px solid rgba(167, 139, 250, 0.28);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
    }
    .lab-controls-panel h3 {
      margin: 0;
      font-size: 0.98rem;
      color: #ffffff;
    }
    .control-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .ctrl-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      color: #cbd5e1;
      margin-bottom: 6px;
    }
    .cyber-slider {
      width: 100%;
      accent-color: #00f2fe;
      cursor: pointer;
    }
    .toggle-pair {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .lab-telemetry-readout {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(0, 242, 254, 0.35);
      border-radius: 12px;
      padding: 12px;
    }
    .ltr-title {
      font-size: 0.68rem;
      font-weight: 800;
      color: #00f2fe;
      margin-bottom: 8px;
      letter-spacing: 0.06em;
    }
    .ltr-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      color: #cbd5e1;
      margin-bottom: 4px;
      font-family: var(--font-mono);
    }
    .lab-canvas-stage {
      background: rgba(8, 12, 28, 0.85);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: 16px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lab-svg {
      width: 100%;
      height: auto;
      max-height: 340px;
      display: block;
    }
    .lab-mission-card {
      margin-top: 18px;
      background: rgba(16, 24, 52, 0.85);
      border: 1px solid rgba(0, 242, 254, 0.4);
      border-radius: 16px;
      padding: 18px;
    }
    .lm-header h4 { margin: 6px 0 8px 0; color: #ffffff; }
    .lm-prompt { font-size: 0.88rem; color: #e2e8f0; margin-bottom: 12px; }
    .lm-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }
    .lm-opt-btn {
      background: rgba(8, 12, 28, 0.85);
      border: 1px solid rgba(167, 139, 250, 0.35);
      color: #f1f5f9;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 700;
      text-align: left;
      cursor: pointer;
    }
    .lm-opt-btn.correct { border-color: #10b981; background: rgba(16, 185, 129, 0.22); color: #a7f3d0; }
    .lm-opt-btn.wrong { border-color: #f43f5e; background: rgba(244, 63, 94, 0.22); color: #fecdd3; }
    .lm-feedback {
      margin-top: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 0.82rem;
      background: rgba(244, 63, 94, 0.15);
      color: #fecdd3;
    }
    .lm-feedback.ok {
      background: rgba(16, 185, 129, 0.16);
      color: #a7f3d0;
    }

    /* PRÁCTICA 6 PASOS (HOJA DE EXAMEN LAVANDA) & MULTIPLE CHOICE 7 NIVELES */
    .ex-statement-box {
      background: linear-gradient(145deg, #efeaff 0%, #dcd0ff 100%);
      border: 3px solid #9d7eff;
      border-radius: 26px;
      padding: 22px;
      margin-bottom: 18px;
      color: #191538;
      box-shadow: 0 12px 28px -6px rgba(8, 10, 28, 0.55);
    }
    .ex-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .ex-statement-box h3 {
      margin: 0 0 8px 0;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.45rem;
      color: #191538;
    }
    .ex-text { font-size: 0.96rem; font-weight: 600; color: #241c4c; line-height: 1.6; }
    .given-data-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .gd-pill {
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 12px;
    }
    .steps-indicator-bar {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    @media (max-width: 680px) {
      .steps-indicator-bar { grid-template-columns: repeat(3, 1fr); }
    }
    .step-tab-pill {
      background: linear-gradient(180deg, #212a5e 0%, #171e45 100%);
      border: 2.5px solid rgba(183, 158, 255, 0.36);
      color: #d8def8;
      padding: 10px;
      border-radius: 16px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .step-tab-pill.active {
      background: linear-gradient(180deg, #efeaff 0%, #d8c8ff 100%);
      border-color: #9d7eff;
      color: #191538;
      box-shadow: 0 8px 20px -4px rgba(140, 109, 247, 0.55);
    }
    .step-tab-pill.completed {
      border-color: #38e595;
      color: #38e595;
    }
    .step-active-panel {
      background: linear-gradient(180deg, #1f2756 0%, #151b3d 100%);
      border: 2.5px solid rgba(183, 158, 255, 0.38);
      border-radius: 26px;
      padding: 22px;
    }
    .step-kicker {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      color: #ffd166;
      letter-spacing: 0.06em;
      margin-bottom: 6px;
    }
    .step-prompt {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.2rem;
      color: #ffffff;
      margin: 0 0 16px 0;
    }
    .mcq-options-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cyber-opt-btn {
      background: linear-gradient(180deg, #232c62 0%, #19204a 100%);
      border: 2.5px solid rgba(183, 158, 255, 0.4);
      border-radius: 18px;
      padding: 14px 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.18s;
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
    }
    .cyber-opt-btn:hover:not([disabled]) {
      border-color: #ffd166;
      background: rgba(140, 109, 247, 0.28);
      transform: translateX(4px);
    }
    .cyber-opt-btn.correct {
      border-color: #38e595;
      background: rgba(56, 229, 149, 0.24);
    }
    .cyber-opt-btn.wrong {
      border-color: #ff5d73;
      background: rgba(255, 93, 115, 0.24);
    }
    .opt-letter {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      background: #8c6df7;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .opt-txt { font-size: 0.95rem; font-weight: 600; line-height: 1.45; }

    .step-feedback-box, .mcq-explanation-panel {
      margin-top: 16px;
      padding: 18px;
      border-radius: 20px;
      background: rgba(255, 93, 115, 0.18);
      border: 2.5px solid #ff5d73;
      color: #ffe4e6;
      font-size: 0.92rem;
    }
    .step-feedback-box.ok, .mcq-explanation-panel.ok {
      background: rgba(56, 229, 149, 0.18);
      border-color: #38e595;
      color: #d1fae5;
    }
    .final-results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 16px;
    }
    @media (max-width: 700px) {
      .final-results-grid { grid-template-columns: 1fr; }
    }
    .fr-lbl {
      display: block;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.86rem;
      color: #d7c6ff;
      margin-bottom: 6px;
      font-weight: 800;
    }

    /* 7 NIVELES TIPO VIDEOJUEGO EDUCATIVO */
    .seven-levels-bar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }
    @media (max-width: 820px) {
      .seven-levels-bar { grid-template-columns: repeat(3, 1fr); }
    }
    .level-pill-btn {
      background: linear-gradient(180deg, #212a5e 0%, #171e45 100%);
      border: 2.5px solid rgba(183, 158, 255, 0.36);
      border-radius: 18px;
      padding: 12px 8px;
      color: #d8def8;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.2s;
    }
    .level-pill-btn.active {
      background: linear-gradient(180deg, #efeaff 0%, #d8c8ff 100%);
      border: 3px solid #9d7eff;
      color: #191538;
      box-shadow: 0 10px 24px -4px rgba(140, 109, 247, 0.6);
    }
    .level-pill-btn.passed {
      border-color: #38e595;
    }
    .lvl-num { font-size: 0.72rem; color: #ffd166; font-weight: 800; text-transform: uppercase; }
    .level-pill-btn.active .lvl-num { color: #6c4ce6; }
    .lvl-name { font-family: 'Baloo 2', sans-serif; font-size: 0.94rem; font-weight: 800; margin-top: 2px; }

    .mcq-active-card {
      background: linear-gradient(180deg, #1f2756 0%, #151b3d 100%);
      border: 3px solid rgba(183, 158, 255, 0.42);
      border-radius: 26px;
      padding: 24px;
    }
    .mcq-meta-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 12px;
    }
    .mcq-hint-box {
      background: rgba(124, 58, 237, 0.16);
      border: 1px solid rgba(167, 139, 250, 0.4);
      padding: 12px;
      border-radius: 12px;
      font-size: 0.83rem;
      color: #ddd6fe;
      margin-bottom: 14px;
    }
    .mcq-question-prompt {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.5;
      margin: 0 0 16px 0;
    }
    .distractors-box {
      margin-top: 12px;
      background: rgba(6, 9, 22, 0.75);
      border-radius: 10px;
      padding: 12px;
    }
    .distractors-box h5 { margin: 0 0 8px 0; color: #00f2fe; font-size: 0.82rem; }
    .dist-row {
      display: flex;
      gap: 10px;
      align-items: baseline;
      font-size: 0.79rem;
      margin-bottom: 6px;
      color: #cbd5e1;
    }
    .dist-badge {
      background: rgba(244, 63, 94, 0.25);
      color: #fda4af;
      font-weight: 800;
      font-size: 0.68rem;
      padding: 2px 7px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .dist-badge.is-right {
      background: rgba(16, 185, 129, 0.25);
      color: #34d399;
    }
    .mep-actions {
      display: flex;
      gap: 10px;
      margin-top: 14px;
    }

    /* ORAL */
    .oral-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .oral-prep-card, .trap-card {
      background: rgba(8, 12, 28, 0.78);
      border: 1px solid rgba(167, 139, 250, 0.28);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 12px;
    }
    .oral-q-title {
      font-size: 1.1rem;
      color: #ffffff;
      margin: 8px 0 12px 0;
    }
    .oral-repregunta-box {
      background: rgba(244, 63, 94, 0.12);
      border-left: 4px solid #f43f5e;
      padding: 10px 14px;
      border-radius: 0 10px 10px 0;
      font-size: 0.85rem;
      color: #fecdd3;
      margin-bottom: 14px;
    }
    .oral-repregunta-box p { margin: 4px 0 0 0; }
    .cyber-textarea {
      width: 100%;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(0, 242, 254, 0.35);
      border-radius: 12px;
      padding: 12px;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.86rem;
      margin-bottom: 10px;
    }
    .oral-actions-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .catedra-model-answer, .trap-reveal {
      margin-top: 12px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 12px;
      padding: 14px;
      font-size: 0.85rem;
      color: #d1fae5;
      line-height: 1.55;
    }

    /* BOTONES CYBER */
    .cyber-btn-primary {
      background: linear-gradient(135deg, #00f2fe 0%, #3b82f6 50%, #7c3aed 100%);
      color: #ffffff;
      border: none;
      padding: 10px 18px;
      border-radius: 12px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.84rem;
      cursor: pointer;
    }
    .cyber-btn-secondary {
      background: rgba(124, 58, 237, 0.28);
      border: 1px solid rgba(167, 139, 250, 0.5);
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .cyber-btn-emerald {
      background: linear-gradient(135deg, #059669, #10b981);
      color: #ffffff;
      border: none;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .cyber-btn-emerald[disabled], .cyber-btn-cyan-sm[disabled] {
      opacity: 0.55;
      cursor: default;
    }
    .cyber-btn-cyan-sm {
      background: rgba(0, 242, 254, 0.16);
      border: 1px solid #00f2fe;
      color: #00f2fe;
      padding: 7px 14px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.78rem;
      cursor: pointer;
    }
  `]
})
export class UnitsPage implements OnInit {
  Math = Math;
  units: ProgramUnitDto[] = [];
  selectedUnitNumber = 1;
  activeTab: 'teoria' | 'graficos' | 'practica' | 'mcq' | 'oral' = 'teoria';

  // Estado Pestaña 1: Teoría
  selectedTheoryIndex = 0;
  visibleDerivationSteps: Record<string, number> = {};

  // Estado Pestaña 2: Laboratorio Interactivo
  labChargeQ = 12;
  labRadiusR = 2.0;
  labProbeDist = 3.2;
  labKappa = 3.5;
  labPlateDist = 4.0;
  labBatteryConnected = true;
  labVoltageE = 24;
  labTau = 4.0;
  labTimeT = 4.0;
  labMagB = 2.0;
  labVelocityV = 5.0;
  labChargePositive = true;
  labOmega = 250;
  labXL = 80;
  labXC = 50;
  labChallengeSelected: number | null = null;
  labChallengeFeedback: string | null = null;
  labChallengeSuccess = false;

  // Estado Pestaña 3: Práctica 6 Pasos
  selectedExerciseIndex = 0;
  currentExerciseStep = 1;
  completedExerciseSteps: Record<number, boolean> = {};
  stepSelectedOption: number | null = null;
  stepFeedback: string | null = null;
  stepIsCorrect = false;
  trapAnswers: Record<string, number> = {};

  // Estado Pestaña 4: Multiple Choice 7 Niveles
  sevenLevels: { key: SevenLevelDifficulty; label: string }[] = [
    { key: 'facil', label: 'Fácil' },
    { key: 'medio', label: 'Medio' },
    { key: 'intermedio', label: 'Intermedio' },
    { key: 'avanzado', label: 'Avanzado' },
    { key: 'dificil', label: 'Difícil' },
    { key: 'final', label: 'Nivel Final' },
    { key: 'coloquio', label: 'Coloquio' },
  ];
  selectedMcqLevel: SevenLevelDifficulty = 'facil';
  mcqSelectedOption: number | null = null;
  mcqAnswered = false;
  mcqIsCorrect = false;
  showMcqHint = false;

  // Estado Pestaña 5: Oral
  oralDrafts: Record<string, string> = {};
  oralRevealed: Record<string, boolean> = {};
  lockedUnitNotice: { attemptedUnit: number; requiredUnitNumber: number } | null = null;

  constructor(
    private api: Fisica2ApiService,
    private katex: KatexRenderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.units$.subscribe((data) => {
      this.units = data || [];
      if (!this.isUnitUnlocked(this.selectedUnitNumber)) {
        this.selectedUnitNumber = this.api.getHighestUnlockedUnitNumber(this.units);
      }
    });
    this.api.getUnits().subscribe();

    this.route.queryParams.subscribe((params) => {
      if (params['u']) {
        const uNum = parseInt(params['u'], 10);
        if (uNum >= 1 && uNum <= 9) {
          this.selectUnit(uNum);
        }
      }
      if (params['tab']) {
        const t = params['tab'];
        if (['teoria', 'graficos', 'practica', 'mcq', 'oral'].includes(t)) {
          this.activeTab = t;
        }
      }
    });
  }

  isUnitUnlocked(unitNum: number): boolean {
    return this.api.isUnitUnlocked(unitNum, this.units);
  }

  selectUnit(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      const highest = this.api.getHighestUnlockedUnitNumber(this.units);
      this.lockedUnitNotice = {
        attemptedUnit: unitNum,
        requiredUnitNumber: highest
      };
      this.selectedUnitNumber = highest;
      return;
    }
    this.lockedUnitNotice = null;
    this.selectedUnitNumber = unitNum;
    this.selectedTheoryIndex = 0;
    this.selectedExerciseIndex = 0;
    this.currentExerciseStep = 1;
    this.completedExerciseSteps = {};
    this.stepSelectedOption = null;
    this.stepFeedback = null;
    this.labChallengeSelected = null;
    this.labChallengeFeedback = null;
    this.resetCurrentMcq();
  }

  openProfessorForCurrentUnit() {
    this.router.navigate(['/profesor'], { queryParams: { u: this.selectedUnitNumber } });
  }

  openCalculatorPage() {
    this.router.navigate(['/calculadora']);
  }

  get currentVisualExplanatoryCards() {
    const cardsByUnit: Record<number, {
      badge: string;
      emoji: string;
      questionTitle: string;
      diagramHeader: string;
      diagramLines: string[];
      plainExplanation: string;
      traditionalFormulaLatex: string;
      whereItComesFrom: string;
    }[]> = {
      1: [
        {
          badge: 'CONCEPTO 1 • ORIGEN ATÓMICO',
          emoji: '⚛️',
          questionTitle: '¿Qué es una Carga Eléctrica y de dónde sale la Ley de Coulomb?',
          diagramHeader: '[ ÁTOMO: Protones (+) en el núcleo | Electrones (−) libres ]',
          diagramLines: [
            'Cuerpo que PIERDE electrones (−) → Queda con carga POSITIVA (+q)',
            'Cuerpo que GANA electrones (−) → Queda con carga NEGATIVA (−q)',
            '(+q₁) <─── F⃗ ─── [ Distancia r en metros ] ─── F⃗ ───> (+q₂)'
          ],
          plainExplanation: 'La carga eléctrica nace del desbalance entre protones y electrones. Dos cargas del mismo signo se repelen y de distinto signo se atraen con una fuerza que cae con el cuadrado de la distancia r.',
          traditionalFormulaLatex: 'F = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2}',
          whereItComesFrom: 'Sale de medir que al duplicar la distancia r (2r), la fuerza se divide por 4 (2² = 4).'
        },
        {
          badge: 'CONCEPTO 2 • CAMPO EN EL ESPACIO',
          emoji: '⚡',
          questionTitle: '¿Qué es el Campo Eléctrico E⃗ y un Diferencial de Carga dq?',
          diagramHeader: '[ Carga Fuente (+Q) ──► Líneas de Campo E⃗ ──► Punto P ]',
          diagramLines: [
            'De las cargas POSITIVAS (+) nacen y salen las flechas de campo E⃗',
            'Hacia las cargas NEGATIVAS (−) entran y mueren las flechas de campo E⃗',
            'Cuerpo extenso (barra/anillo) → Se corta en pedacitos dq y se integra ∫ dE'
          ],
          plainExplanation: 'El campo eléctrico E⃗ es la fuerza por unidad de carga que la carga fuente Q crea en un punto del espacio, aunque todavía no pongas ninguna otra carga ahí.',
          traditionalFormulaLatex: 'E = \\frac{F}{q_0} = \\frac{k \\cdot |Q|}{r^2}',
          whereItComesFrom: 'Sale de dividir la Fuerza de Coulomb por la carga de prueba q₀ (se cancela q₀ y solo queda Q).'
        }
      ],
      2: [
        {
          badge: 'CONCEPTO 1 • FLUJO Y CAJA IMAGINARIA',
          emoji: '🌐',
          questionTitle: '¿Qué es el Flujo Eléctrico y una Superficie Gaussiana?',
          diagramHeader: '[ Carga +Q encerrada dentro de una Esfera/Cilindro Imaginario ]',
          diagramLines: [
            'Flujo Φ_E = Cuántas líneas de campo E⃗ atraviesan un área A',
            'Superficie Gaussiana = Caja cerrada imaginaria que elegimos por simetría',
            'Las cargas que están AFUERA de la caja dan flujo neto CERO'
          ],
          plainExplanation: 'La Ley de Gauss dice que todo el flujo eléctrico que sale de una superficie cerrada depende únicamente de la carga neta encerrada adentro dividida por ε₀.',
          traditionalFormulaLatex: '\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{encerrada}}}{\\varepsilon_0}',
          whereItComesFrom: 'Como el área de una esfera crece con r² y el campo de Coulomb baja con 1/r², al multiplicarlos r² se cancela y queda Q/ε₀.'
        },
        {
          badge: 'CONCEPTO 2 • JAULA DE FARADAY',
          emoji: '🛡️',
          questionTitle: '¿Por qué adentro de un Conductor en Equilibrio el Campo es Cero?',
          diagramHeader: '[ Metal Conductor: Cargas libres en el borde exterior | Interior E⃗ = 0 ]',
          diagramLines: [
            'En un metal los electrones se mueven libremente y se repelen entre sí',
            'Viajan hasta quedarse todos en la superficie exterior del conductor',
            'Adentro del metal no queda carga encerrada → E⃗_interior = 0'
          ],
          plainExplanation: 'Si hubiera campo eléctrico adentro de un metal, los electrones seguirían moviéndose. El equilibrio se alcanza recién cuando las cargas anulan el campo interno a cero.',
          traditionalFormulaLatex: 'E_{\\text{interior}} = 0 \\quad ; \\quad E_{\\text{superficie}} = \\frac{\\sigma}{\\varepsilon_0}',
          whereItComesFrom: 'Sale de trazar una superficie gaussiana justo por adentro del borde del conductor.'
        }
      ],
      3: [
        {
          badge: 'CONCEPTO 1 • ALTURA ELÉCTRICA',
          emoji: '🏔️',
          questionTitle: '¿Qué es el Potencial Eléctrico (Voltaje V)?',
          diagramHeader: '[ Carga (+) = Cima Alta (+V) ──► Campo E⃗ baja ──► Carga (−) = Pozo (−V) ]',
          diagramLines: [
            'El Potencial V (Voltios) es un ESCALAR (un número sin flecha ni componentes)',
            'Representa la energía potencial en Joules por cada Coulomb de carga',
            'El vector Campo Eléctrico E⃗ siempre apunta hacia donde BAJA el voltaje'
          ],
          plainExplanation: 'Pensá en el potencial V como la altura de una montaña: las cargas positivas están en lo alto y el campo eléctrico es la pendiente cuesta abajo.',
          traditionalFormulaLatex: 'V = \\frac{k \\cdot Q}{r} \\quad ; \\quad W_{A \\to B} = -q \\cdot (V_B - V_A)',
          whereItComesFrom: 'Sale de integrar el campo eléctrico kQ/r² respecto de la distancia r (la integral de 1/r² da 1/r a la primera potencia).'
        },
        {
          badge: 'CONCEPTO 2 • LÍNEAS DE IGUAL VOLTAJE',
          emoji: '🎯',
          questionTitle: '¿Qué es una Superficie Equipotencial?',
          diagramHeader: '[ Círculos concéntricos de igual Voltaje V ⊥ Flechas de Campo E⃗ ]',
          diagramLines: [
            'Todos los puntos de una misma equipotencial tienen el mismo voltaje (V_A = V_B)',
            'Mover una carga sobre una equipotencial cuesta Trabajo W = 0 Joules',
            'Las líneas de campo E⃗ siempre cortan a 90° a las equipotenciales'
          ],
          plainExplanation: 'Caminar por una superficie equipotencial es como caminar por un piso horizontal a la misma altura: no subís ni bajás, por eso no cuesta trabajo.',
          traditionalFormulaLatex: '\\Delta V = 0 \\implies W = 0\\text{ J} \\quad (\\vec{E} \\perp \\text{Equipotencial})',
          whereItComesFrom: 'Como W = -q·(V_B - V_A), si V_B = V_A la resta da cero.'
        }
      ],
      4: [
        {
          badge: 'CONCEPTO 1 • GEOMETRÍA DEL CAPACITOR',
          emoji: '🔋',
          questionTitle: '¿Qué es un Capacitor por dentro y de qué depende su Capacidad?',
          diagramHeader: '[ Placa Superior (+Q, Área A) ══ Separación d ══ Placa Inferior (−Q) ]',
          diagramLines: [
            'Son dos placas metálicas frente a frente separadas por un aislante',
            'Cuanto más grandes son las placas (mayor Área A) → Mayor Capacidad C',
            'Cuanto más cerca están las placas (menor distancia d) → Mayor Capacidad C'
          ],
          plainExplanation: 'Un capacitor almacena carga y energía en el campo eléctrico entre sus placas. Su capacidad C en Faradios solo depende de sus medidas geométricas A y d y del material aislante.',
          traditionalFormulaLatex: 'C = \\frac{\\kappa \\cdot \\varepsilon_0 \\cdot A}{d} \\quad ; \\quad Q = C \\cdot V',
          whereItComesFrom: 'Sale de dividir la carga Q por el voltaje V = E·d = (Q / ε₀A)·d. Se simplifica Q y queda ε₀A/d.'
        },
        {
          badge: 'CONCEPTO 2 • EL DIELÉCTRICO Y PREFIJOS',
          emoji: '🧱',
          questionTitle: '¿Qué hace un Dieléctrico (κ) y cómo convierto pF, nF y μF?',
          diagramHeader: '[ Dipolos del aislante (− +) se alinean y debilitan el campo interno ]',
          diagramLines: [
            'El aislante (dieléctrico) multiplica la capacidad original por κ (C = κ · C₀)',
            '1 microFaradio (μF) = 10⁻⁶ F  |  1 nanoFaradio (nF) = 10⁻⁹ F',
            '1 picoFaradio (pF) = 10⁻¹² F  (1 nF = 1000 pF)'
          ],
          plainExplanation: 'Las moléculas del dieléctrico crean un campito opuesto que reduce la tensión necesaria para guardar la misma carga, aumentando la capacidad.',
          traditionalFormulaLatex: 'C_{\\text{con dieléctrico}} = \\kappa \\cdot C_0 \\quad ; \\quad U = \\frac{1}{2} \\cdot C \\cdot V^2',
          whereItComesFrom: 'Al reducirse el campo E a E₀/κ, el voltaje baja a V₀/κ y la capacidad C = Q/V sube a κ·C₀.'
        }
      ],
      5: [
        {
          badge: 'CONCEPTO 1 • ELECTRONES EN EL CABLE',
          emoji: '💡',
          questionTitle: '¿Qué es la Corriente Eléctrica I y la Resistencia R de un cable?',
          diagramHeader: '[ Cable de longitud L y sección A: Electrones e⁻ avanzando ]',
          diagramLines: [
            'Corriente I (Amperes) = Cuántos Coulombs pasan por segundo (I = dQ/dt)',
            'Cable más LARGO (mayor L) → Más choques → Mayor Resistencia R',
            'Cable más GRUESO (mayor Área A) → Más ancho de paso → Menor Resistencia R'
          ],
          plainExplanation: 'La resistencia eléctrica funciona igual que un pasillo: si el pasillo es muy largo cuesta más pasar, y si es muy ancho pasan todos más fácil.',
          traditionalFormulaLatex: 'R = \\rho \\cdot \\frac{L}{A} \\quad ; \\quad V = I \\cdot R \\quad ; \\quad P = I^2 \\cdot R',
          whereItComesFrom: 'De la Ley de Ohm microscópica y la geometría cilíndrica del conductor.'
        },
        {
          badge: 'CONCEPTO 2 • CARGA DEL CAPACITOR RC',
          emoji: '⏱️',
          questionTitle: '¿Cómo funciona un Circuito RC y la Constante de Tiempo τ = R·C?',
          diagramHeader: '[ t = 0⁺: Capacitor vacío = Cable | t = τ: 63,2% | t → ∞: Llave abierta ]',
          diagramLines: [
            'Al cerrar la llave (t = 0⁺): el capacitor está vacío (V_C = 0) y la corriente es máxima',
            'En t = τ = R·C: el voltaje del capacitor llega al 63,2% de la batería',
            'En t ≥ 5·τ (t → ∞): el capacitor está lleno (V_C = ε) y la corriente se detiene (I = 0)'
          ],
          plainExplanation: 'El resistor R limita qué tan rápido pueden entrar las cargas al capacitor C. El producto τ = R·C en segundos mide la duración de esa carga.',
          traditionalFormulaLatex: 'v_C(t) = \\mathcal{E} \\cdot \\left(1 - e^{-\\frac{t}{R \\cdot C}}\\right) \\quad ; \\quad \\tau = R \\cdot C',
          whereItComesFrom: 'Sale de resolver la ecuación diferencial de la malla de Kirchhoff: ε - i·R - q/C = 0.'
        }
      ],
      6: [
        {
          badge: 'CONCEPTO 1 • IMANES Y FUERZA DE LORENTZ',
          emoji: '🧲',
          questionTitle: '¿Qué es un Campo Magnético B⃗ y cuándo hace fuerza sobre una carga?',
          diagramHeader: '[ Imán Norte ──► Líneas cerradas de B⃗ ──► Sur | Carga móvil con velocidad v⃗ ]',
          diagramLines: [
            'Si la carga está QUIETA (v = 0) → El campo magnético NO le hace fuerza (F_B = 0)',
            'Si se mueve paralela a B⃗ (θ = 0°) → Tampoco siente fuerza magnética (F_B = 0)',
            'La fuerza F⃗_B es siempre PERPENDICULAR (90°) tanto a la velocidad v⃗ como a B⃗'
          ],
          plainExplanation: 'El campo magnético solo desvía cargas en movimiento. Usamos la Regla de la Mano Derecha: dedos desde v⃗ hacia B⃗ y el pulgar da la fuerza F⃗_B.',
          traditionalFormulaLatex: 'F_B = |q| \\cdot v \\cdot B \\cdot \\sin(\\theta)',
          whereItComesFrom: 'Del producto vectorial F⃗ = q · (v⃗ × B⃗) medido experimentalmente en Teslas (1 T = 10⁴ Gauss).'
        },
        {
          badge: 'CONCEPTO 2 • ÓRBITA DE CICLOTRÓN',
          emoji: '🌀',
          questionTitle: '¿Por qué la carga gira en círculos sin cambiar su rapidez?',
          diagramHeader: '[ Órbita circular de radio R: Velocidad v⃗ tangente ⊥ Fuerza F⃗_B al centro ]',
          diagramLines: [
            'Como F⃗_B apunta siempre a 90° de la velocidad, actúa como fuerza centrípeta',
            'Trabajo magnético W_B = 0 Joules → La rapidez v y la energía cinética NO cambian',
            'Si la partícula es negativa (electrón), gira en sentido contrario al protón'
          ],
          plainExplanation: 'Al tirar siempre hacia el centro del círculo sin empujar a favor ni en contra de la marcha, la fuerza magnética curva el camino manteniendo constante la rapidez.',
          traditionalFormulaLatex: 'R = \\frac{m \\cdot v}{|q| \\cdot B}',
          whereItComesFrom: 'Sale de igualar la fuerza magnética |q|·v·B con la fuerza centrípeta m·v²/R y despejar R.'
        }
      ],
      7: [
        {
          badge: 'CONCEPTO 1 • CORRIENTE QUE CREA MAGNETISMO',
          emoji: '🧭',
          questionTitle: '¿Cómo crea campo magnético un cable con corriente (Biot-Savart y Ampère)?',
          diagramHeader: '[ Cable con corriente I ↑ ──► Anillos concéntricos de Campo Magnético B⃗ ]',
          diagramLines: [
            'Pulgar de la mano derecha en sentido de la corriente I → Dedos dan el giro de B⃗',
            'Dos cables paralelos con corrientes de IGUAL sentido → Se ATRAEN',
            'Dos cables paralelos con corrientes de DISTINTO sentido → Se REPELEN'
          ],
          plainExplanation: 'Toda corriente eléctrica genera anillos de campo magnético a su alrededor cuya intensidad disminuye con la distancia r al cable.',
          traditionalFormulaLatex: 'B_{\\text{cable recto}} = \\frac{\\mu_0 \\cdot I}{2 \\cdot \\pi \\cdot r}',
          whereItComesFrom: 'Sale de la Ley de Ampère ∮ B⃗·dl⃗ = μ₀·I dividida por el perímetro de la circunferencia 2·π·r.'
        },
        {
          badge: 'CONCEPTO 2 • EL SOLENOIDE (BOBINA)',
          emoji: 'コイル',
          questionTitle: '¿Qué es un Solenoide por dentro y cómo es su campo magnético?',
          diagramHeader: '[ Alambre enrollado en N espiras (vueltas) a lo largo de un tubo de largo L ]',
          diagramLines: [
            'Un solenoide es una bobina cilíndrica de N vueltas de alambre apretadas',
            'Adentro del tubo los campos de todas las espiras se suman → Campo B⃗ uniforme',
            'Afuera del solenoide los campos de ida y vuelta se cancelan (B_afuera ≈ 0)'
          ],
          plainExplanation: 'Enrollar un cable en forma de resorte concentra todo el campo magnético por adentro del cilindro como un imán recto perfecto cuyo valor podés controlar con la corriente I.',
          traditionalFormulaLatex: 'B_{\\text{solenoide}} = \\frac{\\mu_0 \\cdot N \\cdot I}{L} = \\mu_0 \\cdot n \\cdot I',
          whereItComesFrom: 'Sale de aplicar la Ley de Ampère a un rectángulo que pasa por adentro del solenoide encerrando N·I.'
        }
      ],
      8: [
        {
          badge: 'CONCEPTO 1 • IMÁN EN MOVIMIENTO',
          emoji: '⚡',
          questionTitle: '¿Qué descubrió Faraday y de dónde nace el voltaje inducido?',
          diagramHeader: '[ Imán MOVIÉNDOSE hacia una bobina ──► Cambia el flujo Φ_B(t) ──► Nace Voltaje ε ]',
          diagramLines: [
            'Si el imán está QUIETO → El flujo magnético no cambia → Voltaje inducido = 0 V',
            'Si el imán se MUEVE (o cambia B o el área A) → Nace corriente y voltaje inducido',
            'Cuanto más rápido cambia el flujo (menor tiempo dt) y más espiras N hay → Mayor voltaje'
          ],
          plainExplanation: 'Así funcionan todos los generadores eléctricos del mundo: moviendo imanes frente a bobinas para que el flujo magnético cambie continuamente en el tiempo.',
          traditionalFormulaLatex: '\\mathcal{E} = -N \\cdot \\frac{d\\Phi_B}{dt} \\quad ; \\quad \\Phi_B = B \\cdot A \\cdot \\cos(\\theta)',
          whereItComesFrom: 'De medir que la fuerza electromotriz inducida es proporcional a la rapidez de variación del flujo magnético.'
        },
        {
          badge: 'CONCEPTO 2 • EL SIGNO MENOS DE LENZ',
          emoji: '🛑',
          questionTitle: '¿Qué significa el signo menos (−) de la Ley de Lenz y qué hace una bobina L?',
          diagramHeader: '[ Si el flujo externo AUMENTA ──► La espira crea un campo B⃗_ind OPUESTO ]',
          diagramLines: [
            'La corriente inducida siempre se opone al cambio de flujo que la produce',
            'Si acercás el polo Norte del imán, la espira te enfrenta otro polo Norte para frenarte',
            'En un circuito RL, la bobina L evita que la corriente salte de golpe en t = 0⁺'
          ],
          plainExplanation: 'El signo menos de Lenz garantiza la Conservación de la Energía: tenés que hacer trabajo mecánico empujando el imán para generar energía eléctrica.',
          traditionalFormulaLatex: '\\mathcal{E}_L = -L \\cdot \\frac{di}{dt} \\quad ; \\quad \\tau_L = \\frac{L}{R}',
          whereItComesFrom: 'Si la corriente inducida ayudara al cambio en vez de oponerse, crecería al infinito violando la conservación de la energía.'
        }
      ],
      9: [
        {
          badge: 'CONCEPTO 1 • IMPEDANCIA Y RESONANCIA RLC',
          emoji: '〰️',
          questionTitle: '¿Qué es la Impedancia Z y cuándo entra en Resonancia un circuito RLC?',
          diagramHeader: '[ Triángulo Rectángulo: Base = R | Altura = X_L − X_C | Hipotenusa = Z ]',
          diagramLines: [
            'En la Bobina L el voltaje adelanta 90° a la corriente (X_L = 2·π·f·L)',
            'En el Capacitor C el voltaje atrasa 90° a la corriente (X_C = 1 / 2·π·f·C)',
            'En RESONANCIA (X_L = X_C): se anulan entre sí → Z_mínima = R y Corriente MÁXIMA'
          ],
          plainExplanation: 'Como la bobina y el capacitor están desfasados 180° entre sí, tiran en sentidos opuestos. Cuando sus reactancias son iguales, se cancelan y el circuito queda puramente resistivo.',
          traditionalFormulaLatex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad ; \\quad f_0 = \\frac{1}{2\\pi\\sqrt{L \\cdot C}}',
          whereItComesFrom: 'Sale de aplicar el Teorema de Pitágoras a los fasores de tensión V_R y (V_L − V_C).'
        },
        {
          badge: 'CONCEPTO 2 • ONDAS DE MAXWELL (LA LUZ)',
          emoji: '🚀',
          questionTitle: '¿Qué descubrió Maxwell para unir la Electricidad, el Magnetismo y la Luz?',
          diagramHeader: '[ Campo E⃗(t) variable ⇄ Campo B⃗(t) variable ──► Onda viajando a c = 3×10⁸ m/s ]',
          diagramLines: [
            'Faraday mostró que un campo magnético variable crea un campo eléctrico',
            'Maxwell descubrió que un campo eléctrico variable también crea un campo magnético',
            'Ambos campos se regeneran mutuamente formando las Ondas Electromagnéticas (la luz)'
          ],
          plainExplanation: 'Entre las placas de un capacitor que se está cargando no pasan electrones, pero cambia el campo eléctrico: Maxwell llamó a eso Corriente de Desplazamiento y cerró las 4 ecuaciones del electromagnetismo.',
          traditionalFormulaLatex: 'c = \\frac{1}{\\sqrt{\\mu_0 \\cdot \\varepsilon_0}} = 3 \\times 10^8\\text{ m/s}',
          whereItComesFrom: 'Al combinar las ecuaciones de Faraday y Ampère-Maxwell en el vacío aparece la ecuación de onda con velocidad 1/√(μ₀ε₀).'
        }
      ]
    };
    return cardsByUnit[this.selectedUnitNumber] || cardsByUnit[1];
  }

  get currentUnit(): ProgramUnitDto | undefined {
    return this.units.find((u) => u.unitNumber === this.selectedUnitNumber) || this.units[0];
  }

  get currentMastery(): number {
    return this.currentUnit ? this.api.calculateUnitMastery(this.currentUnit) : 0;
  }

  getUnitPct(u: ProgramUnitDto): number {
    return this.api.calculateUnitMastery(u);
  }

  getUnitIllustration(unitNum: number): string {
    const map: Record<number, string> = {
      1: 'bulb',
      2: 'gauss-sphere',
      3: 'equipotential',
      4: 'capacitor',
      5: 'resistor',
      6: 'magnet',
      7: 'compass-ampere',
      8: 'coil',
      9: 'maxwell-wave'
    };
    return map[unitNum] || 'bulb';
  }

  getShortUnitName(unitNum: number): string {
    const map: Record<number, string> = {
      1: 'Electricidad',
      2: 'Gauss',
      3: 'Potencial',
      4: 'Capacitores',
      5: 'Corriente RC',
      6: 'Lorentz',
      7: 'Biot/Ampère',
      8: 'Faraday-Lenz',
      9: 'Maxwell/CA'
    };
    return map[unitNum] || `U${unitNum}`;
  }

  renderMath(expr: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(expr, displayMode);
  }

  // ============================================================================
  // PESTAÑA 1: TEORÍA, PIZARRÓN Y FÓRMULAS (INCLUYE CONOCIMIENTO DINÁMICO DE PDFs)
  // ============================================================================
  get unitTheoryTopics(): TheoryTopic[] {
    const base = THEORY_TOPICS.filter((t) => t.unitNumber === this.selectedUnitNumber);
    const dyn = this.api.getDynamicTheoryTopics().filter((t) => t.unitNumber === this.selectedUnitNumber);
    return [...base, ...dyn];
  }

  get currentTheoryTopic(): TheoryTopic | undefined {
    return this.unitTheoryTopics[this.selectedTheoryIndex] || this.unitTheoryTopics[0];
  }

  get currentDeepTheory(): DeepTheoryUnit | undefined {
    return DEEP_THEORY_DATA.find((d) => d.unitNumber === this.selectedUnitNumber);
  }

  get unitFormulas(): InteractiveFormula[] {
    return INTERACTIVE_FORMULAS.filter((f) => f.unitNumber === this.selectedUnitNumber);
  }

  getVisibleStepsCount(derivIdx: number, total: number): number {
    const key = `u${this.selectedUnitNumber}_d${derivIdx}`;
    return this.visibleDerivationSteps[key] || 1;
  }

  revealNextDerivationStep(derivIdx: number, total: number) {
    const key = `u${this.selectedUnitNumber}_d${derivIdx}`;
    const current = this.visibleDerivationSteps[key] || 1;
    this.visibleDerivationSteps[key] = Math.min(total, current + 1);
  }

  revealAllDerivationSteps(derivIdx: number, total: number) {
    const key = `u${this.selectedUnitNumber}_d${derivIdx}`;
    this.visibleDerivationSteps[key] = total;
  }

  // ============================================================================
  // PESTAÑA 2: LABORATORIO INTERACTIVO Y TELEMETRÍA
  // ============================================================================
  get currentLabFieldE(): number {
    if (this.labProbeDist < this.labRadiusR) {
      return (this.labChargeQ * this.labProbeDist) / Math.pow(this.labRadiusR, 3);
    }
    return this.labChargeQ / Math.pow(Math.max(0.2, this.labProbeDist), 2);
  }

  get gaussCurvePath(): string {
    const pts: string[] = [];
    for (let r = 0.2; r <= 8.0; r += 0.2) {
      const eVal = r < this.labRadiusR
        ? (this.labChargeQ * r) / Math.pow(this.labRadiusR, 3)
        : this.labChargeQ / (r * r);
      const x = 310 + r * 30;
      const y = 265 - Math.min(195, eVal * 6);
      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  get rcVoltageCurvePath(): string {
    const pts: string[] = [];
    for (let t = 0; t <= 25; t += 0.5) {
      const x = 60 + t * 18;
      const y = 260 - 185 * (1 - Math.exp(-t / this.labTau));
      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  get rcCurrentCurvePath(): string {
    const pts: string[] = [];
    for (let t = 0; t <= 25; t += 0.5) {
      const x = 60 + t * 18;
      const y = 260 - 185 * Math.exp(-t / this.labTau);
      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  getPhaseAngleDeg(): string {
    const R = 50;
    const rad = Math.atan2(this.labXL - this.labXC, R);
    return ((rad * 180) / Math.PI).toFixed(1);
  }

  getPowerFactor(): string {
    const R = 50;
    const Z = Math.sqrt(R * R + Math.pow(this.labXL - this.labXC, 2));
    return (R / Z).toFixed(3);
  }

  get currentLabReadouts(): { label: string; value: string }[] {
    if (this.selectedUnitNumber <= 3) {
      const vVal = this.labProbeDist < this.labRadiusR
        ? (this.labChargeQ / (2 * this.labRadiusR)) * (3 - Math.pow(this.labProbeDist / this.labRadiusR, 2))
        : this.labChargeQ / this.labProbeDist;
      return [
        { label: 'Campo E(r)', value: `${(this.currentLabFieldE * 9).toFixed(2)} kN/C` },
        { label: 'Potencial V(r)', value: `${(vVal * 9).toFixed(2)} kV` },
        { label: 'Régimen Espacial', value: this.labProbeDist < this.labRadiusR ? 'Interior (Lineal)' : 'Exterior (1/r²)' }
      ];
    }
    if (this.selectedUnitNumber === 4) {
      const c0 = 10 / this.labPlateDist;
      const c = this.labKappa * c0;
      const v = this.labBatteryConnected ? 12 : 12 / this.labKappa;
      const u = 0.5 * c * v * v;
      return [
        { label: 'Capacidad C = κ·C₀', value: `${c.toFixed(2)} pF` },
        { label: 'Voltaje entre placas V', value: `${v.toFixed(2)} V` },
        { label: 'Energía Almacenada U', value: `${u.toFixed(1)} pJ` }
      ];
    }
    if (this.selectedUnitNumber === 5) {
      const vc = this.labVoltageE * (1 - Math.exp(-this.labTimeT / this.labTau));
      const vr = this.labVoltageE - vc;
      return [
        { label: 'Tensión Capacitor v_C(t)', value: `${vc.toFixed(2)} V` },
        { label: 'Tensión Resistor v_R(t)', value: `${vr.toFixed(2)} V` },
        { label: 'Fracción de Carga', value: `${((vc / this.labVoltageE) * 100).toFixed(1)} %` }
      ];
    }
    if (this.selectedUnitNumber <= 7) {
      const rOrbit = (this.labVelocityV * 1.04) / this.labMagB;
      return [
        { label: 'Radio Ciclotrón R = mv/qB', value: `${rOrbit.toFixed(2)} cm` },
        { label: 'Fuerza de Lorentz |F_B|', value: `${(this.labVelocityV * this.labMagB * 1.6).toFixed(2)}×10⁻¹⁴ N` },
        { label: 'Trabajo Magnético W', value: '0.00 J (F ⊥ v)' }
      ];
    }
    const R = 50;
    const Z = Math.sqrt(R * R + Math.pow(this.labXL - this.labXC, 2));
    return [
      { label: 'Impedancia Total |Z|', value: `${Z.toFixed(2)} Ω` },
      { label: 'Desfase Tensión-Corriente φ', value: `${this.getPhaseAngleDeg()}°` },
      { label: 'Factor de Potencia cos(φ)', value: this.getPowerFactor() }
    ];
  }

  get currentLabChallenge(): { prompt: string; options: string[]; correctIndex: number; explanation: string } {
    const challenges: Record<number, { prompt: string; options: string[]; correctIndex: number; explanation: string }> = {
      1: {
        prompt: 'Mové el slider de la posición de sonda r hacia valores muy grandes (r ≫ R). ¿Cómo decae asintóticamente el campo eléctrico exterior?',
        options: ['Decae inversamente proporcional al cuadrado de la distancia (1/r²) como carga puntual', 'Crece linealmente con r', 'Permanece constante', 'Se anula para r = 2R'],
        correctIndex: 0,
        explanation: '¡Exacto! Para r ≥ R toda distribución esférica o finita vista de lejos recupera el comportamiento 1/r² de Coulomb.'
      },
      2: {
        prompt: 'Observá la curva E(r) en el interior de la esfera aislante uniformemente cargada (r < R). ¿Por qué crece linealmente desde 0 en el centro?',
        options: ['Porque la carga encerrada crece con el volumen r³ mientras el área gaussiana crece con r² (r³/r² = r)', 'Porque la densidad superficial está en el centro', 'Porque el flujo es cero', 'Porque es un conductor'],
        correctIndex: 0,
        explanation: '¡Correcto! Q_enc = ρ(4/3)πr³ dividido por 4πr²ε₀ da E(r) = ρr/(3ε₀), estrictamente lineal.'
      },
      3: {
        prompt: 'Si te desplazás en la dirección hacia donde apunta el vector campo eléctrico E, ¿qué ocurre con el potencial V(r)?',
        options: ['El potencial V(r) disminuye continuamente (E = -∇V)', 'El potencial aumenta exponencialmente', 'El potencial es cero en todo punto', 'No hay relación entre E y V'],
        correctIndex: 0,
        explanation: '¡Impecable! El signo menos en E = -∇V indica que el campo apunta en sentido del máximo descenso de potencial.'
      },
      4: {
        prompt: 'Cambiá el selector a "Aislado (Q=cte)" y aumentá la constante dieléctrica κ con el slider. ¿Qué le sucede al voltaje V y a la energía U?',
        options: ['Tanto el voltaje V = V₀/κ como la energía U = U₀/κ disminuyen', 'El voltaje aumenta a κ·V₀', 'La energía se cuadruplica', 'La capacidad disminuye'],
        correctIndex: 0,
        explanation: '¡Exacto! Con Q constante, al subir C = κC₀ baja la diferencia de potencial V = Q/C y baja la energía U = Q²/(2C).'
      },
      5: {
        prompt: 'Colocá el slider de tiempo exactamente en t = τ (1.0τ). ¿Qué porcentaje de la tensión de la fuente alcanza el capacitor?',
        options: ['63,2% de la fem ε (1 - e⁻¹)', '50,0% de la fem ε', '99,3% de la fem ε', '0% (sigue descargado)'],
        correctIndex: 0,
        explanation: '¡Perfecto! En una constante de tiempo t = τ = RC, v_C(τ) = ε(1 - e⁻¹) ≈ 0,632·ε.'
      },
      6: {
        prompt: 'Alterná en el simulador entre Protón (+q) y Electrón (-q). ¿Qué cambia y qué permanece invariante en la órbita?',
        options: ['Se invierte el sentido de giro (fuerza F_B opuesta), pero para igual masa/carga la rapidez y energía cinética son constantes (W = 0)', 'La fuerza magnética frena al electrón hasta detenerlo', 'El vector fuerza pasa a ser paralelo a la velocidad', 'El trabajo magnético se vuelve infinito'],
        correctIndex: 0,
        explanation: '¡Excelente! La inversión de signo de carga invierte F = q(v × B), invirtiendo la curvatura sin realizar trabajo mecánico.'
      },
      7: {
        prompt: 'Si duplicás la corriente I en el simulador magnético, ¿qué ocurre con el campo magnético B en el interior del solenoide?',
        options: ['Se duplica linealmente (B = μ₀ n I)', 'Se reduce a la mitad', 'No depende de la corriente', 'Decae con el cubo de la corriente'],
        correctIndex: 0,
        explanation: '¡Correcto! Por la Ley de Ampère en un solenoide largo, B = μ₀·n·I es directamente proporcional a la corriente.'
      },
      8: {
        prompt: 'Ajustá X_L y X_C en el simulador. ¿Qué representa físicamente el signo negativo en la Ley de Faraday-Lenz ε = -dΦ_B/dt?',
        options: ['Que la corriente inducida genera un campo propio que se opone a la variación de flujo magnético (Conservación de la Energía)', 'Que la corriente siempre circula en sentido horario', 'Que la inductancia L es negativa', 'Que el flujo magnético no puede cambiar'],
        correctIndex: 0,
        explanation: '¡Exacto! La Ley de Lenz garantiza la conservación de la energía oponiéndose a la causa que varía el flujo.'
      },
      9: {
        prompt: 'En el simulador fasorial, igualá X_L = X_C (por ejemplo, ambos en 80 Ω). ¿Qué estado alcanza el circuito RLC serie?',
        options: ['Resonancia eléctrica: desfase φ = 0°, factor de potencia cos(φ) = 1.000 e impedancia mínima Z = R', 'Circuito abierto con corriente nula', 'Desfase de 90° puramente reactivo', 'Potencia activa nula'],
        correctIndex: 0,
        explanation: '¡Brillante! Cuando X_L = X_C, los fasores V_L y V_C se cancelan mutuamente (180°), dejando Z = R pura.'
      }
    };
    return challenges[this.selectedUnitNumber] || challenges[1];
  }

  verifyLabChallenge(idx: number) {
    this.labChallengeSelected = idx;
    const ch = this.currentLabChallenge;
    if (idx === ch.correctIndex) {
      this.labChallengeSuccess = true;
      this.labChallengeFeedback = `✅ ${ch.explanation} (+100% Laboratorio acreditado)`;
      this.completeVerifiedActivity('laboratorio', `lab_mission_u${this.selectedUnitNumber}`, 100);
    } else {
      this.labChallengeSuccess = false;
      this.labChallengeFeedback = `❌ Respuesta incorrecta. Analizá el gráfico del simulador e intentá de nuevo.`;
      this.api.logError({
        unitNumber: this.selectedUnitNumber,
        category: 'grafico',
        sourceContext: 'prueba_dominio',
        topicTitle: `Laboratorio Gráfico U${this.selectedUnitNumber}`,
        mistakeDescription: `Interpretación errónea en el simulador: elegiste "${ch.options[idx]}".`,
        correctionExplanation: ch.explanation
      }).subscribe();
    }
  }

  // ============================================================================
  // PESTAÑA 3: PRÁCTICA GUIADA DE TPs EN 6 PASOS (ORDENADOS DE MENOR A MAYOR DIFICULTAD)
  // ============================================================================
  get unitExercises(): GuidedExercise[] {
    const rankMap: Record<string, number> = {
      facil: 1,
      inicial: 1,
      medio: 2,
      intermedio: 3,
      avanzado: 4,
      parcial: 5,
      dificil: 6,
      final: 7,
      coloquio: 8
    };
    const combined = [
      ...GUIDED_EXERCISES.filter((e) => e.unitNumber === this.selectedUnitNumber),
      ...this.api.getDynamicExercises().filter((e) => e.unitNumber === this.selectedUnitNumber)
    ];
    return combined
      .slice()
      .sort((a, b) => (rankMap[(a.difficulty || '').toLowerCase()] || 3) - (rankMap[(b.difficulty || '').toLowerCase()] || 3));
  }

  getDifficultyOrderLabel(diff: string, idx: number): string {
    const d = (diff || '').toLowerCase();
    if (idx === 0 || d === 'facil' || d === 'inicial' || d === 'medio') {
      return `🟢 ${idx + 1}° Menor Dificultad`;
    }
    if (d === 'intermedio' || d === 'avanzado') {
      return `🟡 ${idx + 1}° Dificultad Media`;
    }
    return `🔴 ${idx + 1}° Mayor Dificultad`;
  }

  get currentExercise(): GuidedExercise | undefined {
    return this.unitExercises[this.selectedExerciseIndex] || this.unitExercises[0];
  }

  get unitTrapQuestions(): TrapQuestion[] {
    return TRAP_QUESTIONS.filter((t) => t.unitNumber === this.selectedUnitNumber);
  }

  selectExercise(idx: number) {
    this.selectedExerciseIndex = idx;
    this.currentExerciseStep = 1;
    this.completedExerciseSteps = {};
    this.stepSelectedOption = null;
    this.stepFeedback = null;
  }

  get currentStepQuestion() {
    const ex = this.currentExercise;
    if (!ex) return null;
    if (this.currentExerciseStep === 1) return ex.step1Strategy;
    if (this.currentExerciseStep === 2) return ex.step2Differential;
    if (this.currentExerciseStep === 3) return ex.step3VectorGeometry;
    if (this.currentExerciseStep === 4) return ex.step4SetupEquation;
    return ex.step6Verification.question;
  }

  getStepTitle(stepNum: number): string {
    const titles: Record<number, string> = {
      1: 'PASO 1 • INTERPRETACIÓN DEL ENUNCIADO Y LEY FUNDAMENTAL',
      2: 'PASO 2 • IDENTIFICACIÓN DE DIFERENCIAL, DATOS E INCÓGNITAS',
      3: 'PASO 3 • REPRESENTACIÓN FÍSICA Y SIMETRÍA VECTORIAL',
      4: 'PASO 4 • PLANTEO Y JUSTIFICACIÓN DE LA ECUACIÓN / INTEGRAL',
      5: 'PASO 5 • DESARROLLO MATEMÁTICO LÍNEA POR LÍNEA',
      6: 'PASO 6 • VERIFICACIÓN DIMENSIONAL Y LÍMITES ASINTÓTICOS'
    };
    return titles[stepNum] || `PASO ${stepNum}`;
  }

  answerExerciseStep(idx: number, sq: any, ex: GuidedExercise) {
    this.stepSelectedOption = idx;
    this.stepIsCorrect = idx === sq.correctIndex;
    this.stepFeedback = sq.explanation;

    if (this.stepIsCorrect) {
      this.completedExerciseSteps[this.currentExerciseStep] = true;
      this.completeVerifiedActivity('practico', `${ex.id}_step${this.currentExerciseStep}`, 18);
    } else {
      this.api.logError({
        unitNumber: this.selectedUnitNumber,
        category: sq.errorCategoryOnFail || 'planteamiento',
        sourceContext: 'entrenador_practico',
        topicTitle: `${ex.tpReference} — Paso ${this.currentExerciseStep}`,
        mistakeDescription: `Al resolver "${ex.title}", seleccionaste la opción incorrecta: "${sq.options[idx]}".`,
        correctionExplanation: sq.explanation
      }).subscribe();
    }
  }

  answerTrapQuestion(tq: TrapQuestion, idx: number) {
    this.trapAnswers[tq.id] = idx;
    if (idx === tq.correctIndex) {
      this.completeVerifiedActivity('practico', `trap_${tq.id}`, 25);
    } else {
      this.api.logError({
        unitNumber: this.selectedUnitNumber,
        category: tq.errorCategory || 'interpretacion',
        sourceContext: 'cazatrampas',
        topicTitle: `Cazatrampas: ${tq.sourceReference}`,
        mistakeDescription: `Caíste en la trampa: "${tq.cualEraLaTrampa}" al elegir "${tq.options[idx]}".`,
        correctionExplanation: tq.comoReconocerEnExamen
      }).subscribe();
    }
  }

  // ============================================================================
  // PESTAÑA 4: MULTIPLE CHOICE — 7 NIVELES
  // ============================================================================
  get unitMcqQuestions(): UnitMultipleChoiceQuestion[] {
    return UNIT_MCQ_QUESTIONS.filter((q) => q.unitNumber === this.selectedUnitNumber);
  }

  get currentMcqQuestion(): UnitMultipleChoiceQuestion | undefined {
    return (
      this.unitMcqQuestions.find((q) => q.level === this.selectedMcqLevel) ||
      this.unitMcqQuestions[0]
    );
  }

  selectMcqLevel(lvl: SevenLevelDifficulty) {
    this.selectedMcqLevel = lvl;
    this.resetCurrentMcq();
  }

  resetCurrentMcq() {
    this.mcqSelectedOption = null;
    this.mcqAnswered = false;
    this.mcqIsCorrect = false;
    this.showMcqHint = false;
  }

  isLevelPassed(lvl: SevenLevelDifficulty): boolean {
    const q = this.unitMcqQuestions.find((item) => item.level === lvl);
    return q ? this.api.isActivityCompleted(this.selectedUnitNumber, 'pruebaDominio', q.id) : false;
  }

  submitMcqAnswer(q: UnitMultipleChoiceQuestion, idx: number) {
    if (this.mcqAnswered) return;
    this.mcqSelectedOption = idx;
    this.mcqAnswered = true;
    this.mcqIsCorrect = idx === q.correctIndex;

    if (this.mcqIsCorrect) {
      this.completeVerifiedActivity('pruebaDominio', q.id, 15);
    } else {
      this.api.logError({
        unitNumber: q.unitNumber,
        category: q.errorCategory || 'conceptual',
        sourceContext: 'prueba_dominio',
        topicTitle: `Nivel ${q.level.toUpperCase()}: ${q.topic}`,
        mistakeDescription: `En la pregunta "${q.question}", respondiste "${q.options[idx]}" (Correcta: "${q.options[q.correctIndex]}").`,
        correctionExplanation: q.explanation
      }).subscribe();
    }
  }

  goToNextMcqLevel() {
    const currentIdx = this.sevenLevels.findIndex((l) => l.key === this.selectedMcqLevel);
    const nextIdx = (currentIdx + 1) % this.sevenLevels.length;
    this.selectMcqLevel(this.sevenLevels[nextIdx].key);
  }

  // ============================================================================
  // PESTAÑA 5: ENTRENAMIENTO ORAL
  // ============================================================================
  get unitOralQuestions(): OralColloquiumQuestion[] {
    return ORAL_COLLOQUIUM_QUESTIONS.filter((q) => q.unitNumber === this.selectedUnitNumber);
  }

  openTribunalForCurrentUnit() {
    this.router.navigate(['/tribunal'], { queryParams: { u: this.selectedUnitNumber } });
  }

  // ============================================================================
  // PROGRESO REAL VERIFICADO
  // ============================================================================
  isActivityDone(stage: string, activityId: string): boolean {
    return this.api.isActivityCompleted(this.selectedUnitNumber, stage, activityId);
  }

  completeVerifiedActivity(stage: 'teoria' | 'laboratorio' | 'practico' | 'pruebaDominio', activityId: string, amount: number) {
    if (this.isActivityDone(stage, activityId)) return;
    this.api.recordVerifiedActivity(this.selectedUnitNumber, stage, activityId, amount).subscribe();
  }
}
