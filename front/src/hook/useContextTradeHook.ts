import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie"; //librearia para manejar la cookie

//==========INTERFACE IUSER====================================
import { IUser } from "@/interfaces/IUser";
//========================================================
const useContextTradeHook = () => {
  const [user, setUser] = useState<IUser | null>(null);

  /**
   * 
    El useEffect se encarga de verificar si existe un token de autenticación en las cookies cuando el 
    componente se monta. Si el token está presente, el useEffect envía una solicitud al servidor para 
    obtener los datos del usuario autenticado. Si la solicitud tiene éxito, los datos del usuario se
     guardan en el estado local (user)
   
   
   */
  useEffect(() => {
    const token = Cookies.get("token"); //trae el token
    if (token) {
      axios
        .get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, //debemos cambiar el nombre si es otro "tocken o no se "
          },
        })
        .then((response) => {
          setUser(response.data); //usar data en axios (casi me olvido)
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  //==============centralizamos la funciones login , y logout ======================================
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      Cookies.set("token", token);

      //aca guardo los datos del user si hace login
      setUser(user);
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error during login", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null); //seteo datos del user
    //  router.push("/login");
  };

  /**
 * const isAuthenticated = () => !!user;

 * user: Esta es una variable de estado que contiene la información del usuario actualmente autenticado. 
 * Si el usuario no está autenticado, user será null.

 */
  const isAuthenticated = () => !!user;

  //===========return==============

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};

export default useContextTradeHook;
