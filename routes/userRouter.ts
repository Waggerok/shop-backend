import { UserController } from './../controllers';
import { Router, Request, Response } from 'express';
import { IUser } from '../interfaces/interface';

const router = Router();
const userController = new UserController();

router.get('/getUsers', async (req: Request, res: Response) => {
    await userController.getUsers(req,res)
});

router.get('/getAdmins', async (req: Request, res: Response) => {
    await userController.getAdmins(req,res)
});

router.post('/createUser', async (req: Request<IUser>, res: Response) => {
    await userController.createUser(req, res);
});

router.delete('/deleteUser/:id', async (req: Request, res: Response) => {
    await userController.deleteUser(req,res);
});

router.put('/assignAdmin/:email', async (req: Request<IUser>, res: Response) => {
    await userController.assignAdmin(req,res);
});

router.put('/assignUser/:email', async (req: Request<IUser>, res: Response) => {
    await userController.assignUser(req,res);
});

export default router;