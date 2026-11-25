import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonMenuToggle,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { Fisica2ApiService } from './services/fisica2-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonMenuToggle,
    IonRouterOutlet,
  ],
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content" when="lg">
        <ion-menu contentId="main-content" type="overlay" class="cielo-sidebar">
          <ion-content class="cielo-sidebar-content">
            <div class="sidebar-shell">

              <!-- ============================================================
                   LOGO ILUSTRADO: ÁTOMO + FÍSICA 2 + CINTA "DOMINIO TOTAL"
                   ============================================================ -->
              <div class="logo-crest" routerLink="/home">
                <svg viewBox="0 0 180 62" class="crest-top-svg">
                  <!-- Chispas y estrellas -->
                  <text x="14" y="28" fill="#ffd166" font-size="14" font-weight="900">✦</text>
                  <text x="152" y="24" fill="#d7c6ff" font-size="15" font-weight="900">⚡</text>
                  <circle cx="36" cy="14" r="2" fill="#ffffff" />
                  <circle cx="144" cy="40" r="2" fill="#ffd166" />
                  <!-- Átomo central ilustrado -->
                  <g transform="translate(90, 32)">
                    <ellipse rx="36" ry="12" fill="none" stroke="#d7c6ff" stroke-width="2.4" transform="rotate(-24)" />
                    <ellipse rx="36" ry="12" fill="none" stroke="#a587ff" stroke-width="2.4" transform="rotate(26)" />
                    <ellipse rx="36" ry="12" fill="none" stroke="#c084fc" stroke-width="2" transform="rotate(86)" />
                    <circle r="6" fill="#ff8fab" stroke="#181236" stroke-width="2" />
                    <circle cx="-26" cy="-11" r="3.5" fill="#ffd166" />
                    <circle cx="28" cy="-10" r="3.5" fill="#5ce1e6" />
                  </g>
                </svg>

                <div class="crest-title">FÍSICA 2</div>
                <div class="crest-ribbon">
                  <span>Dominio Total</span>
                </div>
              </div>

              <!-- ============================================================
                   MENÚ LATERAL CON ICONOS VECTORIALES ILUSTRADOS
                   ============================================================ -->
              <div class="nav-items-stack">
                <ion-menu-toggle auto-hide="false" *ngFor="let item of menuItems">
                  <button
                    type="button"
                    class="nav-pill-btn"
                    [class.active]="isRouteActive(item)"
                    (click)="navigateItem(item)"
                  >
                    <div class="nav-svg-icon" [ngSwitch]="item.iconKey">
                      <!-- Inicio (Casa cartoon) -->
                      <svg *ngSwitchCase="'home'" viewBox="0 0 32 32">
                        <path d="M 4 15 L 16 5 L 28 15 L 25 15 L 25 27 L 19 27 L 19 20 L 13 20 L 13 27 L 7 27 L 7 15 Z"
                              fill="#ffffff" stroke="#1b1438" stroke-width="2.2" stroke-linejoin="round" />
                      </svg>
                      <!-- Unidades (Libro abierto) -->
                      <svg *ngSwitchCase="'units'" viewBox="0 0 32 32">
                        <path d="M 4 8 Q 10 6 16 9 Q 22 6 28 8 L 28 25 Q 22 23 16 26 Q 10 23 4 25 Z"
                              fill="#d7c6ff" stroke="#1b1438" stroke-width="2.2" stroke-linejoin="round" />
                        <line x1="16" y1="9" x2="16" y2="26" stroke="#1b1438" stroke-width="2.2" />
                      </svg>
                      <!-- Laboratorio (Matraz Erlenmeyer) -->
                      <svg *ngSwitchCase="'lab'" viewBox="0 0 32 32">
                        <path d="M 12 5 L 20 5 M 14 5 L 14 13 L 6 26 L 26 26 L 18 13 L 18 5"
                              fill="#93c5fd" stroke="#1b1438" stroke-width="2.2" stroke-linejoin="round" />
                        <path d="M 8 22 L 24 22 L 26 26 L 6 26 Z" fill="#5ce1e6" />
                      </svg>
                      <!-- Ejercicios (Calculadora) -->
                      <svg *ngSwitchCase="'exercises'" viewBox="0 0 32 32">
                        <rect x="6" y="4" width="20" height="24" rx="4" fill="#c4b5fd" stroke="#1b1438" stroke-width="2.2" />
                        <rect x="9" y="7" width="14" height="5" rx="1.5" fill="#1e1b4b" />
                        <circle cx="11" cy="17" r="1.6" fill="#1e1b4b" /><circle cx="16" cy="17" r="1.6" fill="#1e1b4b" /><circle cx="21" cy="17" r="1.6" fill="#1e1b4b" />
                        <circle cx="11" cy="22" r="1.6" fill="#1e1b4b" /><circle cx="16" cy="22" r="1.6" fill="#1e1b4b" /><circle cx="21" cy="22" r="1.6" fill="#1e1b4b" />
                      </svg>
                      <!-- Simulacros (Portapapeles con tilde) -->
                      <svg *ngSwitchCase="'sim'" viewBox="0 0 32 32">
                        <rect x="6" y="6" width="20" height="22" rx="4" fill="#d7c6ff" stroke="#1b1438" stroke-width="2.2" />
                        <rect x="11" y="3" width="10" height="5" rx="2" fill="#8c6df7" stroke="#1b1438" stroke-width="2" />
                        <path d="M 11 17 L 15 21 L 22 13" fill="none" stroke="#1b1438" stroke-width="2.8" stroke-linecap="round" />
                      </svg>
                      <!-- Memorización (Cerebro luminoso) -->
                      <svg *ngSwitchCase="'memo'" viewBox="0 0 32 32">
                        <path d="M 16 7 C 9 6, 5 12, 7 18 C 5 23, 9 27, 16 26 Z" fill="#f472b6" stroke="#1b1438" stroke-width="2" />
                        <path d="M 16 7 C 23 6, 27 12, 25 18 C 27 23, 23 27, 16 26 Z" fill="#c084fc" stroke="#1b1438" stroke-width="2" />
                      </svg>
                      <!-- Entrenamiento Oral (Micrófono de estudio) -->
                      <svg *ngSwitchCase="'oral'" viewBox="0 0 32 32">
                        <rect x="11" y="4" width="10" height="15" rx="5" fill="#ffd166" stroke="#1b1438" stroke-width="2.2" />
                        <path d="M 7 14 C 7 22, 25 22, 25 14" fill="none" stroke="#d7c6ff" stroke-width="2.4" stroke-linecap="round" />
                        <line x1="16" y1="21" x2="16" y2="27" stroke="#d7c6ff" stroke-width="2.4" />
                        <line x1="11" y1="27" x2="21" y2="27" stroke="#d7c6ff" stroke-width="2.4" stroke-linecap="round" />
                      </svg>
                      <!-- Mi Progreso (Gráfico de barras) -->
                      <svg *ngSwitchCase="'progress'" viewBox="0 0 32 32">
                        <rect x="6" y="18" width="5" height="9" rx="1.5" fill="#5ce1e6" stroke="#1b1438" stroke-width="1.8" />
                        <rect x="13.5" y="12" width="5" height="15" rx="1.5" fill="#a78bfa" stroke="#1b1438" stroke-width="1.8" />
                        <rect x="21" y="6" width="5" height="21" rx="1.5" fill="#38e595" stroke="#1b1438" stroke-width="1.8" />
                      </svg>
                      <!-- Demostraciones (Pizarra con Integral) -->
                      <svg *ngSwitchCase="'derivations'" viewBox="0 0 32 32">
                        <rect x="4" y="6" width="24" height="19" rx="3" fill="#5ce1e6" stroke="#1b1438" stroke-width="2.2" />
                        <path d="M 11 20 C 13 20, 14 11, 16 11 C 18 11, 19 20, 21 20" fill="none" stroke="#1b1438" stroke-width="2.4" stroke-linecap="round" />
                        <circle cx="22.5" cy="11.5" r="2" fill="#ffd166" />
                      </svg>
                      <!-- Biblioteca PDFs -->
                      <svg *ngSwitchDefault viewBox="0 0 32 32">
                        <path d="M 4 9 L 13 9 L 16 12 L 28 12 L 28 25 L 4 25 Z" fill="#ffd166" stroke="#1b1438" stroke-width="2.2" stroke-linejoin="round" />
                      </svg>
                    </div>

                    <span class="nav-pill-text">{{ item.title }}</span>
                    <span class="err-pill-count" *ngIf="item.url === '/errors' && activeErrorsCount > 0">
                      {{ activeErrorsCount }}
                    </span>
                  </button>
                </ion-menu-toggle>
              </div>

              <!-- ============================================================
                   CARTEL NEÓN "VOS PODÉS ♡" Y ÁTOMO ORBITAL EN LA ESQUINA
                   ============================================================ -->
              <div class="sidebar-bottom-art">
                <div class="vos-podes-neon-sign">
                  <span class="vpn-words">Vos podés</span>
                  <span class="vpn-heart">♡</span>
                </div>

                <svg viewBox="0 0 180 120" class="bottom-atom-art">
                  <g transform="translate(82, 68)">
                    <ellipse rx="65" ry="22" fill="none" stroke="rgba(196, 173, 255, 0.24)" stroke-width="2" transform="rotate(-26)" />
                    <ellipse rx="65" ry="22" fill="none" stroke="rgba(196, 173, 255, 0.24)" stroke-width="2" transform="rotate(30)" />
                    <ellipse rx="65" ry="22" fill="none" stroke="rgba(196, 173, 255, 0.18)" stroke-width="2" transform="rotate(86)" />
                    <circle r="6" fill="rgba(196, 173, 255, 0.35)" />
                    <circle cx="-48" cy="-18" r="3.5" fill="rgba(255, 209, 102, 0.45)" />
                    <circle cx="52" cy="14" r="3" fill="rgba(196, 173, 255, 0.45)" />
                  </g>
                </svg>
              </div>

            </div>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [`
    .cielo-sidebar {
      --width: 256px;
      --background: #0B0D20;
      border-right: 1px solid rgba(137, 87, 255, 0.28);
    }
    .cielo-sidebar-content {
      --background: linear-gradient(180deg, #0E112B 0%, #090B1C 100%);
    }
    .sidebar-shell {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 12px 8px 12px;
    }

    /* LOGO FÍSICA 2 DOMINIO TOTAL */
    .logo-crest {
      text-align: center;
      cursor: pointer;
      padding-bottom: 8px;
    }
    .crest-top-svg {
      width: 140px;
      height: 44px;
      display: block;
      margin: 0 auto -6px auto;
    }
    .crest-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.95rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 0.95;
      letter-spacing: 0.01em;
      text-shadow: 0 4px 0 #261854, 0 6px 16px rgba(140, 109, 247, 0.65);
    }
    .crest-ribbon {
      display: inline-block;
      margin-top: 4px;
      background: linear-gradient(90deg, #6949e8, #9b7bf7);
      border: 2px solid #d7c6ff;
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.96rem;
      font-weight: 800;
      padding: 2px 20px;
      border-radius: 10px;
      transform: rotate(-4deg);
      box-shadow: 0 5px 0 #2c1a6e, 0 8px 16px rgba(0, 0, 0, 0.45);
    }

    /* BOTONES DE NAVEGACIÓN */
    .nav-items-stack {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .nav-pill-btn {
      width: 100%;
      background: transparent;
      border: 1.5px solid transparent;
      border-radius: 12px;
      padding: 4px 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #d8def8;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.94rem;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      transition: all 0.18s ease;
    }
    .nav-pill-btn:hover {
      background: rgba(137, 87, 255, 0.16);
      border-color: rgba(137, 87, 255, 0.35);
      color: #ffffff;
      transform: translateX(3px);
    }
    .nav-pill-btn.active {
      background: linear-gradient(90deg, #8957FF 0%, #a682ff 100%);
      border-color: rgba(215, 198, 255, 0.5);
      color: #ffffff;
      box-shadow: 0 6px 18px -2px rgba(137, 87, 255, 0.65);
    }
    .nav-svg-icon {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      background: rgba(25, 32, 72, 0.95);
      border: 1.5px solid rgba(186, 164, 255, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      flex-shrink: 0;
    }
    .nav-pill-btn.active .nav-svg-icon {
      background: rgba(255, 255, 255, 0.24);
      border-color: #ffffff;
    }
    .nav-svg-icon svg {
      width: 24px;
      height: 24px;
      display: block;
    }
    .nav-pill-text {
      flex: 1;
      line-height: 1.1;
    }
    .err-pill-count {
      background: #ff5d73;
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 99px;
      border: 1.5px solid #ffffff;
    }

    /* PIE DE BARRA LATERAL */
    .sidebar-bottom-art {
      position: relative;
      padding-top: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .vos-podes-neon-sign {
      background: rgba(20, 26, 62, 0.92);
      border: 2.5px solid #9d7eff;
      border-radius: 22px;
      padding: 8px 26px;
      transform: rotate(-5deg);
      box-shadow:
        0 0 22px rgba(157, 126, 255, 0.45),
        inset 0 0 12px rgba(157, 126, 255, 0.2);
      text-align: center;
      z-index: 2;
    }
    .vpn-words {
      display: block;
      font-family: 'Caveat', cursive;
      font-size: 1.75rem;
      font-weight: 700;
      color: #ffd166;
      line-height: 0.95;
      text-shadow: 0 2px 10px rgba(255, 209, 102, 0.45);
    }
    .vpn-heart {
      color: #e2d6ff;
      font-size: 1rem;
    }
    .bottom-atom-art {
      width: 165px;
      height: 95px;
      margin-top: -18px;
      pointer-events: none;
    }
  `]
})
export class AppComponent implements OnInit {
  activeErrorsCount = 0;

