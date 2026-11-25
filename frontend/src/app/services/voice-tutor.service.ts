import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface VoiceOptionItem {
  id: string;
  name: string;
  lang: string;
  isNatural: boolean;
  genderHint: 'female' | 'male' | 'neutral';
  displayLabel: string;
  rawVoice: SpeechSynthesisVoice;
}

export interface VoiceSettings {
  selectedVoiceId: string;
  rate: number;
  pitch: number;
}

const VOICE_SETTINGS_STORAGE_KEY = 'fisica2_cielo_voice_settings_v1';

@Injectable({
  providedIn: 'root'
})
export class VoiceTutorService {
  private voicesSubject = new BehaviorSubject<VoiceOptionItem[]>([]);
  public voices$ = this.voicesSubject.asObservable();

  private isSpeakingSubject = new BehaviorSubject<boolean>(false);
  public isSpeaking$ = this.isSpeakingSubject.asObservable();

  private isPausedSubject = new BehaviorSubject<boolean>(false);
  public isPaused$ = this.isPausedSubject.asObservable();

  private currentSubtitleSubject = new BehaviorSubject<string>('');
  public currentSubtitle$ = this.currentSubtitleSubject.asObservable();

  public settings: VoiceSettings = {
    selectedVoiceId: '',
    rate: 1.03,
    pitch: 1.0
  };

  private sentenceQueue: string[] = [];
  private currentSentenceIdx = 0;
  private stopRequested = false;

  constructor(private zone: NgZone) {
    this.loadSavedSettings();
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const populate = () => {
      const rawList = window.speechSynthesis.getVoices() || [];
      if (!rawList.length) return;

      // Filtrar voces en español primero (si no hubiera ninguna, incluir todas)
      const spanishVoices = rawList.filter(v => v.lang.toLowerCase().startsWith('es'));
      const pool = spanishVoices.length > 0 ? spanishVoices : rawList;

      const mapped: VoiceOptionItem[] = pool.map((v) => {
        const lowerName = v.name.toLowerCase();
        const isNatural =
          lowerName.includes('natural') ||
          lowerName.includes('online') ||
          lowerName.includes('neural') ||
          lowerName.includes('google');

        const isMale =
          lowerName.includes('tomas') ||
          lowerName.includes('tomás') ||
          lowerName.includes('alvaro') ||
          lowerName.includes('álvaro') ||
          lowerName.includes('jorge') ||
          lowerName.includes('pablo') ||
          lowerName.includes('raul') ||
          lowerName.includes('raúl') ||
          lowerName.includes('alonso') ||
          lowerName.includes('gonzalo') ||
          lowerName.includes('lorenzo') ||
          lowerName.includes('male');

        const isFemale =
          lowerName.includes('elena') ||
          lowerName.includes('dalia') ||
          lowerName.includes('sabina') ||
          lowerName.includes('helena') ||
          lowerName.includes('laura') ||
          lowerName.includes('paulina') ||
          lowerName.includes('paloma') ||
          lowerName.includes('salome') ||
          lowerName.includes('salomé') ||
          lowerName.includes('elvira') ||
          lowerName.includes('female');

        const genderHint: 'female' | 'male' | 'neutral' = isMale ? 'male' : isFemale ? 'female' : 'neutral';

        const cleanName = v.name
          .replace(/Microsoft /gi, '')
          .replace(/Desktop - Spanish/gi, '')
          .replace(/Online \(Natural\) - Spanish/gi, '✨ Voz Natural')
          .trim();

        const regionBadge = v.lang.includes('AR')
          ? '🇦🇷 Argentina'
          : v.lang.includes('MX')
          ? '🇲🇽 Latinoamérica'
          : v.lang.includes('US') || v.lang.includes('419')
          ? '🌎 Neutro'
          : v.lang.includes('ES')
          ? '🇪🇸 España'
          : v.lang;

        const prefix = isNatural ? '⭐ ' : '🎙️ ';
        return {
          id: v.voiceURI || v.name,
          name: v.name,
          lang: v.lang,
          isNatural,
          genderHint,
          displayLabel: `${prefix}${cleanName} (${regionBadge})`,
          rawVoice: v
        };
      });

      // Ordenar priorizando: 1) Voces Naturales/Neurales/Google, 2) Español Argentino/Latino
      mapped.sort((a, b) => {
        const scoreA = (a.isNatural ? 100 : 0) + (a.lang.includes('AR') ? 30 : a.lang.includes('MX') || a.lang.includes('US') ? 20 : 10);
        const scoreB = (b.isNatural ? 100 : 0) + (b.lang.includes('AR') ? 30 : b.lang.includes('MX') || b.lang.includes('US') ? 20 : 10);
        return scoreB - scoreA;
      });

      this.zone.run(() => {
        this.voicesSubject.next(mapped);

        // Si no había voz guardada o ya no existe, elegir la mejor voz natural automáticamente
        const exists = mapped.some(item => item.id === this.settings.selectedVoiceId);
        if (!exists && mapped.length > 0) {
          this.settings.selectedVoiceId = mapped[0].id;
          this.saveSettings();
        }
      });
    };

    populate();
    window.speechSynthesis.onvoiceschanged = () => populate();
  }

