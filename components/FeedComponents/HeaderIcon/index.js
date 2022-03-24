const HeaderIcon = ({
  Icon,
  active,
  flag,
  flagValue
}) => {
  return (
    <div className={`relative flex items-center mr-1 cursor-pointer w-[50px] h-8 md:w-auto md:px-8 sm:h-14 md:hover:bg-gray-200 rounded-xl border-2 border-transparent md:active:border-blue-500 group ${active && 'rounded-none border-b-4 border-b-blue-500 md:hover:bg-white'}`}>
      <Icon className={`h-5 text-center text-gray-500 sm:group-hover:text-blue-500 sm:h-7 mx-auto ${active && 'text-blue-500'}`} />
      {flag && (
        <div className='absolute top-[-3px] right-[-3px] flex justify-center items-center w-[22px] h-[17px] bg-red-500 text-[9px] text-white rounded-lg md:top-[8px] md:right-[12px] md:w-[25px] md:h-[20px]'>
          {flagValue}+
        </div>
      )}
    </div>
  );
}

export default HeaderIcon;