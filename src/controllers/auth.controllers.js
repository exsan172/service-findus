import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { response, curentTime } from '../config'
import userModels from '../models/user.models.js'

const genSalt = bcrypt.genSaltSync(5)
const authControllers = {
    login : async (req, res, next) => {
        try {
            const findEmail = await userModels.findOne({ username: req.body.email })
            if(findEmail !== null) {
                const verifyPassword = await bcrypt.compareSync(req.body.password, findEmail.password)
                if(verifyPassword) {

                    const genTokenJwt = await jwt.sign({
                            
                        name     : findEmail.name,
                        email    : findEmail.email,
                        gender   : findEmail.gender,
                        location : findEmail.location
        
                    }, process.env.SECRET_KEY)

                    response(res, 200, "success", {
                        name  : findEmail.name,
                        token : genTokenJwt
                    })

                } else {
                    response(res, 400, "email or password is not match !")
                }

            } else {
                response(res, 400, "email or password is not match !")
            }
            
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    register : async (req, res, next) => {
        try {
            const findEmail = await userModels.findOne({ username : req.body.email })
            if(findEmail === null) {
                const hashPassword = await bcrypt.hashSync(req.body.password, genSalt)
                const createUser = {
                    avatar      : "http://localhost:3000/assets/blank_user.png",
                    name        : req.body.name,
                    bio         : "hi, i used findUS !",
                    gender      : req.body.gender,
                    location    : {
                        latitude  : req.body.location.latitude,
                        longitude : req.body.location.longitude
                    },
                    username    : req.body.email,
                    password    : hashPassword,
                    createdAt   : await curentTime()
                }

                const create = await userModels.create(createUser)
                response(res, 201, "success register !", create)

            } else {
                response(res, 400, "failed register, email already use !", null, "EMAIL_USED")
            }

        } catch (error) {
            response(res, 400, error.message)
        }
    }
}

export default authControllers