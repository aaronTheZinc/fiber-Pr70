import React, { useRef, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FiMinusCircle } from 'react-icons/fi';
import CallToActions from '../CallToActions/CallToActions';
import { SlidesDataType } from '../../SlidesData';
import Styles from './InnerSlide.module.scss';
import clsx from 'clsx';
import Media from '../Media/Media';
import AdvancedSlide from '../AdvencedSlide/AdvancedSlide';
import { FormikContainer } from 'src/components/formik/FormikContainer';
import FormikControl from 'src/components/formik/FormikControl';

const InnerSlide: React.FC<{
  item: SlidesDataType;
  height: number;
  setHeight: Function;
}> = ({ item, height: hp, setHeight: setHp }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const handleHeight = () => {
    if (height === 0) {
      setHeight(ref.current.offsetHeight);
      setHp(ref.current.offsetHeight + hp);
    } else {
      setHeight(0);
      setHp(hp - ref.current.offsetHeight);
    }
  };

  const initialValues = {
    header: '',
    description: '',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={clsx(Styles.slideContainer, Styles.activeHeight)}>
      <button className={Styles.button} onClick={handleHeight}>
        <span>{item.title}</span>
        <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
      </button>
      <div style={{ height: `${height}px` }} className={Styles.slide}>
        <div className={Styles.slideBody} ref={ref}>
          {item.title === 'Title' && (
            <div className={Styles.innerSlide}>
              <FormikContainer initialValues={initialValues}>
                {(formik) => {
                  return (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // handleLogin(formik.values);
                        handleSubmit(formik.values);
                      }}
                    >
                      <FormikControl
                        control='input'
                        type='text'
                        name='header'
                        placeholder='Header'
                        required={true}
                        slideInput={true}
                      />
                      <FormikControl
                        control='textarea'
                        type='text'
                        name='description'
                        placeholder='Description'
                        required={true}
                      />

                      <button
                        type='submit'
                        style={{
                          backgroundColor: 'Orange',
                          padding: '1rem',
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  );
                }}
              </FormikContainer>
            </div>
          )}
          {item.title === 'Call to action' && <CallToActions />}
          {item.title === 'Media' && <Media />}
          {item.title === 'Advanced' && (
            <AdvancedSlide
              height={height}
              setHeight={setHeight}
              parentHeight={hp}
              setParentHeight={setHp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerSlide;
//  <SlideInput type="text" placeholder="Header" name="header" />
//             <textarea placeholder="Description" />
