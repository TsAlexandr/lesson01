import {Request, Response, Router} from 'express'
import {videosService} from "../domain/videos-service";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";
import {body} from "express-validator";

export const videosRouter = Router({})

videosRouter.get('/',
    async (req, res) => {
    const videos = await videosService.getVideos()
    if (!videos) {
        res.sendStatus(400)
    } else {
        res.send(videos)
    }
})

    .get('/:videoId',
        inputValidatorMiddleware,
        async (req, res) => {
            const id = +req.params.videoId
            const video = await videosService.getVideoById(id)
            if (video) {
                res.send(video).status(200)
            } else {
                res.sendStatus(404)
            }
        })

    .post('/',
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const newVideo = await videosService.createVideo(req.body.title)
            if (newVideo) {
                res.status(201).send(newVideo)
            } else {
                res.sendStatus(400)
            }
        })

    .put('/:videoId',
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.videoId
            const isUpdVideo = await videosService.updateVideoById(id, req.body.title)
            if (isUpdVideo) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })

    .delete("/:videoId",
        async (req: Request, res: Response) => {
            const id = +req.params.videoId
            const delVideo = await videosService.deleteVideoById(id)
            if (delVideo) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }

        })
