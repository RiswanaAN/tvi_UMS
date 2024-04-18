import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaginationTable from "../../components/Pagination/Pagination";
import ViewUP from "../UserProducts/ViewUP";
import ProductImage from "../../assets/imageProduct.png";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

import "../../Products/AdminProducts/AdminProductHome.css";

function ListUP(props) {
  const [products, setProducts] = useState([]);
  const [viewId, setViewId] = useState("");
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id) {
    setViewId(id);
    setViewProductOpen(true);
  }
  //addwishlist and deletefromWishlist
  function addOrDeleteWishlist(id) {
    if (wishlistProduct.includes(id)) {
      axios
        .delete("http://localhost:8000/api/delete-wishist/" + id, {
          headers: {
            Authorization: tokenFromLS || adminToken,
            genericvalue: "agent",
          },
        })
        .then((response) => {
          setWishlistProduct(
            wishlistProduct.filter((productId) => productId !== id)
          );
        });
    } else {
      axios
        .post(
          "http://localhost:8000/api/add-to-wishlist/" + id,
          {},
          {
            headers: {
              Authorization: adminToken || tokenFromLS,
              genericvalue: "agent",
            },
          }
        )
        .then((response) => {
          setWishlistProduct([...wishlistProduct, id]);
        });
    }
  }

  //pagination
  const [totalProduct, setTotalProduct] = useState();

  function currentPage(pageno) {
    listProduct(pageno);
  }
  //function to list all products
  function listProduct(no = 1) {
    axios
      .get("http://localhost:8000/api/getProdt?page=" + no, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        // console.log(response);
        setTotalProduct(response.data.totalCount);
        setProducts(response.data.products);
        axios
        .get("http://localhost:8000/api/wishlist", {
          headers: {
            Authorization: adminToken || tokenFromLS,
            genericvalue: "agent",
          },
        })
        .then((response) => {
          const wishListProduct= response.data.result[0].results
          wishListProduct.map((wishlistItem)=>{
            setWishlistProduct(prev=>[...prev, wishlistItem._id]);
          })
        }
        );
      });
  }
  useEffect(() => {
    listProduct();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex justify-evenly gap-[75px] flex-wrap p-7">
        {products.map((product,i) => {
          if (product.image.length > 0) {
            const image = product.image[0]?.data;

            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(image))
            );
            var imageUrl = `data:image/jpeg;base64,${base64String}`;
          }

          return (
            <>
              <button className="bg-[#e9ecef] flex flex-col w-[280px] h-[350px] rounded-lg items-center shadow-xl relative hover:scale-110" key={i}>
                <button
                  className="absolute text-xl  text-gray-700 right-2 top-2"
                  onClick={() => {
                    addOrDeleteWishlist(product._id);
                  }}
                >
                  {wishlistProduct.includes(product._id) ? (
                    <BsHeartFill className="text-red-500" />
                  ) : (
                    <BsHeart />
                  )}
                </button>

                <div
                  onClick={() => viewProductDetails(product._id)}
                  className="w-full h-full flex flex-col justify-center items-center"
                >
                  <div>
                    {product.image.length > 0 ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-[140px] m-6"
                      />
                    ) : (
                      <img src={ProductImage} className="w-[140px] m-6"></img>
                    )}{" "}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h1>{product.title}</h1>
                    <div className="flex items-center">
                      <LiaRupeeSignSolid className="text-[18px] text-gray-800" />
                      <p className="text-[25px] text-gray-800">
                        {product.discountedPrice}
                      </p>
                    </div>
                    <div className="flex items-center italic text-gray-700 gap-3">
                      <div className="flex items-center">
                        <p className="text-[12px]">M.R.P: </p>
                        <div className="flex items-center line-through">
                          <LiaRupeeSignSolid className="text-[12px] text-gray-500 line-through" />
                          <p className="text-[14px] text-gray-500">
                            {product.price}
                          </p>
                        </div>
                      </div>
                      <p className="text-green-700">({product.offer}% off)</p>
                    </div>
                  </div>
                </div>
              </button>
            </>
          );
        })}
      </div>
      <div className="m-4">
        <PaginationTable totalNumber={totalProduct} currentPage={currentPage} />
      </div>
      {/* {console.log("its= "+props.selectedMenu,props.dashboardMenu)} */}
      {viewProductOpen ? (
        <ViewUP
          currentPage={props.selectedMenu}
          viewId={viewId}
          open={viewProductOpen}
          setOpen={setViewProductOpen}
          listProduct={listProduct}
          products={products}
          dashboardMenu={props.dashboardMenu}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ListUP;
