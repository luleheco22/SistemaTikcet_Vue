import { Router } from "express";
import ticketController from "../controllers/TicketController";
import auth from "../middlewares/auth";

const {verifyAnalista,verifyUsuario}=auth
const {add,query,list,listByUser,update,activate,desactivate,consultaFechas,close,activarPermiso,desactivarPermiso}=ticketController
const router = Router();

router.post('/add',verifyUsuario,add)
router.get('/query',verifyAnalista,query)
router.get('/list',verifyAnalista,list)
router.get('/listByUser',verifyUsuario,listByUser)
router.get('/consultaFechas',verifyUsuario,consultaFechas)
router.put('/update',verifyUsuario,update)
router.put('/activate',verifyAnalista,activate)
router.put('/desactivate',verifyUsuario,desactivate)
router.put('/activarPermiso',verifyUsuario,activarPermiso)
router.put('/desactivarPermiso',verifyUsuario,desactivarPermiso)
router.put('/close',verifyUsuario,close)

export default router