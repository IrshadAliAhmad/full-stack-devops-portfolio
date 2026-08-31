
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
import messageRoutes from "./routes/message.routes.js";
import adminMessageRoutes from "./routes/adminMessageRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/messages", messageRoutes);
app.use("/api/admin/messages", adminMessageRoutes);


// Sirf ek baar /api prefix use karein
app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;