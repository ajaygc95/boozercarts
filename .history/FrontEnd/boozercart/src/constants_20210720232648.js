const localhost = "http://127.0.0.1:8000";
const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const productListURL = `${endpoint}/item/`;
export const productDetailURL = (id) => `${endpoint}/items/${id}/`;
export const addToCartURL = `${endpoint}/cart/`;
export const orderItemDeleteURL = (slug) => `${endpoint}/delete-item/${slug}`;
export const orderItemUpdateUrl = `${endpoint}/order-item/`;
export const CartItemDetail = `${endpoint}/cart/`;
export const getStoreItems = `${endpoint}/get-store/`;
