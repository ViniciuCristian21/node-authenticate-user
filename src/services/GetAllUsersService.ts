import prismaCliente from "../prisma";


class GetAllUsersService {
    async execute(){
        // pegar todos usuarios
        const users = await prismaCliente.user.findMany({
            orderBy: {
                name: "asc"
            }
        });

        if(!users) {
            throw new Error("Users is empty");
        }

        return users;
        
    }
}

export { GetAllUsersService };