import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { CATEDRA_PODCAST_SCRIPTS, UnitPodcastScript } from '../../data/audio-podcasts-data';
import { Fisica2ApiService } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

@Component({
  selector: 'app-podcasts',
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
        <ion-title>✦ Estudio de Audio & Podcasts de 3 Minutos ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="podcasts-wrapper">

        <!-- COMPACT HEADER (REFERENCIA PANEL 13) -->
        <div class="pod-top-bar">
          <span class="pod-bar-title">🎧 Podcasts de Repaso — Cápsulas de Audio (3 min)</span>
          <span class="pill-gold">⏱️ 9 Episodios • U1–U9</span>
        </div>

        <div class="cielo-lavender-card" *ngIf="lockedPodcastMsg" style="padding: 12px 18px; background: #ffe4e6; border: 1.5px solid #f43f5e; color: #881337; font-weight: 800;">
          {{ lockedPodcastMsg }}
        </div>

        <!-- LAYOUT 2 COLUMNAS: REPRODUCTOR MODERNO + LISTA DE EPISODIOS -->
        <div class="pod-two-col" *ngIf="currentEpisode as ep">
          <!-- COLUMNA IZQUIERDA: REPRODUCTOR -->
          <div class="cielo-dark-panel pod-player-box">
            <div class="pod-cover-art">
              <div class="pod-wave-ring">🎧</div>
            </div>
            <h2 class="pod-ep-name">Podcast de Repaso — Unidad {{ ep.unitNumber }}</h2>
            <p class="pod-ep-sub">{{ ep.title }}</p>

            <div class="pod-controls-bar">
              <button *ngIf="!isPlaying" class="pod-play-circle" (click)="playSpeech()" title="Reproducir">
                ▶
              </button>
              <button *ngIf="isPlaying" class="pod-play-circle" (click)="pauseOrResume()" title="Pausar/Reanudar">
                {{ isPaused ? '▶' : '⏸' }}
              </button>
              <button *ngIf="isPlaying" class="btn-stop" (click)="stopSpeech()">
                ⏹ Detener
              </button>
              <span class="pod-time-badge">0:00 / {{ ep.durationLabel }}</span>
            </div>

            <div class="speed-box" style="justify-content: center;">
              <span>Velocidad:</span>
              <button
                *ngFor="let r of [0.85, 1.0, 1.2, 1.4]"
                class="rate-pill"
                [class.active]="speechRate === r"
                (click)="speechRate = r"
              >
                {{ r }}x
              </button>
            </div>

            <p class="ep-summary" style="text-align: center; margin-top: 8px;">{{ ep.summary }}</p>
          </div>

          <!-- COLUMNA DERECHA: LISTA DE EPISODIOS -->
          <div class="cielo-dark-panel pod-episodes-list">
            <div class="pel-head">Lista de Episodios</div>
            <button
              *ngFor="let item of episodes"
              class="pel-row"
              [class.active]="selectedUnit === item.unitNumber"
              [style.opacity]="isUnitUnlocked(item.unitNumber) ? '1' : '0.48'"
              (click)="selectUnit(item.unitNumber)"
            >
              <span class="pel-play-dot">{{ isUnitUnlocked(item.unitNumber) ? '▶' : '🔒' }}</span>
              <span class="pel-title">Unidad {{ item.unitNumber }} — {{ item.title }}</span>
              <span class="pel-dur">{{ isUnitUnlocked(item.unitNumber) ? item.durationLabel : 'Bloqueada' }}</span>
            </button>
          </div>
        </div>

        <!-- GUION DETALLADO DEL EPISODIO -->
        <div class="cielo-dark-panel player-card" *ngIf="currentEpisode as ep">
          <div class="blocks-stack">
            <div class="cielo-lavender-card script-block-card" *ngFor="let b of ep.scriptParagraphs; let idx = index">
              <div class="sbc-head">
                <span class="pill-purple">🎙️ {{ b.speaker }} • Parte {{ idx + 1 }}</span>
                <strong class="sbc-title">{{ b.blockTitle }}</strong>
                <button class="mini-play-btn" (click)="playSingleParagraph(b.text)">
                  🔊 Escuchar bloque
                </button>
              </div>
              <p class="sbc-text">{{ b.text }}</p>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .podcasts-wrapper {
      max-width: 1440px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .studio-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 720px) {
      .studio-hero { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .pod-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      background: rgba(18, 21, 52, 0.9);
      border: 1px solid rgba(137, 87, 255, 0.3);
      border-radius: 18px;
      padding: 12px 18px;
    }
    .pod-bar-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
    }
    .pod-two-col {
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 18px;
      align-items: stretch;
    }
    @media (max-width: 960px) {
      .pod-two-col { grid-template-columns: 1fr; }
    }
    .pod-player-box {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .pod-cover-art {
      width: 112px;
      height: 112px;
      border-radius: 26px;
      background: radial-gradient(circle, rgba(137, 87, 255, 0.5) 0%, rgba(20, 23, 56, 0.95) 72%);
      border: 2px solid rgba(166, 130, 255, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 28px rgba(137, 87, 255, 0.45);
    }
    .pod-wave-ring { font-size: 3rem; }
    .pod-ep-name {
      margin: 4px 0 0 0;
      color: #ffffff;
      font-size: 1.25rem;
      text-align: center;
    }
    .pod-ep-sub {
      margin: 0;
      color: #d7c6ff;
      font-size: 0.88rem;
      text-align: center;
    }
    .pod-controls-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 0;
    }
    .pod-play-circle {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(90deg, #8957FF, #a682ff);
      color: #ffffff;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(137, 87, 255, 0.5);
    }
    .pod-time-badge {
      color: #d7c6ff;
      font-weight: 700;
      font-size: 0.85rem;
    }
    .pod-episodes-list {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .pel-head {
      font-family: 'Baloo 2', sans-serif;
      color: #ffd166;
      font-weight: 800;
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
    .pel-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(137, 87, 255, 0.25);
      border-radius: 14px;
      padding: 10px 14px;
      color: #e2d6ff;
      text-align: left;
      cursor: pointer;
    }
    .pel-row.active {
      background: rgba(137, 87, 255, 0.25);
      border-color: #8957FF;
      color: #ffffff;
    }
    .pel-play-dot {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #8957FF;
      color: #ffffff;
      font-size: 0.78rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .pel-title { font-weight: 800; font-size: 0.9rem; flex: 1; }
    .pel-dur { font-size: 0.78rem; color: #ffd166; font-weight: 700; }
    .sh-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
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
    .sh-copy h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.95rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 4px 0;
    }
    .sh-copy p { margin: 0; font-size: 0.92rem; font-weight: 600; color: #2b2354; }

    .unit-episodes-bar {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 10px;
    }
    @media (max-width: 860px) {
      .unit-episodes-bar { grid-template-columns: repeat(3, 1fr); }
    }
    .ep-btn {
      background: linear-gradient(180deg, #15193B 0%, #141a3b 100%);
      border: 2.5px solid rgba(167, 142, 252, 0.36);
      border-radius: 20px;
      padding: 10px 6px;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      transition: all 0.2s;
    }
    .ep-btn.active {
      background: linear-gradient(180deg, #f0ebff 0%, #d8c8ff 100%);
      border: 3px solid #9d7eff;
      color: #191538;
    }
    .eb-num { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 0.88rem; }
    .eb-dur { font-size: 0.7rem; font-weight: 700; color: #ffd166; }
    .ep-btn.active .eb-dur { color: #5b3ec8; }

    .player-card { padding: 24px; }
    .pc-header-split {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 18px;
      align-items: center;
      margin-bottom: 18px;
    }
    @media (max-width: 640px) {
      .pc-header-split { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .ep-title { font-size: 1.55rem; color: #ffffff; margin: 4px 0 6px 0; }
    .ep-summary { font-size: 0.92rem; color: #cbd5e1; margin: 0; line-height: 1.5; }

    .audio-controls-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: rgba(15, 19, 46, 0.85);
      border: 2px solid rgba(183, 158, 255, 0.35);
      padding: 16px;
      border-radius: 20px;
      margin-bottom: 20px;
    }
    .btn-pause {
      background: #ffd166;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #191538;
      padding: 10px 18px;
      border-radius: 14px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-stop {
      background: #ff4d6d;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 14px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
    }
    .speed-box {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: #d8def8;
      font-weight: 700;
    }
    .rate-pill {
      background: #15193B;
      border: 1.5px solid rgba(183, 158, 255, 0.4);
      color: #ffffff;
      padding: 5px 10px;
      border-radius: 10px;
      font-weight: 800;
      cursor: pointer;
    }
    .rate-pill.active {
      background: #ffd166;
      color: #191538;
      border-color: rgba(166, 130, 255, 0.55);
    }

    .blocks-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .script-block-card {
      padding: 18px 22px;
    }
    .sbc-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
    .sbc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.15rem;
      color: #191538;
    }
    .mini-play-btn {
      margin-left: auto;
      background: #8957FF;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #ffffff;
      padding: 5px 14px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
    }
    .sbc-text {
      margin: 0;
      font-size: 0.94rem;
      font-weight: 600;
      color: #241c4c;
      line-height: 1.65;
    }
  `]
})
export class PodcastsPage implements OnInit, OnDestroy {
  selectedUnit = 1;
  highestUnlockedUnit = 1;
  lockedPodcastMsg = '';
  speechRate = 1.0;
  isPlaying = false;
  isPaused = false;

  episodes: UnitPodcastScript[] = CATEDRA_PODCAST_SCRIPTS;

  constructor(private api: Fisica2ApiService) {}

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedUnit > this.highestUnlockedUnit) {
        this.selectedUnit = this.highestUnlockedUnit;
      }
    });
  }

  ngOnDestroy() {
    this.stopSpeech();
  }

  isUnitUnlocked(unitNum: number): boolean {
    return unitNum <= this.highestUnlockedUnit;
  }

  selectUnit(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      this.lockedPodcastMsg = `🔒 El episodio de la Unidad ${unitNum} se desbloquea al completar la Unidad ${this.highestUnlockedUnit} al 100%.`;
      return;
    }
    this.lockedPodcastMsg = '';
    this.stopSpeech();
    this.selectedUnit = unitNum;
  }

  get currentEpisode(): UnitPodcastScript {
    return this.episodes.find(e => e.unitNumber === this.selectedUnit) || this.episodes[0];
  }

  getUnitArt(num: number): string {
    const map: Record<number, string> = {
      1: 'bulb', 2: 'gauss-sphere', 3: 'equipotential',
      4: 'capacitor', 5: 'resistor', 6: 'magnet',
      7: 'compass-ampere', 8: 'coil', 9: 'maxwell-wave'
    };
    return map[num] || 'bulb';
  }

  playSpeech() {
    const fullText = this.currentEpisode.scriptParagraphs.map(p => `${p.blockTitle}. ${p.text}`).join(' ');
    this.speakText(fullText);
  }

  playSingleParagraph(text: string) {
    this.speakText(text);
  }

  private speakText(text: string) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz Web Speech API.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = this.speechRate;
    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
    };
    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
    };
    utterance.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
    };
    window.speechSynthesis.speak(utterance);
  }

  pauseOrResume() {
    if (this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    } else {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
  }
}
