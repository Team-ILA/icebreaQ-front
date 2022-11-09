import React, { useState, useEffect } from 'react';
import { Peer } from 'peerjs';
import { VideoDetail } from '../context/VideoItemsProvider';

const userMediaConfig = {
  audio: { echoCancellation: true, noiseSuppression: true },
  video: { facingMode: 'user' },
};

export default function usePeer(
  init: (id: string, peer: Peer) => void,
  setVideoItems: React.Dispatch<
    React.SetStateAction<Record<string, VideoDetail>>
  >
): [Peer | null, string] {
  const [myPeer, setPeer] = useState<Peer | null>(null);
  const [myPeerID, setMyPeerID] = useState('');

  const cleanUp = () => {
    if (myPeer) {
      myPeer.destroy();
    }
    setPeer(null);
    setMyPeerID('');
    setVideoItems({});
  };

  useEffect(() => {
    const peer = myPeer ? myPeer : new Peer();

    peer.on('open', (id) => {
      setPeer(peer);
      setMyPeerID(peer.id);
      init(id, peer);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia(userMediaConfig).then((stream) => {
        // Answer the call with an A/V stream.
        call.answer(stream);

        // Play the remote stream
        call.on('stream', (remoteStream) => {
          setVideoItems((prev) => {
            return {
              ...prev,
              [call.metadata.id]: {
                id: call.metadata.id,
                stream: remoteStream,
              },
            };
          });
        });

        call.on('close', () => {
          setVideoItems((prev) => {
            const newState = prev;
            delete newState[call.metadata.id];
            return newState;
          });
        });

        call.on('error', () => {
          setVideoItems((prev) => {
            const newState = prev;
            delete newState[call.metadata.id];
            return newState;
          });
        });
      });
    });

    peer.on('disconnected', () => {
      cleanUp();
    });

    peer.on('close', () => {
      cleanUp();
    });

    peer.on('error', () => {
      cleanUp();
    });

    return () => {
      cleanUp();
    };
  }, []);

  return [myPeer, myPeerID];
}
