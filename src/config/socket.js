import io from 'socket.io-client';

const socketClient =
  process.env.NODE_ENV === 'development'
    ? io('http://localhost:3001')
    : io('https://subtalkapi.devhak.xyz');

export default socketClient;
