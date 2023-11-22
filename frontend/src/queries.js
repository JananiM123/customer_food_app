import { gql } from '@apollo/client';
export const GET_CATEGORIES = gql`
  query GetAllFoods {
    getFoodItems {
      _id
    createdAt
    description
    name
    price
  }
  }
`;

export const GET_USERS = gql`
query GetUsers {
  getUsers {
    address
    email
    fName
    password
  }
}
`

export const DELETE_FOOD = gql`
  mutation DeleteFood($id: ID!) {
    deleteFood(ID: $id)
  }
`;

export const EDIT_FOOD = gql`
 mutation editFood($id: ID!, $foodInput: FoodInput) {
  editFood(ID: $id, foodInput: $foodInput)
}
`;


export const ADD_USER = gql`
mutation addUser($regInput: RegInput) {
  addUser(regInput: $regInput) {
    address
    email
    fName
    lName
    password
  }
}
`
export const GET_ALLFOOD = gql`
query getFoodItems {
    getFoodItems {
    description
    image
    key
    name
    price
    id
}
}
`
export const CART = gql`
query Food($id: ID!) {
  food(ID: $id) {
    image
    name
    key
  }

}`



// query GetFoodItems {
//   getFoodItems {
//     description
//     image
//     key
//     name
//     price
//     id
//   }
// }

export const ADD_FOOD = gql`
mutation addFood($foodInput: FoodInput) {
  addFood(foodInput: $foodInput) {
    description
    image
    key
    name
    price
  }
}


`

export const ORDER_DETAILS = gql`
  mutation orderDetails($cartInput: [CartInput!]!) {
  cartDetails(cartInput: $cartInput) {
    count
    id
    image
    key
    price
    name
    totalPrice
  }
}

`;

export const GET_ALLORDERDETAILS = gql`
query getOrderDetails {
  getOrderDetails {
    id 
    name
    price
    user
    count
    totalPrice
    image
    key
}
}
`
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $edit: EditCategoryInput) {
    updateCategory(id: $id, edit: $edit) {
      id
      title
    }
  }
`;

;

export const ADD_CATEGORY = gql`
  mutation AddCategory($category: AddCategoryInput!) {
    addCategory(category: $category) {
      id
      title
    }
  }
`;
