import {videos} from "./db";
import {client} from "./db";

const videosCollection = client.db().collection('videos- management')


export const videosRepository = {
    async getVideos() {
        return videos
    },
    async getVideoById(id: number) {
        const video = await videosCollection.findOne({id})
        if (video) {
            return video
        } else {
            return null
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
    async createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        const videos = await videosCollection.insertOne(newVideo)
        return newVideo
        }
}