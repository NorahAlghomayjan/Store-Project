import express from 'express';
import { UserRecord } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../@types/store';

const users_model = new UserRecord();
const { BCRYPT_PASSWORD, SALT_ROUND, TOKEN_SECRET } = process.env;

/* 1 */
export const index = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const users = await users_model.findAll();

    res.status(200).json(users);
};

/* 2 */
export const show = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const users = await users_model.findById(id);

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};

/* 3 */
export const createUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { firstname, lastname, password, email } = req.body;

    // if (!(firstname && lastname)) {
    //     res.status(401).json({error:'First Name and Last Name are required.'});
    // }

    try {
        // 1. hash
        const hashedPass = bcrypt.hashSync(
            password + BCRYPT_PASSWORD,
            parseInt(SALT_ROUND || '10')
        );

        //2. save
        const newUser = await users_model.create({
            firstname: firstname,
            lastname: lastname,
            password: hashedPass,
            email: email,
        });

        //3. create jwt sign token (session)
        const token = jwt.sign({ user: newUser[0] }, TOKEN_SECRET || '');

        res.status(200).json({ token: token, user: newUser[0] });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

/* 4 */
export const loginByname = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { firstname, lastname, password } = req.body;
        const result = await users_model.findByname(firstname, lastname);

        if (result.length) {
            const foundUser: User = {
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                password: result[0].password,
                email: result[0].email,
                id: result[0].id,
            };

            if (
                bcrypt.compareSync(
                    password + BCRYPT_PASSWORD,
                    foundUser.password
                )
            ) {
                const token = jwt.sign({ user: foundUser }, TOKEN_SECRET || '');

                res.status(200).json({
                    user: `${foundUser.firstname} ${foundUser.lastname}`,
                    token: token,
                });
            } else {
                res.status(401).json('Password is Wrong');
            }
        } else {
            res.status(401).json('First Name is not found');
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

/* 5 */
export const loginByEmail = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const result = await users_model.findByEmail(email);

        if (result.length) {
            const foundUser: User = {
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                password: result[0].password,
                email: result[0].email,
                id: result[0].id,
            };

            if (
                bcrypt.compareSync(
                    password + BCRYPT_PASSWORD,
                    foundUser.password
                )
            ) {
                const token = jwt.sign({ user: foundUser }, TOKEN_SECRET || '');

                res.status(200).json({
                    user: `${foundUser.firstname} ${foundUser.lastname}`,
                    token: token,
                });
            } else {
                res.status(401).json('Password is Wrong');
            }
        } else {
            res.status(401).json('Email not found');
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

/* 6 */
export const updateUserById = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { firstname, lastname, password, email } = req.body;

        if (!(firstname && lastname)) {
            res.status(401).json('First Name and Last Name are required.');
            return;
        }

        // 1. hash
        const hashedPass = bcrypt.hashSync(
            password + BCRYPT_PASSWORD,
            parseInt(SALT_ROUND || '10')
        );

        //2. save
        const updatedUser = await users_model.updateById({
            id: parseInt(req.params.id),
            firstname: firstname,
            lastname: lastname,
            password: hashedPass,
            email: email,
        });

        //3. create jwt sign token (session)
        const token = jwt.sign({ user: updatedUser }, TOKEN_SECRET || '');

        res.status(200).json({
            updatedUser: updatedUser,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

/* 7 */
export const deleteUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const deletedUser = await users_model.delete(parseInt(req.params.id));

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
