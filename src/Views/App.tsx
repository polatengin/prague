import React, { FunctionComponent, useState } from 'react';

import { Column } from '../Components/Column';
import { Notification } from '../Components/Notification';
import { TeamsDropdown } from '../Components/TeamsDropdown';
import { WhatsNewButton } from '../Components/WhatsNewButton';

export const App: FunctionComponent = () => {

  const [ notification, setNotification ] = useState("We are unable to connect to the live syncing service. You can continue to create and edit items as usual, but changes will not be updated in real-time to or from other users.");

  return (
    <div className="dark">
      <div className="dark:bg-gray-900 dark:text-white absolute inset-0 w-full h-full flex flex-col">
        <div className="flex mx-4 my-2">
          <div className="flex flex-grow items-center">
            <div className="text-2xl font-bold leading-7 mr-4">Retrospectives</div>
            <TeamsDropdown />
          </div>
          <div className="flex flex-none items-center">
            <div className="mr-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <WhatsNewButton />
          </div>
        </div>
        <div className="mx-4 my-2">Tabs</div>
        <div className="h-auto">
          { notification && <Notification message={notification} onHide={() => setNotification("")} /> }
        </div>
        <div className="grid grid-flow-col gap-x-0.5 auto-cols-fr flex-grow">
          <div className="bg-gray-100 dark:bg-gray-800">
            <Column
              icon={
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
              title="Column 1"
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800">
            <Column
              icon={
                <svg className="w6- h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
              title="Column 2"
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800">
            <Column
              icon={
                <svg className="w6- h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              }
              title="Column 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
