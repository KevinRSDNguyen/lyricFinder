import React from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

export default () => {
  return (
    <Consumer>
      {value => {
        const { track_list, heading } = value;
        if (track_list.length === 0) {
          return <Spinner />;
        } else {
          return (
            <React.Fragment>
              <h3 className="text-center mb-4">{heading}</h3>
              <div className="row">
                {track_list.map(({ track }) => (
                  <Track key={track.track_id} track={track} />
                ))}
              </div>
            </React.Fragment>
          );
        }
      }}
    </Consumer>
  );
};
