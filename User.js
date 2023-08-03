import { Contact } from "./Contact.js";
import { UnAuthorized } from "./UnAuthorized.js";
import { NotFound } from "./NotFound.js";
import { Validation } from "./Validation.js";

class User{
    static allUser = []
    static ID = 1
    constructor(fullName, isAdmin, gender, country){
        this.ID = User.ID++
        this.fullName = fullName
        this.isAdmin = isAdmin
        this.gender = gender
        this.country = country
        this.contacts = []
    }

    newUser(fullName, gender, country){
        try {
            if(typeof fullName != "string"){    
                throw new Validation("Invalid Full Name");    
            }
            if(gender != "M" && gender != "F"){  
                throw new Validation("Invalid Gender")    
            }
            if(typeof country != "string"){     
                throw new Validation("Invalid Country")
            }
            if(!this.isAdmin){    
                throw new UnAuthorized("Unauthorized User")   
            }

            let userObj = new User(fullName, false, gender, country)
            User.allUser.push(userObj)
            return userObj
        } catch (error) {
            return error.specification
        }
    }
    static newAdmin(fullName, gender, country){
        try {
            if(typeof fullName != "string"){    
                throw new Validation("Invalid Full Name");    
            }
            if(gender != "M" && gender != "F"){  
                throw new Validation("Invalid Gender")    
            }
            if(typeof country != "string"){     
                throw new Validation("Invalid Country")
            }
            return new User(fullName, true, gender, country)
        } catch (error) {
            return error.specification
        }
    }
    getUserID(){
        return this.ID
    }
    getUserFullName(){
        return this.fullName
    }
    getUserGender(){
        return this.gender
    }
    getUserCountry(){
        return this.country
    }
    setUserFullName(name){
        this.fullName = name
    }
    setUserGender(gender){
        this.gender = gender
    }
    setUserCountry(country){
        this.country = country
    }
    getAllUser(){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Do not have Access")
            }
            return User.allUser
        } catch (error) {
            return error.specification
        }
        
    }
    static findUser(userID){
        try {
            // console.log(User.allUser[1].getUserID());
            for (let index = 0; index < User.allUser.length; index++) {
                if(userID == User.allUser[index].getUserID()){     //====================================
                    return index    
                }  
            }
            throw new NotFound("User ID Not Found")
        } catch (error) {
            throw error
        }
    }
    updateUser(userID, parameter, value){
        try {
            if(typeof value != "string"){   
                throw new Validation("Invalid Value")  
            }
            if(typeof userID != "number"){   
                throw new Validation("Invalid User ID")  
            }
            if(!this.isAdmin){   
                throw new UnAuthorized("Unauthorized User")  
            }
            let indexOfUser = User.findUser(userID)
            switch(parameter){
                case "fullName":
                    User.allUser[indexOfUser].setUserFullName(value)
                    return User.allUser[indexOfUser].getUserFullName()
                case "gender":
                    if(value != "M" && value != "F"){
                        throw new Validation("Invalid Gender, it be a M or F")    
                    }
                    User.allUser[indexOfUser].setUserGender(value)
                    return User.allUser[indexOfUser].getUserGender()
                case "country":
                    User.allUser[indexOfUser].setUserCountry(this.country)
                    return User.allUser[indexOfUser].getUserCountry()
                default :
                    throw new Validation("Invalid Parameter")
        }
        } catch (error) {
            return error.specification
        }
    }
    deleteUser(userID){
        try {
            if(typeof userID != "number"){   
                throw new Validation("Invalid User ID")
            }
            if(!this.isAdmin){  
                throw new UnAuthorized("User do nor have a access") 
            }
            let indexOfUser = User.findUser(userID)
            return User.allUser.splice(indexOfUser,1)
        } catch (error) {
            return error.specification
        }
        
    }
    getUserByID(userID){
        try {
            if(!this.isAdmin){  
                throw new UnAuthorized("User do nor have a access") 
            }
            if(typeof userID != "number"){
                throw new Validation("Invalid User ID")
            }
            let indexOFUser = User.findUser(userID)
            return User.allUser[indexOFUser]
        } catch (error) {
            return error.specification
        }
    }
