import { useContext } from 'react';
import { Checkbox } from 'renderer/app/icons/checkbox';
import { Trash } from 'renderer/app/icons/trash';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './Headers.module.scss';

export function Headers() {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request || !Array.isArray(request?.headers)) return <div className={style.Headers}></div>;

  return (
    <div className={style.Headers}>
      {request.headers.map((header) => (
        <div key={header.id} id={`id-${header.id}`} className={style.header}>
          <div className={style.inputContainer}>
            <input
              placeholder="Key"
              type="text"
              value={header.key}
              onChange={(e) => {
                const headers = request.headers;
                headers.forEach((_header) => {
                  if (_header.id === header.id) _header.key = e.target.value;
                });
                dataManager?.modifyCurrentRequest({ headers });
                dataManager?.push();
              }}
            />
            <input
              placeholder="Value"
              type="text"
              value={header.value}
              onChange={(e) => {
                const headers = request.headers;
                headers.forEach((_header) => {
                  if (_header.id === header.id) _header.value = e.target.value;
                });
                dataManager?.modifyCurrentRequest({ headers });
                dataManager?.push();
              }}
            />
          </div>
          <div className={style.icon}>
            <label htmlFor={`switch-${header.id}`}>
              <Checkbox checked={header.enabled} />
            </label>
          </div>
          <input
            id={`switch-${header.id}`}
            type="checkbox"
            className={style.checkbox}
            checked={header.enabled}
            tabIndex={-1}
            onChange={(e) => {
              const headers = request.headers;
              headers.forEach((_header) => {
                if (_header.id === header.id) _header.enabled = e.target.checked;
              });
              dataManager?.modifyCurrentRequest({ headers });
              dataManager?.push();
            }}
          />
          <div className={style.icon}>
            <button
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();

                const headers = request.headers;

                headers.splice(headers.indexOf(header), 1);

                dataManager?.modifyCurrentRequest({ headers });
                dataManager?.push();
              }}>
              <Trash />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={(e) => {
          e.preventDefault();
          dataManager?.modifyCurrentRequest({
            headers: [
              ...request.headers,
              {
                enabled: true,
                key: '',
                value: '',
                id: dataManager?.uuid()!,
              },
            ],
          });
        }}>
        New
      </button>
    </div>
  );
}
