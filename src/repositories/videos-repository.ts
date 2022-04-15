import {videosCollection, VideoType} from "./db";


export const videosRepository = {
    async getVideos() {
        return await videosCollection.find().toArray()
    },
    async getVideoById(id: number) {
        return await videosCollection.findOne({id})
    },
    async deleteVideoById(id: number) {
        const delVideo = await videosCollection.deleteOne({id})
        return delVideo.deletedCount === 1
    },
    async updateVideoById(id: number, title: string) {
       const updVideo = await videosCollection.updateOne(
           {id}, {$set: {title}})
        return updVideo.matchedCount === 1
    },
    async createVideo(newVideo:VideoType) {
        return await videosCollection.insertOne(newVideo)

        }
}