import express from 'express';
import {
    index,
    createUser,
    loginByname,
    updateUserById,
    deleteUser,
    loginByEmail,
    show,
} from '../controllers/user';
import { authenticate, authorizationUser } from '../middlewares/store';

const user_routes = (app: express.Application): void => {
    app.get('/users', authenticate, index);
    app.get('/users/:id', authenticate, show);
    app.post('/users/new', createUser);
    app.post('/users/login', loginByname);
    app.post('/users/loginByEmail', loginByEmail);
    app.put('/users/update/:id', authorizationUser, updateUserById);
    app.put('/users/update-user/:id', updateUserById);
    app.delete('/users/delete/:id', authorizationUser, deleteUser);
    app.delete('/users/delete-user/:id', deleteUser);
};

export default user_routes;
