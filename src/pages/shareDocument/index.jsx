import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import UserSearch from '../../components/Search/searchuser';
import MyModal from '../../components/Model';
import Loader from '../../components/Loder';
import api from "../../api/url.ts";
import {dangerToast, successToast } from '../../components/customToast';
import useAxios from '../../api/restClient.jsx';

const ShareDocument = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [fileDetails, setFileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShareDetailsLoading, setIsShareDetailsLoading] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [multiSelections, setMultiSelections] = useState([]);
  const [shareDetailsList, setShareDetailsList] = useState([]);
  const [openDeleteModel, setOpenDeleteModel] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const getDocumentById = async (fileId) => {
    try {
      setIsLoading(true);
      const response  = await axios.post(api.getDocument, {
        fileId
      })
      console.log("response --->", JSON.stringify(response));
      if(response?.statusCode === 200){
        const output = response?.data;
        if(output){
          setFileDetails(output)
        }
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getShareDetailsList = async (fileId) => {
    try {
      setIsShareDetailsLoading(true);
      const response = await axios.post(api.getShareDetails, {
        fileId,
        page: 1,
        pageSize: 50,
      })
      if(response?.statusCode === 200){
        const output = response?.data;
        setShareDetailsList(output.data ?? [])
      }
    } catch (error) {
      dangerToast(error.message)
      console.debug(error)
    } finally {
      setTimeout(() => {
        setIsShareDetailsLoading(false)
      }, 1000)
    }
  }

  const shareFileWithUsers = async (fileId, sharedUserIds) => {
    try {
      setIsShareLoading(true);
      const response  = await axios.post(api.shareWithMultipleUsers, {
        fileId,
        sharedUserIds
      })
      console.log("response --->", JSON.stringify(response));
      if(response?.statusCode === 200){
        const output = response?.data;
        if (output) {
          successToast("Shared document successfully")
          getShareDetailsList(fileId)
          setMultiSelections([])
        } else {
          dangerToast(response.data.message)
        }
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setIsShareLoading(false)
    }
  }
  useEffect(() => {
    getDocumentById(id)
    getShareDetailsList(id)
  }, [id])

  const handleSharePress = () => {
    const allIds = multiSelections?.map(item => item.userId)
    shareFileWithUsers(id, allIds)
  }

  const onDelete = async (sharedUserId, fileId) => {
    try {
      setDeleting(true);
      const response = await axios.post(api.revokeShare, {
        fileId,
        sharedUserId,
      });
      console.log("response --->", JSON.stringify(response));
      if(response?.statusCode === 200){
        const output = response?.data;
        if(output){
          getShareDetailsList(fileId);
          successToast("Removed access successsfully this user will not be able to access this file now")
          setOpenDeleteModel(false)
        }
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="w-100 d-flex flex-column align-self-center">
    <Card title={`Share "${fileDetails?.label || fileDetails?.fileURL}"`}>
      <table className="w-100 table table-striped">
        <thead>
          <tr>
            <th scope="col" className="col-6">
              {`People with access`}
            </th>
            <th scope="col-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody style={{maxHeight:250, overflow:'scroll'}}>
          {shareDetailsList.length > 0 && shareDetailsList.map((item) => {
            return (
              <tr key={item?.shareId + item?.sharedOn}>
                <td>{item?.email}</td>
                <td style={{minWidth: "276px"}}>
                  <button className="btn btn-warning btn-sm" onClick={() => setOpenDeleteModel(item?.shareId)}><i className="fa fa-pen icon-space"/>Remove access</button>
                </td>
                <MyModal
                  openModal={openDeleteModel === item?.shareId}
                  closeModal={() => setOpenDeleteModel(false)}
                  title={"Confirm remove access!"}
                  closeOnBackdropClick={true}
                  isCenter={true}
                  onSave={() => onDelete(item?.userId, item?.fileId)}
                  isLoading={deleting}
                  saveButtonTitle={"Remove Access"}
                  cancelButtonTitle={"Cancel"}
                  type="warning"
                >
                  <p >Are you sure, you want to remove access to this user <br/><span className="badge bg-info text-wrap">{item?.email}</span> ?</p>
                </MyModal>
              </tr>
            );
          })}
        </tbody> 
        
      </table>
    </Card>
    <Card
      overFlow={true}
      title={"Add users"}
      bottomComponent={
        <div className="w-75 mt-4">
          {multiSelections && multiSelections?.map(item => <>
            <p className='mt-0 mb-0 fw-bold'>{`${item.firstName} ${item?.lastName}`}</p>
            <p className='mt-0 mb-0 '>{item?.email}</p>
            <br/>
          </>)}
        </div>
      }
    >
      <div className='w-100 d-flex justify-content-between align-items-start'>
        <UserSearch multiSelections={multiSelections} setMultiSelections={setMultiSelections} placeHolder='Search user, email to add'/>
        <button className="btn btn-primary btn m-2 mt-0" style={{minWidth: "100px"}} onClick={handleSharePress}><i className="fa fa-share icon-space"/>Share</button>
      </div>
    </Card>
    <Loader isLoading={isLoading || isShareDetailsLoading || isShareLoading} />
    
  </div>
  )
}

export default ShareDocument