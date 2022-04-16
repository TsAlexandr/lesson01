import 'dotenv/config'
import {MongoClient} from 'mongodb'

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/?maxPoolSize=20&w=majority"

export const client = new MongoClient(mongoUri)
export const videosCollection = client.db("videosAut").collection('videos')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("videosAut").command({ ping: 1 });
        console.log("Connected successfully to mongo server");

    } catch {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export type VideoType = {
    id: number;
    title: string;
    author: string;
}

export let videos: VideoType[] = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]