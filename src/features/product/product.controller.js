import ProductModel from "./product.mode.js";
import { ProductRepository } from "./product.repository.js";

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req,res){
        const products = await this.productRepository.getAll();
        res.status(200).send(products);
    }


    async addProduct(req,res){
        let {name,price,sizes,desc,category} = req.body;
        
        price= parseFloat(price);
        sizes=sizes.split(',');
        let imageUrl=req.file.filename;
        const createRecord = new ProductModel(name,desc,imageUrl,category,price,sizes);
        const newProd =await this.productRepository.add(createRecord);
        res.status(201).send(newProd);
    }

    async rateProduct(req,res){
        const userId = req.userId;
        const userName = req.userName;
        const productId = req.body.productId;
        const rating = req.body.rating;
        const err = await this.productRepository.rateProduct(userId,productId,rating,userName);
        if(err)
            return res.status(400).send(err);
        else{

            return res.status(200).send('rated product');
        }
    }

    async getOneProduct(req,res){
        const id = req.params.id;
        const product = await this.productRepository.get(id);
        if(product)
        res.status(200).send(product);
        else
        res.status(404).send('product not found');
    }

    async filterProduct(req,res){
        const minprice = req.query.minPrice;
        const maxprice = req.query.maxPrice;
        const category = req.query.category;
        const prods = await this.productRepository.filter(minprice,maxprice,category);
        res.status(200).send({product:prods});
    }
}