import { BaseError } from "./BaseError.js";

export class Validation extends BaseError{
    constructor(specification){
        super("Invalid Input", "Invalid", 403, specification)
    }
}