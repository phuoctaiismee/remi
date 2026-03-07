'use client';

import { AppTopbar } from '@/lib/navigation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { FC, Key, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useIsMounted } from 'usehooks-ts';

interface ImageItem {
  src: string;
  alt: string;
  key: Key;
}

interface PreviewImagesProps {
  images: Array<ImageItem>;
  initialSlide?: number;
  open?: boolean;
  title?: string;
  onClose?: () => void;
}

const PreviewImages: FC<PreviewImagesProps> = ({ images, initialSlide = 0, open = false, title, onClose }) => {
  const [realIndex, setRealIndex] = useState(() => initialSlide);
  const isMounted = useIsMounted()

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent className='bg-positive/90 border-none p-0 max-w-none w-screen h-screen m-0 flex flex-col gap-0 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right z-[100] [&>button]:hidden'>
        <DialogTitle className='hidden'>{title || 'Image Preview'}</DialogTitle>
        <DialogDescription className='hidden'>Preview images in full screen</DialogDescription>

        <AppTopbar
          className='text-negative bg-transparent'
          onBack={onClose}
          center={<span className='line-clamp-1 text-xs font-normal'>{title}</span>}
        />

        <div className='flex-1 overflow-hidden'>
          <Swiper
            style={{ width: '100%', height: '100%' }}
            slidesPerView={1}
            initialSlide={realIndex}
            onRealIndexChange={(swiper) => setRealIndex(swiper.realIndex)}
          >
            {images.map((image) => (
              <SwiperSlide key={image.key} style={{ height: '100%', width: '100%' }}>
                <div className='relative size-full'>
                  <Image src={image.src} alt={image.alt} fill className='object-contain' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex items-center gap-2 px-2 py-4'>
          <div className='bg-positive/90 text-negative flex items-center gap-1 rounded-full px-3 py-1 text-xs'>
            <span>{realIndex + 1}</span>
            <span>/</span>
            <span className='text-negative/50'>{images.length}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImages;
