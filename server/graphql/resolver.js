import mongoose from "mongoose";
import { Receipe, allFood, cart, registration } from "./models.js";

const resolver = {
  Query: {
    async receipe(_, { ID }) {
      return await Receipe.findById(ID);
    },
    async getReceipes(_, { amount }) {
      const foodItems = await allFood
        .find()
        .sort({ _id: -1 })
        .limit(amount)
        .exec();
      return foodItems;

    },
    async food(_, { ID }) {
      return await allFood.findById(ID);
    },
    async getFoodItems(_, { amount }) {
      return await allFood.find().sort({ createdAt: -1 }).limit(amount);
    },
    async getUsers() {
      const foodItems = await registration.find()
      return foodItems;
    },
    async getOrderDetails() {
      const orderDetails = await cart.find()
      return orderDetails;
    },
  },
  Mutation: {
    async addUser(_, { regInput: { fName, lName, email, password, address } }) {
      const addUser = new registration({
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        address: address
      });
      const res = await addUser.save(); 
      return {
        id: res.id,
        ...res._doc
      };
    },

    async cartDetails(_, { cartInput }) {
      const cartDetailsArray = cartInput.map(item => {
        const cartDetails = new cart({
          id: item.id,
          key: item.key,
          name: item.name,
          count: item.count,
          image: item.image,
          price: item.price,
          totalPrice: item.totalPrice,
          user: item.user
        });
        return cartDetails.save();
      });
      const savedCartItems = await Promise.all(cartDetailsArray)
      return savedCartItems.map(res => ({
        id: res.id,
        ...res._doc
      }));
    },

    async addFav(_, { favoriteInput }) {
      const favArray = favoriteInput.map(item => {
        console.log('favoriteInput', favoriteInput)
        const addFav = new cart({
          name: item.name,
          image: item.image,
          price: item.price,
          user: item.user
        });
        return addFav.save();
      });
      const savedFavItems = await Promise.all(favArray)
      return savedFavItems.map(res => ({
        id: res.id,
        ...res._doc
      }));
    },
    async addFood(_, { foodInput: { name, key, description, price, image } }) {
      const addFood = new allFood({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        key: key,
        description: description,
        image: image,
        price: price

      });
      const res = await addFood.save();

      return {
        id: res.id,
        ...res._doc
      };
    },

    async deleteFood(_, { ID }) {
      const isDeleted = (await allFood.deleteOne({ _id: ID })).deletedCount;
      console.log('isDeleted', isDeleted)
      return isDeleted > 0;
    },
    async editFood(_, { ID, foodInput: { name, description, price } }) {
      const isEdited = (await allFood.updateOne({ _id: ID }, { name: name, description: description, price: price })).modifiedCount;
      return isEdited > 0;
    },
    async createReceipe(_, { receipeInput: { name, description } }) {
      const createReceipe = new Receipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
      });
      const res = await createReceipe.save();

      return {
        id: res.id,
        ...res._doc
      };
    },
    async deleteReceipe(_, { ID }) {
      const wasDeleted = (await Receipe.deleteOne({ _id: ID })).deletedCount;
      console.log('wasDeleted', wasDeleted)
      return wasDeleted > 0;
    },
    async editReceipe(_, { ID, receipeInput: { name, description } }) {
      const wasEdited = (await Receipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
      return wasEdited > 0;
    },
  },
};

export default resolver;
