import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  ListNavContainer,
  ListItems,
  ListItemContainer,
  ListItemWrapper,
  ListItemWrapContainer,
  TopHeader,
  ItemCard,
  InnerCard,
  InnerHeader,
  InnerDescript,
  InnerItemImage,
  InnerPrice,
  InnerCardWrapper,
  AddToCartdiv,
  ItemListWrapper,
} from "./ItemList.element";
import { authAxios } from "../../../Utils";
import { CarItemTotal } from "../../Context/Action/cartAction";
import { useCartDispatch } from "../../Context/CartContext";

import {
  productListURL,
  addToCartURL,
  getStoreItems,
} from "../../../constants";

const ItemList = ({ props }) => {
  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://boozercartcore.azurewebsites.net/api/get-store/", {
        params: {
          vendor_pk: props,
        },
      })
      .then((res) => {
        setDataItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatch = useCartDispatch();

  const handleContextAddToCart = (slug) => {
    CarItemTotal(dispatch, slug);
  };

  const handleAddToCart = (slug) => {
    authAxios
      .post(addToCartURL, { slug })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ListItemContainer>
        <ListItemWrapper>
          <ListNavContainer>
            <ListItems>Picked for you</ListItems>
            <ListItems>Featured Items</ListItems>
            <ListItems>Soft Drinks</ListItems>
            <ListItems>Hard Drinks</ListItems>
            <ListItems>Food</ListItems>
            <ListItems>Mixed Alcohol</ListItems>
          </ListNavContainer>
          <hr />
          <ListItemWrapContainer>
            <TopHeader>Most Popular</TopHeader>
            <ItemCard>
              {dataItems.map((dataitem, key) => (
                <InnerCard>
                  <InnerCardWrapper>
                    <ItemListWrapper>
                      <Link
                        to={`/item-detail/${dataitem.id}`}
                        key={dataitem.id}
                        style={{ textDecoration: "none" }}
                      >
                        <InnerHeader>{dataitem.title} </InnerHeader>
                      </Link>
                    </ItemListWrapper>
                    <InnerDescript>( {dataitem.quantity} ml)</InnerDescript>
                    <InnerDescript> {dataitem.category}</InnerDescript>
                    <InnerPrice> Price: ${dataitem.price}</InnerPrice>
                    <AddToCartdiv
                      onClick={() => handleContextAddToCart(dataitem.slug)}
                    >
                      Add to Cart
                    </AddToCartdiv>
                  </InnerCardWrapper>
                  <InnerItemImage src={dataitem.picture}></InnerItemImage>
                </InnerCard>
              ))}
            </ItemCard>
          </ListItemWrapContainer>
        </ListItemWrapper>
      </ListItemContainer>
    </>
  );
};

export default ItemList;
