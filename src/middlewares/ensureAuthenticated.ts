import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;
    
    console.log("[Verify] Verificando se veio token");
    if (!authToken) {
        return response.status(401).end();
    }
    // Remover a string barrer do token separado por espaço
    console.log("[Removing] Removendo barer");
    const [,token] = authToken.split(" ");

    // Validar o token e prosseguir
    try {
        console.log("[Validation] validando o token.");
        const { sub } = verify( token, process.env.JWT_SECRET) as IPayload;

        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }

}