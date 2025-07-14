import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NODE_ENV = process.env.NODE_ENV || 'production';
const app = express()

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//Routes
import router from './routes/index.js'
app.use('/', router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.set("views", path.join(__dirname, "views"));
app.set("view egnine", "ejs");

// When in development mode, start a WebSocket server for live reloading
if (NODE_ENV.includes('dev')) {
    const ws = await import('ws');
    const wsPort = parseInt(PORT) + 1;
 
    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });
 
        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });
 
        wsServer.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.warn(`Port ${wsPort} already in use. Websocket server not started.`);
            } else {
            console.error('WebSocket server error:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

// Error Handling Middleware
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Internal Server Error',
        error: err.message,
        stack: err.stack,
        NODE_ENV
    };

    res.status(status).render(`errors/${status === 404 ? '404' : '500'}`, context);
})


// When in development mode, start