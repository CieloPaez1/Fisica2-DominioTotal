# ⚛️ Física 2 — Dominio Total (`fisica2-enterprise`)

Plataforma educativa interactiva e ilustrada (**Cartoon Science Studio — "¡Hola Cielo! ♡"**) para el dominio integral de **Física 2 (Electromagnetismo — Unidades 1 a 9, Cátedra UNdeC)**.

---

## 🏗️ Arquitectura Tecnológica

### Backend (`/backend` — Puerto `8080`)
- **Java 21 + Spring Boot 3.2** (Arquitectura Hexagonal: `domain`, `application`, `infrastructure`).
- **H2 Database** persistente para seguimiento de progreso ponderado por unidad y registro SQL del cuaderno inteligente de errores.
- **Apache PDFBox 3.0.1** para indexación, búsqueda y extracción de texto página por página de los **45 PDFs oficiales de la cátedra**.

### Frontend (`/frontend` — Puerto `8100`)
- **Angular 18 + Ionic 8 Standalone** con sistema de diseño **Cartoon Science Studio**.
- **KaTeX 0.16** para renderizado matemático de ecuaciones diferenciales e integrales de electromagnetismo.
- **Ilustraciones SVG Cartoon Propias (`<app-cielo-art>`)** y simuladores interactivos vectoriales en SVG.

---

## ✨ Módulos Incluidos

1. **Dashboard Ilustrado (`/home`)**: Progreso general, acceso a las 9 unidades ilustradas, herramientas de estudio, desafíos y simulación de dipolo en vivo.
2. **Unidades 1 a 9 (`/units/:id`)**:
   - **Teoría Visual (`?section=teoria`)**: Teoría de los 11 puntos, demostraciones y cápsulas de examen.
   - **Resolución en Pizarrón (`?section=pizarron`)**: Pizarrón verde universitario paso a paso.
   - **Laboratorio Gráfico (`?section=laboratorio`)**: Simuladores vectoriales interactivos (Coulomb, Gauss, Potencial, Capacitores, Kirchhoff/RC, Ciclotrón, Biot-Savart/Ampère, Faraday-Lenz y Fasores RLC).
   - **Práctico Guiado (`?section=practica`)**: Ejercicios oficiales de TP resueltos en los 6 pasos de la cátedra.
   - **Multiple Choice 7 Niveles (`?section=mcq`)**: 63 preguntas clasificadas desde nivel `Fácil` hasta `Coloquio`.
3. **Tribunal Oral (`/tribunal`)**: Simulador de defensa oral con personajes ilustrados (Profesora Titular y JTP), dictado por voz y rúbrica de 5 ejes para las 9 unidades.
4. **Flashcards & Muerte Súbita 90s (`/speed-drill`)**: Mazo de tarjetas volteables ilustradas y modo arcade de 90 segundos.
5. **Simuladores y Calculadora de Límites (`/limits`)**: Trazador cartesiano en tiempo real de asíntotas, puntos críticos y límites físicos ($z \to 0$, $z \to \infty$, $t \to \infty$, $\omega = \omega_0$).
6. **Traductor de Fórmulas & Machete Legal A4 (`/machete`)**: Fórmulas traducidas al español, unidades SI, condiciones de validez, trampas mortales y hoja imprimible A4.
7. **Mi Progreso, Calendario, Radar y Mis Errores (`/errors`)**: Medidores circulares, radar hexagonal de 6 competencias, calendario interactivo y cuaderno inteligente de 11 categorías de error.
8. **Biblioteca Digital de 45 PDFs (`/pdfs`)**: Estantería ilustrada con lector integrado Apache PDFBox.
9. **Estudio de Podcasts (`/podcasts`)**: 9 episodios narrados de 3 minutos con control de velocidad de voz.
10. **Mapa Conceptual Cósmico (`/mapa`)**: Constelación interactiva de relaciones entre las 9 unidades.

---

## 🚀 Ejecución Local

### 1. Iniciar Backend (Spring Boot — Puerto 8080)
```bash
cd backend
mvn spring-boot:run
```

### 2. Iniciar Frontend (Angular + Ionic — Puerto 8100)
```bash
cd frontend
npm install
npx ng serve --port 8100
```
Luego abrí `http://localhost:8100` en el navegador.
