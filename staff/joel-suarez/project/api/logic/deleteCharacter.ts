import { Character } from '../data/index.ts';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

function deleteCharacter(characterId: string): Promise<void> {
    console.log(`Deleting character with ID: ${characterId}`);
    validate.text(characterId, 'characterId');

    return Character.findByIdAndDelete(characterId)
        .then(deletedCharacter => {
            if (!deletedCharacter) {
                console.log('Character not found');
                throw new NotFoundError('Character not found');
            }
            console.log(`Character deleted: ${deletedCharacter._id}`);
            return;
        })
        .catch(error => {
            console.error(`Error deleting character: ${error.message}`);
            throw new SystemError(error.message);
        });
}

export default deleteCharacter;
