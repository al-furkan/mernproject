const errorResponse = (res, {statusCode = 500,message = "Internal Server Error"}) => {
    return res.status(statusCode ||500).json({
        success:false,
        message: message,

    });

};

const successResponse = (res, {statusCode = 200,message = 'Success',payload ={}}) => {
    return res.status(statusCode ||500).json({
        success:true,
        message: message,
        payload,
    });

}

module.exports = {errorResponse , successResponse };