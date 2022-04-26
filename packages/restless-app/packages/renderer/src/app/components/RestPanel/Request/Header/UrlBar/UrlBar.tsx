import { getRequest } from '@/app/db/get/request';
import { modifyCurrentRequest } from '@/app/db/modify/request';
import { useRefresher } from '@/app/hooks/useRefresher';
import { Bang } from '@/app/types/Bang';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { ChevronBackOutline } from 'react-ionicons';
import { useDebounce } from 'usehooks-ts';
import style from './UrlBar.module.scss';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const UrlBar: React.FC<Props> = ({ request }) => {
  const refresh = useRefresher();
  const [value, setValue] = useState<string>(request.url);
  const debouncedValue = useDebounce<string>(value, 40);
  const urlBox = useRef<HTMLInputElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const clickHandler = (method: string) => () =>
    modifyCurrentRequest({ method })
      .then(() => setShowDropdown(false))
      .then(refresh);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  useEffect(() => void modifyCurrentRequest({ url: debouncedValue }).then(refresh), [debouncedValue]);

  return (
    <div className={style.UrlBar}>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}>
        <div className={style.method + ' ' + (showDropdown ? style.open : style.closed)}>
          <div className={style.content} onClick={e => setShowDropdown(!showDropdown)}>
            <h6>{request.method}</h6>
            <span className={style.caret}>
              <ChevronBackOutline color="var(--7)" height="1.2rem" width="1.2rem" />
            </span>
          </div>

          {showDropdown && (
            <ul className={style.methodDropdown}>
              <li onClick={clickHandler('GET')}>
                <h6>GET</h6>
              </li>
              <li onClick={clickHandler('POST')}>
                <h6>POST</h6>
              </li>
              <li onClick={clickHandler('PUT')}>
                <h6>PUT</h6>
              </li>
              <li onClick={clickHandler('PATCH')}>
                <h6>PATCH</h6>
              </li>
              <li onClick={clickHandler('DELETE')}>
                <h6>DELETE</h6>
              </li>
              <li onClick={clickHandler('OPTIONS')}>
                <h6>OPTIONS</h6>
              </li>
              <li onClick={clickHandler('HEAD')}>
                <h6>HEAD</h6>
              </li>
            </ul>
          )}
        </div>
        <input type="text" ref={urlBox} className={style.urlbar} placeholder="url" value={value} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
