import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImage from "../../assets/imageProduct.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import EditAdminProduct from "./EditAdminProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  // height: 450,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

export default function AdminProductView(props) {
  const [singleProduct, setSingleProduct] = React.useState({});
  //editProduct
  const [editProductOpen, setEditProductOpen] = React.useState(false);
  const [editPid, setEditPid] = React.useState("");
  const [productImageUrl, setProductImageUrl] = React.useState("");
  function editProduct(id) {
    setEditPid(id);
    setEditProductOpen(true);
  }

  //token from store
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  React.useEffect(() => {
    viewProduct();
  }, []);
  function viewProduct() {
    axios
      .get("http://localhost:8000/api/get-one/" + props.viewId, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log("heyy",response.data.result);
        setSingleProduct(response.data.result);
        // console.log(response.data.result.image[0]?.data)
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

  function deleteProduct(id) {
    axios
      .delete("http://localhost:8000/api/deleteProduct/" + id, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        props.setOpen(false);
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
            <div className="flex gap-[0px]">
              <div>
              
                {productImageUrl ? (
                  <img
                    src={productImageUrl}
                    alt="User"
                    className="h-[300px] w-[350px]"
                  />
                ) : (
                  <img src={ProductImage} className="h-[300px] w-[250px]"></img>
                )}
              </div>
              <div className="flex flex-col w-[500px]  pr-[55px] items-center">
                <h1 className="text-[25px] ">{singleProduct.title}</h1>
                <div className="flex items-center justify-center text-[25px]">
                  <LiaRupeeSignSolid className="text-[12px] text-gray-800" />

                  <p className="font-serif text-[30px]">
                    {singleProduct.price -
                      (singleProduct.price * singleProduct.offer) / 100}
                  </p>
                  <p className="italic text-sm pl-1"> /each</p>
                </div>
                <div className="flex items-center italic text-gray-700 gap-3">
                  <div className="flex items-center">
                    <p>M.R.P: </p>
                    <div className="flex items-center line-through">
                      <LiaRupeeSignSolid className="text-[12px] text-gray-800" />
                      <p>{singleProduct.price}</p>
                    </div>
                  </div>
                  <p>({singleProduct.offer}% off)</p>
                </div>
                <p className="pt-4 text-gray-700">
                  No.of stock: {singleProduct.stock}
                </p>
                <p className="pt-4 text-gray-700">
                  Category: {singleProduct.category}
                </p>
                <div>
                  <div className="italic text-sm text-gray-700 p-5 text-justify h-[150px] w-full overflow-auto flex justify-center">
                    Description: {singleProduct.description}
                  </div>
                </div>
                <div className="flex gap-[200px] ">
                  <button
                    className="text-[40px] btn"
                    onClick={() => editProduct(singleProduct._id)}
                  >
                    <RiEdit2Fill />
                  </button>
                  <button
                    className="text-[40px] btn"
                    onClick={() => deleteProduct(singleProduct._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      {editProductOpen ? (
        <EditAdminProduct
          open={editProductOpen}
          setOpen={setEditProductOpen}
          editPid={editPid}
          products={props.products}
          listProduct={props.listProduct}
          viewProduct={viewProduct}
        />
      ) : (
        ""
      )}
    </div>
  );
}
