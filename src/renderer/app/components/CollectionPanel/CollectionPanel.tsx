import { useContext, useState } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import { ManageCollections } from '../ManageCollections/ManageCollections';
import style from './CollectionPanel.module.scss';
import { New } from './New/New';
import { Tree } from './Tree/Tree';

import React from 'react';

interface Props {}

export const CollectionPanel: React.FC<Props> = ({}: Props) => {
  const [hover, setHover] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const dataManager = useContext(DataContext);

  return (
    <div className={style.CollectionPanelParent}>
      <div className={style.CollectionPanel}>
        <ManageCollections />
        {dataManager?.getCurrentCollection() && (
          <div className={style.requests}>
            <New
              hover={hover}
              setHover={setHover}
              isCreatingRequest={isCreatingRequest}
              setIsCreatingRequest={setIsCreatingRequest}
              isCreatingFolder={isCreatingFolder}
              setIsCreatingFolder={setIsCreatingFolder}
            />
            <Tree />
          </div>
        )}
      </div>
    </div>
  );
};
