import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
 
const router = Router();

router.get('/', (req, res, next) => {
    res.status(StatusCodes.ACCEPTED).send({
        title: 'deu certo'
    });
});

router.post('/teste', (req, res, next) => {
    console.log(req.body);
    res.status( StatusCodes.CREATED).json(req.body)
});

export{ router };