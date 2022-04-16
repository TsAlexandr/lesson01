import {videosCollection, VideoType} from "./db";


export const videosRepository = {
    async getVideos() {
        const videos = await videosCollection.find().toArray()
        return videos
    },
    async getVideoById(id: number) {
        const videoById = await videosCollection.findOne({id})
        if(videoById) {
            return {
                id: videoById.id,
                author: videoById.author,
                title: videoById.title
            }
        } else{
            return false
        }
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
        return {
            id: newVideo.id,
            title: newVideo.title,
            author: newVideo.author
        }
    }
}