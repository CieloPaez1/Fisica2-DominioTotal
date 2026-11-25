import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonMenuButton,
  IonContent,
} from '@ionic/angular/standalone';
import { Fisica2ApiService, ProgramUnitDto, StudentErrorDto } from '../../services/fisica2-api.service';

interface ShortcutCard {
  title: string;
  subtitle: string;
  route: string;
  queryParams?: Record<string, string | number>;
  icon: string;
  tone: 'cream' | 'lavender' | 'peach' | 'sky' | 'gold';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonMenuButton,
    IonContent,
  ],
  template: `
    <ion-content [fullscreen]="true" class="cielo-home-content">
      <div class="cielo-stage">

        <!-- ================================================================
             1. TOP BAR: UNIDAD ACTIVA + PROGRESO + CAMPANA + CONFIGURACIÓN
             ================================================================ -->
        <div class="top-status-bar">
          <div class="top-left">
            <ion-menu-button class="menu-trigger"></ion-menu-button>
            <div class="active-unit-pill" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
              <span class="aup-label">Unidad Activa: {{ nextRecommendedUnit.unitNumber }}</span>
              <span class="aup-lock">{{ unlockedCount < 9 ? '🔒' : '🔓' }}</span>
              <div class="aup-track">
                <div class="aup-fill" [style.width.%]="getUnitPct(nextRecommendedUnit)"></div>
              </div>
              <span class="aup-pct">{{ getUnitPct(nextRecommendedUnit) }}% completado</span>
            </div>
          </div>

          <div class="top-right">
            <button class="icon-circle-btn" routerLink="/errors" title="Alertas y Errores Activos">
              <span>🔔</span>
              <span class="bell-dot" *ngIf="activeErrors.length > 0">{{ activeErrors.length }}</span>
            </button>
            <button class="icon-circle-btn" (click)="showResetConfirm = true" title="Reiniciar Progreso a 0%">
              <span>⚙️</span>
            </button>
          </div>
        </div>

        <!-- MODAL DE REINICIO A 0% -->
        <div class="reset-overlay" *ngIf="showResetConfirm">
          <div class="reset-modal">
            <h3>⚠️ ¿Reiniciar Progreso a 0%?</h3>
            <p>
              Esta acción pondrá en <strong>0%</strong> todas las unidades para comenzar desde cero (solo la Unidad 1 quedará desbloqueada). Tu registro de <em>Mis Errores</em> se mantiene intacto.
            </p>
            <div class="rm-actions">
              <button class="rm-cancel" (click)="showResetConfirm = false">Cancelar</button>
              <button class="rm-confirm" (click)="executeResetProgress()">Sí, Reiniciar a 0%</button>
            </div>
          </div>
        </div>

        <!-- MODAL DE UNIDAD BLOQUEADA -->
        <div class="reset-overlay" *ngIf="lockedUnitAlert">
          <div class="reset-modal">
            <h3>🔒 Unidad {{ lockedUnitAlert.attemptedUnitNumber }} Bloqueada</h3>
            <p>
              Para acceder a esta unidad primero debés completar al <strong>100%</strong> la <strong>Unidad {{ lockedUnitAlert.requiredUnit.unitNumber }}</strong>.
            </p>
            <div class="rm-actions">
              <button class="rm-cancel" (click)="lockedUnitAlert = null">Cerrar</button>
              <button class="rm-confirm" (click)="goToRequiredUnlockedUnit(lockedUnitAlert.requiredUnit.unitNumber)">
                Ir a Unidad {{ lockedUnitAlert.requiredUnit.unitNumber }}
              </button>
            </div>
          </div>
        </div>

        <!-- ================================================================
             2. HERO CÓSMICO: ¡HOLA CIELO! ♡ + FÓRMULA + ÁTOMO NEÓN
             ================================================================ -->
        <div class="cosmic-hero-banner">
          <div class="hero-copy">
            <h1>¡Hola Cielo! <span class="hero-heart">♡</span></h1>
            <p>Seguimos estudiando juntos <span class="hero-sparkle">✨</span></p>
          </div>

          <div class="hero-art-right">
            <span class="floating-formula">F = m · a</span>
            <svg viewBox="0 0 180 140" class="hero-atom-svg">
              <defs>
                <radialGradient id="atomCore" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stop-color="#ffd166"/>
                  <stop offset="100%" stop-color="#a855f7"/>
                </radialGradient>
              </defs>
              <g transform="translate(95, 70)">
                <ellipse rx="62" ry="22" fill="none" stroke="#c4b5fd" stroke-width="2.6" transform="rotate(-25)"/>
                <ellipse rx="62" ry="22" fill="none" stroke="#8b5cf6" stroke-width="2.6" transform="rotate(28)"/>
                <ellipse rx="62" ry="22" fill="none" stroke="#5ce1e6" stroke-width="2.2" transform="rotate(88)"/>
                <circle r="11" fill="url(#atomCore)" stroke="#ffffff" stroke-width="2"/>
                <circle cx="-46" cy="-19" r="5" fill="#ffd166"/>
                <circle cx="48" cy="18" r="5" fill="#5ce1e6"/>
                <circle cx="8" cy="-58" r="4.5" fill="#f472b6"/>
              </g>
            </svg>
          </div>
        </div>

        <!-- ================================================================
             3. FILA DE PROGRESO GENERAL + UNIDAD ACTUAL + CONSEJO DE HOY
             ================================================================ -->
        <div class="progress-advice-grid">
          <div class="glass-progress-card">
            <div class="gpc-left">
              <div class="gpc-title">📊 Tu progreso general</div>
              <div class="gpc-bar-row">
                <div class="gpc-track">
                  <div class="gpc-fill" [style.width.%]="globalMastery"></div>
                </div>
                <span class="gpc-pct">{{ globalMastery }}%</span>
              </div>
              <div class="gpc-sub">
                🏆 {{ unlockedCount }} de 9 unidades desbloqueadas ({{ completedUnitsCount }} al 100%)
              </div>
            </div>

            <div class="gpc-divider"></div>

            <div class="gpc-right">
              <div class="gpc-unit-label">Unidad actual</div>
              <div class="gpc-unit-row">
                <div class="unit-circle-badge">{{ nextRecommendedUnit.unitNumber }}</div>
                <div class="unit-name-text">{{ getShortIllustratedTitle(nextRecommendedUnit.unitNumber) }}</div>
                <button class="btn-continue-purple" (click)="goToUnit(nextRecommendedUnit.unitNumber, nextRecommendedTab)">
                  Continuar →
                </button>
              </div>
            </div>
          </div>

          <div class="advice-lavender-card">
            <div class="alc-copy">
              <div class="alc-title">💡 Consejo de hoy:</div>
              <p class="alc-text">{{ dailyAdvice }}</p>
            </div>
            <svg viewBox="0 0 90 90" class="alc-atom">
              <g transform="translate(45,45)">
                <ellipse rx="34" ry="12" fill="none" stroke="#4c1d95" stroke-width="2.2" transform="rotate(-28)"/>
                <ellipse rx="34" ry="12" fill="none" stroke="#4c1d95" stroke-width="2.2" transform="rotate(28)"/>
                <ellipse rx="34" ry="12" fill="none" stroke="#4c1d95" stroke-width="2" transform="rotate(90)"/>
                <circle r="6" fill="#4c1d95"/>
              </g>
            </svg>
          </div>
        </div>

        <!-- ================================================================
             4. ACCESOS DIRECTOS (GRID 3x4 PASTEL CARTOON)
             ================================================================ -->
        <div class="shortcuts-header">
          <h2>⭐ Accesos directos</h2>
          <button class="btn-see-all" routerLink="/units">Ver todas →</button>
        </div>

        <div class="shortcuts-grid">
          <button
            *ngFor="let card of shortcutCards"
            class="shortcut-tile"
            [attr.data-tone]="card.tone"
            (click)="openShortcut(card)"
          >
            <div class="st-icon-box">{{ card.icon }}</div>
            <div class="st-copy">
              <div class="st-title">{{ card.title }}</div>
              <div class="st-sub">{{ card.subtitle }}</div>
            </div>
            <div class="st-arrow">›</div>
          </button>
        </div>

        <!-- ================================================================
             5. FILA INFERIOR: RANKING + PRÓXIMOS OBJETIVOS + TARJETA MARCA
             ================================================================ -->
        <div class="bottom-trio-grid">

          <!-- PODIO / RANKING -->
          <div class="bottom-dark-card">
            <div class="bdc-head">
              <span>🏆 Ranking de la semana</span>
              <button class="mini-pill-link" routerLink="/errors">Ver ranking →</button>
            </div>
            <div class="podium-row">
              <div class="podium-col">
                <div class="p-avatar">👩‍🎓</div>
                <div class="p-block silver">
                  <span class="p-rank">2</span>
                  <span class="p-name">Andy</span>
                  <span class="p-score">93%</span>
                </div>
              </div>
              <div class="podium-col">
                <div class="p-crown">👑</div>
                <div class="p-avatar gold-ring">⭐</div>
                <div class="p-block gold">
                  <span class="p-rank">1</span>
                  <span class="p-name">Vos</span>
                  <span class="p-score">{{ Math.max(98, globalMastery) }}%</span>
                </div>
              </div>
              <div class="podium-col">
                <div class="p-avatar">🧑‍🎓</div>
                <div class="p-block bronze">
                  <span class="p-rank">3</span>
                  <span class="p-name">Vale</span>
                  <span class="p-score">90%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- PRÓXIMOS OBJETIVOS -->
          <div class="bottom-dark-card objectives-card">
            <div class="bdc-head">
              <span>🎯 Próximos objetivos</span>
            </div>
            <div class="obj-body">
              <div class="obj-list">
                <div class="obj-item done" (click)="goToUnit(nextRecommendedUnit.unitNumber, 'teoria')">
                  <span class="obj-check">✓</span>
                  <span>Completar Unidad {{ nextRecommendedUnit.unitNumber }} al 100%</span>
                </div>
                <div class="obj-item" routerLink="/speed-drill">
                  <span class="obj-circle"></span>
                  <span>Superar el Simulacro de 90s</span>
                </div>
                <div class="obj-item" routerLink="/demostraciones">
                  <span class="obj-circle"></span>
                  <span>Practicar las deducciones clave</span>
                </div>
              </div>
              <div class="vamos-badge">¡Vamos<br/>por más!</div>
            </div>
          </div>

          <!-- TARJETA BRANDING CÓSMICA -->
          <div class="bottom-brand-card" routerLink="/mapa">
            <div class="bbc-top">
              <svg viewBox="0 0 80 80" class="bbc-atom">
                <g transform="translate(40,40)">
                  <ellipse rx="30" ry="11" fill="none" stroke="#c4b5fd" stroke-width="2.2" transform="rotate(-28)"/>
                  <ellipse rx="30" ry="11" fill="none" stroke="#8b5cf6" stroke-width="2.2" transform="rotate(28)"/>
                  <ellipse rx="30" ry="11" fill="none" stroke="#5ce1e6" stroke-width="2" transform="rotate(90)"/>
                  <circle r="6" fill="#ffd166"/>
                </g>
              </svg>
              <div class="bbc-title">Física 2</div>
            </div>
            <div class="bbc-tagline">Aprendé. Practicá. Aprobá.</div>
          </div>

        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .cielo-home-content {
      --background: radial-gradient(circle at 80% 10%, #2a1d62 0%, #121536 48%, #0b0e24 100%);
    }
    .cielo-stage {
      max-width: 1320px;
      margin: 0 auto;
      padding: 14px 22px 36px 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 1. TOP STATUS BAR */
    .top-status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .top-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .menu-trigger {
      color: #ffffff;
    }
    .active-unit-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(24, 28, 66, 0.85);
      border: 1.5px solid rgba(167, 139, 250, 0.35);
      border-radius: 99px;
      padding: 6px 16px;
      cursor: pointer;
    }
    .aup-label {
      color: #e2d6ff;
      font-weight: 800;
      font-size: 0.86rem;
    }
    .aup-track {
      width: 110px;
      height: 8px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.14);
      overflow: hidden;
    }
    .aup-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c5dfa, #c084fc);
      border-radius: 99px;
    }
    .aup-pct {
      color: #c4b5fd;
      font-size: 0.82rem;
      font-weight: 700;
    }
    .top-right {
      display: flex;
      gap: 10px;
    }
    .icon-circle-btn {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1.5px solid rgba(196, 181, 253, 0.3);
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    .bell-dot {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ff4d6d;
      color: #ffffff;
      font-size: 0.68rem;
      font-weight: 900;
      padding: 1px 5px;
      border-radius: 99px;
    }

    /* 2. HERO BANNER */
    .cosmic-hero-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      min-height: 108px;
    }
    .hero-copy h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 2.7rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      line-height: 1.02;
    }
    .hero-heart {
      color: #c4b5fd;
      font-weight: 400;
    }
    .hero-copy p {
      font-family: 'Caveat', cursive;
      font-size: 1.65rem;
      color: #e2d6ff;
      margin: 2px 0 0 0;
    }
    .hero-art-right {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .floating-formula {
      font-family: 'Caveat', cursive;
      font-size: 2rem;
      color: rgba(215, 198, 255, 0.7);
      transform: rotate(-8deg);
    }
    .hero-atom-svg {
      width: 145px;
      height: 112px;
      filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.55));
    }

    /* 3. PROGRESS + ADVICE ROW */
    .progress-advice-grid {
      display: grid;
      grid-template-columns: 1.75fr 1fr;
      gap: 14px;
    }
    @media (max-width: 960px) {
      .progress-advice-grid {
        grid-template-columns: 1fr;
      }
    }
    .glass-progress-card {
      background: rgba(24, 27, 65, 0.85);
      border: 1.5px solid rgba(167, 139, 250, 0.28);
      border-radius: 18px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .gpc-left {
      flex: 1 1 250px;
    }
    .gpc-title {
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 1.05rem;
      margin-bottom: 8px;
    }
    .gpc-bar-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .gpc-track {
      flex: 1;
      height: 12px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.12);
      overflow: hidden;
    }
    .gpc-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c5dfa, #c084fc);
      border-radius: 99px;
    }
    .gpc-pct {
      color: #ffffff;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.45rem;
      font-weight: 800;
    }
    .gpc-sub {
      margin-top: 6px;
      font-size: 0.82rem;
      color: #d7c6ff;
      font-weight: 700;
    }
    .gpc-divider {
      width: 1px;
      height: 62px;
      background: rgba(255, 255, 255, 0.14);
    }
    @media (max-width: 720px) {
      .gpc-divider { display: none; }
    }
    .gpc-right {
      flex: 1 1 240px;
    }
    .gpc-unit-label {
      color: #c4b5fd;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .gpc-unit-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .unit-circle-badge {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #6d28d9;
      border: 2px solid #c4b5fd;
      color: #ffffff;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .unit-name-text {
      color: #ffffff;
      font-weight: 800;
      font-size: 0.95rem;
      flex: 1;
    }
    .btn-continue-purple {
      background: linear-gradient(90deg, #7c5dfa, #9b7bf7);
      color: #ffffff;
      border: none;
      border-radius: 99px;
      padding: 8px 16px;
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(124, 93, 250, 0.45);
    }

    .advice-lavender-card {
      background: linear-gradient(135deg, #c7b8ff 0%, #b197fc 100%);
      border-radius: 18px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      color: #191538;
    }
    .alc-title {
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
    .alc-text {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 700;
      line-height: 1.35;
    }
    .alc-atom {
      width: 72px;
      height: 72px;
      flex-shrink: 0;
    }

    /* 4. ACCESOS DIRECTOS */
    .shortcuts-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
    }
    .shortcuts-header h2 {
      font-family: 'Baloo 2', sans-serif;
      color: #ffffff;
      font-size: 1.25rem;
      font-weight: 800;
      margin: 0;
    }
    .btn-see-all {
      background: rgba(255, 255, 255, 0.08);
      color: #e2d6ff;
      border: 1.5px solid rgba(196, 181, 253, 0.25);
      border-radius: 99px;
      padding: 5px 14px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
    }
    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    @media (max-width: 1024px) {
      .shortcuts-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .shortcuts-grid { grid-template-columns: 1fr; }
    }
    .shortcut-tile {
      border: 2px solid rgba(25, 21, 56, 0.16);
      border-radius: 16px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      cursor: pointer;
      transition: transform 0.14s ease, box-shadow 0.14s ease;
      box-shadow: 0 4px 0 rgba(10, 12, 32, 0.35);
    }
    .shortcut-tile:hover {
      transform: translateY(-2px);
    }
    .shortcut-tile[data-tone="cream"] { background: #f4ead5; color: #191538; }
    .shortcut-tile[data-tone="lavender"] { background: #dad5ff; color: #191538; }
    .shortcut-tile[data-tone="peach"] { background: #f3c18f; color: #191538; }
    .shortcut-tile[data-tone="sky"] { background: #cfe0ff; color: #191538; }
    .shortcut-tile[data-tone="gold"] { background: #f5dfb0; color: #191538; }

    .st-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(25, 21, 56, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.45rem;
      flex-shrink: 0;
    }
    .st-copy {
      flex: 1;
      min-width: 0;
    }
    .st-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.05rem;
      font-weight: 800;
      line-height: 1.15;
    }
    .st-sub {
      font-size: 0.78rem;
      font-weight: 700;
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .st-arrow {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #7c5dfa;
      color: #ffffff;
      font-size: 1.25rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* 5. BOTTOM TRIO */
    .bottom-trio-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.25fr 0.9fr;
      gap: 14px;
    }
    @media (max-width: 980px) {
      .bottom-trio-grid { grid-template-columns: 1fr; }
    }
    .bottom-dark-card {
      background: rgba(24, 27, 65, 0.88);
      border: 1.5px solid rgba(167, 139, 250, 0.28);
      border-radius: 18px;
      padding: 14px 18px;
      color: #ffffff;
    }
    .bdc-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .mini-pill-link {
      background: rgba(255, 255, 255, 0.08);
      color: #d7c6ff;
      border: 1px solid rgba(196, 181, 253, 0.3);
      border-radius: 99px;
      padding: 3px 10px;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
    }
    .podium-row {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 12px;
      padding-top: 6px;
    }
    .podium-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .p-crown { font-size: 1rem; margin-bottom: -4px; }
    .p-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #2e2963;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    .p-avatar.gold-ring {
      border: 2px solid #ffd166;
    }
    .p-block {
      width: 68px;
      border-radius: 10px 10px 4px 4px;
      padding: 6px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 800;
    }
    .p-block.gold { background: linear-gradient(180deg, #8b5cf6, #5b21b6); height: 68px; }
    .p-block.silver { background: rgba(148, 163, 184, 0.25); height: 52px; }
    .p-block.bronze { background: rgba(245, 158, 11, 0.3); height: 48px; }
    .p-rank { font-size: 0.82rem; color: #ffd166; }
    .p-name { font-size: 0.78rem; }
    .p-score { font-size: 0.72rem; color: #d7c6ff; }

    .obj-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .obj-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .obj-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      color: #d7c6ff;
      cursor: pointer;
    }
    .obj-check {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #7c5dfa;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 900;
    }
    .obj-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(196, 181, 253, 0.45);
    }
    .vamos-badge {
      font-family: 'Caveat', cursive;
      font-size: 1.55rem;
      line-height: 0.95;
      color: #e2d6ff;
      text-align: center;
      transform: rotate(-6deg);
    }

    .bottom-brand-card {
      background: radial-gradient(circle at 20% 20%, #4c1d95 0%, #1e1b4b 100%);
      border: 1.5px solid rgba(196, 181, 253, 0.35);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .bbc-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .bbc-atom {
      width: 56px;
      height: 56px;
    }
    .bbc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      color: #ffffff;
    }
    .bbc-tagline {
      font-family: 'Caveat', cursive;
      font-size: 1.35rem;
      color: #ffd166;
    }

    /* MODALS */
    .reset-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 12, 30, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    }
    .reset-modal {
      background: #dad5ff;
      color: #191538;
      border: 3px solid #191538;
      border-radius: 20px;
      padding: 22px;
      max-width: 440px;
      width: 100%;
    }
    .reset-modal h3 {
      margin: 0 0 8px 0;
      font-family: 'Baloo 2', sans-serif;
    }
    .rm-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 16px;
    }
    .rm-cancel {
      background: #ffffff;
      border: 2px solid #191538;
      border-radius: 12px;
      padding: 8px 14px;
      font-weight: 800;
      cursor: pointer;
    }
    .rm-confirm {
      background: #7c5dfa;
      color: #ffffff;
      border: 2px solid #191538;
      border-radius: 12px;
      padding: 8px 14px;
      font-weight: 800;
      cursor: pointer;
    }
  `]
})
export class HomePage implements OnInit {
  units: ProgramUnitDto[] = [];
  activeErrors: StudentErrorDto[] = [];
  showResetConfirm = false;
  lockedUnitAlert: { attemptedUnitNumber: number; requiredUnit: ProgramUnitDto } | null = null;
  Math = Math;

