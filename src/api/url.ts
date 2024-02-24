const version = "v1";


// eslint-disable-next-line import/no-anonymous-default-export
export default{
  Login: `/api/${version}/login`,
  Register: `/api/${version}/register`,
  AllUsers: `/api/${version}/manageUsers/getAllUsers`,
  uploadDocument: `/api/${version}/manageDocs/uploadDocument`,
  deleteDocument: `/api/${version}/manageDocs/deleteDocument`,
  editDocument: `/api/${version}/manageDocs/editDocument`,
  getDocument: `/api/${version}/manageDocs/getDocument`,
  getDocuments: `/api/${version}/manageDocs/getDocuments`,
  DeleteUserByAdmin: `/api/${version}/manageUsers/deleteUserByAdmin`,
  EditUserByAdmin: `/api/${version}/manageUsers/editUserByAdmin`,
  searchUsers: `/api/${version}/manageUsers/search`,
  shareDocument: `/api/${version}/manageDocs/share`,
  shareWithMultipleUsers: `/api/${version}/manageDocs/shareWithMultipleUsers`,
  getShareDetails: `/api/${version}/manageDocs/getShareDetails`,
  revokeShare: `/api/${version}/manageDocs/revokeShare`,
  getSharedDocumentByOthers: `/api/${version}/manageDocs/getSharedDocumentByOthers`,
  createGroup: `/api/${version}/chatService/createGroup`,
  getAllUserGroups: `/api/${version}/chatService/getAllUserGroups`,
  addMembers: `/api/${version}/chatService/group/addMembers`,
  makeAdmin: `/api/${version}/chatService/group/makeAdmin`,
}