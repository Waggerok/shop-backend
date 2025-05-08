export interface IUser {
    id : number;
    email : string;
    password : string;
    role : string;
}
export interface IProduct {
    id : number;
    name : string;
    price : number;
    image : string;
    type : string
}
export interface IProductInfo {
    id : number;
    title : string;
    description : string;
}
export interface IBasket {
    id : number;
}
export interface IBasketDevice {
    id : number;
}
export interface IFeedback {
    id : number;
    email : string;
    text : string;
}
export interface IOrder {
    id : number;
    total_price : string;
    address: string;
    items : [];
}