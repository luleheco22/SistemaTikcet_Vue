import tokenServices from "../services/token";

export default{
    verifyUsuario: async(req,res,next)=>{
      if (!req.headers.token) {
          return res.status(404).send({
            message:'No token'
          })
      }
      const response= await tokenServices.decode(req.headers.token)
      if (response.rol==='Administrador' || response.rol==='Analista' || response.rol==='Gerente' || response.rol==='Cliente') {
         next()
      }else{
        return res.status(403).send({
            message: 'No autorizado'
        })
      }

    },

    verifyAdministrador: async(req,res,next)=>{
        if (!req.headers.token) {
            return res.status(404).send({
              message:'No token'
            })
        }
        const response= await tokenServices.decode(req.headers.token)
        if (response.rol==='Administrador') {
           next()
        }else{
          return res.status(403).send({
              message: 'No autorizado'
          })
        }

    },

    verifyAnalista: async(req,res,next)=>{
        if (!req.headers.token) {
            return res.status(404).send({
              message:'No token'
            })
        }
        const response= await tokenServices.decode(req.headers.token)
        if (response.rol==='Administrador' || response.rol==='Analista') {
           next()
        }else{
          return res.status(403).send({
              message: 'No autorizado'
          })
        }

    },

    verifyGerente:  async(req,res,next)=>{
        if (!req.headers.token) {
            return res.status(404).send({
              message:'No token'
            })
        }
        const response= await tokenServices.decode(req.headers.token)
        if (response.rol==='Administrador' || response.rol==='Gerente') {
           next()
        }else{
          return res.status(403).send({
              message: 'No autorizado'
          })
        }

    },
    verifyCliente:  async(req,res,next)=>{
        if (!req.headers.token) {
            return res.status(404).send({
              message:'No token'
            })
        }
        const response= await tokenServices.decode(req.headers.token)
        if (response.rol==='Administrador' || response.rol==='Cliente') {
           next()
        }else{
          return res.status(403).send({
              message: 'No autorizado'
          })
        }

    },
}