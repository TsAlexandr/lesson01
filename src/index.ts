import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser  from 'body-parser'

//create app
const app = express()

//I think this is a config

const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())

//Array of objects

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

//Endpoints

app.get('/', (req, res) => {
    res.send('Hello finally!!!!!!!!!!!!!!!!!')
})

app.get('/videos', (req, res) =>{
    res.send(videos)
    if (!videos) {
        res.status(400)
    } else {
        res.status(200)
    }

})

app.get('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
    if (video) {
        res.status(200).send(video)
    }else{
        res.send(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
    if(newVideo) {
        res.status(201).send(newVideo)
    } else {
        res.status(400)
    }
})



app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videos.find(v => v.id === id)
    if (video) {
        video.title = req.body.title
        res.status(204).send(video)
    }else {
        res.status(400)
    }
})



app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const newVideos = videos.filter(v => v.id !== id)
        if(newVideos.length < videos.length) {
            res.sendStatus(204)
        } else {
            res.status(404)
        }
})

//port

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
