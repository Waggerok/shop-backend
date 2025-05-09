import { IProduct } from "../interfaces/interface";
import { Request, Response, Router } from "express";
import upload from "../middleware/uploadImage";
import { ProductContoller } from "../controllers";

const router = Router();
const controller = new ProductContoller();


router.post("/createProduct", upload.single('image') ,(req,res) => {
    controller.createProduct(req,res);
});

router.get('/getProducts', async(req:Request, res:Response) => {
    await controller.getProducts(req,res);
});

router.get('/getProduct/:id', async(req:Request, res:Response) => {
    await controller.getProductById(req,res);
});

router.delete('/deleteProduct/:id', async(req:Request, res:Response) => {
    await controller.deleteProductById(req,res);
});

router.put('/editProduct/:id', upload.single('image'), (req,res) => {
    controller.editProductById(req,res);
})

export default router;