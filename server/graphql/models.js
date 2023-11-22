import { Schema, model } from "mongoose";

const receipeSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
})

const foodSchema = new Schema({
    _id: Schema.Types.ObjectId,
    key: String,
    name: String,
    description: String,
    image: String,
    price: Number
});

const cartSchema = new Schema({
    count: Number,
    id: String,
    key: String,
    name: String,
    image: String,
    price: Number,
    totalPrice: Number,
    user:String
})

const registrationSchema = new Schema({
    fName: String,
    lName: String,
    email: String,
    password: String,
    address: String
})

const orderSchema = new Schema({
    foodItems: Array,
    total: Number,
    status: String
})

const favSchema = new Schema({
    name: String,
    image: String,
    user:String,
    price: Number
})


export const Receipe = model('Receipe', receipeSchema);
export const allFood = model('allFood', foodSchema);
export const order = model('order', orderSchema);
export const registration = model('registration', registrationSchema)
export const cart = model('cart', cartSchema)
export const fav = model('fav', favSchema)