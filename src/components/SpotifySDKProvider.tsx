import React, { createContext, useContext, useEffect, useState } from 'react';
import { SPOTIFY_ACCESS_TOKEN } from '../config';

// TODO: Correctly define the Spotify SDK interface
const SpotifySDKContext = createContext<Spotify.Player | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

const SpotifySDKProvider = ({ children }: Props) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Spotify Podcast Standalone PWA alkjalkdjaskldj',
        getOAuthToken: (cb) => {
          cb(SPOTIFY_ACCESS_TOKEN); // TODO: implement authentication flow
        },
        volume: 0.2,
      });

      setPlayer(player);
    };
  }, []);

  useEffect(() => {
    if (!player) return;

    const handlePlayerReady = () => {
      setReady(true);
    };

    player.addListener('ready', handlePlayerReady);

    player.connect();

    return () => {
      player.removeListener('ready', handlePlayerReady);
    };
  }, [player]);

  if (!player || !ready) return null;

  return <SpotifySDKContext.Provider value={player} children={children} />;
};

export const useSpotifyPlayer = () => {
  const context = useContext(SpotifySDKContext);

  if (!context) {
    throw new Error(
      'Trying to access Spotify Player outside of SpotifySDKProvider',
    );
  }

  return context;
};

export default SpotifySDKProvider;
