import style from './Body.module.scss';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useEffect, useRef, useState, useContext } from 'react';
import { Bang } from 'renderer/app/types/Bang';
import { getRequest } from 'renderer/app/db/get/request';
import { useWindowSize } from 'usehooks-ts';
import { modifyCurrentRequest } from 'renderer/app/db/modify/request';
import { useDebounce } from 'usehooks-ts';
import { RefresherContext } from 'renderer/app/Refresher';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/theme/material.css';

import '../../../../../style/codemirror.scss';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
  containerSize: { width: number; height: number };
  updateInterval: number;
}

export const Body: React.FC<Props> = ({ request, containerSize, updateInterval }) => {
  const [value, setValue] = useState('');
  const size = useWindowSize();
  const container = useRef<HTMLDivElement>(null);
  const { refresh, iteration } = useContext(RefresherContext);

  const debouncedValue = useDebounce<string>(value, 40);

  useEffect(() => void modifyCurrentRequest({ body: debouncedValue }).then(refresh), [debouncedValue]);

  useEffect(() => setValue(request.body || ''), []);
  useEffect(() => {
    const codeMirrorElement = container.current?.querySelector('.CodeMirror') as HTMLDivElement;

    codeMirrorElement?.style?.setProperty('height', `0px`);
    codeMirrorElement?.style?.setProperty('width', `0px`);

    const height = container.current?.children[0]?.clientHeight;
    const width = container.current?.children[0]?.clientWidth;

    codeMirrorElement?.style?.setProperty('height', `${height}px`);
    codeMirrorElement?.style?.setProperty('width', `${width}px`);
  }, [size.height, size.width, containerSize.height, containerSize.width, container.current?.clientHeight, container.current?.clientWidth, updateInterval]);

  return (
    <div className={style.Body} ref={container}>
      {request.contentType !== null && (
        <CodeMirror
          value={sample}
          options={{
            mode: mode(request.contentType as any),
            json: true,
            tabSize: 2,
            lineNumbers: true,
            styleActiveLine: true,
            line: true,
            lineWrapping: false,
            indentUnit: 2,
            smartIndent: true,
            showCursorWhenSelecting: true,
            lineWiseCopyCut: true,
            spellcheck: true,
            autocorrect: true,
          }}
          onBeforeChange={(editor, data, value) => setValue(value)}
          onChange={(editor, data, value) => {}}
        />
      )}
    </div>
  );
};

const mode = (mimeType: null | 'application/json' | 'application/xml' | 'text/plain' | 'text/yaml' | 'text/html') =>
  mimeType === 'application/json'
    ? 'application/json'
    : mimeType === 'application/xml'
    ? 'xml'
    : mimeType === 'text/html'
    ? 'html'
    : mimeType === 'text/yaml'
    ? 'yaml'
    : 'text';

const sample = `{
  "hello": "world",
  "foo": "bar",
  "bizz": {
    "buzz": true,
    "bazz": true,
    "someArray": [
      {
        "hello": "world",
        "foo": "bar",
        "bizz": "buzz"
      },
      {
        "hello": "world",
        "foo": "bar",
        "bizz": "buzz"
      },
    ],
    "foo": "bar",
    "id": 1234
  }
}
`;