  public menuItems = [
    { title: 'Inicio', url: '/home', tab: null, iconKey: 'home' },
    { title: 'Unidades', url: '/units', tab: 'teoria', iconKey: 'units' },
    { title: 'Profesor Virtual', url: '/profesor', tab: null, iconKey: 'oral' },
    { title: 'Demostraciones', url: '/demostraciones', tab: null, iconKey: 'derivations' },
    { title: 'Calculadora & TPs', url: '/calculadora', tab: null, iconKey: 'exercises' },
    { title: 'Simulacros', url: '/speed-drill', tab: null, iconKey: 'sim' },
    { title: 'Entrenamiento Oral', url: '/tribunal', tab: null, iconKey: 'oral' },
    { title: 'Memorización', url: '/machete', tab: null, iconKey: 'memo' },
    { title: 'Simuladores y Límites', url: '/limits', tab: null, iconKey: 'lab' },
    { title: 'Mi Progreso', url: '/errors', tab: null, iconKey: 'progress' },
    { title: 'Biblioteca PDFs', url: '/pdfs', tab: null, iconKey: 'pdfs' },
    { title: 'Constelación Conceptual', url: '/mapa', tab: null, iconKey: 'units' },
    { title: 'Podcasts de Repaso', url: '/podcasts', tab: null, iconKey: 'oral' },
  ];

  constructor(private api: Fisica2ApiService, private router: Router) {}

  ngOnInit() {
    this.api.errors$.subscribe((errs) => {
      this.activeErrorsCount = (errs || []).filter(e => !e.resolved).length;
    });
    this.api.getUnits().subscribe();
    this.api.getErrors().subscribe();
  }

  isRouteActive(item: { url: string; tab: string | null }): boolean {
    const currentUrl = this.router.url;
    if (item.url === '/units' && item.tab) {
      if (item.tab === 'teoria' && currentUrl === '/units') return true;
      return currentUrl.startsWith('/units') && currentUrl.includes(`tab=${item.tab}`);
    }
    return currentUrl.startsWith(item.url);
  }

  navigateItem(item: { url: string; tab: string | null }) {
    if (item.tab) {
      this.router.navigate([item.url], { queryParams: { tab: item.tab } });
    } else {
      this.router.navigate([item.url]);
    }
  }
}
