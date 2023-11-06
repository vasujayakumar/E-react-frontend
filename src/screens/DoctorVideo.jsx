import React, { useEffect, useRef, useState } from 'react';
import '../styles/screens/DoctorVideo.css';
import CameraIcon from '../styles/images/DoctorVideo/camera.png';
import MicIcon from '../styles/images/DoctorVideo/mic.png';
import PhoneIcon from '../styles/images/DoctorVideo/phone.png';
import AgoraRTC from "agora-rtc-sdk-ng";

function DoctorVideo() {
    const remotePlayerContainerRef = useRef(null);
    const localPlayerContainerRef = useRef(null);
    const channelParametersRef = useRef({
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: null,
    });
    const agoraEngineRef = useRef()
    const [isCameraMuted, setIsCameraMuted] = useState(false);
    const [isMicMuted, setIsMicMuted] = useState(false);

    let APP_ID = "8310514e8aff413b87abb9d0bdb095bb";
    let token = null;

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> c / 4).toString(16)
        );
    }
    let localUid = uuidv4();
    let roomId = '123';  // should be doctor-name-patient-name-reservation-id
    let agoraEngine = null;

    useEffect(() => {
        // Place the init function within the useEffect
        async function init() {
            if (agoraEngine) {
                // we see that useEffect can run twice during initialization, so return for the second time.
                return;
            }

            const setupAgoraEngine = async () => {
                agoraEngine = new AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
            };
            await setupAgoraEngine();

            agoraEngine.on("user-published", async (user, mediaType) => {
                await agoraEngine.subscribe(user, mediaType);
                console.log("subscribe success");

                if (mediaType === "video") {
                    channelParametersRef.remoteVideoTrack = user.videoTrack;
                    channelParametersRef.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.remoteUid = user.uid.toString();
                    channelParametersRef.remoteVideoTrack.play(remotePlayerContainerRef.current);


                    localPlayerContainerRef.current.classList.add('smallFrame');
                    remotePlayerContainerRef.current.style.display = 'block';
                }
                if (mediaType === "audio") {
                    channelParametersRef.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.remoteAudioTrack.play();
                }
            });

            agoraEngine.on("user-unpublished", (user, mediaType) => {
            });

            agoraEngine.on("user-joined", (user) => {
                // localPlayerContainerRef.current.classList.add('smallFrame');
                // remotePlayerContainerRef.current.style.display = 'block';
            });

            agoraEngine.on("user-left", (user, reason) => {
                localPlayerContainerRef.current.classList.remove('smallFrame');
                remotePlayerContainerRef.current.style.display = 'none';
            });

            await agoraEngine.join(
                APP_ID,
                roomId,
                token,
                localUid
            );

            channelParametersRef.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            channelParametersRef.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

            await agoraEngine.publish([
                channelParametersRef.localAudioTrack,
                channelParametersRef.localVideoTrack,
            ]);
            channelParametersRef.localVideoTrack.play(localPlayerContainerRef.current);
            console.log('live local Video Track', channelParametersRef.localVideoTrack)
        }
        init();

        return () => {
            if (agoraEngine) {
                agoraEngine.leave();
            }
        };
    }, []);


    let toggleCamera = async () => {
        if (channelParametersRef.localVideoTrack) {
            let isMuted = channelParametersRef.localVideoTrack.muted;
            isMuted = !isMuted
            setIsCameraMuted(isMuted);
            await channelParametersRef.localVideoTrack.setMuted(isMuted);
        }
    };

    let toggleMic = async () => {
        if (channelParametersRef.localAudioTrack) {
            let isMuted = channelParametersRef.localAudioTrack.muted;
            isMuted = !isMuted
            setIsMicMuted(isMuted);
            await channelParametersRef.localAudioTrack.setMuted(isMuted);
        }
    };

    let handleLeaveClick = async () => {
        if (agoraEngine) {
            await agoraEngine.leave();
        }
        window.close();
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
                    style={{ backgroundColor: isCameraMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)' }}
                >
                    <img src={CameraIcon} alt="Camera" />
                </div>

                <div
                    className="control-container"
                    id="mic-btn"
                    onClick={toggleMic}
                    style={{ backgroundColor: isMicMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)' }}
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
