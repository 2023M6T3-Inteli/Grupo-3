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
  getUserById: async (userId: string) => {
    const user = await axios.get(`${API_URL}/users/profile/${userId}`, {
    });

    return user;
  },

  getAllUsers: async () => {
    const users = await axios.get(`${API_URL}/users`, {
    });

    return users;
  },

  deleteUser: async (userId: string) => {
    const deletedUser = await axios.delete(`${API_URL}/users/delete/${userId}`, {
    });

    return deletedUser;
  },
};

export default userService;
