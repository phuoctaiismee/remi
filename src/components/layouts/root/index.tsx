'use client';
import { FC, PropsWithChildren } from 'react';
import { FrontLayoutTabs } from './components';

type RootLayoutProps = PropsWithChildren;

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <main className='mx-auto w-full font-sans flex flex-col hide-scrollbar'>{children}</main>

      <FrontLayoutTabs />
    </>
  );
};

export default RootLayout;
