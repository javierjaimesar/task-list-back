import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createAccessToken from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.status(400).json(['Email already exists'])
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()

        const token = await createAccessToken({ id: userSaved._id })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        })
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(401).json(['Email not found'])
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) {
            return res.status(401).json(['Invalid password'])
        }

        console.log(userFound);
        req.user = userFound;

        const token = await createAccessToken({ id: userFound._id })

        res.cookie('token', token, {
            domain: '.javier-task-list.netlify.app', // Configura el dominio al que pertenece la cookie (incluye un punto inicial)
            path: '/', // Configura la ruta en la que la cookie es válida
            maxAge: 3600,
            httpOnly: false,
            secure: false,
            sameSite: "none",
        })
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token')
        res.json({
            message: 'Logout successful'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) return res.status(404).json({ message: 'User not found' })

        return res.json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token) return res.status(401).json({ message: 'Unauthorized varityToken 1' })

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.status(401).json({ message: 'Unauthorized varityToken 1' })

            const userFound = await User.findById(user.id)
            if (!userFound) return res.status(401).json({ message: 'Unauthorized varityToken 1' })

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
