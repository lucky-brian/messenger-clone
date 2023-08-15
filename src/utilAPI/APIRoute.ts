
export const host = 'http://localhost:3000/';

// authentication
export const registerRoute = 'api/auth/signup' //post
export const loginRoute = 'api/auth/signin' //post

// User
export const getAllUser = 'api/users/all' //get
export const getAllUserList = 'api/users' //get
export const getOneUserById = 'api/users/findone/' //get
export const getOneUserOrGroupRoute = 'api/users/finduserorgroup/' //get
export const updateUserUsernameRoute = 'api/users/update-username'

// Group
export const getGroupMembersRoute = 'api/group/'
export const getUsersAndGroupsRoute = 'api/group/usersandgroup' //get
export const all = 'api/messages/getcontact'
export const groupCreateRoute = 'api/group/create'
export const editGroup = 'api/group/update/'


// SendMessage
export const sendMessage = 'api/messages/send/'

//getChat
export const getChatRoute = 'api/messages/chat/'
export const getChatGroupRoute = 'api/messages/group/'

//deleteMessage and group
export const deleteMessageRoute = 'api/messages/chat/' //Delete
export const deleteGroupRoute = 'api/group/deletegroup/'