//=========================================================================================
    createContact(fullName){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin not have access")  
            }
            if(typeof fullName != "string"){
                throw new Validation("Invalid Full Name")
            }
            let newContact = Contact.newContact(fullName)
            this.contacts.push(newContact)
            return newContact
        } catch (error) {
            return error.specification
        }
    }
    getContacts(){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin not have access")
            }
            return this.contacts
        } catch (error) {
            return error.specification
        }
    }
    findContact(contactID){
        try {
            for (let index = 0; index < this.contacts.length; index++) {
                if(contactID == this.contacts[index].getContactID()){     //====================================
                    return index
                }
            }
            throw new NotFound("Contact ID Not found")
        } catch (error) {
            throw error
        }
    }
    updateContact(contactID, name){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin not have access")  
            }
            if(typeof name != "string"){   
                throw new Validation("Invalid Full Name")  
            }
            if(typeof contactID != "number"){  
                throw new Validation("Invalid Contact ID")  
            }
            let indexOfContact = this.findContact(contactID)
            this.contacts[indexOfContact].setContactFullName(name)//==================
            return this.contacts[indexOfContact]
        } catch (error) {
            return error.specification
        }
    }
    
    deleteContact(contactID){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin not have Access")  
            }
            if(typeof contactID != "number"){   
                throw new Validation("Invalid Contact ID")  
            }
            let indexOfUser = this.findContact(contactID)
            return this.contacts.splice(indexOfUser,1)
        } catch (error) {
            return error.specification
        }
    }
    getContactByID(contactID){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("unauthorized Access")
            }   
            if(typeof contactID != "number"){
                throw new Validation("Invalid Contact ID")
            }    
            let indexOfContact = this.findContact(contactID)   
            return this.contacts[indexOfContact]  
        } catch (error) {
            return error.specification
        }
    }
//==================================================================================================
    createContactInfo(contactID, typeOfContact, valueOfContact  ){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin Not have Access")  
            }
            if(typeof contactID != 'number'){
                throw new Validation("Contact ID is Invalid")
            }
            if(typeof typeOfContact != 'string'){
                throw new Validation("Invalid Type of Contact")
            }
            let indexOfContact = this.findContact(contactID)
            this.contacts[indexOfContact].createContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error.specification
        }
    }
    getContactInfo(contactID){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin do not have Access") 
            }
            if(typeof contactID != 'number'){
                throw new Validation("Invalid Contact ID")
            }
            let indexOfContact = this.findContact(contactID)
            return this.contacts[indexOfContact].getContactInfo()
        } catch (error) {
            return error.specification
        }
    }
    updateContactInfo(contactID, contactInfoID, value){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin do not have Access")
            }
            if(typeof contactID != "number"){   
                throw new Validation("Invalid Contact ID")
            }
            let indexOfContact = this.findContact(contactID)
            this.contacts[indexOfContact].updateContactInfo(contactInfoID, value)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error.specification
        }
    }
    deleteContactInfo(contactID, contactInfoID){
        try {
            if(this.isAdmin){   
                throw new UnAuthorized("Admin do not have Access")  
            }
            if(typeof contactID != "number"){   
                throw new Validation("Invalid Contact ID") 
            }
            let indexOfContact = this.findContact(contactID)
            this.contacts[indexOfContact].deleteContactInfo(contactInfoID)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error.specification
        }
    }
    getContactInfoByID(contactID, contactInfoID){
        try {
            if(typeof contactID != 'number'){
                throw new Validation("Invalid Contact ID")
            }
            if(typeof contactInfoID != 'number'){
                throw new Validation("Invalid Contact Info ID")
            }
            let indexOfContact = this.findContact(contactID)
            return this.contacts[indexOfContact].getContactInfoByID(contactInfoID)
        } catch (error) {
            return error.specification
        }
    }

}

let a = User.newAdmin("Harry", "M", "IND")
let user = a.newUser("Jhon", "M", "AUS")
console.log("=============================================");
// console.log(a);
// console.log(user);
// console.log(a.updateUser(2, "country","IND"));
// console.log(a.getUserByID(2));
// console.log(a.getAllUser());
// console.log(a.deleteUser(2));
// console.log(a.getAllUser());
//==========================================================================================
console.log(user.createContact("Karan Kadam"));
console.log(user.createContact("Vijay Kadam"));
console.log(user.createContact("Raj Kadam"));
// console.log(user.deleteContact(1));
// console.log(user.updateContact(1,"jesh"));
// console.log(user.getContacts());
// console.log(user.getContactByID(3));
// console.log(user.updateContact(1, "somesh Solanki"));
//==========================================================================================
console.log(user.createContactInfo(1, "Address", "Block-2, Kerala"));
console.log(user.createContactInfo(1, "Number", 999999999));
console.log(user.updateContactInfo(1, 2, 22222222));
// console.log(user.deleteContactInfo(1));
// console.log(user.getContactInfo(1));
// console.log(user.deleteContactInfo(1,2));
console.log(user.getContactInfo(1));
console.log(user.getContactInfoByID(1,2));
// console.log();
// console.log();
// console.log();



