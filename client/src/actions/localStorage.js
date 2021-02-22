const lsNames = {
  userData: 'userData',
}

export const LS = {
  getUser: (  ) => JSON.parse(localStorage.getItem(lsNames.userData)),
  setUser: ( { userId, token } ) => localStorage.setItem( lsNames.userData, JSON.stringify( { userId, token } ) ),
  clearUser: (  ) => localStorage.removeItem(lsNames.userData),
}