import { useContext } from 'react';
import { Checkbox } from '../../../../../icons/checkbox';
import { Trash } from '../../../../../icons/trash';
import { addQueryParams } from '../../../../../lib/addQueryParams';
import { DataContext } from '../../../../../lib/DataManager';
import style from './Query.module.scss';

export const Query: React.FC = () => {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request || !Array.isArray(request?.query)) return <div className={style.Query}></div>;

  return (
    <div className={style.Query}>
      <p className={style.urlPreviewtext}>Url preview</p>
      <div className={style.urlPreview}>{addQueryParams(request)}</div>
      {request.query.map(query => (
        <div key={query.id} id={`id-${query.id}`} className={style.query}>
          <div className={style.inputContainer}>
            <input
              placeholder="Key"
              type="text"
              value={query.key}
              onChange={e => {
                const queries = request.query;
                queries.forEach(_query => {
                  if (_query.id === query.id) _query.key = e.target.value;
                });
                dataManager?.modifyCurrentRequest({ query: queries });
                dataManager?.push();
              }}
            />
            <input
              placeholder="Value"
              type="text"
              value={query.value}
              onChange={e => {
                const queries = request.query;
                queries.forEach(_query => {
                  if (_query.id === query.id) _query.value = e.target.value;
                });
                dataManager?.modifyCurrentRequest({ query: queries });
                dataManager?.push();
              }}
            />
          </div>
          <div className={style.icon}>
            <label htmlFor={`switch-${query.id}`}>
              <Checkbox checked={query.enabled} />
            </label>
          </div>
          <input
            id={`switch-${query.id}`}
            type="checkbox"
            className={style.checkbox}
            checked={query.enabled}
            tabIndex={-1}
            onChange={e => {
              const queries = request.query;
              queries.forEach(_query => {
                if (_query.id === query.id) _query.enabled = e.target.checked;
              });
              dataManager?.modifyCurrentRequest({ query: queries });
              dataManager?.push();
            }}
          />
          <div className={style.icon}>
            <button
              tabIndex={-1}
              onClick={e => {
                e.preventDefault();

                const queries = request.query;

                queries.splice(queries.indexOf(query), 1);

                dataManager?.modifyCurrentRequest({ query: queries });
                dataManager?.push();
              }}>
              <Trash />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={e => {
          e.preventDefault();
          dataManager?.modifyCurrentRequest({
            query: [
              ...request.query,
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
};
