import { Request, Response } from 'express';
import { GetAllUsersService } from '../services/GetAllUsersService';

class GetAllUsersController {
    async handle(req: Request, res: Response) {
        const service = new GetAllUsersService();

        try {
            const users = await service.execute()
            return res.json(users)
        } catch (err) {
            console.log(err.message)
        }
    }
}

export { GetAllUsersController };