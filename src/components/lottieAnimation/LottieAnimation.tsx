import { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1705777251875.json";
import { AnimationItem } from "lottie-web";

const LottieAnimation = () => {
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

    // Cleanup function
    return () => {
      animationInstance.current?.destroy();
    };
  }, []);

  return <div style={{ width: "50px" }} ref={animBox} />;
};

export default LottieAnimation;
