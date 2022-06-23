import prismaCliente from "../prisma";
import { hash } from 'bcryptjs';
interface IUser {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: IUser){
        // Validar email e senha
        if(!email) {
            return {error: "Email Invalid"}
        }
        if(!password) {
            return {error: "Password Invalid"}
        }

        // Verificar se ja existe este email cadastrado!
        const userAlreadyExists = await prismaCliente.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) {
            return {error: "User already exists"}
        }
        // Criptrografar o password
        const passwordHash = await hash(password, 8);
        
        // salvar usuario no banco!
        const User = await prismaCliente.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            }
        })

        return User;
    }
}

export { CreateUserService };