import { useState, useEffect } from 'react';
import { Peer } from 'peerjs';

const userMediaConfig = {
  audio: { echoCancellation: true, noiseSuppression: true },
  video: { facingMode: 'user' },
};

export default function usePeer(
  init: (id: string) => void,
  addRemoteStream: ({
    id,
    stream,
  }: {
    id: string;
    stream: MediaStream;
  }) => void,
  removeRemoteStream: (arg: string) => void
): [Peer | null, string] {
  const [myPeer, setPeer] = useState<Peer | null>(null);
  const [myPeerID, setMyPeerID] = useState('');

  const cleanUp = () => {
    if (myPeer) {
      myPeer.destroy();
    }
    setPeer(null);
    setMyPeerID('');
  };

  useEffect(() => {
    const peer = myPeer ? myPeer : new Peer();

    peer.on('open', (id) => {
      setPeer(peer);
      setMyPeerID(peer.id);
      init(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia(userMediaConfig).then((stream) => {
        // Answer the call with an A/V stream.
        call.answer(stream);

        // Play the remote stream
        call.on('stream', (remoteStream) => {
          addRemoteStream({ id: call.metadata.id, stream: remoteStream });
        });

        call.on('close', () => {
          removeRemoteStream(call.metadata.id);
        });

        call.on('error', () => {
          removeRemoteStream(call.metadata.id);
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
