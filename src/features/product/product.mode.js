export default class ProductModel{
    constructor(name,desc,imageUrl,category,price,sizes){
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }




    static filter(minPrice,maxPrice,category){
        const filterProducts = products.filter((prod)=>{
           return (!minPrice || prod.price>=minPrice) && (!maxPrice ||prod.price<=maxPrice) && (!category || prod.category == category);

        });
        return filterProducts;
    }
}

var products = [
    new ProductModel(
        1,
        'prod 1',
        'desc of prod 1',
        "",
        'category 1',
        39,
        "l",
        
    ),new ProductModel(
        2,
        'prod 2',
        'desc of prod 2',
        "",
        'category 2',
        39,
        "l",
        
    ),new ProductModel(
        3,
        'prod 3',
        'desc of prod 3',
        "",
        'category 3',
        39,
        "l",
        
    )
]