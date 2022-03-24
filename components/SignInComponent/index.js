import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import * as yup from 'yup';
import { firebase } from '../../services/firebase';
import {
  DotsHorizontalIcon,
  TranslateIcon,
} from '@heroicons/react/solid'
import {
  EyeIcon,
  EyeOffIcon
} from '@heroicons/react/solid';

const SignInPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDoubleCheck, setPasswordDoubleCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [userError, setUserError] = useState(false);
  const router = useRouter();

  const showOrHidePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const validateUser = async () => {
    try {
      const getFirebaseUser = await firebase.auth().signInWithEmailAndPassword(email, password);

      getFirebaseUser.user.uid && (
        setPasswordError(''),
        setUserError(false),
        sessionStorage.setItem('userAuthenticatedEmail', getFirebaseUser.user.email),
        setTimeout(() => {
          router.push('/feed')
        }, 1200)
      );

    } catch (error) {
      console.error('Invalid e-mail or password.', error);

      switch (error.code) {
        case 'auth/wrong-password':
          setPasswordError('E-MAIL ou SENHA estão incorretos, para prosseguir revise suas informações.');
          setUserError(true);
          break;
        case 'auth/user-not-found':
          setPasswordError('O E-MAIL informado não existe, para prosseguir faça um novo cadastro.');
          setUserError(true);
          break;
        case 'auth/too-many-requests':
            setPasswordError('Foram feitas muitas tentativas de acesso a esta conta, tente novamente depois.');
            setUserError(true);
        break;
      }
    }
  };

  const listDataFromFirebase = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      passwordDoubleCheck
    };

    const userSchema = yup.object().shape({
      email: yup
        .string()
        .email('Digite um e-mail válido.')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Insira um E-MAIL com um domínio válido, exemplo: @gmail.com - @outlook.com.')
        .max(150)
        .required('Para poder prosseguir, preencha o campo E-MAIL, ele está vazio no momento.'),
      password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{7,}$/, 'Sua SENHA deverá conter no mínimo 7 carácteres e seguir este exemplo: @Qwerty9')
        .required('Para poder prosseguir, preencha o campo SENHA, ele está vazio no momento.'),
      passwordDoubleCheck: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{7,}$/, 'Sua SENHA deverá conter no mínimo 7 carácteres e seguir este exemplo: @Qwerty9')
        .required('Para poder prosseguir, preencha o campo REPETIR SENHA, ele está vazio no momento.')
        .oneOf([yup.ref('password')], 'Erro em sua SENHA DE REPETIÇÃO, as duas senhas devem ser iguais.')
    });

    userSchema.validate(
      data,
      { abortEarly: false }
    ).then((response) => {
      try {
        validateUser();
        setFormError('');
      } catch (error) {
        console.error('Error', error);
      }
    }).catch((error) => {
      error.inner.map(errors => {
        const validationMessage = errors.message;
        setFormError(validationMessage);
      });
    });
  };

  return (
    <div className='w-full h-full'>
      <Head>
        <title>Entre no Facebook</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full'>
        <div className='w-full bg-gradient-to-b from-blue-400 to-blue-500 pb-8 xl:h-[40vh] xl:pb-0'>
          <div className='mx-auto w-[90%] md:w-[80%]'>
            <header className='w-full flex items-center space-between py-10'>
              <div className='flex items-center flex-grow'>
                <div className='cursor-pointer animate-pulse'>
                  <button onClick={() => router.push('/')}>
                    <Image
                      src='/image-facebook-white.png'
                      width={48}
                      height={48}
                      layout='fixed'
                      alt='Facebook'
                    />
                  </button>
                </div>
                <div className='ml-[30px] lg:ml-[150px]'>
                  <ul className='flex items-center text-white space-x-6'>
                    <li className='cursor-pointer hover:underline'>Messenger</li>
                    <li className='hidden md:inline cursor-pointer hover:underline'>Facebook Lite</li>
                    <li className='hidden md:inline cursor-pointer hover:underline'>Watch</li>
                    <li className='hidden md:inline cursor-pointer hover:underline'>Pessoas</li>
                    <li className='cursor-pointer hover:underline'>Páginas</li>
                    <li className='hidden lg:inline cursor-pointer hover:underline'>Grupos</li>
                    <li className='cursor-pointer hover:underline'><DotsHorizontalIcon className='h-5' /></li>
                  </ul>
                </div>
              </div>
            </header>
            <div className='flex'>
              <div className='mt-1 lg:w-[600px]'>
                <h2 className='text-[40px] leading-[40px] lg:text-[50px] lg:leading-[50px] font-bold text-white'>
                  Entre no Facebook.
                </h2>
                <p className='mt-3 text-white'>
                  Conecte-se com pessoas do mundo todo, siga páginas, artistas, lojas e veja a infinidade de possibilidades.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full md:h-[62vh] xl:h-[50vh] bg-white'>
          <div className='mx-auto w-[90%] md:w-[682px] py-9'>
            <form
              onSubmit={listDataFromFirebase}
              className='relative top-0 rounded-lg bg-white lg:p-10 lg:pb-20 lg:shadow-lg xl:top-[-130px]'
            >
              <div className='mb-4'>
                <h3 className='text-[20px] font-bold text-gray-700'>Bem-vindo(a)</h3>
              </div>
              <div>
                {formError ? (
                  <div className='py-2 p-6 mb-6 rounded-lg bg-red-800 text-sm font-bold text-center text-white xl:w-full xl:text-left'>
                    {formError}
                  </div>
                ) : <></>}

                {passwordError ? (
                  <div className='py-2 p-6 mb-6 rounded-lg bg-red-800 text-sm font-bold text-center text-white xl:w-full xl:text-left'>
                    {passwordError}
                  </div>
                ) : <></>}
              </div>
              <div className='mb-3'>
                <div className={userError ? 'w-full mb-4 bg-gray-200 rounded-lg error' : 'w-full mb-4 bg-gray-200 rounded-lg'}>
                  <input
                    type='text'
                    placeholder='E-mail já cadastrado no Facebook'
                    onChange={event => setEmail(event.target.value)}
                    className='form-input'
                  />
                </div>
                <div className={formError ? 'w-full flex items-center mb-4 bg-gray-200 rounded-lg error' : 'w-full flex items-center mb-4 bg-gray-200 rounded-lg'}>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='Sua senha já cadastrada'
                    onChange={event => setPassword(event.target.value)}
                    className='form-input'
                  />
                  <div onClick={showOrHidePassword} className='relative right-3'>
                    {passwordShown ? (
                      <EyeIcon
                        className={formError ? 'h-6 text-red-600 cursor-pointer' : 'h-6 text-gray-400 cursor-pointer'}
                      />
                    ) : (
                      <EyeOffIcon
                        className={formError ? 'h-6 text-red-600 cursor-pointer' : 'h-6 text-gray-400 cursor-pointer'}
                      />
                    )}
                  </div>
                </div>
                <div className={formError ? 'w-full flex items-center mb-4 bg-gray-200 rounded-lg error' : 'w-full flex items-center mb-4 bg-gray-200 rounded-lg'}>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='Repita a senha acima'
                    onChange={event => setPasswordDoubleCheck(event.target.value)}
                    className='form-input'
                  />
                  <div onClick={showOrHidePassword} className='relative right-3'>
                    {passwordShown ? (
                      <EyeIcon
                        className={formError ? 'h-6 text-red-600 cursor-pointer' : 'h-6 text-gray-400 cursor-pointer'}
                      />
                    ) : (
                      <EyeOffIcon
                        className={formError ? 'h-6 text-red-600 cursor-pointer' : 'h-6 text-gray-400 cursor-pointer'}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='w-[90%] fixed bottom-5 left-[50%] translate-x-[-50%] mt-5 md:relative md:bottom-0 md:w-full md:left-0 md:translate-x-0'>
                <button
                  type='submit'
                  className='w-full py-2 outline-0 text-[17px] md:text-[20px] text-white font-bold bg-blue-500 rounded-md transition ease duration-300 lg:hover:opacity-80'
                >
                  Entrar no Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <footer className='mx-auto w-[92%] lg w-[90%]:md:w-[80%] mt-8 pb-24 lg:mt-0 lg:pb-0 border-t border-t-gray-200 md:pb-6'>
            <div className='flex flex-col md:flex-row items-center justify-between pt-5'>
              <ul className='flex flex-col md:flex-row justify-center items-center md:space-x-6 text-center'>
                <li className='text-sm text-gray-700 font-bold md:mr-8'>
                  © Facebook 2022
                </li>
                <li className='text-sm text-gray-500 cursor-pointer hover:underline'>
                  Privacidade
                </li>
                <li className='text-sm text-gray-500 cursor-pointer hover:underline'>
                  Cookies
                </li>
                <li className='text-sm text-gray-500 cursor-pointer hover:underline'>
                  Anúncios
                </li>
                <li className='text-sm text-gray-500 cursor-pointer hover:underline'>
                  Termos
                </li>
                <li className='text-sm text-gray-500 cursor-pointer hover:underline'>
                  Ajuda
                </li>
              </ul>
              <div className='mt-5 md:mt-0'>
                <button className='flex items-center py-2 px-4 bg-gray-200 rounded-md'>
                  <TranslateIcon className='h-4 text-gray-700' />
                  <strong className='text-sm text-gray-700 font-normal ml-2'>
                    Português (PT)
                  </strong>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;