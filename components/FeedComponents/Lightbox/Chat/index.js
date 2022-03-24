import { useState, useEffect } from 'react';
import { database } from '../../../../services/firebase';
import TimelineControls from '../../TimelineControls';

const LightboxChat = ({
  userAuthenticatedInfo,
  titleLightbox
}) => {
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
    <div className='w-full'>
      <div className='pt-8 pb-4 px-6'>
        <div className='flex items-center'>
          <div className='mr-2'>
            <img
              src={userAuthenticatedInfo[0]?.imageProfile}
              alt={userAuthenticatedInfo[0]?.name}
              title={userAuthenticatedInfo[0]?.name}
              className='w-[60px] h-[60px] rounded-full object-cover object-top'
            />
          </div>
          <div>
            <h2 className='font-semibold'>{userAuthenticatedInfo[0]?.name}</h2>
            <span></span>
          </div>
        </div>
        <div className='mt-3'>
          <h3>{titleLightbox}</h3>
        </div>
      </div>
      <TimelineControls />
      <div className='max-h-[290px] scrollbar scrollbar-thin overflow-y-auto md:max-h-[400px] lg:max-h-[62vh]'>
        {contacts && contacts.map((user, index) => (
          console.log('user', user),
          <div
            key={index}
            className='mb-5'
          >
            <div className='flex px-6'>
              <div className='mr-2'>
                <img
                  src={user.imageProfile}
                  alt={user.name}
                  title={user.name}
                  className='w-[50px] h-[50px] rounded-full object-cover'
                />
              </div>
              <div className='p-3 bg-gray-200 rounded-lg w-[80%]'>
                <h3 className='text-sm font-semibold'>
                  {user.name}
                </h3>
                <p className='text-sm'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LightboxChat;