import floevid from "../../assets/videos/FloePH.mp4";

const Showcase = () => {
  return (
    <div className="flex justify-center items-center gap-8 w-full px-6 sm:px-10 py-16 lg:py-0">
      <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-5xl border-3 rounded-xl border-floesky overflow-hidden">
        <video
          src={floevid}
          autoPlay
          muted
          loop
          controls
          controlsList="nodownload"
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Showcase;
