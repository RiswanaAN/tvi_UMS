import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImage from "../../assets/imageProduct.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 720,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function EditAdminProduct(props) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [offer, setOffer] = useState("");
  const [color, setColor] = useState("");
  const [availability, setAvailability] = useState("");
  const [productPic, setProductPic] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageFile, setImageFile] = useState({});

  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const handleClose = () => props.setOpen(false);

  useEffect(() => {
    showDetails();
  }, []);
  function showDetails() {
    axios
      .get("http://localhost:8000/api/get-one/" + props.editPid, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log("response",response.data);
        setProductName(response.data.result.title);
        setProductPrice(response.data.result.price);
        setProductDetails(response.data.result.description);
        setCategory(response.data.result.category);
        setStock(response.data.result.stock);
        setOffer(response.data.result.offer);
        setColor(response.data.result.color);
        setAvailability(response.data.result.availability);
        const image = response.data.result.image[0]?.data;
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(image))
        );
        var imageUrl = `data:image/jpeg;base64,${base64String}`;
        setProductPic(imageUrl);
      });
  }
  function editProductDetails(e) {
    e.preventDefault();
    //Body should be send in form data
    const updatedDetails = new FormData();
    if (imageFile) {
      updatedDetails.append("image", imageFile);
    }
  
    productName && updatedDetails.append("title", productName);
    productPrice && updatedDetails.append("price", productPrice);
    productDetails && updatedDetails.append("description", productDetails);
    category && updatedDetails.append("category", category);
    offer && updatedDetails.append("offer", offer);
    stock && updatedDetails.append("stock", stock);
    color && updatedDetails.append("color", color);
    availability && updatedDetails.append("availability", availability);
    console.log("Before====",updatedDetails);
    axios
      .put(
        "http://localhost:8000/api/updateProdt/" + props.editPid,
        updatedDetails,
        {
          headers: {
            Authorization: adminToken || tokenFromLS,
            genericvalue: "admin",
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.viewProduct();
        props.listProduct()
        // props.setOpen(false);
        handleClose();
        // showDetails();
      });
  }
  //uploadingImage
  function UploadingImage(file, imageUrl) {
    setImageFile(file);
    setImagePath(imageUrl);
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            className="flex justify-center "
          >
            Update Current Product
          </Typography>
          <Typography
            id="modal-modal-description"
            className="flex flex-wrap justify-center items-center mt-2"
          >
            <img
              src={
                imagePath ? imagePath : productPic ? productPic : ProductImage
              }
              className="w-[200px] h-[200px]"
            ></img>
            
            <ImageUpload UploadingImage={UploadingImage} />
            {/* <img src={ProductImage} className="w-[200px] h-[200px]"></img> */}
            <form className="w-full max-w-lg  justify-center flex flex-col">
              <div className="flex flex-wrap -mx-3  p-3 gap-5">
                <div className="flex flex-col">
                  <label
                    id="pname"
                    className="text-gray-700 font-bold text-xs uppercase mb-2"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    htmlFor="pname"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="product name"
                    value={productName}
                    onInput={(e) => setProductName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label
                    id="category"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    htmlFor="category"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="category"
                    value={category}
                    onInput={(e) => setCategory(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3  p-3 gap-5">
                <div className="flex flex-col">
                  <label
                    id="pprice"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Product Price
                  </label>
                  <input
                    type="text"
                    htmlFor="pprice"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="product price per item"
                    value={productPrice}
                    onInput={(e) => setProductPrice(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label
                    id="stock"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    htmlFor="stock"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="No.of items"
                    value={stock}
                    onInput={(e) => setStock(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3  p-3 gap-5">
                <div className="flex flex-col">
                  <label
                    id="details"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Product Details
                  </label>
                  <input
                    type="text"
                    htmlFor="details"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="product details"
                    value={productDetails}
                    onInput={(e) => setProductDetails(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label
                    id="offer"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Offer (in %)
                  </label>
                  <input
                    type="text"
                    htmlFor="offer"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="Offer in %"
                    value={offer}
                    onInput={(e) => setOffer(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3  p-3 gap-5">
                <div className="flex flex-col">
                  <label
                    id="color"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Colour
                  </label>
                  <input
                    type="text"
                    htmlFor="color"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="Color"
                    value={color}
                    onInput={(e) => setColor(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label
                    id="availability"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Availability 
                  </label>
                  <input
                    type="text"
                    htmlFor="availability"
                    className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                    placeholder="availability"
                    value={availability}
                    onInput={(e) => setAvailability(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-wrap p-3 gap-5 justify-center">
                <div className="flex flex-col">
                  <button
                    className="btn font-bold flex justify-center gap-1 pl-3 pr-3"
                    onClick={editProductDetails}
                  >
                    <LiaEditSolid className="text-xl" />
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
