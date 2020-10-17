import Grid from "@material-ui/core/Grid";
import CallEndIcon from "@material-ui/icons/CallEnd";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import React, { useState } from "react";
import {
	muteAudio,
	unMuteAudio,
	muteVideo,
	unMuteVideo,
} from "../../utils/index";

import VideoRoom from "../VideoRoom/VideoRoom";
import "./app.css";
import AppContainer from "./AppContainer";

const App = ({
	videoRoom,
	userName,
	roomName,
	isJoining,
	isVideoSupported,
	isScreenSharingSupported,
	isScreenSharingEnabled,
	canJoin,
	onJoin,
	onLeave,
	onShare,
	onUserNameChange,
	onRoomNameChange,
	errorMessage,
	onErrorMessageHide,
}) => {
	let content = null;
	let iconStyleOff = {
		backgroundColor: "#F2363D",
		color: "white",
		borderRadius: "50%",
		padding: "8px",
	};

	let iconStyleOn = {
		backgroundColor: "#616161",
		color: "white",
		borderRadius: "50%",
		padding: "8px",
	};

	let videoActionOn = {
		color: "#0B5A56",
		padding: "4px",
	};
	const [mic, setMic] = useState(false);
	const [videocam, setVideocam] = useState(false);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	const handleToggle = (name) => {
		name((prevState) => !prevState);
		if (name === setMic) {
			if (mic) {
				videoRoom.localParticipant.audioTracks.forEach((audio) => {
					console.log(audio.track);
					audio.track.disable();
				});
			} else {
				//enable
				console.log("mic enable");
			}
		}

		if (name === setVideocam) {
			if (!videocam) {
				//disable

				videoRoom.localParticipant.videoTracks.forEach((video) => {
					console.log(video.track);
					video.track.disable();
				});
			} else {
				//enable

				videoRoom.localParticipant.videoTracks.forEach((item) => {
					console.log(item.track);
					item.track.enable();
				});
			}
		}

		// const audioEl = document.getElementsByClassName("audio-element")[0];
		// audioEl.play();
	};
	if (!isVideoSupported) {
		content = <div>Video is not supported</div>;
	} else {
		content = videoRoom && (
			<>
				<div className='video_container'>
					<VideoRoom videoRoom={videoRoom} />
					<div className='control_bar'>
						<audio className='audio-element'>
							<source src='https://assets.coderrocketfuel.com/pomodoro-times-up.mp3' />
						</audio>
						<Grid container justify='space-between' alignItems='center'>
							<Grid item>
								<div className='video_session_details'>
									<span>session details</span>
								</div>
							</Grid>
							<Grid item>
								<div className='video_actions_middle'>
									<span onClick={() => handleToggle(setMic)}>
										{mic ? (
											<MicIcon style={iconStyleOn} fontSize='large' />
										) : (
											<MicOffIcon style={iconStyleOff} fontSize='large' />
										)}
									</span>
									<span onClick={() => onLeave()}>
										<CallEndIcon fontSize='large' />
									</span>
									<span onClick={() => handleToggle(setVideocam)}>
										{videocam ? (
											<VideocamOffIcon style={iconStyleOff} fontSize='large' />
										) : (
											<VideocamIcon style={iconStyleOn} fontSize='large' />
										)}
									</span>
								</div>
							</Grid>
							<Grid item>
								<div className='video_actions_right '>
									<span
										onClick={() => onShare()}
										disabled={!isScreenSharingSupported}>
										{isScreenSharingEnabled ? (
											<>
												<CancelPresentationIcon
													fontSize='large'
													style={videoActionOn}
												/>
											</>
										) : (
											<>
												<PresentToAllIcon
													fontSize='large'
													style={videoActionOn}
												/>
												<p>Present-screen</p>
											</>
										)}
									</span>
									<span onClick={() => onShare()}>
										<>
											<FiberManualRecordIcon
												fontSize='large'
												style={videoActionOn}
											/>
											<p>Record</p>
										</>
									</span>
									<span onClick={() => toggleFullScreen()}>
										<>
											<FullscreenIcon fontSize='large' style={videoActionOn} />
											<p>Fullscreen</p>
										</>
									</span>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			{/* {errorMessage ? Error(`${errorMessage}`) : null} */}
			{content}
		</>
	);
};

const render = (containerProps) => <App {...containerProps} />;
export default (props) => <AppContainer render={render} {...props} />;
