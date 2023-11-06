import React, { useEffect, useRef, useState } from 'react';
import '../styles/screens/DoctorVideo.css';
import CameraIcon from '../styles/images/DoctorVideo/camera.png';
import MicIcon from '../styles/images/DoctorVideo/mic.png';
import PhoneIcon from '../styles/images/DoctorVideo/phone.png';
import AgoraRTC from "agora-rtc-sdk-ng";

function DoctorVideo() {
    const remotePlayerContainerRef = useRef(null);
    const localPlayerContainerRef = useRef(null);
    const [isCameraMuted, setCameraMuted] = useState(false);
    const [isMicMuted, setMicMuted] = useState(false);

    const handleLeaveClick = () => {
        window.close();
    };

    let APP_ID = "8310514e8aff413b87abb9d0bdb095bb";
    let token = null;

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let localUid = uuidv4();
    let roomId = '123';

    let channelParameters = {
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: null,
    };

    useEffect(() => {
        // Place the init function within the useEffect
        async function init() {
            let agoraEngine = null;

        const setupAgoraEngine = async () => {
            agoraEngine = new AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
        };
        await setupAgoraEngine();

        agoraEngine.on("user-published", async (user, mediaType) => {
            await agoraEngine.subscribe(user, mediaType);
            console.log("subscribe success");

            if (mediaType === "video") {
                channelParameters.remoteVideoTrack = user.videoTrack;
                channelParameters.remoteAudioTrack = user.audioTrack;
                channelParameters.remoteUid = user.uid.toString();
                channelParameters.remoteVideoTrack.play(remotePlayerContainerRef.current);

                localPlayerContainerRef.current.classList.add('smallFrame');
                remotePlayerContainerRef.current.style.display = 'block';
            }
            if (mediaType === "audio") {
                channelParameters.remoteAudioTrack = user.audioTrack;
                channelParameters.remoteAudioTrack.play();
            }
        });

        agoraEngine.on("user-unpublished", (user, mediaType) => {
            console.log(user.uid + " has left the channel");

            if (mediaType === "video") {
                localPlayerContainerRef.current.classList.remove('smallFrame');
                remotePlayerContainerRef.current.style.display = 'none';
            }
        });

        await agoraEngine.join(
            APP_ID,
            roomId, 
            token,
            localUid
        );

        channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        await agoraEngine.publish([
            channelParameters.localAudioTrack,
            channelParameters.localVideoTrack,
        ]);
        channelParameters.localVideoTrack.play(localPlayerContainerRef.current);
        console.log('live local Video Track',channelParameters.localVideoTrack)
    }

    init();

    return () => {
        // Cleanup tasks
        if(channelParameters.localAudioTrack) {
            channelParameters.localAudioTrack.close();
        }
        if(channelParameters.localVideoTrack) {
            channelParameters.localVideoTrack.close();
        }
        };
    }, []);
        

    let toggleCamera = async () => {
        if (channelParameters.localVideoTrack) {
            const isMuted = channelParameters.localVideoTrack.muted;
            setCameraMuted(!isMuted);
            channelParameters.localVideoTrack.setMuted(!isMuted);
            console.log('local Video Track',channelParameters.localVideoTrack)
        } 
    };
    
    let toggleMic = async () => {
        if (channelParameters.localAudioTrack) {
            const isMuted = channelParameters.localAudioTrack.muted;
            setMicMuted(!isMuted);
            channelParameters.localAudioTrack.setMuted(!isMuted);
        }
    };

    return (
        <div>
            <div id="videos">
                <video ref={localPlayerContainerRef} className="video-player" id="user-1" autoPlay playsInline></video>
                <video ref={remotePlayerContainerRef} className="video-player" id="user-2" autoPlay playsInline></video>
            </div>

            <div id="controls">
                <div 
                    className="control-container" 
                    id="camera-btn" 
                    onClick={toggleCamera} 
                    style={{backgroundColor: isCameraMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)'}}
                >
                    <img src={CameraIcon} alt="Camera" />
                </div>

                <div 
                    className="control-container" 
                    id="mic-btn" 
                    onClick={toggleMic} 
                    style={{backgroundColor: isMicMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)'}}
                >
                    <img src={MicIcon} alt="Microphone" />
                </div>

                <div className="control-container" id="leave-btn" onClick={handleLeaveClick}>
                    <img src={PhoneIcon} alt="Leave" />
                </div>
            </div>
        </div>
    );
}

export default DoctorVideo;
