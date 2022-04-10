import { SVGAttributes } from 'react';
import { pallette } from '../config/pallette';

export const Options: React.FC<SVGAttributes<SVGElement>> = (props: SVGAttributes<SVGElement>) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.75 11H6.1875M15.8125 5.5H19.25H15.8125ZM2.75 5.5H13.0625H2.75ZM15.8125 16.5H19.25H15.8125ZM2.75 16.5H13.0625H2.75ZM8.9375 11H19.25H8.9375Z"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4375 6.875C15.1969 6.875 15.8125 6.25939 15.8125 5.5C15.8125 4.74061 15.1969 4.125 14.4375 4.125C13.6781 4.125 13.0625 4.74061 13.0625 5.5C13.0625 6.25939 13.6781 6.875 14.4375 6.875Z"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5625 12.375C8.32189 12.375 8.9375 11.7594 8.9375 11C8.9375 10.2406 8.32189 9.625 7.5625 9.625C6.80311 9.625 6.1875 10.2406 6.1875 11C6.1875 11.7594 6.80311 12.375 7.5625 12.375Z"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4375 17.875C15.1969 17.875 15.8125 17.2594 15.8125 16.5C15.8125 15.7406 15.1969 15.125 14.4375 15.125C13.6781 15.125 13.0625 15.7406 13.0625 16.5C13.0625 17.2594 13.6781 17.875 14.4375 17.875Z"
      stroke={pallette.white}
      strokeWidth="1.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
