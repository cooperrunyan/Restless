import { ReactChild, useContext, useEffect, useState } from 'react';
import { ChevronBack } from 'renderer/app/icons/chevron-back-outline';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './Body.module.scss';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/ext-language_tools';

export function Body() {
  const dataManager = useContext(DataContext);
  const [openContentType, setOpenContentType] = useState(false);

  const request = dataManager?.getCurrentRequest();

  useEffect(() => {
    document.querySelector('.ace_editor')?.classList.remove('editing-yaml');

    if (request?.body.type === 'yaml') document.querySelector('.ace_editor')?.classList.add('editing-yaml');
  }, [request?.body?.type]);

  if (!request) return <div className={style.Body}></div>;

  return (
    <div className={style.Body}>
      <div className={style.contentType}>
        <span>Content Type:</span>
        <div className={style.contentTypeParent}>
          <div className={style.contentTypeSelector} onClick={(e) => setOpenContentType(!openContentType)}>
            {formatContentType(request.body.type)}
            <ChevronBack className={style.chevron + ' ' + (openContentType ? style.turn : '')} />
          </div>
          <div className={style.contentDropdown + ' ' + (openContentType ? style.activeContent : '')}>
            <ul>
              <li
                onClick={(e) => {
                  setOpenContentType(false);
                  dataManager?.modifyCurrentRequest({
                    body: { data: request.body.data, type: 'json' },
                  });
                }}>
                JSON
              </li>
              <li
                onClick={(e) => {
                  setOpenContentType(false);
                  dataManager?.modifyCurrentRequest({
                    body: { data: request.body.data, type: 'yaml' },
                  });
                }}>
                YAML
              </li>
              <li
                onClick={(e) => {
                  setOpenContentType(false);
                  dataManager?.modifyCurrentRequest({
                    body: { data: request.body.data, type: 'text' },
                  });
                }}>
                Text
              </li>
              <li
                onClick={(e) => {
                  setOpenContentType(false);
                  dataManager?.modifyCurrentRequest({
                    body: { data: request.body.data, type: null },
                  });
                }}>
                None
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={style.body + ' ' + (request.body.type === 'text' ? style.bodytext : '')}
        onScroll={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
        {/* request body will go here */}
        {request.body.type && (
          <AceEditor
            mode={request.body.type}
            onChange={(e) => {
              dataManager?.modifyCurrentRequest({
                body: { data: e, type: request.body.type },
              });
              dataManager?.push();
            }}
            fontSize={14}
            showPrintMargin={false}
            showGutter={false}
            height={`${(request.body.data?.split('\n').length || 0) * 1.4}em`}
            highlightActiveLine={false}
            value={request.body.data || ''}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: false,
              tabSize: 2,
              useWorker: false,
            }}
          />
        )}
      </div>
    </div>
  );
}

function formatContentType(type: 'json' | 'text' | 'yaml' | null) {
  if (type === 'json') return 'JSON';
  if (type === 'yaml') return 'YAML';
  if (type === 'text') return 'Plaintext';
  return 'None';
}
