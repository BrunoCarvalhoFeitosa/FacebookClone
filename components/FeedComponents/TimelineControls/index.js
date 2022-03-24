import { EmojiHappyIcon, HeartIcon, ReplyIcon } from '@heroicons/react/solid';
import { ChatIcon, ThumbUpIcon } from '@heroicons/react/outline';

const TimelineControls = () => {
  return (
    <div className='px-6 py-3'>
      <div className='w-full flex justify-between flex-col border-b border-b-gray-200 pb-3 md:flex-row md:items-center row-wrap'>
        <div>
          <ul className='flex items-center -space-x-1'>
            <li
              title='Pessoas que curtiram'
              className='w-[30px] h-[30px] flex items-center justify-center rounded-full bg-yellow-500 transition-transform duration-800 hover:transform hover:translate-y-[-6px] cursor-pointer z-10'
            >
              <EmojiHappyIcon className='h-5 text-white' />
            </li>
            <li
              title='Pessoas que compartilharam'
              className='w-[30px] h-[30px] flex items-center justify-center rounded-full bg-blue-500 transition-transform duration-800 hover:transform hover:translate-y-[-6px] cursor-pointer z-10'
            >
              <ReplyIcon className='h-5 text-white transform rotate-180' />
            </li>
            <li
              title='Pessoas que amaram'
              className='w-[30px] h-[30px] flex items-center justify-center rounded-full bg-pink-600 transition-transform duration-800 hover:transform hover:translate-y-[-6px] cursor-pointer z-10'
            >
              <HeartIcon className='h-5 text-white'/>
            </li>
            <li className='relative cursor-pointer left-3'>
              <span className='text-gray-600 hover:underline'>10549</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className='flex items-center flex-col space-x-5 mt-4 md:flex-row md:mt-0'>
            <li className='text-gray-600 hover:underline cursor-pointer'>5299 comentários</li>
            <li className='text-gray-600 hover:underline cursor-pointer'>2346 compartilhamentos</li>
          </ul>
        </div>
      </div>
      <div className='mx-auto w-[85%] mt-3'>
        <ul className='flex items-center justify-between space-x-6md:flex-row'>
          <li className='w-full flex items-center justify-center py-3 px-6 rounded-lg hover:bg-gray-200 cursor-pointer'>
            <button className='flex items-center justify-center space-x-1'>
              <ThumbUpIcon className='h-6 text-gray-500' />
              <span className='hidden md:inline font-semibold text-gray-500'>Curtir</span>
            </button>
          </li>
          <li className='w-full flex items-center justify-center py-3 px-6 rounded-lg hover:bg-gray-200 cursor-pointer'>
            <button className='flex items-center justify-center space-x-1'>
              <ChatIcon className='h-6 text-gray-500' />
              <span className='hidden md:inline font-semibold text-gray-500'>Comentar</span>
            </button>
          </li>
          <li className='w-full flex items-center justify-center py-3 px-6 rounded-lg hover:bg-gray-200 cursor-pointer'>
            <button className='flex items-center justify-center space-x-1'>
              <ReplyIcon className='h-6 text-gray-500 transform rotate-180' />
              <span className='hidden md:inline font-semibold text-gray-500'>Compartilhar</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TimelineControls;