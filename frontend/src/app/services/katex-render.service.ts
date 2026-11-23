import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare global {
  interface Window {
    katex?: {
      renderToString: (tex: string, options?: { throwOnError?: boolean; displayMode?: boolean }) => string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class KatexRenderService {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Renderiza una expresión LaTeX o fórmula física simbólica con KaTeX.
   * Si contiene sintaxis ASCII clásica, la normaliza a LaTeX profesional.
   */
  renderMath(expression: string, displayMode = false): SafeHtml {
    if (!expression) return this.sanitizer.bypassSecurityTrustHtml('');

    const normalizedLatex = this.normalizeToLatex(expression);

    if (typeof window !== 'undefined' && window.katex) {
      try {
        const html = window.katex.renderToString(normalizedLatex, {
          throwOnError: false,
          displayMode
        });
        return this.sanitizer.bypassSecurityTrustHtml(html);
      } catch {
        // Fallback a formato tipográfico enriquecido
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.fallbackPrettyHtml(expression));
  }

  private normalizeToLatex(expr: string): string {
    // Si ya tiene comandos LaTeX explícitos (\frac, \vec, \oint, \int, \varepsilon), devolver directo
    if (expr.includes('\\frac') || expr.includes('\\vec') || expr.includes('\\oint') || expr.includes('\\varepsilon')) {
      return expr;
    }

    let tex = expr
      .replace(/∮/g, '\\oint ')
      .replace(/∫/g, '\\int ')
      .replace(/∑/g, '\\sum ')
      .replace(/∇/g, '\\nabla ')
      .replace(/Δ/g, '\\Delta ')
      .replace(/ε₀|eps0/g, '\\varepsilon_0')
      .replace(/μ₀|mu0/g, '\\mu_0')
      .replace(/ε/g, '\\mathcal{E}')
      .replace(/Φ_E|Phi_E/g, '\\Phi_E')
      .replace(/Φ_B|Phi_B/g, '\\Phi_B')
      .replace(/Φ/g, '\\Phi')
      .replace(/λ|lambda/g, '\\lambda')
      .replace(/σ|sigma/g, '\\sigma')
      .replace(/ρ|rho/g, '\\rho')
      .replace(/κ|kappa/g, '\\kappa')
      .replace(/τ|tau/g, '\\tau')
      .replace(/ω₀|omega_0/g, '\\omega_0')
      .replace(/ω|omega/g, '\\omega')
      .replace(/π|pi/g, '\\pi')
      .replace(/θ|theta/g, '\\theta')
      .replace(/φ|phi/g, '\\varphi')
      .replace(/√\(([^)]+)\)/g, '\\sqrt{$1}')
      .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
      .replace(/⇒/g, '\\Rightarrow ')
      .replace(/→/g, '\\rightarrow ')
      .replace(/≫/g, '\\gg ')
      .replace(/≪/g, '\\ll ')
      .replace(/≥/g, '\\ge ')
      .replace(/≤/g, '\\le ')
      .replace(/≠/g, '\\neq ')
      .replace(/⊥/g, '\\perp ')
      .replace(/∥/g, '\\parallel ')
      .replace(/×/g, '\\times ')
      .replace(/·/g, '\\cdot ');

    return tex;
  }

  private fallbackPrettyHtml(expr: string): string {
    return `<span class="font-mono" style="color: #7dd3fc; font-weight: 700;">${expr
      .replace(/eps0/g, 'ε₀')
      .replace(/mu0/g, 'μ₀')
      .replace(/Phi_E/g, 'Φ<sub>E</sub>')
      .replace(/Phi_B/g, 'Φ<sub>B</sub>')
      .replace(/->/g, '→')}</span>`;
  }
}
