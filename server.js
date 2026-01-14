import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Routes
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Middleware
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 9002;

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `process ID ${process.pid}: server running on PORT ${PORT} in ${process.env.NODE_ENV || 'development'} mode`
  );
});

