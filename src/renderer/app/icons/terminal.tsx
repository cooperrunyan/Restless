import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export function Terminal(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.6562 1.40625H2.34375C1.5671 1.40625 0.9375 2.03585 0.9375 2.8125V12.1875C0.9375 12.9642 1.5671 13.5938 2.34375 13.5938H12.6562C13.4329 13.5938 14.0625 12.9642 14.0625 12.1875V2.8125C14.0625 2.03585 13.4329 1.40625 12.6562 1.40625Z"
        stroke={pallette.white}
        strokeWidth="0.9375"
        strokeLinejoin="round"
      />
      <path
        d="M5.625 7.03125H7.5M2.8125 3.28125L5.15625 5.15625L2.8125 7.03125V3.28125Z"
        stroke={pallette.white}
        strokeWidth="0.9375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
