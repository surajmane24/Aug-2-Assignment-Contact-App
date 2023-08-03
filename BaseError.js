export class BaseError extends Error{
    constructor(message, name,httpStatusCode ,specification){
        super(message, name)
        this.httpStatusCode = httpStatusCode
        this.specification = specification
    }
}