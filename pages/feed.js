import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../slices/userSlice';
import { firebase, database } from '../services/firebase';
import Header from '../components/FeedComponents/Header';
import Sidebar from '../components/FeedComponents/Sidebar';
import Stories from '../components/FeedComponents/Stories';
import Timeline from '../components/FeedComponents/Timeline';
import Contacts from '../components/FeedComponents/Contacts';
import ShareFeed from '../components/FeedComponents/ShareFeed';
import SignInPage from '../components/SignInComponent';

const FeedPage = () => {
  const [userAuthenticatedInfo, setUserAuthenticatedInfo] = useState('');
  const [feedUserAuthenticatedInfo, setFeedUserAuthenticatedInfo] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    const refUserDB = database.ref('user');

    refUserDB.on('value', users => {
      const usersArray = Object.entries(users.val()).map(([key, userResult]) => {
        return userResult;
      });

      const userAuthenticated = usersArray.filter(user => {
        return user.email === sessionStorage.getItem('userAuthenticatedEmail');
      });

      userAuthenticated && (
        setUserAuthenticatedInfo(userAuthenticated)
      );
    });

    const refFeedDB = database.ref('feed');

    refFeedDB.on('value', feed => {
      const feedsArray = Object.entries(feed.val()).map(([key, feedResult]) => {
        return feedResult;
      });

      const feedAuthenticated = feedsArray.filter(user => {
        return user.email === sessionStorage.getItem('userAuthenticatedEmail');
      });

      feedAuthenticated && (
        setFeedUserAuthenticatedInfo(feedAuthenticated)
      );
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='w-full'>
      {user ? (
        <>
          <Head>
            <title>Facebook</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Header
            user={user}
            userAuthenticatedInfo={userAuthenticatedInfo}
          />

          <main className='w-full flex justify-end mt-5 md:px-5 lg:justify-between'>
            <Sidebar />
            <div className='w-[83%] md:w-[97%] lg:w-full'>
              <div className='mx-auto sm:w-[60%] md:w-[88%] lg:w-[62%] xl:w-[48%]'>
                <Stories />
                <ShareFeed
                  user={user}
                  userAuthenticatedInfo={userAuthenticatedInfo}
                />
                <Timeline
                  userAuthenticatedInfo={userAuthenticatedInfo}
                  feedUserAuthenticatedInfo={feedUserAuthenticatedInfo}
                />
              </div>
            </div>
            <Contacts />
          </main>
        </>
      ) : (
        <SignInPage />
      )}
    </div>
  );
}

export default FeedPage;
