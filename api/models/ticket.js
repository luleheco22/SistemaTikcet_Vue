import mongoose,{Schema} from "mongoose";

const ticketSchema= new Schema({
    titulo:{
        type:String,
        maxlength:50,
        unique:true,
         required:true
    },
    descripcion:{
        type:String,
        maxlength:255
    },
    tipo_ticket:{
        type: Schema.Types.ObjectId, ref:'categoria',
        required:true ,
        unique:false
        
    },
    asignado:{
        type: Schema.Types.ObjectId, ref:'usuario',
        required:true 
    },
    solicitante:{
        type: Schema.Types.ObjectId, ref:'persona',
        required:true 
    },
    prioridad:{
        type:String,
        maxlength:50,
         required:true
    },
    estado:{
        type:Number,
        default:1
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
const Ticket= mongoose.model('ticket',ticketSchema)
export default Ticket