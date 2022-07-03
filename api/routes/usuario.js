import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import auth from "../middlewares/auth";

const {verifyAdministrador}=auth
const {add,query,list,update,remove,activate,desactivate,login}=usuarioController
const router = Router();

router.post('/add',verifyAdministrador,add)
router.get('/query',verifyAdministrador,query)
router.get('/list',verifyAdministrador,list)
router.put('/update',verifyAdministrador,update)
router.delete('/remove',verifyAdministrador,remove)
router.put('/activate',verifyAdministrador,activate)
router.put('/desactivate',verifyAdministrador,desactivate)
router.post('/login',login)

export default router