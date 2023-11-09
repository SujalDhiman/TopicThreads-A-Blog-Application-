import {ID,Account,Client} from "appwrite"
import { details } from "../conf/conf";

class AuthService
{
    client=new Client();
    account;
    constructor()
    {
        this.client.setEndpoint(details.APPWRITE_URL).setProject(details.APPWRITE_PROJECT_ID)
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name})
    {
        try {
            const response=await this.account.create(ID.unique(),email,password,name)
            console.log(response)
            return response
        } catch (error) {
            console.log("error in  create account: Appwrite auth.js")
        }
    }

    async login({email,password})
    {
        try {
            const response=await this.account.createEmailSession(email,password);
            console.log(response)
            return response
        } catch (error) {
            console.log("error in  login account: Appwrite auth.js")
        }
    }

    async logout()
    {
        try {
            const response=await this.account.deleteSessions()
            console.log(response)
            return response
        } catch (error) {
            console.log("error in  logout account: Appwrite auth.js")
        }
    }

    async getCurrentUser()
    {
        try {
            const user=await this.account.get()
            console.log(user)
            return response
        } catch (error) {
            console.log("error in  logout account: Appwrite auth.js")
        }
    }
}


const authService=new AuthService()

export default authService