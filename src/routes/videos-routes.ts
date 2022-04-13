import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";
import {body} from "express-validator";

export const videosRouter = Router({})

const validTitle = body('title')
    .isLength({min: 5, max: 15})
    .withMessage('Max 15 symbols')
    .matches(/^[\w ]*$/)
    .withMessage('Only letters/numbers-_ and whitespace')

videosRouter.get('/',
    async (req, res) => {
    const videos = await videosRepository.getVideos()
    if (!videos) {
        res.status(400)
    } else {
        res.send(videos)
    }
})

    .get('/:videoId',
        inputValidatorMiddleware,
        async (req, res) => {

            const video = await videosRepository.getVideoById(+req.params.id)
            if (video) {
                res.send(video)
            } else {
                res.status(404)
            }
        })

    .post('/',
        validTitle,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {

            const newVideo = await videosRepository.createVideo(req.body.title)
            if (newVideo) {
                res.send(newVideo)
            } else {
                res.status(400)
            }
        })

    .put('/:videoId',
        validTitle,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const isUpdVideo = await videosRepository.updateVideoById(+req.params.id, req.body.title)
            if (isUpdVideo) {
                const video = videosRepository.getVideoById(+req.params.id)
                res.send(video).sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })

    .delete("/:videoId",
        async (req: Request, res: Response) => {
            const delVideo = await videosRepository.deleteVideoById(+req.params.videoId)
            if (delVideo) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }

        })
