import { prisma } from "../config/prisma";

interface ICreateLogRepositoryDTO {
    ipadress: string;
    action: string;
    risklevel: string;
    details?: string;
}

export class SecurityLogRepository {
    public async create(data: ICreateLogRepositoryDTO) {
        const log = await prisma.securityLog.create({
            data: {
                ipadress: data.ipadress,
                action: data.action,
                riskLevel: data.risklevel,
                details: data.details || ""
            }
        });

        return log;
    }
}