import Usuario from "../models/usuario";
import bcrypt from 'bcryptjs'
import token from "../services/token";

export default{
  add: async(req,res,next)=>{
    req.body.password = await bcrypt.hash(req.body.password,10);
      try {
        const reg=await Usuario.create(req.body)
        res.status(200).json(reg)
      } catch (error) {
        res.status(500).send({
            message:'Ocurrio un error'
        });
        next(error)
      }
  },

  query: async(req,res,next)=>{
    const {id}=req.query
       try {
        const reg=await Usuario.findOne({_id:id})
        if (!reg) {
            res.status(404).send({
                message:'El registro no existe'
            })
        }else{
            res.status(200).json(reg)
        }
       } catch (error) {
        res.status(500).send({
            message:'Ocurrio un error'
        });
        next(error)
      }
       
},

  list: async(req,res,next)=>{
  
    try {
        let valor=req.query.valor
        const reg= await Usuario.find(
            {$or:[{'nombre':new RegExp(valor,'i')},
        {
            'email':new RegExp(valor,'i')
        }]
        },
        {
           createdAt:0 //no muestra este campo en la lista
        })
        .sort({'createdAt':-1}) //ordena de manera desc
        res.status(200).json(reg)

    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

listClientes: async(req,res,next)=>{
  
  try {
      let valor=req.query.valor
      const reg= await Usuario.find(
          {$or:[{'nombre':new RegExp(valor,'i')},
      {
          'email':new RegExp(valor,'i')
      }],'rol':'Cliente'//filtra solo las personas de tipo CLientes
      },
      {
         createdAt:0 //no muestra este campo en la lista
      })
      .sort({'createdAt':-1}) //ordena de manera desc
      res.status(200).json(reg)

  } catch (error) {
   res.status(500).send({
       message:'Ocurrio un error'
   });
   next(error)
 }
},

  update: async(req,res,next)=>{
    try {
      const {_id,rol,nombre,tipo_documento,num_documento,direccion,telefono,email,password}=req.body
        let pas=password
        console.log(pas)
        const reg0=await Usuario.findOne({_id:_id})
        console.log(reg0)
        if (pas!=reg0.password){
          req.body.password = await bcrypt.hash(req.body.password,10); 
      }  
        const reg= await Usuario.findByIdAndUpdate({
            _id:_id
        },
        {nombre,
        rol,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password:req.body.password
    })
      res.status(200).json(reg)
    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

  remove: async(req,res,next)=>{
    const {id}=req.body
    try {
        const reg= await Usuario.findByIdAndDelete({
            _id:id
        })
        res.status(200).json(reg)
    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

  activate: async(req,res,next)=>{
    const {_id}=req.body
    try {
      const reg= await Usuario.findByIdAndUpdate({
        _id:_id
      },
      {
        estado:1
      })  
      res.status(200).json(reg)
    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

  desactivate: async(req,res,next)=>{
    const {_id}=req.body
    try {
        const reg= await Usuario.findByIdAndUpdate({
            _id:_id
          },
          {
            estado:0
          })  
          res.status(200).json(reg)
    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

   login: async(req,res,next)=>{
        const {email,password}=req.body
     try {
       let user= await Usuario.findOne({email:email,estado:1})
       if (user) {
          let match= await bcrypt.compare(password,user.password) 
          if (match) {
             let tokenReturn= await token.encode(user._id,user.rol,user.email)
             res.status(200).json({user,tokenReturn})
          }else(
            res.status(404).send({
              message:'Password Incorrecto'
            })
          )
       }else{
        res.status(404).send({
          message:'No existe el usuario'
        })
       }
     } catch (error) {
      res.status(500).send({
        message:'Ocurrio un error'
    });
    next(error)
     }

   }

}