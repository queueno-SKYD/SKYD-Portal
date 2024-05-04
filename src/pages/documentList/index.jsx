import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import UploadDocument from "../../components/UploadDocument";

import url from "../../api/url.ts";
import Loader from "../../components/Loder/index.jsx";
import MyModal from "../../components/Model/index.jsx";
import {dangerToast, successToast } from "../../components/customToast/index.js";
import { useNavigate } from 'react-router-dom';
import "./index.css"
import useAxios, { endPoint } from "../../api/restClient.jsx";
import PortalComponent from "../../components/Overlays/index.jsx";
import { Modal } from "react-bootstrap";
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import RemoteSources from "@uppy/remote-sources";
import Webcam from "@uppy/webcam";

import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";
import DropTarget from "@uppy/drop-target";
import Audio from "@uppy/audio";
import Compressor from "@uppy/compressor";

import "@uppy/audio/dist/style.css";
import "@uppy/image-editor/dist/style.css";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { useAppContext } from "../../context/app.context.jsx";
import FilePreview from "../../components/filePreview/filePreview.jsx";
import useDocumentList from "./useDocumentList.jsx";

const COMPANION_URL = "http://companion.uppy.io";
const companionAllowedHosts = [];
const XHR_ENDPOINT = `${endPoint}${url.UploadFile}`;


function DocumentList() {
  const uppyRef = useRef(null);
  const axios = useAxios();
  const navigate = useNavigate();
  const {token} = useAppContext();
  const [openDeleteModel, setOpenDeleteModel] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [mediaList, setMediaList] = useState([]);

  const [openModel, setOpenModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(null);
  const [sharedDocumentList, setSharedDocumentList] = useState([]);
  const [isSharedDocumentLoading, setSharedDocumentIsLoading] = useState(false);

  // doc
  const { isLoading: docLoading, docList: documentList, getDocList: getDocumentList } = useDocumentList({fileType: "doc"})
  // image
  const { isLoading: imgLoading, docList: imageList, getDocList: getImageList } = useDocumentList({fileType: "img"})
  // media
  const { isLoading: videoLoading, docList: videoList, getDocList: getVideoList } = useDocumentList({fileType: "video"})

  useEffect(() => {
    if (uppyRef.current) {
      uppyRef.current = new Uppy({
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000, // 10MB
        },
      });
  
      if (uppyRef.current) {
        uppyRef.current.use(Dashboard, {
          inline: true,
          target: "#uppy-dashboard",
          showProgressDetails: true,
          proudlyDisplayPoweredByUppy: true,
        })
        .use(RemoteSources, {
          companionUrl: COMPANION_URL,
          sources: [
            "Box",
            "Dropbox",
            "Facebook",
            "GoogleDrive",
            "Instagram",
            "OneDrive",
            "Unsplash",
            "Url",
          ],
          companionAllowedHosts,
        })
        .use(Webcam, {
          target: Dashboard,
          showVideoSourceDropdown: true,
          showRecordingLength: true,
        })
        .use(Audio, {
          target: Dashboard,
          showRecordingLength: true,
        })
        .use(ImageEditor, { target: Dashboard })
        .use(DropTarget, {
          target: document.body,
        })
        .use(Compressor)
        .use(XHRUpload, {
          endpoint: XHR_ENDPOINT,
          limit: 1,
          bundle: true,
          headers: {
            'Authorization': token
         }
        });
      }
    }
    return () => {
      uppyRef?.current?.close?.();
    };
 }, [uppyRef, openModel]);

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
    getDocumentList(url.getDocuments);
    getImageList(url.getDocuments);
    getVideoList(url.getDocuments);
    getSharedDocumentByOthers();
  }, [])

  const getSharedDocumentByOthers = async () => {
    try {
      setSharedDocumentIsLoading(true);
      const response = await axios.post(url.getSharedDocumentByOthers, {
        page: 1,
        pageSize: 50,
      })
      if(response?.statusCode === 200){
        const output = response?.data;
        setSharedDocumentList(output.data ?? [])
      }
    } catch (error) {
      console.debug(error)
      dangerToast(error.message)
    } finally {
      setTimeout(() => {
        setSharedDocumentIsLoading(false)
      }, 1000)
    }
  }

  const onDelete = async (id) => {
    try {
      setDeleting(true);
      const response = await axios.post(url.deleteDocument, {
        fileId: id
      });
      console.log("response --->", JSON.stringify(response));
      if(response?.statusCode === 200){
        const output = response?.data;
        if(output){
          getDocumentList();
          successToast("Document successfully uploaded")
          setOpenDeleteModel(false)
        }
      }
    } catch (error) {
      dangerToast(error.message);
      dangerToast(error.message)
    } finally {
      setDeleting(false)
    }
  }
  return (
    <>
      {/* <Card title={"My Uploads"}>
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
      </Card> */}
      {uploadNewDocumentSection}
      <Modal  show={openModel} onHide={() => setOpenModel(false)} backdropClassName="custom-backdrop" dialogClassName={true ? "modal-dialog-centered" : null }>
        <Modal.Header>
          <Modal.Title>{"Upoad"}</Modal.Title>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpenModel(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <div id="uppy-dashboard" class="uppy-holder" ref={uppyRef}></div>
        </Modal.Body>
      </Modal>
      {/* <UploadDocument
        openModel={openModel}
        closeModal={() => setOpenModel(false)}
        title={"Upload document"}
        callAfterUpload={getDocumentList}
      /> */}
      <FilePreview files={documentList}/>
      <FilePreview files={imageList} heading={"Uploaded images!"}/>
      <FilePreview files={videoList} heading={"Uploaded video!"}/>
      <FilePreview files={sharedDocumentList} heading={"Shared files"} />
      <Loader isLoading={docLoading || imgLoading || videoLoading || isSharedDocumentLoading} />
      
    </>
  );
}

export default DocumentList;
