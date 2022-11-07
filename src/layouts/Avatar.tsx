import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiOutlineUser } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { requestLogOut } from '../lib/api/auth';
import useAuthAction from '../hooks/useAuthAction';

type AvatarProps = {
  username: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Avatar = ({ username }: AvatarProps) => {
  const { signOut } = useAuthAction();
  const navigate = useNavigate();
  const SignOutClickHandler = () => {
    signOut();
    requestLogOut().then(() => {
      navigate('/');
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="ring-gray focus:ring-blue-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-sm font-medium shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-[0.5px] focus:ring-offset-2 focus:ring-offset-gray-100">
          <HiOutlineUser color="white" size={25} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <p className="mx-4 border-b-2 py-2 text-right text-sm">
              hello, <span className="font-medium">{username}</span>
            </p>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Home
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={SignOutClickHandler}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Avatar;
