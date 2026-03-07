'use client';
import { Box, BoxProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC } from 'react';

interface RawSvgProps extends BoxProps {
  src: string;
  size?: number;
}

const RawSvg: FC<RawSvgProps> = ({ src, dangerouslySetInnerHTML, size = 20, sx, ...props }) => {
  const { data: html } = useQuery({
    queryKey: ['svg/raw', { src }],
    queryFn: () =>
      axios
        .get('/api/fetch', { params: { url: src } })
        .then((res) => {
          if (res.headers['content-type'] !== 'image/svg+xml') return '';
          return res.data;
        })
        .catch(() => ''),
  });

  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: html,
        ...dangerouslySetInnerHTML,
      }}
      {...props}
      sx={{
        '& svg': {
          width: size,
          height: size,
        },
        '& [stroke="#000000"]': {
          stroke: 'currentcolor',
        },
        '& [fill="#000000"]': {
          fill: 'currentcolor',
        },
        ...sx,
      }}
    />
  );
};

export default RawSvg;
