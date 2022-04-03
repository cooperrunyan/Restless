import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export function Sidebar(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 9.375H15.625C10.4473 9.375 6.25 13.5723 6.25 18.75V81.25C6.25 86.4277 10.4473 90.625 15.625 90.625H32M32 9.375H84.375C89.5527 9.375 93.75 13.5723 93.75 18.75V81.25C93.75 86.4277 89.5527 90.625 84.375 90.625H32M32 9.375V90.625"
        stroke={pallette.white}
        strokeWidth="6.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
