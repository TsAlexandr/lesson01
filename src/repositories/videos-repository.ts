import {videos} from "./db";

export const videosRepository = {
    getVideos() {
        return videos
    },
    getVideoById(id: number) {
        return videos.find(v => v.id === id)

    },
    deleteVideoById: function (id: number) {
        const delVideo = videos.filter(video => video.id === id)
        if (delVideo && videos.indexOf(delVideo[0]) !== -1) {
            const newV = videos.indexOf(delVideo[0])
            videos.splice(newV, 1)
            return true
        } else {
            return false
        }
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            return true
        }
    },
    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo
    }
}