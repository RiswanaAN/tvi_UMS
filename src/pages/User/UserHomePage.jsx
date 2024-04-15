import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSideBar from "./UserSideBar";
import UserNavbar from "./UserNavbar";
import UserDetails from "./UserDetails";
import ListUP from "../../Products/UserProducts/ListUP";
import CartList from "../../Products/UserProducts/CartList";
import WishList from "../../Products/UserProducts/WishList";
import BuyProduct from "../../Products/UserProducts/BuyProduct";
import AddAddress from "../../Products/UserProducts/UserAddress/AddAddress";
import EditAddress from "../../Products/UserProducts/UserAddress/EditAddress";
import AddressModal from "../../Products/UserProducts/UserAddress/AddressModal";

function UserHomePage() {
  const [menuClicks, setMenuClicks] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [products, setProducts] = useState({});
  const [address, setAddress] = useState({});
  const [allAddress, setAllAddress] = useState([]);
  const [fromPage, setFromPage]= useState("")
  const [pId, setPId] = useState("");
  const [user, setUser] = useState({});
  const [icon, setIcon] = useState("");
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setUser(response.data.result);
        const fName = response.data.result.firstName;
        const lName = response.data.result.lastName;
        const userIcon = fName.charAt(0) + lName.charAt(0);
        setIcon(userIcon);
      })
      .catch((error) => console.log(error));
  }, []);

  function clickMenuButton() {
    setMenuClicks((prev) => !prev);
  }
  const dashboardMenu = (msg, products, viewId, address, allAddress, fromPage) => {
    setSelectedMenu(msg);
    setProducts(products);
    setPId(viewId);
    setAddress(address);
    setAllAddress(allAddress)
    setFromPage(fromPage)

  };

  return (
    <div className="flex flex-col w-screen ">
      <div className="w-full">
        <UserNavbar clickMenuButton={clickMenuButton} icon={icon} />
      </div>
      <div className="flex h-[100vh]">
        <div
          className={`transition-all duration-500 ${
            menuClicks ? "w-[250px]" : "w-0"
          } overflow-hidden`}
        >
          <UserSideBar dashboardMenu={dashboardMenu} />
        </div>

        {selectedMenu == "profile" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Profile</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">
                  User Detail
                </p>
              </div>
            </div>

            <div className="w-full">
              <UserDetails />
            </div>
          </div>
        ) : selectedMenu == "store" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Store</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">Products</p>
              </div>
            </div>

            <div className="w-full">
              <ListUP
                selectedMenu={selectedMenu}
                dashboardMenu={dashboardMenu}
              />
            </div>
          </div>
        ) : selectedMenu == "wishlist" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Wishlist</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">Products</p>
              </div>
            </div>

            <div className="w-full">
              <WishList
                selectedMenu={selectedMenu}
                dashboardMenu={dashboardMenu}
              />
            </div>
          </div>
        ) : selectedMenu == "cart" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Cart</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">
                  Cart Items
                </p>
              </div>
            </div>

            <div className="w-full">
              <CartList
                selectedMenu={selectedMenu}
                dashboardMenu={dashboardMenu}
              />
            </div>
          </div>
        ) : selectedMenu == "buyproduct" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[30px] text-[#212529]">
              <h1 className="uppercase">Purchase Item</h1>
            </div>

            <div className="w-full">
              <BuyProduct
                dashboardMenu={dashboardMenu}
                address={address}
                products={products}
                pId={pId}
                fromPage= {fromPage}
              />
            </div>
          </div>
        ) : selectedMenu == "addressList" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Address</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">Address</p>
              </div>
            </div>

            <div className="w-full">
              <AddressModal
                products={products}
                pId={pId}
                dashboardMenu={dashboardMenu}
                fromPage={fromPage}
              />

            </div>
          </div>
        ) : selectedMenu == "addaddress" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Add Address</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">
                  Add Address
                </p>
              </div>
            </div>

            <div className="w-full">
              <AddAddress
                products={products}
                pId={pId}
                address={address}
                allAddress={allAddress}
                dashboardMenu={dashboardMenu}
              />
              {/* {console.log(products)} */}
            </div>
          </div>
        ) : selectedMenu == "editaddress" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">Edit Address</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">
                  Edit Address
                </p>
              </div>
            </div>

            <div className="w-full">
              <EditAddress
                address={address}
                pId={pId}
                dashboardMenu={dashboardMenu}
              />
              {/* {console.log(products)} */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">HomePage</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">Products</p>
              </div>
            </div>

            <div className="w-full">
              <ListUP
                selectedMenu={selectedMenu}
                dashboardMenu={dashboardMenu}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHomePage;
