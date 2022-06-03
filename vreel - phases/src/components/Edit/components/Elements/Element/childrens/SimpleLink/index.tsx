import React from 'react';
import AddTitleButton from 'src/components/Shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';
import LinkCard from './LinkCard';

const SimpleLink: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput placeholder='Element Header' type='text' />
      <AddTitleButton title='Add Link' />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </div>
  );
};

export default SimpleLink;
