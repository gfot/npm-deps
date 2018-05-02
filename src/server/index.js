import http from 'http';
import app from './app';
import { SERVER_PORT as serverPort } from '../config';

const server = http.createServer(app);
server.listen(serverPort, () => {
  console.info(`Server listens on port ${serverPort}`);
});
