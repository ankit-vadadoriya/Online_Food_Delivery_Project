import { LOGOUT } from "../Authentcation/ActionTypes";
import {
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  FIND_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  UPDATE_CARTITEM_REQUEST,
  UPDATE_CARTITEM_SUCCESS,
  UPDATE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
} from "./ActionTypes";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FIND_CART_REQUEST:
//     case GET_ALL_CART_ITEMS_REQUEST:
//     case UPDATE_CARTITEM_REQUEST:
//     case REMOVE_CARTITEM_REQUEST:
//       // case ADD_ITEM_TO_CART_REQUEST:
//       // case CLEAR_CART_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case FIND_CART_SUCCESS:
//     case CLEAR_CART_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         cart: action.payload,
//         cartItems: action.payload.items,
//       };

//     case ADD_ITEM_TO_CART_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         cartItems: [...state.cartItems, action.payload],
//       };

//     case UPDATE_CARTITEM_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         cartItems: state.cartItems.map((item) =>
//           item.id === action.payload.id ? action.payload : item
//         ),
//       };

//     case REMOVE_CARTITEM_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         cartItems: state.cartItems.filter((item) => item.id !== action.payload),
//       };

//     case GET_ALL_CART_ITEMS_SUCCESS:
//       return { ...state, loading: false, cartItems: action.payload };


//     case FIND_CART_FAILURE:
//     case UPDATE_CARTITEM_FAILURE:
//     case REMOVE_CARTITEM_FAILURE:
//     case GET_ALL_CART_ITEMS_FAILURE:
//     case ADD_ITEM_TO_CART_FAILURE:
//     case CLEAR_CART_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case LOGOUT:
//       localStorage.getItem("jwt");
//       return {
//         ...state,
//         cartItems: [],
//         cart: null,
//         success: "Logout Success"
//       };

//     default:
//       return state;
//   }
// };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CART_REQUEST:
    case GET_ALL_CART_ITEMS_REQUEST:
    case UPDATE_CARTITEM_REQUEST:
    case REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FIND_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: { ...action.payload, total: calculateTotal(action.payload.items) },
        cartItems: action.payload.items,
      };

    case ADD_ITEM_TO_CART_SUCCESS: {
      const updatedCartItems = [...state.cartItems, action.payload];
      return {
        ...state,
        loading: false,
        cartItems: updatedCartItems,
        cart: { ...state.cart, total: calculateTotal(updatedCartItems) },
      };
    }

    case UPDATE_CARTITEM_SUCCESS: {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedCartItems,
        cart: { ...state.cart, total: calculateTotal(updatedCartItems) },
      };
    }

    case REMOVE_CARTITEM_SUCCESS: {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedCartItems,
        cart: { ...state.cart, total: calculateTotal(updatedCartItems) },
      };
    }

    case GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        cart: { ...state.cart, total: calculateTotal(action.payload) },
      };

    case FIND_CART_FAILURE:
    case UPDATE_CARTITEM_FAILURE:
    case REMOVE_CARTITEM_FAILURE:
    case GET_ALL_CART_ITEMS_FAILURE:
    case ADD_ITEM_TO_CART_FAILURE:
    case CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        cartItems: [],
        cart: null,
        success: "Logout Success",
      };

    default:
      return state;
  }
};

// Helper function to calculate the total price dynamically
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

export default cartReducer;
