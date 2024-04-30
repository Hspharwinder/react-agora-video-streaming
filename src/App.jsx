import React, { useState } from 'react';
import VideoRoom from '../src/component/VideoRoom';

const App = () => {
  const [joined, setJoined] = useState(false);
  return <div>
    <h1>Hello, World!</h1>
    {!joined && (
      <button onClick={()=> setJoined(true)}>Join Room</button>
    )}

    {joined && (
      <VideoRoom></VideoRoom>
    )}

  </div>;
};

export default App;