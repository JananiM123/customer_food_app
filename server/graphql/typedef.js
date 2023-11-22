const typedef = `#graphql
type Receipe{
    name:String
    description:String
    createdAt:String,
    thumbsUp:Int
}
input ReceipeInput{
    name:String
    description:String
}

type Registration{
    fName: String,
    lName: String,
    email: String,
    password:String,
    address:String
}
type Cart{
    count:Int,
    id: String
    key: String,
    name: String,
    image: String,
    price: Int,
    totalPrice:Int,
    user:String
}
input CartInput{
    count:Int,
    id: String
    key: String,
    name: String,
    image: String,
    price: Int,
    totalPrice:Int
    user:String
}

input RegInput{
    fName: String,
    lName: String,
    email: String,
    password:String,
    address:String
}

type FoodItem {
    id:ID
  name: String
  key: String
  description: String
  image: String,
  price: Float
}

input FoodInput{
    key: String
    name: String
    description: String
    image: String
    price: Float
}


type Favorite {
  name: String!
  image: String
  price: Float
  user:String
}

input FavoriteInput {
  name: String
  image: String
  price: Float
  user:String
}


type Order {
  id: ID!
  foodItems: [FoodItem!]!
  total: Float!
  status: String!
}

type Query{
    receipe(ID:ID!):Receipe!
    getReceipes(amount:Int):[Receipe]
    food(ID:ID!):FoodItem!
    getFoodItems: [FoodItem!]!
    getOrder(id: ID!): Order
    getUsers: [Registration!]!
    getOrderDetails:[Cart!]!
}

type Mutation{
    addUser(regInput:RegInput):Registration!
    addFav(favoriteInput:[FavoriteInput]):[Favorite]!
    cartDetails(cartInput:[CartInput!]!):[Cart!]!
    addFood(foodInput:FoodInput):FoodItem!
    deleteFood(ID:ID!):Boolean
    editFood(ID:ID!,foodInput:FoodInput):Boolean
    createReceipe(receipeInput:ReceipeInput):Receipe!
    deleteReceipe(ID:ID!):Boolean
    editReceipe(ID:ID!,receipeInput:ReceipeInput):Boolean
}
`
export default typedef;

// query GetFood($foodId: ID!){
// food(id: $foodId) {
//     title,
//     cost
//    }
//    }