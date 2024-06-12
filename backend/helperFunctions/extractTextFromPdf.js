import PDFParser from "pdf2json";

export const extractTextFromPdf = async (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((textObj) => {
          textObj.R.forEach((t) => {
            text += decodeURIComponent(t.T);
          });
        });
      });

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
};
