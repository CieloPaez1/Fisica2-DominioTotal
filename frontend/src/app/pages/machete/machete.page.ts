import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CATEDRA_CHEATSHEETS, UnitCheatsheet } from '../../data/cheatsheet-data';
import { KatexRenderService } from '../../services/katex-render.service';
import { Fisica2ApiService } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent, CieloArtName } from '../../components/cielo-illustration.component';

@Component({
  selector: 'app-machete',
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
    <ion-header [translucent]="true" class="no-print">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>✦ Traductor de Fórmulas & Machete Legal A4 ♡</ion-title>
        <ion-buttons slot="end">
          <button class="cielo-btn-purple print-top-btn" (click)="printA4()">
            🖨️ Imprimir / Guardar Hoja A4
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="machete-wrapper">

        <!-- COMPACT HEADER + TABS (REFERENCIA PANEL 8) -->
        <div class="machete-top-bar no-print">
          <div class="mtb-left">
            <span class="mtb-title">🧠 Machete Legal — Unidad {{ selectedUnit }}</span>
            <div class="mtb-tabs">
              <button class="mtb-tab" [class.active]="macheteTab === 'formulas'" (click)="macheteTab = 'formulas'">
                Fórmulas Esenciales
              </button>
              <button class="mtb-tab" [class.active]="macheteTab === 'reglas'" (click)="macheteTab = 'reglas'">
                Reglas de Pizarrón
              </button>
            </div>
          </div>
          <button class="cielo-btn-purple" style="padding: 7px 16px !important; font-size: 0.84rem !important;" (click)="printA4()">
            🖨️ Imprimir A4
          </button>
        </div>

        <!-- SELECTOR ILUSTRADO DE UNIDADES (DESBLOQUEO SECUENCIAL ESTRICTO AL 100%) -->
        <div class="unit-selector-strip no-print">
          <button
            *ngFor="let sheet of allSheets"
            class="u-btn"
            [class.active]="selectedUnit === sheet.unitNumber"
            [style.opacity]="isUnitUnlocked(sheet.unitNumber) ? '1' : '0.52'"
            (click)="selectUnit(sheet.unitNumber)"
          >
            <app-cielo-art [name]="getUnitArt(sheet.unitNumber)" [width]="34" [height]="34"></app-cielo-art>
            <div class="ub-meta">
              <span class="ub-num">{{ isUnitUnlocked(sheet.unitNumber) ? '🔓' : '🔒' }} U{{ sheet.unitNumber }}</span>
              <span class="ub-short">{{ isUnitUnlocked(sheet.unitNumber) ? sheet.shortTitle : 'Bloqueada' }}</span>
            </div>
          </button>
        </div>

        <div class="cielo-lavender-card no-print" *ngIf="lockedSheetMessage" style="padding: 14px 20px; background: #ffe4e6; border: 1.5px solid #f43f5e; display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #881337; font-size: 0.9rem;">{{ lockedSheetMessage }}</strong>
          <button class="cielo-btn-purple" (click)="lockedSheetMessage = ''">Entendido ♡</button>
        </div>

        <!-- MODO A: 2 COLUMNAS (LISTA DE FÓRMULAS + STICKY NOTE CREMA) -->
        <div class="cielo-dark-panel machete-stage" id="printable-sheet" *ngIf="currentSheet as s">
          <div *ngIf="macheteTab === 'formulas'" class="machete-two-col">
            <div class="topic-list-col">
              <div class="tlc-head">{{ s.title }}</div>
              <button
                *ngFor="let f of s.formulas; let i = index"
                class="topic-row-btn"
                [class.active]="selectedFormulaIndex === i"
                (click)="selectedFormulaIndex = i"
              >
                <span class="topic-dot"></span>
                <span class="topic-name">{{ f.name }}</span>
                <span class="topic-si">{{ f.siUnits }}</span>
              </button>
            </div>

            <div class="sticky-note-col" *ngIf="s.formulas[selectedFormulaIndex] || s.formulas[0] as f">
              <div class="sticky-note-card">
                <div class="sticky-tape"></div>
                <div class="snc-header">
                  <strong>{{ f.name }}</strong>
                  <span class="snc-si">SI: {{ f.siUnits }}</span>
                </div>
                <div class="snc-katex" [innerHTML]="renderMath(f.latex, true)"></div>
                <p class="snc-interp">{{ f.interpretation }}</p>
                <div class="snc-validity">
                  <strong>✅ Condiciones de validez:</strong>
                  <ul>
                    <li *ngFor="let c of f.conditionsOfValidity">{{ c }}</li>
                  </ul>
                </div>
                <div class="snc-trap">
                  <strong>⚠️ Trampa Mortal:</strong> {{ f.mortalTrap }}
                </div>
              </div>
            </div>
          </div>

          <!-- MODO B: REGLAS DE PIZARRÓN Y PRINCIPIOS -->
          <div *ngIf="macheteTab === 'reglas'" class="reglas-stage">
            <div class="principles-box">
              <div class="pb-header">
                <span class="pb-badge">⚡ PRINCIPIOS FÍSICOS INNEGOCIABLES DE LA UNIDAD {{ s.unitNumber }}</span>
              </div>
              <ul>
                <li *ngFor="let p of s.corePrinciples">{{ p }}</li>
              </ul>
            </div>

            <div class="bottom-two-cols">
              <div class="chalkboard-diagram-box">
                <div class="cb-tag">🖍️ PIZARRÓN OBLIGATORIO DE DEFENSA ORAL</div>
                <h3>¿Qué tenés que dibujar siempre en esta unidad?</h3>
                <p>{{ s.blackboardDiagramNote }}</p>
              </div>

              <div class="traps-box">
                <div class="tb-tag">🚫 ERRORES QUE ANULAN EL EXAMEN</div>
                <h3>Checklist Anti-Trampas Antes de Entregar</h3>
                <ul>
                  <li *ngFor="let t of s.topExamTraps">{{ t }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .machete-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: rgba(18, 21, 52, 0.9);
      border: 1px solid rgba(137, 87, 255, 0.3);
      border-radius: 18px;
      padding: 12px 18px;
    }
    .mtb-left {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .mtb-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
    }
    .mtb-tabs { display: flex; gap: 8px; }
    .mtb-tab {
      background: rgba(255, 255, 255, 0.06);
      color: #d7c6ff;
      border: 1px solid rgba(137, 87, 255, 0.3);
      border-radius: 99px;
      padding: 6px 16px;
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .mtb-tab.active {
      background: #8957FF;
      color: #ffffff;
      border-color: transparent;
    }
    .machete-stage {
      padding: 22px;
    }
    .machete-two-col {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 960px) {
      .machete-two-col { grid-template-columns: 1fr; }
    }
    .topic-list-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tlc-head {
      font-family: 'Baloo 2', sans-serif;
      color: #ffd166;
      font-weight: 800;
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
    .topic-row-btn {
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
      transition: all 0.15s ease;
    }
    .topic-row-btn.active {
      background: rgba(137, 87, 255, 0.26);
      border-color: #8957FF;
      color: #ffffff;
    }
    .topic-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #8957FF;
      flex-shrink: 0;
    }
    .topic-name { font-weight: 800; font-size: 0.92rem; flex: 1; }
    .topic-si { font-size: 0.74rem; color: #ffd166; font-weight: 700; }
    .sticky-note-col {
      display: flex;
      justify-content: center;
      padding: 12px 6px;
    }
    .sticky-note-card {
      position: relative;
      background: linear-gradient(145deg, #f4ead5 0%, #ede0c8 100%);
      color: #161332;
      border-radius: 18px;
      padding: 26px 28px;
      width: 100%;
      max-width: 660px;
      transform: rotate(-1.2deg);
      box-shadow: 0 20px 44px rgba(4, 5, 16, 0.65);
    }
    .sticky-note-card .snc-katex,
    .sticky-note-card .snc-katex *,
    .sticky-note-card .katex,
    .sticky-note-card .katex * {
      color: #161332 !important;
      font-size: 1.25em !important;
    }
    .sticky-tape {
      position: absolute;
      top: -11px;
      left: 50%;
      transform: translateX(-50%) rotate(2deg);
      width: 96px;
      height: 22px;
      background: rgba(137, 87, 255, 0.45);
      border-radius: 4px;
    }
    .snc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.25rem;
    }
    .snc-si {
      background: #8957FF;
      color: #ffffff;
      font-size: 0.78rem;
      padding: 3px 10px;
      border-radius: 99px;
      font-weight: 800;
    }
    .snc-katex {
      background: rgba(255, 255, 255, 0.65);
      border-radius: 14px;
      padding: 16px;
      text-align: center;
      margin-bottom: 12px;
    }
    .snc-interp {
      font-weight: 700;
      font-size: 0.96rem;
      margin: 0 0 10px 0;
    }
    .snc-validity ul { margin: 4px 0 10px 18px; padding: 0; font-size: 0.88rem; }
    .snc-trap {
      background: rgba(244, 63, 94, 0.14);
      border-left: 4px solid #f43f5e;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.86rem;
      font-weight: 700;
    }
    .reglas-stage { display: flex; flex-direction: column; gap: 16px; }
    .machete-wrapper {
      max-width: 1440px;
      margin: 0 auto 44px auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .print-top-btn {
      font-size: 0.84rem;
      padding: 8px 16px;
      margin-right: 10px;
    }

    .machete-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 780px) {
      .machete-hero { grid-template-columns: 1fr; text-align: center; }
      .mh-art { display: flex; justify-content: center; }
    }
    .mh-pill {
      display: inline-block;
      background: #8957FF;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 6px;
    }
    .mh-copy h1 {
      font-family: var(--font-display);
      font-size: 1.95rem;
      font-weight: 800;
      color: #191538;
      margin: 0 0 6px 0;
    }
    .mh-copy p {
      color: #362f63;
      font-weight: 700;
      font-size: 0.94rem;
      margin: 0;
    }

    /* TIRA DE 9 UNIDADES ILUSTRADAS */
    .unit-selector-strip {
      display: grid;
      grid-template-columns: repeat(9, minmax(0, 1fr));
      gap: 8px;
    }
    @media (max-width: 1120px) {
      .unit-selector-strip { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @media (max-width: 620px) {
      .unit-selector-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .u-btn {
      background: linear-gradient(180deg, #252b5c 0%, #191e45 100%);
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      border-radius: 14px;
      padding: 7px 8px;
      min-width: 0;
      overflow: hidden;
      color: #e4ddff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: left;
      box-shadow: 0 4px 0 #10132e;
      transition: all 0.18s ease;
    }
    .u-btn:hover {
      transform: translateY(-2px);
      border-color: #a992ff;
    }
    .u-btn.active {
      background: linear-gradient(180deg, #efeaff 0%, #d9cbff 100%);
      border-color: #ffffff;
      color: #191538;
      box-shadow: 0 5px 0 #5b3ec8;
    }
    .ub-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .ub-num {
      font-size: 0.68rem;
      font-weight: 900;
      color: #b8abeb;
    }
    .u-btn.active .ub-num { color: #5b3ec8; }
    .ub-short {
      font-family: var(--font-display);
      font-size: 0.82rem;
      font-weight: 800;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* CONTENEDOR PRINCIPAL DE LA HOJA A4 */
    .a4-sheet {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .a4-header-card {
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .chip-parcial {
      display: inline-block;
      background: #191538;
      color: #fde047;
      font-size: 0.74rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 8px;
    }
    .a4-title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 800;
      color: #191538;
      margin: 0;
    }
    .ah-art {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .a4-badge {
      background: #8957FF;
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 99px;
    }

    /* PRINCIPIOS FÍSICOS */
    .principles-box {
      background: linear-gradient(180deg, #272d61 0%, #1c2049 100%);
      border: 2.5px solid #6b72b5;
      border-radius: 20px;
      padding: 18px 22px;
    }
    .pb-badge {
      display: inline-block;
      background: #fde047;
      color: #191538;
      font-weight: 900;
      font-size: 0.76rem;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 10px;
    }
    .principles-box ul {
      margin: 0;
      padding-left: 20px;
      color: #f3efff;
      font-weight: 700;
      font-size: 0.92rem;
      line-height: 1.6;
    }

    /* TARJETAS DE FÓRMULAS LAVANDA */
    .formulas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 16px;
    }
    .formula-sheet-card {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
    }
    .fsc-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-family: var(--font-display);
      font-size: 1.12rem;
      font-weight: 800;
      color: #191538;
    }
    .fsc-unit {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 800;
      color: #fde047;
      background: #191538;
      padding: 4px 10px;
      border-radius: 99px;
      white-space: nowrap;
    }
    .formula-katex-stage {
      background: #191538;
      color: #ffffff;
      border: 2.5px solid #8957FF;
      border-radius: 16px;
      padding: 14px 12px;
      text-align: center;
      overflow-x: auto;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.45);
    }
    .fsc-interp {
      font-size: 0.9rem;
      font-weight: 700;
      color: #2c2550;
      margin: 0;
      line-height: 1.5;
    }
    .fsc-validity {
      font-size: 0.83rem;
      font-weight: 700;
      color: #064e3b;
      background: #d1fae5;
      border: 2px solid #10b981;
      padding: 10px 14px;
      border-radius: 14px;
    }
    .fsc-validity ul {
      margin: 4px 0 0 0;
      padding-left: 18px;
    }
    .fsc-trap {
      font-size: 0.83rem;
      font-weight: 700;
      color: #881337;
      background: #ffe4e6;
      border: 2px solid #f43f5e;
      padding: 10px 14px;
      border-radius: 14px;
    }

    /* PIZARRÓN UNIVERSITARIO Y TRAMPAS */
    .bottom-two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    @media (max-width: 780px) {
      .bottom-two-cols { grid-template-columns: 1fr; }
    }
    .chalkboard-diagram-box {
      background: linear-gradient(180deg, #1b4332 0%, #123024 100%);
      border: 7px solid #d97706;
      border-radius: 20px;
      padding: 18px 20px;
      box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.45), 0 7px 0 #10132e;
    }
    .cb-tag {
      display: inline-block;
      background: rgba(253, 224, 71, 0.2);
      border: 1.5px solid #fde047;
      color: #fde047;
      font-weight: 900;
      font-size: 0.72rem;
      padding: 3px 10px;
      border-radius: 99px;
      margin-bottom: 8px;
    }
    .chalkboard-diagram-box h3 {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: #ffffff;
      margin: 0 0 8px 0;
    }
    .chalkboard-diagram-box p {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 700;
      color: #ecfdf5;
      line-height: 1.55;
    }

    .traps-box {
      background: linear-gradient(180deg, #3b1c38 0%, #271329 100%);
      border: 3px solid #fb7185;
      border-radius: 20px;
      padding: 18px 20px;
      box-shadow: 0 7px 0 #10132e;
    }
    .tb-tag {
      display: inline-block;
      background: #fb7185;
      color: #191538;
      font-weight: 900;
      font-size: 0.72rem;
      padding: 3px 10px;
      border-radius: 99px;
      margin-bottom: 8px;
    }
    .traps-box h3 {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: #ffe4e6;
      margin: 0 0 8px 0;
    }
    .traps-box ul {
      margin: 0;
      padding-left: 18px;
      font-size: 0.88rem;
      font-weight: 700;
      color: #fecdd3;
      line-height: 1.55;
    }

    @media print {
      .no-print { display: none !important; }
      .a4-sheet {
        background: #ffffff !important;
        color: #000000 !important;
        box-shadow: none !important;
        border: 1px solid #000 !important;
      }
    }
  `]
})
export class MachetePage implements OnInit {
  selectedUnit = 1;
  highestUnlockedUnit = 1;
  lockedSheetMessage = '';
  macheteTab: 'formulas' | 'reglas' = 'formulas';
  selectedFormulaIndex = 0;
  allSheets: UnitCheatsheet[] = CATEDRA_CHEATSHEETS;

  constructor(
    private katex: KatexRenderService,
    private api: Fisica2ApiService
  ) {}

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedUnit > this.highestUnlockedUnit) {
        this.selectedUnit = this.highestUnlockedUnit;
      }
    });
  }

  isUnitUnlocked(unitNum: number): boolean {
    return unitNum <= this.highestUnlockedUnit;
  }

  selectUnit(unitNum: number) {
    if (!this.isUnitUnlocked(unitNum)) {
      this.lockedSheetMessage = `🔒 El formulario de la Unidad ${unitNum} está bloqueado. Completá la Unidad ${this.highestUnlockedUnit} al 100% primero.`;
      return;
    }
    this.lockedSheetMessage = '';
    this.selectedUnit = unitNum;
    this.selectedFormulaIndex = 0;
  }

  get currentSheet(): UnitCheatsheet {
    return this.allSheets.find((s) => s.unitNumber === this.selectedUnit) || this.allSheets[0];
  }

  getUnitArt(unitNumber: number): CieloArtName {
    const map: Record<number, CieloArtName> = {
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

  renderMath(latex: string, displayMode = false): SafeHtml {
    return this.katex.renderMath(latex, displayMode);
  }

  printA4() {
    window.print();
  }
}
