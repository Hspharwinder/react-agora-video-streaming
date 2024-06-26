import React, { useEffect, useRef } from 'react';


const VideoPlayer = ({user}) => {
    
    const ref = useRef();

    useEffect(()=>{
        user.videoTrack.play(ref.current)
    },[])

    return (
        <div id={user.uid}>
            <h1>Video Player!</h1><br></br>
            Uid: {user.uid}
            <div ref={ref} style={{width:'200px', height:'200px' }}></div>
        </div>
           
    );
  };
  
  export default VideoPlayer;