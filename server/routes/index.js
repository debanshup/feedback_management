import { Router } from 'express';
var indexRouter = Router();
import { response } from 'express';

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
    console.log("passed");    
    res.json({message:"Hello Im here"})
});

export default indexRouter;
