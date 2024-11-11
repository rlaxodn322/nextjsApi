import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as HttpServer } from 'http';
import { Socket as NetSocket } from 'net';

interface SocketServer extends HttpServer {
  io?: Server;
}

interface SocketWithServer extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithServer;
}

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log('Setting up socket.io');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('message', (msg) => {
        io.emit('message', msg); // Broadcast message to all clients
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
  res.end();
}
