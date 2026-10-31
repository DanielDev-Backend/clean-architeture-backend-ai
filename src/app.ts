import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { AppError } from "./errors/appError";
import SecurityLogRoutes from "./routes/SecurityLogRoutes";

class App{
    public app: Application;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    private middlewares(): void{
        this.app.use(express.json());
        this.app.use(cors());
    }

    private routes(): void{
        this.app.use("/funciona", (req: Request, res: Response) => {
            res.status(200).json({
               status: "Online! e Disponivel" 
            });
        });

        this.app.use("/test-1-error", (req: Request, res: Response) => {
            throw new AppError("Acesso negado! situação está sendo monitorada!", 403);
        });

        this.app.use(SecurityLogRoutes);
    }

    private errorHandling(): void{
        this.app.use(errorMiddleware);
    }
}

export default new App().app;
