import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Cancel } from '../../../icons/cancel';
import { Add } from '../../../icons/add';
import style from './New.module.scss';
import { Setter } from '../../../types/State';
import { DataContext } from 'renderer/app/lib/DataManager';

export function New({
  hover,
  setHover,
  isCreatingRequest,
  isCreatingFolder,
  setIsCreatingFolder,
  setIsCreatingRequest,
}: {
  hover: boolean;
  setHover: Setter<boolean>;
  isCreatingRequest: boolean;
  setIsCreatingRequest: Setter<boolean>;
  isCreatingFolder: boolean;
  setIsCreatingFolder: Setter<boolean>;
}) {
  const folderNameRef = useRef<HTMLInputElement>(null);
  const requestNameRef = useRef<HTMLInputElement>(null);
  const dataManager = useContext(DataContext);

  useEffect(() => {
    if (isCreatingRequest) requestNameRef.current?.focus();
  }, [isCreatingRequest]);

  useEffect(() => {
    if (isCreatingFolder) folderNameRef.current?.focus();
  }, [isCreatingFolder]);

  return (
    <>
      <div
        className={style.New}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div
          className={style.notHover + ' ' + (!hover ? style.showNotHover : '')}
        >
          <span>New</span>
          <Add />
        </div>
        <div className={style.hovered + ' ' + (hover ? style.showHover : '')}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCreatingRequest(true);
              setIsCreatingFolder(false);
            }}
          >
            Request
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCreatingRequest(false);
              setIsCreatingFolder(true);
            }}
          >
            Folder
          </button>
        </div>
      </div>

      {isCreatingFolder && (
        <div
          className={
            style.createFolder + ' ' + (isCreatingFolder ? style.shown : '')
          }
        >
          <p>
            <span>New Folder</span>{' '}
            <Cancel
              onClick={() => {
                setIsCreatingFolder(false);
              }}
            />
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!folderNameRef?.current?.value.trim()) return;

              setIsCreatingFolder(false);

              dataManager?.createFolder(folderNameRef.current.value.trim());
              dataManager?.push();
            }}
          >
            <div className={style.row}>
              <label htmlFor="createFolderInput">Name</label>
              <input
                ref={folderNameRef}
                type="text"
                name="createFolderInput"
                id="createFolderInput"
                placeholder="Folder name"
              />
            </div>

            <button type="submit">Create Folder</button>
          </form>
        </div>
      )}
      {isCreatingRequest && (
        <div
          className={
            style.createRequest + ' ' + (isCreatingRequest ? style.shown : '')
          }
        >
          <p>
            <span>New Request</span>{' '}
            <Cancel
              onClick={() => {
                setIsCreatingRequest(false);
              }}
            />
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!requestNameRef.current!.value.trim()) return;

              setIsCreatingRequest(false);

              dataManager?.createRequest(requestNameRef.current!.value.trim());
              dataManager?.push();
            }}
          >
            <div className={style.row}>
              <label htmlFor="createRequestInput">Name</label>
              <input
                ref={requestNameRef}
                type="text"
                name="createRequestInput"
                id="createRequestInput"
                placeholder="Request name"
              />
            </div>
            <button type="submit">Create Request</button>
          </form>
        </div>
      )}
    </>
  );
}
