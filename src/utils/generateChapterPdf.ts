import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { Chapter } from '../data/types';
import type { UIStrings } from '../i18n/ui';

export interface GeneratePdfOptions {
  chapter: Chapter;
  ui: UIStrings;
  onProgress?: (status: string) => void;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Converts an image URL to a base64 Data URL (avoids html2canvas CORS taint) */
export async function loadImageAsBase64(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      } catch (err) {
        console.warn('Could not export canvas to dataUrl (CORS):', err);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/** Builds a printable A4 PDF of a chapter (title, image, quote, all sections, concepts). */
export async function generateChapterPdf({ chapter, ui, onProgress }: GeneratePdfOptions): Promise<void> {
  const P = ui.pdf;
  onProgress?.(P.preparing);
  onProgress?.(P.image);
  const base64Image = await loadImageAsBase64(chapter.imageUrl);

  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    left: '-9999px',
    top: '0',
    width: '794px',
    backgroundColor: '#ffffff',
    color: '#1c1917',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    padding: '48px 56px',
    boxSizing: 'border-box',
    zIndex: '-9999',
  } as Partial<CSSStyleDeclaration>);

  const sectionsHtml = chapter.sections.length
    ? chapter.sections
        .map(
          (s) => `
      ${s.heading ? `<h2 style="font-family:'Cinzel',Georgia,serif;font-size:17px;color:#b45309;margin:22px 0 8px;">${esc(s.heading)}</h2>` : ''}
      ${s.paragraphs.map((p) => `<p style="margin:0 0 12px;text-align:justify;">${esc(p)}</p>`).join('')}`
        )
        .join('')
    : `<p style="margin:0 0 12px;">${esc(chapter.summary)}</p>`;

  container.innerHTML = `
    <div style="border-bottom:2px solid #e7e5e4;padding-bottom:16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:flex-end;">
      <div>
        <span style="background:#d97706;color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;padding:3px 8px;border-radius:4px;">LUMINA • 1826–2026</span>
        <span style="font-size:12px;color:#78716c;font-family:monospace;margin-left:8px;">${esc(chapter.era)}</span>
        <div style="font-size:11px;color:#a8a29e;margin-top:4px;">${esc(ui.brandTagline)}</div>
      </div>
      <div style="font-family:monospace;font-size:13px;font-weight:700;color:#d97706;">${P.chapterUpper} ${String(chapter.number).padStart(2, '0')}</div>
    </div>
    <h1 style="font-family:'Cinzel',Georgia,serif;font-size:26px;font-weight:800;margin:0 0 6px;line-height:1.25;">${esc(chapter.title)}</h1>
    <p style="font-family:'Newsreader',Georgia,serif;font-style:italic;font-size:16px;color:#b45309;margin:0 0 20px;">${esc(chapter.subtitle)}</p>
    ${
      base64Image
        ? `<div style="margin-bottom:22px;border-radius:8px;overflow:hidden;border:1px solid #e7e5e4;background:#f5f5f4;">
            <img src="${base64Image}" style="width:100%;max-height:340px;object-fit:${chapter.imageFit === 'contain' ? 'contain' : 'cover'};display:block;" />
            <div style="padding:8px 12px;font-size:11px;font-style:italic;color:#78716c;text-align:center;">${esc(chapter.imageCaption)}</div>
          </div>`
        : ''
    }
    ${
      chapter.keyQuote
        ? `<div style="margin:18px 0;padding:14px 20px;background:#fef3c7;border-left:4px solid #d97706;border-radius:6px;">
            <blockquote style="margin:0;font-family:'Newsreader',Georgia,serif;font-style:italic;font-size:14px;color:#78350f;">«${esc(chapter.keyQuote.text)}»</blockquote>
            <div style="margin-top:6px;font-size:11px;font-weight:700;color:#92400e;font-family:monospace;">— ${esc(chapter.keyQuote.author)}</div>
          </div>`
        : ''
    }
    <div style="font-family:'Newsreader',Georgia,serif;font-size:14px;line-height:1.7;color:#292524;">${sectionsHtml}</div>
    <div style="margin-top:26px;padding-top:14px;border-top:1px solid #e7e5e4;font-size:11px;line-height:1.9;">
      <strong style="color:#44403c;">${P.concepts}</strong> ${chapter.keyConcepts.map(esc).join(' · ')}<br/>
      <strong style="color:#44403c;">${P.figures}</strong> ${chapter.historicalFigures.map(esc).join(' · ')}
    </div>
    <div style="margin-top:28px;padding-top:12px;border-top:1px solid #e7e5e4;display:flex;justify-content:space-between;font-size:10px;color:#a8a29e;font-family:monospace;">
      <span>${esc(P.footer)}</span>
      <span>${P.printed} • ${new Date().toLocaleDateString(ui.locale)}</span>
    </div>`;

  document.body.appendChild(container);
  try {
    onProgress?.(P.pages);
    const canvas = await html2canvas(container, { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', logging: false });
    onProgress?.(P.compose);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    onProgress?.(P.download);
    pdf.save(`${P.filePrefix}-${chapter.number}-${chapter.id.replace(/[^a-zA-Z0-9_-]/g, '')}.pdf`);
  } finally {
    if (document.body.contains(container)) document.body.removeChild(container);
  }
}
