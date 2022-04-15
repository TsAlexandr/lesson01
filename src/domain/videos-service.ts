import {videosRepository} from "../repositories/videos-repository";

export const videosService = {
    async getVideos() {
        return videosRepository.getVideos()
    },
    async getVideoById(id: number) {
        return videosRepository.getVideoById(id)

    },
    async deleteVideoById(id: number) {
        return await videosRepository.deleteVideoById(id)
    },
    async updateVideoById(id: number, title: string) {
        return await videosRepository.updateVideoById(id, title)
    },
    async createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        return await videosRepository.createVideo(newVideo)
    }
}