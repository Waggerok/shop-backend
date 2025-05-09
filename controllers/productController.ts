// import { IProductInfo } from './../interfaces/interface';
import { IProduct, IProductInfo } from "../interfaces/interface";
import { Request, Response } from "express";
import models from "../models/models";


export class ProductContoller {
    async getProducts(req: Request,res: Response) {
        try {
            const products = await models.Product.findAll();

            if (products.length > 0) {
                return res.status(200).json({ products })
            } else {
                return res.status(404).json({ message : 'Товары не найдены или не существуют' })
            }
        }
        catch(error) {
            console.error('Произошла ошибка при получении всех товаров', error);
            return res.status(500).json({ message: 'Произошла ошибка на сервере при получении всех товаров' });
        }
    }
    async getProductById(req: Request,res: Response) {
        try {
            const { id } = req.params;

            const product = await models.Product.findOne({ where : { id } })

            if (!product) {
                return res.status(404).json({ message : 'Товар не найден или не существует' })
            }

            return res.status(200).json({ product });
        }
        catch(error) {
            console.error('Произошла ошибка при получении товара по id',error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при получении товара по id' });
        }
    }
    async createProduct(req: Request,res: Response) {
        try {
            let { name, price, type, title, description } = req.body;

            if (!req.file) {
                return res.status(404).json({ message : 'Фотография не загружена' })
            }

            const product = await models.Product.create({ 
                name,
                price,
                type,
                image : req.file.filename,
                title,
                description,
            })          

            return res.status(200).json({ product });
        }
        catch(error) {
            console.error('Произошла ошибка при создании товара ', error);
            return res.status(500).json({ message : 'Проищошла ошибка на сервере при создании товара в базу данных' })
        }
    }
    async deleteProductById(req: Request,res: Response) {
        try {
            const { id } = req.params;

            const product = await models.Product.findOne({ where: { id } });

            if (!product) {
                return res.status(404).json({ message : 'Товар с таким id не найден или не существует' })
            }

            await product.destroy();
            return res.status(200).json({ message : 'Товар успешно удален' });
        }   
        catch(error) {
            console.error('Произошла ошибка при удалении товара по id', error);
            return res.status(500).json({ message : 'Произошла ошибка на сервере при удалении товара по id' });
        }
    }
    // async deleteProducts(req: Request,res: Response) {
    //     try {
    //         const products = await models.Product.findAll();

    //         if (products.length === 0) {
    //             return res.status(404).json({ message : 'Похоже товары не найдены или не существуют' })
    //         }

            
    //     }
    //     catch(error) {

    //     }
    // }
    // async editProductById(req: Request,res: Response) {
    //     try {

    //     }
    //     catch(error) {

    //     }
    // }
}