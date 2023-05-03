import { useCallback } from 'react';
import Config from 'react-native-config';
import {io, Socket} from 'socket.io-client';

let socket: Socket | undefined;

// 웹소켓 연결 커스텀 훅
const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ['websocket'],
    });
  }

  return [socket, disconnect];
};

export default useSocket;
