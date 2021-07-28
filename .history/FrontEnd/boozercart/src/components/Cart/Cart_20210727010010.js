import React, { useState, useEffect, useContext, createContext } from "react";
import {
  CartContainer,
  CartWrapper,
  CartItemWrapper,
  CartItem,
  CartItemDetail,
  CartItemPrice,
  CartItemNumber,
  ContinueToCheckoutButton,
  CartTotal,
  CartItemQuantity,
  CartItemDetailHeader,
  CartItemPriceHeader,
  CartHeaderTitle,
  StoreTitle,
  CartItemWrapper1,
  CartTotalPriceWrapper,
  DeleteIcon,
  DeleteText,
  DeleteIconWrapper,
  Icon,
  ItemQuantity,
  IconDecrease,
  IconIncrease,
  ContinueShopping,
  CartItemWrapperTable,
  CartItemPriceTotal,
  TimesX,
  CartCheckoutWrapper,
  CartItemDetailCheckout,
} from "./Cart.element";

import { addToCartURL, orderItemUpdateUrl } from "../../../src/constants";
import { authAxios } from "../../../src/Utils";

import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCartDispatch, useCartState } from "../Context/CartContext";
import {
  CarItemTotal,
  DecreaseCartItem,
  RemoveCartItem,
} from "../Context/Action/cartAction";

function Cart() {
  const [dataItems, setDataItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const cartDispatch = useCartDispatch();
  const items = useCartState();

  const handleAddToCart = (slug) => {
    CarItemTotal(cartDispatch, slug);
  };

  // const handleAddToCart = (slug) => {
  //   console.log(slug);
  //   authAxios
  //     .post(addToCartURL, { slug })
  //     .then((res) => {
  //       setRequestData(new Date());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleDecreaseQuantity = (slug) => {
  //   authAxios
  //     .post(orderItemUpdateUrl, { slug })
  //     .then((res) => {
  //       setRequestData(new Date());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDecreaseQuantity = (slug) => {
    DecreaseCartItem(cartDispatch, slug);
  };

  useEffect(() => {
    authAxios
      .get(`http://https://boozercartas.azurewebsites.net/api/cart/`)
      .then((res) => {
        // console.log("Rest Api Data", res.data[0].items);
        // console.log(res.data[0].total_price.toFixed(2));
        setTotalPrice(res.data[0].total_price.toFixed(2));
        setDataItems(res.data[0].items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [items]);

  const handleRemoveItem = (itemid) => {
    RemoveCartItem(cartDispatch, itemid);
  };

  return (
    <>
      <CartContainer>
        <CartWrapper>
          <CartHeaderTitle>
            Your Order from <StoreTitle>Galamart</StoreTitle>
          </CartHeaderTitle>
          <CartItemWrapper>
            {/* <CartItemQuantity>Item #</CartItemQuantity> */}
            <CartItemQuantity>Quantity</CartItemQuantity>
            <CartItemDetailHeader>Order Detail</CartItemDetailHeader>
            <CartItemPriceHeader>Price</CartItemPriceHeader>
            <CartItemPriceHeader>Total Price</CartItemPriceHeader>
          </CartItemWrapper>
          {dataItems.map((dataitem, key) => (
            <>
              <CartItemWrapperTable>
                {/* <CartItem>{dataitem.id}</CartItem> */}
                <CartItemNumber>
                  <IconDecrease
                    onClick={() =>
                      handleDecreaseQuantity(dataitem.item_obj.slug)
                    }
                  >
                    <AiOutlineMinus></AiOutlineMinus>
                  </IconDecrease>
                  <ItemQuantity>
                    {dataitem.quantity} <TimesX>x</TimesX>
                  </ItemQuantity>
                  <IconIncrease
                    onClick={() => handleAddToCart(dataitem.item_obj.slug)}
                  >
                    <AiOutlinePlus></AiOutlinePlus>
                  </IconIncrease>
                </CartItemNumber>

                <CartItemDetail>{dataitem.item}</CartItemDetail>
                <CartItemPrice>$ {dataitem.item_obj.price}</CartItemPrice>
                <CartItemPriceTotal>
                  $ {dataitem.final_price}
                </CartItemPriceTotal>
                <DeleteIconWrapper>
                  <DeleteText> Remove</DeleteText>
                  <DeleteIcon onClick={() => handleRemoveItem(dataitem.id)}>
                    <MdDelete></MdDelete>
                  </DeleteIcon>
                </DeleteIconWrapper>
              </CartItemWrapperTable>
            </>
          ))}
          <CartTotalPriceWrapper>
            <CartTotal>Total: ${totalPrice}</CartTotal>
            <CartItemDetail></CartItemDetail>
          </CartTotalPriceWrapper>
          <CartCheckoutWrapper>
            <ContinueShopping to="/dashboard">
              Continue Shopping
            </ContinueShopping>
            <CartItemDetailCheckout></CartItemDetailCheckout>
            <ContinueToCheckoutButton to="/checkout">
              Continue to Checkout
            </ContinueToCheckoutButton>
          </CartCheckoutWrapper>
        </CartWrapper>
      </CartContainer>
    </>
  );
}

export default Cart;
