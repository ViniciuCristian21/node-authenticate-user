import express from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';


export const routes = express.Router();

routes.post("/new-user", new CreateUserController().handle);
routes.post("/login", new AuthenticateUserController().handle);
routes.get("/all-users", ensureAuthenticated, new GetAllUsersController().handle)