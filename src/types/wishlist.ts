import { Product } from "./product";

export interface Wishlist {
    id:        string;
    productId: string;
    userId:    string;
    createdAt: Date;
    updatedAt: Date;
    product:   Product;
}


