import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { database } from '../../../services/firebase';

const Stories = () => {
  const [users, setUsers] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };

  useEffect(() => {
    const refUserDB = database.ref('user');

    refUserDB.on('value', users => {
      const usersData = Object.entries(users.val() ?? {}).map(([key, userResult]) => {
        return userResult;
      });

      setUsers(usersData);
    });
  }, []);

  return (
    <Slider {...settings} className='flex items-center gap-3'>
      {users.length >= 1 && (
        users?.map((user, index) => (
          user?.imageProfile && user?.imageProfile.length && (
            <div
              key={index}
              className='pl-3 rounded-full md:rounded-xl transition duration-200 cursor-grab hover:opacity-90'
            >
              <div className='relative'>
                <div className='flex items-center justify-center'>
                  <img
                    src={user?.imageProfile}
                    alt={user?.name}
                    className='w-[200px] h-[200px] object-cover rounded-xl'
                  />
                </div>
                <div className='absolute bottom-2 left-4'>
                  <div>
                    <h5 className='text-sm font-bold text-white'>
                      {user?.name.split(' ')[0]}
                    </h5>
                    <h5 className='text-sm font-bold text-white'>
                      {user?.name.split(' ')[1]}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )
        )))
      }
    </Slider>
  );
}

export default Stories;