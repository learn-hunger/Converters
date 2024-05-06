import * as fs from 'fs';
import * as pdf from 'pdf-parse';

export async function extractTextFromPDF(pdfFilePath: string): Promise<string | never> {
    try {
        const pdfBuffer = fs.readFileSync(pdfFilePath);
        const data = await pdf.default(pdfBuffer);
        return data.text
    } catch (error: any) {
        throw error
    }
}
