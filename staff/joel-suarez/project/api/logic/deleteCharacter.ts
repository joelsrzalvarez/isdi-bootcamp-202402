import { Character } from '../data/index.ts';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

function deleteCharacter(characterId: string): Promise<void> {
    validate.text(characterId, 'characterId');

    return Character.findByIdAndDelete(characterId)
        .then(deletedCharacter => {
            if (!deletedCharacter) {
                console.error('Character not found');
                throw new NotFoundError('Character not found');
            }
            return;
        })
        .catch(error => {
            console.error(`Error deleting character: ${error.message}`);
            throw new SystemError(error.message);
        });
}

export default deleteCharacter;
