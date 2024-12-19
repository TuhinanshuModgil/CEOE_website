import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // check if the user is logged in intitally
  const [userAdmin, setUserAdmin] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(parseCookies());
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const backend =  import.meta.env.VITE_BACKEND_HOST

  //
  async function handleRegisterUser(fullName, email, password) {
    // console.log("this is evnet:", event)
    console.log("fullanme: ", fullName);
    console.log("emailemail: ", email);
    console.log("password: ", password);

    try {
      const response = await fetch(`${backend}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, fullname: fullName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Registered Succesfully", data)
        setSuccessMessage(data.message);
        setUserLoggedIn(true)
        return true
        // localStorage.setItem('token', data.token); // Save token for authentication
      } else {
        const errorData = await response.json();
        console.log("Resgister failed", errorData);
        setErrorMessage(errorData.message || "An error occurred");
        return false
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server");
      return false
    }
  }

  async function handleLogin(email, password) {
    // console.log("this is evnet:", event)
    console.log("emailemail: ", email);
    console.log("password: ", password);

    try {
      const response = await fetch(`${backend}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Login Succesfully", data)
        setSuccessMessage(data.message);
        setUserLoggedIn(true)
        setUserAdmin(data?.data?.admin)
        return true
        // localStorage.setItem('token', data.token); // Save token for authentication
      } else {
        const errorData = await response.json();
        console.log("Login failed", errorData);
        setErrorMessage(errorData.message || "An error occurred");
        return false
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server");
      return false
    }
  }

  async function handleLogout() {
    try {
        const response = await fetch(`${backend}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("User Logout Succesfully", data)
          setSuccessMessage(data.message);
          setUserLoggedIn(false)
          setUserAdmin(false)
          return true
          // localStorage.setItem('token', data.token); // Save token for authentication
        } else {
          const errorData = await response.json();
          console.log("Logout failed", errorData);
          setErrorMessage(errorData.message || "An error occurred");
          return false
        }
      } catch (error) {
        setErrorMessage("Failed to connect to the server");
        return false
      }
  }

  return <AuthContext.Provider value={{handleRegisterUser, userLoggedIn, handleLogout , handleLogin, userAdmin}}>{children}</AuthContext.Provider>;
};

const parseCookies = () => {
  const cookieString = document.cookie; // Get cookies as a string
  const cookiesArray = cookieString.split("; "); // Split into key-value pairs
  const cookiesObject = {};
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key] = decodeURIComponent(value); // Decode URI components
  });
  console.log("cookies: ", cookiesObject);
  if (cookiesObject.accessToken) return true;

  return false;
};
