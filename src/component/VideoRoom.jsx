import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoPlayer from './VideoPlayer';

const APP_ID = '526e1263850d417490AAAAAAAAAAAAAAAAAAAAA'; // process.env.REACT_APP_AGORA_APP_ID
const TOKEN = '007eJxTYHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const CHANNEL = 'AAAA';

// Join the channel
const agoraClient = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
   
const VideoRoom = () => {

    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);

    const handleUseJoined = async (user, mediaType) => {
        await agoraClient.subscribe(user, mediaType);

        if(mediaType === 'video'){
            setUsers((previousUsers) => [...previousUsers, user]);
        }

        if(mediaType === 'audio'){
            // user.audioTrack.play();
        }
    }

    const handleUserLeft = (user) => {
        setUsers((previousUsers)=> previousUsers.filter((u) => u.uid !== user.uid));
    }

    useEffect(()=> {
        agoraClient.on('user-published', handleUseJoined);
        agoraClient.on('user-left', handleUserLeft);

        // if (agoraClient) {
        //     agoraClient.leave();
        // }

        let UID;
        agoraClient.join(APP_ID, CHANNEL, TOKEN)
        .then((uid)=>{
            UID = uid;
        }).then(async (uid)=>{
            uid = UID;
            const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

            const [audioTrack, videoTrack] = tracks;
           
            const index = users.findIndex((u) => u.uid !== uid);
            if(index < 0){
                setLocalTracks(tracks);
                setUsers((previousUsers) => [
                    ...previousUsers, {
                        uid,
                        videoTrack,
                        audioTrack
                    }
                ])
                agoraClient.publish(tracks);
            }

           return () =>{
            for(let localTrack of localTracks){
                localTrack.stop();
                localTrack.close();

            }
            // agoraClient.off()
            agoraClient.off('user-published', handleUseJoined);
            agoraClient.off('user-left', handleUserLeft);
            agoraClient.unpublish(tracks).then(()=> agoraClient.leave());
           }
           
        }).catch((err)=>{
            console.error("err == ", err);
        })
    },[])
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <h1>Video Room</h1><br></br>
            {users && users.map((user, index) => (
            <VideoPlayer key={`user-${index}`}  id="videoPlayer" user={user} />
            ))}
        </div>    
    );
};

export default VideoRoom;