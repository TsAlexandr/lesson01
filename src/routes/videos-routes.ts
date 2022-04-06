import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";


export const videosRouter = Router({})

videosRouter.get('/', (req, res) => {
    const videos = videosRepository.getVideos()
    if (!videos) {
        res.send(400)
    } else {
        res.send(200).send(videos)
    }


})
    .get('/:videoId', (req, res) => {
        const id = +req.params.videoId;
        const video = videosRepository.getVideoById(id)
        if (video) {
            res.send(200).send(video)
        } else {
            res.send(404)
        }
    })
    .post('/', body('title')
            .isLength({min: 5, max: 15})
            .withMessage('Max 15 symbols')
            .matches(/^[\w ]*$/)
            .withMessage('Only letters/numbers-_ and whitespace'),
        (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({resultCode: 1, errors: errors.array()});
            }
            const newVideo = videosRepository.createVideo(req.body.title)
            if (newVideo) {
                res.send(201).send(newVideo)
            } else {
                res.send(400)
            }
        })
    .put('/:id', (req: Request, res: Response) => {
        const id = +req.params.id
        const video = videosRepository.updateVideoById(id, req.body.title)
        if (video) {
            res.send(204).send(video)
        } else {
            res.send(400)
        }
    })
    .delete("/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const delVideo = videosRepository.deleteVideoById(id)
        if (delVideo) {
            res.send(204)
        } else {
            res.send(404)
        }

    })
