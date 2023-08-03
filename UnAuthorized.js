import { BaseError } from "./BaseError.js";

export class UnAuthorized extends BaseError{
    constructor(specification){
        super("Unauthorized Access", "unauthorized", 401, specification)
    }
}