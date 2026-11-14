/*
 * Build 72 (speed): jsPDF (450 KB) was part of every page's script although it is only needed when a visitor presses
 * a PDF download. It now loads on that first press. frPdf() resolves to the jsPDF class, with the super admin's
 * replaced-PDF rule (app/cms.jsx cmsPdfPatch) applied once.
 */
import { cmsPdfPatch } from './cms.jsx';

let frPdfP = null;
function frPdf() {
  if (!frPdfP)
    frPdfP = import('jspdf').then((m) => cmsPdfPatch(m.jsPDF)).catch((e) => {
      frPdfP = null;
      throw new Error("The PDF tool did not load. Please check the connection and try again.");
    });
  return frPdfP;
}

export { frPdf };
