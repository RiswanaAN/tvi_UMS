import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductImage from "../../assets/imageProduct.png";
import { BiDollar } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminAddProduct from "../AdminProducts/AdminAddProduct";
import PaginationTable from "../../components/Pagination/Pagination";
import ViewUP from "../UserProducts/ViewUP";
import "../../Products/AdminProducts/AdminProductHome.css";

function ListUP() {
  const [products, setProducts] = useState([]);
  const [viewId, setViewId] = useState("");
  const [wishlistId, setWishlistId] = useState("");
  const [wishlistProduct, setWishlistProduct]= useState([])
  const [addWishlist, setAddWishlist] = useState(false);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id) {
    setViewId(id);
    setViewProductOpen(true);
  }
  //addwishlist
  function addToWishlist(id) {
    setAddWishlist((prev) => !prev);
    if(!wishlistProduct.includes(id)){
        wishlistProduct.push(id)
    }
    console.log(wishlistProduct);
    setWishlistId(id);
    
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
          genericvalue: "admin",
        },
      })
      .then((response) => {
        setTotalProduct(response.data.totalCount);
        setProducts(response.data.products);
        console.log(response.data.products);
      });
  }
  useEffect(() => {
    listProduct();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      {/* <button className="btn w-[250px] m-4" onClick={handleOpen}>
        Add Product
      </button> */}
      <div className="flex justify-evenly gap-[75px] flex-wrap p-7">
        {products.map((product) => (
            <>
            
          <button
            className="bg-[#e9ecef] flex flex-col w-[280px] h-[300px] rounded-lg items-center shadow-xl relative hover:scale-110"
            
          >
            {/* {console.log(product._id)} */}
            <button
            className={`absolute text-xl  text-gray-700 right-2 top-2  ${
              addWishlist ? "text-red-700" : ""
            }`}
            onClick={() => {
              addToWishlist(product._id);
            }}
          >
            <FaRegHeart />
          </button>

            <div onClick={() => viewProductDetails(product._id)} className="mt-[40px] w-full h-full flex flex-col justify-center items-center">
            <div>
              <img src={ProductImage} className="w-[130px] m-6"></img>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>{product.productName}</h1>
              <div className="flex items-center">
                <BiDollar />
                <p>{product.productPrice}</p>
              </div>
            </div></div>
            {/* <div className="flex flex-col gap-6 mt-7">
              <button className="btn">Add to cart</button>
              <button className="btn">Buy Now</button>
            </div> */}
          </button>
          </>
        ))}
      </div>
      <div className="m-4">
        <PaginationTable totalNumber={totalProduct} currentPage={currentPage} />
      </div>
      {/* to show add product modal
      {addProductOpen ? (
        <AdminAddProduct open={addProductOpen} setOpen={setAddProductOpen} />
      ) : (
        ""
      )} */}
      {/* to show product view modal */}
      {viewProductOpen ? (
        <ViewUP
          viewId={viewId}
          open={viewProductOpen}
          setOpen={setViewProductOpen}
          listProduct={listProduct}
          products={products}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ListUP;
