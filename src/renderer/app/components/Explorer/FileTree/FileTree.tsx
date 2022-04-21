import { useState } from 'react';
import { AddOutline } from 'react-ionicons';
import style from './FileTree.module.scss';

export const FileTree: React.FC = () => {
  return (
    <div className={style.FileTree}>
      <div className={style.manager}>
        <button tabIndex={-1}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Request
        </button>
        <button tabIndex={-1}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Folder
        </button>
      </div>
    </div>
  );
};
