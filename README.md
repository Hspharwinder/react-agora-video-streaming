## Version
node 14+
react 18

## Npm agora version
"agora-rtc-sdk-ng": "^4.20.2",

## Keys
APP_ID = '526e1263850d417490f3dca69ed736ee'; // process.env.REACT_APP_AGORA_APP_ID
TOKEN = '007eJxTYHDvOBKxNfDHt+v7dawsbG9yXPRdccaRXEee+NFt9orv4yMVGEyNzFINjcyMLUwNUkwMzU0sDdKMU5ITzSxTU8yNzVJSru0wSGsIZGT4tXsXIyMDBIL4zAwVlVUMDABLPEEe';
CHANNEL = 'xyz';

## youtube video ref - https://www.youtube.com/watch?v=ENakkm58Uyw&t=796s 
Coding a video calling app with React
channel - Web Dev Cody


## Agora Feature
Temp token for audio/video call
Please enable 'Primary certificate' first and delete 'No certificate'

Screenshot -> https://drive.google.com/drive/folders/1b5FBT7UtOZW77Z_45IkQ42lx-EaIsCDl


#step 1
npm i agora-rtc-sdk-ng
import AgoraRTC from 'agora-rtc-sdk-ng';

#step 2
create client
const agoraClient = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

#step 3
join client
agoraClient.join(APP_ID, CHANNEL, TOKEN)

#step 4
create microphone and camera track
await AgoraRTC.createMicrophoneAndCameraTracks();

#step 5
publish track 
agoraClient.publish(tracks);

#step 6
handling if other user join
agoraClient.on('user-published', handleUseJoined);
await agoraClient.subscribe(user, mediaType);

#step 7 
hadnling user leave
agoraClient.on('user-left', handleUserLeft);
const handleUserLeft = (user) => {
    setUsers((previousUsers)=> previousUsers.filter((u) => u.uid !== user.uid));
}
 agoraClient.off('user-published', handleUseJoined);
agoraClient.off('user-left', handleUserLeft);
agoraClient.unpublish(tracks).then(()=> agoraClient.leave());


#step 8
close microphone camera
for(let localTrack of localTracks){
    localTrack.stop();
    localTrack.close();
}




