import React from 'react'
import Header from '../Shared/Header/Header';
import Menu from '../Shared/Menu/Menu';

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div style={{ background: '#000', color: '#fff', height: '100%' }} >
      <Header />
      <Menu />
      <main>{children}</main>
     <footer>footer</footer>
    </div>
  )
}

export default MainLayout