import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CieloIllustrationComponent } from '../../components/cielo-illustration.component';
import { Fisica2ApiService } from '../../services/fisica2-api.service';

interface ConceptNode {
  id: number;
  label: string;
  art: string;
  category: 'Electroestática' | 'Circuitos' | 'Magnetismo' | 'Electromagnetismo';
  x: number;
  y: number;
  corePrinciple: string;
  keyEquation: string;
  connections: number[];
  prerequisites: string;
  masteryImpact: string;
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [
    CommonModule,
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
        <ion-title>✦ Constelación Conceptual Ilustrada — Unidades 1 a 9 ♡</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <div class="mapa-container">

        <!-- BANNER LAVANDA ILUSTRADO DEL MAPA -->
        <div class="cielo-hero-banner mapa-hero">
          <app-cielo-art name="maxwell-wave" [width]="110" [height]="100"></app-cielo-art>
          <div>
            <span class="pill-purple">🗺️ RED DEDUCTIVA DE LA MATERIA • DE COULOMB A MAXWELL</span>
            <h1>Constelación Conceptual de Física 2 ♡</h1>
            <p>
              Tocá cualquier planeta de la constelación para descubrir cómo se conectan las 9 unidades, sus prerrequisitos y qué te van a preguntar en el final.
            </p>
          </div>
        </div>

        <!-- GRAFO CONSTELACIÓN SVG -->
        <div class="cielo-dark-panel svg-wrapper">
          <svg viewBox="0 0 860 440" class="concept-svg">
            <g>
              <line
                *ngFor="let edge of activeEdges"
                [attr.x1]="edge.x1" [attr.y1]="edge.y1"
                [attr.x2]="edge.x2" [attr.y2]="edge.y2"
                [class.edge-highlighted]="edge.highlighted"
                class="concept-edge"
              />
            </g>

            <g
              *ngFor="let node of nodes"
              class="node-group"
              (click)="selectNode(node)"
              [class.node-selected]="selectedNode?.id === node.id"
            >
              <circle [attr.cx]="node.x" [attr.cy]="node.y" r="44" fill="rgba(157, 126, 255, 0.14)" *ngIf="selectedNode?.id === node.id" />
              <circle
                [attr.cx]="node.x"
                [attr.cy]="node.y"
                r="36"
                [attr.fill]="isUnitUnlocked(node.id) ? getNodeColor(node) : '#334155'"
                class="node-circle"
              />
              <text [attr.x]="node.x" [attr.y]="node.y - 4" class="node-num" text-anchor="middle">
                {{ isUnitUnlocked(node.id) ? ('U' + node.id) : ('🔒U' + node.id) }}
              </text>
              <text [attr.x]="node.x" [attr.y]="node.y + 14" class="node-short-label" text-anchor="middle">
                {{ isUnitUnlocked(node.id) ? node.label : 'Bloqueada' }}
              </text>
            </g>
          </svg>
        </div>

        <!-- TARJETA LAVANDA ILUSTRADA DEL NODO SELECCIONADO -->
        <div *ngIf="selectedNode as n" class="cielo-lavender-card detail-card">
          <div class="dc-split">
            <app-cielo-art [name]="n.art" [width]="115" [height]="115"></app-cielo-art>
            <div class="dc-body">
              <div class="dc-top">
                <span class="pill-purple">UNIDAD {{ n.id }} • {{ n.category | uppercase }}</span>
                <span class="dc-eq">{{ n.keyEquation }}</span>
              </div>
              <h3>Unidad {{ n.id }}: {{ getFullUnitTitle(n.id) }}</h3>
              <p class="dc-principle">{{ n.corePrinciple }}</p>
            </div>
          </div>

          <div class="dc-grid">
            <div class="dc-box">
              <strong>📐 Prerrequisitos que necesitás dominar:</strong>
              <p>{{ n.prerequisites }}</p>
            </div>
            <div class="dc-box">
              <strong>🎯 Cómo impacta en tu Examen Final:</strong>
              <p>{{ n.masteryImpact }}</p>
            </div>
          </div>

          <div class="dc-actions">
            <button class="cielo-btn-purple" (click)="goToUnit(n.id, 'teoria')">
              📖 Estudiar Teoría y Pizarrón U{{ n.id }} →
            </button>
            <button class="cielo-btn-purple" (click)="goToUnit(n.id, 'graficos')">
              🧪 Abrir Simulador de Laboratorio U{{ n.id }} →
            </button>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    .mapa-container {
      max-width: 1140px;
      margin: 0 auto 48px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .mapa-hero {
      padding: 20px 26px;
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 700px) {
      .mapa-hero { grid-template-columns: 1fr; justify-items: center; text-align: center; }
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
    .mapa-hero h1 { font-size: 1.95rem; color: #191538; margin: 0 0 4px 0; }
    .mapa-hero p { margin: 0; font-size: 0.92rem; font-weight: 600; color: #2b2354; }

    .svg-wrapper {
      padding: 18px;
      overflow-x: auto;
    }
    .concept-svg {
      width: 100%;
      min-width: 680px;
      height: auto;
      display: block;
    }
    .concept-edge {
      stroke: rgba(196, 173, 255, 0.35);
      stroke-width: 3;
      stroke-dasharray: 6 5;
      transition: all 0.3s;
    }
    .edge-highlighted {
      stroke: #ffd166;
      stroke-width: 4.5;
      stroke-dasharray: none;
    }
    .node-group { cursor: pointer; }
    .node-circle {
      stroke: #1b1438;
      stroke-width: 3.5;
      transition: all 0.25s;
    }
    .node-selected .node-circle {
      stroke: #ffd166;
      stroke-width: 4.5;
    }
    .node-num { fill: #ffffff; font-weight: 800; font-size: 16px; font-family: 'Baloo 2', sans-serif; }
    .node-short-label { fill: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; }

    .detail-card { padding: 24px; }
    .dc-split {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 18px;
      align-items: center;
      margin-bottom: 16px;
    }
    @media (max-width: 680px) {
      .dc-split { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    }
    .dc-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }
    .dc-eq {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      color: #ffd166;
      background: #1b224b;
      border: 2px solid #1b1438;
      padding: 4px 12px;
      border-radius: 10px;
    }
    .detail-card h3 { margin: 4px 0; color: #191538; font-size: 1.55rem; }
    .dc-principle { font-size: 0.94rem; font-weight: 600; color: #2b2354; margin: 0; }
    .dc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }
    @media (max-width: 700px) {
      .dc-grid { grid-template-columns: 1fr; }
    }
    .dc-box {
      background: rgba(255, 255, 255, 0.72);
      border: 2px solid #9d7eff;
      border-radius: 18px;
      padding: 14px;
      font-size: 0.88rem;
      color: #191538;
    }
    .dc-box strong { color: #5b3ec8; display: block; margin-bottom: 4px; }
    .dc-box p { margin: 0; font-weight: 600; line-height: 1.45; }
    .dc-actions { display: flex; flex-wrap: wrap; gap: 12px; }
  `]
})
export class MapaPage implements OnInit {
  nodes: ConceptNode[] = [
    { id: 1, label: 'Coulomb', art: 'bulb', category: 'Electroestática', x: 100, y: 110, corePrinciple: 'Interacción electrostática y principio de superposición vectorial del campo E.', keyEquation: 'E = ∫ (dq / 4πε₀r²) r̂', connections: [2, 3], prerequisites: 'Cálculo vectorial, descomposición trigonométrica e integrales.', masteryImpact: 'Base de todo el 1° Parcial (anillo, varilla, dipolo).' },
    { id: 2, label: 'Gauss', art: 'gauss-sphere', category: 'Electroestática', x: 270, y: 80, corePrinciple: 'Flujo del campo eléctrico a través de superficies cerradas y simetrías.', keyEquation: '∮ E · dA = Q_enc / ε₀', connections: [3, 4], prerequisites: 'Producto escalar, flujo y simetrías esférica/cilíndrica/plana.', masteryImpact: 'Tema fijo de pizarrón en coloquio (esfera, cilindro y conductores).' },
    { id: 3, label: 'Potencial', art: 'equipotential', category: 'Electroestática', x: 200, y: 240, corePrinciple: 'Carácter conservativo del campo electrostático, trabajo y gradiente.', keyEquation: 'V_B - V_A = -∫ E · dl  |  E = -∇V', connections: [4, 5], prerequisites: 'Integral de línea y derivadas parciales (gradiente).', masteryImpact: 'Continuidad del potencial y relación gráfica entre E(r) y V(r).' },
    { id: 4, label: 'Capacidad', art: 'capacitor', category: 'Electroestática', x: 380, y: 180, corePrinciple: 'Almacenamiento de energía en el campo eléctrico y polarización de dieléctricos.', keyEquation: 'C = κ·C₀  |  U = ½ C V²', connections: [5], prerequisites: 'Diferencia de potencial entre conductores y Gauss en dieléctricos.', masteryImpact: 'Comparación entre batería conectada (V=cte) y desconectada (Q=cte).' },
    { id: 5, label: 'Circuitos RC', art: 'resistor', category: 'Circuitos', x: 520, y: 180, corePrinciple: 'Conducción de corriente, Leyes de Kirchhoff y relajación exponencial RC.', keyEquation: 'q(t) = Cε(1 - e^(-t/RC))', connections: [6, 9], prerequisites: 'Conservación de carga/energía y ecuaciones diferenciales de 1° orden.', masteryImpact: 'Comportamiento del capacitor en t=0⁺ (corto) y t→∞ (abierto).' },
    { id: 6, label: 'Lorentz', art: 'magnet', category: 'Magnetismo', x: 380, y: 340, corePrinciple: 'Fuerza magnética perpendicular a la velocidad, ciclotrón y efecto Hall.', keyEquation: 'F_B = q(v × B)  |  R = mv / (qB)', connections: [7, 8], prerequisites: 'Producto vectorial en 3D y dinámica circular uniforme.', masteryImpact: 'Demostrar por qué el campo magnético no realiza trabajo mecánico (W=0).' },
    { id: 7, label: 'Biot/Ampère', art: 'compass-ampere', category: 'Magnetismo', x: 545, y: 340, corePrinciple: 'Corrientes como fuentes de campo magnético: Biot-Savart y circulación de Ampère.', keyEquation: '∮ B · dl = μ₀ I_enc', connections: [8], prerequisites: 'Regla de la mano derecha e integrales de línea cerradas.', masteryImpact: 'Deducción del campo interior de un solenoide y un toroide.' },
    { id: 8, label: 'Faraday-Lenz', art: 'coil', category: 'Electromagnetismo', x: 700, y: 270, corePrinciple: 'Inducción de fem por flujo magnético variable, Ley de Lenz y autoinductancia L.', keyEquation: 'ε = - dΦ_B / dt  |  ε_L = -L di/dt', connections: [9], prerequisites: 'Flujo magnético Φ_B = ∫ B·dA y regla de la cadena temporal.', masteryImpact: 'Justificación del signo menos por Conservación de la Energía.' },
    { id: 9, label: 'Maxwell/AC', art: 'maxwell-wave', category: 'Electromagnetismo', x: 750, y: 115, corePrinciple: 'Impedancia fasorial RLC, resonancia y las 4 Ecuaciones de Maxwell.', keyEquation: 'rot B = μ₀J + μ₀ε₀ ∂E/∂t', connections: [], prerequisites: 'Números complejos/fasores y leyes integrales de Gauss, Faraday y Ampère.', masteryImpact: 'Culminación del coloquio: corriente de desplazamiento y ondas EM.' }
  ];

  selectedNode: ConceptNode | null = null;
  highestUnlockedUnit = 1;
  lockedMapMsg = '';
  activeEdges: { x1: number; y1: number; x2: number; y2: number; highlighted: boolean }[] = [];

  constructor(
    private router: Router,
    private api: Fisica2ApiService
  ) {}

  ngOnInit() {
    this.api.getUnits().subscribe();
    this.api.units$.subscribe((units) => {
      this.highestUnlockedUnit = this.api.getHighestUnlockedUnitNumber(units);
      if (this.selectedNode && this.selectedNode.id > this.highestUnlockedUnit) {
        this.selectedNode = this.nodes[0];
      }
    });
    this.selectedNode = this.nodes[0];
    this.recomputeEdges();
  }

  isUnitUnlocked(unitId: number): boolean {
    return unitId <= this.highestUnlockedUnit;
  }

  selectNode(node: ConceptNode) {
    if (!this.isUnitUnlocked(node.id)) {
      this.lockedMapMsg = `🔒 La Unidad ${node.id} está bloqueada en la constelación hasta que completes la Unidad ${this.highestUnlockedUnit} al 100%.`;
      return;
    }
    this.lockedMapMsg = '';
    this.selectedNode = node;
    this.recomputeEdges();
  }

  getNodeColor(node: ConceptNode): string {
    switch (node.category) {
      case 'Electroestática': return '#7c5dfa';
      case 'Circuitos': return '#e09f3e';
      case 'Magnetismo': return '#ff4d6d';
      case 'Electromagnetismo': return '#3b82f6';
    }
  }

  getFullUnitTitle(id: number): string {
    const titles: Record<number, string> = {
      1: 'Carga Eléctrica, Ley de Coulomb y Campo Eléctrico',
      2: 'Ley de Gauss y Conductores en Equilibrio',
      3: 'Potencial Eléctrico, Gradiente y Energía',
      4: 'Capacidad, Condensadores y Dieléctricos',
      5: 'Corriente Eléctrica, Kirchhoff y Transitorio RC',
      6: 'Campo Magnético, Fuerza de Lorentz y Efecto Hall',
      7: 'Fuentes de Campo Magnético (Biot-Savart y Ampère)',
      8: 'Inducción Electromagnética (Faraday-Lenz e Inductancia)',
      9: 'Corriente Alterna, Resonancia RLC y Ecuaciones de Maxwell'
    };
    return titles[id] || `Unidad ${id}`;
  }

  goToUnit(unitId: number, tab: string = 'teoria') {
    this.router.navigate(['/units'], { queryParams: { u: unitId, tab } });
  }

  private recomputeEdges() {
    this.activeEdges = [];
    for (const node of this.nodes) {
      for (const targetId of node.connections) {
        const target = this.nodes.find(n => n.id === targetId);
        if (target) {
          const isHighlighted = (this.selectedNode?.id === node.id || this.selectedNode?.id === target.id);
          this.activeEdges.push({
            x1: node.x,
            y1: node.y,
            x2: target.x,
            y2: target.y,
            highlighted: isHighlighted
          });
        }
      }
    }
  }
}
