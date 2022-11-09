import React, { useState, useEffect } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import { io, Socket } from 'socket.io-client';
import ServerToClientEvents from '../../lib/socketio/events/ServerToClientEvents';
import ClientToServerEvents from '../../lib/socketio/events/ClientToServerEvents';
import QuizContainer from './QuizContainer';
import UserDetail from '../../lib/socketio/UserDetail';
import useCamStatus from '../../hooks/useCamStatus';
import useConnected from '../../hooks/useConnected';
import useVideoItems from '../../hooks/useVideoItems';
import useAudioStatus from '../../hooks/useAudioStatus';
import useQuizInfo from '../../hooks/useQuizinfo';
import { VideoDetail } from '../../context/VideoItemsProvider';
import { getQuizInfo } from '../../lib/api/quiz';

type QuizConnectionProps = {
  quizId: string;
  username: string;
};

const host = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(host);

const QuizConnection = ({ quizId, username }: QuizConnectionProps) => {
  const [myPeer, setMyPeer] = useState<Peer>(new Peer());
  const [peers, setPeers] = useState<Record<string, MediaConnection>>({});
  const [, setConnected] = useConnected();
  const [camStatus] = useCamStatus();
  const [audioStatus] = useAudioStatus();
  const [videoItems, setVideoItems] = useVideoItems();
  const [, setQuizInfo] = useQuizInfo();

  const submitAnswer = (answer: string) => {
    socket.emit('new_answer', answer, quizId);
  };

  const setNavigatorToStream = () => {
    getVideoAudioStream().then((stream) => {
      if (stream) {
        createVideo({ id: myPeer.id, stream });
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
        console.log('nono');
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
      metadata: { id: myPeer.id },
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
    return videoItems[myPeer.id];
  };

  const toggleVideoTrack = () => {
    const myVideo = getMyVideo();
    if (!myVideo) return;
    if (!camStatus) {
      myVideo.stream
        .getVideoTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      setVideoItems((prev) => {
        return { ...prev, [myPeer.id]: myVideo };
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
        createVideo({ id: myPeer.id, stream });
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
    const myMediaTracks = videoItems[myPeer.id]?.stream.getTracks();
    myMediaTracks?.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    setVideoItems({});
    setMyPeer((prev) => {
      prev.destroy();
      return new Peer();
    });
  };

  useEffect(() => {
    getQuizInfo(quizId).then(({ data }) => {
      setQuizInfo({
        current_question: {
          questionNum: data.current_question + 1,
          content: data.QA[data.current_question].question,
        },
        answers: data.QA[data.current_question].answer,
        title: data.title,
        creator: data.creator,
      });
    });
    setVideoItems({});

    socket.on('connect', () => {
      console.log('connected');
      setConnected(true);
    });
    socket.on('user_disconnected', (userId) => {
      setPeers((prev) => {
        const newState = prev;
        newState[userId].close();
        delete newState[userId];
        return newState;
      });
    });
    socket.on('answer_submitted', ({ updatedAnswer }) => {
      setQuizInfo((prev) => {
        return { ...prev, answers: updatedAnswer };
      });
    });
    socket.on('disconnect', () => {
      myPeer.destroy();
    });

    myPeer.on('open', (id) => {
      const userData: UserDetail = {
        userId: id,
        quizId: quizId,
        username: username,
      };
      setNavigatorToStream();
      socket.emit('join_room', userData);
    });
    myPeer.on('error', () => {
      myPeer.reconnect();
    });

    return () => {
      socket.off('connect');
      socket.off('answer_submitted');
      socket.off('disconnect');
      socket.off('new_user_connected');
      socket.off('user_disconnected');
    };
  }, []);

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
