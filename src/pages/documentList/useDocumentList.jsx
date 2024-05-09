import { useState } from "react";
import useAxios from "../../api/restClient";
import { dangerToast } from "../../components/customToast";

const useDocumentList = ({fileType}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const axios = useAxios();
  const getDocumentList = async (url="") => {
    try {
      setIsLoading(true);
      const response = await axios.post(url, {
        fileType,
        page: 1,
        pageSize: 50,
      })
      if(response?.statusCode === 200){
        const output = response?.data;
        setDocumentList(output.data ?? [])
      }
    } catch (error) {
      console.debug(error)
      dangerToast(error.message)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  return ({
    getDocList: getDocumentList,
    isLoading,
    docList: documentList
  })
}

export default useDocumentList;
