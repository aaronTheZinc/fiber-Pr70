import React from 'react'

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div style={{ background: '#000', color: '#fff' }} >
      <header>Header</header>
      <main>{children}</main>
     <footer>footer</footer>
    </div>
  )
}

export default MainLayout