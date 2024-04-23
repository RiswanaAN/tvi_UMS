import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductPic from "../../assets/imageProduct.png";
import { LiaRupeeSignSolid } from "react-icons/lia";
import "./AdminProductHome.css";
import { useNavigate } from "react-router-dom";
import AdminAddProduct from "./AdminAddProduct";
import PaginationTable from "../../components/Pagination/Pagination";
import AdminProductView from "./AdminProductView";

function AdminProductHomePage() {
  const [products, setProducts] = useState([]);
  const [viewId, setViewId] = useState("");
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const [productImage, setProductImage] = useState("");

  //viewProduct
  const [viewProductOpen, setViewProductOpen] = React.useState(false);
  function viewProductDetails(id) {
    setViewId(id);
    // console.log(id);
    setViewProductOpen(true);
    // console.log("hey hello");
  }
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
        {products.map((product) => {
          if (product.image.length > 0) {
            const image = product.image[0]?.data;
            
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(image))
            );
            var imageUrl = `data:image/jpeg;base64,${base64String}`;
          }
          return (
            <button
              key={product._id}
              className="bg-[#e9ecef] flex flex-col w-[280px] h-[300px] rounded-lg items-center shadow-xl "
              onClick={() => viewProductDetails(product._id)}
            >
              <div>
              {product.image.length>0 ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-[130px] h-[140px] m-6"
                />
              ) : (
                <img src={ProductPic} className="w-[130px] m-6"></img>
                )}  
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1>{product.title}</h1>
                <div className="flex items-center">
                  <LiaRupeeSignSolid className="text-[12px] text-gray-800" />
                  <p className="text-[20px] text-gray-800">
                  {product.price-(product.price*product.offer/100)}
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
              {/* <div className="flex flex-col gap-6 mt-7">
              <button className="btn">Add to cart</button>
              <button className="btn">Buy Now</button>
            </div> */}
            </button>
          );
        })}
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
        <AdminProductView
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

export default AdminProductHomePage;
