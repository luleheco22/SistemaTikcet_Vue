import jwt from "jsonwebtoken";
import Usuario from "../models/usuario";
import models from '../models'


async function checkToken(token){
    let idt=null
    try {
        const {_id}=await jwt.decode(token)
        idt=_id
    } catch (error) {
        return false
    }

    const user= await Usuario.findOne({_id:idt,estado:1})
    console.log(user)
    if (user) {
        const token=jwt.sign({_id:idt},'claveSecreta',{expiresIn:'1d'})
        return {token,rol:user.rol}
    }else{
        return false
    }
}


export default{
    encode: async(_id,rol,email,nombre)=>{
       const token=jwt.sign({_id,rol,email,nombre},'claveSecreta',{expiresIn:'1d'})
       return token
    },

    decode: async (token)=>{
        try {
          const {_id}= await jwt.verify(token,'claveSecreta')
          const user= await models.Usuario.findOne({_id,estado:1}) 
          if (user) {
             return user
          } else{
            return false
          }
        } catch (error) {
            const newToken= await checkToken(token)
            return newToken
        }
    }
}