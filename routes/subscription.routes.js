import {Router} from 'express';
import authorized from '../middlewares/auth.middlewares.js'
import {createSubscription} from '../controllers/subscription.controller.js'
const subscriptionRouter = new Router();

subscriptionRouter.get('/',(req,res)=>res.send({title:"GET all subscription"}));
subscriptionRouter.get('/:id',(req,res)=>res.send({title:"GET subscription details"}));
subscriptionRouter.post('/',authorized,createSubscription);
subscriptionRouter.put('/:id',(req,res)=>res.send({title:"Update subscription"}));
subscriptionRouter.delete('/:id',(req,res)=>res.send({title:"Delete subscription"}));
subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:"GET all user subscription"}));
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:"Cancel subscription"}));
subscriptionRouter.put('/upcoming-renewals',(req,res)=>res.send({title:"GET upcoming renewals"}));


export default subscriptionRouter;