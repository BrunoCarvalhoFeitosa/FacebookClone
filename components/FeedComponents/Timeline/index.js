import { useState, useEffect } from 'react';
import Image from 'next/image';
import LightboxChat from '../Lightbox/Chat';
import TimelineControls from '../TimelineControls';
import { XIcon } from '@heroicons/react/solid';
import { ArrowsExpandIcon, ClockIcon } from '@heroicons/react/outline';

const Timeline = ({
  userAuthenticatedInfo,
  feedUserAuthenticatedInfo
}) => {
  const [lightboxActive, setLightboxActive] = useState(false);
  const [pictureLightbox, setPictureLightbox] = useState('');
  const [titleLightbox, setTitleLightbox] = useState('');
  const [lightboxPictureExpandedIsActive, setLightboxPictureExpandedIsActive] = useState(false);

  const handleLightboxOpened = (event) => {
    setPictureLightbox(event.target.src);
    setTitleLightbox(event.target.title);
    setLightboxActive(true);
  };

  const handleExpandLightboxPicture = (event) => {
    event.preventDefault();

    lightboxPictureExpandedIsActive
      ? setLightboxPictureExpandedIsActive(false)
      : setLightboxPictureExpandedIsActive(true);
  };

  const handleLightboxClosed = (event) => {
    event.preventDefault();

    setPictureLightbox('');
    setLightboxActive(false);
  };

  useEffect(() => {
    const handleLightboxClosedonEscape = (event) => {
      event.keyCode == 27 && (
        setPictureLightbox(''),
        setLightboxActive(false)
      );
    }

    window.addEventListener('keydown', handleLightboxClosedonEscape);
  }, []);

  return (
    <div className='w-full'>
      {feedUserAuthenticatedInfo && feedUserAuthenticatedInfo.map((feed, index) => (
        <div
          key={index}
          className='my-8 mx-auto pt-5 shadow-lg rounded-lg bg-white border border-gray-200 md:w-[90%] lg: lg:w-full'
        >
          <div className='px-5'>
            <div className='flex items-center gap-2 mb-5'>
              <div>
                <img
                  src={userAuthenticatedInfo[0]?.imageProfile}
                  alt={userAuthenticatedInfo[0]?.name}
                  title={userAuthenticatedInfo[0]?.name}
                  className='w-[50px] h-[50px] object-cover rounded-full'
                />
              </div>
              <div>
                <h3 className='font-semibold'>
                  {userAuthenticatedInfo[0]?.name}
                </h3>
                <h5 className='flex items-center text-sm text-gray-400'>
                  <ClockIcon className='h-5 mr-1' />
                  {feed?.postTimeFeed}
                </h5>
              </div>
            </div>
            <div className='w-full mb-3'>
              <p>{feed?.textFeed}</p>
            </div>
          </div>
          <div className='w-full overflow-hidden'>
            <img
              src={feed?.imageFeed}
              alt={feed?.textFeed}
              title={feed?.textFeed}
              onClick={handleLightboxOpened}
              className='w-full transition duration-500 hover:scale-125 cursor-zoom-in'
            />
          </div>
          <TimelineControls />
          <div>
            {lightboxActive === true && (
              <div className='fixed top-0 left-0 w-full bg-black z-50 lg:h-[100vh]'>
                <div className='flex flex-col lg:flex-row '>
                  <div className='relative flex flex-col w-full bg-black lg:flex-row lg:w-[70%]'>
                    <div className='z-30'>
                      <div className='flex items-center lg:flex-row p-2'>
                        <div>
                          <button
                            onClick={handleLightboxClosed}
                            className='flex items-center cursor-pointer'
                          >
                            <Image
                              src='/image-facebook.png'
                              width={48}
                              height={48}
                              layout='fixed'
                            />
                          </button>
                        </div>
                        <button
                          title='Fechar'
                          onClick={handleLightboxClosed}
                          className='ml-1 outline-none'
                        >
                          <XIcon className='h-6 text-white cursor-pointer' />
                        </button>
                        <button
                          title='Expandir'
                          onClick={handleExpandLightboxPicture}
                          className='ml-1 outline-none'
                        >
                          <ArrowsExpandIcon className='h-6 text-white cursor-pointer' />
                        </button>
                      </div>
                    </div>
                    <div className={
                      lightboxPictureExpandedIsActive === true
                      ? 'fixed flex justify-center left-[50%] transform translate-x-[-50%] w-[100%] h-[100vh] overflow-hidden'
                      : 'relative flex justify-center left-[50%] transform translate-x-[-50%] w-full overflow-hidden lg:absolute lg:w-[85%] lg:h-[100vh]'}
                    >
                      <div className='w-full overflow-hidden lg:w-[80%]'>
                        <img
                          src={pictureLightbox}
                          alt={titleLightbox}
                          title={titleLightbox}
                          className={
                            lightboxPictureExpandedIsActive === true
                            ? 'w-full h-full object-cover object-top transform transition-transform duration-500 hover:scale-125 cursor-zoom-in'
                            : 'w-full h-[200px] object-cover object-top transform transition-transform duration-500 hover:scale-125 cursor-zoom-in md:h-[400px] lg:h-[100vh]'
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={lightboxPictureExpandedIsActive === true ? 'transition-opacity duration-1000 opacity-0 hidden' : 'inline w-[100%] h-[100vh] bg-white lg:w-[30%] scrollbar-thumb-gray-300'}>
                    <LightboxChat
                      titleLightbox={titleLightbox}
                      userAuthenticatedInfo={userAuthenticatedInfo}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;

