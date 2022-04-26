import style from './Body.module.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useEffect, useRef, useState } from 'react';
import { Bang } from '../../../../../types/Bang';
import { getRequest } from '../../../../../db/get/request';
import { useWindowSize } from 'usehooks-ts';
import { modifyCurrentRequest } from '../../../../../db/modify/request';
import { useDebounce } from 'usehooks-ts';
import { useRefresher } from '../../../../../hooks/useRefresher';

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
  const refresh = useRefresher();

  const debouncedValue = useDebounce<string>(value, 10);

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
    <div className={style.Body + ' ' + (mode(request.contentType as any) === 'text/x-yaml' ? 'yaml-editor' : '')} ref={container}>
      {request.contentType !== null && (
        <CodeMirror
          value={value}
          options={{
            mode: mode(request.contentType as any),
            tabSize: 2,
            lineNumbers: true,
            styleActiveLine: true,
            lineWrapping: false,
            indentUnit: 2,
            showCursorWhenSelecting: true,
            lineWiseCopyCut: true,
            indentWithTabs: true,
            smartIndent: true,
          }}
          onChange={(editor, data, value) => setValue(value)}
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
    ? 'text/x-yaml'
    : 'text';
