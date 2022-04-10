import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRepository} from "./repositories/videos-repository";
import {videosRouter} from "./routes/videos-routes";
//import {authMiddleware} from "./middlewares/auth-middleware";

//create app
const app = express()

//I think this is a config

const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/videos', videosRouter)
//app.use(authMiddleware)

//port

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
