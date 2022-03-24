import { firebase } from '../../../services/firebase';
import SidebarItem from '../SidebarItem';
import { LogoutIcon } from '@heroicons/react/outline';
import {
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
  ShoppingCartIcon
} from '@heroicons/react/solid';

const Sidebar = () => {
  const signOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <div className='fixed left-3 top-18 xl:w-[250px]'>
      <SidebarItem Icon={UsersIcon} title='Amigos' />
      <SidebarItem Icon={UserGroupIcon} title='Grupos' />
      <SidebarItem Icon={ShoppingCartIcon} title='Marketplace' />
      <SidebarItem Icon={DesktopComputerIcon} title='Watch' />
      <SidebarItem Icon={CalendarIcon} title='Eventos' />
      <SidebarItem Icon={ClockIcon} title='Lembranças' />
      <button
        onClick={signOut}
        className='w-full outline-none'
      >
        <SidebarItem Icon={LogoutIcon} title='Sair' />
      </button>
    </div>
  );
}

export default Sidebar;