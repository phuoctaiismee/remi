'use client';
import { FC, PropsWithChildren } from 'react';
import { FrontLayoutTabs } from './components';

type FrontLayoutProps = PropsWithChildren;

const FrontLayout: FC<FrontLayoutProps> = ({ children }) => {
  return (
    <>
      <main className='mx-auto w-full max-w-256'>{children}</main>

      <FrontLayoutTabs />
    </>
  );
};

export default FrontLayout;
