import { Client,Databases,Storage,ID, Query } from "appwrite";
import { details } from "../conf/conf";
class Service
{
    client=new Client();
    databases;
    storage;
    constructor()
    {
        this.client.setEndpoint(details.APPWRITE_URL).setProject(details.APPWRITE_PROJECT_ID)
        this.databases=new Databases(client)
        this.storage=new Storage(client)
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try {
            const response=await this.createPost(details.APPWRITE_DATABASE_ID,details.APPWRITE_COLLECTION_ID,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
            console.log(response)
            return response
        } catch (error) {
            console.log("error in create post config.js")
        }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try {
            const response=await this.databases.updateDocument(details.APPWRITE_DATABASE_ID,details.APPWRITE_COLLECTION_ID,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
            console.log(response)
            return response
        } catch (error) {
            console.log("error in update post config.js")
        }
    }

    async deletePost(slug)
    {
        try {
            const response=await this.databases.deleteDocument(details.APPWRITE_DATABASE_ID,details.APPWRITE_COLLECTION_ID,slug)
            console.log(response)
            return response
        } catch (error) {
            console.log("error in delete post config.js")
        }
    }

    async getPost(slug)
    {
        try {
            const response=await this.databases.getDocument(details.APPWRITE_DATABASE_ID,details.APPWRITE_COLLECTION_ID,slug)
            return response
        } catch (error) {
            console.log("error in get document config.js")
        }
    }

    async uploadFile(file)
    {
        try {
            const response=this.storage.createFile(details.APPWRITE_STORAGE_ID,ID.unique(),file)
            console.log(response)
            return response
        } catch (error) {
            console.log("error in upload file")
        }
    }

    async deleteFile(fileId)
    {
        try {
            const response=await this.storage.deleteFile(details.APPWRITE_STORAGE_ID,fileId)
            console.log(response)
            return response
        } catch (error) {
            console.log("error in delete file")
        }
    }

    async getFilePreview(fileId)
    {
        try {
            return this.storage.getFilePreview(details.APPWRITE_STORAGE_ID,fileId)
        } catch (error) {
            console.log("error in preview file")
        }
    }

    async getPosts(queries=[Query.equal("status","active")])
    {
        try {
            return this.databases.listDocuments(details.APPWRITE_DATABASE_ID,details.APPWRITE_COLLECTION_ID,queries)
        } catch (error) {
            console.log("error in getPosts")
        }
    }
}

const appwriteService=new Service()

export default appwriteService

