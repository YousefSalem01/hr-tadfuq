import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Bell, User, ChevronDown, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { mockNotifications } from '../../data/mock';

const Header = () => {
  const navigate = useNavigate();

  const unreadCount = useMemo(
    () => mockNotifications.filter((n) => !n.isRead).length,
    []
  );

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none "
                aria-label="Notifications"
              >
                <Bell className="text-primary" size={20} />
                {unreadCount > 0 ? (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                ) : null}
              </Popover.Button>

              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95 -translate-y-1"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-120"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 -translate-y-1"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50 origin-top-right focus:outline-none">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-900">Notifications</div>
                    {unreadCount > 0 ? (
                      <div className="text-xs text-gray-500">{unreadCount} unread</div>
                    ) : (
                      <div className="text-xs text-gray-500">All caught up</div>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-gray-500 text-center">No notifications</div>
                    ) : (
                      mockNotifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            n.isRead ? '' : 'bg-gray-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{n.title}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{n.message}</div>
                              <div className="text-[11px] text-gray-400 mt-1">{n.createdAt}</div>
                            </div>
                            {!n.isRead ? (
                              <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            ) : null}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors focus:outline-none ">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">Mohamed Ali</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95 -translate-y-1"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-120"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 -translate-y-1"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50 origin-top-right focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-2 transition-colors ${
                          active ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => navigate('/settings')}
                      >
                        <SettingsIcon size={16} className="text-gray-500" />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`w-full px-4 py-3 text-sm text-red-600 flex items-center gap-2 transition-colors ${
                          active ? 'bg-red-50' : ''
                        }`}
                        onClick={() => navigate('/login')}
                      >
                        <LogOut size={16} className="text-red-500" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
};

export default Header;

