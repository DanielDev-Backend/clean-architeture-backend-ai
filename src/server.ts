
import express  from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/SecurityLogRoutes";
import { ErrorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./Swagger.json";

const app = express();

// Proteção de cabeçalhos HTTP com Helmet
app.use(helmet());
app.use(cors())

// Rate Limiting: Limita requisições excessivas por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {error: "Muitos pedidos efetuados a partir deste IP. por favor tente novamente!"}
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())
app.use(limiter)
app.use(router)

// Middleware global de erro!
app.use(ErrorHandler)

app.listen(3333, () => {
    console.log("Servidor corporativo em pleno funcionamento!")
});

