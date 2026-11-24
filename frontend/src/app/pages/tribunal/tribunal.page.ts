import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, TribunalCaseDto, TribunalResultDto } from '../../services/fisica2-api.service';
import { KatexRenderService } from '../../services/katex-render.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

@Component({
  selector: 'app-tribunal',
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
        <ion-title>✦ Aula de Tribunal Oral — Defensa en Pizarrón (U1 a U9) ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="tribunal-hall-wrapper">

        <!-- ================================================================
             1. BANNER LAVANDA ILUSTRADO + SELECTOR DE LAS 9 UNIDADES CON DIBUJOS
             ================================================================ -->
        <div class="cielo-hero-banner hall-hero">
          <div class="hh-top">
            <app-cielo-art name="tool-oral" [width]="105" [height]="90"></app-cielo-art>
            <div>
              <span class="pill-purple">🎙️ SIMULADOR DE MESA EXAMINADORA UNdeC • 9 UNIDADES</span>
              <h1>Aula Universitaria de Defensa Oral ♡</h1>
              <p>Elegí la unidad, pasá al pizarrón virtual frente a la Profesora Titular y defendé tu planteo ante la repregunta del JTP.</p>
            </div>
          </div>

          <!-- Selector de Unidades (Desbloqueo Secuencial Estricto al 100%) -->
          <div class="nine-illustrated-units">
            <button
              *ngFor="let u of allNineUnits"
              class="u-illo-btn"
              [class.active]="selectedUnit === u.num"
              [style.opacity]="isUnitUnlocked(u.num) ? '1' : '0.5'"
              (click)="selectUnit(u.num)"
            >
              <app-cielo-art [name]="u.art" [width]="38" [height]="40"></app-cielo-art>
              <span class="uib-num">{{ isUnitUnlocked(u.num) ? '🔓' : '🔒' }} U{{ u.num }}</span>
              <span class="uib-name">{{ isUnitUnlocked(u.num) ? u.short : 'Bloqueada' }}</span>
            </button>
          </div>
          <div *ngIf="lockedTribunalMessage" style="margin-top: 12px; background: #ffe4e6; border: 2.5px solid #f43f5e; border-radius: 14px; padding: 10px 14px; color: #881337; font-weight: 800; font-size: 0.88rem;">
            {{ lockedTribunalMessage }}
          </div>
        </div>

        <!-- ================================================================
             2. FASE 1: PROFESORA TITULAR + PIZARRÓN VERDE CON MARCO DE MADERA
             ================================================================ -->
        <div class="cielo-dark-panel exam-stage-card" *ngIf="stage === 'initial' && tribunalCase">
          <!-- Escena Ilustrada: Profesora Titular + Globo de Diálogo Cómic -->
          <div class="professor-scene">
            <div class="prof-portrait-box">
              <app-cielo-art name="prof-titular" [width]="118" [height]="118"></app-cielo-art>
              <span class="prof-role-tag titular">Prof. Titular</span>
            </div>

            <div class="comic-speech-bubble lavender-bubble">
              <div class="csb-kicker">PREGUNTA PRINCIPAL DE APERTURA • {{ tribunalCase.unitTitle || ('UNIDAD ' + selectedUnit) }}</div>
              <div class="csb-quote">"{{ tribunalCase.titularQuestion }}"</div>
            </div>
          </div>

          <!-- PIZARRÓN VERDE UNIVERSITARIO CON MARCO DE MADERA -->
          <div class="wooden-chalkboard">
            <div class="wc-top-bar">
              <span>🖍️ PIZARRÓN DE EXAMEN FINAL — {{ tribunalCase.unitTitle || ('Unidad ' + selectedUnit) }}</span>
              <button class="voice-chalk-btn" [class.recording]="isRecording" (click)="toggleVoiceDictation('initial')">
                {{ isRecording ? '🔴 Escuchando tu voz...' : '🎙️ Dictar Defensa por Voz' }}
              </button>
            </div>

            <div class="wc-instruction" *ngIf="tribunalCase.boardDrawingInstruction">
              <strong>📐 Esquema obligatorio en pizarra:</strong> {{ tribunalCase.boardDrawingInstruction }}
            </div>

            <textarea
              rows="6"
              [(ngModel)]="initialDefense"
              placeholder="Escribí o dictá aquí tu desarrollo en tiza: enunciá la ley física, justificá las condiciones de simetría, planteá la integral o ecuación y despejá la magnitud..."
              class="chalk-textarea"
            ></textarea>

            <div class="wc-ledge">
              <span class="chalk-piece"></span>
              <span class="eraser-block"></span>
              <span class="char-info">{{ initialDefense.length }} caracteres desarrollados</span>
            </div>
          </div>

          <div class="stage-actions-row">
            <button class="cielo-btn-purple" (click)="goToFollowUp()">
              Entregar Pizarrón y Escuchar Repregunta del JTP →
            </button>
          </div>
        </div>

        <!-- ================================================================
             3. FASE 2: REPREGUNTA CAPCIOSA DEL JTP (PERSONAJE ILUSTRADO)
             ================================================================ -->
        <div class="cielo-dark-panel exam-stage-card" *ngIf="stage === 'followup' && tribunalCase">
          <div class="professor-scene">
            <div class="prof-portrait-box">
              <app-cielo-art name="prof-jtp" [width]="118" [height]="118"></app-cielo-art>
              <span class="prof-role-tag jtp">Jefe de TPs (JTP)</span>
            </div>

            <div class="comic-speech-bubble coral-bubble">
              <div class="csb-kicker">REPREGUNTA CAPCIOSA "¿QUÉ PASA SI...?"</div>
              <div class="csb-quote">"{{ tribunalCase.jtpRepregunta }}"</div>
            </div>
          </div>

          <!-- Alerta de Trampa Mortal -->
          <div class="mortal-trap-banner">
            <span class="mt-icon">⚠️</span>
            <div>
              <strong>¡Cuidado con la Trampa Mortal de Mesa!</strong>
              <p>El tribunal reprueba inmediatamente si respondés: <em>"{{ tribunalCase.mortalMistakeNote }}"</em></p>
            </div>
          </div>

          <div class="wooden-chalkboard">
            <div class="wc-top-bar">
              <span>💬 TU DEFENSA ANTE LA OBJECIÓN DEL JTP</span>
              <button class="voice-chalk-btn" [class.recording]="isRecording" (click)="toggleVoiceDictation('followup')">
                {{ isRecording ? '🔴 Escuchando...' : '🎙️ Dictar Respuesta' }}
              </button>
            </div>

            <textarea
              rows="5"
              [(ngModel)]="followUpDefense"
              placeholder="Fundamentá con la ley de conservación, paridad o condición de contorno qué sucede ante el cambio planteado por el JTP..."
              class="chalk-textarea"
            ></textarea>
          </div>

          <div class="stage-actions-row">
            <button class="btn-back-chalk" (click)="stage = 'initial'">← Volver al Planteo Inicial</button>
            <button class="cielo-btn-purple" (click)="evaluateOral()">
              🏆 Defender y Recibir Dictamen del Tribunal
            </button>
          </div>
        </div>

        <!-- ================================================================
             4. FASE 3: DICTAMEN DEL TRIBUNAL Y RÚBRICA DE 5 EJES
             ================================================================ -->
        <div class="cielo-dark-panel exam-stage-card" *ngIf="stage === 'verdict' && result">
          <div class="cielo-lavender-card verdict-hero-card">
            <div class="vhc-score-ring" [class.approved]="result.score >= 60 && !result.triggeredMortalMistake">
              <span class="vhc-num">{{ result.score }}</span>
              <span class="vhc-den">/ 100</span>
            </div>
            <div class="vhc-copy">
              <span class="pill-purple">ACTA DE DICTAMEN • UNIDAD {{ selectedUnit }}</span>
              <h2>{{ result.grade }}</h2>
              <p>{{ result.feedback }}</p>
            </div>
          </div>

          <!-- RÚBRICA DE 5 EJES ACADÉMICOS -->
          <div class="rubric-5grid" *ngIf="result.rubricBreakdown?.length">
            <div class="rubric-card" *ngFor="let ax of result.rubricBreakdown">
              <div class="rc-top">
                <strong>{{ ax.axisName }}</strong>
                <span class="rc-pct" [class.ok]="ax.score >= 70">{{ ax.score }}%</span>
              </div>
              <div class="rc-bar-bg">
                <div class="rc-bar-fill" [class.ok]="ax.score >= 70" [style.width.%]="ax.score"></div>
              </div>
              <p class="rc-comment">{{ ax.comment }}</p>
            </div>
          </div>

          <!-- PIZARRÓN MODELO DE LA CÁTEDRA -->
          <div class="wooden-chalkboard" style="margin-top: 16px;">
            <div class="wc-top-bar">
              <span>🏆 DESARROLLO MODELO ESPERADO POR LA CÁTEDRA UNdeC</span>
            </div>
            <div *ngIf="tribunalCase?.expectedFormula" class="cyber-formula-display" style="margin-bottom: 12px;" [innerHTML]="renderMath(tribunalCase!.expectedFormula!, true)"></div>
            <ul class="chalk-list">
              <li *ngFor="let pt of result.expectedPoints">{{ pt }}</li>
            </ul>
          </div>

          <div class="stage-actions-row">
            <button class="btn-back-chalk" (click)="stage = 'initial'">✏️ Mejorar mi Defensa</button>
            <button class="cielo-btn-purple" (click)="resetTribunal()">🔄 Nueva Defensa de Tribunal</button>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .tribunal-hall-wrapper {
      max-width: 1140px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .hall-hero {
      padding: 20px 24px;
    }
    .hh-top {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 16px;
      align-items: center;
      margin-bottom: 16px;
    }
    @media (max-width: 700px) {
      .hh-top { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .pill-purple {
      display: inline-block;
      background: #7c5dfa;
      border: 2px solid #1b1438;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
      margin-bottom: 4px;
    }
    .hh-top h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 4px 0;
    }
    .hh-top p {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 600;
      color: #2b2354;
    }

    .nine-illustrated-units {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 8px;
    }
    @media (max-width: 860px) {
      .nine-illustrated-units { grid-template-columns: repeat(3, 1fr); }
    }
    .u-illo-btn {
      background: rgba(25, 32, 72, 0.92);
      border: 2.5px solid #1b1438;
      border-radius: 18px;
      padding: 8px 4px;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      transition: all 0.2s;
    }
    .u-illo-btn:hover {
      transform: translateY(-3px);
      background: #2b3570;
    }
    .u-illo-btn.active {
      background: #7c5dfa;
      border-color: #1b1438;
      box-shadow: 0 5px 0 #1b1438;
    }
    .uib-num { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 0.92rem; line-height: 1; }
    .uib-name { font-size: 0.68rem; font-weight: 700; color: #e2d6ff; }

    /* ESCENA DE PROFESOR + GLOBO DE DIÁLOGO */
    .exam-stage-card {
      padding: 24px;
    }
    .professor-scene {
      display: grid;
      grid-template-columns: 135px 1fr;
      gap: 18px;
      align-items: center;
      margin-bottom: 20px;
    }
    @media (max-width: 680px) {
      .professor-scene { grid-template-columns: 1fr; justify-items: center; }
    }
    .prof-portrait-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .prof-role-tag {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 99px;
      border: 2px solid #1b1438;
    }
    .prof-role-tag.titular { background: #9d7eff; color: #ffffff; }
    .prof-role-tag.jtp { background: #ff5d73; color: #ffffff; }

    .comic-speech-bubble {
      position: relative;
      border-radius: 26px;
      padding: 20px 24px;
      border: 3px solid #1b1438;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
    }
    .lavender-bubble {
      background: linear-gradient(145deg, #f3efff 0%, #dcd0ff 100%);
      color: #191538;
    }
    .coral-bubble {
      background: linear-gradient(145deg, #ffe4e9 0%, #ffc2d1 100%);
      color: #2b121c;
    }
    .csb-kicker {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      color: #6c4ce6;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .coral-bubble .csb-kicker { color: #be123c; }
    .csb-quote {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      line-height: 1.35;
    }

    .mortal-trap-banner {
      background: rgba(255, 209, 102, 0.16);
      border: 2.5px solid #ffd166;
      border-radius: 20px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 18px;
      color: #fffbeb;
    }
    .mt-icon { font-size: 1.8rem; }
    .mortal-trap-banner p { margin: 3px 0 0 0; font-size: 0.88rem; }

    /* PIZARRÓN VERDE CON MARCO DE MADERA */
    .wooden-chalkboard {
      background: linear-gradient(160deg, #1b4332 0%, #102a1f 100%);
      border: 8px solid #d97706;
      border-radius: 28px;
      padding: 20px;
      box-shadow:
        0 14px 32px rgba(0, 0, 0, 0.65),
        inset 0 0 28px rgba(0, 0, 0, 0.45);
    }
    .wc-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 10px;
      margin-bottom: 12px;
      border-bottom: 2px dashed rgba(255, 255, 255, 0.25);
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      color: #ffd166;
      font-size: 0.95rem;
    }
    .voice-chalk-btn {
      background: #ffd166;
      border: 2px solid #1b1438;
      color: #191538;
      padding: 6px 14px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .voice-chalk-btn.recording {
      background: #ff4d6d;
      color: #ffffff;
    }
    .wc-instruction {
      background: rgba(255, 255, 255, 0.1);
      border-left: 4px solid #ffd166;
      padding: 10px 14px;
      border-radius: 10px;
      color: #fffbeb;
      font-size: 0.88rem;
      margin-bottom: 12px;
    }
    .chalk-textarea {
      width: 100%;
      background: rgba(9, 24, 17, 0.72);
      border: 2px solid rgba(255, 255, 255, 0.28);
      border-radius: 16px;
      padding: 14px;
      color: #ffffff;
      font-size: 0.96rem;
      line-height: 1.55;
      font-family: var(--font-sans);
    }
    .wc-ledge {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
    }
    .chalk-piece {
      width: 28px;
      height: 8px;
      background: #ffffff;
      border-radius: 4px;
      border: 1.5px solid #1b1438;
    }
    .eraser-block {
      width: 36px;
      height: 12px;
      background: #ff5d73;
      border-radius: 4px;
      border: 1.5px solid #1b1438;
    }
    .char-info {
      margin-left: auto;
      font-size: 0.78rem;
      color: #a7f3d0;
    }
    .chalk-list {
      margin: 0;
      padding-left: 20px;
      color: #fffbeb;
      font-size: 0.92rem;
      line-height: 1.6;
    }

    .stage-actions-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 18px;
      flex-wrap: wrap;
    }
    .btn-back-chalk {
      background: rgba(255, 255, 255, 0.12);
      border: 2px solid rgba(196, 173, 255, 0.45);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 16px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
    }

    /* VEREDICTO */
    .verdict-hero-card {
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 18px;
    }
    .vhc-score-ring {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: #ff4d6d;
      border: 4px solid #1b1438;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .vhc-score-ring.approved {
      background: #38e595;
      color: #191538;
    }
    .vhc-num { font-family: 'Baloo 2', sans-serif; font-size: 2rem; font-weight: 800; line-height: 1; }
    .vhc-den { font-size: 0.78rem; font-weight: 800; }
    .vhc-copy h2 { margin: 4px 0; font-size: 1.6rem; color: #191538; }
    .vhc-copy p { margin: 0; font-size: 0.92rem; font-weight: 600; color: #2b2354; }

    .rubric-5grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .rubric-card {
      background: rgba(15, 19, 46, 0.85);
      border: 2px solid rgba(183, 158, 255, 0.35);
      border-radius: 18px;
      padding: 14px;
    }
    .rc-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.86rem;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .rc-pct { color: #ff8fab; font-weight: 800; }
    .rc-pct.ok { color: #38e595; }
    .rc-bar-bg {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 6px;
    }
    .rc-bar-fill { height: 100%; background: #ff5d73; border-radius: 99px; }
    .rc-bar-fill.ok { background: #38e595; }
    .rc-comment { margin: 0; font-size: 0.76rem; color: #cbd5e1; }
  `]
})
export class TribunalPage implements OnInit {
  selectedUnit = 1;
  highestUnlockedUnit = 1;
  lockedTribunalMessage = '';
  stage: 'initial' | 'followup' | 'verdict' = 'initial';
  initialDefense = '';
  followUpDefense = '';
  isRecording = false;
  private recognition: any = null;

  tribunalCase: TribunalCaseDto | null = null;
  result: TribunalResultDto | null = null;

  allNineUnits = [
    { num: 1, short: 'Electricidad', art: 'bulb' },
    { num: 2, short: 'Gauss', art: 'gauss-sphere' },
    { num: 3, short: 'Potencial', art: 'equipotential' },
    { num: 4, short: 'Capacitores', art: 'capacitor' },
    { num: 5, short: 'Corriente RC', art: 'resistor' },
    { num: 6, short: 'Lorentz', art: 'magnet' },
    { num: 7, short: 'Biot/Ampère', art: 'compass-ampere' },
    { num: 8, short: 'Faraday-Lenz', art: 'coil' },
    { num: 9, short: 'Maxwell/CA', art: 'maxwell-wave' },
  ];

  constructor(
    private api: Fisica2ApiService,
    private katex: KatexRenderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedUnit > this.highestUnlockedUnit) {
        this.selectedUnit = this.highestUnlockedUnit;
        this.loadCase();
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params['u']) {
        const uNum = parseInt(params['u'], 10);
        if (uNum >= 1 && uNum <= 9) {
          this.selectUnit(uNum);
          return;
        }
      }
      this.loadCase();
    });
  }

  isUnitUnlocked(unitNum: number): boolean {
    return unitNum <= this.highestUnlockedUnit;
  }

  selectUnit(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      this.lockedTribunalMessage = `🔒 El examen oral de la Unidad ${unitNum} está bloqueado hasta que completes la Unidad ${this.highestUnlockedUnit} al 100%.`;
      return;
    }
    this.lockedTribunalMessage = '';
    this.selectedUnit = unitNum;
    this.loadCase();
  }

  renderMath(expr: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(expr, displayMode);
  }

  loadCase() {
    this.stage = 'initial';
    this.initialDefense = '';
    this.followUpDefense = '';
    this.result = null;

    this.api.getTribunalCase(this.selectedUnit).subscribe((c) => {
      this.tribunalCase = c;
    });
  }

  goToFollowUp() {
    if (this.initialDefense.trim().length < 15) {
      alert('Por favor desarrollá tu planteo en el pizarrón (al menos un párrafo con la ley física y simetría) antes de pasar a la repregunta del JTP.');
      return;
    }
    this.stage = 'followup';
  }

  evaluateOral() {
    if (this.followUpDefense.trim().length < 10) {
      alert('Por favor respondé a la objeción del JTP antes de solicitar el veredicto del tribunal.');
      return;
    }

    this.api.evaluateOralDefense(this.selectedUnit, this.initialDefense, this.followUpDefense).subscribe((r) => {
      this.result = r;
      this.stage = 'verdict';

      if (r.score >= 60 && !r.triggeredMortalMistake) {
        this.api.recordVerifiedActivity(
          this.selectedUnit,
          'pruebaDominio',
          `tribunal_u${this.selectedUnit}`,
          30
        ).subscribe();
      } else {
        this.api.logError({
          unitNumber: this.selectedUnit,
          category: 'oral',
          sourceContext: 'modo_oral',
          topicTitle: `Defensa de Tribunal Oral U${this.selectedUnit}`,
          mistakeDescription: `Obtuviste ${r.score}/100 (${r.grade}). Conceptos omitidos: ${(r.missingPoints || []).join(', ')}.`,
          correctionExplanation: this.tribunalCase?.mortalMistakeNote || r.feedback
        }).subscribe();
      }
    });
  }

  toggleVoiceDictation(target: 'initial' | 'followup') {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta dictado por voz nativo. Podés escribir tu defensa directamente.');
      return;
    }

    if (this.isRecording && this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-AR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.isRecording = true;
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (target === 'initial') {
        this.initialDefense = (this.initialDefense + ' ' + transcript).trim();
      } else {
        this.followUpDefense = (this.followUpDefense + ' ' + transcript).trim();
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.onerror = () => {
      this.isRecording = false;
    };

    this.recognition.start();
  }

  resetTribunal() {
    this.loadCase();
  }
}
