import { Switch } from "@/components/ui/switch"
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = ({darkMode, handleDarkMode, isAuthenticated, username, setUsername, setIsAuthenticated}) => {
    const [showNavBar, setShowNavBar] = useState(false)
    const navigate = useNavigate()

    function logout(){
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      setIsAuthenticated(false)
      setUsername(null)
      navigate("/")
    }


  return (
    <>
      <nav className="max-container padding-x py-6 justify-between flex items-center gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624]">
          <Link to='/' className="text-gray-700 text-2xl dark:text-[#FFFFFF]">PortFolio</Link>
          <ul className="flex items-center justify-end gap-9 text-gray-600 lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
              {isAuthenticated ? <>
                <li onClick={logout} className="cursor-pointer">Logout</li>
                <li>Hi, {username}</li>
              </> : 
              <>
                <li>
                <NavLink to="/signin" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({isActive}) => isActive ? "active" : ""}>Register</NavLink>
              </li>
              </> 
              }
              
              <li>
                <NavLink to="/create" className={({isActive}) => isActive ? "active" : ""}>
                  Create Post
                </NavLink>
              </li>
          </ul>
          <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
          <FaHamburger className="text-2xl cursor-pointer hidden max-md:block dark:text-white" onClick={() => setShowNavBar(curr => !curr)}/>
      </nav>
      {showNavBar && <ResponsiveNavBar username={username} isAuthenticated={isAuthenticated} logout={logout}/>}
    </>
  );
};

export default NavBar;