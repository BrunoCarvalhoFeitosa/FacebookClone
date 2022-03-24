import { useState, useEffect } from 'react';
import { database } from '../../../services/firebase';
import { DotsHorizontalIcon, SearchIcon } from '@heroicons/react/outline';
import { VideoCameraIcon } from '@heroicons/react/solid';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const refUserDB = database.ref('user');

    refUserDB.on('value', users => {
      const usersData = Object.entries(users.val() ?? {}).map(([key, userResult]) => {
        return userResult;
      });

      setContacts(usersData);
    });
  }, []);

  return (
    <div className='hidden relative lg:inline lg:fixed lg:top-18 right-3 lg:w-[280px]'>
      <div className='flex items-center space-between'>
        <div className='flex flex-grow mr-12'>
          <h4 className='text-[18px] font-semibold text-gray-600 ml-4'>Contatos</h4>
        </div>
        <div className='flex items-center space-x-4'>
          <div>
            <VideoCameraIcon className='h-5 text-gray-600 cursor-pointer' />
          </div>
          <div>
            <SearchIcon className='h-5 text-gray-600 cursor-pointer' />
          </div>
          <div>
          <DotsHorizontalIcon className='h-6 text-gray-600 cursor-pointer' />
          </div>
        </div>
      </div>
      <div className='mt-4 h-[84vh] overflow-y-auto'>
        {contacts.length >= 1 && (
          contacts?.map((contact, index) => (
            <div
              key={index}
              className='flex items-center space-x-2 py-2 px-4 mt-1 rounded-lg cursor-pointer hover:bg-gray-200'
            >
              <div className='relative flex items-center justify-center rounded-full'>
                <img
                  src={contact?.imageProfile}
                  className='w-[48px] h-[48px] rounded-full object-cover object-top'
                  alt={contact?.name}
                />
                <div className='absolute right-0 bottom-0 w-[14px] h-[14px] rounded-full bg-green-600 animate-ping' />
              </div>
              <div>
                <h5 className='text-md font-semibold text-gray-700'>{contact?.name}</h5>
                <p className='text-xs text-gray-400'>Disponível agora</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;