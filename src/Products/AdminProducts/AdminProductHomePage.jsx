import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductImage from "../../assets/imageProduct.png";
import { BiDollar } from "react-icons/bi";
import "./AdminProductHome.css";
import { useNavigate } from "react-router-dom";
import AdminAddProduct from "./AdminAddProduct";
import { Pagination } from "@mui/material";
import PaginationTable from "../../components/Pagination/Pagination";
import AdminProductView from "./AdminProductView";

function AdminProductHomePage() {
  const [products, setProducts] = useState([]);
  const [viewId, setViewId]= useState("")
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id){
    setViewId(id)
    // console.log(id);
    setViewProductOpen(true);
    // console.log("hey hello");
  };
  //addProduct
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const handleOpen = () => setAddProductOpen(true);
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
      <button className="btn w-[250px] m-4" onClick={handleOpen}>
        Add Product
      </button>
      <div className="flex justify-evenly gap-[35px] flex-wrap">
        {products.map((product) => (
          <button
            className="bg-[#e9ecef] flex flex-col w-[280px] h-[300px] rounded-lg items-center shadow-xl "
            onClick={()=>viewProductDetails(product._id)}
          >
            {/* {console.log(product._id)} */}
            <div>
              <img src={ProductImage} className="w-[130px] m-6"></img>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>{product.productName}</h1>
              <div className="flex items-center">
                <BiDollar />
                <p>{product.productPrice}</p>
              </div>
            </div>
            {/* <div className="flex flex-col gap-6 mt-7">
              <button className="btn">Add to cart</button>
              <button className="btn">Buy Now</button>
            </div> */}
          </button>
        ))}
      </div>
      <div className="m-4">
        <PaginationTable totalNumber={totalProduct} currentPage={currentPage} />
      </div>
      {/* to show add product modal */}
      {addProductOpen ? (
        <AdminAddProduct open={addProductOpen} setOpen={setAddProductOpen} />
      ) : (
        ""
      )}
      {/* to show product view modal */}
      {viewProductOpen ? (
       
        <AdminProductView viewId={viewId} open={viewProductOpen} setOpen={setViewProductOpen} listProduct={listProduct} products={products}/>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminProductHomePage;
