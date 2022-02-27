import React from 'react'
import Header from '../Shared/Header/Header';

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div style={{ background: '#000', color: '#fff', height: '100%' }} >
      <Header />
      <main>{children}</main>
     <footer>footer</footer>
    </div>
  )
}

export default MainLayout