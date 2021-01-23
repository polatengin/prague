import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
  title?: string;
  body?: string;
  iconElement?: ReactNode;
  buttons?: ReactNode;
  onDismiss: () => void;
}

export const Modal: FunctionComponent<Props> = (props) => {

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div onClick={() => { props.onDismiss(); }} className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                { props.iconElement }
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-700" id="modal-headline">
                    { props.title }
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      { props.body }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              { props.buttons }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
