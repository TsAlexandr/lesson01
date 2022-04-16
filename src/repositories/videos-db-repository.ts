import {videos} from "./db";
import {VideoType} from "./db";

export const videosRepository = {
    getVideos() {
        return videos
    },
    getVideoById(id: number) {
        return videos.find(v => v.id === id)
    },
    deleteVideoById(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            return true
        } else {
            return false
        }
    },
    createVideo(newVideo: VideoType) {
        videos.push(newVideo)
        return newVideo
    }
}