import {Router} from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middlewares.js'
const   useRouter = Router();

useRouter.get('/',getUsers);

useRouter.get('/:id',authorize,getUser);

useRouter.post('/',(req,res)=>res.send({title: 'Create new users'}));

useRouter.put('/:id',(req,res)=>res.send({title: 'Update user by id'}));

useRouter.delete('/:id',(req,res)=>res.send({title: 'Delete user'}));

export default useRouter;