  shortcutCards: ShortcutCard[] = [
    { title: 'Unidades', subtitle: 'Teoría • Laboratorio • Práctica', route: '/units', queryParams: { tab: 'teoria' }, icon: '📖', tone: 'cream' },
    { title: 'Profesor Virtual', subtitle: 'Consultá y aprendé', route: '/profesor', icon: '👨‍🏫', tone: 'lavender' },
    { title: 'Demostraciones', subtitle: '26 deducciones animadas', route: '/demostraciones', icon: '📐', tone: 'peach' },
    { title: 'Calculadora & TPs', subtitle: 'Resolvé y practicá', route: '/calculadora', icon: '🧮', tone: 'sky' },
    { title: 'Simulacros', subtitle: 'Flashcards y Muerte Súbita', route: '/speed-drill', icon: '⚡', tone: 'gold' },
    { title: 'Entrenamiento Oral', subtitle: 'Defendé tus conocimientos', route: '/tribunal', icon: '🎙️', tone: 'lavender' },
    { title: 'Memorización', subtitle: 'Fórmulas y Machete Legal', route: '/machete', icon: '🧠', tone: 'peach' },
    { title: 'Simuladores y Límites', subtitle: 'Analizá en vivo', route: '/limits', icon: '📈', tone: 'lavender' },
    { title: 'Mi Progreso', subtitle: 'Tus estadísticas', route: '/errors', icon: '📊', tone: 'cream' },
    { title: 'Biblioteca PDFs', subtitle: 'Teoría y ejercicios', route: '/pdfs', icon: '📂', tone: 'lavender' },
    { title: 'Constelación Conceptual', subtitle: 'Conectá los temas', route: '/mapa', icon: '🕸️', tone: 'gold' },
    { title: 'Podcasts de Repaso', subtitle: 'Escuchá y repasá', route: '/podcasts', icon: '🎧', tone: 'peach' },
  ];

