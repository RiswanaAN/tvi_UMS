import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ViewUP from "../UserProducts/ViewUP";
import ProductImage from "../../assets/imageProduct.png";
import { BiDollar } from "react-icons/bi";
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
    <div className="flex flex-col justify-center items-center ">
      <div className="flex justify-evenly gap-[75px] flex-wrap p-7 ">
        {cartItems?.results?.map((items) => {
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
                      <BiDollar />
                      <p>{items.discountedPrice}</p>
                    </div>
                  </div>
                </div>
              </button>
            </>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex justify-between items-center gap-[950px] p-[25px] m-[10px] border rounded-lg">
          <p>Price</p>
          <button
            className="btn2 hover:opacity-[0.8] w-[150px]"
            onClick={() => {
              props.dashboardMenu("buyproduct","","","","", "fromCartPage");
            }}
          >
            Place Order
          </button>
        </div>
      </div>
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
