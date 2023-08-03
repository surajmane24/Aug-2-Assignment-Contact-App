import { ContactInfo } from "./ContactInfo.js";
import { NotFound } from "./NotFound.js";
import { Validation } from "./Validation.js";

export class Contact{
    static ID = 1
    constructor(fullName){
        this.ID = Contact.ID++
        this.fullName = fullName
        this.contactInfos = []
    }
    static newContact(fullName){
        return new Contact(fullName)
    }
    getContactID(){
        return this.ID
    }
    getContactFullName(){
        return this.fullName
    }
    setContactFullName(name){
        this.fullName = name
    }
//====================================================================
    createContactInfo(type, value){
            let ContactInfoCreated = ContactInfo.newContactInfo(type, value)
            this.contactInfos.push(ContactInfoCreated)
            return this.contactInfos
    }
    
    getContactInfo(){
        return this.contactInfos
    }
    findContactInfo(ID){
        try {
            if(typeof ID != "number"){
                throw new Validation("Invalid Contact Info ID")
            }
            for (let index = 0; index < this.contactInfos.length; index++) {
                if(ID == this.contactInfos[index].ID){
                    return index
                }
            }
            throw new NotFound("Contact Info ID is Not Found")
        } catch (error) {
            throw error
        }
    }
    updateContactInfo(contactInfoID, value){
        try {
            if(typeof contactInfoID != "number"){
                throw new Validation("Invalid Contact Info ID")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
            this.contactInfos[indexOfContactInfo].updateContactInfo(value);
            return this.contactInfos[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }
    deleteContactInfo(contactInfoID){
        try {
            if(typeof contactInfoID != "number"){   
                throw new Validation("Invalid Contact ID")    
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
            this.contactInfos.splice(indexOfContactInfo,1)
            return this.contactInfos
        } catch (error) {
            throw error
        }
    }
    getContactInfoByID(contactinfoID){
        let indexOfContactInfo = this.findContactInfo(contactinfoID)
        return this.contactInfos[indexOfContactInfo]
    }
}

