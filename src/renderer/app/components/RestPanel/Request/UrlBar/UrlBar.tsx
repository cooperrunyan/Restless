import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ChevronBackOutline } from 'react-ionicons';
import { getRequest } from 'renderer/app/db/get/request';
import { modifyCurrentRequest } from 'renderer/app/db/modify/request';
import { RefresherContext } from 'renderer/app/Refresher';
import { Bang } from 'renderer/app/types/Bang';
import { useDebounce } from 'usehooks-ts';
import style from './UrlBar.module.scss';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const UrlBar: React.FC<Props> = ({ request }) => {
  const { iteration, refresh } = useContext(RefresherContext);
  const [value, setValue] = useState<string>(request.url);
  const debouncedValue = useDebounce<string>(value, 40);

  const [showDropdown, setShowDropdown] = useState(false);

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
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'GET' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>GET</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'POST' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>POST</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'PUT' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>PUT</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'PATCH' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>PATCH</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'DELETE' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>DELETE</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'OPTIONS' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>OPTIONS</h6>
              </li>
              <li
                onClick={e =>
                  modifyCurrentRequest({ method: 'HEAD' })
                    .then(() => setShowDropdown(false))
                    .then(refresh)
                }>
                <h6>HEAD</h6>
              </li>
            </ul>
          )}
        </div>
        <input type="text" className={style.urlbar} value={value} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
