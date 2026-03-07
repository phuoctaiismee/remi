'use client';
import { AppTopbar } from '@/lib/navigation';
import { FC } from 'react';

type NotFoundErrorProps = object;

const NotFoundError: FC<NotFoundErrorProps> = () => {
  return (
    <>
      <AppTopbar title='Trang không tồn tại' />
    </>
  );
};

export default NotFoundError;
