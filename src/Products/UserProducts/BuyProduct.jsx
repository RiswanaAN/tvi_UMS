import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressModal from "./UserAddress/AddressModal";
import ProductImage from "../../assets/imageProduct.png";
import { BsCart3 } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaIndianRupeeSign } from "react-icons/fa6";

import "./ListUP.css";
import PlaceOrderConfirm from "./PlaceOrderConfirm";

function BuyProduct(props) {
  const [addresses, setAddresses] = useState([]);
  const [singleAddresses, setSingleAddresses] = useState({});
  const [singleProduct, setSingleProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [fromPage, setFromPage] = useState("");
  const [productImageUrl, setProductImageUrl] = React.useState("");
  const [quantity, setQuantity] = useState("1");
  const [openAddressModal, setOpenAddressModal] = React.useState(false);
  const [placeOrderConfirm, setPlaceOrderConfirm] = React.useState(false);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  function viewSingleAddress() {
    axios
      .get("http://localhost:8000/api/address-view", {
        headers: {
          Authorization: tokenFromLS || adminToken,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setAddresses(response.data.result[0].address);
        props.address
          ? setSingleAddresses(props.address)
          : setSingleAddresses(response.data.result[0].address[0]);
      });
  }
  useEffect(() => {
    viewSingleAddress();
    if (props.fromPage == "fromSingleProductPage") {
      setFromPage(props.fromPage);
      setSingleProduct(
        props.products.find((product) => product._id == props.pId)
      );
      setTimeout(() => {
        const image = singleProduct?.image[0]?.data;
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(image))
        );

        var imageUrl = `data:image/jpeg;base64,${base64String}`;
        setProductImageUrl(imageUrl);
      }, 1000);
    } else {
      setFromPage(props.fromPage);
      axios
        .get("http://localhost:8000/api/cart", {
          headers: {
            Authorization: adminToken || tokenFromLS,
            genericvalue: "agent",
          },
        })
        .then((response) => {
          setCartProducts(response.data.results[0]);
        });
      let sum = 0;

      setTimeout(() => {
        cartProducts.map((prdt) => {
          sum = sum + prdt.discountedPrice;

        });
        // console.log(sum);
      }, 1000);
    }
  }, []);

  //place single product
  function placeSingleProduct(id){
    const addId = singleAddresses._id;
    axios
    .post(
      "http://localhost:8000/api/orderSingle/"+id,
      {
        addId,
      },
      {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      }
    )
    .then((response) => {
      setPlaceOrderConfirm(true);
    });
  }

  //place the order
  function placeYourOrder() {
    const addId = singleAddresses._id;
    axios
      .post(
        "http://localhost:8000/api/order",
        {
          addId,
        },
        {
          headers: {
            Authorization: adminToken || tokenFromLS,
            genericvalue: "agent",
          },
        }
      )
      .then((response) => {
        setPlaceOrderConfirm(true);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="btn w-[250px] m-3"
        onClick={() => props.dashboardMenu("store")}
      >
        Back
      </button>
      <div className="rounded-lg bg-[#e9ecef] w-full ml-7 mr-7">
        <div className="border-b-white border-b-4 gap-3 p-3 flex  items-center justify-start pl-7 uppercase text-[18px]">
          <FaRegAddressCard />
          <h1>Delivery Address</h1>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex flex-col p-6 uppercase  text-md">
              <h1 className="text-lg font-semibold">
                {singleAddresses.fullName}
              </h1>
              <p>
                {singleAddresses.buildingName} {singleAddresses.area}
              </p>
              <p>
                {singleAddresses.city} {singleAddresses.state} ,
                {singleAddresses.pincode}
              </p>
              <p className="italic">Ph No: {singleAddresses.phoneNumber}</p>
            </div>
          </div>
          <div>
            <button
              className="btn w-[150px] m-4"
              onClick={() =>
                props.dashboardMenu(
                  "addressList",
                  props.products,
                  props.pId,
                  "",
                  "",
                  props.fromPage
                )
              }
            >
              Change
            </button>
          </div>
        </div>
      </div>
      {/* //cart items */}
      <div className="rounded-lg bg-[#e9ecef] w-full ml-7 mr-7 mt-2">
        <div className="border-b-white border-b-4 gap-3 p-3 flex  items-center justify-start pl-7 uppercase text-[18px]">
          <BsCart3 />

          <h1>Products</h1>
        </div>
        {props.fromPage == "fromSingleProductPage" ? (
          <div className="flex justify-between pb-4 border">
            <div className="flex flex-col items-center">
              <div className="flex flex-col p-6 uppercase  text-md">
                {productImageUrl ? (
                  <img
                    src={productImageUrl}
                    alt="User"
                    className="h-[100px] w-[100px]"
                  />
                ) : (
                  <img src={ProductImage} className="h-[100px] w-[150px]"></img>
                )}
              </div>
              <p className="text-[20px] italic">{singleProduct.title}</p>
              <select
                className="border bg-white pr-5 pl-5 pt-2 pb-2 text-lg font-semibold hover:cursor-pointer rounded-2xl"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="p-5 mr-[60px] w-[400px]">
              <div className="flex justify-between">
                <p>Price:</p>
                <div className=" gap-3 items-center">
                  <p className="flex items-center text-lg text-green-600">
                    <LiaRupeeSignSolid />
                    {singleProduct.discountedPrice * quantity}/-
                  </p>
                  <p className="line-through italic ml-4">
                    {singleProduct.price * quantity} /-
                  </p>
                </div>
              </div>
              <div className="flex justify-between border pb-2 border-b-gray-600 w-[400px]">
                <p>Delivery Fee:</p>
                <div className="flex  items-center">
                  <LiaRupeeSignSolid />
                  <p className="line-through mr-[30px]">40 /-</p>
                </div>
              </div>
              <div className="flex justify-between text-2xl mt-4 italic text-red-800">
                <p>Order Total:</p>
                <div className="flex items-center">
                  <LiaRupeeSignSolid />
                  <p>{singleProduct.discountedPrice * quantity}/-</p>
                </div>
              </div>
              <div className="flex mt-[25px] gap-2 italic text-green-600">
                <p>You saved:</p>
                <p>
                  {singleProduct.price * quantity -
                    singleProduct.discountedPrice * quantity}
                  /- ({singleProduct.offer}%)
                </p>
              </div>
              <div className="flex justify-center ml-[20px]">
                <button
                  className="btn bg-[#2f4f4f] text-white hover:bg-white hover:text-[#2f4f4f] w-full m-4"
                  onClick={()=>placeSingleProduct(singleProduct._id)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {cartProducts.results?.map((cartProduct) => (
              <div className="flex justify-between pb-4 border border-b border-white">
                <div className="flex gap-[255px]">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col p-6 uppercase  text-md">
                      {cartProduct.image[0] ? (
                        <img
                          src={`data:image/jpeg;base64,${cartProduct.image[0]}`}
                          alt="User"
                          className="h-[100px] w-[100px]"
                        />
                      ) : (
                        <img
                          src={ProductImage}
                          className="h-[100px] w-[150px]"
                        ></img>
                      )}
                    </div>

                    <select
                      className="border bg-white pr-5 pl-5 pt-2 pb-2 w-[100px] text-lg font-semibold hover:cursor-pointer rounded-2xl"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="p-5 mr-[60px] w-[400px] ">
                    <p>{cartProduct.title}</p>
                    <div className="flex justify-between">
                      <p>Discounted Price:</p>
                      <div className=" gap-3 items-center">
                        <p className="flex items-center text-lg text-green-600">
                          <LiaRupeeSignSolid />
                          {cartProduct.discountedPrice * quantity}/-
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between border pb-2  w-[400px]">
                      <p>Price:</p>
                      <div className="flex  items-center">
                        <LiaRupeeSignSolid />
                        <p className="line-through mr-[30px]">
                          {cartProduct.price * quantity}/-
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-[25px] gap-2 italic text-green-600">
                      <p>You saved:</p>
                      <p>
                        {cartProduct.price * quantity -
                          cartProduct.discountedPrice * quantity}
                        /- ({cartProduct.offer}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {props.fromPage == "fromCartPage" ? (
          <div className="flex items-center  w-full ">
            <div className="flex  items-center justify-between w-full p-[25px] m-[10px] border bg-gray-300 rounded-lg">
              <div className="flex text-[20px] items-center">
                <p>Total Cost: </p>
                <div className="flex items-center pl-4  text-green-700">
                  <FaIndianRupeeSign className="text-[15px] text-gray-800" />
                  <p className="text-[25px]">{cartProducts.total} /-</p>
                </div>
              </div>
              <button
                className="btn hover:opacity-[0.8] w-[150px]"
                onClick={placeYourOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {openAddressModal ? (
        <AddressModal
          open={openAddressModal}
          setOpen={setOpenAddressModal}
          addresses={addresses}
          dashboardMenu={props.dashboardMenu}
          nextPage={fromPage}
        />
      ) : (
        ""
      )}
      {placeOrderConfirm ? (
        <PlaceOrderConfirm
          open={placeOrderConfirm}
          setOpen={setPlaceOrderConfirm}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default BuyProduct;
