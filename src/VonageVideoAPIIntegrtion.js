import { store } from "./Store";
import { handleSubscribtion } from "./Store";
import OT from "@opentok/client";

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

let session, publisher, subscriber, screenSharePublisher, pubOptions;

export function initializeSession(apiKey, sessionId, token) {
  session = OT.initSession(apiKey, sessionId);

  // set publish options
  pubOptions = {
    insertMode: "append",
    style: { buttonDisplayMode: "off" },
    width: "100%",
    height: "100%",
    // videoSource: "camera",
  };
  // Create a publisher
  publisher = OT.initPublisher("publisher", pubOptions, handleError);

  // Subscribing to stream
  session.on("streamCreated", function (event) {
    subscriber = session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        style: { buttonDisplayMode: "off" },
        width: "100%",
        height: "100%",
      },
      handleError
    );
    store.dispatch(handleSubscribtion(true));
  });

  // Do some action on destroying the stream
  session.on("streamDestroyed", function (event) {
    console.log("The Video chat has ended");
    store.dispatch(handleSubscribtion(false));
  });

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

export function stopStreaming() {
  if (session) {
    session.disconnect();
    session.unpublish(publisher);
  }
}

// The following functions are used in functionlaity customization
export function toggleVideo(state) {
  publisher.publishVideo(state);
}
export function toggleAudio(state) {
  publisher.publishAudio(state);
}
export function toggleAudioSubscribtion(state) {
  subscriber.subscribeToAudio(state);
}
export function toggleVideoSubscribtion(state) {
  subscriber.subscribeToVideo(state);
}

export function startScreenShare() {
  OT.checkScreenSharingCapability((response) => {
    if (!response.supported || response.extensionRegistered === false) {
      alert("Screen sharing not supported");
    } else if (response.extensionInstalled === false) {
      alert("Browser requires extension");
    } else {
      screenSharePublisher = OT.initPublisher(
        "screen",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
          videoSource: "screen",
          publishAudio: true,
        },
        handleError
      );
      session.publish(screenSharePublisher, handleError);
    }
  });
}

export function stopScreenShare() {
  screenSharePublisher.destroy();
  session.unpublish(screenSharePublisher);
}
