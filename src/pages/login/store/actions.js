export const changeLogin = () => ({
    type: 'changeLogin',
    value: true
})

export const logout = () => ({
    type: 'logOut',
    value: false
})

// export function changeLoginAction(loginInfo) {
//     return dispatch => {
//       const {access_token: accessToken, expires_at: expiresAt, user} = loginInfo.data
  
//       localStorage.setItem('accessToken', accessToken)
//       localStorage.setItem('expiresAt', expiresAt)
//       localStorage.setItem('user', JSON.stringify(user))
//       dispatch(changeUserInfo(loginInfo.user))
//       dispatch(changeLogin())
//     }
//   }