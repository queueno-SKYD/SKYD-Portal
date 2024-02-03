const version = "v1";
const endPoint = 'http://localhost:3001'

// eslint-disable-next-line import/no-anonymous-default-export
export default{
  Login: `${endPoint}/api/${version}/login`,
  Register: `${endPoint}/api/${version}/register`,
  AllUsers: `${endPoint}/api/${version}/manageUsers/getAllUsers`,
  uploadDocument: `${endPoint}/api/${version}/manageDocs/uploadDocument`,
  getDocument: `${endPoint}/api/${version}/manageDocs/getDocument`,
  getDocuments: `${endPoint}/api/${version}/manageDocs/getDocuments`,
  DeleteUserByAdmin: `${endPoint}/api/${version}/manageUsers/deleteUserByAdmin`,
}