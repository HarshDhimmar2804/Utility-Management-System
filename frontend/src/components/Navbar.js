import React from "react";
import BtnPrimary from "./BtnPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch user data when component mounts
  //   const fetchUserName = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:9000/auth/signup", {
  //         withCredentials: true,
  //       });
  //       if (res.status === 200 && res.data.isAuthenticated) {
  //         setUserName(res.data.user.fullName); // Assuming 'fullName' is available in the token
  //       } else {
  //         setUserName("Guest"); // Set default user name if not authenticated
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserName();
  // }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="bg-white shadow-md h-16 flex items-center justify-between px-6">
    //   {/* Left Section - Branding or User Info */}
    //   <p className="text-xl font-semibold text-gray-800">
    //     {userName || "Loading..."}
    //   </p>

    //   {/* Right Section - Logout Button */}
    //   <div>
    //     <BtnPrimary
    //       onClick={handleLogout}
    //       className="hover:bg-blue-600 transition-colors duration-300"
    //     >
    //       Log Out
    //     </BtnPrimary>
    //   </div>
    // </div>
    <div className="bg-white shadow h-14 py-2 text-right px-3">
      {/* <p className="text-left text-lg">User Name</p> */}
      <BtnPrimary onClick={handleLogout}>Log Out</BtnPrimary>
    </div>
  );
};

export default Navbar;
