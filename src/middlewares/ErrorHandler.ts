import { ApiError } from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"
import express, { Application,Request, Response, NextFunction } from "express";


export class ErrorHandler {
    static handle = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        return res.status(statusCode).send({
            success: false,
            message: err.message
        });
    };
}