
import { Request, Response } from "express";
import models from "../models/models";

export class BasketController {
    async getUserBascketById(req: Request, res: Response) {
        try {
            const { email } = req.params;

            const user = await models.User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message : 'Пользователь не найден' })
            }

            const basket = await models.Basket.findOne({
                where: { email },
                include: [
                    {
                        model : models.BasketDevice,
                        include: [models.Product]
                    }
                ]
            });

            if (!basket) {
                return res.status(404).json({ message : 'Корзина не найдена' })
            };

            return res.status(200).json({ basket });
        }
        catch(error) {
            console.error('Произошла ошибка при получении корзины пользователя', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении корзины для пользователя' });
        }
    }
    async createBasketForUser(req: Request, res: Response) {
        try {
            const { email } = req.body;

            const user = await models.User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message : 'Пользователя не сущесвует' })
            };

            const [basket, created] = await models.Basket.findOrCreate({
                where : { userId: user }
            });

            return res.status(200).json({ basket,created });
        }
        catch(error) {
            console.error('Произошла ошибка при создании корзины для пользователя',error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при создании корзины для пользователя' });
        }
    }
    async addProductToBasket(req: Request, res: Response) {
        try {

        }
        catch(error) {

        }
    }
    async updateBasketQuantity(req: Request, res: Response) {
        try {

        }
        catch(error) {

        }
    }
    async deleteProductFromBasket(req: Request, res: Response) {
        try {

        }
        catch(error) {

        }
    }
    async clearBasket(req: Request, res: Response) {
        try {

        }
        catch(error) {

        }
    }

}