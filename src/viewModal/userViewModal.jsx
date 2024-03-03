import axios from "axios";
import url from "../api/url.ts";

const UserViewModal = () => {
  // call to get All users api
  const callToAllUsers = async () => {
    try {
      const response = await axios.post(url.AllUsers, {
        pIndex: 0,
      });
      console.log("response--------->",response)
      if (response?.statusCode === 200) {
        let output = response?.data;
        if (output) {
          return output;
        } else {
          return [];
        }
      } else {
        console.log(response?.message);
        return [];
      }
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };
  return {
    callToAllUsers,
  };
};

export default UserViewModal;
