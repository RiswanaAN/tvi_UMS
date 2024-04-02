import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaginationTable from "../../components/Pagination/Pagination";
import ViewUP from "../UserProducts/ViewUP";
import ProductImage from "../../assets/imageProduct.png";
import { BiDollar } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

import "../../Products/AdminProducts/AdminProductHome.css";

function WishList(props) {
  const [wishlistItem, setWishlistItem] = useState([]);
  const [viewId, setViewId] = useState("");
  // const [count,setCount]= use
//   const [wishlistProduct, setWishlistProduct] = useState([]);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id) {
    setViewId(id);
    setViewProductOpen(true);
  }
  
  //function to list all products
  function listWishlistItems() {
    axios
      .get("http://localhost:8000/api/wishlist", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setWishlistItem(response.data.result[0]);
        console.log(response.data.result[0]);
        
      });
  }
  useEffect(() => {
    listWishlistItems();
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex justify-evenly gap-[75px] flex-wrap p-7">
        {console.log("hellooooo i am from wishlist")}
        {wishlistItem?.results?.map((wishlistItem) => (
          <>
            <button className="bg-[#e9ecef] flex flex-col w-[280px] h-[300px] rounded-lg items-center shadow-xl relative hover:scale-110">
             
              <div
                onClick={() => viewProductDetails(wishlistItem._id)}
                className="mt-[40px] w-full h-full flex flex-col justify-center items-center"
              >
                <div>
                  <img src={ProductImage} className="w-[130px] m-6"></img>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1>{wishlistItem.title}</h1>
                  <div className="flex items-center">
                    <BiDollar />
                    <p>{wishlistItem.discountedPrice}</p>
                    
                  </div>
                </div>
              </div>
           
            </button>
          </>
        ))}
      </div>
      {/* <div className="m-4">
        <PaginationTable totalNumber={totalProduct} currentPage={currentPage} />
      </div> */}
      {viewProductOpen ? (
        <ViewUP
          currentPage= {props.selectedMenu}
          viewId={viewId}
          open={viewProductOpen}
          setOpen={setViewProductOpen}
          listProduct={listWishlistItems}
          products={wishlistItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default WishList;
