import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Logo = () => {
  const [userType, setUserType] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setUserType(user.userType);
    }
    // eslint-disable-next-line
  }, [userType]);

  let mainUrl = "";

  userType === "admin"
    ? (mainUrl = "/dashboard")
    : userType === "recruiter"
    ? (mainUrl = "/stats")
    : (mainUrl = "/all-jobs");

  return (
    <Link to={mainUrl}>
      <img src={logo} alt="Get Job Call" className="logo" />
    </Link>
  );
};

export default Logo;
