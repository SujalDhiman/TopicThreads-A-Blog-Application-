import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const response= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage:featuredImage,
                    status,
                    userid:userId,
                }
            )
            console.log("create post response",response)
            return response
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            console.log("slug in updatePost",slug)
            const response= await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
            console.log("update document response",response)
            return response
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            console.log("slug in deletePost",slug)
            const response=await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            console.log("deletePost response",response)
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            console.log("slug in getPost",slug)
            const response= await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            console.log("get post response",response)
            return response
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const response=  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            console.log("get posts response",response)
            return response
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            console.log("file parameter in upload file",file)
            const response= await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log("uplaod file response",response)
            return response
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            console.log("fileId in deleteFile",fileId)
            const response= this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            console.log("deleteFile response",response)
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        console.log("fileId in getFilePreview",fileId)
        const response= this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        console.log("getFilePreview response",response.href)
        return response.href
        
    }
}


const service = new Service()
export default service