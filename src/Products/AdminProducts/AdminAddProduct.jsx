import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImage from "../../assets/imageProduct.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function AdminAddProduct(props) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [category, setCategory] = useState("");
  const [offer, setOffer] = useState("");
  const [stock, setStock] = useState("");
  const [productPic, setProductPic] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageFile, setImageFile] = useState({});
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const handleClose = () => props.setOpen(false);

  function addNewProduct(e) {
    e.preventDefault();

    const product = new FormData();
    product.append("title", productName);
    product.append("price", productPrice);
    product.append("description", productDetails);
    product.append("category", category);
    product.append("offer", offer);
    product.append("stock", stock);
    product.append("color", "red");
    product.append("availability", "yes");
    product.append("image", imageFile)

    axios
      .post("http://localhost:8000/api/addProdt", product, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log(response);
        props.setOpen(false);
        props.listProduct();
        // navigate("/admin/product");
      });
  }
 //uploadingImage
 function UploadingImage(file, path) {
  setImageFile(file)
  setImagePath(path);
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
            Add New Product
          </Typography>
          <Typography
            id="modal-modal-description"
            className="flex flex-wrap justify-center items-center mt-2"
          >
            {/* {console.log(imageUrl)} */}
             <img
              src={
                imagePath ? imagePath : ProductImage
              }
              className="w-[200px] h-[200px]"
            ></img>
            <ImageUpload UploadingImage={UploadingImage} />
          
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
                    id="offer"
                    className="text-gray-700 font-bold text-xs uppercase mb-2 "
                  >
                    Offer (in %)
                  </label>
                  <input
                    type="text"
                    htmlFor="ofer"
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
              <div className="flex flex-wrap p-3 gap-5 justify-center">
                <div className="flex flex-col">
                  <button className="btn font-bold" onClick={addNewProduct}>
                    Add Product
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
