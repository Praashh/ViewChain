import { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        viewBox="0 0 1128 1076"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width="1128" height="1076" rx="303" fill="white" />
        <g filter="url(#filter0_d_37_12)">
          <path
            d="M564.907 929L279.25 242H863.25L564.907 929Z"
            fill="#3683FF"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_37_12"
            x="243.55"
            y="198.3"
            width="731.4"
            height="834.4"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="8"
              operator="dilate"
              in="SourceAlpha"
              result="effect1_dropShadow_37_12"
            />
            <feOffset dx="38" dy="30" />
            <feGaussianBlur stdDeviation="32.85" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_37_12"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_37_12"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
