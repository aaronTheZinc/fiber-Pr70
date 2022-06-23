import React from 'react';
import Styles from '../Children.module.scss';

import LinkCard from './LinkCard';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';

const SimpleLink: React.FC = () => {
  const initialValues = {
    element_header: '',
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control='input'
                type='text'
                name='element_header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
                icon={false}
              />

              <AddTitleButton title='Add Link' />

              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default SimpleLink;
