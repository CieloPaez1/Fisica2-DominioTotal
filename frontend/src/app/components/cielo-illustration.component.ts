import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CieloArtName = string;

@Component({
  selector: 'app-cielo-art',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="art-wrap" [style.width.px]="width" [style.height.px]="height" [ngSwitch]="name">

      <!-- ====================================================================
           1. UNIDAD 1: ELECTRICIDAD (BOMBILLA + CARGAS Y RAYOS)
           ==================================================================== -->
      <svg *ngSwitchCase="'bulb'" viewBox="0 0 130 140" class="art-svg">
        <circle cx="65" cy="58" r="46" fill="rgba(255, 209, 102, 0.25)" />
        <g stroke="#ffd166" stroke-width="4" stroke-linecap="round">
          <line x1="65" y1="6" x2="65" y2="16" />
          <line x1="22" y1="22" x2="30" y2="30" />
          <line x1="108" y1="22" x2="100" y2="30" />
          <line x1="10" y1="58" x2="20" y2="58" />
          <line x1="120" y1="58" x2="110" y2="58" />
        </g>
        <path d="M 32 58 C 32 24, 98 24, 98 58 C 98 76, 81 84, 79 100 L 51 100 C 49 84, 32 76, 32 58 Z"
              fill="#ffd166" stroke="#1b1438" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M 42 46 C 44 35, 55 32, 62 32" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9" />
        <path d="M 57 98 L 57 68 C 50 56, 80 56, 73 68 L 73 98" fill="none" stroke="#1b1438" stroke-width="3.5" stroke-linecap="round" />
        <rect x="48" y="100" width="34" height="22" rx="7" fill="#94a3b8" stroke="#1b1438" stroke-width="4" />
        <line x1="48" y1="108" x2="82" y2="108" stroke="#1b1438" stroke-width="3.5" />
        <line x1="48" y1="115" x2="82" y2="115" stroke="#1b1438" stroke-width="3.5" />
        <path d="M 55 122 C 58 132, 72 132, 75 122 Z" fill="#1b1438" />
      </svg>

      <!-- ====================================================================
           2. UNIDAD 2: LEY DE GAUSS (ESFERA GAUSSIANA Y VECTOR FLUJO)
           ==================================================================== -->
      <svg *ngSwitchCase="'gauss-sphere'" viewBox="0 0 130 140" class="art-svg">
        <circle cx="65" cy="70" r="46" fill="rgba(92, 225, 230, 0.18)" stroke="#5ce1e6" stroke-width="4" stroke-dasharray="7 5" />
        <ellipse cx="65" cy="70" rx="46" ry="16" fill="none" stroke="#a78bfa" stroke-width="3" stroke-dasharray="5 4" />
        <!-- Vectores radiales saliendo -->
        <g stroke="#ffd166" stroke-width="4" stroke-linecap="round">
          <line x1="65" y1="22" x2="65" y2="6" /><polygon points="65,3 59,13 71,13" fill="#ffd166" />
          <line x1="65" y1="118" x2="65" y2="134" /><polygon points="65,137 59,127 71,127" fill="#ffd166" />
          <line x1="18" y1="70" x2="4" y2="70" /><polygon points="2,70 12,64 12,76" fill="#ffd166" />
          <line x1="112" y1="70" x2="126" y2="70" /><polygon points="128,70 118,64 118,76" fill="#ffd166" />
        </g>
        <!-- Carga central encerrada +Q -->
        <circle cx="65" cy="70" r="20" fill="#ff4d6d" stroke="#1b1438" stroke-width="4.5" />
        <circle cx="59" cy="63" r="4.5" fill="#ffb3c1" />
        <text x="65" y="76" text-anchor="middle" fill="#ffffff" font-family="Baloo 2, sans-serif" font-weight="800" font-size="18">+Q</text>
      </svg>

      <!-- ====================================================================
           3. UNIDAD 3: POTENCIAL ELÉCTRICO (ANILLOS EQUIPOTENCIALES Y SONDA)
           ==================================================================== -->
      <svg *ngSwitchCase="'equipotential'" viewBox="0 0 130 140" class="art-svg">
        <circle cx="60" cy="74" r="46" fill="rgba(167, 139, 250, 0.16)" stroke="#c4b5fd" stroke-width="3" stroke-dasharray="6 4" />
        <circle cx="60" cy="74" r="32" fill="rgba(92, 225, 230, 0.22)" stroke="#5ce1e6" stroke-width="3.5" />
        <circle cx="60" cy="74" r="17" fill="#8c6df7" stroke="#1b1438" stroke-width="4" />
        <text x="60" y="79" text-anchor="middle" fill="#ffffff" font-weight="900" font-size="14">V₀</text>
        <!-- Sonda medidora cartoon -->
        <g transform="translate(94, 36) rotate(25)">
          <rect x="-8" y="-22" width="16" height="34" rx="5" fill="#ffd166" stroke="#1b1438" stroke-width="3.5" />
          <polygon points="-4,12 4,12 0,26" fill="#cbd5e1" stroke="#1b1438" stroke-width="3" />
        </g>
        <text x="20" y="30" fill="#ffd166" font-size="18" font-weight="900">✦</text>
      </svg>

      <!-- ====================================================================
           4. UNIDAD 4: CAPACITORES (CONDENSADOR CILÍNDRICO AZUL 3D)
           ==================================================================== -->
      <svg *ngSwitchCase="'capacitor'" viewBox="0 0 130 140" class="art-svg">
        <g transform="translate(68, 66) rotate(22)">
          <path d="M -11 32 L -11 60" stroke="#cbd5e1" stroke-width="5.5" stroke-linecap="round" />
          <path d="M 11 32 L 11 56" stroke="#cbd5e1" stroke-width="5.5" stroke-linecap="round" />
          <rect x="-28" y="-36" width="56" height="68" rx="10" fill="#3b82f6" stroke="#1b1438" stroke-width="4.5" />
          <rect x="10" y="-33" width="12" height="62" rx="3" fill="#93c5fd" />
          <line x1="-18" y1="-22" x2="-18" y2="20" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.75" />
          <ellipse cx="0" cy="-34" rx="27" ry="10" fill="#cbd5e1" stroke="#1b1438" stroke-width="4" />
          <line x1="-12" y1="-34" x2="12" y2="-34" stroke="#1b1438" stroke-width="2.5" />
          <line x1="0" y1="-40" x2="0" y2="-28" stroke="#1b1438" stroke-width="2.5" />
        </g>
        <text x="16" y="38" fill="#ffd166" font-size="20" font-weight="900">✦</text>
        <text x="102" y="108" fill="#a78bfa" font-size="18" font-weight="900">⚡</text>
      </svg>

      <!-- ====================================================================
           5. UNIDAD 5: CORRIENTE ELÉCTRICA (RESISTOR CON BANDAS DE COLOR)
           ==================================================================== -->
      <svg *ngSwitchCase="'resistor'" viewBox="0 0 130 140" class="art-svg">
        <g transform="translate(65, 70) rotate(-36)">
          <line x1="-62" y1="0" x2="62" y2="0" stroke="#1b1438" stroke-width="9" stroke-linecap="round" />
          <line x1="-60" y1="0" x2="60" y2="0" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" />
          <rect x="-36" y="-17" width="72" height="34" rx="14" fill="#e09f3e" stroke="#1b1438" stroke-width="4.5" />
          <rect x="-22" y="-15" width="8" height="30" fill="#7f1d1d" stroke="#1b1438" stroke-width="2" />
          <rect x="-6" y="-15" width="8" height="30" fill="#1e1b4b" stroke="#1b1438" stroke-width="2" />
          <rect x="10" y="-15" width="8" height="30" fill="#facc15" stroke="#1b1438" stroke-width="2" />
          <line x1="-26" y1="-9" x2="24" y2="-9" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.8" />
        </g>
        <text x="18" y="36" fill="#5ce1e6" font-size="18" font-weight="900">✦</text>
        <text x="98" y="114" fill="#ffd166" font-size="18" font-weight="900">⚡</text>
      </svg>

      <!-- ====================================================================
           6. UNIDAD 6: MAGNETISMO Y LORENTZ (IMÁN DE HERRADURA ROJO)
           ==================================================================== -->
      <svg *ngSwitchCase="'magnet'" viewBox="0 0 130 140" class="art-svg">
        <g transform="translate(66, 72) rotate(22)">
          <path d="M -32 36 L -32 -12 C -32 -44, 32 -44, 32 -12 L 32 36 L 12 36 L 12 -10 C 12 -22, -12 -22, -12 -10 L -12 36 Z"
                fill="#ff4d6d" stroke="#1b1438" stroke-width="4.5" stroke-linejoin="round" />
          <rect x="-32" y="18" width="20" height="18" rx="3" fill="#e2e8f0" stroke="#1b1438" stroke-width="4" />
          <rect x="12" y="18" width="20" height="18" rx="3" fill="#e2e8f0" stroke="#1b1438" stroke-width="4" />
          <path d="M -23 -12 C -23 -30, 0 -34, 10 -31" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8" />
        </g>
        <path d="M 30 112 Q 48 126 68 116" fill="none" stroke="#a78bfa" stroke-width="3.5" stroke-dasharray="4 4" />
        <text x="16" y="42" fill="#ffd166" font-size="18" font-weight="900">✦</text>
      </svg>

      <!-- ====================================================================
           7. UNIDAD 7: BIOT-SAVART Y AMPÈRE (BRÚJULA Y ANILLO MAGNÉTICO)
           ==================================================================== -->
      <svg *ngSwitchCase="'compass-ampere'" viewBox="0 0 130 140" class="art-svg">
        <!-- Anillo de campo B -->
        <ellipse cx="65" cy="72" rx="52" ry="22" fill="none" stroke="#5ce1e6" stroke-width="4" stroke-dasharray="6 4" transform="rotate(-18 65 72)" />
        <!-- Cuerpo de brújula dorada -->
        <circle cx="65" cy="72" r="34" fill="#ffd166" stroke="#1b1438" stroke-width="4.5" />
        <circle cx="65" cy="72" r="26" fill="#fffbeb" stroke="#1b1438" stroke-width="3" />
        <!-- Aguja magnética N-S -->
        <g transform="translate(65, 72) rotate(-32)">
          <polygon points="0,-22 -7,0 7,0" fill="#ff4d6d" stroke="#1b1438" stroke-width="2.5" />
          <polygon points="0,22 -7,0 7,0" fill="#3b82f6" stroke="#1b1438" stroke-width="2.5" />
          <circle r="4" fill="#ffd166" stroke="#1b1438" stroke-width="2" />
        </g>
        <text x="18" y="28" fill="#a78bfa" font-size="18" font-weight="900">✦</text>
      </svg>

      <!-- ====================================================================
           8. UNIDAD 8: INDUCCIÓN FARADAY-LENZ (BOBINA DE COBRE)
           ==================================================================== -->
      <svg *ngSwitchCase="'coil'" viewBox="0 0 135 140" class="art-svg">
        <g transform="translate(68, 70) rotate(-22)">
          <line x1="-54" y1="0" x2="54" y2="0" stroke="#5ce1e6" stroke-width="4" stroke-dasharray="6 4" />
          <ellipse cx="-24" cy="0" rx="13" ry="30" fill="none" stroke="#1b1438" stroke-width="9.5" />
          <ellipse cx="-24" cy="0" rx="13" ry="30" fill="none" stroke="#f59e0b" stroke-width="5.5" />
          <ellipse cx="-8" cy="0" rx="13" ry="30" fill="none" stroke="#1b1438" stroke-width="9.5" />
          <ellipse cx="-8" cy="0" rx="13" ry="30" fill="none" stroke="#fbbf24" stroke-width="5.5" />
          <ellipse cx="8" cy="0" rx="13" ry="30" fill="none" stroke="#1b1438" stroke-width="9.5" />
          <ellipse cx="8" cy="0" rx="13" ry="30" fill="none" stroke="#f59e0b" stroke-width="5.5" />
          <ellipse cx="24" cy="0" rx="13" ry="30" fill="none" stroke="#1b1438" stroke-width="9.5" />
          <ellipse cx="24" cy="0" rx="13" ry="30" fill="none" stroke="#fcd34d" stroke-width="5.5" />
        </g>
        <text x="18" y="34" fill="#ffd166" font-size="19" font-weight="900">⚡</text>
      </svg>

      <!-- ====================================================================
           9. UNIDAD 9: MAXWELL Y CORRIENTE ALTERNA (ONDAS EM + ÁTOMO)
           ==================================================================== -->
      <svg *ngSwitchCase="'maxwell-wave'" viewBox="0 0 135 140" class="art-svg">
        <circle cx="67" cy="70" r="46" fill="rgba(140, 109, 247, 0.2)" stroke="#a78bfa" stroke-width="3" />
        <!-- Onda Eléctrica E(t) -->
        <path d="M 16 70 Q 34 25, 52 70 T 88 70 T 120 70" fill="none" stroke="#1b1438" stroke-width="7" stroke-linecap="round" />
        <path d="M 16 70 Q 34 25, 52 70 T 88 70 T 120 70" fill="none" stroke="#5ce1e6" stroke-width="4" stroke-linecap="round" />
        <!-- Onda Magnética B(t) -->
        <path d="M 16 70 Q 34 115, 52 70 T 88 70 T 120 70" fill="none" stroke="#1b1438" stroke-width="7" stroke-linecap="round" />
        <path d="M 16 70 Q 34 115, 52 70 T 88 70 T 120 70" fill="none" stroke="#ff4d6d" stroke-width="4" stroke-linecap="round" />
        <circle cx="52" cy="70" r="6" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
        <circle cx="88" cy="70" r="6" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
      </svg>

      <!-- ====================================================================
           10. HERRAMIENTAS Y DESAFÍOS DEL DASHBOARD Y CABECERAS
           ==================================================================== -->
      <svg *ngSwitchCase="'tool-book'" viewBox="0 0 110 90" class="art-svg">
        <rect x="14" y="18" width="82" height="58" rx="8" fill="#6d28d9" stroke="#1b1438" stroke-width="4" />
        <path d="M 20 22 Q 38 16 55 24 L 55 72 Q 38 64 20 70 Z" fill="#fef3c7" stroke="#1b1438" stroke-width="3.5" />
        <path d="M 90 22 Q 72 16 55 24 L 55 72 Q 72 64 90 70 Z" fill="#fffbeb" stroke="#1b1438" stroke-width="3.5" />
        <line x1="27" y1="34" x2="47" y2="34" stroke="#7c5dfa" stroke-width="3" stroke-linecap="round" />
        <line x1="27" y1="44" x2="47" y2="44" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <line x1="27" y1="54" x2="43" y2="54" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <line x1="63" y1="34" x2="83" y2="34" stroke="#ff5d73" stroke-width="3" stroke-linecap="round" />
        <line x1="63" y1="44" x2="83" y2="44" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <line x1="63" y1="54" x2="78" y2="54" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
      </svg>

      <svg *ngSwitchCase="'tool-lab'" viewBox="0 0 110 90" class="art-svg">
        <rect x="18" y="10" width="74" height="50" rx="9" fill="#7c5dfa" stroke="#1b1438" stroke-width="4" />
        <rect x="24" y="16" width="62" height="38" rx="5" fill="#131838" stroke="#1b1438" stroke-width="2.5" />
        <path d="M 28 35 Q 36 18, 44 35 T 60 35 T 76 35 L 82 35" fill="none" stroke="#5ce1e6" stroke-width="3.5" stroke-linecap="round" />
        <rect x="46" y="60" width="18" height="10" fill="#94a3b8" stroke="#1b1438" stroke-width="3.5" />
        <path d="M 26 70 L 84 70 L 90 80 L 20 80 Z" fill="#cbd5e1" stroke="#1b1438" stroke-width="3.5" stroke-linejoin="round" />
      </svg>

      <svg *ngSwitchCase="'tool-chalkboard'" viewBox="0 0 110 90" class="art-svg">
        <rect x="14" y="12" width="82" height="58" rx="8" fill="#d97706" stroke="#1b1438" stroke-width="4" />
        <rect x="20" y="18" width="70" height="46" rx="4" fill="#1b4332" stroke="#1b1438" stroke-width="3" />
        <text x="55" y="48" text-anchor="middle" fill="#ffffff" font-family="Baloo 2, sans-serif" font-weight="800" font-size="20">F = ma</text>
        <rect x="64" y="58" width="16" height="6" rx="2" fill="#ff5d73" stroke="#1b1438" stroke-width="2" />
      </svg>

      <svg *ngSwitchCase="'tool-flashcards'" viewBox="0 0 110 90" class="art-svg">
        <g transform="translate(44, 45) rotate(-14)">
          <rect x="-26" y="-22" width="52" height="44" rx="8" fill="#38bdf8" stroke="#1b1438" stroke-width="4" />
        </g>
        <g transform="translate(60, 48) rotate(8)">
          <rect x="-28" y="-22" width="56" height="44" rx="8" fill="#fb7185" stroke="#1b1438" stroke-width="4" />
          <polygon points="0,-13 4,-4 14,-3 7,4 9,14 0,9 -9,14 -7,4 -14,-3 -4,-4" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
        </g>
      </svg>

      <svg *ngSwitchCase="'tool-board-play'" viewBox="0 0 110 90" class="art-svg">
        <rect x="16" y="14" width="78" height="58" rx="12" fill="#7c5dfa" stroke="#1b1438" stroke-width="4" />
        <rect x="22" y="20" width="66" height="46" rx="8" fill="#a78bfa" stroke="#1b1438" stroke-width="2.5" />
        <circle cx="55" cy="43" r="16" fill="#6d28d9" stroke="#1b1438" stroke-width="3" />
        <polygon points="50,34 50,52 65,43" fill="#ffffff" stroke="#1b1438" stroke-width="2.5" stroke-linejoin="round" />
      </svg>

      <svg *ngSwitchCase="'tool-oral'" viewBox="0 0 110 90" class="art-svg">
        <path d="M 16 26 C 16 14, 62 14, 62 26 L 62 44 C 62 54, 34 54, 28 54 L 18 64 L 20 52 C 17 50, 16 47, 16 44 Z"
              fill="#3b82f6" stroke="#1b1438" stroke-width="4" stroke-linejoin="round" />
        <circle cx="31" cy="35" r="3" fill="#ffffff" />
        <circle cx="40" cy="35" r="3" fill="#ffffff" />
        <circle cx="49" cy="35" r="3" fill="#ffffff" />
        <path d="M 46 38 C 46 28, 94 28, 94 38 L 94 56 C 94 66, 84 66, 82 66 L 86 78 L 72 66 C 54 66, 46 64, 46 56 Z"
              fill="#38bdf8" stroke="#1b1438" stroke-width="4" stroke-linejoin="round" />
        <circle cx="61" cy="48" r="3" fill="#1b1438" />
        <circle cx="70" cy="48" r="3" fill="#1b1438" />
        <circle cx="79" cy="48" r="3" fill="#1b1438" />
      </svg>

      <svg *ngSwitchCase="'challenge-clipboard'" viewBox="0 0 70 70" class="art-svg">
        <rect x="12" y="10" width="42" height="52" rx="7" fill="#cbd5e1" stroke="#1b1438" stroke-width="3.5" />
        <rect x="17" y="16" width="32" height="41" rx="4" fill="#ffffff" stroke="#1b1438" stroke-width="2.5" />
        <rect x="24" y="6" width="18" height="8" rx="3" fill="#64748b" stroke="#1b1438" stroke-width="3" />
        <line x1="23" y1="26" x2="43" y2="26" stroke="#7c5dfa" stroke-width="3" stroke-linecap="round" />
        <line x1="23" y1="35" x2="43" y2="35" stroke="#1b1438" stroke-width="3" stroke-linecap="round" />
        <line x1="23" y1="44" x2="37" y2="44" stroke="#1b1438" stroke-width="3" stroke-linecap="round" />
        <g transform="translate(50, 44) rotate(25)">
          <rect x="-4" y="-16" width="8" height="26" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
          <polygon points="-4,10 4,10 0,18" fill="#ff5d73" stroke="#1b1438" stroke-width="2.5" />
        </g>
      </svg>

      <svg *ngSwitchCase="'challenge-target'" viewBox="0 0 70 70" class="art-svg">
        <circle cx="34" cy="36" r="24" fill="#ff5d73" stroke="#1b1438" stroke-width="3.5" />
        <circle cx="34" cy="36" r="16" fill="#ffffff" stroke="#1b1438" stroke-width="3" />
        <circle cx="34" cy="36" r="8" fill="#ff5d73" stroke="#1b1438" stroke-width="3" />
        <line x1="58" y1="12" x2="34" y2="36" stroke="#1b1438" stroke-width="4" stroke-linecap="round" />
        <polygon points="54,8 62,8 62,16" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
      </svg>

      <svg *ngSwitchCase="'challenge-brain'" viewBox="0 0 70 70" class="art-svg">
        <path d="M 34 16 C 20 14, 12 24, 16 35 C 12 44, 20 56, 34 54 Z" fill="#f472b6" stroke="#1b1438" stroke-width="3.5" />
        <path d="M 36 16 C 50 14, 58 24, 54 35 C 58 44, 50 56, 36 54 Z" fill="#c084fc" stroke="#1b1438" stroke-width="3.5" />
        <path d="M 22 28 Q 28 32 24 40" fill="none" stroke="#1b1438" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 48 28 Q 42 32 46 40" fill="none" stroke="#1b1438" stroke-width="2.5" stroke-linecap="round" />
        <text x="54" y="18" fill="#ffd166" font-size="14" font-weight="900">✦</text>
      </svg>

      <!-- ====================================================================
           11. PERSONAJES DEL TRIBUNAL ORAL: PROF. TITULAR Y JTP
           ==================================================================== -->
      <svg *ngSwitchCase="'prof-titular'" viewBox="0 0 110 110" class="art-svg">
        <circle cx="55" cy="55" r="48" fill="#e2d6ff" stroke="#1b1438" stroke-width="4" />
        <!-- Cabello recogido profesional -->
        <circle cx="55" cy="24" r="14" fill="#4a2c18" stroke="#1b1438" stroke-width="3" />
        <path d="M 28 52 C 28 26, 82 26, 82 52 Z" fill="#4a2c18" stroke="#1b1438" stroke-width="3" />
        <!-- Rostro -->
        <circle cx="55" cy="54" r="19" fill="#ffe0bd" stroke="#1b1438" stroke-width="3.2" />
        <!-- Lentes académicos -->
        <rect x="39" y="47" width="13" height="9" rx="3" fill="rgba(255,255,255,0.6)" stroke="#1b1438" stroke-width="2.5" />
        <rect x="58" y="47" width="13" height="9" rx="3" fill="rgba(255,255,255,0.6)" stroke="#1b1438" stroke-width="2.5" />
        <line x1="52" y1="51" x2="58" y2="51" stroke="#1b1438" stroke-width="2.5" />
        <!-- Sonrisa -->
        <path d="M 49 62 Q 55 67 61 62" fill="none" stroke="#1b1438" stroke-width="2.5" stroke-linecap="round" />
        <!-- Guardapolvo / Blazer universitario -->
        <path d="M 25 96 C 30 75, 80 75, 85 96 Z" fill="#7c5dfa" stroke="#1b1438" stroke-width="3.5" />
        <polygon points="55,76 46,96 64,96" fill="#ffffff" stroke="#1b1438" stroke-width="2" />
      </svg>

      <svg *ngSwitchCase="'prof-jtp'" viewBox="0 0 110 110" class="art-svg">
        <circle cx="55" cy="55" r="48" fill="#ffd6e0" stroke="#1b1438" stroke-width="4" />
        <!-- Cabello corto -->
        <path d="M 32 46 C 32 22, 78 22, 78 46 Z" fill="#2b2d42" stroke="#1b1438" stroke-width="3" />
        <!-- Rostro -->
        <circle cx="55" cy="54" r="19" fill="#f7cfa0" stroke="#1b1438" stroke-width="3.2" />
        <!-- Ceja inquisitiva de repregunta -->
        <line x1="41" y1="44" x2="50" y2="46" stroke="#1b1438" stroke-width="2.8" stroke-linecap="round" />
        <line x1="60" y1="46" x2="69" y2="43" stroke="#1b1438" stroke-width="2.8" stroke-linecap="round" />
        <circle cx="46" cy="51" r="2.3" fill="#1b1438" />
        <circle cx="64" cy="51" r="2.3" fill="#1b1438" />
        <!-- Barba corta y sonrisa -->
        <path d="M 48 63 Q 55 67 62 63" fill="none" stroke="#1b1438" stroke-width="2.5" stroke-linecap="round" />
        <!-- Saco académico -->
        <path d="M 25 96 C 30 75, 80 75, 85 96 Z" fill="#ff4d6d" stroke="#1b1438" stroke-width="3.5" />
      </svg>

      <!-- ====================================================================
           12. CRONÓMETRO TURBO 90s, ESTUDIO DE PODCAST Y ESTANTERÍA PDF
           ==================================================================== -->
      <svg *ngSwitchCase="'stopwatch-90s'" viewBox="0 0 110 110" class="art-svg">
        <rect x="46" y="8" width="18" height="10" rx="3" fill="#ffd166" stroke="#1b1438" stroke-width="3" />
        <circle cx="55" cy="60" r="40" fill="#8c6df7" stroke="#1b1438" stroke-width="4.5" />
        <circle cx="55" cy="60" r="31" fill="#fffbeb" stroke="#1b1438" stroke-width="3" />
        <!-- Sector de 90s -->
        <path d="M 55 60 L 55 34 A 26 26 0 0 1 81 60 Z" fill="#ff4d6d" opacity="0.85" />
        <line x1="55" y1="60" x2="55" y2="37" stroke="#1b1438" stroke-width="4" stroke-linecap="round" />
        <line x1="55" y1="60" x2="73" y2="60" stroke="#1b1438" stroke-width="4" stroke-linecap="round" />
        <circle cx="55" cy="60" r="4.5" fill="#ffd166" stroke="#1b1438" stroke-width="2.5" />
        <text x="14" y="34" fill="#ffd166" font-size="22" font-weight="900">⚡</text>
      </svg>

      <svg *ngSwitchCase="'podcast-studio'" viewBox="0 0 110 110" class="art-svg">
        <!-- Arco de auriculares -->
        <path d="M 22 62 C 22 22, 88 22, 88 62" fill="none" stroke="#8c6df7" stroke-width="8" stroke-linecap="round" />
        <path d="M 22 62 C 22 22, 88 22, 88 62" fill="none" stroke="#1b1438" stroke-width="3" stroke-linecap="round" />
        <!-- Copas de auriculares -->
        <rect x="14" y="52" width="16" height="28" rx="7" fill="#ff4d6d" stroke="#1b1438" stroke-width="3.5" />
        <rect x="80" y="52" width="16" height="28" rx="7" fill="#ff4d6d" stroke="#1b1438" stroke-width="3.5" />
        <!-- Micrófono central -->
        <rect x="44" y="42" width="22" height="34" rx="11" fill="#ffd166" stroke="#1b1438" stroke-width="3.5" />
        <line x1="48" y1="52" x2="62" y2="52" stroke="#1b1438" stroke-width="2.5" />
        <line x1="48" y1="60" x2="62" y2="60" stroke="#1b1438" stroke-width="2.5" />
        <line x1="55" y1="76" x2="55" y2="94" stroke="#1b1438" stroke-width="4" />
        <line x1="40" y1="94" x2="70" y2="94" stroke="#1b1438" stroke-width="4" stroke-linecap="round" />
      </svg>

      <svg *ngSwitchDefault viewBox="0 0 110 110" class="art-svg">
        <circle cx="55" cy="55" r="42" fill="#8c6df7" stroke="#1b1438" stroke-width="4" />
        <text x="55" y="65" text-anchor="middle" fill="#ffd166" font-size="32" font-weight="900">✦</text>
      </svg>

    </div>
  `,
  styles: [`
    .art-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .art-svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 6px 10px rgba(10, 8, 26, 0.38));
    }
  `]
})
export class CieloIllustrationComponent {
  @Input() name: CieloArtName = 'bulb';
  @Input() width: number = 100;
  @Input() height: number = 100;
}
