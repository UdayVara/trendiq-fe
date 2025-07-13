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


export interface SingleProduct {
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
    category:          Category;
    product_images:    ProductImage[];
    product_inventory: ProductInventory[];
    availableColors:   AvailableColor[];
    cart:              Cart[];
}

export interface AvailableColor {
    id:       string;
    color:    string;
    imageUrl: string;
}

export interface Cart {
    id:                  string;
    productId:           string;
    userId:              string;
    quantity:            number;
    product_inventoryId: string;
    createdAt:           Date;
    updatedAt:           Date;
}



export interface ProductImage {
    id:        string;
    imageUrl:  string;
    publicId:  string;
    productId: string;
}

export interface ProductInventory {
    id:            string;
    sizeId:        string;
    productId:     string;
    price:         number;
    stock:         number;
    minimum_stock: number;
    discount:      number;
    size:          Size;
}

export interface Size {
    id:          string;
    name:        string;
    description: string;
    categoryId:  string;
    createdAt:   Date;
    updatedAt:   Date;
}
