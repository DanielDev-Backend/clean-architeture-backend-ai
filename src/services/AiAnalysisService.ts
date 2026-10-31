import { GoogleGenAI } from "@google/genai";

export class AiAnalysisService {
    private ai: GoogleGenAI;

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    public async AnalyzeLogThreat(details: string, action: string): Promise<string> {
        try {
            const prompt = `És um analista de cibersegurança sénior. Analisa o seguinte log de segurança e responde apenas com uma recomendação de mitigação curta e direta em uma frase, em Português.\n\nAção: ${action}\nDetalhes: ${details}`;

            const response = await this.ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: prompt,
            });

            if (response.text) {
                return response.text;
            }
        } catch (error: any) {
            console.warn("Aviso: Google Gemini com alta demanda (503). A utilizar o motor de contingência de segurança...");
        }

        
        return `Mitigação sugerida para '${action}': Isolar o endereço IP de origem, revogar sessões ativas e auditar os registos do painel administrativo imediatamente.`;
    }
}