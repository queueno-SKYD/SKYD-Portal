import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import UploadDocument from "../../components/UploadDocument";
import { getHeaders, POST } from "../../api/restClient.ts";
import url from "../../api/url.ts";
import { useLogin } from "../../context/login.context";
import Loader from "../../components/Loder/index.jsx";
import MyModal from "../../components/Model/index.jsx";
import { customToast } from "../../components/customToast/index.js";
import { useNavigate } from 'react-router-dom';
import "./index.css"

function DocumentList() {
  const navigate = useNavigate();
  const [openDeleteModel, setOpenDeleteModel] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useLogin();
  const [openModel, setOpenModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(null);
  const [sharedDocumentList, setSharedDocumentList] = useState([]);
  const [isSharedDocumentLoading, setSharedDocumentIsLoading] = useState(false);

  const openUploadModal = () => setOpenModel(true);

  const goToShareDoc = (id) => {
    navigate(`/documentManagement/share/${id}`);
  };
  
  const uploadNewDocumentSection = (
    <div className="col-12 mt-2 mb-2">
      <button
        className="text-decoration-none btn btn-primary"
        onClick={openUploadModal}
      >
        + Add Uploads
      </button>
    </div>
  )
  useEffect(() => {
    getDocumentList();
    getSharedDocumentByOthers();
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

  const getSharedDocumentByOthers = async () => {
    try {
      setSharedDocumentIsLoading(true);
      const response = await POST(url.getSharedDocumentByOthers, getHeaders(token), {
        page: 1,
        pageSize: 50,
      })
      if(response.data.statusCode === 200){
        const output = response?.data?.data;
        setSharedDocumentList(output.data ?? [])
      }
    } catch (error) {
      console.debug(error)
    } finally {
      setTimeout(() => {
        setSharedDocumentIsLoading(false)
      }, 1000)
    }
  }

  const onDelete = async (id) => {
    try {
      setDeleting(true);
      const response = await POST(url.deleteDocument, getHeaders(token), {
        fileId: id
      });
      console.log("response --->", JSON.stringify(response));
      if(response.data.statusCode === 200){
        const output = response?.data?.data;
        if(output){
          getDocumentList();
          customToast("success", "Document successfully uploaded")
          setOpenDeleteModel(false)
        }
      }
    } catch (error) {
      customToast("error", error.message)
    } finally {
      setDeleting(false)
    }
  }
  return (
    <>
      <Card title={"My Uploads"}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="col-3">
                Label{" "}
              </th>
              <th scope="col" className="col-6">
                File Name
              </th>
              <th scope="col">
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
                  <td style={{minWidth: "276px"}}>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setOpenEditModel(item?.fileId)}><i className="fa fa-pen icon-space"/>Edit</button>
                    <span> | </span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => setOpenDeleteModel(item?.fileId)}><i className="fa fa-trash icon-space"/>Delete</button>
                    <span> | </span>
                    <button className="btn btn-info btn-sm" onClick={() => goToShareDoc(item?.fileId)}><i className="fa fa-share icon-space"/>Share</button>
                  </td>
                  <MyModal
                    openModal={openDeleteModel === item?.fileId}
                    closeModal={() => setOpenDeleteModel(false)}
                    title={"Confirm For Deletion!"}
                    closeOnBackdropClick={true}
                    isCenter={true}
                    onSave={() => onDelete(item.fileId)}
                    isLoading={deleting}
                    saveButtonTitle={"Delete document"}
                    cancelButtonTitle={"Cancel"}
                    type="danger"
                  >
                    <p >Are you sure, you want delete <br/><span className="badge bg-danger text-wrap">{item?.label}</span> ?</p>
                  </MyModal>
                  <UploadDocument
                    openModel={openEditModel === item?.fileId}
                    closeModal={() => setOpenEditModel(false)}
                    title={"Edit document"}
                    callAfterUpload={getDocumentList}
                    fileData={item}
                  />
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
            {sharedDocumentList.length > 0 && sharedDocumentList.map((item) => {
              return (
                <tr>
                  <td>{item?.label}</td>
                  <td>{item?.fileURL}</td>
                  <td>{item?.senderEmail}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
      {uploadNewDocumentSection}
      
      <UploadDocument
        openModel={openModel}
        closeModal={() => setOpenModel(false)}
        title={"Upload document"}
        callAfterUpload={getDocumentList}
      />
       <Loader isLoading={isLoading || isSharedDocumentLoading} />
      
    </>
  );
}

export default DocumentList;
