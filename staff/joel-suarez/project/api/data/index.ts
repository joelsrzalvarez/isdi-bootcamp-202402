import mongoose, { Schema, model, Document } from 'mongoose';

type UserType = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

type CreateCharacterType = {
    name: string;
    clase: string;
    win_streak: string; 
    max_win_streak: string;   
    user_id: mongoose.Types.ObjectId;
};

interface Character extends Document {
    name: string;
    clase: string;
    win_streak: string; 
    max_win_streak: string;   
    user_id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true 
    },
    password: {
        type: String,
        required: true
    }
});

const createCharacterSchema = new Schema<CreateCharacterType>({
    name: {
        type: String,
        required: true
    },
    clase: {
        type: String,
        required: true
    },
    win_streak: {
        type: String,                    
        required: true        
    },
    max_win_streak: {
        type: String,            
        required: true          
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true              
    }
});

const User = model<UserType>('User', userSchema);
const Character = model<Character>('Character', createCharacterSchema);

export {
    UserType,
    User,
    CreateCharacterType,
    Character
};
