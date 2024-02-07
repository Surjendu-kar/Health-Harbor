import { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1707317749384.json";
import { AnimationItem } from "lottie-web";

const LogoAnimation = () => {
  const animBox = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animBox.current) {
      animationInstance.current = Lottie.loadAnimation({
        container: animBox.current,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
    return () => {
      animationInstance.current?.destroy();
    };
  }, []);

  return <div style={{ width: "300px" }} ref={animBox} />;
};

export default LogoAnimation;
