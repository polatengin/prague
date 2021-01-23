import React, { FunctionComponent, useState } from 'react';

import { Modal } from './Modal';

export const WhatsNewButton: FunctionComponent = () => {

  return (
    <>
        <Modal
          title="What's New"
          body="With version 1.0.50 Retrospective Session participants may revoke already casted votes. Max vote limit will come with version 1.0.51 🥳"
          iconElement={
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
          }
          buttons={
            <>
              <button onClick={() => { setIsModalOpen(false); }} type="button" className="text-white bg-blue-500 hover:bg-blue-600 inline-flex justify-center rounded-sm border border-blue-700 shadow-sm px-4 py-1 text-sm font-medium focus:outline-none ml-3 w-auto">
                Close
              </button>
              <button onClick={() => { setIsModalOpen(false); window.open("https://github.com/microsoft/vsts-extension-retrospectives/blob/master/CHANGELOG.md"); }} type="button" className="text-gray-800 bg-gray-50 hover:bg-gray-200 inline-flex justify-center rounded-sm border border-gray-500 shadow-sm px-4 py-1 text-sm font-medium focus:outline-none ml-3 w-auto">
                Changelog
              </button>
            </>
          }
          onDismiss={() => { setIsModalOpen(false); }}
        />
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
        <span className="ml-1">What's New</span>
    </>
  );
};
