import { Router } from "express";
import personaController from "../controllers/PersonaController";
import auth from "../middlewares/auth";

const {verifyUsuario}=auth
const {add,query,list,update,remove,activate,desactivate}=personaController
const router = Router();

router.post('/add',verifyUsuario,add)
router.get('/query',verifyUsuario,query)
router.get('/list',verifyUsuario,list)
router.put('/update',verifyUsuario,update)
router.delete('/remove',verifyUsuario,remove)
router.put('/activate',verifyUsuario,activate)
router.put('/desactivate',verifyUsuario,desactivate)


export default router