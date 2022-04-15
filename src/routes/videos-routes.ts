import {Request, Response, Router} from 'express'
import {videosService} from "../domain/videos-service";
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
    const videos = await videosService.getVideos()
    if (!videos) {
        res.status(400)
    } else {
        res.send(videos).status(200)
    }
})

    .get('/:videoId',
        inputValidatorMiddleware,
        async (req, res) => {

            const video = await videosService.getVideoById(+req.params.id)
            if (video) {
                res.send(video).status(200)
            } else {
                res.status(404)
            }
        })

    .post('/',
        validTitle,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const newVideo = await videosService.createVideo(req.body.title)
            if (newVideo) {
                res.status(201).send(newVideo)
            } else {
                res.status(400)
            }
        })

    .put('/:videoId',
        validTitle,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const isUpdVideo = await videosService.updateVideoById(+req.params.id, req.body.title)
            if (isUpdVideo) {
                res.status(204)
            } else {
                res.status(400)
            }
        })

    .delete("/:videoId",
        async (req: Request, res: Response) => {
            const delVideo = await videosService.deleteVideoById(+req.params.videoId)
            if (delVideo) {
                res.status(204)
            } else {
                res.status(404)
            }

        })
