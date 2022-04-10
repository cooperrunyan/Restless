import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export const ClosedFolder: React.FC<SVGAttributes<SVGElement>> = (props: SVGAttributes<SVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.5 9H22.5M20.625 20.25H3.375C2.87772 20.25 2.40081 20.0525 2.04917 19.7008C1.69754 19.3492 1.5 18.8723 1.5 18.375V5.625C1.5 5.12772 1.69754 4.65081 2.04917 4.29917C2.40081 3.94754 2.87772 3.75 3.375 3.75H6.93234C7.30256 3.75001 7.66448 3.85961 7.9725 4.065L9.2775 4.935C9.58552 5.14039 9.94744 5.24999 10.3177 5.25H20.625C21.1223 5.25 21.5992 5.44754 21.9508 5.79917C22.3025 6.15081 22.5 6.62772 22.5 7.125V18.375C22.5 18.8723 22.3025 19.3492 21.9508 19.7008C21.5992 20.0525 21.1223 20.25 20.625 20.25Z"
      stroke={pallette.blue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
