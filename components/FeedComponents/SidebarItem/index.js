const SidebarItem = ({ Icon, title }) => {
  return (
    <div>
      {Icon && (
        <div className='flex items-center space-x-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-gray-200'>
          <Icon className='w-8 h-8 text-blue-500' />
          <p className='hidden lg:inline-flex font-medium'>{title}</p>
        </div>
      )}
    </div>
  );
}

export default SidebarItem;