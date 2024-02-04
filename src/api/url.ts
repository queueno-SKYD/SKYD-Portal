const version = "v1";
const endPoint = 'http://localhost:3001'

// eslint-disable-next-line import/no-anonymous-default-export
export default{
  Login: `${endPoint}/api/${version}/login`,
  Register: `${endPoint}/api/${version}/register`,
  AllUsers: `${endPoint}/api/${version}/manageUsers/getAllUsers`,
  uploadDocument: `${endPoint}/api/${version}/manageDocs/uploadDocument`,
  deleteDocument: `${endPoint}/api/${version}/manageDocs/deleteDocument`,
  editDocument: `${endPoint}/api/${version}/manageDocs/editDocument`,
  getDocument: `${endPoint}/api/${version}/manageDocs/getDocument`,
  getDocuments: `${endPoint}/api/${version}/manageDocs/getDocuments`,
  DeleteUserByAdmin: `${endPoint}/api/${version}/manageUsers/deleteUserByAdmin`,
  searchUsers: `${endPoint}/api/${version}/manageUsers/search`,
  shareDocument: `${endPoint}/api/${version}/manageDocs/share`,
  shareWithMultipleUsers: `${endPoint}/api/${version}/manageDocs/shareWithMultipleUsers`,
  getShareDetails: `${endPoint}/api/${version}/manageDocs/getShareDetails`,
  revokeShare: `${endPoint}/api/${version}/manageDocs/revokeShare`,
  getSharedDocumentByOthers: `${endPoint}/api/${version}/manageDocs/getSharedDocumentByOthers`,
}