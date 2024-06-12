import jwt from "jsonwebtoken"
import 'dotenv/config'

const { JWT_SECRET } = process.env

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )
}