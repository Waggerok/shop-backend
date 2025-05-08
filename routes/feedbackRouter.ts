import { FeedBackController } from "../controllers";
import { IFeedback } from "../interfaces/interface";
import { Router, Request, Response } from "express";

const router = Router();
const controller = new FeedBackController();

router.get('/getFeedbacks', async (req: Request, res : Response) => {
    await controller.getFeedBacks(req,res);
});

router.get('/getFeedback/:id', async (req: Request, res: Response) => {
    await controller.getFeedBackId(req,res);
});


router.post('/postFeedback', async (req: Request<IFeedback>, res : Response) => {
    await controller.postFeedBack(req,res);
});

router.delete('/deleteFeedback/:id', async (req : Request, res : Response) => {
    await controller.deleteFeedBack(req,res);
});

export default router;