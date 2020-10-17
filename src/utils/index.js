export const mapToArray = (map) => Array.from(map.values());

export const muteVideo = (videoRoom) => {
	videoRoom.localParticipant.videoTracks.forEach(function(trackId, track) {
		track.disable();
	});
};

export const unMuteVideo = (videoRoom) => {
	videoRoom.localParticipant.videoTracks.forEach(function(trackId, track) {
		track.enable();
	});
};

export const unMuteAudio = (videoRoom) => {
	videoRoom.localParticipant.audioTracks.forEach(function(trackId, track) {
		track.enable();
	});
};

export const muteAudio = (videoRoom) => {
	videoRoom.localParticipant.audioTracks.forEach(function(trackId, track) {
		track.disable();
	});
};
