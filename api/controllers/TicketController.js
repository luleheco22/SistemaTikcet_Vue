
import Ticket from "../models/ticket";


export default{
  add: async(req,res,next)=>{
      try {
        const reg=await Ticket.create(req.body)
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
        const reg=await Ticket.findOne({_id:id})
        .populate('asignado',{nombre:1})
        .populate('solicitante',{nombre:1})
        .populate('tipo_ticket',{nombre:1})
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
        const reg= await Ticket.find(
            {$or:[{'prioridad':new RegExp(valor,'i')}
    ]
        
        })
        .populate('asignado',{nombre:1})
        .populate('solicitante',{nombre:1})
        .populate('tipo_ticket',{nombre:1})
        .sort({'createdAt':-1}) //ordena de manera desc
        res.status(200).json(reg)

    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},
  listByUser: async(req,res,next)=>{
    try {
      let valor=req.query.valor
      const reg= await Ticket.find(
          {$or:[{'prioridad':new RegExp(valor,'i')}
  ]
      
      })
      .populate('asignado',{nombre:1})
      .populate('solicitante',{nombre:1})
      .populate('tipo_ticket',{nombre:1})
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
  const {_id,titulo,descripcion,tipo_ticket,asignado,solicitante,prioridad}=req.body
  try {
      const reg= await Ticket.findByIdAndUpdate({
          _id:_id
      },
      {titulo,
      descripcion,
      tipo_ticket,
      asignado,
      solicitante,
      prioridad
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
      const reg= await Ticket.findByIdAndUpdate({
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
        const reg= await Ticket.findByIdAndUpdate({
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


  consultaFechas: async(req,res,next)=>{
     const {start,end}=req.query
    try {
        const reg= await Ingreso.find({
          'createAt':{
            '$gte':start,
            '$lt':end
          }
        })
        .populate('usuario',{nombre:1})
        .populate('persona',{nombre:1})
        .sort({'createdAt':-1}) //ordena de manera desc
        res.status(200).json(reg)

    } catch (error) {
     res.status(500).send({
         message:'Ocurrio un error'
     });
     next(error)
   }
},

}