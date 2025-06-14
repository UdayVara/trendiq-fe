export interface Address {
    id:        string;
    name:      string;
    pincode:   string;
    address:   string;
    userId:    string;
    isDeleted: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
