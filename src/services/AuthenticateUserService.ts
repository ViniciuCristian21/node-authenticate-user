import prismaCliente from "../prisma";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import "dotenv/config";
interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest){

        // Pegar o usuario por email no banco
        const user = await prismaCliente.user.findFirst({
            where: {
                email
            }
        })
        // verificar se este email ja foi cadastrado!
        if (!user) {
            throw new Error("Email/Password Incorrect")
        }
        // Validação da senha
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password Incorrect")
        }
        // Fazendo token para validação
        const token  = sign(
            {
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService };