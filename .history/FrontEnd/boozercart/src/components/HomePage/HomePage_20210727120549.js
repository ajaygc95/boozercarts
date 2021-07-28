import axios from "axios";
import React, { useState, useEffect } from "react";
import girlcart from "../../images/alcohol.jpg";
import {
  BoxWrapper,
  HomeFeedBox,
  HomeFeedBox1,
  HomeFeedContainer,
  HomeFeedWrapper,
  HeaderTitle,
  HomeImage,
  ImageWrapper,
  ItemDetails,
  ContainerWrapper,
  Circle,
  CircleWrapper,
  FinalLink,
  StoreTitleHeader,
  TitleWrapper,
} from "./Homepage.element";
import { Link } from "react-router-dom";

function HomePage() {
  const [dataItems, setDataItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://http://boozercartcore.azurewebsites.net/api/todo/todos/")
      .then((res) => {
        console.log(res);
        setDataItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <HomeFeedContainer>
        <ContainerWrapper>
          <HeaderTitle>
            <h2>Best Rated places this is awesome near you</h2>
          </HeaderTitle>
          <HomeFeedWrapper>
            {dataItems.map((dataitem, key) => (
              <BoxWrapper>
                <ImageWrapper>
                  <HomeImage
                    src={dataitem.cover}
                    alt={dataitem.alt}
                  ></HomeImage>
                </ImageWrapper>
                <ItemDetails>
                  <HomeFeedBox1>
                    <TitleWrapper>
                      <Link
                        to={`detail-store/${dataitem.id}`}
                        key={dataitem.id}
                        style={{ textDecoration: "none" }}
                      >
                        <StoreTitleHeader>{dataitem.title}</StoreTitleHeader>
                      </Link>
                    </TitleWrapper>
                    <CircleWrapper>
                      <Circle>4.5</Circle>
                    </CircleWrapper>
                  </HomeFeedBox1>

                  <HomeFeedBox>
                    <li>{dataitem.description}</li>
                  </HomeFeedBox>
                  <HomeFeedBox>
                    {dataitem.completed ? (
                      <li>Home Delivary</li>
                    ) : (
                      <li> Only Pickup</li>
                    )}
                  </HomeFeedBox>
                </ItemDetails>
              </BoxWrapper>
            ))}
            {/* <FinalLink>
              <li>See all</li>
            </FinalLink> */}
          </HomeFeedWrapper>
        </ContainerWrapper>
      </HomeFeedContainer>
      <HomeFeedContainer></HomeFeedContainer>
    </>
  );
}

export default HomePage;
