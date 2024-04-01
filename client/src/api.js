import axios from "axios";
import Cookies from "universal-cookie";

const api = async (url, method, data) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(token);
  try {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      url,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
