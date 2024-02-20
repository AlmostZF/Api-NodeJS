import { StatusCodes } from "http-status-codes";
import { port } from "../environment";
import server, { router } from "./server";

server.listen(port, () => console.log('Servidor funcionando'));
router.get('/', (req, res, next) => {
    res.status(StatusCodes.ACCEPTED).send({
        title: {message:'deu certo'}
    });
});

router.get('/', (req, res, next) => {
    res.status(StatusCodes.ACCEPTED).send({
        title: {message:'deu certo'}
    });
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.status( StatusCodes.CREATED).json(req.body)
});

router.put('/',(req, res, next)=>{
    console.log(req.body);
    res.status(StatusCodes.OK).json(req.body)
})

router.delete('/', (req, res, next)=>{
    console.log(req.body);
    res.status(StatusCodes.OK).json(req.body)
})
