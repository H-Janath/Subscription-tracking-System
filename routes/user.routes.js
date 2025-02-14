import {Router} from 'express';
const useRouter = Router();

useRouter.get('/',(req,res)=>res.send({title: 'GET all users'}));

useRouter.get('/:id',(req,res)=>res.send({title: 'GET user details'}));

useRouter.post('/',(req,res)=>res.send({title: 'Create new users'}));

useRouter.put('/:id',(req,res)=>res.send({title: 'Update user by id'}));

useRouter.delete('/:id',(req,res)=>res.send({title: 'Delete user'}));

export default useRouter;