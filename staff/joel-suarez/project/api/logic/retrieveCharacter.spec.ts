import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Character } from '../data/index.ts'; 
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com'; 

const { NotFoundError, SystemError } = errors;

describe('retrieveCharacter', () => {

    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await Character.deleteMany({});
    });

    it('retrieves existing characters', async () => {
        const user_id = new mongoose.Types.ObjectId();
        await Character.create({ name: 'Hero', user_id: user_id.toString(), page: '1' });
        
        const characters = await logic.retrieveCharacter(user_id.toString(), '1');
        expect(characters).to.have.lengthOf(1);
        expect(characters[0].name).to.equal('Hero');
    });

    it('throws NotFoundError if no characters are found', async () => {
        const user_id = new mongoose.Types.ObjectId();
        
        try {
            await logic.retrieveCharacter(user_id.toString(), '1');
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError);
            expect(error.message).to.equal('No characters found for the given user and page');
        }
    });

    afterEach(async () => {
        await Character.deleteMany({});
    });

    after(async () => {
        await mongoose.disconnect();
    });
});
