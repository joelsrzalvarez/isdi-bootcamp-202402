import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import logic from './logic/index.ts';
import { errors } from 'com';
import jwt  from 'jsonwebtoken';
import cors from 'cors';
import tracer from 'tracer';
import colors from 'colors';

dotenv.config()

const { TokenExpiredError } = jwt
const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const {
    ContentError,
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    UnauthorizedError
} = errors

mongoose.connect(MONGODB_URL)
.then(() => {
    const api = express();
    const server = http.createServer(api);
    const io = new SocketServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    const jsonBodyParser = express.json()

    api.use(cors());
    api.use(express.json());

    api.post('/users', jsonBodyParser, (req, res) => {
        try {
            const { name, surname, email, password } = req.body

            logic.registerUser(name, surname, email, password)
                .then(() => res.status(201).send())
                .catch(error => {
                    if (error instanceof SystemError) {
                        logger.error(error.message)

                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    } else if (error instanceof DuplicityError) {
                        logger.warn(error.message)

                        res.status(409).json({ error: error.constructor.name, message: error.message })
                    }
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof ContentError) {
                logger.warn(error.message)

                res.status(406).json({ error: error.constructor.name, message: error.message })
            } else {
                logger.warn(error.message)

                res.status(500).json({ error: SystemError.name, message: error.message })
            }
        }
    })
    
    api.post('/characters', jsonBodyParser, async (req, res) => {
        const { name, clase, win_streak, max_win_streak, user_id, page } = req.body;
        
        try {
            await logic.createCharacter(name, clase, win_streak, max_win_streak, user_id);
            res.status(201).json({ message: 'Character created successfully' });
            
        } catch (error) {
            if (error instanceof SystemError) {
            logger.error(error.message);
            res.status(500).json({ error: error.constructor.name, message: error.message });
            } 
            else if (error instanceof DuplicityError) {
            logger.warn(error.message);
            res.status(409).json({ error: error.constructor.name, message: error.message });
            } 
            else {
            logger.error(error.message);
            res.status(500).json({ error: SystemError.name, message: error.message });
            }
        }
    });
        
    
    api.post('/users/auth', jsonBodyParser, (req, res) => {
        try {
            const { email, password } = req.body

            logic.authenticateUser(email, password)
                .then(userId => {
                    const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

                    res.json(token)
                })
                .catch(error => {
                    if (error instanceof SystemError) {
                        logger.error(error.message)

                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    } else if (error instanceof CredentialsError) {
                        logger.warn(error.message)

                        res.status(401).json({ error: error.constructor.name, message: error.message })
                    } else if (error instanceof NotFoundError) {
                        logger.warn(error.message)

                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    }
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof ContentError) {
                logger.warn(error.message)

                res.status(406).json({ error: error.constructor.name, message: error.message })
            } else {
                logger.warn(error.message)

                res.status(500).json({ error: SystemError.name, message: error.message })
            }
        }
    })

    api.get('/users/:targetUserId', (req, res) => {
        try {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { targetUserId } = req.params

            logic.retrieveUser(userId as string, targetUserId)
                .then(user => res.json(user))
                .catch(error => {
                    if (error instanceof SystemError) {
                        logger.error(error.message)

                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    } else if (error instanceof NotFoundError) {
                        logger.warn(error.message)

                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    }
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof ContentError) {
                logger.warn(error.message)

                res.status(406).json({ error: error.constructor.name, message: error.message })
            } else if (error instanceof TokenExpiredError) {
                logger.warn(error.message)

                res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
            } else {
                logger.warn(error.message)

                res.status(500).json({ error: SystemError.name, message: error.message })
            }
        }
    })

    api.delete('/characters/:id', jsonBodyParser, async (req, res) => {
        const { id } = req.params;
    
        try {
            await logic.deleteCharacter(id);
            logger.info('Character deleted successfully');
            res.status(200).json({ message: 'Character deleted successfully' });
        } catch (error) {
            if (error instanceof NotFoundError) {
                logger.warn(error.message);
                res.status(404).json({ error: error.constructor.name, message: error.message });
            } else {
                logger.error('Unexpected error occurred', error.message);
                res.status(500).json({ error: SystemError.name, message: 'An unexpected error occurred' });
            }
        }
    });        

    api.get('/characters', async (req, res) => {
        const { userId } = req.query;
        try {
            const characters = await logic.retrieveCharacter(userId);
            res.status(200).json(characters);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.constructor.name, message: error.message });
            } else {
                res.status(500).json({ error: SystemError.name, message: error.message });
            }
        }
    });

    io.on('connection', (socket) => {
        logger.info(`A user connected with ID: ${socket.id}`);

        socket.on('findMatch', () => {
            logic.handleMatchMaking(io, socket);
            logger.info(`User ${socket.id} is looking for a match`);
        });

        socket.on('disconnect', () => {
            logger.info(`User ${socket.id} has disconnected`);
        });
    });

    server.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
})
.catch(error => logger.error(error))


