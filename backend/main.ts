import express from 'express';
import authRouter from './routes/authRouter';
import employeeRouter from "./routes/emplRouter";
import companyRouter from "./routes/companyRouter";
import securityRouter from "./routes/securityRouter";

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use("/api/empl", employeeRouter);
app.use("/api/company", companyRouter);
app.use("/api/security", securityRouter);

app.listen(3000, () => {
    console.log('⚡️ [server]: Server is running on port 3000');
});