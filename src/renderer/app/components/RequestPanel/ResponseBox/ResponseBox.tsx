import { ReactChild, useContext, useEffect, useState } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './ResponseBox.module.scss';
import { TopBar } from './TopBar/TopBar';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/ext-language_tools';

export function ResponseBox(): JSX.Element {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  const [tab, setTab] = useState<'body' | 'headers'>('body');

  useEffect(() => console.log((request?.response as any)?.error), [request?.response]);

  if (!request?.response) return <div className={style.ResponseBox}></div>;
  if ((request.response as any).error!) return <div className={style.ResponseBox}>{(request.response as any).error.message!}</div>;
  return (
    <div className={style.ResponseBox}>
      <TopBar tab={tab} setTab={setTab} />

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
    </div>
  );
}

function Show({ when, children }: { when: boolean; children: ReactChild | ReactChild[] }) {
  return <div className={style.content + ' ' + (when ? style.active : '')}>{when && <>{children}</>}</div>;
}

function OverlapChildren({ children }: { children?: ReactChild | ReactChild[] }) {
  return <div className={style.overlapChildren}>{children}</div>;
}
