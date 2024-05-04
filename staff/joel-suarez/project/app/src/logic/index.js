import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import createCharacter from './createCharacter'
import logoutUser from './logoutUser'
import decryptToken from './decryptToken'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'
import findMatch from './findMatch'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    createCharacter,
    logoutUser,
    decryptToken,
    isUserLoggedIn,
    cleanUpLoggedInUserId,
    findMatch
}

export default logic