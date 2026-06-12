import floevid from "../../assets/FloePH.mp4";

const Showcase = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <div className="flex justify-between items-end w-7xl border-3 rounded-xl border-floesky overflow-hidden">
        <video
          src={floevid}
          autoPlay
          muted
          loop
          controls
          controlsList="nodownload"
          playsInline
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Showcase;
