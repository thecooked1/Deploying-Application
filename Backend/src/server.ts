import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const portString = process.env.PORT;
const PORT: number = portString ? parseInt(portString, 10) : 3001;


if (isNaN(PORT)) {
    console.warn(`Invalid PORT environment variable: "${portString}". Falling back to 3001.`);
   
}

const DEFAULT_PORT = 3001;
const ENV_PORT = process.env.PORT;
const PARSED_PORT = ENV_PORT ? parseInt(ENV_PORT, 10) : DEFAULT_PORT;
const FINAL_PORT: number = (ENV_PORT && isNaN(PARSED_PORT)) ? DEFAULT_PORT : PARSED_PORT;

if (ENV_PORT && isNaN(PARSED_PORT)) {
    console.warn(`Warning: process.env.PORT ("${ENV_PORT}") is not a valid number. Using default port ${DEFAULT_PORT}.`);
}

// In-memory storage
let mostRecentData: string | null = "No data submitted yet.";

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// API Endpoint to create/update the answer
app.post('/api/create-answer', (req: Request, res: Response) => {
  const { data } = req.body;

  console.log(`Received POST request to /api/create-answer with body:`, req.body);


  if (typeof data === 'string') {
    mostRecentData = data;
    console.log(`Stored data: "${mostRecentData}"`);
    res.status(200).json({ message: 'Data received successfully', data: mostRecentData });
  } else {
    console.log(`Invalid data format received.`);
    res.status(400).json({ error: 'Invalid request body. Expected { "data": "some-text-here" }' });
  }
});

// API Endpoint for the frontend to get the current answer
app.get('/api/get-answer', (req: Request, res: Response) => {
  console.log(`GET request to /api/get-answer, sending: "${mostRecentData}"`);
  res.status(200).json({ data: mostRecentData });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
  console.log(`POST endpoint: http://<YOUR_IP_ADDRESS>:${PORT}/api/create-answer`);
  console.log(`GET endpoint (for frontend): http://<YOUR_IP_ADDRESS>:${PORT}/api/get-answer`);
});