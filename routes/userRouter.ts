import { UserController } from './../controllers';
import { Router, Request, Response } from 'express';
import { IUser } from '../interfaces/interface';

const router = Router();
const contoller = new UserController();

router.get('/getUsers', async (req: Request, res: Response) => {
    await contoller.getUsers(req,res)
});

router.get('/getAdmins', async (req: Request, res: Response) => {
    await contoller.getAdmins(req,res)
});

router.post('/createUser', async (req: Request<IUser>, res: Response) => {
    await contoller.createUser(req, res);
});

router.delete('/deleteUser/:id', async (req: Request, res: Response) => {
    await contoller.deleteUser(req,res);
});

router.put('/assignAdmin/:email', async (req: Request<IUser>, res: Response) => {
    await contoller.assignAdmin(req,res);
});

router.put('/assignUser/:email', async (req: Request<IUser>, res: Response) => {
    await contoller.assignUser(req,res);
});

export default router;