import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import { Tooltip, Button } from "@material-ui/core";
import { apiKey, sessionId, token } from "./constants";
import {
  toggleAudio,
  toggleVideo,
  toggleAudioSubscribtion,
  toggleVideoSubscribtion,
  initializeSession,
  stopStreaming,
  startScreenShare,
  stopScreenShare,
} from "./VonageVideoAPIIntegrtion";
import "./VideoChatComponent.scss";
// import { Stop } from "@material-ui/icons";

function VideoChatComponent() {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioSubscribed, setIsAudioSubscribed] = useState(true);
  const [isVideoSubscribed, setIsVideoSubscribed] = useState(true);
  const [isStreamSubscribed, setIsStreamSubscribed] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const isSubscribed = useSelector(
    (state) => state.videoChat.isStreamSubscribed
  );

  useEffect(() => {
    isInterviewStarted
      ? initializeSession(apiKey, sessionId, token)
      : stopStreaming();
  }, [isInterviewStarted]);

  useEffect(() => {
    setIsStreamSubscribed(isSubscribed);
  }, [isSubscribed]);

  const onToggleAudio = (action) => {
    setIsAudioEnabled(action);
    toggleAudio(action);
  };
  const onToggleVideo = (action) => {
    setIsVideoEnabled(action);
    toggleVideo(action);
  };
  const onToggleAudioSubscribtion = (action) => {
    setIsAudioSubscribed(action);
    toggleAudioSubscribtion(action);
  };
  const onToggleVideoSubscribtion = (action) => {
    setIsVideoSubscribed(action);
    toggleVideoSubscribtion(action);
  };

  const renderToolbar = () => {
    return (
      <>
        {isInterviewStarted && (
          <div className="video-toolbar">
            {isAudioEnabled ? (
              <Tooltip title="mic on">
                <MicIcon
                  onClick={() => onToggleAudio(false)}
                  className="on-icon"
                />
              </Tooltip>
            ) : (
              <Tooltip title="mic off">
                <MicOffIcon
                  onClick={() => onToggleAudio(true)}
                  className="off-icon"
                />
              </Tooltip>
            )}
            {isVideoEnabled ? (
              <Tooltip title="camera on">
                <VideocamIcon
                  onClick={() => onToggleVideo(false)}
                  className="on-icon"
                />
              </Tooltip>
            ) : (
              <Tooltip title="camera off">
                <VideocamOffIcon
                  onClick={() => onToggleVideo(true)}
                  className="off-icon"
                />
              </Tooltip>
            )}
            {isScreenShared ? (
              <Tooltip title="screen on">
                <ScreenShareIcon
                  onClick={() => {
                    stopScreenShare();
                    setIsScreenShared(false);
                  }}
                  className="on-icon"
                />
              </Tooltip>
            ) : (
              <Tooltip title="screen off">
                <StopScreenShareIcon
                  onClick={() => {
                    startScreenShare();
                    setIsScreenShared(true);
                  }}
                  className="off-icon"
                />
              </Tooltip>
            )}

            {isStreamSubscribed && (
              <>
                {isAudioSubscribed ? (
                  <Tooltip title="sound on">
                    <VolumeUpIcon
                      onClick={() => onToggleAudioSubscribtion(false)}
                      className="on-icon"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="sound off">
                    <VolumeOffIcon
                      onClick={() => onToggleAudioSubscribtion(true)}
                      className="off-icon"
                    />
                  </Tooltip>
                )}
                {isVideoSubscribed ? (
                  <Tooltip title="screen on">
                    <VisibilityIcon
                      onClick={() => onToggleVideoSubscribtion(false)}
                      className="on-icon"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="screen of">
                    <VisibilityOffIcon
                      onClick={() => onToggleVideoSubscribtion(true)}
                      className="off-icon"
                    />
                  </Tooltip>
                )}
              </>
            )}
          </div>
        )}
      </>
    );
  };

  const renderPubScreenShared = () => {
    return (
      <>
        <div id="subscriber" className="additional-video-sub"></div>
        <div id="publisher" className="additional-video-pub">
          {renderToolbar()}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="actions-btns">
        <Button
          onClick={() => setIsInterviewStarted(true)}
          disabled={isInterviewStarted}
          color="primary"
          variant="contained"
        >
          Start chat
        </Button>
        <Button
          onClick={() => setIsInterviewStarted(false)}
          disabled={!isInterviewStarted}
          color="secondary"
          variant="contained"
        >
          Finish chat
        </Button>
      </div>
      {isInterviewStarted && (
        <>
          {isScreenShared ? <div>{renderPubScreenShared()}</div> : null}
          <div className="video-container">
            <div id="screen" className="additional-video-sub"></div>
            <div
              id="subscriber"
              className={`${
                !isStreamSubscribed || isScreenShared
                  ? "additional-video-sub"
                  : "main-video"
              }`}
            >
              {isStreamSubscribed && renderToolbar()}
            </div>
            <div
              id="publisher"
              className={`${
                isStreamSubscribed ? "additional-video-pub" : "main-video"
              }`}
            >
              {!isStreamSubscribed && renderToolbar()}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VideoChatComponent;
