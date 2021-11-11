import express from 'express';
import { Application } from "express";
import * as http from 'http';
import cors from 'cors';
import { Routes } from './Routes';

const app: Application = express();
const server: http.Server = http.createServer(app);
const port = 4001;
const routes = new Routes()

app.use(express.json());
app.use(cors());

/** Set up routes */
app.use('/', routes.setupRoutes());

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});