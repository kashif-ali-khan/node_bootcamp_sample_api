const errorHandler = (error, req, res, next) => {
    res.json(500,{
        success:false,
        error: error.message
    })
}

module.exports = errorHandler;