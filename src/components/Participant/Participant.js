import React from "react";


import Track from "../Track/Track";
import { mapToArray } from "../../utils";

import styles from "./Participant.module.scss";

const Participant = ({ participant }) => (
  <div className={styles.participant}>
    {mapToArray(participant.tracks).map(
      trackPublication =>
        trackPublication.track && (
          <Track
            key={trackPublication.track.name}
            track={trackPublication.track}
          />
        )
    )}
  </div>
);



export default Participant;
