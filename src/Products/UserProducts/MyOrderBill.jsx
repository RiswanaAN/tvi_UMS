import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import ProductImage from "../../assets/imageProduct.png";

function MyOrderBill() {
  const [orderedProduct, setOrderedProduct] = useState([]);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  function showMyOrders() {
    axios
      .get("http://localhost:8000/api/order-productlist", {
        headers: {
          Authorization: adminToken || tokenFromLS,
        },
      })
      .then((response) => {
        setOrderedProduct(response.data.results);
      });
  }
  useEffect(() => {
    showMyOrders();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5 p-3 overflow-scroll h-[">
    
      {orderedProduct.map((item, i) => {
        if (item.product.image.length > 0) {
          const image = item.product.image[0];
          var imageUrl = `data:image/jpeg;base64,${image}`;
        }

        return (
          <>
            <button
              className="bg-[#e9ecef]  w-[500px] pr-5 rounded-lg items-center shadow-xl relative hover:scale-110"
              key={i}
            >
              <div className="w-full h-full flex justify-between items-center">
                <div>
                  {item.product.image.length > 0 ? (
                    <img
                      src={imageUrl}
                      alt={item.product.title}
                      className="w-[140px] m-6"
                    />
                  ) : (
                    <img src={ProductImage} className="w-[140px] m-6"></img>
                  )}{" "}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1>{item.product.title}</h1>
                  <div className="flex items-center">
                    <LiaRupeeSignSolid className="text-[18px] text-gray-800" />
                    <p className="text-[25px] text-gray-800">
                      {item.product.discountedPrice}
                    </p>
                  </div>
                  <div className="flex items-center italic text-gray-700 gap-3">
                    <div className="flex items-center">
                      <p className="text-[12px]">M.R.P: </p>
                      <div className="flex items-center line-through">
                        <LiaRupeeSignSolid className="text-[12px] text-gray-500 line-through" />
                        <p className="text-[14px] text-gray-500">
                          {item.product.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-green-700">
                      ({item.product.offer}% off)
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </>
        );
      })}
    </div>
  );
}

export default MyOrderBill;