  public getAvailableVoices(): VoiceOptionItem[] {
    return this.voicesSubject.value;
  }

  public selectVoice(voiceId: string) {
    this.settings.selectedVoiceId = voiceId;
    this.saveSettings();
  }

  public applyPreset(preset: 'profesora' | 'profesor' | 'fluido' | 'pausado') {
    const voices = this.voicesSubject.value;
    if (preset === 'profesora') {
      const fem = voices.find(v => v.genderHint === 'female' && v.isNatural) || voices.find(v => v.genderHint === 'female') || voices[0];
      if (fem) this.settings.selectedVoiceId = fem.id;
      this.settings.rate = 1.03;
      this.settings.pitch = 1.04;
    } else if (preset === 'profesor') {
      const male = voices.find(v => v.genderHint === 'male' && v.isNatural) || voices.find(v => v.genderHint === 'male') || voices[0];
      if (male) this.settings.selectedVoiceId = male.id;
      this.settings.rate = 1.05;
      this.settings.pitch = 0.95;
    } else if (preset === 'fluido') {
      this.settings.rate = 1.18;
      this.settings.pitch = 1.0;
    } else if (preset === 'pausado') {
      this.settings.rate = 0.92;
      this.settings.pitch = 1.0;
    }
    this.saveSettings();
  }

  public updateRateAndPitch(rate: number, pitch: number) {
    this.settings.rate = rate;
    this.settings.pitch = pitch;
    this.saveSettings();
  }

  /**
   * Habla un texto de Física 2 de forma fluida, dividiéndolo por oraciones naturales
   * y traduciendo todos los símbolos físicos/matemáticos al español hablado natural.
   */
  public speakFluid(rawText: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    this.stop();
    this.stopRequested = false;

    const cleanSpeech = this.humanizePhysicsTextForSpeech(rawText);
    // Dividir en oraciones naturales para evitar cortes del motor y lograr cadencia fluida
    const sentences = cleanSpeech
      .split(/(?<=[.?!;:])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (!sentences.length) return;

    this.sentenceQueue = sentences;
    this.currentSentenceIdx = 0;
    this.zone.run(() => {
      this.isSpeakingSubject.next(true);
      this.isPausedSubject.next(false);
    });

    this.speakNextSentence();
  }

  private speakNextSentence() {
    if (this.stopRequested || this.currentSentenceIdx >= this.sentenceQueue.length) {
      this.zone.run(() => {
        this.isSpeakingSubject.next(false);
        this.isPausedSubject.next(false);
        this.currentSubtitleSubject.next('');
      });
      return;
    }

    const sentence = this.sentenceQueue[this.currentSentenceIdx];
    this.zone.run(() => {
      this.currentSubtitleSubject.next(sentence);
    });

    const utterance = new SpeechSynthesisUtterance(sentence);
    const chosen = this.voicesSubject.value.find(v => v.id === this.settings.selectedVoiceId);

    if (chosen) {
      utterance.voice = chosen.rawVoice;
      utterance.lang = chosen.lang;
    } else {
      utterance.lang = 'es-AR';
    }

    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;

    utterance.onend = () => {
      if (this.stopRequested) return;
      this.currentSentenceIdx++;
      this.speakNextSentence();
    };

    utterance.onerror = () => {
      if (this.stopRequested) return;
      this.currentSentenceIdx++;
      this.speakNextSentence();
    };

    window.speechSynthesis.speak(utterance);
  }

  public togglePauseResume() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!this.isSpeakingSubject.value) return;

