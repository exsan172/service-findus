import { calcCrow, response } from '../config'
import userModels from '../models/user.models'

const findControllers = {
    around : async (req, res, next) => {
        let nearMe = []
        const filterGender = req.body.gender !== undefined ? { gender : req.body.gender } : null
        const findUser = await userModels.find(filterGender, '_id avatar name bio gender location')
        
        for(const i in findUser) {
            const countDist = calcCrow(req.user.location.latitude, req.user.location.longitude, findUser[i].location.latitude, findUser[i].location.longitude)
            if(countDist <= req.body.range){
                nearMe.push({
                    _id     : findUser[i]._id,
                    avatar  : findUser[i].avatar,
                    name    : findUser[i].name,
                    bio     : findUser[i].bio,
                    gender  : findUser[i].gender,
                    distance: countDist
                })
            }
        }

        response(res, 200, "success", nearMe)
    }
}

export default findControllers