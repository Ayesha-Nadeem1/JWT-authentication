class createError extends Error{
    constructor(mes,stCode){
        super(mes);

        this.stCode= stCode;
        this.status= `${stCode}`.startsWith('4') ? 'fail':'error';

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = createError;