import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImage from "../../assets/imageProduct.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiElectric } from "react-icons/gi";
import { BiCartDownload } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

export default function ViewUP(props) {
  const [singleProduct, setSingleProduct] = React.useState({});
  const [noOfStock, setNoOfStock] = React.useState("");
  const [noOfItem, setNoOfItem] = React.useState(0);
  const [productImageUrl, setProductImageUrl] = React.useState("");
  //token from store
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  React.useEffect(() => {
    listcartItems();
  }, []);
  function listcartItems() {
    axios
      .get("http://localhost:8000/api/get-one/" + props.viewId, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setSingleProduct(response.data.result);
        setNoOfStock(response.data.result.stock);
        if (response.data.result.image.length > 0) {
          const image = response.data.result.image[0].data;
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(image))
          );

          var imageUrl = `data:image/jpeg;base64,${base64String}`;
          setProductImageUrl(imageUrl);
        }
      });
  }
  const handleClose = () => props.setOpen(false);

  //addToCart
  function addToCart(id) {
    setNoOfItem(noOfItem + 1);
    axios
      .post(
        "http://localhost:8000/api/add-to-cart/" + id,
        {},
        {
          headers: {
            Authorization: adminToken || tokenFromLS,
            genericvalue: "agent",
          },
        }
      )
      .then((response) => {
        handleClose();
      });
  }
  //remove Cart Item
  function removeCartItem(id) {
    axios
      .delete("http://localhost:8000/api/delete-cart/" + id, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        handleClose();
        props.listProduct();
      });
  }
  //remove from wishlist
  function removeFromWishList(id) {
    axios
      .delete("http://localhost:8000/api/delete-wishist/" + id, {
        headers: {
          Authorization: tokenFromLS || adminToken,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        handleClose();
        props.listProduct();
      });
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
            variant="h6"
            component="h2"
          ></Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex justify-center"
          >
            <div className="flex gap-[4px]">
              <div>
                {productImageUrl ? (
                  <img
                    src={productImageUrl}
                    alt="User"
                    className="h-[300px] w-[350px]"
                  />
                ) : (
                  <img src={ProductImage} className="h-[300px] w-[250px]"></img>
                )}{" "}
              </div>
              <div className="flex flex-col ml-[30px] w-[400px]  pr-[55px] items-center">
                <h1 className="text-[25px] ">{singleProduct.title}</h1>
                <div className="flex items-center justify-center">
                  <FaIndianRupeeSign className="text-[18px] text-gray-800" />

                  <p className="font-serif text-[25px]">
                    {singleProduct.discountedPrice}
                  </p>
                  <p className="italic text-sm pl-1"> /each</p>
                </div>
                <div>
                  <div>
                    <div className="flex italic font-serif text-[15px] gap-1">
                      <p>M.R.P:</p>
                      <p className="line-through flex items-center text-gray-800">
                        <FaIndianRupeeSign />
                        {singleProduct.price}
                      </p>
                    </div>
                    <p className="font-serif text-[15px] text-green-800">
                      ({singleProduct.offer}% off)
                    </p>
                  </div>
                </div>
                {noOfStock == 0 ? (
                  <p className="pt-4 text-red-700 italic">Out of Stock!!!</p>
                ) : noOfStock <= 5 ? (
                  <p className="pt-4 text-red-700 italic">
                    Only {noOfStock} items left!!!
                  </p>
                ) : (
                  ""
                )}

                <p className="pt-4 text-gray-700">
                  Category: {singleProduct.category}
                </p>
                <div>
                  <div className="italic text-sm text-gray-700 p-5 text-justify  w-full overflow-auto flex justify-center">
                    Description: {singleProduct.description}
                  </div>
                </div>
                <div className="flex gap-[40px] mb-3">
                  {props.currentPage == "store" ? (
                    <button
                      className="text-white flex w-[160px] h-[50px] items-center justify-center gap-2 pl-2 pr-2 bg-[#ff9f00] rounded-md"
                      onClick={() => addToCart(singleProduct._id)}
                    >
                      <BiCartDownload className="text-2xl" />
                      Add to Cart
                    </button>
                  ) : props.currentPage == "wishlist" ? (
                    <button
                      className="text-white flex w-[160px] h-[50px] items-center justify-center gap-2 pl-2 pr-2 bg-red-700 rounded-md"
                      onClick={() => removeFromWishList(singleProduct._id)}
                    >
                      <BiCartDownload className="text-2xl" />
                      Remove From Wishlist
                    </button>
                  ) : props.currentPage == "cart" ? (
                    <button
                      className="text-white flex w-[160px] h-[50px] items-center justify-center gap-2 pl-2 pr-2 bg-red-700 rounded-md"
                      onClick={() => removeCartItem(singleProduct._id)}
                    >
                      <AiOutlineDelete className="text-2xl" />
                      Remove
                    </button>
                  ) : (
                    <button
                      className="text-white flex w-[160px] h-[50px] items-center justify-center gap-2 pl-2 pr-2 bg-[#ff9f00] rounded-md"
                      onClick={() => addToCart(singleProduct._id)}
                    >
                      <BiCartDownload className="text-2xl" />
                      Add to Cart
                    </button>
                  )}
                  <button
                    className="text-white flex w-[160px] h-[50px] items-center justify-center gap-2 pl-2 pr-2 bg-[#fb641b] rounded-md"
                    onClick={(e) =>
                      props.dashboardMenu(
                        "buyproduct",
                        props.products,
                        props.viewId,
                        "","",
                        "fromSingleProductPage"
                      )
                    }
                  >
                    <GiElectric className="text-2xl" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
