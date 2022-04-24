import { SVGAttributes } from 'react';

export const Logo: React.FC<SVGAttributes<SVGElement> & { color: string }> = props => (
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="258.22" cy="252.72" r="217.72" stroke={props.color} strokeWidth="10" />
    <circle cx="258.82" cy="253.32" r="56.32" fill={props.color} />
    <circle cx="259.32" cy="256.32" r="148.32" stroke={props.color} strokeWidth="9.61591" />
  </svg>
);
