import { Category } from "./category";

export interface Product {
    id:                string;
    title:             string;
    description:       string;
    markupDescription: string;
    categoryId:        string;
    color:             string;
    gender:            string;
    isTrending:        boolean;
    adminId:           string;
    createdAt:         Date;
    updatedAt:         Date;
    publicId:          string;
    imageUrl:          string;
    product_inventory: ProductInventory[];
    category:          Category;
}

export interface ProductInventory {
    id:            string;
    sizeId:        string;
    productId:     string;
    price:         number;
    stock:         number;
    minimum_stock: number;
    discount:      number;
}


export interface SearchedProduct {
    id:       string;
    imageUrl: string;
    title:    string;
}
