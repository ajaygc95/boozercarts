import React, { useState, useEffect } from "react";
import {
  CheckoutContainer,
  CheckoutWrapper,
  MiddleWrapper,
  SideWrapper,
  TitleSubtitle,
  StoreTitle,
  ValidPayment,
  Subtotal,
  DelivaryFee,
  FeesTax,
  InnerCheckoutDetail,
  PlaceOrderButton,
  TitleBar,
  Price,
  InnerCheckoutDetail1,
} from "./Checkout.element";
import CheckoutPay from "./CheckoutPay";
import { productListURL, addToCartURL } from "../../../src/constants";
import { authAxios } from "../../../src/Utils";

function Checkout() {
  const [dataItems, setDataItems] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const totalPrice = fetchData.total_price;
  const finalPrice = fetchData.final_price;
  const taxes = fetchData.taxes;

  useEffect(() => {
    authAxios
      .get(`http://https://boozercartas.azurewebsites.net/api/cart/`)
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data[0].total_price.toFixed(2));
        setFetchData(res.data[0]);
        setDataItems(res.data[0].items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <CheckoutContainer>
        <SideWrapper></SideWrapper>
        <MiddleWrapper>
          <CheckoutPay></CheckoutPay>
        </MiddleWrapper>
        <CheckoutWrapper>
          <TitleSubtitle>
            <TitleBar>
              Order From <StoreTitle>Galamart</StoreTitle>
            </TitleBar>
            <ValidPayment>Please Select valid payment method</ValidPayment>
            <PlaceOrderButton>Place Order</PlaceOrderButton>
            <InnerCheckoutDetail>
              <Subtotal>Subtotal</Subtotal>
              <Price>${totalPrice}</Price>
              <DelivaryFee>Delivary Fee</DelivaryFee>
              <Price>$3.99</Price>
              <FeesTax>Fees & Estimated Tax</FeesTax>
              <Price>${taxes}</Price>
            </InnerCheckoutDetail>
          </TitleSubtitle>
          <InnerCheckoutDetail1>
            <Subtotal>Total</Subtotal>
            <Price>${finalPrice}</Price>
          </InnerCheckoutDetail1>

          <InnerCheckoutDetail1>
            <Subtotal>Total Amnount Due</Subtotal>
            <Price>${finalPrice}</Price>
          </InnerCheckoutDetail1>
        </CheckoutWrapper>
      </CheckoutContainer>
    </>
  );
}

export default Checkout;
