import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import * as yup from 'yup';
import { database } from '../../../services/firebase';
import {
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PhotographIcon,
  PlayIcon,
  XIcon
} from '@heroicons/react/outline';
import {
  LocationMarkerIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/solid';

const Picker = dynamic(
  () => import('emoji-picker-react'),
  {
    ssr: false,
    loading: () => <p className='font-bold text-center'>Carregando ...</p>,
  }
);

const ShareFeed = ({
  user,
  userAuthenticatedInfo
}) => {
  const [openShareFeed, setOpenShareFeed] = useState(false);
  const [textFeed, setTextFeed] = useState('');
  const [imageFeed, setImageFeed] = useState(null);
  const [emoji, setEmoji] = useState(false);
  const [errorFeed, setFeedError] = useState('');
  const filePicker = useRef(null);
  const email = user.email;
  const postTimeFeed = new Date().toLocaleString();

  const handleOpenShareFeed = (event) => {
    event.preventDefault();

    openShareFeed
      ? setOpenShareFeed(false)
      : setOpenShareFeed(true);
  };

  useEffect(() => {
    const handleOpenShareFeedOnEscape = (event) => {
      event.keyCode == 27 && (
        setOpenShareFeed(false)
      );
    };

    window.addEventListener('keydown', handleOpenShareFeedOnEscape);
  }, []);

  const addFeedImage = (event) => {
    event.preventDefault();

    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageFeed(readerEvent.target.result);
    };
  };

  const removeFeedImage = (event) => {
    event.preventDefault();

    setImageFeed(null);
  };

  const showEmojiOptions = (event) => {
    event.preventDefault();

    emoji
      ? setEmoji(false)
      : setEmoji(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();

    setTextFeed((prevState) => {
      return prevState + emojiObject.emoji;
    });
  };

  const saveFeedOnFirebase = (event) => {
    event.preventDefault();

    const data = {
      email,
      textFeed,
      imageFeed,
      postTimeFeed
    };

    const feedSchema = yup.object().shape({
      textFeed: yup
        .string()
        .min(10, 'Você precisa escrever algo para que seu feed seja publicado.')
        .max(750)
        .required('Para publicar seu feed, preencha a área de texto.')
    });

    feedSchema.validate(
      data,
      { abortEarly: false }
    ).then((response) => {
      const ref = database.ref('feed');

      ref.push(data);

      setTimeout(() => {
        setFeedError('');
        setOpenShareFeed();
        event.target.reset();
      }, 1600);
    }).catch((error) => {
      error.inner?.map(errors => {
        const validationMessage = errors.message;
        setFeedError(validationMessage);
      });
    });
  };

  return (
    <>
      <div className='w-full mt-5 py-5 px-0 mx-auto rounded-lg border border-gray-200 shadow-lg md:px-5'>
        <div className='border-b border-b-gray-200'>
          <div className='flex items-center space-x-2 pb-4 flex-col md:flex-row'>
            <div className='flex items-center justify-center w-[64px] h-[64px] mb-3 rounded-full bg-gray-200 lg:w-[70px] lg:h-[70px] lg:mb-0'>
              {userAuthenticatedInfo && (
                <div>
                  <img
                    src={userAuthenticatedInfo[0]?.imageProfile}
                    alt={userAuthenticatedInfo[0]?.name}
                    title={userAuthenticatedInfo[0]?.name}
                    className='w-[64px] h-[64px] rounded-full object-cover object-top lg:w-[70px] lg:h-[70px]'
                  />
                </div>
              )}
            </div>
            <div className='flex flex-col flex-grow'>
              <button
                type='button'
                className='w-full py-3 bg-gray-200 rounded-full outline-none text-gray-600 text-sm text-center md:pl-5 md:pr-3 md:text-lg'
                onClick={handleOpenShareFeed}
              >
                {`No que você está pensando hoje, ${userAuthenticatedInfo && userAuthenticatedInfo[0]?.name}?`}
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center flex-col mx-auto mt-2 py-2 w-full lg:flex-row xl:w-[80%]'>
          <button
            className='flex items-center space-x-1 py-2 px-8 rounded-lg cursor-pointer hover:bg-gray-200'
            onClick={handleOpenShareFeed}
          >
            <div>
              <PlayIcon className='h-6 text-red-700' />
            </div>
            <div>
              <p className='font-semibold text-gray-500'>Vídeo ao vivo</p>
            </div>
          </button>
          <button
            className='flex items-center space-x-1 py-2 px-8 rounded-lg cursor-pointer hover:bg-gray-200'
            onClick={handleOpenShareFeed}
          >
            <div>
              <PhotographIcon className='h-6 text-green-600' />
            </div>
            <div>
              <p className='font-semibold text-gray-500'>Foto/vídeo</p>
            </div>
          </button>
          <button
            className='flex items-center space-x-1 py-2 px-8 rounded-lg cursor-pointer hover:bg-gray-200'
            onClick={handleOpenShareFeed}
          >
            <div>
              <EmojiHappyIcon className='h-6 text-yellow-600' />
            </div>
            <div>
              <p className='font-semibold text-gray-500'>Sentimento/atividade</p>
            </div>
          </button>
        </div>
      </div>
      <div className={openShareFeed === true ? 'fixed top-0 left-0 flex z-50' : 'hidden'}>
        <div
          className='fixed top-0 left-0 w-full h-[100vh] bg-white/90 z-50 cursor-pointer'
          onClick={handleOpenShareFeed}
        />
        <div className='fixed top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-[90%] bg-white border border-gray-200 shadow-xl rounded-lg z-50 md:w-[640px]'>
          <div className='w-full pt-3'>
            <div className='flex items-center'>
              <div className='flex justify-center flex-grow'>
                <h5 className='text-[20px] font-bold text-center text-gray-700'>Criar publicação</h5>
              </div>
              <div className='relative right-4 flex justify-end'>
                <button
                  type='button'
                  onClick={handleOpenShareFeed}
                  className='flex items-center justify-center w-[40px] h-[40px] bg-gray-300 rounded-full'
                >
                  <XIcon className='h-7 text-gray-700' />
                </button>
              </div>
            </div>
          </div>
          <div className='w-full mt-3 p-4 border-t border-t-gray-300'>
            <div className='w-full'>
              <form onSubmit={saveFeedOnFirebase}>
                <div className='mx-auto mb-4 md:w-[92%]'>
                  <textarea
                    rows={2}
                    maxLength={750}
                    placeholder={`No que você está pensando hoje, ${userAuthenticatedInfo && userAuthenticatedInfo[0]?.name}?`}
                    className={errorFeed ? 'w-full min-h-[90px] text-[15px] outline-none overflow-hidden resize-none bg-red-100' : 'w-full min-h-[90px] text-[15px] outline-none overflow-hidden resize-none'}
                    value={textFeed}
                    onChange={event => setTextFeed(event.target.value)}
                  />
                </div>
                <div className='max-h-[36vh] px-6 scrollbar scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-gray-100 overflow-y-auto'>
                  <div className='w-full my-4'>
                    {imageFeed && (
                      <div className='relative'>
                        <div className='absolute top-1 right-1'>
                          <TrashIcon
                            onClick={removeFeedImage}
                            className='h-6 text-white cursor-pointer'
                          />
                        </div>
                        <div>
                          <img
                            src={imageFeed}
                            alt={email}
                            title={email}
                            className='w-full h-[200px] object-cover object-top'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='w-full'>
                    {emoji && (
                      <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{
                          width: '100%',
                          border: '1px solid #999'
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <input
                      ref={filePicker}
                      onChange={addFeedImage}
                      type='file'
                      hidden
                    />
                  </div>
                </div>
                <div className='w-full flex items-center justify-between mx-auto mt-4 border border-gray-400 rounded-lg py-2 px-5 md:w-[92%]'>
                  <div className='hidden md:inline'>
                    <p className='font-semibold'>Adicionar à sua publicação</p>
                  </div>
                  <div>
                    <ul className='flex items-center justify-center gap-2'>
                      <li className='flex items-center justify-center'>
                        <button
                          type='button'
                          title='Foto/vídeo'
                          onClick={() => filePicker.current.click()}
                        >
                          <PhotographIcon className='h-8 text-green-500' />
                        </button>
                      </li>
                      <li className='flex items-center justify-center'>
                        <button
                          type='button'
                          title='Sentimento/atividade'
                          onClick={showEmojiOptions}
                        >
                          <EmojiHappyIcon className='h-8 text-yellow-500' />
                        </button>
                      </li>
                      <li className='flex items-center justify-center'>
                        <button
                          type='button'
                          title='Marcar pessoas'
                        >
                          <UsersIcon className='h-7 text-blue-500' />
                        </button>
                      </li>
                      <li className='flex items-center justify-center'>
                        <button
                          type='button'
                          title='Check-in'
                        >
                          <LocationMarkerIcon className='h-8 text-red-500' />
                        </button>
                      </li>
                      <li className='flex items-center justify-center'>
                        <button
                          type='button'
                          title='Mais'
                        >
                          <DotsHorizontalIcon className='h-5 text-gray-800' />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {errorFeed && (
                  <div className='mx-auto mt-3 w-[92%] font-semibold text-red-500'>
                    {errorFeed}
                  </div>
                )}
                <div className='mt-5 mx-auto md:w-[92%]'>
                  <button
                    type='submit'
                    className='w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg transition duration-500 hover:opacity-70'
                  >
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareFeed;