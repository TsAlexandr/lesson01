import {videosCollection, VideoType} from "./db";


export const videosRepository = {
    async getVideos() {
        const video = await videosCollection.find().toArray()
            return video
    },
    async getVideoById(id: number) {
        const video = await videosCollection.findOne({id})
            return video

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
        await videosCollection.insertOne(newVideo)
        return newVideo
        }
}