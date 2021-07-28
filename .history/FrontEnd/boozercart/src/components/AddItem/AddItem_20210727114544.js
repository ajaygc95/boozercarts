import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PopContainer,
  ModalWrapper,
  FormContainer,
  MainContainer,
  CloseModalButton,
  FormWrapper,
  ImageBox,
  AddButton,
  SelectForm,
  SingleFormWrapper,
  FormField,
  FormName,
  SingleFormWrapperImage,
} from "./AddItem.element";
import axios from "axios";
import { Button } from "../../globalStyles";

function AddItem({ showModal, setShowModal }) {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const categoryList = {
    options: [{ name: "Alcohol" }, { name: "Food" }, { name: "Snacks" }],
  };

  const { register, handleSubmit } = useForm();
  const [values, setValues] = useState({
    title: "",
    category: "Alcohol",
    price: "",
    quantity: "",
  });

  const handleImage = (e) => {
    console.log("Image found", e.target.files[0]);

    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    const file = data.picture[0];
    const formData = new FormData();

    formData.append("picture", file);
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    axios
      .post(
        `http://https://boozercartcore.azurewebsites.net/api/item/`,
        formData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showModal ? (
        <MainContainer>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            ></CloseModalButton>

            <FormWrapper>
              <SingleFormWrapper>
                <FormName>Item Name: </FormName>
                <FormField
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                ></FormField>
              </SingleFormWrapper>

              <SingleFormWrapper>
                <FormName>Category: </FormName>
                <SelectForm
                  name="category"
                  type="text"
                  value={values.category}
                  onChange={handleChange}
                >
                  {categoryList.options.map((dataitem, key) => (
                    <option value={dataitem.name}>{dataitem.name}</option>
                  ))}
                </SelectForm>
              </SingleFormWrapper>

              {/* <FormField
                name="category"
                type="text"
                value={values.category}
                onChange={handleChange}
                options={("Alcohol", "Food", "Snacks")}
              ></FormField> */}
              <SingleFormWrapper>
                <FormName>Price: </FormName>
                <FormField
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                ></FormField>
              </SingleFormWrapper>

              <SingleFormWrapper>
                <FormName>Quantity: </FormName>
                <FormField
                  name="quantity"
                  type="number"
                  value={values.quantity}
                  onChange={handleChange}
                ></FormField>
              </SingleFormWrapper>

              <SingleFormWrapper>
                <FormName>Picture: </FormName>
                <SingleFormWrapperImage>
                  {image.preview ? (
                    <img
                      src={image.preview}
                      alt="dummy"
                      border="1px solid orange"
                      width="200"
                      height="200"
                    />
                  ) : (
                    <>
                      <ImageBox></ImageBox>
                    </>
                  )}
                </SingleFormWrapperImage>
                <SingleFormWrapperImage></SingleFormWrapperImage>
                <FormField
                  type="file"
                  {...register("picture", { required: true })}
                  onChange={handleImage}
                />
                <SingleFormWrapperImage></SingleFormWrapperImage>
                <AddButton onSubmit={onSubmit}>Upload</AddButton>
              </SingleFormWrapper>
            </FormWrapper>
          </FormContainer>
        </MainContainer>
      ) : null}
    </>
  );
}

export default AddItem;