  constructor(private api: Fisica2ApiService, private router: Router) {}

  ngOnInit() {
    this.api.units$.subscribe((data) => {
      this.units = data || [];
    });
    this.api.errors$.subscribe((errs) => {
      this.activeErrors = (errs || []).filter((e) => !e.resolved);
    });
    this.api.getUnits().subscribe();
    this.api.getErrors().subscribe();
  }

  get unlockedCount(): number {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((u) => this.isUnitUnlocked(u)).length;
  }

  get completedUnitsCount(): number {
    return this.units.filter((u) => this.getUnitPct(u) >= 100).length;
  }

  get globalMastery(): number {
    if (!this.units.length) return 0;
    const sum = this.units.reduce((acc, u) => acc + this.getUnitPct(u), 0);
    return Math.round(sum / this.units.length);
  }

  get nextRecommendedUnit(): ProgramUnitDto {
    if (!this.units.length) {
      return {
        unitNumber: 1,
        title: 'Unidad 1',
        subtitle: '',
        parcialGroup: '1er Parcial',
        labId: 'gauss',
        progressTeoria: 0,
        progressLaboratorio: 0,
        progressPractico: 0,
        progressPruebaDominio: 0,
        certificationStatus: 'no_iniciada',
      };
    }
    const highest = this.api.getHighestUnlockedUnitNumber(this.units);
    return this.units.find((u) => u.unitNumber === highest) || this.units[0];
  }

