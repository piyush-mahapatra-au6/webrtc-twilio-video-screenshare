import React, { PureComponent } from "react";
import { isEmpty } from "lodash";

import Participant from "../Participant/Participant";
import LocalParticipant from "../Participant/LocalParticipant";
import EventSubscriber from "../EventSubscriber/EventSubscriber";
import { mapToArray } from "../../utils";
import TimerIcon from '@material-ui/icons/Timer';

import Container from "@material-ui/core/Container";
import "./videoroom.css";

const EVENTS = [
	"dominantSpeakerChanged",
	"participantConnected",
	"participantDisconnected",
	"reconnected",
	"reconnecting",
	"trackDimensionsChanged",
	"trackDisabled",
	"trackEnabled",
	"trackPublished",
	"trackStarted",
	"trackSubscribed",
	"trackUnpublished",
	"trackUnsubscribed",
];

class VideoRoom extends PureComponent {
	update = () => this.forceUpdate();

	componentDidMount() {
		// console.log(this.props.videoRoom.participants);
		// console.log(this.props.videoRoom.localParticipant);
	}

	render() {
		const { videoRoom } = this.props;
		const remoteParticipants = mapToArray(videoRoom.participants);

		return (
			<EventSubscriber
				events={EVENTS}
				eventEmitterObject={videoRoom}
				onUpdate={this.update}>
					<div
					className={` ${
						!isEmpty(remoteParticipants) ? "active_timer_container " : "inactive_timer_container"
					}`}>
					<span><TimerIcon  size="small" /></span> <span>0:0:00</span>
				</div>
				<div
					className={`local_video_container ${
						!isEmpty(remoteParticipants) ? "inactive_local_container " : ""
					}`}>
					<LocalParticipant participant={videoRoom.localParticipant} />
				</div>

				{!isEmpty(remoteParticipants) &&
					remoteParticipants.map((participant) => (
						<div className='remote_video_container'>
							<Participant key={participant.sid} participant={participant} />
						</div>
					))}
			</EventSubscriber>
		);
	}
}

export default VideoRoom;



/**
 * 
 * 
 * 				<div
					className={` ${
						!isEmpty(remoteParticipants) ? "inactive_timer_container " : "active_timer_container"
					}`}>
					<span><TimerIcon  size="small" /></span> <span>0:0:09</span>
				</div>
 * 
 */