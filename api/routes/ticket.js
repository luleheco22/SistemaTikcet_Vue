import { Router } from "express";
import ticketController from "../controllers/TicketController";
import auth from "../middlewares/auth";

const {verifyAnalista,verifyUsuario}=auth
const {add,query,list,update,activate,desactivate,listByUser,consultaFechas}=ticketController
const router = Router();

router.post('/add',verifyUsuario,add)
router.get('/query',verifyAnalista,query)
router.get('/list',verifyAnalista,list)
router.get('/listByUser',verifyUsuario,listByUser)
router.get('/consultaFechas',verifyUsuario,consultaFechas)
router.put('/update',verifyAnalista,update)
router.put('/activate',verifyAnalista,activate)
router.put('/desactivate',verifyAnalista,desactivate)

export default router