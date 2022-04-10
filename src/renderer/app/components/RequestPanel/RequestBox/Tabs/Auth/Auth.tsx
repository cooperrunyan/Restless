import { useContext, useState } from 'react';
import { ChevronBack } from 'renderer/app/icons/chevron-back-outline';
import { DataContext } from 'renderer/app/lib/DataManager';
import { AuthType } from 'renderer/app/lib/Settings';
import style from './Auth.module.scss';

export const Auth: React.FC = () => {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  const [openDropdown, setOpenDropdown] = useState(false);

  const [showApi, setShowApi] = useState(false);
  const [showBasic, setShowBasic] = useState(false);
  const [showBearer, setShowBearer] = useState(false);
  const [showDigest, setShowDigest] = useState(false);

  if (!request) return <div className={style.Auth}></div>;

  return (
    <div className={style.Auth}>
      <div className={style.type}>
        <span>Type:</span>
        <div className={style.dropdownParent}>
          <div className={style.dropdownController} onClick={e => setOpenDropdown(!openDropdown)}>
            <span>{formatAuthType(request.auth.type)}</span> <ChevronBack className={style.icon + ' ' + (openDropdown ? style.open : '')} />
          </div>
          <ul className={style.dropdown + ' ' + (openDropdown ? style.show : '')}>
            <li>None</li>
            <li>Api Key</li>
            <li>Basic</li>
            <li>Bearer Token</li>
            <li>Digest</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function formatAuthType(type: AuthType) {
  // prettier-ignore
  switch (type) {
    case 'api_key': return 'Api Key'
    case 'basic': return 'Basic'
    case 'bearer': return 'Bearer Token'
    case 'digest': return 'Digest'
  }

  return 'None';
}
