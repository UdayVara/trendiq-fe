import { Size } from "./size";

export interface CartItem {
    id:                  string;
    productId:           string;
    userId:              string;
    quantity:            number;
    product_inventoryId: string;
    createdAt:           Date;
    updatedAt:           Date;
    product:             Product;
    product_inventory:   ProductInventory;
}

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

export interface CartSummary {
    amount:      number;
    discount:    number;
    finalAmount: number;
    gst:         number;
}



