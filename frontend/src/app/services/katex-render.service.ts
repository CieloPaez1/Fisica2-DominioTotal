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
   * Renderiza una expresión LaTeX o fórmula física en formato tradicional y ordenado de libro.
   * - Si la cadena es texto descriptivo en español (ej: "F en Newton [N]; q en Coulomb [C]"),
   *   la formatea con tipografía limpia y legible sin aplastar los espacios en modo matemático.
   * - Si es una ecuación con barra "/" (ej: "F = k · |q₁ · q₂| / r²"), la convierte en
   *   una fracción tradicional apilada (\frac{numerador}{denominador}).
   */
  renderMath(expression: string, displayMode = false): SafeHtml {
    if (!expression) return this.sanitizer.bypassSecurityTrustHtml('');

    // Si es una frase explicativa en español con varias palabras largas y sin comandos LaTeX,
    // mostrarla con tipografía tradicional limpia y legible (evitando que KaTeX pegue las palabras).
    if (this.isDescriptiveProse(expression)) {
      return this.sanitizer.bypassSecurityTrustHtml(this.formatCleanTraditionalText(expression));
    }

    const normalizedLatex = this.normalizeToTraditionalLatex(expression);

    if (typeof window !== 'undefined' && window.katex) {
      try {
        const html = window.katex.renderToString(normalizedLatex, {
          throwOnError: false,
          displayMode
        });
        return this.sanitizer.bypassSecurityTrustHtml(html);
      } catch {
        // Fallback a formato tipográfico tradicional
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.formatCleanTraditionalText(expression));
  }

  private isDescriptiveProse(expr: string): boolean {
    if (expr.includes('\\frac') || expr.includes('\\int') || expr.includes('\\oint') || expr.includes('\\sqrt')) {
      return false;
    }
    // Detectar palabras descriptivas en español que no deben ir sueltas en math-mode
    const spanishWords = /\b(Newton|Coulomb|metro|metros|Faradio|Voltio|Ampere|Ohm|Tesla|Weber|Henry|Joule|donde|siendo|para|constante|unidad|espiras)\b/i;
    return spanishWords.test(expr);
  }

  private normalizeToTraditionalLatex(expr: string): string {
    // Si ya tiene comandos LaTeX explícitos (\frac, \vec, \oint, \int, \varepsilon), devolver directo
    if (expr.includes('\\frac') || expr.includes('\\vec') || expr.includes('\\oint') || expr.includes('\\varepsilon')) {
      return expr;
    }

    let tex = expr.trim();

    // Reemplazar subíndices y superíndices Unicode por sintaxis LaTeX limpia
    tex = tex
      .replace(/₀/g, '_0')
      .replace(/₁/g, '_1')
      .replace(/₂/g, '_2')
      .replace(/₃/g, '_3')
      .replace(/₄/g, '_4')
      .replace(/⁻¹²/g, '^{-12}')
      .replace(/⁻¹⁹/g, '^{-19}')
      .replace(/⁻³¹/g, '^{-31}')
      .replace(/⁻²⁷/g, '^{-27}')
      .replace(/⁻⁶/g, '^{-6}')
      .replace(/⁻⁹/g, '^{-9}')
      .replace(/⁻⁴/g, '^{-4}')
      .replace(/⁻³/g, '^{-3}')
      .replace(/⁻²/g, '^{-2}')
      .replace(/⁻¹/g, '^{-1}')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/⁴/g, '^4')
      .replace(/⁹/g, '^9')
      .replace(/⁶/g, '^6');

    // Convertir divisiones simples "LHS = NUM / DEN" en fracciones tradicionales \frac{NUM}{DEN}
    if (tex.includes('=') && tex.includes('/') && !tex.includes('\\frac')) {
      const eqParts = tex.split('=');
      if (eqParts.length === 2) {
        const lhs = eqParts[0].trim();
        const rhs = eqParts[1].trim();
        const slashParts = rhs.split('/');
        if (slashParts.length === 2) {
          const num = slashParts[0].trim().replace(/^\((.*)\)$/, '$1');
          const den = slashParts[1].trim().replace(/^\((.*)\)$/, '$1');
          tex = `${lhs} = \\frac{${num}}{${den}}`;
        }
      }
    }

    tex = tex
      .replace(/∮/g, '\\oint ')
      .replace(/∫/g, '\\int ')
      .replace(/∑/g, '\\sum ')
      .replace(/∇/g, '\\nabla ')
      .replace(/Δ/g, '\\Delta ')
      .replace(/ε_0|ε₀|eps0/g, '\\varepsilon_0')
      .replace(/μ_0|μ₀|mu0/g, '\\mu_0')
      .replace(/ε/g, '\\mathcal{E}')
      .replace(/Φ_E|Phi_E/g, '\\Phi_E')
      .replace(/Φ_B|Phi_B/g, '\\Phi_B')
      .replace(/Φ/g, '\\Phi')
      .replace(/λ|lambda/g, '\\lambda')
      .replace(/σ|sigma/g, '\\sigma')
      .replace(/ρ|rho/g, '\\rho')
      .replace(/κ|kappa/g, '\\kappa')
      .replace(/τ|tau/g, '\\tau')
      .replace(/ω_0|ω₀|omega_0/g, '\\omega_0')
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

  private formatCleanTraditionalText(expr: string): string {
    return `<span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.98rem; letter-spacing: 0.01em; line-height: 1.55;">${expr
      .replace(/eps0/g, 'ε₀')
      .replace(/mu0/g, 'μ₀')
      .replace(/Phi_E/g, 'Φ<sub>E</sub>')
      .replace(/Phi_B/g, 'Φ<sub>B</sub>')
      .replace(/->/g, '→')}</span>`;
  }
}
