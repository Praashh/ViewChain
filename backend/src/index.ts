import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new socketIo.Server(server);

io.on('connection', (socket: socketIo.Socket) => {
    console.log('a user connected', socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
});

app.get('/', (req, res) => {
    res.send('Server is running');
})
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
