import express from 'express';
import coachRoutes from './routes/coachRoutes.js';
import errorHandler from './middleware/errorHandlerMiddleware.js';
import studentRoutes from './routes/studentRoutes.js';
import classRoutes from './routes/classRoutes.js'
import classStudentRoutes from './routes/classStudentRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log('--------------------');
    console.log(`[INDEX] ${new Date().toISOString()}`);
    console.log(`[INDEX] ${req.method} ${req.path}`);
    console.log('[INDEX] Request body:', req.body);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Coaching API!');
});

app.use('/coaches', coachRoutes);
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/class-students', classStudentRoutes);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Coaching app is listening on port: ${PORT}`);
})