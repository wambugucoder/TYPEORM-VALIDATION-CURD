import { CreateUser, GetOne, Remove, AllUsers } from './controller/UserController';
import * as express from "express";
import { Router } from "express";


const router: Router = express.Router();
router.get('/user', AllUsers);
router.delete('/user/:id', Remove);
router.get('/user/:id',GetOne );
router.post('/user', CreateUser);

export default router;