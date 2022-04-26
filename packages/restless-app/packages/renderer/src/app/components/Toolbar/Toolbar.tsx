import { ArrowBackOutline, OptionsOutline, ReaderOutline, ServerOutline, ShapesOutline, TimerOutline } from 'react-ionicons';
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import { Triangle } from './Triangle';
import { useState } from 'react';
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
  const location = useLocation();
  const { pathname } = useResolvedPath(href);
  const current = location.pathname;

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <a
      tabIndex={-1}
      href={href}
      onClick={e => {
        e.preventDefault();
        navigate(href);
      }}
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
      className={current === pathname ? style.active : ''}>
      <Icon height="2.4rem" width="2.4rem" color={current === pathname ? 'var(--7)' : 'var(--5)'} />

      <h6 className={style.tooltip + ' ' + (showTooltip ? style.show : ' ')}>
        <Triangle />{' '}
        {name.split(' ').map(word => (
          <span key={word}>{word}</span>
        ))}
      </h6>
    </a>
  );
};
