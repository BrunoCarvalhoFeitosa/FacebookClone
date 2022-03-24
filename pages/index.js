import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { firebase, database } from '../services/firebase';
import * as yup from 'yup';
import {
  DotsHorizontalIcon,
  FingerPrintIcon,
  PlusIcon,
  TranslateIcon,
  XIcon,
  EyeIcon,
  EyeOffIcon,
  FolderOpenIcon,
  TrashIcon
} from '@heroicons/react/solid'

const HomePage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [imageProfile, setImageProfile] = useState(null);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState('');
  const filePicker = useRef(null);
  const router = useRouter();

  const showOrHidePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const createAuthentication = async () => {
    try {
      const userResponse = await firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );

      setUser(userResponse.user.email);
    } catch (error) {
      console.error('Error to register Firebase user', error);
    }
  };

  const addUserImage = (event) => {
    event.preventDefault();

    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageProfile(readerEvent.target.result);
    };
  };

  const removeUserImage = () => {
    setImageProfile(null);
  };

  const saveDataOnFirebase = async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
      gender,
      imageProfile
    };

    const userSchema = yup.object().shape({
      name: yup
        .string()
        .matches(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/, 'Seu NOME não deve conter espaçamentos excessivos e nem valores númericos.')
        .min(10, 'Insira corretamente seu NOME COMPLETO, ele será visível à todos da rede.')
        .max(100)
        .required('Para poder prosseguir, preencha o campo NOME, ele está vazio no momento.'),
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
    });

    userSchema.validate(
      data,
      { abortEarly: false }
    ).then((response) => {
      const ref = database.ref('user');

      createAuthentication();

      ref.push(data);

      setTimeout(() => {
        setSuccess(true);
        setFormError('');
        setImageProfile(null);
        event.target.reset();
      }, 1600);
    }).catch((error) => {
      error.inner.map(errors => {
        const validationMessage = errors.message;
        setFormError(validationMessage);
      });
    });
  };

  const removeSuccessPopUp = (event) => {
    event.preventDefault();
    setSuccess(false);
  };

  return (
    <div className='w-full h-full'>
      <Head>
        <title>Cadastre-se no Facebook</title>
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
              <div className='lg:w-[600px]'>
                <h2 className='text-[40px] leading-[40px] lg:text-[50px] lg:leading-[50px] font-bold text-white'>
                  Conecte-se, compartilhe e reaja com pessoas na sua vida.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full xl:h-[50vh] bg-white'>
          <div className='mx-auto w-[90%] md:w-[80%] py-9'>
            <div>
              <h3 className='text-gray-500 text-lg font-semibold'>Entrar como...</h3>
            </div>
            <div className='mt-2'>
              <ul className='flex items-center py-2 cursor-pointer space-x-6 overflow-x-auto md:overflow-x-clip lg:w-max'>
                <li className='w-[180px] h-[240px] py-4 px-6 flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-lg hover:shadow-2xl'>
                  <div className='rounded-full'>
                    <Image
                      src='/image-profile-01.jpg'
                      width={140}
                      height={140}
                      layout='fixed'
                      objectFit='cover'
                      className='rounded-full'
                      alt='Imagem de perfil de usuário'
                    />
                  </div>
                  <div className='mt-3 text-center'>
                    <h4 className='text-md font-semibold text-600'>Alex Holman</h4>
                    <h5 className='text-sm text-gray-400'>Ativo 2 dias atrás</h5>
                  </div>
                </li>
                <li className='w-[180px] h-[240px] py-4 px-6 flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-lg hover:shadow-2xl'>
                  <div className='rounded-full'>
                    <Image
                      src='/image-profile-02.jpg'
                      width={140}
                      height={140}
                      layout='fixed'
                      objectFit='cover'
                      className='rounded-full'
                      alt='Imagem de perfil de usuário'
                    />
                  </div>
                  <div className='mt-3 text-center'>
                    <h4 className='text-md font-semibold text-600'>Irene Holman</h4>
                    <h5 className='text-sm text-gray-400'>Ativo 5 dias atrás</h5>
                  </div>
                </li>
                <li className='w-[180px] h-[240px] py-4 px-6 flex flex-col justify-center items-center bg-blue-100 border border-gray-200 shadow-xl rounded-lg hover:shadow-2xl whitespace-nowrap'>
                  <div>
                    <PlusIcon className='h-12 text-blue-500' />
                  </div>
                  <div className='mt-2'>
                    <h4 className='text-blue-500 font-semibold'>Adicionar conta</h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='relative xl:fixed xl:top-[2%] xl:transform xl:translate-y[-50%] xl:right-[190px] overflow-y-auto'>
          <div className='mb-3 w-[90%] mx-auto md:w-[80%] xl:w-full xl:mb-8 xl:h-[40px]'>
            {success === true ? (
              <div className='flex justify-between items-center bg-blue-600 rounded-lg py-2 px-5 font-bold text-white outline-none'>
                <div className='flex items-center space-x-2'>
                  <span><FingerPrintIcon className='h-5' /></span>
                  <span>Email {user} foi cadastrado com sucesso.</span>
                </div>
                <div className='flex items-center'>
                  <button onClick={removeSuccessPopUp}>
                    <XIcon className='h-5' />
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {formError && (
              <div className='py-2 p-6 rounded-lg bg-red-800 text-sm font-bold text-center text-white xl:w-full xl:text-left'>
                {formError}
              </div>
            )}
          </div>
          <div className='pb-10 mx-auto w-[90%] md:w-[80%] xl:py-6 rounded-md xl:shadow-lg bg-white xl:w-[600px] xl:p-10 lg:h-[76vh] scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            <div className='mb-3'>
              <h2 className='text-[28px] text-gray-700 font-bold'>
                Crie uma nova conta
              </h2>
              <p className='text-md text-gray-500'>
                Junte-se ao Facebook e conecte-se com mais de 2.4 bilhões de usuários ao redor do mundo.
              </p>
            </div>
            <div className='mt-6'>
              <form onSubmit={saveDataOnFirebase}>
                <div className='mb-3'>
                  <div className='w-full mb-4 bg-gray-200 rounded-lg'>
                    <input
                      type='text'
                      placeholder='Nome completo'
                      className='form-input'
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                  <div className='w-full mb-4 bg-gray-200 rounded-lg'>
                    <input
                      type='text'
                      placeholder='E-mail válido'
                      className='form-input'
                      onChange={event => setEmail(event.target.value)}
                    />
                  </div>
                  <div className='w-full flex items-center bg-gray-200 rounded-lg'>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      placeholder='Sua senha, exemplo: @Qwerty9'
                      className='form-input'
                      onChange={event => setPassword(event.target.value)}
                    />
                    <div onClick={showOrHidePassword} className='relative right-3'>
                      {passwordShown ? (
                        <EyeIcon
                          className='h-6 text-gray-400 cursor-pointer'
                        />
                      ) : (
                        <EyeOffIcon
                          className='h-6 text-gray-400 cursor-pointer'
                        />
                      )}
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div className='relative w-full flex items-center bg-gray-200 rounded-lg'>
                      <button
                        type='button'
                        onClick={() => filePicker.current.click()}
                        className='flex items-center form-input'
                      >
                        <h4 className='text-gray-400'>Escolha sua foto de perfil</h4>
                        <FolderOpenIcon className='absolute right-1 h-7 mr-1 text-gray-400' />
                      </button>
                    </div>
                    <div>
                      <input
                        type='file'
                        ref={filePicker}
                        onChange={addUserImage}
                        hidden
                      />
                    </div>
                  </div>
                  <div className='w-full mt-5'>
                    {imageProfile && (
                      <div className='relative'>
                        <div className='absolute top-2 right-2'>
                          <TrashIcon
                            onClick={removeUserImage}
                            className='h-6 text-white cursor-pointer'
                          />
                        </div>
                        <div className='w-full'>
                          <img
                            src={imageProfile}
                            alt={name}
                            title={name}
                            className='w-full lg:h-[250px] object-cover'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-2 mb-5'>
                  <h4 className='font-bold text-gray-800'>Gênero</h4>
                  <div className='flex justify-start items-start md:justify-between flex-col md:flex-row md:items-center'>
                    <div>
                      <input
                        type='radio'
                        name='form-field'
                        id='male'
                        value='Masculino'
                        checked={gender === 'Masculino'}
                        onChange={(event) => {setGender(event.target.value)}}
                        className='mr-2 cursor-pointer'
                      />
                      <label htmlFor='male' className='font-bold text-gray-800 cursor-pointer'>Masculino</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        name='form-field'
                        id='female'
                        value='Feminino'
                        checked={gender === 'Feminino'}
                        onChange={(event) => {setGender(event.target.value)}}
                        className='mr-2 cursor-pointer'
                      />
                      <label htmlFor='female' className='font-bold text-gray-800 cursor-pointer'>Feminino</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        name='form-field'
                        id='notSay'
                        value='Prefiro não dizer'
                        checked={gender === 'Prefiro não dizer'}
                        onChange={(event) => {setGender(event.target.value)}}
                        className='mr-2 cursor-pointer'
                      />
                      <label htmlFor='notSay' className='font-bold text-gray-800 cursor-pointer'>Prefiro não dizer</label>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Para criar sua conta do Facebook, você concorda com nossos <strong className='font-normal text-blue-500 cursor-pointer'>Termos</strong> e <strong className='font-normal text-blue-500 cursor-pointer'>Política de Privacidade</strong>. Você poderá receber notificações de SMS a qualquer instante.</p>
                </div>
                <div className='w-[90%] fixed bottom-5 left-[50%] translate-x-[-50%] mt-5 md:relative md:bottom-0 md:w-full md:left-0 md:translate-x-0'>
                  <button
                    type='submit'
                    className='w-full py-2 text-[17px] md:text-[20px] text-white font-bold bg-blue-500 rounded-md transition ease duration-300 lg:hover:opacity-80'
                  >
                    Criar sua conta do Facebook
                  </button>
                </div>
                <div>
                  <div className='hidden md:flex justify-center my-2'>
                    <strong className='text-center'>ou</strong>
                  </div>
                  <div>
                  <button
                    type='button'
                    onClick={() => router.push('/sign-in')}
                    className='w-full py-2 mt-5 text-[16px] md:text-[20px] text-blue-500 font-bold bg-white border-2 border-blue-500 rounded-md transition ease duration-300 hover:bg-blue-500 md:mt-0 lg:hover:text-white'
                  >
                    Já tenho conta, fazer login
                  </button>
                  </div>
                </div>
              </form>
            </div>
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

export default HomePage;