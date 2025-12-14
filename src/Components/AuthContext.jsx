import { createContext, useState,useContext } from "react";


export const AuthContext = createContext();


export function AuthProvider({children})
{
    const [token,setToken] = useState(localStorage.getItem("authToken") || null)
    const [user, setUser] = useState(null)


    const register = async (email, password) => {
      try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

        const data = await response.json();


        if (response.ok) {
            loginSuccess(data.user, data.token);
            return { success: true };
        }
        else {
            return { success: false, error: data.message };
        }
       
        
      } catch (e) {
        return { success: false, error: "Ошибка с сервером" };
      }
    };



    const login = async (email, password) => {
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

            const data = await response.json();

          if (response.ok) {
              loginSuccess(data.user, data.token);
              return { success: true };
          }
            else {
                return { success: false, error: data.message };
            }
        } catch (e) {
            return { success: false, error: "Ошибка с сервером" };
        }
    };


    const loginSuccess = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("authToken", token);
    };


    return (
    <AuthContext.Provider value={{ login, register, token, user }}>
      {children}
    </AuthContext.Provider>
  );


}


export function useAuth() {
  return useContext(AuthContext);
}