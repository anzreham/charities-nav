import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as ImIcons from 'react-icons/im';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Location',
    path: '/Charitylocation',
    icon: <ImIcons.ImLocation />,
    cName: 'nav-text'
  },

  {
    title: 'Detiels',
    path: '/charity-detail',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Activities',
    path: '/CharityActivities',
    icon: <FaIcons.FaTasks />,
    cName: 'nav-text'
  },
  {
    title: 'News',
    path: '/CharityNews',
    icon: <FaIcons.FaNewspaper />,
    cName: 'nav-text'
  },

  {
    title: 'Log Out',
    path: '/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];