"use client";
import { useDelegatedLinkClick } from "@/hooks/useDelegatedLinkClick";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import Lightbox from "./Lightbox";

const VIDEO_LINK_SELECTOR = 'a[href^="https://www.youtube.com/"]';

/** Opens YouTube links in an in-page video lightbox. */
const VideoPopup = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const close = useCallback(() => setVideoUrl(null), []);

  useDelegatedLinkClick(VIDEO_LINK_SELECTOR, setVideoUrl);

  if (!videoUrl) return null;

  return (
    <Lightbox onClose={close} contentClassName="video-popup-content">
      <ReactPlayer src={videoUrl} width="100%" height="100%" playing />
    </Lightbox>
  );
};

export default VideoPopup;
