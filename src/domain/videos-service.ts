import {videos, videosCollection} from "../repositories/db";
import {videosRepository} from "../repositories/videos-repository";



export const videosService = {
    async getVideos() {
        return videosRepository.getVideos()
    },
    async getVideoById(id: number) {
        return videosRepository.getVideoById(id)

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
        return await videosRepository.createVideo(newVideo)
        return newVideo

    }
}