export const HeroVideo = () => {
  return (
    <div className="w-full h-full hover:ring-2 ring-primary rounded-xl transition-all duration-300 z-[20] relative flex items-center justify-center">
      <div className=" w-full h-20 bg-primary absolute top-0 rounded-2xl blur-[60px] max-w-6xl mx-auto"></div>
      <div className="w-full border-2  bg-accent/40 backdrop-blur-sm p-4 z-[20] rounded-xl h-full">
        <video
          src="https://res.cloudinary.com/dntlyvzyj/video/upload/v1747332226/Viewchain_launch_-_Made_with_Clipchamp_vdunko.mp4?_s=public-apps"
          autoPlay
          controls
          className="w-full h-full rounded-lg"
          muted
          loop
        />
      </div>
    </div>
  );
};
