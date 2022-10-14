import React, { useEffect } from 'react';
import SpotifySDKProvider, { useSpotifyPlayer } from './SpotifySDKProvider';

const TestComponent = () => {
  const player = useSpotifyPlayer();

  useEffect(() => {
    const handleStateChange = (state: Spotify.PlaybackState) => {
      console.log({ state });
    };
    player.addListener('player_state_changed', handleStateChange);

    return () => {
      player.removeListener('player_state_changed', handleStateChange);
    };
  }, []);

  return (
    <button
      onClick={() => {
        player.togglePlay();
      }}
    >
      Play
    </button>
  );
};

const App = () => {
  return (
    <SpotifySDKProvider>
      <TestComponent />
    </SpotifySDKProvider>
  );
};

export default App;
