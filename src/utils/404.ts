import asyncHandler from "express-async-handler";


const notFound=asyncHandler(async(req,res)=>{

    res.status(404).json({
        success:false,
        message:'invalid api endpont'
    })
})

export default notFound