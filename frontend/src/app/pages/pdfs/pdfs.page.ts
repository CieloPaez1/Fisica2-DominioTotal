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
             1. BANNER LAVANDA ILUSTRADO DE LA ESTANTERÍA DIGITAL
             ================================================================ -->
        <div class="cielo-hero-banner shelf-hero">
          <app-cielo-art name="tool-book" [width]="115" [height]="98"></app-cielo-art>
          <div class="sh-copy">
            <div class="sh-badges">
              <span class="pill-purple">📚 ESTANTERÍA DIGITAL DE LA CÁTEDRA UNdeC</span>
              <span class="pill-gold">★ {{ allPdfs.length }} LIBROS, APUNTES Y TPs</span>
            </div>
            <h1>Biblioteca Ilustrada de Física 2 ♡</h1>
            <p>
              Explorá los apuntes teóricos oficiales (Prof. Ing. Chade Vergara), diapositivas (Ing. Tejada Barrantes) y Trabajos Prácticos TP N°1 a TP N°7. Abrí cualquier tomo para leer sus páginas o subí nuevos exámenes.
            </p>
          </div>
          <div class="sh-upload">
            <label class="cielo-btn-purple" style="display: inline-block;">
              <span>📤 + Subir Nuevo PDF</span>
              <input type="file" accept=".pdf" (change)="onFileSelected($event)" hidden />
            </label>
          </div>
        </div>

        <div *ngIf="uploadSuccessMessage" class="cielo-lavender-card upload-toast">
          <strong>✅ {{ uploadSuccessMessage }}</strong>
          <button class="close-btn" (click)="uploadSuccessMessage = null">✕</button>
        </div>

        <!-- PANEL DE EXPANSIÓN AUTOMÁTICA DE CONOCIMIENTO (PDFs, LIBROS Y TPs NUEVOS) -->
        <div class="cielo-lavender-card" style="padding: 18px 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="pill-purple">🧠 MOTOR DE EXPANSIÓN AUTOMÁTICA DE CONOCIMIENTO</span>
              <h2 style="font-family: 'Baloo 2', sans-serif; font-size: 1.35rem; color: #191538; margin: 6px 0 2px 0;">
                Cada PDF, Libro o Trabajo Práctico que agregues actualiza automáticamente Teoría y Práctica ♡
              </h2>
              <p style="margin: 0; font-size: 0.88rem; font-weight: 700; color: #2b2354;">
                Actualmente tenés <strong>{{ dynamicTheoryCount }} temas teóricos nuevos</strong> y <strong>{{ dynamicExercisesCount }} prácticos nuevos</strong> incorporados dinámicamente a las unidades.
              </p>
            </div>
            <button class="cielo-btn-purple" (click)="showManualIngestForm = !showManualIngestForm">
              {{ showManualIngestForm ? '▲ Ocultar Panel' : '➕ Pegar Apunte / Libro / Trabajo Práctico Nuevo' }}
            </button>
          </div>

          <div *ngIf="showManualIngestForm" style="margin-top: 14px; display: flex; flex-direction: column; gap: 10px; border-top: 2px dashed rgba(25,21,56,0.2); padding-top: 14px;">
            <div style="display: grid; grid-template-columns: 1fr 220px; gap: 10px;">
              <input
                type="text"
                [(ngModel)]="manualDocTitle"
                placeholder="Título del Libro, Apunte o Trabajo Práctico (ej: Sears Zemansky Cap. 24 Capacitores)..."
                style="background: #fff; border: 2.5px solid #191538; border-radius: 12px; padding: 10px 14px; font-weight: 800; color: #191538;"
              />
              <select
                [(ngModel)]="manualDocUnit"
                style="background: #fff; border: 2.5px solid #191538; border-radius: 12px; padding: 10px 12px; font-weight: 800; color: #191538;"
              >
                <option [ngValue]="0">Auto-detectar Unidad (1 a 9)</option>
                <option *ngFor="let uNum of [1,2,3,4,5,6,7,8,9]" [ngValue]="uNum">Unidad {{ uNum }}</option>
              </select>
            </div>
            <textarea
              [(ngModel)]="manualDocContent"
              rows="4"
              placeholder="Pegá acá el texto teórico del libro, fórmulas o enunciados del Trabajo Práctico nuevo para que la plataforma lo agregue a Teoría Visual y a Práctico Guiado..."
              style="background: #fff; border: 2.5px solid #191538; border-radius: 14px; padding: 12px 14px; font-weight: 700; color: #191538;"
            ></textarea>
            <div style="display: flex; justify-content: flex-end;">
              <button class="cielo-btn-purple" (click)="ingestManualText()">
                ⚡ Incorporar Conocimiento a Teoría y Práctica de la Unidad
              </button>
            </div>
          </div>
        </div>

        <!-- ================================================================
             2. BUSCADOR Y ESTANTES POR UNIDAD Y TIPO DE MATERIAL
             ================================================================ -->
        <div class="cielo-dark-panel shelf-filters">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="🔍 Buscar tomo, apunte, Trabajo Práctico o palabra clave..."
            class="shelf-search"
          />

          <div class="shelf-tabs-row">
            <div class="shelf-group">
              <button class="shelf-pill" [class.active]="selectedCategory === 'all'" (click)="selectedCategory = 'all'">📚 Todos los Estantes</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'programa'" (click)="selectedCategory = 'programa'">🟨 Programa Oficial</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'teoria'" (click)="selectedCategory = 'teoria'">🟪 Tomos de Teoría</button>
              <button class="shelf-pill" [class.active]="selectedCategory === 'tp'" (click)="selectedCategory = 'tp'">🟦 Guías de TPs</button>
            </div>

            <div class="shelf-group">
              <button class="shelf-pill" [class.active]="selectedUnitFilter === 0" (click)="selectedUnitFilter = 0">Todas</button>
              <button
                *ngFor="let uNum of [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                class="shelf-pill"
                [class.active]="selectedUnitFilter === uNum"
                (click)="selectedUnitFilter = uNum"
              >
                U{{ uNum }}
              </button>
            </div>
          </div>
        </div>

        <!-- ================================================================
             3. LECTOR DE LIBRO ABIERTO (INSPECTOR PDFBOX)
             ================================================================ -->
        <div *ngIf="inspectedPdf" class="cielo-lavender-card reader-modal">
          <div class="rm-header">
            <div class="rm-title-row">
              <app-cielo-art name="tool-book" [width]="65" [height]="54"></app-cielo-art>
              <div>
                <span class="pill-purple">LECTOR DE CÁTEDRA PDFBOX • {{ inspectedPdf.totalPages }} PÁGINAS</span>
                <h2>{{ inspectedPdf.filename }}</h2>
              </div>
            </div>
            <div class="rm-actions">
              <a [href]="getRawPdfUrl(inspectedPdf.filename)" target="_blank" rel="noopener" class="cielo-btn-purple" style="text-decoration: none;">
                ↗ Abrir PDF Original
              </a>
              <button class="close-btn" (click)="inspectedPdf = null">✕ Cerrar</button>
            </div>
          </div>

          <div class="book-pages-scroll">
            <div class="book-page-sheet" *ngFor="let pageText of inspectedPdf.pages; let idx = index">
              <div class="bps-header">📖 PÁGINA {{ idx + 1 }} DE {{ inspectedPdf.totalPages }}</div>
              <pre class="bps-text">{{ pageText }}</pre>
            </div>
          </div>
        </div>

        <!-- ================================================================
             4. ESTANTERÍA DIGITAL ILUSTRADA CON PORTADAS 3D DE DOCUMENTOS
             ================================================================ -->
        <div class="bookshelf-grid">
          <div class="cielo-dark-panel book-volume-card" *ngFor="let pdf of filteredPdfs">
            <div class="bvc-main">
              <!-- PORTADA 3D ILUSTRADA SEGÚN CATEGORÍA -->
              <div class="book-3d-cover" [attr.data-cat]="pdf.category">
                <div class="book-spine"></div>
                <div class="book-front">
                  <span class="bf-badge">{{ pdf.category | uppercase }}</span>
                  <app-cielo-art
                    [name]="pdf.category === 'tp' ? 'challenge-target' : pdf.category === 'programa' ? 'bulb' : 'tool-book'"
                    [width]="54"
                    [height]="54"
                  ></app-cielo-art>
                  <span class="bf-units">U{{ (pdf.unitNumbers || [1])[0] }}</span>
                </div>
              </div>

              <!-- Ficha del Tomo -->
              <div class="bvc-info">
                <div class="bvc-meta">
                  <span class="bvc-size">{{ pdf.sizeKB || 200 }} KB</span>
                  <span class="bvc-u-pill" *ngFor="let u of (pdf.unitNumbers || []).slice(0, 4)">U{{ u }}</span>
                </div>
                <h3 class="bvc-title">{{ pdf.filename }}</h3>
                <p class="bvc-desc">{{ pdf.description }}</p>
                <div class="bvc-author">✍️ {{ pdf.authors || 'Cátedra Física 2 UNdeC' }}</div>
              </div>
            </div>

            <div class="bvc-actions">
              <button class="btn-read-book" (click)="inspectDocument(pdf.filename)">
                📖 Leer Páginas
              </button>
              <button class="btn-read-book" style="background: #fde047;" (click)="ingestExistingPdf(pdf)">
                ⚡ Sumar a Unidad
              </button>
              <a [href]="getRawPdfUrl(pdf.filename)" target="_blank" rel="noopener" class="btn-open-raw">
                ↗ PDF
              </a>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .library-wrapper {
      max-width: 1280px;
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
      border: 2px solid #1b1438;
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
      background: #7c5dfa;
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
  inspectedPdf: any = null;
  uploadSuccessMessage: string | null = null;
  showManualIngestForm = false;
  manualDocTitle = '';
  manualDocUnit = 0;
  manualDocContent = '';

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
    this.loadPdfs();
  }

  loadPdfs() {
    this.api.getPdfs().subscribe((list) => {
      this.allPdfs = list || [];
    });
  }

  get filteredPdfs(): PdfMetadataDto[] {
    return this.allPdfs.filter((p) => {
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
