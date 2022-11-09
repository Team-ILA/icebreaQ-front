import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthProvider from './context/AuthProvider';
import AudioStatusProvider from './context/AudioStatusProvider';
import CamStatusProvider from './context/CamStatusProvider';
import ConnectedProvider from './context/ConnectedProvider';
import VideoItemsProvider from './context/VideoItemsProvider';
import QuizInfoProvider from './context/QuizInfoProvider';
import './index.css';
import SocketProvider from './context/SocketProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <AudioStatusProvider>
        <CamStatusProvider>
          <VideoItemsProvider>
            <ConnectedProvider>
              <QuizInfoProvider>
                <SocketProvider>
                  <App />
                </SocketProvider>
              </QuizInfoProvider>
            </ConnectedProvider>
          </VideoItemsProvider>
        </CamStatusProvider>
      </AudioStatusProvider>
    </AuthProvider>
  </BrowserRouter>
);
