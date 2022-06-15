import mongose from 'mongoose'

const user = mongose.Schema({
    avatar : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    bio : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    location : {
        type : Object,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

export default mongose.model("user", user)