import axios from "axios";
const API_URL = "http://localhost:5500";

const userService = {
  signInLocal: async (email: string, password: string) => {
    const signInLocal = await axios.post(`${API_URL}/auth/signin`, {
      email: email,
      password: password,
    });

    return signInLocal;
  },
  logout: async (userId: string) => {
    const logout = await axios.post(`${API_URL}/auth/logout`, {
    });

    return logout;
  },
};

export default userService;
