import { useState } from 'react';
import Image from 'next/image';
import { firebase } from '../../../services/firebase';
import HeaderIcon from '../HeaderIcon';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  CogIcon,
  ExclamationIcon,
  HomeIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import {
  FlagIcon,
  LogoutIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline';

const Header = ({
  user,
  userAuthenticatedInfo
}) => {
  const [toggleMenuConfigs, setToggleMenuConfigs] = useState(false);

  const toggleMenu = () => {
    toggleMenuConfigs
      ? setToggleMenuConfigs(false)
      : setToggleMenuConfigs(true);
  };

  const signOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <header className='sticky top-0 flex items-center justify-between px-2 md:px-4 bg-white shadow-md z-50'>
      <div className='flex items-center'>
        <div>
          <button className='flex items-center cursor-pointer'>
            <Image
              src='/image-facebook.png'
              width={48}
              height={48}
              layout='fixed'
              alt='Facebook'
            />
          </button>
        </div>
        <div className='flex items-center py-2 px-2 ml-2 rounded-full bg-gray-200'>
          <SearchIcon className='h-4 text-gray-600 md:h-5' />
          <input
            type='text'
            placeholder='Pesquisar no Facebook'
            className='hidden lg:inline-flex items-center ml-1 md:ml-2 bg-transparent outline-none placeholder-gray-500'
          />
        </div>
      </div>
      <div className='flex justify-center md:space-x-1 lg:space-x-6'>
        <HeaderIcon active Icon={HomeIcon} className='mr-5' />
        <HeaderIcon Icon={FlagIcon} flag={true} flagValue={2} />
        <HeaderIcon Icon={PlayIcon} flag={true} flagValue={45} />
        <HeaderIcon Icon={ShoppingCartIcon} flag={true} flagValue={7} />
        <HeaderIcon Icon={UserGroupIcon} flag={true} flagValue={33} />
      </div>
      <div className='hidden md:inline-flex items-center font-semibold'>
        <div className='space-x-2'>
          <button className='Menu'>
            <ViewGridIcon className='icon' />
          </button>
          <button title='Messenger'>
            <ChatIcon className='icon' />
          </button>
          <button title='Notificações'>
            <BellIcon className='icon' />
          </button>
          <button title='Conta' onClick={toggleMenu}>
            <ChevronDownIcon className='icon' />
          </button>
        </div>
      </div>
      <div className={toggleMenuConfigs === true ? 'inline-flex fixed top-14 right-0 z-50 bg-white shadow-lg' : 'hidden'}>
        <div className='py-3 px-6'>
          <div className='w-full mr-5 border-b border-b-gray-300 pb-2'>
              {userAuthenticatedInfo && (
                <div className='relative w-full flex items-center justify-center mr-1'>
                  <div className='w-full'>
                    <img
                      src={userAuthenticatedInfo[0]?.imageProfile}
                      alt={userAuthenticatedInfo[0]?.name}
                      title={userAuthenticatedInfo[0]?.name}
                      className='w-full h-[100px] object-cover mb-4'
                    />
                  </div>
                  <div>
                    <h3 className='absolute top-1 right-1 text-md font-bold text-center text-white'>
                      {userAuthenticatedInfo && userAuthenticatedInfo[0]?.name}
                    </h3>
                  </div>
                </div>
              )}
          </div>
          <button className='w-full flex items-center flex-grow px-3 mb-3 space-x-5 border-b border-b-gray-300 group cursor-pointer hover:bg-gray-200'>
            <div className='flex justify-center items-center bg-gray-200 w-[40px] h-[40px] rounded-full group-hover:bg-gray-300'>
              <ExclamationIcon className='h-6 text-gray-700' />
            </div>
            <div className='my-3 text-left'>
              <h5 className='font-semibold'>Dar feedback</h5>
              <p className='text-sm text-gray-600'>Ajude-nos a melhorar o Facebook.</p>
            </div>
          </button>
          <button className='w-full flex items-center flex-grow px-3 space-x-5 rounded-lg group cursor-pointer hover:bg-gray-200'>
            <div className='flex justify-center items-center my-2 bg-gray-200 w-[40px] h-[40px] rounded-full group-hover:bg-gray-300'>
              <CogIcon className='h-6 text-gray-700' />
            </div>
            <div className='my-3'>
              <h5 className='font-semibold'>Configurações e privacidade</h5>
            </div>
          </button>
          <button className='w-full flex items-center flex-grow px-3 space-x-5 rounded-lg group cursor-pointer hover:bg-gray-200'>
            <div className='flex justify-center items-center my-2 bg-gray-200 w-[40px] h-[40px] rounded-full group-hover:bg-gray-300'>
              <QuestionMarkCircleIcon className='h-6 text-gray-700' />
            </div>
            <div className='my-3'>
              <h5 className='font-semibold'>Ajuda e suporte</h5>
            </div>
          </button>
          <button className='w-full flex items-center flex-grow px-3 space-x-5 rounded-lg group cursor-pointer hover:bg-gray-200'>
            <div className='flex justify-center items-center my-2 bg-gray-200 w-[40px] h-[40px] rounded-full group-hover:bg-gray-300'>
              <MoonIcon className='h-6 text-gray-700' />
            </div>
            <div className='my-3'>
              <h5 className='font-semibold'>Tela e acessibilidade</h5>
            </div>
          </button>
          <button
            className='w-full flex items-center flex-grow px-3 space-x-5 rounded-lg group cursor-pointer hover:bg-gray-200'
            onClick={signOut}
          >
            <div className='flex justify-center items-center my-2 bg-gray-200 w-[40px] h-[40px] rounded-full group-hover:bg-gray-300'>
              <LogoutIcon className='h-6 text-gray-700' />
            </div>
            <div className='my-3'>
              <h5 className='font-semibold'>Sair</h5>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;