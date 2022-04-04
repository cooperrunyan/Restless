import { SVGAttributes } from 'react';
import style from './Style.module.scss';

export function Checkbox(props: SVGAttributes<SVGElement> & { checked: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.checkbox + ' ' + (props.checked ? style.checked : '')}>
      <path
        className={style.check + ' ' + (props.checked ? style.show : '')}
        d="M16.5 8.25L10.2 15.75L7.5 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18.75 3H5.25C4.00736 3 3 4.00736 3 5.25V18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75V5.25C21 4.00736 19.9926 3 18.75 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