    if (this.isPausedSubject.value) {
      window.speechSynthesis.resume();
      this.zone.run(() => this.isPausedSubject.next(false));
    } else {
      window.speechSynthesis.pause();
      this.zone.run(() => this.isPausedSubject.next(true));
    }
  }

  public stop() {
    this.stopRequested = true;
    this.sentenceQueue = [];
    this.currentSentenceIdx = 0;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.zone.run(() => {
      this.isSpeakingSubject.next(false);
      this.isPausedSubject.next(false);
      this.currentSubtitleSubject.next('');
    });
  }

  /**
   * Transforma símbolos matemáticos, subíndices, unidades y vectores en español
   * hablado fluido para que el sintetizador suene como un profesor humano real.
   */
  public humanizePhysicsTextForSpeech(text: string): string {
    if (!text) return '';
    return text
      // Vectores y símbolos griegos compuestos
      .replace(/E⃗/g, 'el vector campo eléctrico E')
      .replace(/B⃗/g, 'el vector campo magnético B')
      .replace(/F⃗/g, 'el vector fuerza')
      .replace(/v⃗/g, 'el vector velocidad')
      .replace(/dA⃗|dS⃗/g, 'diferencial de área')
      .replace(/dl⃗/g, 'diferencial de longitud')
      .replace(/Φ_E/g, 'flujo eléctrico')
      .replace(/Φ_B/g, 'flujo magnético')
      .replace(/ε₀|ε_0/g, 'épsilon cero')
      .replace(/μ₀|μ_0/g, 'mu cero')
      .replace(/q₁|q_1/g, 'q sub 1')
      .replace(/q₂|q_2/g, 'q sub 2')
      .replace(/q₀|q_0/g, 'q sub cero')
      .replace(/V_A/g, 'potencial en A')
      .replace(/V_B/g, 'potencial en B')
      .replace(/v_C/g, 'voltaje del capacitor')
      .replace(/X_L/g, 'reactancia inductiva')
      .replace(/X_C/g, 'reactancia capacitiva')
      .replace(/τ_L/g, 'tau inductivo')
      .replace(/ΔV/g, 'diferencia de potencial')
      .replace(/ΔΦ_B/g, 'variación de flujo magnético')
      .replace(/Δt/g, 'intervalo de tiempo')
      // Potencias frecuentes
      .replace(/10⁻¹⁹/g, 'diez a la menos diecinueve')
      .replace(/10⁻¹²/g, 'diez a la menos doce')
      .replace(/10⁻⁹/g, 'diez a la menos nueve')
      .replace(/10⁻⁶/g, 'diez a la menos seis')
      .replace(/10⁻⁴/g, 'diez a la menos cuatro')
      .replace(/10⁻³/g, 'diez a la menos tres')
      .replace(/10⁻²/g, 'diez a la menos dos')
      .replace(/10⁹/g, 'diez a la nueve')
      .replace(/10⁶/g, 'diez a la seis')
      .replace(/r²/g, 'erre al cuadrado')
      .replace(/1\/r²/g, 'uno sobre erre al cuadrado')
      .replace(/cm²/g, 'centímetros cuadrados')
      .replace(/m²/g, 'metros cuadrados')
      // Prefijos y unidades
      .replace(/\bμC\b/g, 'microcoulombs')
      .replace(/\bnC\b/g, 'nanocoulombs')
      .replace(/\bpC\b/g, 'picocoulombs')
      .replace(/\bpF\b/g, 'picofaradios')
      .replace(/\bnF\b/g, 'nanofaradios')
      .replace(/\bμF\b/g, 'microfaradios')
      .replace(/\bmH\b/g, 'milihenrios')
      .replace(/\bmT\b/g, 'militeslas')
      .replace(/\bkΩ\b/g, 'kiloohms')
      .replace(/N\/C/g, 'Newtons sobre Coulomb')
      .replace(/V\/m/g, 'Voltios sobre metro')
      .replace(/N·m²\/C²/g, 'Newton metro cuadrado sobre Coulomb cuadrado')
      // Símbolos sueltos
      .replace(/ε/g, 'épsilon')
      .replace(/σ/g, 'sigma')
      .replace(/λ/g, 'lambda')
      .replace(/ρ/g, 'ro')
      .replace(/κ/g, 'kappa')
      .replace(/τ/g, 'tau')
      .replace(/ω/g, 'omega')
      .replace(/φ/g, 'fi')
      .replace(/θ/g, 'tita')
      .replace(/π/g, 'pi')
      .replace(/Ω/g, 'Ohms')
      .replace(/→|⇒/g, ', entonces ')
      .replace(/•|✦|⚡|🔊|👩‍🏫|🧒|🎓|🔒|🔓/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public saveSettings() {
    try {
      localStorage.setItem(VOICE_SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    } catch {}
  }

  private loadSavedSettings() {
    try {
      const raw = localStorage.getItem(VOICE_SETTINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.settings = {
            selectedVoiceId: parsed.selectedVoiceId || '',
            rate: typeof parsed.rate === 'number' ? parsed.rate : 1.03,
            pitch: typeof parsed.pitch === 'number' ? parsed.pitch : 1.0
          };
        }
      }
    } catch {}
  }
}
