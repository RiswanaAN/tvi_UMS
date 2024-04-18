import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ViewUP from "../UserProducts/ViewUP";
import ProductImage from "../../assets/imageProduct.png";
import { FaIndianRupeeSign } from "react-icons/fa6";
import EmptyCartImage from "../../assets/emptycart.jpg";
import "../../Products/AdminProducts/AdminProductHome.css";

function CartList(props) {
  const [cartItems, setCartItems] = useState([]);
  const [viewId, setViewId] = useState("");
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id) {
    setViewId(id);
    setViewProductOpen(true);
  }

  //function to list all products
  function listCartItems() {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setCartItems(response.data.results[0]);
      });
  }
  useEffect(() => {
    listCartItems();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-evenly gap-[75px] flex-wrap  w-full">
        {cartItems?.results?.length > 0 ? ( // Check if cartItems is not empty
          cartItems.results.map((items) => {
            if (items.image.length > 0) {
              const image = items.image[0];
              var imageUrl = `data:image/jpeg;base64,${image}`;
            }
            return (
              <>
                <button className="bg-[#e9ecef] flex flex-col w-[280px] h-[320px] rounded-lg items-center shadow-xl relative hover:scale-110">
                  <div
                    onClick={() => viewProductDetails(items.productId)}
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                    <div>
                      {items.image.length > 0 ? (
                        <img
                          src={imageUrl}
                          alt={items.title}
                          className="w-[130px] m-6"
                        />
                      ) : (
                        <img src={ProductImage} className="w-[130px] m-6"></img>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <h1>{items.title}</h1>
                      <div className="flex items-center">
                        <FaIndianRupeeSign className="text-[15px] text-gray-800" />
                        <p>{items.discountedPrice}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </>
            );
          })
        ) : (
          // If cartItems is empty, display "Empty cart"
          <div className="text-center text-gray-800 text-[25px] flex flex-col">
            <img src={EmptyCartImage} className="w-[0px]"/>
            <p className="text-3xl">Your Cart is Empty!!!</p>
            <button
              className="border p-3 mt-7 text-xl text-white bg-gray-600 shadow-xl rounded-lg hover:bg-white hover:text-gray-600 hover:border-gray-700 "
              onClick={() => props.dashboardMenu("store")}
            >
              Shop Now
            </button>
          </div>
        )}
      </div>
      {cartItems.results && cartItems.results.length > 0 && (
        <div className="flex items-center justify-center w-full">
          <div className="flex justify-between items-center w-full p-[25px]  m-[10px] border rounded-lg">
            <div className="flex text-[20px] items-center italic">
              <p>Total Cost: </p>
              <div className="flex items-center pl-4  text-green-700">
                <FaIndianRupeeSign className="text-[15px] text-gray-800" />
                <p className="text-[25px]">{cartItems.total} /-</p>
              </div>
            </div>
            <button
              className="btn2 hover:opacity-[0.8] w-[150px]"
              onClick={() => {
                props.dashboardMenu(
                  "buyproduct",
                  "",
                  "",
                  "",
                  "",
                  "fromCartPage"
                );
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {viewProductOpen ? (
        <ViewUP
          currentPage={props.selectedMenu}
          viewId={viewId}
          open={viewProductOpen}
          setOpen={setViewProductOpen}
          listProduct={listCartItems}
          products={cartItems.results}
          dashboardMenu={props.dashboardMenu}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default CartList;
