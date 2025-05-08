import { IFeedback } from "../interfaces/interface";
import { Request, Response } from "express";
import models from "../models/models";

export class FeedBackController {
    async getFeedBacks(req: Request, res : Response){
        try {
            const feedbacks = await models.Feedback.findAll();
            
            if (feedbacks.length > 0) {
                return res.status(200).json({ feedbacks });
            } else {
                return res.status(404).json({ message : 'Обратные связи не найдены' })
            }
        }
        catch(error) {
            console.error('Произошла ошибка при получении обратных связей', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении всех обратных связей' })
        }
    }
    async getFeedBackId(req: Request, res : Response){
        try {
            const {id} = req.params;

            const feedback = await models.Feedback.findOne({ where : { id } });

            if (!feedback) {
                return res.status(404).json({ message : 'Обратная связь отсутствует' })
            }
            return res.status(200).json({ feedback });
        }
        catch(error) {
            console.error('Произошла ошибка при получении обратной связи по id', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении обратной связи по id' });
        }
    }
    async postFeedBack(req: Request<IFeedback>, res : Response){
        try {
            const { email, text } = req.body;

            if(!email && !text) {
                return res.status(404).json({ message : 'Не все данные введены' });
            }

            const newFeedback = await models.Feedback.create({ email, text });
            return res.status(200).json({ newFeedback });
        }
        catch(error) {
            console.error('Произошла ошибка при отправке feedback', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при отправке feedback' })
        }
    }
    async deleteFeedBack(req: Request, res : Response){
        try {
            const { id } = req.params;

            const feedback = await models.Feedback.findOne({ where : { id } });
            if (!feedback) {
                return res.status(404).json({ message : 'Обратной связи не существует или не найдена' })
            }

            await feedback.destroy();
            return res.status(200).json({ message : 'Обратная связь успешно удалена' });
        }
        catch(error) {
            console.error('Произошла ошибка при удалении обратной связи', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при удалении обратной сввязи' });
        }
    }
}