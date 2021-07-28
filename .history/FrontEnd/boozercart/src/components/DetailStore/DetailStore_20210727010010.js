import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

import {
  DetailViewContainer,
  DetailViewImageContainer,
  Image,
  ImageContainer,
  ImageWrapper,
  StoreHeader,
  StoreCard,
  ToplineWrapper,
  FaItems,
  PriceDetails,
  PriceDetailInnerWrapper,
  PriceDetail,
  PriceDetail1,
  PriceDetail2,
  ListNavContainer,
  ListItems,
  CustomStyles,
  RandomDiv,
  AddButton,
} from "./DetailStore.element";
import girlcart from "../../images/detailsview.jpg";
import { FaRegStar } from "react-icons/fa";
import { Button } from "../../globalStyles";
import AddItem from "../AddItem/AddItem";
import Modal from "react-modal";
import ItemList from "./ItemListComponent/ItemList";

const DetailStore = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const { id } = useParams();
  const [detailItems, setDetailsItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://https://boozercartas.azurewebsites.net/api/todo/todos/${id}`)
      .then((res) => {
        console.log(res);
        setDetailsItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <DetailViewContainer>
        <DetailViewImageContainer>
          <ImageContainer>
            <Image src={detailItems.cover}></Image>
          </ImageContainer>
          <ImageWrapper>
            <StoreHeader>{detailItems.title}</StoreHeader>
            <ToplineWrapper>
              <StoreCard>{detailItems.description}</StoreCard>
              <StoreCard>
                4.7
                <FaItems>
                  <FaRegStar></FaRegStar>
                </FaItems>
              </StoreCard>
              <StoreCard>(2700+ ratings)</StoreCard>
              <StoreCard>1.5mi. </StoreCard>
              <StoreCard>$ </StoreCard>
            </ToplineWrapper>
            <AddButton onClick={openModal}>
              <AiOutlinePlus></AiOutlinePlus>Add Item
            </AddButton>
            <AddItem
              showModal={showModal}
              setShowModal={setShowModal}
            ></AddItem>

            <PriceDetails>
              <PriceDetailInnerWrapper>
                <PriceDetail1>$3.99</PriceDetail1>
                <PriceDetail2>Delivary fee</PriceDetail2>
              </PriceDetailInnerWrapper>
              <PriceDetailInnerWrapper>
                <PriceDetail1>12-23</PriceDetail1>
                <PriceDetail2>minutes</PriceDetail2>
              </PriceDetailInnerWrapper>
            </PriceDetails>
          </ImageWrapper>
        </DetailViewImageContainer>
      </DetailViewContainer>

      <ItemList props={id}></ItemList>
    </>
  );
};

export default DetailStore;
