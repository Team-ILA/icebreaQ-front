import { io, Socket } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import ServerToClientEvents from '../lib/socketio/events/ServerToClientEvents';
import ClientToServerEvents from '../lib/socketio/events/ClientToServerEvents';
import UserDetail from '../lib/socketio/UserDetail';

export type VideoDetail = {
  id: string;
  stream: MediaStream;
  userData?: UserDetail;
};

type ConnectionSetting = {
  updateInstance: (key: string, value: any) => void;
  videoItems: Map<string, VideoDetail>;
  quizId: string;
  username: string;
  quality?: number;
};

const initializePeerConnection = () => {
  return new Peer();
};
const initializeSocketConnection = () => {
  return io(`ws://${process.env.REACT_APP_SERVER_HOST}`, {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false,
    reconnectionAttempts: 10,
  });
};

export default class Connection {
  peers = new Map<string, MediaConnection>();
  message = [];
  settings: ConnectionSetting;
  streaming = false;
  myPeer: Peer;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  myID = '';

  constructor(settings: ConnectionSetting) {
    this.settings = settings;
    this.myPeer = initializePeerConnection();
    this.socket = initializeSocketConnection();
    this.initializeSocketEvents();
    this.initializePeersEvents();
  }

  initializeSocketEvents() {
    this.socket.on('connect', () => {
      console.log('connected');
      this.settings.updateInstance('connection', true);
    });
    this.socket.on('user_disconnected', (userID) => {
      this.peers.get(userID)?.close();
      this.removeVideo(userID);
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
    // this.socket.on('error', (err) => {
    //   console.log('socket error --', err);
    // });
  }
  initializePeersEvents() {
    this.myPeer.on('open', (id) => {
      console.log('open');
      this.myID = id;
      const userData: UserDetail = {
        userId: id,
        quizId: this.settings.quizId,
        username: this.settings.username,
      };
      this.socket.emit('greeting', userData);
      this.setNavigatorToStream();
    });
    this.myPeer.on('error', (err) => {
      console.log(err);
      this.myPeer.reconnect();
    });
  }
  setNavigatorToStream = () => {
    this.getVideoAudioStream().then((stream) => {
      if (stream) {
        this.streaming = true;
        this.settings.updateInstance('streaming', true);
        this.createVideo({ id: this.myID, stream });
        this.setPeersListeners(stream);
        this.newUserConnection(stream);
      }
    });
  };
  getVideoAudioStream = (video = true, audio = true) => {
    const quality = this.settings.quality;
    const myNavigator = navigator.mediaDevices.getUserMedia;
    return myNavigator({
      video: video
        ? {
            frameRate: quality ? quality : 12,
            noiseSuppression: true,
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
          }
        : false,
      audio: audio,
    });
  };

  createVideo = (createObj: VideoDetail) => {
    this.settings.updateInstance(
      'videoItems',
      (prev: Map<string, VideoDetail>) =>
        new Map(prev).set(createObj.id, createObj)
    );
  };

  setPeersListeners = (stream: MediaStream) => {
    this.myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (userVideoStream) => {
        this.createVideo({ id: call.metadata.id, stream: userVideoStream });
      });
      call.on('close', () => {
        this.removeVideo(call.metadata.id);
      });
      call.on('error', () => {
        this.removeVideo(call.metadata.id);
      });
      this.peers.set(call.metadata.id, call);
    });
  };

  newUserConnection = (stream: MediaStream) => {
    this.socket.on('new_user_connected', (userData: UserDetail) => {
      this.connectToNewUser(userData, stream);
    });
  };

  connectToNewUser(userData: UserDetail, stream: MediaStream) {
    const { userId } = userData;
    const call = this.myPeer.call(userId, stream, {
      metadata: { id: this.myID },
    });
    call.on('stream', (userVideoStream) => {
      this.createVideo({ id: userId, stream: userVideoStream, userData });
    });
    call.on('close', () => {
      this.removeVideo(userId);
    });
    call.on('error', () => {
      this.removeVideo(userId);
    });
    this.peers.set(userId, call);
  }

  removeVideo = (id: string) => {
    this.settings.updateInstance(
      'videoItems',
      (prev: Map<string, VideoDetail>) => {
        const newState = new Map(prev);
        newState.delete(id);
        return newState;
      }
    );
    document.getElementById(id)?.remove;
  };

  destoryConnection = () => {
    const myMediaTracks = this.settings.videoItems
      .get(this.myID)
      ?.stream.getTracks();
    myMediaTracks?.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    this.socket.disconnect();
    this.myPeer.destroy();
  };
}

export function createSocketConnectionInstance(
  settings: ConnectionSetting
): Connection {
  return new Connection(settings);
}
