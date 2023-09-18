import asyncHandler from "express-async-handler";


const notFound=asyncHandler(async(req,res)=>{

    res.json({
        success:false,
        message:'invalid api endpont'
    })
})

export default notFound