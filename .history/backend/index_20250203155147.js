import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.port