  get nextRecommendedTab(): string {
    const u = this.nextRecommendedUnit;
    if (u.progressTeoria < 100) return 'teoria';
    if (u.progressLaboratorio < 100) return 'graficos';
    if (u.progressPractico < 100) return 'practica';
    return 'mcq';
  }

  get dailyAdvice(): string {
    const u = this.nextRecommendedUnit.unitNumber;
    if (u === 1) return 'Repasá la Ley de Coulomb y las líneas de campo en Teoría antes de pasar al práctico.';
    if (u === 2) return 'Recordá que en Potencial y Energía Potencial siempre se incluyen los signos (+ o -) de las cargas.';
    return `Enfocate en completar al 100% la Unidad ${u} para desbloquear la siguiente.`;
  }

  isUnitUnlocked(unitNumber: number): boolean {
    return this.api.isUnitUnlocked(unitNumber, this.units);
  }

  getUnitPct(u: ProgramUnitDto): number {
    return this.api.calculateUnitMastery(u);
  }

  getShortIllustratedTitle(unitNumber: number): string {
    const map: Record<number, string> = {
      1: 'Campo Puntual y Cargas',
      2: 'Potencial Eléctrico',
      3: 'Capacitancia',
      4: 'Corriente y Resistencia',
      5: 'Circuitos Eléctricos',
      6: 'Campo Magnético',
      7: 'Biot-Savart y Ampère',
      8: 'Ley de Faraday',
      9: 'Inductancia y Maxwell',
    };
    return map[unitNumber] || `Unidad ${unitNumber}`;
  }

  openShortcut(card: ShortcutCard) {
    if (card.queryParams) {
      this.router.navigate([card.route], { queryParams: card.queryParams });
    } else {
      this.router.navigate([card.route]);
    }
  }

  goToUnit(unitNum: number, tab: string = 'teoria') {
    if (!this.isUnitUnlocked(unitNum)) {
      const highest = this.api.getHighestUnlockedUnitNumber(this.units);
      const reqUnit = this.units.find((u) => u.unitNumber === highest) || this.units[0];
      if (reqUnit) {
        this.lockedUnitAlert = { attemptedUnitNumber: unitNum, requiredUnit: reqUnit };
      }
      return;
    }
    this.router.navigate(['/units'], { queryParams: { u: unitNum, tab } });
  }

  goToRequiredUnlockedUnit(unitNum: number) {
    this.lockedUnitAlert = null;
    this.router.navigate(['/units'], { queryParams: { u: unitNum, tab: this.nextRecommendedTab } });
  }

  executeResetProgress() {
    this.api.resetAllProgress().subscribe(() => {
      this.showResetConfirm = false;
    });
  }
}
