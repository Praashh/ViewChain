import { btc, sol, eth } from "@/constants/image";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export const BtcImg = () => {
  return (
    <div className="flex items-center absolute top-44 right-0 justify-center">
      <div className="bottom-[0rem] z-[1] left-1/2 -translate-x-1/2 absolute bg-gradient-to-t ease-in-out from-primary blur-[2em] transition-all duration-700 size-[15em] rounded-full rotate-[-40deg]"></div>
      <Image src={btc} alt="btc" className="size-[20rem] z-[20]" />
    </div>
  );
};

export const EthImg = () => {
  return (
    <div className="flex items-center absolute top-[20rem] left-20 scale-x-[-1] justify-center">
      <div className="bottom-[0rem] z-[1] left-1/2 -translate-x-1/2 absolute bg-gradient-to-t ease-in-out from-primary blur-[2em] transition-all duration-700 size-[8em] rounded-full rotate-[-40deg]"></div>
      <Image src={eth} alt="eth" className="size-[12rem] z-[20]" />
    </div>
  );
};

export const SolImg = ({
  image,
  className,
  size,
  glareClassName,
}: {
  image: string | StaticImageData;
  className?: string;
  size?: string;
  glareClassName?: string;
}) => {
  return (
    <div className={cn("flex items-center absolute justify-center", className)}>
      <div
        className={cn(
          "bottom-[0rem] z-[1] left-1/2 -translate-x-1/2 absolute bg-gradient-to-t ease-in-out from-primary blur-[2em] transition-all duration-700 size-[12em] rounded-full rotate-[-40deg]",
          glareClassName
        )}
      ></div>
      <Image
        src={image}
        alt="sol"
        className={cn("size-[18rem] z-[20]", size)}
      />
    </div>
  );
};
