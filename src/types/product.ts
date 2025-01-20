export interface product {
    id:            string;
    title:         string;
    description:   string;
    categoryId:    string;
    sizeId:        string;
    color:         string;
    gender:        string;
    isTrending:    boolean;
    adminId:       string;
    createdAt:     Date;
    updatedAt:     Date;
    publicId:      string;
    price:         number;
    stock:         number;
    minimum_stock: number;
    discount:      number;
    imageUrl:      string;
    category:      Category;
    size:          Size;
}

export interface Category {
    id:          string;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    categoryId?: string;
}
export interface Size {
    id:          string;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    categoryId?: string;
}
