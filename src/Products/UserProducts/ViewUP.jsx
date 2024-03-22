import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImage from "../../assets/imageProduct.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

export default function viewUP(props) {
  const [singleProduct, setSingleProduct] = React.useState({});
  //editProduct
  const [editProductOpen, setEditProductOpen] = React.useState(false);
  const [noOfStock, setNoOfStock] = React.useState("");
  const [editPid, setEditPid] = React.useState("");
  function editProduct(id) {
    setEditPid(id);
    setEditProductOpen(true);
  }

  //token from store
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-one/" + props.viewId, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        setSingleProduct(response.data.result);
        console.log(response.data.result);
        setNoOfStock(response.data.result.quantity);
      });
  }, []);
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
        console.log(response);
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
            <div className="flex gap-[50px]">
              <div>
                <img src={ProductImage} className="h-[300px] w-[250px]"></img>
              </div>
              <div className="flex flex-col w-[500px]  pr-[55px] items-center">
                {/* {console.log(singleProduct)} */}
                <h1 className="text-[25px] ">{singleProduct.productName}</h1>
                <div className="flex items-center justify-center text-[25px]">
                  <FaIndianRupeeSign />

                  <p className="font-serif text-[30px]">
                    {singleProduct.productPrice}
                  </p>
                  <p className="italic text-sm pl-1"> /each</p>
                </div>
                {noOfStock == 0 ? (
                  <p className="pt-4 text-red-700 italic">Out of Stock!!!</p>
                ) : noOfStock <= 5 ? (
                  <p className="pt-4 text-red-700 italic">
                    Only {noOfStock} items left!!!
                  </p>
                ) : (
                  ""
                )}
                <p className="pt-4 text-gray-700">
                  Category: {singleProduct.category}
                </p>
                <div>
                  <div className="italic text-sm text-gray-700 p-5 text-justify h-[150px] w-full overflow-auto flex justify-center">
                    Description: {singleProduct.productDetails}
                  </div>
                </div>
                <div className="flex gap-[200px] mt-3 mb-3">
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
      {/* {editProductOpen ? (
        <EditAdminProduct
          open={editProductOpen}
          setOpen={setEditProductOpen}
          editPid={editPid}
          products={props.products}
        />
      ) : (
        ""
      )} */}
    </div>
  );
}
