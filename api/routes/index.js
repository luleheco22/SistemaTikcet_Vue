import { Router } from "express";
import usuarioRouter from './usuario'
import categoriaRouter from "./categoria";
import personaRouter from './persona'
import ticketRouter from './ticket'
const router=Router()


router.use('/usuario',usuarioRouter)
router.use('/categoria',categoriaRouter)
router.use('/persona',personaRouter)
router.use('/ticket',ticketRouter)


export default router