import axios from "axios";
import { authAxios } from "../../../Utils";
import {
  addToCartURL,
  orderItemDeleteURL,
  orderItemUpdateUrl,
} from "../../../constants";

export async function getInitialCartItem(dispatch) {
  try {
    authAxios
      .get(`http://http://boozercartcore.azurewebsites.net/api/cart/`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "INITIAL_CART", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({ type: "CART_ERROR", error: error });
  }
}

export async function CarItemTotal(dispatch, slug) {
  try {
    console.log("Cart Item total started");
    console.log(slug);
    authAxios
      .post(addToCartURL, { slug })
      .then((res) => {
        getInitialCartItem(dispatch);
        dispatch({ type: "ADD_TO_CART", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({ type: "CART_ERROR", error: error });
  }
}

export async function RemoveCartItem(dispatch, itemid) {
  try {
    console.log("Cart Item total started");

    authAxios
      .delete(orderItemDeleteURL(itemid))
      .then((res) => {
        console.log("Handle remove Item called()");
        getInitialCartItem(dispatch);
        dispatch({ type: "DELETE_CART", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({ type: "CART_ERROR", error: error });
  }
}

export async function DecreaseCartItem(dispatch, slug) {
  try {
    console.log("Decrease Item");

    authAxios
      .post(orderItemUpdateUrl, { slug })
      .then((res) => {
        getInitialCartItem(dispatch);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({ type: "CART_ERROR", error: error });
  }
}

// const handleDecreaseQuantity = (slug) => {

// };

// authAxios
//     .delete(orderItemDeleteURL(itemid))
//     .then((res) => {
//       console.log("Handle remove Item called()");
//       setRequestData(new Date());
//     })
//     .catch((err) => {
//       console.log(err);
//     });
