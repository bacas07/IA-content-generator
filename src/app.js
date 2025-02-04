import e from "express";
import bodyParser from "body-parser";
import { connectDB } from "../config/connect.js";
import { config } from "../config/middlewares.js";
import userRoutes from "./routes/userRoutes.js";
import parameterRoutes from "./routes/parameterRoutes.js";


const app = e();

app.use(bodyParser.json());
config(app);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello world' });
});

app.use('/user', userRoutes)
app.use('/parameter', parameterRoutes)

try {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log('--> Server running on port 3000');
        connectDB();
    })
} catch (e) {
    console.error('Error: ', e);
}