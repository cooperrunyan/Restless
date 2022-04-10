import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export const Server: React.FC<SVGAttributes<SVGElement>> = (props: SVGAttributes<SVGElement>) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M11 8.9375C15.5563 8.9375 19.25 7.39848 19.25 5.5C19.25 3.60152 15.5563 2.0625 11 2.0625C6.44365 2.0625 2.75 3.60152 2.75 5.5C2.75 7.39848 6.44365 8.9375 11 8.9375Z"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M19.25 9.19531C19.25 11.0937 15.5547 12.6328 11 12.6328C6.44531 12.6328 2.75 11.0937 2.75 9.19531M19.25 12.8906C19.25 14.789 15.5547 16.3281 11 16.3281C6.44531 16.3281 2.75 14.789 2.75 12.8906"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M2.75 5.46735V16.5327C2.75 18.413 6.44531 19.9375 11 19.9375C15.5547 19.9375 19.25 18.413 19.25 16.5327V5.46735"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);
