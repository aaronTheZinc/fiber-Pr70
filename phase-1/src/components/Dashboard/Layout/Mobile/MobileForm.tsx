import { useRef, useState } from 'react';
import { advanceOptions, editOptions, regularOptions } from '../../data';

import MobileFormButton from './MobileFormButton';

const MobileForm: React.FC = () => {
  return (
    <div>
      <div className='px-4 space-y-5'>
        {editOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} />
        ))}
      </div>

      <div className='text-secondary text-lg my-6 advance'>Advanced</div>
      <div className='px-4 space-y-5 '>
        {advanceOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default MobileForm;

<div className='text-secondary text-lg my-6 advance'>Edit Vreels</div>;
{
  regularOptions.map((obj) => {
    if (obj.children) {
      return (
        <div className='px-4 space-y-5'>
          {obj.children.map((obj, index) => (
            <MobileFormButton key={index} obj={obj} />
          ))}
        </div>
      );
    }
  });
}
