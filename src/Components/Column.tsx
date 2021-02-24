import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
  title?: string;
  icon?: ReactNode
}

export const Column: FunctionComponent<Props> = (props: Props) => {

  return (
    <>
      <div className="w-full h-12 flex items-center text-gray-800 dark:text-white text-md font-semibold px-4">
        { props.icon }
        { props.title }
      </div>
      <div className="flex items-center mx-4 mb-4 text-blue-600">
        <svg className="w-7 h-7 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="dark:text-white text-gray-800 text-sm">Add new feedback</span>
      </div>
    </>
  );
};
