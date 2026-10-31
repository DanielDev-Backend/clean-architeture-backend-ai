
import {z} from "zod";

export const createSecurityLogSchema = z.object({
    ipadress: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {message: "O enderço ip é invalido"}),
    action: z.string().min(3, "Necessita de pelo menos 3 caracteres!"),
    risklevel: z.string().toUpperCase(),
    details: z.string().optional()
});