import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export const Cancel: React.FC<SVGAttributes<SVGElement>> = (props: SVGAttributes<SVGElement>) => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20.8438 8.15625L8.15625 20.8438M20.8438 20.8438L8.15625 8.15625L20.8438 20.8438Z"
      stroke={pallette.white}
      strokeWidth="1.8125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
