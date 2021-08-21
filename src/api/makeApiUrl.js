export const makeApiUrl = (key) => `${process.env.REACT_APP_FIREBASE_URL}/${key}/.json`

export default makeApiUrl
