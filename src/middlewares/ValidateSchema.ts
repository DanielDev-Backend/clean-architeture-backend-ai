import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError} from "zod/v3";

export const ValidateSchema = (schema: ZodTypeAny) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        }

        catch(error){

            console.error("ERRO CAPTURADO NO MIDDLEWARE:", error); 
            
            if (error instanceof ZodError){
                return res.status(400).json({
                    message: "Erro na validação dos dados de entrada!",
                    error: error.errors.map(err => ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                });
            }
        }

        return res.status(500).json({message: "Erro interno no validador!"});
    }
}