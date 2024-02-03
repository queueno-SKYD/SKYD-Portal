import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import UploadDocument from "../../components/UploadDocument";
import { getHeaders, POST } from "../../api/restClient.ts";
import url from "../../api/url.ts";
import { useLogin } from "../../context/login.context";
import Loader from "../../components/Loder/index.jsx";

function DocumentList() {
  const [documentList, setDocumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useLogin();
  const [openModel, setOpenModel] = useState(false);
  const openUploadModal = () => setOpenModel(true);
  
  const uploadNewDocumentSection = (
    <div className="w-75 d-flex flex-column align-self-center mt-4">
      <button
        className="w-25 text-decoration-none btn btn-primary"
        onClick={openUploadModal}
      >
        + Add Uploads
      </button>
    </div>
  )
  useEffect(() => {
    getDocumentList();
  }, [])

  const getDocumentList = async () => {
    try {
      setIsLoading(true);
      const response = await POST(url.getDocuments, getHeaders(token), {
        page: 1,
        pageSize: 50,
      })
      if(response.data.statusCode === 200){
        const output = response?.data?.data;
        setDocumentList(output.data ?? [])
      }
    } catch (error) {
      console.debug(error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }
  return (
    <div className="w-100 d-flex flex-column align-self-center">
      <Card title={"My Uploads"}>
        <table className="w-100 table table-striped">
          <thead>
            <tr>
              <th scope="col" className="col-3">
                Label{" "}
              </th>
              <th scope="col" className="col-6">
                File Name
              </th>
              <th scope="col" className="col-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody style={{maxHeight:250, overflow:'scroll'}}>
            {documentList.length > 0 && documentList.map((item) => {
              return (
                <tr key={item?.fileId + item?.ownerId}>
                  <td>{item.label}</td>
                  <td>{item.fileURL}</td>
                  <td>
                    <a href="/">Edit</a>
                    <span> | </span>
                    <a href="/">Delete</a>
                    <span> | </span>
                    <a href="/">Share</a>
                  </td>
                </tr>
              );
            })}
          </tbody> 
          
        </table>
      </Card>
      <Card title={"Shared Uploads"}>
        <table className="w-100 table table-striped">
          <thead>
            <tr>
              <th scope="col" className="col-3">
                Label{" "}
              </th>
              <th scope="col" className="col-6">
                File Name
              </th>
              <th scope="col" className="col-3">
                Shared By
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>abc@gmail.com</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>abc@gmail.com</td>
            </tr>
            <tr>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>abc@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </Card>
      {uploadNewDocumentSection}
      
      <UploadDocument
        openModel={openModel}
        closeModal={() => setOpenModel(false)} title={"Upload document"}
      />
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default DocumentList;
