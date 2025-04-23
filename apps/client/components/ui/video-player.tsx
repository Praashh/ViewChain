'use client';

type VideoPlayerProps = {
  src: string;
};

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <video
        src={src}
        controls
        className="w-full rounded-xl shadow-lg"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
