import { Router } from "express";
import categoriaController from "../controllers/CategoriaController";
import auth from "../middlewares/auth";

const {verifyGerente}=auth
const {add,query,list,update,remove,activate,desactivate}=categoriaController
const router = Router();

router.post('/add',verifyGerente,add)
router.get('/query',verifyGerente,verifyGerente,query)
router.get('/list',verifyGerente,list)
router.put('/update',verifyGerente,update)
router.delete('/remove',verifyGerente,verifyGerente,remove)
router.put('/activate',verifyGerente,activate)
router.put('/desactivate',verifyGerente,desactivate)

export default router