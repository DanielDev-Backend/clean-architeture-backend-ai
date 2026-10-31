import { NextFunction, Request, Response } from "express";
import { SecurityLogService } from "../services/SecurityLogService";
import { prisma } from "../config/prisma";

export class SecurityLogController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const {ipadress, action, risklevel, details} = req.body;

            const securityLogService = new SecurityLogService();

            const newLog = await securityLogService.execute({
                ipadress,
                action,
                risklevel,
                details
        });

            return res.status(201).json({
                message: "Log registrado com sucesso!",
                details: newLog
            });
        }

        catch(error: any){
            return res.status(400).json({
                message: "Erro ao registrar Log!",
                error: error.message
            });
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const logs = await prisma.securityLog.findMany({
                orderBy: {createdat: "desc"}
            });
            return res.status(200).json(logs)
        }

        catch(error: any){
            console.error("Error ao listar logs: ", error);
            return res.status(400).json({
                error: "Erro interno ao buscar logs de segurança!"
            });
        }
    }
}