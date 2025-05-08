import { IUser } from "../interfaces/interface";
import { Request, Response } from "express";
import models from '../models/models';


export class UserController {
    async createUser(req: Request<IUser>, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email && !password) {
                return res.status(404).json({ message : 'Не все данные введены' });
            }

            const existingUser = await models.User.findOne({ where : { email } });
            if (existingUser) {
                return res.status(409).json({ message : 'Пользователь с таким email уже существует, попробуйте другой электронный адрес' })
            }

            const newUser = await models.User.create({ email, password });
            return res.status(200).json({ newUser })
        }
        catch(error) {
            console.error('Ошибка рпи создании пользователя', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при создании пользователя' });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await models.User.findOne({ where: { id } });

            if (!user) {
                return res.status(404).json({ message : 'Пользователь не существует или не найден' });
            };

            await user.destroy();
            return res.status(200).json({ message : 'Пользователь успешно удален из базы данных' })
        }
        catch(error) {
            console.error('Произошла ошибка при удалении пользователя', error);
            return res.status(500).json({ message: 'Произошла ошибка на сервере при удалении пользователя из базы данных' });
        }
    }
    async getUsers(req: Request, res: Response) {
        try {
            const users = await models.User.findAll();

            if (users.length > 0) {
                return res.status(200).json({ users })
            } else {
                return res.status(404).json({ message : 'Пользователи не найдены' })
            }
        }
        catch(error) {
            console.error('Произошла ошибка при получении пользователей', error)
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении пользователей' });
        }
    }
    async assignAdmin(req : Request<IUser>,res : Response) {
        try {
            const { email } = req.params;

            const user = await models.User.findOne({ where : { email } });
            if (!user) {
                return res.status(404).json({ message : 'Пользователь не найден' });
            };

            user.set('role', 'ADMIN');
            user.save();

            return res.status(200).json({ message : `Роль администратора для пользователя ${email} успешно назначена` })
        }
        catch(error) {
            console.error('Произошла ошибка при назначении роли администратора', error)
            return res.status(500).json({ message : 'Произошла ошибка на сервере при назначении роли администратора' });

        }
    }
    async assignUser(req : Request<IUser>,res : Response) {
        try {
            const { email } = req.params;

            const user = await models.User.findOne({ where : { email } });
            if (!user) {
                return res.status(404).json({ message : 'Пользователь не найден' });
            };

            user.set('role', 'USER');
            user.save();

            return res.status(200).json({ message : `Роль пользователя для пользователя ${email} успешно назначена` })
        }
        catch(error) {
            console.error('Произошла ошибка при назначении роли пользователя', error)
            return res.status(500).json({ message : 'Произошла ошибка на сервере при назначении роли пользователя' });

        }
    }
    async getAdmins(req: Request, res: Response) {
        try {
            const admins = await models.User.findAll({ where: {role : 'ADMIN'} });

            if (admins.length > 0) {
                return res.status(200).json({ admins })
            } else {
                return res.status(404).json({ message : 'Администраторы не найдены' })
            }
        }
        catch(error) {
            console.error('Произошла ошибка при получении администраторов', error)
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении администраторов' });
        }
    }
}