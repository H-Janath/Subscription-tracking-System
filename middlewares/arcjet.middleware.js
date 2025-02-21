import aj from '../config/arcjet.js'

const arcjetMiddleware = async (req,res,next)=>{
    console.log("janath")
    try {
        const decision = await aj.protect(req,{requested:1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit())return res.status(429).json({message:'Rate limit exceeded'});
            if(decision.reson.isBot()) return res.status(403).json({error: 'Bot detected'})
            return res.status(403).json({eror: 'Access denied'});
        }
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Erro: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;