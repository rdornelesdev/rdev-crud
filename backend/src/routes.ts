import {Router} from 'express';

// Usuarios
import {UserController} from './controllers/users/UserController.js';

const router = Router();

// usuarios api 
router.post('/cadastro', new UserController().create);
router.get('/users', new UserController().getUsers);
router.get('/users/:id', new UserController().getUsersByID);
router.put('/users/:id', new UserController().updateUser);
router.delete('/users/:id', new UserController().deleteUser);


export { router };
