const express = require('express');
const router = express.Router();
const cmd=require('node-cmd');

router.post('/cmd',(req,res,next)=>{
    if(req.body.type=='get'){
        console.log(req.body.cmd);
        cmd.get(
            req.body.cmd,
            function(err, data, stderr){
                if(err){
                    return res.status(500).json({
                        status:0,
                        error:err
                    })
                }
                return res.status(200).json({
                    status:1,
                    result:data,
                    stderr:stderr,
                    msg:'end'
                })
            }
        );
    }else{
        cmd.run(req.body.cmd);
        return res.status(200).json({
            status:1,
            msg:'running'
        })
    }
})


module.exports = router;