import React, { useEffect, useState } from 'react';
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
import usePeer from '../../hooks/usePeer';
import { VideoDetail } from '../../context/VideoItemsProvider';
import { getQuizInfo, quizReponse } from '../../lib/api/quiz';

type QuizConnectionProps = {
  quizId: string;
  username: string;
};

const host = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(host);

const QuizConnection = ({ quizId, username }: QuizConnectionProps) => {
  const [peers, setPeers] = useState<Record<string, MediaConnection>>({});
  const [, setConnected] = useConnected();
  const [camStatus] = useCamStatus();
  const [audioStatus] = useAudioStatus();
  const [videoItems, setVideoItems] = useVideoItems();
  const [, setQuizInfo] = useQuizInfo();

  const createVideo = (video: VideoDetail) => {
    setVideoItems((prev) => {
      return { ...prev, [video.id]: video };
    });
  };

  const removeVideo = (id: string) => {
    setVideoItems((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const initPeer = (id: string, peer: Peer) => {
    setConnected(true);
    setNavigatorToStream(peer);
    const userData: UserDetail = {
      userId: id,
      quizId: quizId,
      username: username,
    };
    socket.emit('join_room', userData);
  };
  const [myPeer, myPeerID] = usePeer(initPeer, setVideoItems);

  const setNavigatorToStream = (peer: Peer) => {
    getVideoAudioStream().then((stream) => {
      if (stream) {
        createVideo({ id: peer.id, stream });
        setPeersListeners(stream, peer);
        newUserConnection(stream, peer);
      }
    });
  };
  const submitAnswer = (answer: string) => {
    socket.emit('new_answer', answer, quizId);
  };

  const getVideoAudioStream = () => {
    const myNavigator = navigator.mediaDevices.getUserMedia;
    return myNavigator({
      video: camStatus,
      audio: audioStatus,
    });
  };

  const setPeersListeners = (stream: MediaStream, peer: Peer) => {
    peer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (userVideoStream: MediaStream) => {
        createVideo({
          id: call.metadata.id,
          stream: userVideoStream,
          userData: call.metadata.user,
        });
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

  const newUserConnection = (stream: MediaStream, peer: Peer) => {
    socket.on('new_user_connected', (userData: UserDetail) => {
      connectToNewUser(userData, stream, peer);
    });
  };

  const connectToNewUser = (
    userData: UserDetail,
    stream: MediaStream,
    peer: Peer
  ) => {
    const { userId } = userData;
    const call = peer.call(userId, stream, {
      metadata: { id: peer.id, user: userData },
    });
    call.on('stream', (userVideoStream) => {
      createVideo({ id: userId, stream: userVideoStream, userData: userData });
    });
    call.on('close', () => {
      removeVideo(userId);
    });
    setPeers((prev) => {
      return { ...prev, [userId]: call };
    });
  };
  const getMyVideo = () => {
    return videoItems[myPeerID];
  };

  const toggleVideoTrack = () => {
    const myVideo = getMyVideo();
    if (!myVideo) return;
    if (!camStatus && !audioStatus) {
      myVideo.stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = false));
      myVideo.stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = false));
      if (myPeer) {
        const userData: UserDetail = {
          userId: myPeer.id,
          quizId: quizId,
          username: username,
        };
        Object.keys(peers).forEach((key) => {
          myPeer?.call(key, myVideo.stream, {
            metadata: { id: myPeer.id, user: userData },
          });
        });
      }
      return;
    }
    reInitializeStream();
  };

  const toggleAudioTrack = () => {
    const myVideo = getMyVideo();
    if (!myVideo) return;
    if (!camStatus && !audioStatus) {
      myVideo.stream.getTracks().forEach((track) => track.stop());
      return;
    }
    reInitializeStream();
  };

  const reInitializeStream = () => {
    getVideoAudioStream().then((stream) => {
      createVideo({ id: myPeerID, stream });
      replaceStream(stream);
    });
  };

  const replaceStream = (mediaStream: MediaStream) => {
    if (!myPeer) return;
    const userData: UserDetail = {
      userId: myPeer.id,
      quizId: quizId,
      username: username,
    };
    Object.keys(peers).forEach((key) => {
      myPeer?.call(key, mediaStream, {
        metadata: { id: myPeer.id, user: userData },
      });
    });
  };

  const destoryConnection = () => {
    socket.off('connect');
    socket.off('answer_submitted');
    socket.off('disconnect');
    socket.off('new_user_connected');
    socket.off('user_disconnected');
    setConnected(false);
    getMyVideo()
      .stream.getTracks()
      .forEach((tracks) => {
        tracks.stop();
      });
  };

  const toNextQuestion = () => {
    socket.emit('to_next_question', quizId);
  };

  const toPrevQuestion = () => {
    socket.emit('to_prev_question', quizId);
  };

  useEffect(() => {
    getQuizInfo(quizId)
      .then(({ data }) => {
        setQuizInfo({
          current_question: {
            questionNum: data.current_question + 1,
            content: data.QA[data.current_question].question,
          },
          answers: data.QA[data.current_question].answer,
          title: data.title,
          creator: data.creator,
        });
      })
      .catch(() => {
        location.href = '/join';
      });

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('user_disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
      removeVideo(userId);
    });
    socket.on('answer_submitted', ({ updatedAnswer }) => {
      setQuizInfo((prev) => {
        return { ...prev, answers: updatedAnswer };
      });
    });
    socket.on('quiz_updated', (quiz: quizReponse) => {
      setQuizInfo({
        current_question: {
          questionNum: quiz.current_question + 1,
          content: quiz.QA[quiz.current_question].question,
        },
        answers: quiz.QA[quiz.current_question].answer,
        title: quiz.title,
        creator: quiz.creator,
      });
    });

    return () => {
      destoryConnection();
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
        movePrev={toPrevQuestion}
        moveNext={toNextQuestion}
        submitAnswer={submitAnswer}
        destoryConnection={destoryConnection}
      />
    </div>
  );
};

export default QuizConnection;
