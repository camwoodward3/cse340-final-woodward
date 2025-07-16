import express from 'express';
import db from './src/models/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/setup.js';
import indexRoutes from './src/routes/index.js';
import { groups } from './public/js/groups.js';
import { events } from './public/js/events.js';

const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 3000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const jediList = [];

// Middleware
app.use((req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    res.locals.NODE_ENV = process.env.NODE_ENV || 'development';
    next();
});



// Routes


app.use('/', indexRoutes);

// 404 Error Handler
app.use((req, res, next) => {
    const quiet404s = ['/favicon.ico', '/robots.txt'];
    const isQuiet404 = quiet404s.includes(req.path) || req.path.startsWith('/.well-known');
    if (isQuiet404) {
        return res.status(404).send('Not Found');
    }
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).render(`errors/${status === 404 ? '404' :  '500'}`, {
        title: status === 404 ? 'Page Not Found' : 'Internal Server Error',
        error: err.message,
        stack: err.stack,
    })
});

// Start server

if (NODE_ENV.includes('dev')) {
    const ws = await import('ws');
    
    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort});
        
        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });
        
        wsServer.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.warn(`Port ${wsPort} already in use. WebSocket server not started.`);
            } else {
                console.error('WebSocket server error:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start WebSocket server', error);
    }
}

await testConnection();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Database connected and ready');
});
