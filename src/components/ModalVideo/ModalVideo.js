import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

export default function ModalVideoPlayTrailer() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.ModalVideoReducer);
  return (
    <ModalVideo
      channel="youtube"
      autoplay
      isOpen={status.isOpen}
      videoId={status.videoId}
      onClose={() => {
        const action = {
          type: "SET_STATUS",
          status: { ...status, isOpen: false },
        };
        dispatch(action);
      }}
    />
  );
}
