import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

export const config = (app) => {
    try {
        app.use(morgan('dev'));
        app.use(cors());
        app.use(helmet());
    } catch (e) {
        console.error('Error: ', e);
    }
}