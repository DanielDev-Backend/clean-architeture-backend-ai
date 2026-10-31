import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    if (error instanceof AppError){
        return res.status(error.statuscode).json({
            error: "Error!",
            message: error.message
        });
    }

    console.log("Erro Critico!");

    return res.status(500).json({
        error: "error",
        message: "Erro critico. nossa equipe já foi notificada!"
    });
}