import bodyParser from "body-parser";
import express, { Application,Request, Response } from "express";
import { ApiError, BadRequestError, NotFounderError } from "./utils/ApiError";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import config from "./config/config";
import connection from "./utils/database";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "Hello World!"
    });
})

app.use((req:Request)=>{
    throw new NotFounderError(req.path);
});

app.use(ErrorHandler.handle);

const PORT = config.appPort || 3000;

const startServer = async () => {
    try {
        await connection.sync();
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT} `);
        });
    }catch (error) {
     console.log(`Error connecting to database: ${error}`);
    }
};

startServer();
