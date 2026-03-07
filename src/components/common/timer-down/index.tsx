'use client';

import { DateInput, toDate } from '@/lib/date';
import NumberFlow from '@number-flow/react';
import { FC, useState, useEffect } from 'react';
import { useInterval, useIsClient } from 'usehooks-ts';

interface TimerDownProps {
  endDate: DateInput;
}

const TimerDown: FC<TimerDownProps> = ({ endDate }) => {
  const isClient = useIsClient();
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    try {
      setDiff(toDate(endDate).getTime() - Date.now());
    } catch {
      setDiff(0);
    }
  }, [endDate]);

  useInterval(() => {
    try {
      setDiff(toDate(endDate).getTime() - Date.now());
    } catch {
      setDiff(0);
    }
  }, 1_000);

  if (!isClient) return null;

  const totalSeconds = Math.max(Math.floor(diff / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className='flex items-end justify-center gap-2'>
      <span className='text-[72px] font-bold tabular-nums'>
        <NumberFlow value={hours} locales='vi' format={{ minimumIntegerDigits: 2 }} />:
        <NumberFlow value={minutes} locales='vi' format={{ minimumIntegerDigits: 2 }} />
      </span>

      <span className='mb-4 text-[30px] font-semibold opacity-50 tabular-nums'>
        <NumberFlow value={seconds} locales='vi' format={{ minimumIntegerDigits: 2, maximumFractionDigits: 0 }} />
      </span>
    </div>
  );
};

export default TimerDown;
