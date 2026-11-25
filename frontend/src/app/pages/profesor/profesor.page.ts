import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { VoiceOptionItem, VoiceTutorService } from '../../services/voice-tutor.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

export interface ProfessorScene {
  sceneNumber: number;
  tag: string;
  title: string;
  teacherSpeech: string;
  easyAnalogySpeech: string;
  deepColloquiumNote: string;
  traditionalFormulaLatex: string;
  formulaMeaningBullets: string[];
  diagramType:
    | 'u1_atom_coulomb'
    | 'u1_field_lines'
    | 'u2_gauss_flux'
    | 'u3_potential_hill'
    | 'u4_capacitor_dielectric'
    | 'u5_current_rc'
    | 'u6_magnet_lorentz'
    | 'u7_solenoid_ampere'
    | 'u8_faraday_lenz'
    | 'u9_rlc_maxwell';
  boardCaptions: string[];
}

export interface ProfessorUnitMasterclass {
  unitNumber: number;
  unitTitle: string;
  subtitle: string;
  scenes: ProfessorScene[];
  guidedExercises: {
    difficultyBadge: string;
    title: string;
    statement: string;
    teacherIntro: string;
    steps: {
      stepTitle: string;
      explanation: string;
      formulaLatex: string;
      calcTip: string;
    }[];
  }[];
}

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
        <ion-title>✦ Clase Magistral del Profesor Virtual Animado ♡</ion-title>
        <ion-buttons slot="end">
          <button class="cielo-btn-purple" style="margin-right: 10px; font-size: 0.8rem; padding: 7px 14px;" routerLink="/calculadora">
            🧮 Abrir Calculadora & Conversor
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="prof-studio-wrapper">

        <!-- ================================================================
             SELECTOR DE UNIDAD (DESBLOQUEO SECUENCIAL ESTRICTO AL 100%)
             ================================================================ -->
        <div class="unit-class-strip">
          <button
            *ngFor="let mc of masterclasses"
            class="ucs-btn"
            [class.active]="selectedUnitNumber === mc.unitNumber"
            [style.opacity]="isUnitUnlocked(mc.unitNumber) ? '1' : '0.55'"
            (click)="selectUnitClass(mc.unitNumber)"
          >
            <app-cielo-art [name]="getUnitArt(mc.unitNumber)" [width]="38" [height]="38"></app-cielo-art>
            <div class="ucs-meta">
              <span class="ucs-num">
                {{ isUnitUnlocked(mc.unitNumber) ? '🔓' : '🔒' }} UNIDAD {{ mc.unitNumber }}
              </span>
              <span class="ucs-name">
                {{ isUnitUnlocked(mc.unitNumber) ? mc.unitTitle : 'Bloqueada (100% U' + (mc.unitNumber - 1) + ')' }}
              </span>
            </div>
          </button>
        </div>

        <div class="cielo-lavender-card" *ngIf="lockedClassMessage" style="padding: 14px 20px; background: #ffe4e6; border: 3px solid #f43f5e; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
          <strong style="color: #881337; font-size: 0.92rem;">{{ lockedClassMessage }}</strong>
          <button class="cielo-btn-purple" (click)="lockedClassMessage = ''">Entendido ♡</button>
        </div>

        <!-- ================================================================
             ESTUDIO DE VOZ FLUIDA: ELEGÍ LA VOZ, RITMO Y ESTILO DE TU PROFESOR
             ================================================================ -->
        <div class="cielo-lavender-card voice-studio-bar">
          <div class="vsb-top">
            <div class="vsb-title">
              <span class="badge-dark">🎙️ PERSONALIZÁ LA VOZ Y FLUIDEZ DE TU PROFESOR</span>
              <strong>Elegí quién te da la clase y a qué velocidad</strong>
            </div>

            <div class="vsb-presets">
              <button class="preset-voice-btn" (click)="applyVoicePreset('profesora')">👩‍🏫 Profesora Cálida</button>
              <button class="preset-voice-btn" (click)="applyVoicePreset('profesor')">👨‍🏫 Profesor Dinámico</button>
              <button class="preset-voice-btn" (click)="applyVoicePreset('fluido')">⚡ Más Fluido (1.18x)</button>
              <button class="preset-voice-btn" (click)="applyVoicePreset('pausado')">🧘 Pausado (0.92x)</button>
              <button class="preset-voice-btn test" (click)="testSelectedVoice()">🔊 Probar Voz</button>
            </div>
          </div>

          <div class="vsb-controls-grid">
            <div class="vsb-field">
              <label>Voz del Profesor/a ({{ availableVoices.length }} voces detectadas — las ⭐ son las más naturales):</label>
              <select
                [(ngModel)]="selectedVoiceId"
                (ngModelChange)="onVoiceChange($event)"
                class="voice-select-box"
              >
                <option *ngFor="let v of availableVoices" [ngValue]="v.id">
                  {{ v.displayLabel }}
                </option>
              </select>
            </div>

            <div class="vsb-field small">
              <label>Fluidez / Velocidad: <strong>{{ speechRate.toFixed(2) }}x</strong></label>
              <input
                type="range"
                min="0.80"
                max="1.40"
                step="0.02"
                [(ngModel)]="speechRate"
                (change)="onRatePitchChange()"
                class="voice-range"
              />
            </div>

            <div class="vsb-field small">
              <label>Tono / Calidez: <strong>{{ speechPitch.toFixed(2) }}</strong></label>
              <input
                type="range"
                min="0.85"
                max="1.15"
                step="0.02"
                [(ngModel)]="speechPitch"
                (change)="onRatePitchChange()"
                class="voice-range"
              />
            </div>
          </div>

          <!-- SUBTÍTULO EN VIVO MIENTRAS HABLA EL PROFESOR -->
          <div class="live-subtitle-banner" *ngIf="isSpeaking && currentSubtitle">
            <span class="lsb-tag">🗣️ DICIENDO AHORA:</span>
            <span class="lsb-txt">"{{ currentSubtitle }}"</span>
          </div>
        </div>

        <!-- ================================================================
             AULA ANIMADA: PROFESOR + PIZARRÓN TIPO VIDEO INTERACTIVO CON VOZ
             ================================================================ -->
        <div class="cielo-dark-panel classroom-stage" *ngIf="currentClass as mc">

          <!-- BARRA DE ESCENAS DEL VIDEO-PIZARRÓN -->
          <div class="scenes-timeline-bar">
            <button
              *ngFor="let sc of mc.scenes; let idx = index"
              class="scene-step-btn"
              [class.active]=" currentSceneIndex === idx && viewMode === 'teoria' "
              (click)="goToScene(idx)"
            >
              <span class="ss-num">Escena {{ sc.sceneNumber }}</span>
              <span class="ss-title">{{ sc.title }}</span>
            </button>

            <button
              class="scene-step-btn exercise-mode-btn"
              [class.active]="viewMode === 'ejercicios'"
              (click)="switchToExercises()"
            >
              <span class="ss-num">✏️ PRÁCTICA EN PIZARRÓN</span>
              <span class="ss-title">El Profe resuelve ejercicios ({{ mc.guidedExercises.length }})</span>
            </button>
          </div>

          <!-- CONTENIDO MODO 1: EXPLICACIÓN TEÓRICA ANIMADA CON DIBUJOS Y VOZ -->
          <div class="classroom-grid" *ngIf="viewMode === 'teoria' && currentScene as sc">

            <!-- COLUMNA IZQUIERDA: PERSONAJE DEL PROFESOR + GLOBO DE EXPLICACIÓN HABLADA -->
            <div class="cielo-lavender-card teacher-pod">
              <div class="tp-avatar-row">
                <div class="teacher-avatar-circle" [class.speaking]="isSpeaking">
                  <app-cielo-art name="prof-titular" [width]="96" [height]="96"></app-cielo-art>
                </div>
                <div class="tp-title-box">
                  <span class="tp-badge">{{ sc.tag }}</span>
                  <h2>{{ sc.title }}</h2>
                  <div class="voice-status" *ngIf="isSpeaking">
                    🔊 El Profesor te está explicando en voz alta...
                  </div>
                </div>
              </div>

              <!-- GLOBO DE DIÁLOGO DEL PROFESOR -->
              <div class="teacher-speech-bubble">
                <div class="tsb-mode-tag">
                  {{ explanationDepth === 'easy' ? '🧒 EXPLICACIÓN FÁCIL Y DESDE CERO:' : explanationDepth === 'deep' ? '🎓 FUNDAMENTO PROFUNDO DE COLOQUIO:' : '👩‍🏫 EXPLICACIÓN PASO A PASO DEL PROFESOR:' }}
                </div>
                <p class="tsb-text">
                  {{ explanationDepth === 'easy' ? sc.easyAnalogySpeech : explanationDepth === 'deep' ? sc.deepColloquiumNote : sc.teacherSpeech }}
                </p>
              </div>

              <!-- CONTROLES DE REPRODUCCIÓN TIPO VIDEO / REPETIR / CAMBIAR NIVEL -->
              <div class="voice-controls-panel">
                <div class="vcp-main-btns">
                  <button class="vc-btn play" *ngIf="!isSpeaking" (click)="speakCurrentExplanation()">
                    ▶ Escuchar al Profesor
                  </button>
                  <button class="vc-btn play" *ngIf="isSpeaking" (click)="togglePauseSpeech()">
                    {{ isPaused ? '▶ Continuar Voz' : '⏸️ Pausar Voz' }}
                  </button>
                  <button class="vc-btn repeat" (click)="repeatCurrentExplanation()">
                    🔁 Volver a Repetir
                  </button>
                  <button class="vc-btn stop" *ngIf="isSpeaking" (click)="stopSpeech()">
                    ⏹️ Silenciar
                  </button>
                </div>

                <div class="vcp-depth-btns">
                  <button
                    class="depth-chip"
                    [class.active]="explanationDepth === 'normal'"
                    (click)="setExplanationDepth('normal')"
                  >
                    👩‍🏫 Clase Normal
                  </button>
                  <button
                    class="depth-chip"
                    [class.active]="explanationDepth === 'easy'"
                    (click)="setExplanationDepth('easy')"
                  >
                    🧒 Explicámelo más fácil
                  </button>
                  <button
                    class="depth-chip"
                    [class.active]="explanationDepth === 'deep'"
                    (click)="setExplanationDepth('deep')"
                  >
                    🎓 Nivel Examen Final
                  </button>
                </div>

                <div class="vcp-nav-row">
                  <button class="nav-scene-btn" [disabled]="currentSceneIndex === 0" (click)="prevScene()">
                    ← Escena Anterior
                  </button>
                  <button class="nav-scene-btn primary" (click)="nextSceneOrExercise()">
                    {{ currentSceneIndex < mc.scenes.length - 1 ? 'Siguiente Escena →' : '✏️ Ver al Profe Resolver Ejercicios →' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- COLUMNA DERECHA: PIZARRÓN ANIMADO CON DIBUJOS EXPLICATIVOS Y FÓRMULA TRADICIONAL -->
            <div class="chalkboard-video-stage">
              <div class="cvs-top-bar">
                <span class="cvs-pill">🎬 PIZARRÓN VISUAL EXPLICATIVO • UNIDAD {{ mc.unitNumber }}</span>
                <span class="cvs-scene-counter">Escena {{ sc.sceneNumber }} de {{ mc.scenes.length }}</span>
              </div>

              <!-- DIBUJO GRANDE ANIMADO SVG QUE EXPLICA EL "QUÉ ES" Y "DE DÓNDE SALE" -->
              <div class="animated-diagram-canvas">

                <!-- 1. UNIDAD 1: ÁTOMO, CARGA ELÉCTRICA Y LEY DE COULOMB -->
                <svg *ngIf="sc.diagramType === 'u1_atom_coulomb'" viewBox="0 0 600 245" class="board-svg">
                  <!-- Mitad Izquierda: ¿Qué es una Carga Eléctrica? -->
                  <rect x="12" y="12" width="272" height="220" rx="16" fill="rgba(255,255,255,0.06)" stroke="#fde047" stroke-width="2" stroke-dasharray="6 4" />
                  <text x="148" y="34" text-anchor="middle" fill="#fde047" font-weight="900" font-size="13">1. ¿QUÉ ES LA CARGA ELÉCTRICA?</text>
                  <!-- Núcleo con protones (+) y órbitas con electrones (-) -->
                  <circle cx="148" cy="115" r="24" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="148" y="120" text-anchor="middle" fill="#fff" font-weight="900" font-size="15">+Ze</text>
                  <ellipse cx="148" cy="115" rx="75" ry="32" fill="none" stroke="#7dd3fc" stroke-width="2" transform="rotate(-22 148 115)" />
                  <ellipse cx="148" cy="115" rx="75" ry="32" fill="none" stroke="#7dd3fc" stroke-width="2" transform="rotate(28 148 115)" />
                  <circle cx="82" cy="88" r="10" fill="#38bdf8" stroke="#fff" stroke-width="2">
                    <animate attributeName="r" values="9;12;9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="82" y="92" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="13">-</text>
                  <circle cx="214" cy="142" r="10" fill="#38bdf8" stroke="#fff" stroke-width="2" />
                  <text x="214" y="146" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="13">-</text>
                  <text x="148" y="188" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="11.5">Pierde electrones → Carga +q</text>
                  <text x="148" y="206" text-anchor="middle" fill="#7dd3fc" font-weight="800" font-size="11.5">Gana electrones → Carga -q (q = n·e)</text>

                  <!-- Mitad Derecha: ¿De dónde sale la Ley de Coulomb 1/r²? -->
                  <rect x="298" y="12" width="290" height="220" rx="16" fill="rgba(255,255,255,0.06)" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="6 4" />
                  <text x="443" y="34" text-anchor="middle" fill="#7dd3fc" font-weight="900" font-size="13">2. ¿DE DÓNDE SALE LA LEY DE COULOMB?</text>
                  <!-- Dos cargas interactuando -->
                  <line x1="365" y1="105" x2="520" y2="105" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 4" />
                  <line x1="365" y1="105" x2="315" y2="105" stroke="#fb7185" stroke-width="4" />
                  <polygon points="310,105 322,98 322,112" fill="#fb7185" />
                  <line x1="520" y1="105" x2="570" y2="105" stroke="#fb7185" stroke-width="4" />
                  <polygon points="575,105 563,98 563,112" fill="#fb7185" />
                  <circle cx="365" cy="105" r="20" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="365" y="110" text-anchor="middle" fill="#fff" font-weight="900" font-size="14">+q₁</text>
                  <circle cx="520" cy="105" r="20" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="520" y="110" text-anchor="middle" fill="#fff" font-weight="900" font-size="14">+q₂</text>
                  <text x="443" y="92" text-anchor="middle" fill="#fde047" font-weight="900" font-size="13">Distancia r</text>
                  <text x="443" y="168" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="12">Igual signo se repelen • Distinto se atraen</text>
                  <text x="443" y="190" text-anchor="middle" fill="#6ee7b7" font-weight="800" font-size="11.5">Si duplicás r (2r), la fuerza cae 4 veces (1/r²)</text>
                </svg>

                <!-- 2. UNIDAD 1 ESCENA 2: CAMPO ELÉCTRICO Y DISTRIBUCIONES CONTINUAS dq -->
                <svg *ngIf="sc.diagramType === 'u1_field_lines'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES EL CAMPO ELÉCTRICO E⃗ Y CÓMO SE INTEGRA UN CUERPO EXTENSO (dq)?</text>
                  <!-- Carga + con rayos salientes -->
                  <g stroke="#7dd3fc" stroke-width="2.5">
                    <line x1="135" y1="125" x2="135" y2="55" />
                    <line x1="135" y1="125" x2="135" y2="195" />
                    <line x1="135" y1="125" x2="65" y2="125" />
                    <line x1="135" y1="125" x2="205" y2="125" />
                    <line x1="135" y1="125" x2="85" y2="75" />
                    <line x1="135" y1="125" x2="185" y2="75" />
                    <line x1="135" y1="125" x2="85" y2="175" />
                    <line x1="135" y1="125" x2="185" y2="175" />
                  </g>
                  <circle cx="135" cy="125" r="24" fill="#fb7185" stroke="#fff" stroke-width="3" />
                  <text x="135" y="131" text-anchor="middle" fill="#fff" font-weight="900" font-size="18">+Q</text>
                  <text x="135" y="222" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="12">De +Q nacen las líneas de campo E⃗</text>

                  <!-- Barra cortada en pedacitos dq = lambda dx -->
                  <rect x="310" y="105" width="160" height="24" rx="6" fill="#a78bfa" stroke="#fff" stroke-width="2.5" />
                  <rect x="355" y="103" width="24" height="28" fill="#fde047" stroke="#191538" stroke-width="2.5" />
                  <text x="367" y="92" text-anchor="middle" fill="#fde047" font-weight="900" font-size="12">Pedacito dq = λ·dx</text>
                  <line x1="367" y1="117" x2="535" y2="117" stroke="#6ee7b7" stroke-width="3" stroke-dasharray="5 3" />
                  <circle cx="535" cy="117" r="6" fill="#6ee7b7" />
                  <line x1="535" y1="117" x2="582" y2="117" stroke="#fb7185" stroke-width="4" />
                  <polygon points="586,117 574,110 574,124" fill="#fb7185" />
                  <text x="555" y="98" text-anchor="middle" fill="#fb7185" font-weight="900" font-size="13">dE⃗</text>
                  <text x="445" y="222" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="12">Sumamos todos los pedacitos dE⃗ con una integral ∫</text>
                </svg>

                <!-- 3. UNIDAD 2: FLUJO ELÉCTRICO Y SUPERFICIE GAUSSIANA -->
                <svg *ngIf="sc.diagramType === 'u2_gauss_flux'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES LA LEY DE GAUSS Y POR QUÉ ADENTRO DE UN CONDUCTOR E⃗ = 0?</text>
                  <!-- Esfera Gaussiana imaginaria -->
                  <circle cx="165" cy="128" r="68" fill="rgba(125, 211, 252, 0.14)" stroke="#fde047" stroke-width="3" stroke-dasharray="8 5" />
                  <circle cx="165" cy="128" r="20" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="165" y="134" text-anchor="middle" fill="#fff" font-weight="900" font-size="15">+q</text>
                  <line x1="185" y1="128" x2="262" y2="128" stroke="#7dd3fc" stroke-width="3.5" />
                  <polygon points="266,128 254,121 254,135" fill="#7dd3fc" />
                  <text x="255" y="112" fill="#7dd3fc" font-weight="900" font-size="13">E⃗ ∥ dA⃗</text>
                  <text x="165" y="222" text-anchor="middle" fill="#fde047" font-weight="800" font-size="12">Superficie Gaussiana Imaginaria de radio r</text>

                  <!-- Conductor en equilibrio (Jaula de Faraday) -->
                  <circle cx="445" cy="128" r="68" fill="rgba(167, 139, 250, 0.2)" stroke="#c4b5fd" stroke-width="5" />
                  <text x="445" y="124" text-anchor="middle" fill="#6ee7b7" font-weight="900" font-size="16">E⃗_interior = 0</text>
                  <text x="445" y="144" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="12">q_adentro = 0</text>
                  <text x="445" y="52" text-anchor="middle" fill="#fb7185" font-weight="900" font-size="15">+   +   +</text>
                  <text x="445" y="212" text-anchor="middle" fill="#fb7185" font-weight="900" font-size="15">+   +   +</text>
                  <text x="445" y="232" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="11.5">Toda la carga libre se va al borde exterior</text>
                </svg>

                <!-- 4. UNIDAD 3: POTENCIAL ELÉCTRICO Y EQUIPOTENCIALES -->
                <svg *ngIf="sc.diagramType === 'u3_potential_hill'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES EL POTENCIAL V (VOLTAJE) Y UNA SUPERFICIE EQUIPOTENCIAL?</text>
                  <!-- Círculos equipotenciales -->
                  <circle cx="170" cy="130" r="78" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-dasharray="6 4" />
                  <circle cx="170" cy="130" r="50" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="6 4" />
                  <circle cx="170" cy="130" r="20" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="170" y="135" text-anchor="middle" fill="#fff" font-weight="900" font-size="14">+Q</text>
                  <text x="170" y="72" text-anchor="middle" fill="#fde047" font-weight="900" font-size="11">V₁ = 100 V</text>
                  <text x="170" y="45" text-anchor="middle" fill="#6ee7b7" font-weight="900" font-size="11">V₂ = 50 V</text>

                  <!-- Montaña de potencial -->
                  <path d="M 330 60 Q 430 65 555 185" fill="none" stroke="#fde047" stroke-width="4" />
                  <circle cx="365" cy="70" r="10" fill="#fb7185" stroke="#fff" stroke-width="2" />
                  <text x="455" y="98" fill="#7dd3fc" font-weight="900" font-size="13">E⃗ apunta cuesta abajo (-∇V)</text>
                  <text x="445" y="218" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="12">El campo E⃗ siempre va de Mayor Voltaje a Menor Voltaje</text>
                </svg>

                <!-- 5. UNIDAD 4: CAPACITOR Y DIELÉCTRICO POR DENTRO -->
                <svg *ngIf="sc.diagramType === 'u4_capacitor_dielectric'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES UN CAPACITOR POR DENTRO Y QUÉ HACE EL DIELÉCTRICO (κ)?</text>
                  <!-- Placa izquierda +Q -->
                  <rect x="115" y="48" width="24" height="145" rx="6" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="127" y="42" text-anchor="middle" fill="#fb7185" font-weight="900" font-size="13">Placa +Q (Área A)</text>
                  <!-- Placa derecha -Q -->
                  <rect x="460" y="48" width="24" height="145" rx="6" fill="#38bdf8" stroke="#fff" stroke-width="2.5" />
                  <text x="472" y="42" text-anchor="middle" fill="#7dd3fc" font-weight="900" font-size="13">Placa -Q (Área A)</text>
                  <!-- Bloque Dieléctrico polarizado -->
                  <rect x="165" y="56" width="270" height="128" rx="12" fill="rgba(167, 139, 250, 0.25)" stroke="#fde047" stroke-width="2.5" stroke-dasharray="6 4" />
                  <text x="300" y="82" text-anchor="middle" fill="#fde047" font-weight="900" font-size="13">Dieléctrico Aislante (κ > 1)</text>
                  <!-- Dipolos alineados -->
                  <g transform="translate(205, 115)">
                    <ellipse cx="0" cy="0" rx="22" ry="12" fill="#e2e8f0" stroke="#191538" stroke-width="2" />
                    <text x="-10" y="4" fill="#0284c7" font-weight="900" font-size="13">-</text>
                    <text x="6" y="4" fill="#e11d48" font-weight="900" font-size="13">+</text>
                  </g>
                  <g transform="translate(300, 115)">
                    <ellipse cx="0" cy="0" rx="22" ry="12" fill="#e2e8f0" stroke="#191538" stroke-width="2" />
                    <text x="-10" y="4" fill="#0284c7" font-weight="900" font-size="13">-</text>
                    <text x="6" y="4" fill="#e11d48" font-weight="900" font-size="13">+</text>
                  </g>
                  <g transform="translate(395, 115)">
                    <ellipse cx="0" cy="0" rx="22" ry="12" fill="#e2e8f0" stroke="#191538" stroke-width="2" />
                    <text x="-10" y="4" fill="#0284c7" font-weight="900" font-size="13">-</text>
                    <text x="6" y="4" fill="#e11d48" font-weight="900" font-size="13">+</text>
                  </g>
                  <text x="300" y="162" text-anchor="middle" fill="#6ee7b7" font-weight="900" font-size="12">El dieléctrico reduce el campo interno → Multiplica la Capacidad C = κ·C₀</text>
                  <text x="300" y="222" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="12.5">Separación d entre placas: cuanto más cerca están (menor d), mayor es C</text>
                </svg>

                <!-- 6. UNIDAD 5: CORRIENTE ELÉCTRICA, OHM Y CIRCUITO RC -->
                <svg *ngIf="sc.diagramType === 'u5_current_rc'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES LA CORRIENTE I EN UN CABLE Y CÓMO SE CARGA UN CIRCUITO RC?</text>
                  <!-- Tubo conductor con electrones -->
                  <rect x="35" y="70" width="235" height="68" rx="34" fill="rgba(255,255,255,0.1)" stroke="#fde047" stroke-width="3" />
                  <circle cx="85" cy="104" r="11" fill="#38bdf8" stroke="#fff" stroke-width="2" />
                  <text x="85" y="108" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="12">e⁻</text>
                  <circle cx="155" cy="104" r="11" fill="#38bdf8" stroke="#fff" stroke-width="2" />
                  <text x="155" y="108" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="12">e⁻</text>
                  <circle cx="220" cy="104" r="11" fill="#38bdf8" stroke="#fff" stroke-width="2" />
                  <text x="220" y="108" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="12">e⁻</text>
                  <text x="152" y="168" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="12">R = ρ · L / A (Más largo = más resistencia)</text>

                  <!-- Curva de carga RC -->
                  <line x1="330" y1="185" x2="565" y2="185" stroke="#fff" stroke-width="2.5" />
                  <line x1="330" y1="55" x2="330" y2="185" stroke="#fff" stroke-width="2.5" />
                  <line x1="330" y1="72" x2="565" y2="72" stroke="#fde047" stroke-width="2" stroke-dasharray="5 4" />
                  <path d="M 330 185 Q 375 82 560 74" fill="none" stroke="#6ee7b7" stroke-width="4" />
                  <text x="455" y="64" fill="#fde047" font-weight="900" font-size="11.5">Asíntota V_final = ε (en t ≥ 5τ)</text>
                  <text x="445" y="218" text-anchor="middle" fill="#7dd3fc" font-weight="800" font-size="12">En t = 0⁺ el capacitor vacío es un cable; en t → ∞ es circuito abierto</text>
                </svg>

                <!-- 7. UNIDAD 6: CAMPO MAGNÉTICO, LORENTZ Y CICLOTRÓN -->
                <svg *ngIf="sc.diagramType === 'u6_magnet_lorentz'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES UN CAMPO MAGNÉTICO B⃗ Y POR QUÉ LA CARGA GIRA EN CÍRCULOS?</text>
                  <!-- Imán N-S con líneas cerradas -->
                  <rect x="45" y="95" width="75" height="44" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="82" y="122" text-anchor="middle" fill="#fff" font-weight="900" font-size="16">NORTE</text>
                  <rect x="120" y="95" width="75" height="44" fill="#38bdf8" stroke="#fff" stroke-width="2.5" />
                  <text x="157" y="122" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="16">SUR</text>
                  <path d="M 60 95 C 60 35, 180 35, 180 95" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 3" />
                  <path d="M 60 139 C 60 198, 180 198, 180 139" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 3" />
                  <text x="120" y="222" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="11.5">Líneas siempre cerradas (∮ B⃗·dA⃗ = 0)</text>

                  <!-- Órbita de Ciclotrón -->
                  <circle cx="445" cy="126" r="64" fill="none" stroke="#7dd3fc" stroke-width="3" stroke-dasharray="6 4" />
                  <circle cx="445" cy="62" r="13" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="445" y="67" text-anchor="middle" fill="#fff" font-weight="900" font-size="13">+q</text>
                  <!-- Vector velocidad v tangente -->
                  <line x1="458" y1="62" x2="525" y2="62" stroke="#6ee7b7" stroke-width="3.5" />
                  <text x="538" y="66" fill="#6ee7b7" font-weight="900" font-size="13">v⃗</text>
                  <!-- Vector fuerza F_B hacia el centro -->
                  <line x1="445" y1="75" x2="445" y2="122" stroke="#fde047" stroke-width="3.5" />
                  <text x="478" y="108" fill="#fde047" font-weight="900" font-size="13">F⃗_B ⊥ v⃗</text>
                  <text x="445" y="222" text-anchor="middle" fill="#fde047" font-weight="800" font-size="12">F⃗_B es centrípeta → Curva la trayectoria sin hacer trabajo (W = 0)</text>
                </svg>

                <!-- 8. UNIDAD 7: ¿QUÉ ES UN SOLENOIDE Y LA LEY DE AMPÈRE? -->
                <svg *ngIf="sc.diagramType === 'u7_solenoid_ampere'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES UN SOLENOIDE (BOBINA) POR DENTRO Y CÓMO CREA CAMPO MAGNÉTICO?</text>
                  <!-- Líneas de campo magnético B uniformes adentro del solenoide -->
                  <line x1="65" y1="102" x2="535" y2="102" stroke="#6ee7b7" stroke-width="3.5" />
                  <line x1="55" y1="126" x2="545" y2="126" stroke="#6ee7b7" stroke-width="4.5" />
                  <line x1="65" y1="150" x2="535" y2="150" stroke="#6ee7b7" stroke-width="3.5" />
                  <polygon points="550,126 534,117 534,135" fill="#6ee7b7" />
                  <!-- Espiras de cobre enrolladas -->
                  <g fill="none" stroke="#fb923c" stroke-width="5">
                    <ellipse cx="150" cy="126" rx="22" ry="52" />
                    <ellipse cx="210" cy="126" rx="22" ry="52" />
                    <ellipse cx="270" cy="126" rx="22" ry="52" />
                    <ellipse cx="330" cy="126" rx="22" ry="52" />
                    <ellipse cx="390" cy="126" rx="22" ry="52" />
                    <ellipse cx="450" cy="126" rx="22" ry="52" />
                  </g>
                  <text x="300" y="56" text-anchor="middle" fill="#7dd3fc" font-weight="900" font-size="12.5">Afuera del solenoide los campos se cancelan (B_exterior ≈ 0)</text>
                  <text x="300" y="206" text-anchor="middle" fill="#fde047" font-weight="900" font-size="13">Adentro las N espiras suman su campo → B = μ₀ · (N / L) · I uniforme</text>
                  <text x="300" y="226" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="11.5">Regla Mano Derecha: Dedos siguen la corriente I de las espiras → Pulgar apunta hacia B⃗</text>
                </svg>

                <!-- 9. UNIDAD 8: INDUCCIÓN DE FARADAY-LENZ -->
                <svg *ngIf="sc.diagramType === 'u8_faraday_lenz'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿DE DÓNDE SALE LA CORRIENTE INDUCIDA (FARADAY) Y EL SIGNO MENOS DE LENZ?</text>
                  <!-- Imán moviéndose hacia la espira -->
                  <rect x="65" y="102" width="75" height="44" fill="#38bdf8" stroke="#fff" stroke-width="2.5" />
                  <text x="102" y="129" text-anchor="middle" fill="#0f172a" font-weight="900" font-size="15">SUR</text>
                  <rect x="140" y="102" width="75" height="44" fill="#fb7185" stroke="#fff" stroke-width="2.5" />
                  <text x="177" y="129" text-anchor="middle" fill="#fff" font-weight="900" font-size="15">NORTE</text>
                  <!-- Flecha de movimiento v -->
                  <line x1="225" y1="124" x2="295" y2="124" stroke="#fde047" stroke-width="4" />
                  <polygon points="300,124 286,116 286,132" fill="#fde047" />
                  <text x="260" y="106" text-anchor="middle" fill="#fde047" font-weight="900" font-size="12">Se acerca → ΔΦ_B ↑</text>

                  <!-- Espira conductora que se defiende -->
                  <ellipse cx="395" cy="124" rx="28" ry="66" fill="rgba(110, 231, 183, 0.18)" stroke="#6ee7b7" stroke-width="4.5" />
                  <!-- Campo inducido B_ind opuesto -->
                  <line x1="395" y1="124" x2="325" y2="124" stroke="#6ee7b7" stroke-width="4" />
                  <polygon points="320,124 334,116 334,132" fill="#6ee7b7" />
                  <text x="485" y="115" fill="#6ee7b7" font-weight="900" font-size="13">← B⃗_inducido se opone</text>
                  <text x="485" y="138" fill="#ffffff" font-weight="800" font-size="12">¡Por eso va el signo (−)!</text>
                  <text x="300" y="220" text-anchor="middle" fill="#fde047" font-weight="800" font-size="12.5">Si el imán está quieto, Φ_B no cambia y la fem inducida es CERO (ε = 0)</text>
                </svg>

                <!-- 10. UNIDAD 9: FASORES RLC, RESONANCIA Y ONDA DE MAXWELL -->
                <svg *ngIf="sc.diagramType === 'u9_rlc_maxwell'" viewBox="0 0 600 245" class="board-svg">
                  <text x="300" y="28" text-anchor="middle" fill="#fde047" font-weight="900" font-size="14">¿QUÉ ES EL TRIÁNGULO DE IMPEDANCIA RLC Y LA RESONANCIA ELÉCTRICA?</text>
                  <!-- Triángulo rectángulo de impedancia -->
                  <line x1="95" y1="175" x2="275" y2="175" stroke="#6ee7b7" stroke-width="4" />
                  <line x1="275" y1="175" x2="275" y2="68" stroke="#fb7185" stroke-width="4" />
                  <line x1="95" y1="175" x2="275" y2="68" stroke="#fde047" stroke-width="4.5" />
                  <text x="185" y="198" text-anchor="middle" fill="#6ee7b7" font-weight="900" font-size="13">Base = Resistencia R (Ω)</text>
                  <text x="342" y="125" fill="#fb7185" font-weight="900" font-size="13">Altura = X_L − X_C</text>
                  <text x="165" y="108" fill="#fde047" font-weight="900" font-size="14">Hipotenusa = Z</text>
                  <text x="135" y="166" fill="#ffffff" font-weight="900" font-size="12">φ</text>

                  <!-- Caja de Resonancia -->
                  <rect x="415" y="65" width="165" height="125" rx="14" fill="rgba(253, 224, 71, 0.14)" stroke="#fde047" stroke-width="2.5" />
                  <text x="497" y="92" text-anchor="middle" fill="#fde047" font-weight="900" font-size="13">⚡ EN RESONANCIA:</text>
                  <text x="497" y="118" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="12.5">X_L = X_C</text>
                  <text x="497" y="142" text-anchor="middle" fill="#6ee7b7" font-weight="900" font-size="12.5">Z_mínima = R</text>
                  <text x="497" y="166" text-anchor="middle" fill="#7dd3fc" font-weight="900" font-size="12">Corriente I es MÁXIMA</text>
                  <text x="300" y="225" text-anchor="middle" fill="#ecfdf5" font-weight="800" font-size="12">En la bobina L el voltaje adelanta 90° a la corriente; en el capacitor C atrasa 90°</text>
                </svg>

              </div>

              <!-- FÓRMULA TRADICIONAL ORDENADA Y DESGLOSE DE CADA TÉRMINO -->
              <div class="board-formula-box">
                <div class="bfb-left">
                  <span class="bfb-kicker">📐 FÓRMULA TRADICIONAL ORDENADA (DE DÓNDE SALE CADA LETRA)</span>
                  <div class="traditional-white-card" [innerHTML]="renderMath(sc.traditionalFormulaLatex, true)"></div>
                </div>
                <div class="bfb-right">
                  <div class="meaning-pill" *ngFor="let mb of sc.formulaMeaningBullets">
                    {{ mb }}
                  </div>
                </div>
              </div>

              <!-- APUNTES DE TIZA CLAVE DE LA ESCENA -->
              <div class="board-captions-row">
                <div class="bc-chip" *ngFor="let cap of sc.boardCaptions">
                  ✦ {{ cap }}
                </div>
              </div>
            </div>

          </div>

          <!-- CONTENIDO MODO 2: EL PROFESOR RESUELVE EJERCICIOS DE MENOR A MAYOR DIFICULTAD -->
          <div class="exercises-classroom-pane" *ngIf="viewMode === 'ejercicios'">
            <div class="ecp-top">
              <div>
                <span class="kicker-yellow">✏️ RESOLUCIÓN GUIADA POR EL PROFESOR • DE MENOR A MAYOR DIFICULTAD</span>
                <h3>Elegí un ejercicio para que el Profesor te lo resuelva y explique en voz alta</h3>
              </div>
              <div class="ex-selector-row">
                <button
                  *ngFor="let ex of mc.guidedExercises; let idx = index"
                  class="ex-pick-btn"
                  [class.active]="selectedExerciseIdx === idx"
                  (click)="selectProfessorExercise(idx)"
                >
                  <span>{{ ex.difficultyBadge }}</span>
                  <strong>{{ ex.title }}</strong>
                </button>
              </div>
            </div>

            <div class="prof-exercise-board" *ngIf="mc.guidedExercises[selectedExerciseIdx] as pEx">
              <div class="cielo-lavender-card pex-statement-card">
                <div class="pex-head">
                  <span class="badge-dark">{{ pEx.difficultyBadge }} • UNIDAD {{ mc.unitNumber }}</span>
                  <div class="pex-voice-btns">
                    <button class="cielo-btn-purple" (click)="speakExerciseWalkthrough(pEx)">
                      🔊 Escuchar al Profesor explicar todo el ejercicio
                    </button>
                    <button class="btn-outline-dark" *ngIf="isSpeaking" (click)="stopSpeech()">
                      ⏹️ Detener Voz
                    </button>
                  </div>
                </div>
                <h3>{{ pEx.title }}</h3>
                <p class="pex-stmt"><strong>Enunciado:</strong> {{ pEx.statement }}</p>
                <div class="pex-teacher-intro">
                  👩‍🏫 <strong>Consejo inicial del Profesor:</strong> "{{ pEx.teacherIntro }}"
                </div>
              </div>

              <div class="pex-steps-grid">
                <div class="cielo-lavender-card pex-step-box" *ngFor="let st of pEx.steps; let sIdx = index">
                  <div class="psb-top">
                    <span class="psb-num">{{ st.stepTitle }}</span>
                    <button class="psb-speak-btn" (click)="speakSingleText(st.stepTitle + '. ' + st.explanation + '. ' + st.calcTip)">
                      🔊 Escuchar este paso
                    </button>
                  </div>
                  <p class="psb-exp">{{ st.explanation }}</p>
                  <div class="traditional-white-card" [innerHTML]="renderMath(st.formulaLatex, true)"></div>
                  <div class="psb-calc">
                    🧮 <strong>En la calculadora:</strong> {{ st.calcTip }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================================================================
             CONSULTORIO EN VIVO: PREGUNTALE AL PROFESOR O PEDILE UN EJERCICIO
             ================================================================ -->
        <div class="cielo-lavender-card ask-professor-card">
          <div class="apc-header">
            <app-cielo-art name="prof-jtp" [width]="74" [height]="74"></app-cielo-art>
            <div>
              <span class="badge-dark">💬 CONSULTORIO INTERACTIVO 24/7 CON EL PROFESOR</span>
              <h2>¿Qué tema o ejercicio querés que el Profesor te explique o repita ahora?</h2>
              <p>
                Hacé clic en una pregunta rápida o escribí tu duda/ejercicio abajo. El Profesor te arma la respuesta con fórmula tradicional y te la lee en voz alta.
              </p>
            </div>
          </div>

          <div class="quick-questions-strip">
            <button class="qq-btn" (click)="askQuickQuestion('¿Qué es una carga eléctrica y de dónde sale la Ley de Coulomb?')">
              ⚡ U1: ¿Qué es una carga y la Ley de Coulomb?
            </button>
            <button class="qq-btn" (click)="askQuickQuestion('¿Qué es el campo eléctrico y cómo paso de cm a m y de microCoulombs a Coulombs?')">
              📐 U1: ¿Qué es el Campo Eléctrico y cómo convierto unidades?
            </button>
            <button class="qq-btn" *ngIf="isUnitUnlocked(2)" (click)="askQuickQuestion('¿Qué es la Ley de Gauss y por qué adentro de un conductor el campo es cero?')">
              🌐 U2: ¿Qué es Gauss y el conductor?
            </button>
            <button class="qq-btn" *ngIf="isUnitUnlocked(4)" (click)="askQuickQuestion('¿Qué es un capacitor, qué hace el dieléctrico y cómo paso de pF a nF y F?')">
              🔋 U4: ¿Qué es un capacitor y cómo paso pF a nF?
            </button>
            <button class="qq-btn" *ngIf="isUnitUnlocked(7)" (click)="askQuickQuestion('¿Qué es un campo magnético, la fuerza de Lorentz y un solenoide?')">
              🧲 U6-U7: ¿Qué es el campo magnético y un solenoide?
            </button>
            <button class="qq-btn" *ngIf="isUnitUnlocked(8)" (click)="askQuickQuestion('¿Qué dice la Ley de Faraday-Lenz y qué significa el signo menos?')">
              🌀 U8: ¿De dónde sale Faraday-Lenz?
            </button>
            <button class="qq-btn" *ngIf="isUnitUnlocked(9)" (click)="askQuickQuestion('¿Qué es la impedancia RLC y cuándo entra en resonancia en corriente alterna?')">
              〰️ U9: ¿Qué es Impedancia RLC y Resonancia?
            </button>
          </div>

          <div class="ask-input-row">
            <input
              type="text"
              [(ngModel)]="studentQuestionInput"
              (keyup.enter)="submitQuestionToProfessor()"
              placeholder="Escribí tu duda o ejercicio acá (ej: ¿Qué es un solenoide? o ¿Cómo paso de cm2 a m2?)..."
              class="ask-text-input"
            />
            <button class="cielo-btn-purple" (click)="submitQuestionToProfessor()">
              👩‍🏫 Preguntar al Profesor
            </button>
          </div>

          <div class="professor-custom-answer" *ngIf="professorReply">
            <div class="pca-top">
              <strong>👩‍🏫 Respuesta del Profesor en el Pizarrón:</strong>
              <div class="pca-actions">
                <button class="psb-speak-btn" (click)="speakSingleText(professorReply.speechText)">
                  🔁 Volver a Escuchar con Voz
                </button>
              </div>
            </div>
            <p class="pca-body">{{ professorReply.speechText }}</p>
            <div class="traditional-white-card" *ngIf="professorReply.formulaLatex" [innerHTML]="renderMath(professorReply.formulaLatex, true)"></div>
            <div class="pca-tip" *ngIf="professorReply.calcTip">
              🧮 <strong>Tip de Calculadora y Unidades:</strong> {{ professorReply.calcTip }}
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .prof-studio-wrapper {
      max-width: 1360px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* TIRA DE 9 UNIDADES */
    .unit-class-strip {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 8px;
    }
    @media (max-width: 1140px) {
      .unit-class-strip { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 620px) {
      .unit-class-strip { grid-template-columns: repeat(2, 1fr); }
    }
    .ucs-btn {
      background: linear-gradient(180deg, #252b5c 0%, #191e45 100%);
      border: 2.5px solid #48508a;
      border-radius: 16px;
      padding: 8px 10px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: left;
      box-shadow: 0 4px 0 #10132e;
      transition: all 0.16s ease;
    }
    .ucs-btn:hover { transform: translateY(-2px); border-color: #a992ff; }
    .ucs-btn.active {
      background: linear-gradient(180deg, #efeaff 0%, #d9cbff 100%);
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 5px 0 #5b3ec8;
    }
    .ucs-meta { display: flex; flex-direction: column; min-width: 0; }
    .ucs-num { font-size: 0.66rem; font-weight: 900; color: #b8abeb; }
    .ucs-btn.active .ucs-num { color: #5b3ec8; }
    .ucs-name {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 800;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ESTUDIO DE SELECCIÓN DE VOZ */
    .voice-studio-bar {
      padding: 16px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .vsb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .vsb-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .vsb-title strong {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: #191538;
    }
    .vsb-presets {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .preset-voice-btn {
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 99px;
      padding: 6px 12px;
      font-size: 0.78rem;
      font-weight: 800;
      color: #191538;
      cursor: pointer;
      box-shadow: 0 3px 0 #7c5dfa;
    }
    .preset-voice-btn.test {
      background: #10b981;
      color: #052e16;
      box-shadow: 0 3px 0 #191538;
    }
    .vsb-controls-grid {
      display: grid;
      grid-template-columns: 1.8fr 1fr 1fr;
      gap: 12px;
      align-items: end;
    }
    @media (max-width: 920px) {
      .vsb-controls-grid { grid-template-columns: 1fr; }
    }
    .vsb-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .vsb-field label {
      font-size: 0.8rem;
      font-weight: 800;
      color: #2b2354;
    }
    .voice-select-box {
      background: #ffffff;
      border: 2.5px solid #191538;
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 0.88rem;
      font-weight: 800;
      color: #191538;
    }
    .voice-range {
      width: 100%;
      accent-color: #7c5dfa;
      cursor: pointer;
    }
    .live-subtitle-banner {
      background: #191538;
      border: 2.5px solid #10b981;
      border-radius: 14px;
      padding: 10px 14px;
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 700;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    .lsb-tag {
      background: #10b981;
      color: #052e16;
      font-size: 0.7rem;
      font-weight: 900;
      padding: 2px 8px;
      border-radius: 99px;
    }
    .lsb-txt {
      color: #fef08a;
    }

    /* AULA PRINCIPAL */
    .classroom-stage {
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .scenes-timeline-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 10px;
    }
    .scene-step-btn {
      background: #191e45;
      border: 2.5px solid #48508a;
      border-radius: 16px;
      padding: 10px 14px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      text-align: left;
      gap: 2px;
      transition: all 0.15s;
    }
    .scene-step-btn.active {
      background: #efeaff;
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 4px 0 #7c5dfa;
    }
    .scene-step-btn.exercise-mode-btn {
      border-color: #fde047;
    }
    .ss-num { font-size: 0.7rem; font-weight: 900; color: #fde047; }
    .scene-step-btn.active .ss-num { color: #5b3ec8; }
    .ss-title { font-family: var(--font-display); font-size: 0.92rem; font-weight: 800; }

    .classroom-grid {
      display: grid;
      grid-template-columns: 430px 1fr;
      gap: 20px;
      align-items: stretch;
    }
    @media (max-width: 1060px) {
      .classroom-grid { grid-template-columns: 1fr; }
    }

    /* TARJETA DEL PROFESOR */
    .teacher-pod {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
    }
    .tp-avatar-row {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .teacher-avatar-circle {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      background: #ffffff;
      border: 3.5px solid #191538;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 6px 0 #7c5dfa;
    }
    .teacher-avatar-circle.speaking {
      animation: pulseSpeak 1.1s infinite alternate;
      border-color: #10b981;
    }
    @keyframes pulseSpeak {
      from { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
      to { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
    }
    .tp-badge {
      display: inline-block;
      background: #191538;
      color: #fde047;
      font-size: 0.7rem;
      font-weight: 900;
      padding: 3px 10px;
      border-radius: 99px;
      margin-bottom: 4px;
    }
    .tp-title-box h2 {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
      line-height: 1.2;
    }
    .voice-status {
      margin-top: 6px;
      font-size: 0.78rem;
      font-weight: 900;
      color: #065f46;
      background: #d1fae5;
      padding: 4px 10px;
      border-radius: 99px;
      display: inline-block;
    }

    .teacher-speech-bubble {
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 20px;
      padding: 16px 18px;
      box-shadow: 0 5px 0 #191538;
    }
    .tsb-mode-tag {
      font-size: 0.72rem;
      font-weight: 900;
      color: #7c5dfa;
      margin-bottom: 6px;
      letter-spacing: 0.04em;
    }
    .tsb-text {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #191538;
      line-height: 1.58;
    }

    .voice-controls-panel {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .vcp-main-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .vc-btn {
      flex: 1;
      border: 2.5px solid #191538;
      border-radius: 14px;
      padding: 10px 12px;
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 0 #191538;
    }
    .vc-btn.play { background: #10b981; color: #052e16; }
    .vc-btn.repeat { background: #fde047; color: #191538; }
    .vc-btn.stop { background: #fb7185; color: #ffffff; }

    .vcp-depth-btns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .depth-chip {
      background: rgba(255, 255, 255, 0.7);
      border: 2px solid #9d7eff;
      border-radius: 10px;
      padding: 7px 6px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #191538;
      cursor: pointer;
    }
    .depth-chip.active {
      background: #191538;
      border-color: #191538;
      color: #fde047;
    }
    .vcp-nav-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }
    .nav-scene-btn {
      flex: 1;
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 12px;
      padding: 8px 12px;
      font-weight: 800;
      font-size: 0.82rem;
      color: #191538;
      cursor: pointer;
    }
    .nav-scene-btn.primary {
      background: #7c5dfa;
      color: #ffffff;
    }
    .nav-scene-btn:disabled { opacity: 0.45; cursor: not-allowed; }

    /* PIZARRÓN VISUAL DERECHO */
    .chalkboard-video-stage {
      background: linear-gradient(180deg, #1b4332 0%, #112a20 100%);
      border: 9px solid #d97706;
      border-radius: 26px;
      padding: 18px 22px;
      box-shadow: inset 0 0 32px rgba(0,0,0,0.55), 0 10px 0 #0d1025;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
    }
    .cvs-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cvs-pill {
      background: rgba(253, 224, 71, 0.2);
      border: 1.5px solid #fde047;
      color: #fde047;
      font-size: 0.74rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 99px;
    }
    .cvs-scene-counter {
      color: #a7f3d0;
      font-weight: 800;
      font-size: 0.82rem;
    }
    .animated-diagram-canvas {
      background: rgba(10, 28, 20, 0.65);
      border: 2px solid rgba(255, 255, 255, 0.18);
      border-radius: 18px;
      padding: 8px;
    }
    .board-svg {
      width: 100%;
      height: auto;
      max-height: 250px;
      display: block;
    }

    .board-formula-box {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 14px;
      align-items: center;
    }
    @media (max-width: 820px) {
      .board-formula-box { grid-template-columns: 1fr; }
    }
    .bfb-kicker {
      display: block;
      color: #fde047;
      font-size: 0.7rem;
      font-weight: 900;
      margin-bottom: 6px;
      letter-spacing: 0.04em;
    }
    .traditional-white-card {
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 16px;
      padding: 12px 16px;
      color: #191538;
      text-align: center;
      font-size: 1.2rem;
      box-shadow: 0 4px 0 #191538;
      overflow-x: auto;
    }
    .bfb-right {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .meaning-pill {
      background: rgba(255, 255, 255, 0.12);
      border-left: 4px solid #fde047;
      color: #ffffff;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
    }
    .board-captions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .bc-chip {
      background: rgba(125, 211, 252, 0.16);
      border: 1px solid #7dd3fc;
      color: #e0f2fe;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 99px;
    }

    /* MODO 2: EJERCICIOS DEL PROFESOR */
    .exercises-classroom-pane {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ecp-top h3 {
      font-family: var(--font-display);
      color: #ffffff;
      font-size: 1.4rem;
      margin: 4px 0 12px 0;
    }
    .ex-selector-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 10px;
    }
    .ex-pick-btn {
      background: #191e45;
      border: 2.5px solid #48508a;
      border-radius: 16px;
      padding: 12px 16px;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      text-align: left;
    }
    .ex-pick-btn.active {
      background: #efeaff;
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 5px 0 #7c5dfa;
    }
    .prof-exercise-board {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .pex-statement-card {
      padding: 20px;
    }
    .pex-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }
    .pex-voice-btns { display: flex; gap: 8px; flex-wrap: wrap; }
    .pex-statement-card h3 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: #191538;
      margin: 0 0 8px 0;
    }
    .pex-stmt {
      font-size: 0.96rem;
      font-weight: 700;
      color: #191538;
      background: #ffffff;
      border: 2px solid #191538;
      padding: 12px 16px;
      border-radius: 14px;
      margin: 0 0 10px 0;
    }
    .pex-teacher-intro {
      background: #fef9c3;
      border: 2px solid #eab308;
      color: #713f12;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
    }
    .pex-steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 14px;
    }
    .pex-step-box {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .psb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .psb-num {
      background: #7c5dfa;
      color: #ffffff;
      font-weight: 900;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 99px;
    }
    .psb-speak-btn {
      background: #191538;
      color: #fde047;
      border: none;
      border-radius: 99px;
      padding: 5px 12px;
      font-size: 0.75rem;
      font-weight: 800;
      cursor: pointer;
    }
    .psb-exp {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #191538;
      line-height: 1.5;
    }
    .psb-calc {
      background: #d1fae5;
      border: 2px solid #10b981;
      color: #064e3b;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 700;
    }

    /* CONSULTORIO INTERACTIVO */
    .ask-professor-card {
      padding: 22px 26px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .apc-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    @media (max-width: 680px) {
      .apc-header { flex-direction: column; text-align: center; }
    }
    .apc-header h2 {
      font-family: var(--font-display);
      font-size: 1.45rem;
      color: #191538;
      margin: 4px 0;
    }
    .apc-header p {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 700;
      color: #362f63;
    }
    .quick-questions-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .qq-btn {
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 99px;
      padding: 7px 14px;
      font-size: 0.8rem;
      font-weight: 800;
      color: #191538;
      cursor: pointer;
      box-shadow: 0 3px 0 #7c5dfa;
    }
    .qq-btn:hover { background: #7c5dfa; color: #ffffff; }
    .ask-input-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
    }
    @media (max-width: 680px) {
      .ask-input-row { grid-template-columns: 1fr; }
    }
    .ask-text-input {
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 16px;
      padding: 12px 16px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #191538;
    }
    .professor-custom-answer {
      background: #ffffff;
      border: 3px solid #191538;
      border-radius: 20px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 6px 0 #7c5dfa;
    }
    .pca-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #191538;
      font-size: 1rem;
    }
    .pca-body {
      margin: 0;
      font-size: 0.94rem;
      font-weight: 700;
      color: #1e1b4b;
      line-height: 1.58;
    }
    .pca-tip {
      background: #fef9c3;
      border: 2px solid #eab308;
      color: #713f12;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
    }
  `]
})
export class ProfesorPage implements OnInit, OnDestroy {
  selectedUnitNumber = 1;
  currentSceneIndex = 0;
  viewMode: 'teoria' | 'ejercicios' = 'teoria';
  explanationDepth: 'normal' | 'easy' | 'deep' = 'normal';
  selectedExerciseIdx = 0;
  isSpeaking = false;
  isPaused = false;
  currentSubtitle = '';
  availableVoices: VoiceOptionItem[] = [];
  selectedVoiceId = '';
  speechRate = 1.03;
  speechPitch = 1.0;

  studentQuestionInput = '';
  professorReply: { speechText: string; formulaLatex?: string; calcTip?: string } | null = null;
  lockedClassMessage = '';
  highestUnlockedUnit = 1;

  masterclasses: ProfessorUnitMasterclass[] = [
    {
      unitNumber: 1,
      unitTitle: 'Carga y Campo Eléctrico',
      subtitle: '¿Qué es una carga eléctrica, de dónde sale la Ley de Coulomb y cómo nace el Campo Eléctrico?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO DESDE CERO • UNIDAD 1',
          title: '¿Qué es una Carga Eléctrica y de dónde sale la Ley de Coulomb?',
          teacherSpeech: '¡Hola Cielo! Empecemos desde el origen físico: toda la materia está formada por átomos. En el núcleo están los protones con carga positiva, y orbitando alrededor están los electrones con carga negativa. Cuando frotás o ponés en contacto dos cuerpos, lo único que se mueve son los electrones: si un cuerpo pierde electrones queda cargado positivamente, y si gana electrones queda con carga negativa. Charles Coulomb descubrió experimentalmente que la fuerza entre dos cargas es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia que las separa.',
          easyAnalogySpeech: 'Imaginate que los electrones son moneditas negativas que pueden saltar de un bolsillo a otro. Si regalás monedas negativas, quedás positivo. Y la Ley de Coulomb funciona como dos imanes o como el brillo de una linterna: cuanto más te alejás, la fuerza cae rapidísimo con el cuadrado de la distancia. Si te alejás al doble de distancia, la fuerza se divide por cuatro.',
          deepColloquiumNote: 'En el coloquio final tenés que remarcar tres propiedades fundamentales: 1) La carga está cuantizada (q = n por la carga elemental e = 1,602 por 10 a la menos 19 Coulombs). 2) La carga neta de un sistema aislado se conserva siempre. 3) La Ley de Coulomb es vectorial y actúa a lo largo de la recta que une las cargas puntuales.',
          traditionalFormulaLatex: 'F = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2}',
          formulaMeaningBullets: [
            'F : Fuerza electrostática medida en Newtons [N]',
            'k : Constante de Coulomb = 8,99 × 10⁹ N·m²/C² (1 / 4πε₀)',
            'q₁ , q₂ : Cargas eléctricas expresadas siempre en Coulombs [C]',
            'r : Distancia centro a centro expresada siempre en metros [m]'
          ],
          diagramType: 'u1_atom_coulomb',
          boardCaptions: [
            'Carga elemental: e = 1,602 × 10⁻¹⁹ C',
            '1 μC = 10⁻⁶ C  •  1 nC = 10⁻⁹ C',
            'Si r se duplica (2r) → F cae a la cuarta parte (F/4)'
          ]
        },
        {
          sceneNumber: 2,
          tag: 'CONCEPTO CLAVE DE PARCIAL • UNIDAD 1',
          title: '¿Qué es el Campo Eléctrico E⃗ y cómo se calcula en una barra o anillo?',
          teacherSpeech: '¿Por qué una carga empuja a otra a distancia sin tocarla? Faraday introdujo el concepto de Campo Eléctrico: la carga fuente Q modifica el espacio que la rodea. Si ponemos una pequeña carga de prueba q en un punto y siente una fuerza F, definimos el campo eléctrico E como la fuerza por unidad de carga: E igual a F dividido q. Las líneas de campo siempre nacen en las cargas positivas y mueren en las negativas. Y cuando en vez de un punto tenemos una barra o un anillo cargado, lo cortamos en pedacitos diferenciales dq, calculamos el campito dE de cada pedacito y los sumamos con una integral.',
          easyAnalogySpeech: 'Pensá en una estufa encendida en una habitación: la estufa crea un campo de calor a su alrededor aunque vos todavía no pongas la mano. El campo eléctrico E depende solamente de la carga fuente Q que lo crea y de la distancia r, no de la carga de prueba que pongas después.',
          deepColloquiumNote: 'Si el tribunal te pregunta qué pasa con el campo E en un punto si duplicás la carga de prueba q₀, la respuesta es: ¡el campo E NO cambia! Se duplica la fuerza F = q₀·E, pero el cociente E = F/q₀ es propiedad exclusiva de la carga fuente.',
          traditionalFormulaLatex: '\\vec{E} = \\frac{\\vec{F}}{q_0} = \\frac{k \\cdot Q}{r^2} \\,\\hat{r} \\quad ; \\quad dE = \\frac{k \\cdot dq}{r^2}',
          formulaMeaningBullets: [
            'E⃗ : Vector Campo Eléctrico en Newton sobre Coulomb [N/C] o [V/m]',
            'dq = λ · dl : Diferencial de carga en un hilo o anillo (λ en C/m)',
            'dq = σ · dA : Diferencial de carga en un disco o plano (σ en C/m²)'
          ],
          diagramType: 'u1_field_lines',
          boardCaptions: [
            'De las cargas (+) salen las flechas de E⃗',
            'Hacia las cargas (−) entran las flechas de E⃗',
            'En el centro de un anillo cargado, por simetría, E⃗ = 0'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • INICIAL (PASO A PASO)',
          title: 'Fuerza de Coulomb con conversión de centímetros y microcoulombs',
          statement: 'Dos pequeñas esferas con cargas q₁ = 5 μC y q₂ = 8 nC están separadas r = 10 cm en el vacío. Calcular la magnitud de la fuerza eléctrica entre ellas.',
          teacherIntro: 'Este es el primer ejercicio que tenés que dominar. El secreto está en no meter el 5, el 8 y el 10 directo en la fórmula, sino pasar todo primero a Coulombs y a metros.',
          steps: [
            {
              stepTitle: 'Paso 1: Pasar las cargas y la distancia al Sistema Internacional (SI)',
              explanation: 'Convertimos microCoulomb (μC = 10⁻⁶ C), nanoCoulomb (nC = 10⁻⁹ C) y centímetros (cm = 10⁻² m).',
              formulaLatex: 'q_1 = 5 \\times 10^{-6}\\text{ C} \\quad ; \\quad q_2 = 8 \\times 10^{-9}\\text{ C} \\quad ; \\quad r = 10\\text{ cm} = 0,10\\text{ m}',
              calcTip: 'Para 10 cm dividís 10 ÷ 100 = 0.10 m.'
            },
            {
              stepTitle: 'Paso 2: Reemplazar en la fórmula tradicional de la Ley de Coulomb',
              explanation: 'Colocamos k, q₁ y q₂ en el numerador, y la distancia r = 0,10 m elevada al cuadrado en el denominador.',
              formulaLatex: 'F = \\frac{8,99 \\times 10^9 \\cdot (5 \\times 10^{-6}) \\cdot (8 \\times 10^{-9})}{(0,10)^2} = 0,03596\\text{ N}',
              calcTip: 'Tecleá: 8.99 [×10ˣ] 9 × 5 [×10ˣ] (-) 6 × 8 [×10ˣ] (-) 9 ÷ 0.10 [x²] ='
            }
          ]
        },
        {
          difficultyBadge: '🔴 NIVEL 2 • AVANZADO DE PARCIAL',
          title: 'Campo Eléctrico de un Anillo Cargado sobre su Eje z',
          statement: 'Un anillo circular de radio R = 20 cm tiene una carga total Q = 12 μC distribuida uniformemente. Calcular el campo eléctrico sobre su eje a una distancia z = 15 cm del centro.',
          teacherIntro: 'En el anillo cargado, las componentes radiales perpendiculares se cancelan de a pares por simetría y solo sobrevive la componente sobre el eje z.',
          steps: [
            {
              stepTitle: 'Paso 1: Convertir R, z y Q al Sistema Internacional',
              explanation: 'Pasamos R = 20 cm a 0,20 m; z = 15 cm a 0,15 m y Q = 12 μC a 12 × 10⁻⁶ C.',
              formulaLatex: 'R = 0,20\\text{ m} \\quad ; \\quad z = 0,15\\text{ m} \\quad ; \\quad Q = 12 \\times 10^{-6}\\text{ C}',
              calcTip: 'Fijate que √(z² + R²) = √(0.15² + 0.20²) = 0.25 m.'
            },
            {
              stepTitle: 'Paso 2: Aplicar la ecuación axial del anillo',
              explanation: 'Evaluamos la fórmula tradicional del anillo sobre su eje z.',
              formulaLatex: 'E_z = \\frac{k \\cdot Q \\cdot z}{(z^2 + R^2)^{3/2}} = \\frac{8,99 \\times 10^9 \\cdot 12 \\times 10^{-6} \\cdot 0,15}{(0,15^2 + 0,20^2)^{1,5}} = 1,036 \\times 10^6\\text{ N/C}',
              calcTip: 'Tecleá: (8.99 [×10ˣ] 9 × 12 [×10ˣ] (-) 6 × 0.15) ÷ ( (0.15 [x²] + 0.20 [x²]) ^ 1.5 ) ='
            }
          ]
        }
      ]
    },
    {
      unitNumber: 2,
      unitTitle: 'Ley de Gauss y Conductores',
      subtitle: '¿Qué es el flujo eléctrico, cómo elegir la superficie gaussiana y qué pasa en un conductor?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 2',
          title: '¿Qué es la Ley de Gauss y por qué simplifica las integrales?',
          teacherSpeech: 'El flujo eléctrico mide cuántas líneas de campo eléctrico atraviesan una superficie. Carl Friedrich Gauss demostró un teorema maravilloso: si encerrás una carga dentro de una superficie cerrada imaginaria, llamada superficie gaussiana, el flujo neto total que sale es igual a la carga neta encerrada adentro dividida por épsilon cero. Si el problema tiene alta simetría —esférica, cilíndrica o plana—, el campo E sale afuera de la integral y podés despejarlo en dos renglones.',
          easyAnalogySpeech: 'Imaginate un rociador de agua en el medio de una pecera cerrada: no importa si la pecera es chiquita o gigante, toda el agua que sale por segundo a través de las paredes es exactamente igual al agua que tira el rociador adentro. Las cargas que están afuera de la pecera no aportan flujo neto porque sus líneas entran por un lado y salen por el otro.',
          deepColloquiumNote: 'En un conductor en equilibrio electrostático, el campo eléctrico en su interior es estrictamente cero. Por la Ley de Gauss, toda la carga neta reside únicamente en la superficie exterior y el campo justo afuera vale sigma sobre épsilon cero.',
          traditionalFormulaLatex: '\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{encerrada}}}{\\varepsilon_0}',
          formulaMeaningBullets: [
            'Φ_E : Flujo eléctrico total medido en [N·m²/C] o [V·m]',
            'Q_encerrada : Suma algebraica de las cargas que están ADENTRO de la gaussiana',
            'ε₀ : Permitividad del vacío = 8,854 × 10⁻¹² C²/(N·m²)'
          ],
          diagramType: 'u2_gauss_flux',
          boardCaptions: [
            'Esfera → Gaussiana Esférica (Área = 4·π·r²)',
            'Hilo largo → Gaussiana Cilíndrica (Área lateral = 2·π·r·L)',
            'Plano infinito → Pastilla Cilíndrica (2 tapas = 2·A)'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • INICIAL',
          title: 'Campo eléctrico de una lámina infinita aislante vs conductora',
          statement: 'Una lámina plana muy grande tiene densidad superficial uniforme σ = 4 μC/m². Calcular el campo eléctrico cerca de la lámina.',
          teacherIntro: 'Acordate siempre de fijarte si es una lámina aislante (se divide por 2·ε₀) o la superficie de un conductor (se divide solo por ε₀).',
          steps: [
            {
              stepTitle: 'Paso 1: Convertir la densidad superficial σ a C/m²',
              explanation: 'Pasamos 4 μC/m² a Coulombs por metro cuadrado multiplicando por 10⁻⁶.',
              formulaLatex: '\\sigma = 4 \\times 10^{-6}\\text{ C/m}^2',
              calcTip: 'En la calculadora: 4 [×10ˣ] (-) 6'
            },
            {
              stepTitle: 'Paso 2: Reemplazar en la fórmula tradicional del plano de Gauss',
              explanation: 'Dividimos σ por (2 · ε₀) colocando paréntesis en el denominador.',
              formulaLatex: 'E = \\frac{\\sigma}{2 \\cdot \\varepsilon_0} = \\frac{4 \\times 10^{-6}}{2 \\cdot 8,854 \\times 10^{-12}} = 2,259 \\times 10^5\\text{ N/C}',
              calcTip: 'Tecleá: 4 [×10ˣ] (-) 6 ÷ ( 2 × 8.854 [×10ˣ] (-) 12 ) ='
            }
          ]
        }
      ]
    },
    {
      unitNumber: 3,
      unitTitle: 'Potencial Eléctrico y Energía',
      subtitle: '¿Qué es el Voltaje, cómo se relaciona con el campo E⃗ y qué son las equipotenciales?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 3',
          title: '¿Qué es el Potencial Eléctrico (Voltaje) y por qué es un escalar?',
          teacherSpeech: 'Mientras que el campo eléctrico E es un vector con dirección y sentido, el Potencial Eléctrico V —que medimos en Voltios— es un número escalar: representa la energía potencial eléctrica por unidad de carga en cada punto del espacio. Es exactamente igual que la altura en un mapa de montañas: las cargas positivas crean picos altos de voltaje positivo, las cargas negativas crean pozos de voltaje negativo, y el vector campo eléctrico E siempre apunta cuesta abajo, desde el mayor potencial hacia el menor potencial.',
          easyAnalogySpeech: 'Si el campo eléctrico es la pendiente de un tobogán, el voltaje V es la altura a la que estás subido. Y caminar por una superficie equipotencial es como caminar por un piso totalmente plano a la misma altura: no subís ni bajás, así que el trabajo realizado es cero.',
          deepColloquiumNote: 'Nunca digas que si el campo E es cero entonces el potencial V tiene que ser cero. Como E es menos la derivada del potencial (E = -dV/dr), cuando E es cero el potencial V es CONSTANTE (como adentro de un conductor cargado).',
          traditionalFormulaLatex: 'V_B - V_A = -\\int_A^B \\vec{E} \\cdot d\\vec{l} \\quad ; \\quad V = \\frac{k \\cdot Q}{r}',
          formulaMeaningBullets: [
            'V : Potencial eléctrico en Voltios [1 V = 1 Joule / Coulomb]',
            'W = -q · ΔV : Trabajo de la fuerza eléctrica al mover una carga q',
            'En V = k·Q/r la distancia r va a la primera potencia (NO al cuadrado)'
          ],
          diagramType: 'u3_potential_hill',
          boardCaptions: [
            'Las líneas de campo E⃗ son siempre perpendiculares (90°) a las equipotenciales',
            'Mover una carga sobre una misma equipotencial cuesta Trabajo W = 0'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • INICIAL',
          title: 'Potencial y Trabajo para mover una carga entre dos puntos',
          statement: 'Una carga fuente Q = 6 μC está en el origen. Calcular el potencial en A (r_A = 10 cm) y en B (r_B = 30 cm), y el trabajo para llevar q = 2 nC de A hasta B.',
          teacherIntro: 'Acá vas a ver qué fácil es trabajar con potenciales: como son escalares, no hay que descomponer vectores, solo calcular V en cada punto y restar.',
          steps: [
            {
              stepTitle: 'Paso 1: Calcular V_A y V_B con las distancias en metros',
              explanation: 'Con r_A = 0,10 m y r_B = 0,30 m, aplicamos V = k·Q / r.',
              formulaLatex: 'V_A = \\frac{8,99 \\times 10^9 \\cdot 6 \\times 10^{-6}}{0,10} = 539\\,400\\text{ V} \\quad ; \\quad V_B = \\frac{8,99 \\times 10^9 \\cdot 6 \\times 10^{-6}}{0,30} = 179\\,800\\text{ V}',
              calcTip: 'Acordate: en potencial dividís por 0.10 sin elevar al cuadrado.'
            },
            {
              stepTitle: 'Paso 2: Calcular la diferencia de potencial y la energía/trabajo',
              explanation: 'Multiplicamos la carga q = 2 × 10⁻⁹ C por la diferencia de potencial.',
              formulaLatex: '\\Delta U = q \\cdot (V_B - V_A) = 2 \\times 10^{-9} \\cdot (179\\,800 - 539\\,400) = -7,19 \\times 10^{-4}\\text{ J}',
              calcTip: 'El signo menos indica que la fuerza eléctrica repulsiva ayudó al movimiento.'
            }
          ]
        }
      ]
    },
    {
      unitNumber: 4,
      unitTitle: 'Capacitores y Dieléctricos',
      subtitle: '¿Qué es un capacitor por dentro, cómo convertir pF/nF/μF y qué hace el dieléctrico?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 4',
          title: '¿Qué es un Capacitor, de dónde sale C = ε₀·A/d y qué hace un Dieléctrico?',
          teacherSpeech: 'Un capacitor o condensador es un dispositivo formado por dos placas conductoras separadas por una distancia d que sirve para almacenar energía en forma de campo eléctrico. Su capacidad C depende exclusivamente de su geometría: es más grande cuanto mayor es el área A de las placas y cuanto más juntitas están (menor distancia d). Cuando introducimos un material aislante llamado dieléctrico entre las placas, sus moléculas se polarizan, debilitan el campo eléctrico interno y hacen que la capacidad se multiplique por la constante dieléctrica kappa.',
          easyAnalogySpeech: 'Pensá en el capacitor como un tanque que guarda carga y energía a cierta presión (voltaje). Poner un dieléctrico adentro es como acomodar esponjas ordenadas dentro del tanque: te permite guardar mucha más carga al mismo voltaje, multiplicando la capacidad por kappa.',
          deepColloquiumNote: 'Pregunta fija de examen final: ¿qué pasa al meter el dieléctrico? Si la batería sigue CONECTADA, el voltaje V se mantiene constante y la carga aumenta a κ·Q₀. Si la batería se DESCONECTÓ antes (capacitor aislado), la carga Q queda atrapada constante y el voltaje baja a V₀/κ.',
          traditionalFormulaLatex: 'C = \\frac{\\kappa \\cdot \\varepsilon_0 \\cdot A}{d} \\quad ; \\quad C = \\frac{Q}{V} \\quad ; \\quad U = \\frac{1}{2} \\cdot C \\cdot V^2',
          formulaMeaningBullets: [
            'C : Capacidad eléctrica en Faradios [F] (1 μF = 10⁻⁶ F, 1 nF = 10⁻⁹ F, 1 pF = 10⁻¹² F)',
            'A : Área de cada placa en metros cuadrados [m²] (¡1 cm² = 10⁻⁴ m²!)',
            'd : Separación entre placas en metros [m]',
            'κ : Constante dieléctrica del material aislante (κ = 1 en vacío)'
          ],
          diagramType: 'u4_capacitor_dielectric',
          boardCaptions: [
            'En PARALELO se suman directo: C_eq = C₁ + C₂ (comparten igual Voltaje V)',
            'En SERIE se suman las inversas: 1/C_eq = 1/C₁ + 1/C₂ (comparten igual Carga Q)'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • CONVERSIÓN DE ÁREA Y PICOFARADIOS',
          title: 'Cálculo de capacidad en pF y nF pasando de cm² a m²',
          statement: 'Un capacitor plano tiene placas de área A = 40 cm² separadas d = 1,5 mm con un dieléctrico de constante κ = 4,5. Calcular su capacidad en Faradios, picofaradios (pF) y nanofaradios (nF).',
          teacherIntro: 'Acá practicamos las dos conversiones que más piden en la práctica: pasar cm² a m² y pasar Faradios a picofaradios y nanofaradios.',
          steps: [
            {
              stepTitle: 'Paso 1: Convertir el área A de cm² a m² y la distancia d de mm a m',
              explanation: 'Recordá que 1 cm² = 10⁻⁴ m² y 1 mm = 10⁻³ m.',
              formulaLatex: 'A = 40 \\times 10^{-4}\\text{ m}^2 = 0,004\\text{ m}^2 \\quad ; \\quad d = 1,5 \\times 10^{-3}\\text{ m} = 0,0015\\text{ m}',
              calcTip: 'En la calculadora: 40 [×10ˣ] (-) 4 para el área, y 1.5 [×10ˣ] (-) 3 para la distancia.'
            },
            {
              stepTitle: 'Paso 2: Reemplazar en la fórmula tradicional y convertir a pF y nF',
              explanation: 'Calculamos C en Faradios y luego multiplicamos por 10¹² para pF o por 10⁹ para nF.',
              formulaLatex: 'C = \\frac{4,5 \\cdot 8,854 \\times 10^{-12} \\cdot (40 \\times 10^{-4})}{1,5 \\times 10^{-3}} = 1,062 \\times 10^{-10}\\text{ F} = 106,2\\text{ pF} = 0,1062\\text{ nF}',
              calcTip: 'Para pasar de 106.2 pF a nF, dividís por 1000 → 0.1062 nF.'
            }
          ]
        }
      ]
    },
    {
      unitNumber: 5,
      unitTitle: 'Corriente Eléctrica y Circuitos RC',
      subtitle: '¿Qué es la corriente, las leyes de Kirchhoff y cómo evoluciona un circuito RC?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 5',
          title: '¿Qué es la Corriente Eléctrica, las Leyes de Kirchhoff y la Constante τ = R·C?',
          teacherSpeech: 'La corriente eléctrica I es la cantidad de carga que atraviesa la sección de un cable por segundo, medida en Amperes. La resistencia R de un conductor crece con su longitud L y disminuye si el cable es más grueso (mayor área A). En cualquier circuito cerrado cumplimos dos leyes sagradas de Kirchhoff: en todo nodo la suma de corrientes que entran es igual a la suma de las que salen (porque la carga no desaparece), y en toda malla cerrada la suma de subidas y caídas de voltaje da cero (porque la energía se conserva). Cuando conectamos un resistor R con un capacitor C, el capacitor no se carga instantáneamente: tarda un tiempo gobernado por la constante tau igual a R por C.',
          easyAnalogySpeech: 'Pensá en el circuito como una cañería de agua: la batería es la bomba que da presión (Voltios), la corriente I son los litros por segundo que pasan (Amperes), y la resistencia R es una parte angosta del caño que frena el paso.',
          deepColloquiumNote: 'Regla de oro para el pizarrón en circuitos RC: en el instante inicial t = 0⁺ un capacitor descargado tiene voltaje cero y actúa como un cable ideal (cortocircuito). En régimen permanente t → ∞ (después de 5·τ), el capacitor está lleno y actúa como una llave abierta (corriente cero).',
          traditionalFormulaLatex: 'R = \\rho \\cdot \\frac{L}{A} \\quad ; \\quad v_C(t) = \\mathcal{E} \\cdot \\left(1 - e^{-\\frac{t}{R \\cdot C}}\\right) \\quad ; \\quad \\tau = R \\cdot C',
          formulaMeaningBullets: [
            'I : Corriente eléctrica en Amperes [1 A = 1 Coulomb / segundo]',
            'R : Resistencia eléctrica en Ohms [Ω]',
            'τ = R · C : Constante de tiempo en segundos [s] (en t = τ llega al 63,2%)'
          ],
          diagramType: 'u5_current_rc',
          boardCaptions: [
            '1ª Ley Kirchhoff (Nodos): ∑ I_entran = ∑ I_salen (Conservación de la Carga)',
            '2ª Ley Kirchhoff (Mallas): ∑ ΔV = 0 (Conservación de la Energía)'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • CIRCUITO RC PASO A PASO',
          title: 'Cálculo de constante de tiempo τ y voltaje en un circuito RC',
          statement: 'Un resistor R = 2,5 kΩ y un capacitor C = 40 μF se conectan en serie a una batería de 12 V. Calcular la constante de tiempo τ y el voltaje del capacitor a los t = 0,15 s.',
          teacherIntro: 'Acá aprendemos a usar la tecla de exponencial [SHIFT] + [ln] en la calculadora científica sin equivocarnos con los signos.',
          steps: [
            {
              stepTitle: 'Paso 1: Convertir R a Ohms y C a Faradios para hallar τ = R·C',
              explanation: 'Pasamos 2,5 kΩ = 2500 Ω y 40 μF = 40 × 10⁻⁶ F.',
              formulaLatex: '\\tau = R \\cdot C = 2500\\ \\Omega \\cdot (40 \\times 10^{-6}\\text{ F}) = 0,10\\text{ s}',
              calcTip: 'Tecleá: 2500 × 40 [×10ˣ] (-) 6 = 0.1 s.'
            },
            {
              stepTitle: 'Paso 2: Evaluar la fórmula de carga en t = 0,15 s',
              explanation: 'Reemplazamos t = 0,15 s y τ = 0,10 s en el exponente.',
              formulaLatex: 'v_C(0,15) = 12 \\cdot \\left(1 - e^{-\\frac{0,15}{0,10}}\\right) = 12 \\cdot (1 - e^{-1,5}) = 9,32\\text{ V}',
              calcTip: 'Tecleá: 12 × ( 1 − [SHIFT] [ln] ( (-) 0.15 ÷ 0.10 ) ) = 9.32 V.'
            }
          ]
        }
      ]
    },
    {
      unitNumber: 6,
      unitTitle: 'Campo Magnético y Fuerza de Lorentz',
      subtitle: '¿Qué es un campo magnético, la regla de la mano derecha y por qué la carga gira en círculos?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 6',
          title: '¿Qué es un Campo Magnético B⃗ y cómo actúa la Fuerza de Lorentz?',
          teacherSpeech: 'Un campo magnético B, que medimos en Teslas, tiene dos diferencias gigantes con el campo eléctrico: primero, las líneas de campo magnético son siempre curvas cerradas (salen del Norte y entran al Sur por afuera, pero continúan de Sur a Norte por adentro del imán), porque no existen monopolos magnéticos aislados. Segundo, el campo magnético solo ejerce fuerza sobre cargas que están EN MOVIMIENTO, y esa fuerza es siempre perpendicular tanto a la velocidad v como al campo B. Como la fuerza magnética tira siempre de costado a 90 grados, jamás acelera ni frena la rapidez de la partícula: su trabajo es cero y solo curva la trayectoria formando una órbita circular de ciclotrón.',
          easyAnalogySpeech: 'Imaginate que vas corriendo derecho y alguien te tira de una soga siempre de costado a 90 grados: no te empuja hacia adelante ni hacia atrás, así que seguís con la misma rapidez pero empezás a dar vueltas en círculo.',
          deepColloquiumNote: 'Al igualar la fuerza magnética q·v·B con la fuerza centrípeta m·v²/R, se simplifica una v y sale el radio de ciclotrón R = m·v / (|q|·B). Si la partícula es un electrón (carga negativa), la regla de la mano derecha da el sentido opuesto al de un protón.',
          traditionalFormulaLatex: '\\vec{F}_B = q \\cdot (\\vec{v} \\times \\vec{B}) \\quad ; \\quad F_B = |q| \\cdot v \\cdot B \\cdot \\sin(\\theta) \\quad ; \\quad R = \\frac{m \\cdot v}{|q| \\cdot B}',
          formulaMeaningBullets: [
            'B : Campo magnético en Teslas [T] (1 Gauss = 10⁻⁴ Teslas)',
            'v : Velocidad de la carga en [m/s] (si v = 0 → F_B = 0)',
            'R : Radio de giro del ciclotrón en metros [m]'
          ],
          diagramType: 'u6_magnet_lorentz',
          boardCaptions: [
            'Trabajo magnético W_B = 0 siempre → La energía cinética se conserva constante',
            'Si la carga se mueve paralela al campo B⃗ (θ = 0° o 180°) → La fuerza es CERO'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • RADIO DE CICLOTRÓN',
          title: 'Fuerza magnética y radio de órbita de un protón',
          statement: 'Un protón (q = 1,602 × 10⁻¹⁹ C, m = 1,673 × 10⁻²⁷ kg) ingresa perpendicularmente (90°) con velocidad v = 3 × 10⁶ m/s a un campo magnético B = 4000 Gauss. Calcular el campo en Teslas, la fuerza magnética y el radio R.',
          teacherIntro: 'Fijate cómo primero pasamos los Gauss a Teslas multiplicando por 10⁻⁴ y luego usamos paréntesis en el denominador del radio.',
          steps: [
            {
              stepTitle: 'Paso 1: Convertir el campo magnético de Gauss (G) a Teslas (T)',
              explanation: 'Como 1 Gauss = 10⁻⁴ T, multiplicamos 4000 por 10⁻⁴.',
              formulaLatex: 'B = 4000 \\times 10^{-4}\\text{ T} = 0,40\\text{ T}',
              calcTip: '4000 ÷ 10000 = 0.40 Teslas.'
            },
            {
              stepTitle: 'Paso 2: Calcular el radio de la trayectoria circular R',
              explanation: 'Reemplazamos masa, velocidad, carga y campo en R = (m · v) / (|q| · B).',
              formulaLatex: 'R = \\frac{(1,673 \\times 10^{-27}) \\cdot (3 \\times 10^6)}{(1,602 \\times 10^{-19}) \\cdot 0,40} = 0,0783\\text{ m} = 7,83\\text{ cm}',
              calcTip: 'Tecleá: 1.673 [×10ˣ] (-) 27 × 3 [×10ˣ] 6 ÷ ( 1.602 [×10ˣ] (-) 19 × 0.40 ) ='
            }
          ]
        }
      ]
    },
    {
      unitNumber: 7,
      unitTitle: 'Biot-Savart, Ampère y Solenoide',
      subtitle: '¿Cómo crea campo magnético una corriente y qué es exactamente un solenoide?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 7',
          title: '¿Qué es un Solenoide (Bobina) y de dónde salen Biot-Savart y Ampère?',
          teacherSpeech: 'Oersted descubrió que toda corriente eléctrica crea un campo magnético a su alrededor. Si tenés un cable recto con corriente I, poniendo el pulgar de tu mano derecha en el sentido de la corriente, tus demás dedos te muestran cómo giran los anillos de campo magnético alrededor del cable. ¿Y qué es un solenoide? Un solenoide es simplemente un cable enrollado en forma de resorte o hélice con N vueltas (espiras) a lo largo de una longitud L. Al enrollar las espiras bien juntitas, los campos magnéticos de cada vuelta se suman todos apuntando derechito por el centro del tubo, creando adentro un campo magnético intenso y uniforme, mientras que afuera se cancelan.',
          easyAnalogySpeech: 'Imaginate que una sola espira con corriente es como un ventilador chiquito que empuja aire. Si ponés 500 ventiladores uno atrás del otro formando un túnel (eso es un solenoide), adentro del túnel tenés una corriente de campo magnético súper pareja y potente.',
          deepColloquiumNote: 'Dos cables rectos paralelos con corrientes en el MISMO sentido se ATRAEN; si las corrientes van en sentidos OPUESTOS se REPELEN. Y adentro de un solenoide largo, el campo B = μ₀·(N/L)·I no depende del radio del solenoide ni de la posición cerca del eje.',
          traditionalFormulaLatex: 'B_{\\text{cable}} = \\frac{\\mu_0 \\cdot I}{2 \\cdot \\pi \\cdot r} \\quad ; \\quad B_{\\text{solenoide}} = \\frac{\\mu_0 \\cdot N \\cdot I}{L}',
          formulaMeaningBullets: [
            'μ₀ : Permeabilidad magnética del vacío = 4π × 10⁻⁷ T·m/A (≈ 1,2566 × 10⁻⁶)',
            'N : Número total de espiras (vueltas de alambre) del solenoide',
            'L : Longitud del solenoide en metros [m] (n = N/L es la densidad de espiras/m)',
            'I : Corriente eléctrica en Amperes [A]'
          ],
          diagramType: 'u7_solenoid_ampere',
          boardCaptions: [
            'Solenoide interior: B = μ₀ · n · I uniforme  •  Exterior ideal: B ≈ 0',
            'Toroide (solenoide cerrado en rosca): B = (μ₀ · N · I) / (2 · π · r)'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • SOLENOIDE PASO A PASO',
          title: 'Campo magnético en el interior de un solenoide',
          statement: 'Un solenoide de longitud L = 25 cm tiene N = 500 espiras y transporta una corriente I = 3 A. Calcular el campo magnético en su interior en Teslas y en miliTeslas.',
          teacherIntro: 'Convertimos primero los 25 cm a 0,25 m y aprendemos a cargar μ₀ = 4π × 10⁻⁷ en la calculadora.',
          steps: [
            {
              stepTitle: 'Paso 1: Pasar la longitud L de centímetros a metros',
              explanation: 'Dividimos 25 cm por 100 para obtener L = 0,25 m.',
              formulaLatex: 'L = 25\\text{ cm} = 0,25\\text{ m} \\quad ; \\quad n = \\frac{N}{L} = \\frac{500}{0,25} = 2000\\text{ espiras/m}',
              calcTip: 'Densidad de espiras n = 500 ÷ 0.25 = 2000 vueltas por metro.'
            },
            {
              stepTitle: 'Paso 2: Aplicar la fórmula tradicional del solenoide',
              explanation: 'Multiplicamos μ₀ por N y por I, y dividimos por L.',
              formulaLatex: 'B = \\frac{(4\\pi \\times 10^{-7}) \\cdot 500 \\cdot 3}{0,25} = 0,00754\\text{ T} = 7,54\\text{ mT}',
              calcTip: 'Tecleá: 4 × [SHIFT][π] × 1 [×10ˣ] (-) 7 × 500 × 3 ÷ 0.25 ='
            }
          ]
        }
      ]
    },
    {
      unitNumber: 8,
      unitTitle: 'Inducción de Faraday-Lenz',
      subtitle: '¿Cómo nace la electricidad a partir del magnetismo y qué significa el signo menos?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 8',
          title: '¿Qué descubrió Faraday y por qué la Ley de Lenz tiene un signo menos?',
          teacherSpeech: 'Michael Faraday se hizo una pregunta genial: si una corriente eléctrica crea un campo magnético, ¿puede un campo magnético crear corriente eléctrica? Descubrió que si dejás un imán quieto al lado de una bobina, no pasa absolutamente nada. Pero en cuanto MOVÉS el imán o cambiás el flujo magnético en el tiempo, ¡aparece un voltaje inducido (llamado fuerza electromotriz épsilon) que mueve a los electrones! ¿Y por qué hay un signo menos delante de la derivada del flujo? Esa es la Ley de Lenz: la naturaleza se opone al cambio. Si el flujo magnético está aumentando, la espira genera su propia corriente para crear un campo opuesto que frene ese aumento.',
          easyAnalogySpeech: 'La Ley de Lenz es como un amigo terco que siempre lleva la contra a los cambios: si le querés meter más líneas magnéticas, empuja en contra para que no entren; y si te querés llevar el imán y sacarle líneas, tira a favor para que no se vayan.',
          deepColloquiumNote: 'En el coloquio final recordá que la Ley de Lenz es una consecuencia directa del Principio de Conservación de la Energía. Y en un circuito RL, la bobina L se opone a los saltos bruscos de corriente: en t = 0⁺ actúa como circuito abierto (i = 0) y en t → ∞ como un cable ideal.',
          traditionalFormulaLatex: '\\mathcal{E} = -N \\cdot \\frac{d\\Phi_B}{dt} \\quad ; \\quad \\Phi_B = B \\cdot A \\cdot \\cos(\\theta) \\quad ; \\quad \\mathcal{E}_L = -L \\cdot \\frac{di}{dt}',
          formulaMeaningBullets: [
            'ε : Fuerza electromotriz inducida (voltaje inducido) en Voltios [V]',
            'Φ_B : Flujo magnético en Webers [1 Wb = 1 T · m²]',
            'L : Autoinductancia de la bobina en Henrys [H] (constante de tiempo τ_L = L / R)'
          ],
          diagramType: 'u8_faraday_lenz',
          boardCaptions: [
            'Para inducir voltaje puede cambiar B, puede cambiar el área A, o puede rotar el ángulo θ(t)',
            'En una barra que se desliza a velocidad v sobre rieles: |ε| = B · L · v'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • LEY DE FARADAY',
          title: 'Fem inducida en una bobina cuando varía el campo magnético',
          statement: 'Una bobina de N = 80 espiras cuadradas de área A = 50 cm² está perpendicular a un campo magnético que disminuye uniformemente de 0,6 T a 0,1 T en un tiempo Δt = 0,2 segundos. Calcular el voltaje inducido.',
          teacherIntro: 'Pasamos primero el área de cm² a m² (multiplicando por 10⁻⁴) y calculamos cuánto varió el flujo por segundo.',
          steps: [
            {
              stepTitle: 'Paso 1: Pasar el área A de cm² a m² y hallar la variación de flujo ΔΦ_B',
              explanation: 'Con A = 50 × 10⁻⁴ m² = 0,005 m² y ΔB = 0,1 − 0,6 = −0,5 T.',
              formulaLatex: '\\Delta \\Phi_B = \\Delta B \\cdot A = (-0,5\\text{ T}) \\cdot (0,005\\text{ m}^2) = -0,0025\\text{ Wb}',
              calcTip: 'Tecleá: -0.5 × 50 [×10ˣ] (-) 4 = -0.0025 Weber.'
            },
            {
              stepTitle: 'Paso 2: Aplicar la Ley de Faraday con N = 80 espiras',
              explanation: 'Multiplicamos −N por ΔΦ_B dividido el tiempo Δt = 0,2 s.',
              formulaLatex: '\\mathcal{E} = -80 \\cdot \\frac{-0,0025\\text{ Wb}}{0,2\\text{ s}} = +1,00\\text{ V}',
              calcTip: 'El voltaje inducido es de 1 Voltio.'
            }
          ]
        }
      ]
    },
    {
      unitNumber: 9,
      unitTitle: 'Corriente Alterna RLC y Maxwell',
      subtitle: '¿Qué es la impedancia Z, cómo funciona la resonancia y cómo cerró Maxwell las 4 ecuaciones?',
      scenes: [
        {
          sceneNumber: 1,
          tag: 'FUNDAMENTO VISUAL • UNIDAD 9',
          title: '¿Qué es la Impedancia RLC en Alterna, la Resonancia y las Ondas de Maxwell?',
          teacherSpeech: 'En corriente alterna, el voltaje y la corriente oscilan como ondas senoidales a una frecuencia f (en Argentina, 50 Hertz). La bobina L se opone a los cambios rápidos con una reactancia inductiva X_L igual a 2 pi por f por L, donde el voltaje adelanta 90 grados a la corriente. El capacitor C presenta una reactancia capacitiva X_C igual a 1 sobre 2 pi por f por C, donde el voltaje atrasa 90 grados. Como X_L tira hacia arriba y X_C tira hacia abajo en el diagrama de fasores, se restan entre sí y forman un triángulo rectángulo con la resistencia R: la hipotenusa es la Impedancia total Z. Cuando X_L es exactamente igual a X_C, se anulan mutuamente: ¡eso es la Resonancia Eléctrica!',
          easyAnalogySpeech: 'Pensalo como un juego de soga entre la bobina y el capacitor: la bobina tira 90 grados para arriba y el capacitor tira 90 grados para abajo. En la frecuencia de resonancia los dos tienen la misma fuerza y se empatan a cero, dejando que pase la máxima corriente posible limitada solo por la resistencia R.',
          deepColloquiumNote: 'James Clerk Maxwell completó la Ley de Ampère agregando la corriente de desplazamiento ε₀·dΦ_E/dt que existe en el espacio entre las placas de un capacitor mientras se carga. Con eso demostró que un campo eléctrico variable crea uno magnético y viceversa, viajando por el espacio a la velocidad de la luz c = 1 / √(μ₀·ε₀).',
          traditionalFormulaLatex: 'X_L = 2\\pi f L \\quad ; \\quad X_C = \\frac{1}{2\\pi f C} \\quad ; \\quad Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad ; \\quad f_0 = \\frac{1}{2\\pi\\sqrt{L \\cdot C}}',
          formulaMeaningBullets: [
            'X_L , X_C : Reactancias inductiva y capacitiva medidas en Ohms [Ω]',
            'Z : Impedancia total del circuito RLC en Ohms [Ω] (I = V / Z)',
            'f₀ : Frecuencia de resonancia en Hertz [Hz] donde X_L = X_C y Z_mín = R'
          ],
          diagramType: 'u9_rlc_maxwell',
          boardCaptions: [
            'Factor de potencia: cos(φ) = R / Z  •  Potencia media activa: P = V_rms · I_rms · cos(φ)',
            'Velocidad de la luz de Maxwell: c = 1 / √(μ₀ · ε₀) = 3 × 10⁸ m/s'
          ]
        }
      ],
      guidedExercises: [
        {
          difficultyBadge: '🟢 NIVEL 1 • IMPEDANCIA Y RESONANCIA RLC',
          title: 'Cálculo completo de un circuito RLC serie a 50 Hz',
          statement: 'Un circuito RLC serie tiene R = 40 Ω, L = 100 mH y C = 100 μF conectado a 220 V y 50 Hz. Calcular X_L, X_C, la impedancia Z y la corriente I.',
          teacherIntro: 'Primero pasamos L de miliHenrys a Henrys (×10⁻³) y C de microFaradios a Faradios (×10⁻⁶).',
          steps: [
            {
              stepTitle: 'Paso 1: Calcular las reactancias X_L y X_C en Ohms',
              explanation: 'Con L = 0,10 H y C = 100 × 10⁻⁶ F a f = 50 Hz.',
              formulaLatex: 'X_L = 2\\pi \\cdot 50 \\cdot 0,10 = 31,42\\ \\Omega \\quad ; \\quad X_C = \\frac{1}{2\\pi \\cdot 50 \\cdot 100 \\times 10^{-6}} = 31,83\\ \\Omega',
              calcTip: 'Para X_C tecleá: ( 2 × [SHIFT][π] × 50 × 100 [×10ˣ] (-) 6 ) [x⁻¹] ='
            },
            {
              stepTitle: 'Paso 2: Calcular la Impedancia Z y la Corriente I = V / Z',
              explanation: 'Aplicamos la raíz cuadrada del triángulo de impedancia.',
              formulaLatex: 'Z = \\sqrt{40^2 + (31,42 - 31,83)^2} = 40,002\\ \\Omega \\quad ; \\quad I = \\frac{220\\text{ V}}{40\\ \\Omega} = 5,50\\text{ A}',
              calcTip: '¡Fijate que como X_L ≈ X_C el circuito está prácticamente en resonancia!'
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private katex: KatexRenderService,
    private api: Fisica2ApiService,
    private voiceTutor: VoiceTutorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.speechRate = this.voiceTutor.settings.rate;
    this.speechPitch = this.voiceTutor.settings.pitch;
    this.selectedVoiceId = this.voiceTutor.settings.selectedVoiceId;

    this.voiceTutor.voices$.subscribe((vList) => {
      this.availableVoices = vList;
      if (this.voiceTutor.settings.selectedVoiceId) {
        this.selectedVoiceId = this.voiceTutor.settings.selectedVoiceId;
      }
    });
    this.voiceTutor.isSpeaking$.subscribe((sp) => (this.isSpeaking = sp));
    this.voiceTutor.isPaused$.subscribe((pa) => (this.isPaused = pa));
    this.voiceTutor.currentSubtitle$.subscribe((sub) => (this.currentSubtitle = sub));

    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedUnitNumber > this.highestUnlockedUnit) {
        this.selectedUnitNumber = this.highestUnlockedUnit;
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['u']) {
        const uNum = parseInt(params['u'], 10);
        if (uNum >= 1 && uNum <= 9) {
          this.selectUnitClass(uNum);
        }
      }
    });
  }

  isUnitUnlocked(unitNum: number): boolean {
    return unitNum <= this.highestUnlockedUnit;
  }

  ngOnDestroy() {
    this.stopSpeech();
  }

  renderMath(latex: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(latex, displayMode);
  }

  getUnitArt(unitNumber: number): string {
    const map: Record<number, string> = {
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

  get currentClass(): ProfessorUnitMasterclass {
    return this.masterclasses.find(m => m.unitNumber === this.selectedUnitNumber) || this.masterclasses[0];
  }

  get currentScene(): ProfessorScene {
    return this.currentClass.scenes[this.currentSceneIndex] || this.currentClass.scenes[0];
  }

  selectUnitClass(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      this.lockedClassMessage = `🔒 La clase de la Unidad ${unitNum} está bloqueada. Primero completá la Unidad ${this.highestUnlockedUnit} al 100% para habilitarla.`;
      return;
    }
    this.lockedClassMessage = '';
    this.stopSpeech();
    this.selectedUnitNumber = unitNum;
    this.currentSceneIndex = 0;
    this.selectedExerciseIdx = 0;
    this.viewMode = 'teoria';
    this.explanationDepth = 'normal';
  }

  goToScene(idx: number) {
    this.stopSpeech();
    this.viewMode = 'teoria';
    this.currentSceneIndex = idx;
  }

  switchToExercises() {
    this.stopSpeech();
    this.viewMode = 'ejercicios';
    this.selectedExerciseIdx = 0;
  }

  selectProfessorExercise(idx: number) {
    this.stopSpeech();
    this.selectedExerciseIdx = idx;
  }

  setExplanationDepth(depth: 'normal' | 'easy' | 'deep') {
    this.explanationDepth = depth;
    if (this.isSpeaking) {
      this.speakCurrentExplanation();
    }
  }

  prevScene() {
    if (this.currentSceneIndex > 0) {
      this.goToScene(this.currentSceneIndex - 1);
    }
  }

  nextSceneOrExercise() {
    if (this.currentSceneIndex < this.currentClass.scenes.length - 1) {
      this.goToScene(this.currentSceneIndex + 1);
    } else {
      this.switchToExercises();
    }
  }

  // ==========================================================================
  // SÍNTESIS DE VOZ FLUIDA Y PERSONALIZABLE (VOICE TUTOR SERVICE)
  // ==========================================================================
  onVoiceChange(voiceId: string) {
    this.voiceTutor.selectVoice(voiceId);
    if (this.isSpeaking) {
      this.speakCurrentExplanation();
    }
  }

  onRatePitchChange() {
    this.voiceTutor.updateRateAndPitch(this.speechRate, this.speechPitch);
  }

  applyVoicePreset(preset: 'profesora' | 'profesor' | 'fluido' | 'pausado') {
    this.voiceTutor.applyPreset(preset);
    this.selectedVoiceId = this.voiceTutor.settings.selectedVoiceId;
    this.speechRate = this.voiceTutor.settings.rate;
    this.speechPitch = this.voiceTutor.settings.pitch;
    this.testSelectedVoice();
  }

  testSelectedVoice() {
    this.voiceTutor.speakFluid('¡Hola Cielo! Esta es mi nueva voz fluida para acompañarte paso a paso en Física 2.');
  }

  togglePauseSpeech() {
    this.voiceTutor.togglePauseResume();
  }

  speakCurrentExplanation() {
    const sc = this.currentScene;
    const text =
      this.explanationDepth === 'easy'
        ? sc.easyAnalogySpeech
        : this.explanationDepth === 'deep'
        ? sc.deepColloquiumNote
        : sc.teacherSpeech;
    this.speakSingleText(text);
  }

  repeatCurrentExplanation() {
    this.speakCurrentExplanation();
  }

  speakExerciseWalkthrough(pEx: ProfessorUnitMasterclass['guidedExercises'][0]) {
    const parts = [
      `Ejercicio: ${pEx.title}.`,
      `Enunciado: ${pEx.statement}.`,
      pEx.teacherIntro,
      ...pEx.steps.map(s => `${s.stepTitle}. ${s.explanation}. ${s.calcTip}`)
    ];
    this.speakSingleText(parts.join(' '));
  }

  speakSingleText(text: string) {
    this.voiceTutor.speakFluid(text);
  }

  stopSpeech() {
    this.voiceTutor.stop();
  }

  // ==========================================================================
  // CONSULTORIO INTERACTIVO DE DUDAS Y EJERCICIOS
  // ==========================================================================
  askQuickQuestion(q: string) {
    this.studentQuestionInput = q;
    this.submitQuestionToProfessor();
  }

  submitQuestionToProfessor() {
    const q = (this.studentQuestionInput || '').trim();
    if (!q) return;
    const lower = q.toLowerCase();

    // Detectar a qué unidad pertenece la consulta para respetar el bloqueo secuencial
    let targetUnit = 1;
    if (lower.includes('impedancia') || lower.includes('rlc') || lower.includes('resonancia') || lower.includes('alterna')) targetUnit = 9;
    else if (lower.includes('faraday') || lower.includes('lenz') || lower.includes('induc')) targetUnit = 8;
    else if (lower.includes('solenoide') || lower.includes('bobina') || lower.includes('ampere')) targetUnit = 7;
    else if (lower.includes('magnetico') || lower.includes('magnético') || lower.includes('lorentz') || lower.includes('ciclotron') || lower.includes('ciclotrón')) targetUnit = 6;
    else if (lower.includes('capacitor') || lower.includes('pf') || lower.includes('nf') || lower.includes('dielectrico') || lower.includes('dieléctrico')) targetUnit = 4;
    else if (lower.includes('gauss') || lower.includes('conductor') || lower.includes('flujo')) targetUnit = 2;

    if (!this.isUnitUnlocked(targetUnit)) {
      this.professorReply = {
        speechText: `Ese tema pertenece a la Unidad ${targetUnit}, que todavía se encuentra bloqueada. Primero dominemos juntos al 100 por ciento la Unidad ${this.highestUnlockedUnit} para ir paso a paso y desbloquear la siguiente unidad.`,
        calcTip: `Completá Teoría, Laboratorio, Práctico y Multiple Choice de la Unidad ${this.highestUnlockedUnit} al 100% para habilitar nuevas unidades.`
      };
      this.speakSingleText(this.professorReply.speechText);
      return;
    }

    if (lower.includes('solenoide') || lower.includes('bobina') || lower.includes('ampere')) {
      this.selectUnitClass(7);
      this.professorReply = {
        speechText: 'Un solenoide es un conductor enrollado en forma de hélice con N espiras a lo largo de una longitud L. Cuando circula una corriente I, los campos magnéticos de cada espira se suman en el interior creando un campo magnético uniforme y paralelo al eje dado por B igual a mu cero por N por I dividido L, mientras que afuera el campo es prácticamente nulo.',
        formulaLatex: 'B_{\\text{solenoide}} = \\frac{\\mu_0 \\cdot N \\cdot I}{L} \\quad (\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A})',
        calcTip: 'Acordate siempre de pasar la longitud L del solenoide de centímetros a metros antes de dividir.'
      };
    } else if (lower.includes('capacitor') || lower.includes('pf') || lower.includes('nf') || lower.includes('dielectrico') || lower.includes('dieléctrico')) {
      this.selectUnitClass(4);
      this.professorReply = {
        speechText: 'Un capacitor almacena carga y energía electrostática entre dos placas conductoras. Su capacidad es C igual a kappa por épsilon cero por el área A dividido la distancia d. Para convertir prefijos recordá que cada escalón entre mili, micro, nano y pico es un factor mil: 1 nanofaradio equivale a 1000 picofaradios (10 a la menos 9 Faradios), y 1 picofaradio es 10 a la menos 12 Faradios.',
        formulaLatex: 'C = \\frac{\\kappa \\cdot \\varepsilon_0 \\cdot A}{d} \\quad ; \\quad 1\\text{ nF} = 1000\\text{ pF} = 10^{-9}\\text{ F}',
        calcTip: 'Para pasar el área de cm² a m² multiplicá por 10⁻⁴ (tecla EXP -4 en la calculadora).'
      };
    } else if (lower.includes('gauss') || lower.includes('conductor') || lower.includes('flujo')) {
      this.selectUnitClass(2);
      this.professorReply = {
        speechText: 'La Ley de Gauss establece que el flujo eléctrico neto a través de cualquier superficie cerrada es igual a la carga neta encerrada adentro dividida por épsilon cero. En un conductor en equilibrio electrostático, las cargas libres se repelen hasta ubicarse todas en la superficie exterior, por lo que el campo eléctrico en el interior del conductor es siempre cero.',
        formulaLatex: '\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{encerrada}}}{\\varepsilon_0}',
        calcTip: 'En la calculadora, ε₀ se carga como 8.854 [×10ˣ] (-) 12.'
      };
    } else if (lower.includes('magnetico') || lower.includes('magnético') || lower.includes('lorentz') || lower.includes('ciclotron') || lower.includes('ciclotrón')) {
      this.selectUnitClass(6);
      this.professorReply = {
        speechText: 'El campo magnético B ejerce fuerza únicamente sobre cargas en movimiento según la ley de Lorentz: F igual a q por el producto vectorial de v por B. Como la fuerza magnética es siempre perpendicular a la velocidad, no realiza trabajo mecánico (la rapidez se mantiene constante) y curva la trayectoria formando un círculo de radio R igual a m por v sobre q por B.',
        formulaLatex: 'F_B = |q| \\cdot v \\cdot B \\cdot \\sin(\\theta) \\quad ; \\quad R = \\frac{m \\cdot v}{|q| \\cdot B}',
        calcTip: 'Si el campo B te lo dan en Gauss, multiplicá por 10⁻⁴ para pasarlo a Teslas.'
      };
    } else if (lower.includes('faraday') || lower.includes('lenz') || lower.includes('induc')) {
      this.selectUnitClass(8);
      this.professorReply = {
        speechText: 'La Ley de Faraday-Lenz explica que solo nace un voltaje inducido cuando el flujo magnético a través de una espira cambia con el tiempo. El signo menos de Lenz significa que la corriente inducida genera su propio campo magnético oponiéndose al aumento o disminución del flujo externo para conservar la energía.',
        formulaLatex: '\\mathcal{E} = -N \\cdot \\frac{d\\Phi_B}{dt}',
        calcTip: 'El flujo magnético se mide en Webers (1 Wb = 1 Tesla × 1 m²).'
      };
    } else if (lower.includes('impedancia') || lower.includes('rlc') || lower.includes('resonancia') || lower.includes('alterna')) {
      this.selectUnitClass(9);
      this.professorReply = {
        speechText: 'En corriente alterna, la impedancia Z es la oposición total del circuito RLC serie y se calcula como la hipotenusa entre la resistencia R y la resta de reactancias X_L menos X_C. El circuito entra en resonancia cuando X_L iguala a X_C: en ese punto la impedancia es mínima (Z = R) y la corriente es máxima.',
        formulaLatex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad ; \\quad f_0 = \\frac{1}{2\\pi\\sqrt{L \\cdot C}}',
        calcTip: 'Para calcular X_C = 1 / (2·π·f·C), calculá el denominador y apretá la tecla [x⁻¹].'
      };
    } else {
      this.selectUnitClass(1);
      this.professorReply = {
        speechText: 'Una carga eléctrica es una propiedad intrínseca de la materia que nace del exceso o defecto de electrones respecto a los protones del átomo. La Ley de Coulomb nos dice que la fuerza entre dos cargas es igual a la constante k por el producto de las cargas dividido la distancia al cuadrado.',
        formulaLatex: 'F = \\frac{k \\cdot |q_1| \\cdot |q_2|}{r^2} \\quad (k = 8,99 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2)',
        calcTip: 'Pasá siempre los centímetros a metros (÷ 100) y los microCoulombs a Coulombs (× 10⁻⁶) antes de elevar la distancia al cuadrado.'
      };
    }

    this.speakSingleText(this.professorReply.speechText);
  }
}
