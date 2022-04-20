import { ArrowBackOutline, OptionsOutline, ReaderOutline, ServerOutline, ShapesOutline, TimerOutline } from 'react-ionicons';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import style from './Toolbar.module.scss';

export const Toolbar: React.FC = () => {
  return (
    <div className={style.Toolbar}>
      <Item name="Back" href="/home">
        {ArrowBackOutline}
      </Item>
      <Item name="Rest" href="/">
        {ShapesOutline}
      </Item>
      <Item name="Mock Servers" href="/mock-servers">
        {ServerOutline}
      </Item>
      <Item name="Realtime" href="realtime">
        {TimerOutline}
      </Item>
      <Item name="Documentation" href="docs">
        {ReaderOutline}
      </Item>
      <Item name="Settings" href="settings">
        {OptionsOutline}
      </Item>
    </div>
  );
};

interface Props {
  children: React.FC<any>;
  href: string;
  name: string;
}

const Item: React.FC<Props> = ({ children: Icon, href, name }) => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath(href);
  const current = new URL(window.location.href).pathname;

  return (
    <a
      href={href}
      onClick={e => {
        e.preventDefault();
        navigate(href);
      }}
      className={current === pathname ? style.active : ''}>
      <Icon height="2.4rem" width="2.4rem" color={current === pathname ? 'var(--7)' : 'var(--5)'} />
    </a>
  );
};
