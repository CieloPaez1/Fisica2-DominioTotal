import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, SpeedDrillQuestionDto } from '../../services/fisica2-api.service';
import { SPEED_DRILL_QUESTIONS } from '../../data/speed-drill-data';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

const HIGH_SCORE_KEY = 'fisica2_speed_drill_highscore_v3';

@Component({
  selector: 'app-speed-drill',
  standalone: true,
  imports: [
    CommonModule,
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
        <ion-title>✦ Simulacros: Flashcards Volteables & Muerte Súbita 90s ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="arcade-wrapper">

        <!-- ================================================================
             1. BANNER LAVANDA ILUSTRADO + SELECTOR DE MODO (FLASHCARDS VS 90s)
             ================================================================ -->
        <div class="cielo-hero-banner arcade-hero">
          <app-cielo-art [name]="activeMode === 'flashcards' ? 'tool-flashcards' : 'stopwatch-90s'" [width]="115" [height]="100"></app-cielo-art>
          <div class="ah-copy">
            <div class="ah-badges">
              <span class="pill-purple">
                🔓 UNIDADES HABILITADAS: UNIDAD 1{{ highestUnlockedUnit > 1 ? (' A UNIDAD ' + highestUnlockedUnit) : ' (EXCLUSIVO)' }} • {{ masterBank.length }} TARJETAS
              </span>
              <span class="pill-gold">🏆 RÉCORD: {{ highScore }} PTS</span>
            </div>
            <h1>Flashcards & Muerte Súbita (90s) ♡</h1>
            <p>
              Solo aparecen tarjetas y preguntas de las unidades que ya desbloqueaste (<strong>Unidad 1{{ highestUnlockedUnit > 1 ? ' a Unidad ' + highestUnlockedUnit : '' }}</strong>). Al completar cada unidad al 100%, sus tarjetas se suman automáticamente al mazo.
            </p>
          </div>
          <div class="mode-toggle-pills">
            <button class="mode-btn" [class.active]="activeMode === 'drill'" (click)="switchMode('drill')">
              ⚡ Muerte Súbita (90s)
            </button>
            <button class="mode-btn" [class.active]="activeMode === 'flashcards'" (click)="switchMode('flashcards')">
              🃏 Mazo de Flashcards
            </button>
          </div>
        </div>

        <!-- ================================================================
             MODO A: MAZO DE FLASHCARDS INTERACTIVAS VOLTEABLES
             ================================================================ -->
        <div *ngIf="activeMode === 'flashcards'" class="flashcard-deck-arena">
          <div class="deck-nav-bar cielo-dark-panel">
            <span class="deck-counter">Tarjeta {{ flashIndex + 1 }} de {{ masterBank.length }}</span>
            <div class="deck-unit-pills">
              <button
                *ngFor="let q of masterBank; let i = index"
                class="dot-btn"
                [class.active]="i === flashIndex"
                (click)="flashIndex = i; isCardFlipped = false"
              >
                {{ i + 1 }}
              </button>
            </div>
          </div>

          <div
            class="giant-flashcard"
            [class.flipped]="isCardFlipped"
            *ngIf="masterBank[flashIndex] as fc"
            (click)="isCardFlipped = !isCardFlipped"
          >
            <!-- FRENTE DE LA FLASHCARD -->
            <div class="fc-face front" *ngIf="!isCardFlipped">
              <div class="fc-top-tags">
                <span class="pill-purple">UNIDAD {{ fc.unitNumber }}</span>
                <span class="pill-gold">{{ getCategoryLabel(fc.category) }}</span>
              </div>

              <div class="fc-main-split">
                <app-cielo-art [name]="getUnitArt(fc.unitNumber)" [width]="115" [height]="115"></app-cielo-art>
                <h2 class="fc-question-txt">{{ fc.prompt }}</h2>
              </div>

              <div class="fc-hint-strip">
                💡 <strong>Pista Rápida:</strong> {{ fc.ruleHint }}
              </div>

              <div class="fc-flip-cta">
                <span>🔄 Tocá la tarjeta para darla vuelta y ver la respuesta ♡</span>
              </div>
            </div>

            <!-- DORSO DE LA FLASHCARD (RESPUESTA Y EXPLICACIÓN) -->
            <div class="fc-face back" *ngIf="isCardFlipped">
              <div class="fc-top-tags">
                <span class="pill-emerald">✓ RESPUESTA OFICIAL DE CÁTEDRA</span>
                <span class="pill-purple">UNIDAD {{ fc.unitNumber }}</span>
              </div>

              <div class="fc-answer-highlight">
                {{ fc.options[fc.correctIndex] }}
              </div>

              <p class="fc-explanation-txt">{{ fc.explanation }}</p>

              <div class="fc-flip-cta">
                <span>🔄 Tocá para volver al frente de la tarjeta</span>
              </div>
            </div>
          </div>

          <div class="deck-controls-row">
            <button class="deck-arrow-btn" (click)="prevFlashcard()">← Tarjeta Anterior</button>
            <button class="cielo-btn-purple" (click)="isCardFlipped = !isCardFlipped">
              🔄 {{ isCardFlipped ? 'Ver Pregunta' : 'Revelar Respuesta' }}
            </button>
            <button class="deck-arrow-btn" (click)="nextFlashcard()">Siguiente Tarjeta →</button>
          </div>
        </div>

        <!-- ================================================================
             MODO B: MUERTE SÚBITA (90 SEGUNDOS CONTRARRELOJ)
             ================================================================ -->
        <ng-container *ngIf="activeMode === 'drill'">
          <!-- PANTALLA PRE-JUEGO -->
          <div *ngIf="!isPlaying && !isGameOver" class="cielo-dark-panel pregame-panel">
            <div class="rules-3grid">
              <div class="rule-card">
                <app-cielo-art name="stopwatch-90s" [width]="72" [height]="72"></app-cielo-art>
                <h3>90 Segundos</h3>
                <p>Mazo continuo que se baraja sin agotarse mientras quede tiempo.</p>
              </div>
              <div class="rule-card">
                <app-cielo-art name="challenge-target" [width]="72" [height]="72"></app-cielo-art>
                <h3>Multiplicador x4</h3>
                <p>Encadená aciertos seguidos para activar el modo racha turbo.</p>
              </div>
              <div class="rule-card">
                <app-cielo-art name="challenge-brain" [width]="72" [height]="72"></app-cielo-art>
                <h3>Repaso Inteligente</h3>
                <p>Todo error se guarda en Mis Errores con su explicación completa.</p>
              </div>
            </div>

            <button class="cielo-btn-purple launch-big" (click)="startGame()">
              🚀 ¡INICIAR RONDA CONTRARRELOJ DE 90 SEGUNDOS!
            </button>
          </div>

          <!-- PANTALLA EN JUEGO -->
          <div *ngIf="isPlaying && !isGameOver" class="live-arcade-stack">
            <div class="cielo-dark-panel hud-grid">
              <div class="hud-box">
                <span class="hb-lbl">RELOJ</span>
                <span class="hb-val" [class.danger]="timeLeft <= 15">⏳ {{ timeLeft }}s</span>
              </div>
              <div class="hud-box">
                <span class="hb-lbl">RACHA TURBO</span>
                <span class="hb-val gold">🔥 {{ streak }} (x{{ multiplier }})</span>
              </div>
              <div class="hud-box">
                <span class="hb-lbl">PUNTAJE</span>
                <span class="hb-val emerald">{{ score }} pts</span>
              </div>
              <div class="hud-box">
                <span class="hb-lbl">ACIERTOS</span>
                <span class="hb-val">{{ totalCorrect }} / {{ totalAnswered }}</span>
              </div>
            </div>

            <div class="timer-bar-bg">
              <div class="timer-bar-fill" [style.width.%]="(timeLeft / 90) * 100"></div>
            </div>

            <!-- TARJETA DE PREGUNTA ILUSTRADA -->
            <div class="cielo-lavender-card arena-question-card" *ngIf="currentQuestion as q">
              <div class="aqc-top">
                <span class="pill-purple">UNIDAD {{ q.unitNumber }}</span>
                <span class="pill-gold">{{ getCategoryLabel(q.category) }}</span>
                <span class="aqc-hint">💡 {{ q.ruleHint }}</span>
              </div>

              <div class="aqc-body">
                <app-cielo-art [name]="getUnitArt(q.unitNumber)" [width]="96" [height]="96"></app-cielo-art>
                <h2 class="aqc-prompt">{{ q.prompt }}</h2>
              </div>

              <div class="arcade-options-grid">
                <button
                  *ngFor="let opt of q.options; let idx = index"
                  class="arcade-opt-btn"
                  [disabled]="selectedOption !== null"
                  [class.correct]="selectedOption !== null && idx === q.correctIndex"
                  [class.wrong]="selectedOption === idx && idx !== q.correctIndex"
                  (click)="selectOption(idx)"
                >
                  <span class="aob-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                  <span class="aob-text">{{ opt }}</span>
                </button>
              </div>

              <div *ngIf="feedbackMessage" class="arcade-feedback" [class.ok]="isCorrect">
                <strong>{{ isCorrect ? '🎉 ¡ACIERTO! +' + (100 * multiplier) + ' PUNTOS' : '⚠️ ¡GUARDADO EN MIS ERRORES PARA REPASO!' }}</strong>
                <p>{{ feedbackMessage }}</p>
              </div>
            </div>
          </div>

          <!-- PANTALLA FIN DE JUEGO -->
          <div *ngIf="isGameOver" class="cielo-lavender-card gameover-panel">
            <app-cielo-art name="stopwatch-90s" [width]="110" [height]="110"></app-cielo-art>
            <h2>🏆 ¡Tiempo Cumplido! Puntaje: {{ score }} pts</h2>
            <p>Aciertos: <strong>{{ totalCorrect }} de {{ totalAnswered }}</strong> • Mejor racha: <strong>{{ maxStreak }} seguidas</strong> • Récord personal: <strong>{{ highScore }} pts</strong></p>
            <button class="cielo-btn-purple" (click)="startGame()">
              🔄 Jugar Otra Ronda de 90 Segundos
            </button>
          </div>
        </ng-container>

      </div>
    </ion-content>
  `,
  styles: [`
    .arcade-wrapper {
      max-width: 1120px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .arcade-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 860px) {
      .arcade-hero { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .ah-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
    .pill-purple {
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
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
    }
    .pill-emerald {
      background: #38e595;
      border: 2px solid #1b1438;
      color: #191538;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
    }
    .ah-copy h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.95rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 4px 0;
    }
    .ah-copy p {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 600;
      color: #2b2354;
    }
    .mode-toggle-pills {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mode-btn {
      background: rgba(25, 32, 72, 0.9);
      border: 2.5px solid #1b1438;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 16px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.92rem;
      font-weight: 800;
      cursor: pointer;
    }
    .mode-btn.active {
      background: #7c5dfa;
      box-shadow: 0 4px 0 #1b1438;
    }

    /* FLASHCARDS VOLTEABLES */
    .flashcard-deck-arena {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .deck-nav-bar {
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .deck-counter {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffd166;
    }
    .deck-unit-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .dot-btn {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: rgba(15, 19, 46, 0.9);
      border: 1.5px solid rgba(183, 158, 255, 0.35);
      color: #d8def8;
      font-weight: 800;
      font-size: 0.76rem;
      cursor: pointer;
    }
    .dot-btn.active {
      background: #ffd166;
      color: #191538;
      border-color: #1b1438;
    }
    .giant-flashcard {
      background: linear-gradient(145deg, #f3efff 0%, #dcd0ff 100%);
      border: 4px solid #9d7eff;
      border-radius: 32px;
      padding: 28px;
      color: #191538;
      cursor: pointer;
      min-height: 290px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 18px 40px -8px rgba(4, 6, 18, 0.75), inset 0 3px 0 #ffffff;
      transition: transform 0.22s ease;
    }
    .giant-flashcard:hover {
      transform: translateY(-3px);
    }
    .giant-flashcard.flipped {
      background: linear-gradient(145deg, #e0f2fe 0%, #ddd6fe 100%);
      border-color: #38e595;
    }
    .fc-top-tags {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
    }
    .fc-main-split {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 20px;
      align-items: center;
      margin: 10px 0 18px 0;
    }
    @media (max-width: 640px) {
      .fc-main-split { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .fc-question-txt {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.55rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
      line-height: 1.3;
    }
    .fc-hint-strip {
      background: rgba(255, 255, 255, 0.7);
      border: 2px solid #9d7eff;
      padding: 10px 16px;
      border-radius: 16px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .fc-answer-highlight {
      background: #1b224b;
      border: 3px solid #38e595;
      color: #38e595;
      padding: 16px 20px;
      border-radius: 20px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.45rem;
      font-weight: 800;
      text-align: center;
      margin: 12px 0;
    }
    .fc-explanation-txt {
      font-size: 1rem;
      font-weight: 600;
      color: #1e1b4b;
      line-height: 1.6;
    }
    .fc-flip-cta {
      margin-top: 14px;
      text-align: center;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.9rem;
      font-weight: 800;
      color: #6c4ce6;
    }
    .deck-controls-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .deck-arrow-btn {
      background: rgba(25, 32, 72, 0.9);
      border: 2px solid rgba(183, 158, 255, 0.45);
      color: #ffffff;
      padding: 11px 20px;
      border-radius: 16px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
    }

    /* MUERTE SÚBITA 90s */
    .pregame-panel {
      padding: 26px;
      text-align: center;
    }
    .rules-3grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 22px;
    }
    @media (max-width: 768px) {
      .rules-3grid { grid-template-columns: 1fr; }
    }
    .rule-card {
      background: rgba(15, 19, 46, 0.85);
      border: 2px solid rgba(183, 158, 255, 0.35);
      border-radius: 22px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .rule-card h3 { margin: 4px 0 0 0; font-size: 1.2rem; color: #ffd166; }
    .rule-card p { margin: 0; font-size: 0.85rem; color: #cbd5e1; }
    .launch-big { width: 100%; font-size: 1.15rem !important; padding: 15px !important; }

    .hud-grid {
      padding: 14px 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 10px;
    }
    .hud-box { text-align: center; }
    .hb-lbl { display: block; font-size: 0.7rem; font-weight: 800; color: #c4b5fd; }
    .hb-val { font-family: 'Baloo 2', sans-serif; font-size: 1.55rem; font-weight: 800; color: #ffffff; }
    .hb-val.gold { color: #ffd166; }
    .hb-val.emerald { color: #38e595; }
    .hb-val.danger { color: #ff4d6d; }

    .timer-bar-bg {
      height: 10px;
      background: rgba(15, 19, 46, 0.9);
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 16px;
      border: 1.5px solid rgba(183, 158, 255, 0.35);
    }
    .timer-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #ffd166, #9d7eff);
      transition: width 0.3s linear;
    }

    .arena-question-card {
      padding: 24px;
    }
    .aqc-top {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-bottom: 14px;
    }
    .aqc-hint {
      margin-left: auto;
      font-size: 0.82rem;
      font-weight: 700;
      color: #4c32b8;
    }
    .aqc-body {
      display: grid;
      grid-template-columns: 105px 1fr;
      gap: 18px;
      align-items: center;
      margin-bottom: 18px;
    }
    @media (max-width: 640px) {
      .aqc-body { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .aqc-prompt {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
      line-height: 1.35;
    }
    .arcade-options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 680px) {
      .arcade-options-grid { grid-template-columns: 1fr; }
    }
    .arcade-opt-btn {
      background: #1b224b;
      border: 3px solid #1b1438;
      border-radius: 18px;
      padding: 14px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      cursor: pointer;
      box-shadow: 0 5px 0 #1b1438;
      transition: transform 0.15s;
    }
    .arcade-opt-btn:hover:not([disabled]) {
      transform: translateY(-2px);
      background: #28326b;
    }
    .arcade-opt-btn.correct {
      background: #38e595;
      color: #191538;
    }
    .arcade-opt-btn.wrong {
      background: #ff4d6d;
      color: #ffffff;
    }
    .aob-letter {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: #8c6df7;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .aob-text { font-size: 0.94rem; font-weight: 700; }
    .arcade-feedback {
      margin-top: 16px;
      padding: 14px 18px;
      border-radius: 18px;
      background: #ffe4e9;
      border: 2.5px solid #ff4d6d;
      color: #2b121c;
    }
    .arcade-feedback.ok {
      background: #d1fae5;
      border-color: #10b981;
      color: #064e3b;
    }
    .arcade-feedback p { margin: 4px 0 0 0; font-weight: 600; }

    .gameover-panel {
      padding: 32px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .gameover-panel h2 { margin: 0; font-size: 2rem; color: #191538; }
    .gameover-panel p { margin: 0 0 8px 0; font-size: 1rem; color: #2b2354; }
  `]
})
export class SpeedDrillPage implements OnInit, OnDestroy {
  activeMode: 'drill' | 'flashcards' = 'drill';
  flashIndex = 0;
  isCardFlipped = false;

  isPlaying = false;
  isGameOver = false;
  timeLeft = 90;
  currentIndex = 0;
  score = 0;
  streak = 0;
  maxStreak = 0;
  totalAnswered = 0;
  totalCorrect = 0;
  highScore = 0;
  selectedOption: number | null = null;
  feedbackMessage: string | null = null;
  isCorrect = false;

  private timerInterval: any;
  highestUnlockedUnit = 1;

  masterBank: SpeedDrillQuestionDto[] = [];
  questions: SpeedDrillQuestionDto[] = [];

  constructor(private api: Fisica2ApiService) {}

  ngOnInit() {
    this.highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10) || 0;
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      this.refreshUnlockedDeck();
    });
  }

  private refreshUnlockedDeck() {
    const filteredLocal: SpeedDrillQuestionDto[] = SPEED_DRILL_QUESTIONS
      .filter(q => q.unitNumber <= this.highestUnlockedUnit)
      .map(q => ({
        id: q.id,
        unitNumber: q.unitNumber,
        category: q.category,
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        ruleHint: q.ruleHint
      }));
    this.masterBank = filteredLocal;
    if (this.flashIndex >= this.masterBank.length) {
      this.flashIndex = 0;
    }

    this.api.getSpeedDrillRound(30).subscribe((qs) => {
      const strictlyUnlocked = (qs || []).filter(item => (item.unitNumber || 1) <= this.highestUnlockedUnit);
      if (strictlyUnlocked.length > 0) {
        this.masterBank = strictlyUnlocked;
      }
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  switchMode(mode: 'drill' | 'flashcards') {
    this.activeMode = mode;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isPlaying = false;
    this.isGameOver = false;
  }

  prevFlashcard() {
    this.isCardFlipped = false;
    this.flashIndex = (this.flashIndex - 1 + this.masterBank.length) % this.masterBank.length;
  }

  nextFlashcard() {
    this.isCardFlipped = false;
    this.flashIndex = (this.flashIndex + 1) % this.masterBank.length;
  }

  getUnitArt(num: number): string {
    const map: Record<number, string> = {
      1: 'bulb', 2: 'gauss-sphere', 3: 'equipotential',
      4: 'capacitor', 5: 'resistor', 6: 'magnet',
      7: 'compass-ampere', 8: 'coil', 9: 'maxwell-wave'
    };
    return map[num] || 'bulb';
  }

  startGame() {
    this.questions = this.shuffleQuestions(this.masterBank);
    this.isPlaying = true;
    this.isGameOver = false;
    this.timeLeft = 90;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalAnswered = 0;
    this.totalCorrect = 0;
    this.selectedOption = null;
    this.feedbackMessage = null;

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  private endGame() {
    this.isGameOver = true;
    this.isPlaying = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem(HIGH_SCORE_KEY, String(this.highScore));
    }
  }

  get currentQuestion(): SpeedDrillQuestionDto | undefined {
    return this.questions[this.currentIndex];
  }

  get multiplier(): number {
    if (this.streak >= 8) return 4;
    if (this.streak >= 5) return 3;
    if (this.streak >= 3) return 2;
    return 1;
  }

  getCategoryLabel(cat: string): string {
    const map: Record<string, string> = {
      mano_derecha: '✋ REGLA MANO DERECHA',
      signo_lenz: '🧲 LEY DE LENZ',
      unidades_si: '📐 UNIDADES SI',
      trampa_vf: '🕵️ TRAMPA CONCEPTUAL',
      circuito_rc_rl: '⚡ TRANSITORIO RC / RL'
    };
    return map[cat] || '⚡ SPEED DRILL';
  }

  selectOption(idx: number) {
    if (this.selectedOption !== null) return;
    this.selectedOption = idx;
    this.totalAnswered++;

    const q = this.currentQuestion;
    if (!q) return;

    this.isCorrect = idx === q.correctIndex;
    if (this.isCorrect) {
      this.totalCorrect++;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      this.score += 100 * this.multiplier;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem(HIGH_SCORE_KEY, String(this.highScore));
      }
      this.feedbackMessage = q.explanation;
    } else {
      this.streak = 0;
      this.feedbackMessage = q.explanation;
      this.api.logError({
        unitNumber: q.unitNumber,
        category: q.category === 'unidades_si' ? 'unidades' : q.category === 'signo_lenz' ? 'signo' : 'conceptual',
        sourceContext: 'cazatrampas',
        topicTitle: `Muerte Súbita (U${q.unitNumber}): ${this.getCategoryLabel(q.category)}`,
        mistakeDescription: `En "${q.prompt}", elegiste "${q.options[idx]}" en lugar de "${q.options[q.correctIndex]}".`,
        correctionExplanation: q.explanation
      }).subscribe();
    }

    setTimeout(() => {
      if (!this.isPlaying) return;
      this.selectedOption = null;
      this.feedbackMessage = null;
      if (this.currentIndex + 1 < this.questions.length) {
        this.currentIndex++;
      } else {
        this.questions = this.shuffleQuestions(this.masterBank);
        this.currentIndex = 0;
      }
    }, 1050);
  }

  private shuffleQuestions(bank: SpeedDrillQuestionDto[]): SpeedDrillQuestionDto[] {
    const copy = [...bank];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
