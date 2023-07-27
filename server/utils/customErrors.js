class MyError extends Error {
    constructor(message,errorName) {
        super(message)
        this.msg = message;
        this.name = errorName;
        Error.captureStackTrace(this, MyError);
    }
};

/**
 * 
 * @param { Error } err Error catched
 * @returns Obj {error:"errorName", status:300, msg:"Messague error"}
 */
function defaultError(err) {
    console.log(err);
    return {
        error:`${err.name}`,
        status: 300,
        msg:`${err}`,
    };
};

module.exports = { MyError, defaultError}