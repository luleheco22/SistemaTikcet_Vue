import Categoria from "../models/categoria";


export default{
  add: async(req,res,next)=>{
      try {
        const reg=await Categoria.create(req.body)
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
        const reg=await Categoria.findOne({_id:id})
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
        const reg= await Categoria.find(
            {$or:[{'nombre':new RegExp(valor,'i')},
        {
            'descripcion':new RegExp(valor,'i')
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

  update: async(req,res,next)=>{
    const {_id,nombre,descripcion}=req.body
    try {
        const reg= await Categoria.findByIdAndUpdate({
            _id:_id
        },
        {nombre,
        descripcion
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
        const reg= await Categoria.findByIdAndDelete({
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
      const reg= await Categoria.findByIdAndUpdate({
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
        const reg= await Categoria.findByIdAndUpdate({
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

}