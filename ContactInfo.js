export class ContactInfo{
    static ID = 1
    constructor(type, value){
        this.ID = ContactInfo.ID++
        this.typeOfContact = type
        this.valueOfContact = value
    }
    static newContactInfo(type, value){
        return new ContactInfo(type, value)
    }

    updateContactInfo(value){
        return this.valueOfContact = value
    }

}