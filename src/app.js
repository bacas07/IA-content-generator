import e from "express";
import bodyParser from "body-parser";
import { connectDB } from "../config/connect.js";
import { config } from "../config/middlewares.js";
import userRoutes from "./routes/userRoutes.js";
import parameterRoutes from "./routes/parameterRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import { verifyApiKey } from "./utils/auth.js";

const app = e();

app.use(bodyParser.json());
config(app);

app.get('/', verifyApiKey, (req, res) => {
    return res.status(200).json({ message: 'AI Content Generator API' });
});

app.use('/user', userRoutes);
app.use('/parameter', parameterRoutes);
app.use('/content', contentRouter);

try {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log('> Server running on port 3000');
        connectDB();
    })
} catch (e) {
    console.error('Error: ', e);
}