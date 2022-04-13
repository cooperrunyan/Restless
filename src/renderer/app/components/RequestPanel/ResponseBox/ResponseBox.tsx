import { ReactChild, useContext, useEffect, useState } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './ResponseBox.module.scss';
import { TopBar } from './TopBar/TopBar';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Loading } from './Loading/Loading';

export const ResponseBox: React.FC = () => {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  const [tab, setTab] = useState<'body' | 'headers'>('body');

  useEffect(() => console.log((request?.response as any)?.error), [request?.response]);

  if (!request?.response) return <div className={style.ResponseBox}></div>;

  return (
    <div className={style.ResponseBox}>
      <Loading loading={!!request.sending} />
      <TopBar tab={tab} setTab={setTab} />

      {!(request.response as any).error! && (
        <OverlapChildren>
          <Show when={tab === 'body'}>
            <div className={style.body}>
              <AceEditor
                mode={'json'}
                onChange={e => {}}
                fontSize={14}
                readOnly
                showPrintMargin={false}
                showGutter={false}
                height={`${(JSON.stringify(request.response.body, null, 2)?.split('\n').length || 0) * 1.4}em`}
                highlightActiveLine={false}
                value={JSON.stringify(request.response.body, null, 2 || {}) || ''}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: false,
                  tabSize: 2,
                  useWorker: false,
                }}
              />
            </div>
          </Show>
          <Show when={tab === 'headers'}>
            <div className={style.body}>
              <AceEditor
                mode={'json'}
                onChange={e => {}}
                fontSize={14}
                readOnly
                showPrintMargin={false}
                showGutter={false}
                height={`${(JSON.stringify(request.response.headers, null, 2)?.split('\n').length || 0) * 1.4}em`}
                highlightActiveLine={false}
                value={JSON.stringify(request.response.headers, null, 2 || {}) || ''}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: false,
                  tabSize: 2,
                  useWorker: false,
                }}
              />
            </div>
          </Show>
        </OverlapChildren>
      )}
      {(request.response as any).error! && (
        <div className={style.error}>
          <p className={style.errorText}>Error</p>
          <div className={style.errorContent}>
            <p className={style.errorMessage}>{parseMessage((request.response as any).error.message!)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

function Show({ when, children }: { when: boolean; children: ReactChild | ReactChild[] }) {
  return <div className={style.content + ' ' + (when ? style.active : '')}>{when && <>{children}</>}</div>;
}

function OverlapChildren({ children }: { children?: ReactChild | ReactChild[] }) {
  return <div className={style.overlapChildren}>{children}</div>;
}

function parseMessage(message: string) {
  if (/enotfound/gi.test(message)) return "Couldn't resolve host name";

  return message;
}
