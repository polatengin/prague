import React, { FunctionComponent } from 'react';

interface Props {
  message?: string;
  onHide?: () => void;
}

export const Notification: FunctionComponent<Props> = (props: Props) => {

  return (
    <div className="w-full h-12 flex justify-between items-center bg-yellow-50 text-gray-700 text-xs font-semibold px-4">
      <div className="flex items-center">
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{ props.message }</span>
      </div>
      <div className="flex items-center">
        <button type="button" className="border border-gray-700 bg-gray-50 hover:bg-gray-200 outline-none focus:outline-none px-3 py-1 font-semibold">Reconnect</button>
        <svg onClick={() => { if (props.onHide) props.onHide(); }} className="h-10 w-10 inline mx-1 cursor-pointer p-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );

};
