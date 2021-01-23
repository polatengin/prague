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
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
              title="Column 1"
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800">
            <Column
              title="Column 2"
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800">
            <Column
              title="Column 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
