import React, { useState, useEffect } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import QuizContainer from './QuizContainer';
import UserDetail from '../../lib/socketio/UserDetail';
import useCamStatus from '../../hooks/useCamStatus';
import useConnected from '../../hooks/useConnected';
import useVideoItems from '../../hooks/useVideoItems';
import useAudioStatus from '../../hooks/useAudioStatus';
import useQuizInfo from '../../hooks/useQuizinfo';
import useSocket from '../../hooks/useSocket';
import { VideoDetail } from '../../context/VideoItemsProvider';

type QuizConnectionProps = {
  quizId: string;
  username: string;
};

let myPeer = new Peer();

const QuizConnection = ({ quizId, username }: QuizConnectionProps) => {
  const socket = useSocket();
  const [peers, setPeers] = useState<Record<string, MediaConnection>>({});
  const [myId, setMyId] = useState('');
  const [, setConnected] = useConnected();
  const [camStatus] = useCamStatus();
  const [audioStatus] = useAudioStatus();
  const [videoItems, setVideoItems] = useVideoItems();
  const [, setQuizInfo] = useQuizInfo();

  const submitAnswer = (answer: string) => {
    socket.emit('new_answer', { newAnswer: answer });
    console.log(socket);
  };

  const setNavigatorToStream = () => {
    if (myId === '') return;
    getVideoAudioStream().then((stream) => {
      if (stream) {
        createVideo({ id: myId, stream });
        setPeersListeners(stream);
        newUserConnection(stream);
      }
    });
  };
  const getVideoAudioStream = () => {
    const myNavigator = navigator.mediaDevices.getUserMedia;
    return myNavigator({
      video: camStatus,
      audio: audioStatus,
    });
  };

  const createVideo = (video: VideoDetail) => {
    setVideoItems((prev) => {
      return { ...prev, [video.id]: video };
    });
  };

  const setPeersListeners = (stream: MediaStream) => {
    myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (userVideoStream) => {
        createVideo({ id: call.metadata.id, stream: userVideoStream });
      });
      call.on('close', () => {
        removeVideo(call.metadata.id);
      });
      call.on('error', () => {
        removeVideo(call.metadata.id);
      });
      setPeers((prev) => {
        return { ...prev, [call.metadata.id]: call };
      });
    });
  };

  const newUserConnection = (stream: MediaStream) => {
    socket.on('new_user_connected', (userData: UserDetail) => {
      connectToNewUser(userData, stream);
    });
  };

  const connectToNewUser = (userData: UserDetail, stream: MediaStream) => {
    const { userId } = userData;
    const call = myPeer.call(userId, stream, {
      metadata: { id: myId },
    });
    call.on('stream', (userVideoStream) => {
      createVideo({ id: userId, stream: userVideoStream, userData });
    });
    call.on('close', () => {
      removeVideo(userId);
    });
    call.on('error', () => {
      removeVideo(userId);
    });
    setPeers((prev) => {
      return { ...prev, [userId]: call };
    });
  };

  const removeVideo = (id: string) => {
    setVideoItems((prev) => {
      const newState = prev;
      delete newState[id];
      return newState;
    });
  };

  const getMyVideo = () => {
    return videoItems[myId];
  };

  const toggleVideoTrack = () => {
    const myVideo = getMyVideo();
    if (!myVideo) return;
    if (!camStatus) {
      myVideo.stream
        .getVideoTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      setVideoItems((prev) => {
        return { ...prev, [myId]: myVideo };
      });
    } else {
      reInitializeStream();
    }
  };

  const toggleAudioTrack = () => {
    const myVideo = getMyVideo();
    if (!myVideo) return;
    if (!audioStatus) {
      myVideo.stream
        .getAudioTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    } else {
      reInitializeStream();
    }
  };

  const reInitializeStream = () => {
    return new Promise((resolve) => {
      getVideoAudioStream().then((stream) => {
        createVideo({ id: myId, stream });
        replaceStream(stream);
        resolve(true);
      });
    });
  };

  const replaceStream = (mediaStream: MediaStream) => {
    Object.keys(peers).forEach((key) => {
      peers[key].peerConnection.getSenders().map((sender) => {
        if (sender.track?.kind == 'audio') {
          if (mediaStream.getAudioTracks().length > 0) {
            sender.replaceTrack(mediaStream.getAudioTracks()[0]);
          }
        }
        if (sender.track?.kind == 'video') {
          if (mediaStream.getVideoTracks().length > 0) {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        }
      });
    });
  };

  const destoryConnection = () => {
    const myMediaTracks = videoItems[myId]?.stream.getTracks();
    myMediaTracks?.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    removeVideo(myId);
    setConnected(false);
    socket.disconnect();
    socket.connect();
    myPeer.destroy();
  };

  useEffect(() => {
    // socket.connect();
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('greeting_response', (quizInfo) => {
      setQuizInfo(quizInfo);
    });
    socket.on('user_disconnected', (userId) => {
      setPeers((prev) => {
        const newState = prev;
        newState[userId].close();
        return newState;
      });
      removeVideo(userId);
    });
    socket.on('answer_submitted', ({ updatedAnswer }) => {
      setQuizInfo((prev) => {
        return { ...prev, answers: updatedAnswer };
      });
    });
    myPeer = new Peer();
    socket.on('disconnect', () => {
      setConnected(false);
      myPeer.destroy();
    });

    myPeer.on('open', (id) => {
      setConnected(true);
      setMyId(id);
      const userData: UserDetail = {
        userId: id,
        quizId: quizId,
        username: username,
      };
      socket.emit('greeting', userData);
    });
    myPeer.on('error', (err) => {
      console.log(err);
      myPeer.reconnect();
    });
  }, []);

  useEffect(() => {
    setNavigatorToStream();
  }, [myId]);

  // useEffect(() => {
  //   return () => {
  //     destoryConnection();
  //   };
  // }, []);

  useEffect(() => {
    toggleVideoTrack();
  }, [camStatus]);

  useEffect(() => {
    toggleAudioTrack();
  }, [audioStatus]);

  return (
    <div>
      <QuizContainer
        submitAnswer={submitAnswer}
        destoryConnection={destoryConnection}
      />
    </div>
  );
};

export default QuizConnection;
