import registerUser from './registerUser.ts'
import createCharacter from './createCharacter.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveCharacter from './retrieveCharacter.ts'
import deleteCharacter from './deleteCharacter.ts'
import { handleMatchMaking, removePlayer } from './findMatch';

const logic = {
    registerUser,
    createCharacter,
    authenticateUser,
    retrieveUser,
    retrieveCharacter,
    deleteCharacter,
    handleMatchMaking,
    removePlayer
}

export default logic