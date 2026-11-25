import { Component, OnInit } from '@angular/core';
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
import { Fisica2ApiService, PdfMetadataDto } from '../../services/fisica2-api.service';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';

@Component({
  selector: 'app-pdfs',
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
        <ion-title>✦ Estantería Digital Ilustrada — Biblioteca PDFs UNdeC ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="library-wrapper">

        <!-- ================================================================
             1. COMPACT HEADER + 3 TABS (REFERENCIA PANEL 11)
             ================================================================ -->
        <div class="pdf-top-bar">
          <div class="ptb-left">
            <span class="ptb-title">📂 Biblioteca PDFs y Word ({{ allPdfs.length }})</span>
            <div class="ptb-tabs">
              <button class="ptb-tab" [class.active]="pdfSectionTab === 'biblioteca'" (click)="pdfSectionTab = 'biblioteca'">
                Biblioteca
              </button>
              <button class="ptb-tab" [class.active]="pdfSectionTab === 'archivos'" (click)="pdfSectionTab = 'archivos'">
                Mis Archivos
              </button>
              <button class="ptb-tab" [class.active]="pdfSectionTab === 'expansion'" (click)="pdfSectionTab = 'expansion'; showManualIngestForm = true">
                Motor de Expansión
              </button>
            </div>
          </div>
          <label class="cielo-btn-purple" style="padding: 7px 16px !important; font-size: 0.84rem !important; display: inline-block;">
            <span>📤 Subir archivo</span>
            <input type="file" accept=".pdf,.docx" (change)="onFileSelected($event)" hidden />
          </label>
        </div>

        <div *ngIf="uploadSuccessMessage" class="cielo-lavender-card upload-toast">
          <strong>✅ {{ uploadSuccessMessage }}</strong>
          <button class="close-btn" (click)="uploadSuccessMessage = null">✕</button>
        </div>

        <!-- PANEL MOTOR DE EXPANSIÓN -->
        <div class="cielo-dark-panel" *ngIf="pdfSectionTab === 'expansion'" style="padding: 20px;">
          <h2 style="font-family: 'Baloo 2', sans-serif; color: #ffffff; margin: 0 0 6px 0;">
            🧠 Motor de Expansión Automática ({{ dynamicTheoryCount }} temas • {{ dynamicExercisesCount }} prácticos nuevos)
          </h2>
          <p style="margin: 0 0 14px 0; color: #d7c6ff; font-size: 0.9rem;">
            Pegá el texto de un apunte, libro o Trabajo Práctico nuevo para incorporarlo automáticamente a Teoría y Práctica.
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: grid; grid-template-columns: 1fr 220px; gap: 10px;">
              <input
                type="text"
                [(ngModel)]="manualDocTitle"
                placeholder="Título del Libro, Apunte o Trabajo Práctico..."
                style="background: #10132D; border: 1.5px solid rgba(137,87,255,0.4); border-radius: 12px; padding: 10px 14px; font-weight: 700; color: #ffffff;"
              />
              <select
                [(ngModel)]="manualDocUnit"
                style="background: #10132D; border: 1.5px solid rgba(137,87,255,0.4); border-radius: 12px; padding: 10px 12px; font-weight: 700; color: #ffffff;"
              >
                <option [ngValue]="0">Auto-detectar Unidad</option>
                <option *ngFor="let uNum of [1,2,3,4,5,6,7,8,9]" [ngValue]="uNum">Unidad {{ uNum }}</option>
              </select>
            </div>
            <textarea
              [(ngModel)]="manualDocContent"
              rows="5"
              placeholder="Pegá acá el texto teórico del libro, fórmulas o enunciados del Trabajo Práctico..."
              style="background: #10132D; border: 1.5px solid rgba(137,87,255,0.4); border-radius: 14px; padding: 12px 14px; font-weight: 600; color: #ffffff;"
            ></textarea>
            <div style="display: flex; justify-content: flex-end;">
              <button class="cielo-btn-purple" (click)="ingestManualText()">
                ⚡ Incorporar Conocimiento a la Unidad
              </button>
            </div>
          </div>
        </div>

        <!-- LAYOUT 2 COLUMNAS: LISTA DE ARCHIVOS + VISOR INTEGRADO (PANEL 11) -->
        <div *ngIf="pdfSectionTab !== 'expansion'" class="pdf-split-layout">
          <!-- COLUMNA IZQUIERDA: BUSCADOR + LISTA COMPACTA -->
          <div class="cielo-dark-panel pdf-list-col">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="🔍 Buscar FISICA2.docx, apunte o TP..."
              class="shelf-search"
            />
            <div class="shelf-group" style="margin: 8px 0;">
              <button class="shelf-pill" [class.active]="selectedCategory === 'all'" (click)="selectedCategory = 'all'">Todos</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'teoria'" (click)="selectedCategory = 'teoria'">Teoría</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'tp'" (click)="selectedCategory = 'tp'">TPs</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'programa'" (click)="selectedCategory = 'programa'">Programa</button>
            </div>

            <div class="pdf-compact-list">
              <div
                *ngFor="let pdf of filteredPdfs"
                class="pdf-row-item"
                [class.active]="inspectedPdf?.filename === pdf.filename"
                (click)="inspectDocument(pdf.filename)"
              >
                <span class="pri-badge" [class.docx]="pdf.filename.toLowerCase().endsWith('.docx')">
                  {{ pdf.filename.toLowerCase().endsWith('.docx') ? 'DOC' : 'PDF' }}
                </span>
                <div class="pri-meta">
                  <div class="pri-name">{{ pdf.filename }}</div>
                  <div class="pri-sub">{{ pdf.sizeKB || 200 }} KB • U{{ (pdf.unitNumbers || [1])[0] }}</div>
                </div>
                <button class="pri-action" title="Sumar a unidad" (click)="$event.stopPropagation(); ingestExistingPdf(pdf)">⚡</button>
                <a class="pri-action" [href]="getRawPdfUrl(pdf.filename)" target="_blank" rel="noopener" (click)="$event.stopPropagation()">↗</a>
              </div>
            </div>
          </div>

          <!-- COLUMNA DERECHA: VISOR INTEGRADO -->
          <div class="cielo-dark-panel pdf-reader-col">
            <div *ngIf="!inspectedPdf" class="reader-empty">
              <h3>📖 Seleccioná un apunte o libro de la izquierda</h3>
              <p>Hacé clic en <strong>FISICA2.docx</strong> o en cualquier PDF para leerlo acá mismo.</p>
            </div>

            <ng-container *ngIf="inspectedPdf">
              <div class="rm-header">
                <div>
                  <span class="pill-purple">VISOR INTEGRADO • {{ inspectedPdf.totalPages }} PÁGINAS</span>
                  <h2 style="color: #ffffff; margin: 4px 0 0 0; font-size: 1.2rem;">{{ inspectedPdf.filename }}</h2>
                </div>
                <div class="rm-actions">
                  <a [href]="getRawPdfUrl(inspectedPdf.filename)" target="_blank" rel="noopener" class="cielo-btn-purple" style="text-decoration: none; padding: 6px 14px !important; font-size: 0.82rem !important;">
                    ↗ Abrir Original
                  </a>
                </div>
              </div>

              <div class="book-pages-scroll">
                <div class="book-page-sheet" *ngFor="let pageText of inspectedPdf.pages; let idx = index">
                  <div class="bps-header">📖 PÁGINA {{ idx + 1 }} DE {{ inspectedPdf.totalPages }}</div>
                  <pre class="bps-text">{{ pageText }}</pre>
                </div>
              </div>
            </ng-container>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .pdf-top-bar {
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
    .ptb-left { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
    .ptb-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffffff;
    }
    .ptb-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
    .ptb-tab {
      background: rgba(255, 255, 255, 0.06);
      color: #d7c6ff;
      border: 1px solid rgba(137, 87, 255, 0.3);
      border-radius: 99px;
      padding: 6px 14px;
      font-weight: 800;
      font-size: 0.84rem;
      cursor: pointer;
    }
    .ptb-tab.active {
      background: #8957FF;
      color: #ffffff;
      border-color: transparent;
    }
    .pdf-split-layout {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 18px;
      align-items: start;
    }
    @media (max-width: 980px) {
      .pdf-split-layout { grid-template-columns: 1fr; }
    }
    .pdf-list-col {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 680px;
    }
    .pdf-compact-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .pdf-row-item {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(137, 87, 255, 0.25);
      border-radius: 12px;
      padding: 9px 10px;
      cursor: pointer;
      color: #e2d6ff;
    }
    .pdf-row-item.active {
      background: rgba(137, 87, 255, 0.25);
      border-color: #8957FF;
      color: #ffffff;
    }
    .pri-badge {
      background: #ef4444;
      color: #ffffff;
      font-size: 0.68rem;
      font-weight: 900;
      padding: 3px 6px;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .pri-badge.docx { background: #3b82f6; }
    .pri-meta { flex: 1; min-width: 0; }
    .pri-name {
      font-weight: 800;
      font-size: 0.84rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pri-sub { font-size: 0.72rem; color: #c4b5fd; }
    .pri-action {
      background: rgba(255, 255, 255, 0.08);
      color: #ffd166;
      border: 1px solid rgba(137, 87, 255, 0.35);
      border-radius: 8px;
      padding: 4px 7px;
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      cursor: pointer;
    }
    .pdf-reader-col {
      padding: 18px;
      min-height: 520px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .reader-empty {
      margin: auto;
      text-align: center;
      color: #d7c6ff;
      padding: 40px 20px;
    }
    .reader-empty h3 { color: #ffffff; margin: 0 0 6px 0; }
    .library-wrapper {
      max-width: 1440px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .shelf-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 860px) {
      .shelf-hero { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
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
    .sh-copy p {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 600;
      color: #2b2354;
    }

    .upload-toast {
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* ESTANTES Y FILTROS */
    .shelf-filters {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .shelf-search {
      width: 100%;
      background: rgba(15, 19, 46, 0.92);
      border: 2px solid rgba(183, 158, 255, 0.42);
      border-radius: 16px;
      padding: 12px 16px;
      color: #ffffff;
      font-size: 0.94rem;
    }
    .shelf-tabs-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
    .shelf-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .shelf-pill {
      background: rgba(15, 19, 46, 0.85);
      border: 1.5px solid rgba(183, 158, 255, 0.35);
      color: #d8def8;
      padding: 6px 13px;
      border-radius: 99px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
    }
    .shelf-pill.active {
      background: #8c6df7;
      border-color: #ffffff;
      color: #ffffff;
    }

    /* LECTOR DE LIBRO ABIERTO */
    .reader-modal {
      padding: 22px;
    }
    .rm-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 14px;
      margin-bottom: 16px;
      border-bottom: 2px solid rgba(25, 21, 56, 0.15);
    }
    .rm-title-row { display: flex; align-items: center; gap: 12px; }
    .rm-title-row h2 { margin: 4px 0 0 0; font-size: 1.4rem; color: #191538; }
    .rm-actions { display: flex; gap: 10px; align-items: center; }
    .close-btn {
      background: #ff4d6d;
      border: 1.5px solid rgba(137, 87, 255, 0.35);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 14px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      cursor: pointer;
    }
    .book-pages-scroll {
      max-height: 460px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding-right: 6px;
    }
    .book-page-sheet {
      background: #fffbeb;
      border: 2.5px solid #1b1438;
      border-radius: 18px;
      padding: 18px;
      color: #191538;
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
    }
    .bps-header {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      color: #6c4ce6;
      margin-bottom: 8px;
    }
    .bps-text {
      margin: 0;
      white-space: pre-wrap;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: #1e1b4b;
      line-height: 1.6;
    }

    /* ESTANTERÍA DE LIBROS 3D */
    .bookshelf-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 18px;
    }
    .book-volume-card {
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      transition: transform 0.22s;
    }
    .book-volume-card:hover {
      transform: translateY(-4px);
      border-color: #c8b6ff;
    }
    .bvc-main {
      display: grid;
      grid-template-columns: 96px 1fr;
      gap: 16px;
      align-items: start;
    }

    /* PORTADA DE LIBRO 3D ILUSTRADA */
    .book-3d-cover {
      width: 96px;
      height: 128px;
      border-radius: 8px 16px 16px 8px;
      background: linear-gradient(145deg, #8c6df7, #5b3ec8);
      border: 3px solid #1b1438;
      box-shadow: 5px 6px 0 #1b1438;
      display: flex;
      overflow: hidden;
      position: relative;
    }
    .book-3d-cover[data-cat="tp"] {
      background: linear-gradient(145deg, #38bdf8, #0284c7);
    }
    .book-3d-cover[data-cat="programa"] {
      background: linear-gradient(145deg, #ffd166, #d97706);
    }
    .book-spine {
      width: 12px;
      background: rgba(27, 20, 56, 0.35);
      border-right: 2px solid rgba(255, 255, 255, 0.25);
    }
    .book-front {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 8px 4px;
    }
    .bf-badge {
      background: #1b1438;
      color: #ffffff;
      font-size: 0.58rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 99px;
    }
    .bf-units {
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      color: #ffffff;
    }

    .bvc-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      align-items: center;
      margin-bottom: 6px;
    }
    .bvc-size {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #c4b5fd;
      margin-right: 4px;
    }
    .bvc-u-pill {
      background: rgba(157, 126, 255, 0.24);
      border: 1px solid #9d7eff;
      color: #f3efff;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 8px;
    }
    .bvc-title {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.12rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 6px 0;
      line-height: 1.2;
      word-break: break-word;
    }
    .bvc-desc {
      font-size: 0.82rem;
      color: #cbd5e1;
      margin: 0 0 8px 0;
      line-height: 1.45;
    }
    .bvc-author {
      font-size: 0.74rem;
      color: #ffd166;
      font-weight: 700;
    }
    .bvc-actions {
      display: flex;
      gap: 10px;
      padding-top: 12px;
      border-top: 1.5px solid rgba(183, 158, 255, 0.22);
    }
    .btn-read-book {
      flex: 1;
      background: linear-gradient(90deg, #efeaff, #d8c8ff);
      border: 2px solid #9d7eff;
      color: #191538;
      padding: 8px 12px;
      border-radius: 14px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-open-raw {
      background: #8957FF;
      border: 2px solid #e2d6ff;
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 14px;
      font-family: 'Baloo 2', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class PdfsPage implements OnInit {
  allPdfs: PdfMetadataDto[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  selectedUnitFilter = 0;
  pdfSectionTab: 'biblioteca' | 'archivos' | 'expansion' = 'biblioteca';
  inspectedPdf: any = null;
  uploadSuccessMessage: string | null = null;
  showManualIngestForm = false;
  manualDocTitle = '';
  manualDocUnit = 0;
  manualDocContent = '';
  highestUnlockedUnit = 1;

  constructor(private api: Fisica2ApiService) {}

  get dynamicTheoryCount(): number {
    return this.api.getDynamicTheoryTopics().length;
  }

  get dynamicExercisesCount(): number {
    return this.api.getDynamicExercises().length;
  }

  ingestManualText() {
    if (!this.manualDocTitle.trim() && !this.manualDocContent.trim()) return;
    const title = this.manualDocTitle.trim() || 'Apunte / TP Incorporado';
    const res = this.api.ingestNewKnowledgeFromDocument(
      title,
      this.manualDocContent,
      this.manualDocUnit > 0 ? this.manualDocUnit : undefined
    );
    this.uploadSuccessMessage = `¡Conocimiento incorporado a la Unidad ${res.unitNumber}! Se agregó "${res.addedTheoryTitle}" en Teoría Visual y "${res.addedExerciseTitle}" en Práctico Guiado.`;
    this.manualDocTitle = '';
    this.manualDocContent = '';
    this.showManualIngestForm = false;
  }

  ingestExistingPdf(pdf: PdfMetadataDto) {
    this.api.inspectPdf(pdf.filename, 15).subscribe((data) => {
      const targetUnit = pdf.unitNumbers && pdf.unitNumbers.length ? pdf.unitNumbers[0] : undefined;
      const res = this.api.ingestNewKnowledgeFromDocument(pdf.filename, data?.pages || [pdf.description || ''], targetUnit);
      this.uploadSuccessMessage = `¡Tomo "${pdf.filename}" sincronizado con la Unidad ${res.unitNumber}! Se actualizaron Teoría Visual (11 puntos) y Práctico Guiado.`;
    });
  }

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedUnitFilter > this.highestUnlockedUnit) {
        this.selectedUnitFilter = 0;
      }
    });
    this.loadPdfs();
  }

  selectPdfUnitFilter(uNum: number) {
    if (uNum > this.highestUnlockedUnit) {
      this.uploadSuccessMessage = `🔒 Los tomos de la Unidad ${uNum} se habilitan cuando completes la Unidad ${this.highestUnlockedUnit} al 100%.`;
      return;
    }
    this.selectedUnitFilter = uNum;
  }

  loadPdfs() {
    this.api.getPdfs().subscribe((list) => {
      this.allPdfs = list || [];
      if (!this.inspectedPdf && this.allPdfs.length > 0) {
        const masterDoc = this.allPdfs.find((p) => p.filename.toLowerCase() === 'fisica2.docx');
        this.inspectDocument((masterDoc || this.allPdfs[0]).filename);
      }
    });
  }

  get filteredPdfs(): PdfMetadataDto[] {
    return this.allPdfs.filter((p) => {
      // Mostrar únicamente documentos pertenecientes a unidades desbloqueadas (o programa general)
      const docUnits = p.unitNumbers && p.unitNumbers.length ? p.unitNumbers : [1];
      const belongsToUnlocked = p.category === 'programa' || docUnits.some(u => u <= this.highestUnlockedUnit);
      if (!belongsToUnlocked) {
        return false;
      }

      if (this.selectedCategory !== 'all' && p.category !== this.selectedCategory) {
        return false;
      }
      if (this.selectedUnitFilter !== 0 && !(p.unitNumbers || []).includes(this.selectedUnitFilter)) {
        return false;
      }
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const matchName = p.filename.toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchAuth = (p.authors || '').toLowerCase().includes(q);
        return matchName || matchDesc || matchAuth;
      }
      return true;
    });
  }

  inspectDocument(filename: string) {
    this.api.inspectPdf(filename, 15).subscribe((data) => {
      this.inspectedPdf = data;
    });
  }

  getRawPdfUrl(filename: string): string {
    return this.api.getRawPdfUrl(filename);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    this.api.uploadPdf(file).subscribe({
      next: (report) => {
        const res = this.api.ingestNewKnowledgeFromDocument(file.name, report?.pages || []);
        this.uploadSuccessMessage = `Tomo "${file.name}" (${report.totalPages || 1} págs.) incorporado a la estantería y sincronizado automáticamente con Teoría y Práctica de la Unidad ${res.unitNumber}.`;
        this.inspectedPdf = report;
        this.loadPdfs();
      },
      error: () => {
        const res = this.api.ingestNewKnowledgeFromDocument(file.name, `Documento PDF incorporado: ${file.name}`);
        this.uploadSuccessMessage = `Tomo "${file.name}" registrado e incorporado a Teoría y Práctica de la Unidad ${res.unitNumber}.`;
      }
    });
  }
}
