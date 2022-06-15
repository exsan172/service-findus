import { validationResult } from 'express-validator'
import { response } from '../config'

const validator = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return response(res, 400, error.array())
    }

    next()
}

export default validator