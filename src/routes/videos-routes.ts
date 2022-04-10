import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";

export const videosRouter = Router({})
const validTitle = body('title')
    .isLength({min: 5, max: 15})
    .withMessage('Max 15 symbols')
    .matches(/^[\w ]*$/)
    .withMessage('Only letters/numbers-_ and whitespace')

videosRouter.get('/', (req, res) => {
    const videos = videosRepository.getVideos()
        if (!videos) {
            res.status(400)
        } else {
            res.send(videos)
        }
    })

    .get('/:videoId',
        inputValidatorMiddleware,
        (req, res) => {
        const id = +req.params.videoId;
        const video = videosRepository.getVideoById(id)
            if (video) {
                res.send(video)
            } else {
                res.status(404)
            }
    })
    .post('/',
        validTitle,
        inputValidatorMiddleware,
        (req: Request, res: Response) =>
        {

            const newVideo = videosRepository.createVideo(req.body.title)
            if (newVideo) {
                    res.send(newVideo)
                } else {
                    res.status(400)
            }
        })
    .put('/:videoId',
        validTitle,
        inputValidatorMiddleware,
        (req: Request, res: Response) =>
    {
            const id = +req.params.videoId
            const video = videosRepository.updateVideoById(id, req.body.title)
                if (video) {
                    res.sendStatus(204)
                } else {
                    res.sendStatus(404)
                }
    })
    .delete("/:videoId",
        (req: Request, res: Response) => {
        const id = +req.params.videoId
        const delVideo = videosRepository.deleteVideoById(id)
            if (delVideo) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }

    })
