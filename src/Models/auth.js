const mongoose =require("mongoose");

//creating schema for autherization

const AuthSchema=mongoose.schema({
    //properties and fields of the schema

    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//exporting this schema
module.exports=mongoose('AuthSchema',AuthSchema);