import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {videosRouter} from "./routes/videos-routes";


//create app
const app = express()

//I think this is a config

const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/videos', videosRouter)
//app.use(authMiddleware)

//port

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()