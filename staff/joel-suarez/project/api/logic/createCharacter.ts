import { validate, errors } from 'com';
import { CreateCharacterType, Character } from '../data/index';
import mongoose from 'mongoose';

const { DuplicityError, SystemError } = errors;

function createCharacter(name: string, clase: string, win_streak: string, max_win_streak: string, userId: mongoose.Types.ObjectId) {
    validate.text(name, 'name');
    validate.text(clase, 'clase');
    validate.text(win_streak, 'win_streak');
    validate.text(max_win_streak, 'max_win_streak');

    try {
        const characterExists = Character.findOne({ name, user_id: userId });
        console.log(characterExists);

        const newCharacter = {
            name: name.trim(),
            clase,
            win_streak: "0",
            max_win_streak: "0",
            user_id: userId,
        };

        return Character.create(newCharacter); 
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new SystemError('Validation error in creating character');
        } else {
            throw error;
        }
    }
}

export default createCharacter;
