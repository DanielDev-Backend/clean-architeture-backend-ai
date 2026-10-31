import { Request, Response, NextFunction } from "express";

export function ErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Erro Capturado no Middleware global!", err.message);

    return res.status(500).json({
        error: "error!",
        message: "Erro interno no servidor!",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
}