import { BaseError } from "./BaseError.js";

export class NotFound extends BaseError{
    constructor(specification){
        super("Not Found", "Not-Found", 404, specification)
    }
}