import { SecurityLogRepository } from "../repositories/SecurityLogRepository";
import { AiAnalysisService } from "./AiAnalysisService";

interface ICreateLogDto {
    ipadress: string,
    action: string,
    risklevel: string,
    details?: string
}

export class SecurityLogService {
    private securityLogRepository = new SecurityLogRepository();
    private aiAnalysisService = new  AiAnalysisService();

    public async execute(data: ICreateLogDto){
        const AiInsight = await this.aiAnalysisService.AnalyzeLogThreat(
            data.details || "Sem detalhes adicionais",
            data.action
        );

        const securityLog = await this.securityLogRepository.create({
            ipadress: data.ipadress,
            action: data.action,
            risklevel: data.risklevel,
            details: '${data.details} | IA Insight: ${aiInsight}'
        });

        return {
            message: "Log registrado e analisado pela IA com sucesso!",
            securityLog,
            AiInsight
        }
    }
}