import { useContext, useEffect, useRef, useState } from 'react';
import { buildRequest } from 'renderer/app/lib/buildRequest';
import { ChevronBack } from '../../../icons/chevron-back-outline';
import { DataContext } from '../../../lib/DataManager';
import { Method, Request } from '../../../lib/Settings';
import style from './UrlBox.module.scss';
import { send as sendRequest } from 'renderer/app/lib/send';

export const UrlBox: React.FC = () => {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();
  const [methodSelectOpen, setMethodSelectOpen] = useState(false);
  const urlref = useRef<HTMLInputElement>(null);

  useEffect(() => console.log(!!request?.sending), [request?.sending]);

  if (!request) return <div className={style.UrlBox}></div>;

  return (
    <form className={style.UrlBox} onSubmit={send(request, dataManager)}>
      <div className={style.method} onClick={e => setMethodSelectOpen(!methodSelectOpen)}>
        <span>{request.method}</span>
        <ChevronBack className={methodSelectOpen ? style.turn : ''} />
      </div>
      <div className={style.methodSelect + ' ' + (methodSelectOpen ? style.open : '')}>
        {(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const).map(method => (
          <MethodOption key={method} close={setMethodSelectOpen.bind(false) as any}>
            {method}
          </MethodOption>
        ))}
      </div>
      <input
        className={style.url}
        value={request.endpoint}
        ref={urlref}
        tabIndex={-1}
        onChange={() => {
          dataManager?.modifyCurrentRequest({
            endpoint: urlref.current!.value,
          });
          dataManager?.push();
        }}
      />
      <button tabIndex={-1} className={style.send + ' ' + (request?.sending ? style.sending : '')} type="submit" disabled={!!request?.sending}>
        Send
      </button>
    </form>
  );
};

function send(request: Request, dataManager: any) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!request || !dataManager) return;

    request.sending = true;
    dataManager.modifyCurrentRequest(request);
    dataManager.push();

    const response = await sendRequest(request);

    request.sending = false;
    request.response = response as any;
    dataManager.modifyCurrentRequest(request);
    dataManager.push();
  };
}

interface MethodOptionProps {
  children: Method;
  close: () => void;
}

const MethodOption: React.FC<MethodOptionProps> = ({ children: option, close }: MethodOptionProps) => {
  const dataManager = useContext(DataContext);

  return (
    <div
      className={style.MethodOption}
      onClick={e => {
        dataManager?.modifyCurrentRequest({ method: option });
        dataManager?.push();
        close();
      }}>
      {option}
    </div>
  );
};
