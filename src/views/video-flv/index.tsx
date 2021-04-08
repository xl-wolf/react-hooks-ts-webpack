import * as React from "react";
const { useState, useEffect } = React;
import "./index.less";
export default () => {
  const videos = [
    "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4",
    "https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218025702PSiVKDB5ap.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4",
    "https://stream7.iqilu.com/10339/article/202002/18/02319a81c80afed90d9a2b9dc47f85b9.mp4",
    "http://stream4.iqilu.com/ksd/video/2020/02/17/c5e02420426d58521a8783e754e9f4e6.mp4",
    "http://stream4.iqilu.com/ksd/video/2020/02/17/87d03387a05a0e8aa87370fb4c903133.mp4",
    "https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4",
    "http://stream4.iqilu.com/ksd/video/2020/02/17/97e3c56e283a10546f22204963086f65.mp4",
    "https://stream7.iqilu.com/10339/article/202002/17/778c5884fa97f460dac8d90493c451de.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217021133Eggh6zdlAO.mp4",
    "https://stream7.iqilu.com/10339/article/202002/17/4417a27b1a656f4779eaa005ecd1a1a0.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217104524H4D6lmByOe.mp4",
    "https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217101826WjyFCbUXQ2.mp4",
  ];
  let [currentVideoSrc, setcurrentVideoSrc] = useState(videos[0]);
//   const playVideo = () => {
//     setcurrentVideoSrc((currentVideoSrc = videos[7]));
//   };
//   useEffect(() => {
//     setTimeout(() => {
//       playVideo();
//     }, 40000);
//     return () => {};
//   }, []);
  return (
    <div className="video-wrapper">
      <video
        className="video-content"
        muted
        controls
        poster="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3099272830,677065421&fm=26&gp=0.jpg"
        src={currentVideoSrc}
      />
    </div>
  );
};
