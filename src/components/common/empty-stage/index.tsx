import { FC } from 'react';

interface EmptyStageProps {
  message?: string;
}

const EmptyStage: FC<EmptyStageProps> = () => {
  return (
    <div className='text-neutral-1 flex flex-col py-8'>
      <p className='text-center'>Không có dữ liệu</p>
    </div>
  );
};

export default EmptyStage;
