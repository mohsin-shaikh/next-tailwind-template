import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRightOnRectangleIcon, Bars3Icon, ChartPieIcon, XMarkIcon } from '@heroicons/react/24/solid'
import * as Tooltip from '@radix-ui/react-tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { shortcuts } from 'constants/Shortcuts';
import TooltipText from 'components/TooltipText';

const { sidebar } = shortcuts;
const sidebarShortcutsList = Object.values(sidebar).map((_) => _.shortcut);

const links = [
    {
        link: '/admin/dashboard',
        activePath: '/admin/dashboard',
        description: 'Overview page for all expenses',
        name: 'Overview',
        Icon: ChartPieIcon,
        shortcutText: sidebar.dashboard.shortcut,
    },
    {
        link: '/admin/users',
        activePath: '/admin/users',
        description: 'Overview page for all expenses',
        name: 'Ride',
        Icon: ChartPieIcon,
        shortcutText: sidebar.users.shortcut,
    },
]

const Sidebar = ({ className, overrideClassname, onHide, show, onToggle }) => {
    const router = useRouter();

    useHotkeys(sidebarShortcutsList, (_, handler) => {
        const keys = handler.keys.join('');
        if (keys === sidebar.dashboard.shortcut) router.push('/admin/dashboard');
        if (keys === sidebar.users.shortcut) router.push('/admin/users');
    });

    return (
        <nav
            className={`z-[1] flex min-h-full flex-col bg-zinc-900 pl-3 pr-3 pt-2 pb-2 ${overrideClassname && show ? '' : 'max-sm:hidden'
                } ${className} transition-all ${show ? 'w-[280px] ' + overrideClassname : 'w-[64px]'}`}
        >
            <aside className={`z-[10] mb-[10px] flex h-full w-[100%] flex-col justify-between ${show ? 'xs:w-[260px]' : ''}`}>
                <div>
                    <div className="mt-1 flex items-center justify-between">
                        <div onClick={onHide}>
                            <Link
                                href="/"
                                className={`flex h-[40px] items-center rounded-lg p-3 pr-0 text-base tracking-wide text-gray-700 ${show ? '' : 'hidden'
                                    }`}
                            >
                                <h1
                                    className={`mt-[-3px] ml-[-10px] items-center text-xl font-black text-slate-100 hover:opacity-80 ${show ? 'flex' : 'hidden'
                                        }`}
                                >
                                    Logo
                                </h1>
                            </Link>
                        </div>
                        <button
                            onClick={onToggle}
                            className={`relative ml-[4px] h-[40px] w-[40px] items-center rounded-lg p-2 text-sm text-gray-500 transition-all hover:bg-zinc-800 focus:outline-none focus:ring-gray-100 xs:inline-flex sm:inline-flex md:inline-flex ${!show ? 'left-[-3px]' : 'left-[-1px]'
                                }`}
                        >
                            {show ? (
                                <XMarkIcon title="Close menu" className="h-6 w-6 text-white" />
                            ) : (
                                <Bars3Icon title="Open menu" className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>
                    <div className="mt-2 mb-2 flex w-full flex-col items-center border-t border-zinc-800"></div>
                    {links.map((linkItem) => (
                        <span key={linkItem.name} onClick={onHide}>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <Link
                                        title={linkItem.name}
                                        href={linkItem.link}
                                        className={`mt-2 flex h-[40px] items-center rounded-lg p-2 text-base tracking-wide text-white transition-all hover:bg-zinc-800 ${router.pathname === linkItem.activePath ? 'bg-zinc-800' : ''
                                            } ${show ? 'w-[100%]' : ' w-[40px] justify-center'}`}
                                    >
                                        <span className="flex items-center">
                                            <linkItem.Icon className='w-4 h-4' />
                                            <span className={`ml-2 ${show ? 'visible' : 'hidden'}`}>{linkItem.name}</span>
                                        </span>
                                    </Link>
                                </Tooltip.Trigger>
                                <Tooltip.Content hideWhenDetached side="right" className="TooltipContent">
                                    <TooltipText
                                        className={`ml-4 ${show ? 'xs:hidden' : 'xs:block'}`}
                                        text={`${linkItem.name}`}
                                        shortcut={linkItem.shortcutText}
                                    />
                                </Tooltip.Content>
                            </Tooltip.Root>
                        </span>
                    ))}
                </div>
                <div>
                    <button
                        className={`mt-2 flex h-[40px] w-full items-center rounded-lg p-2 text-base tracking-wide text-white hover:bg-zinc-800 ${show ? '' : 'justify-center'
                            }`}
                        // onClick={signOut}
                        title={'Sign out'}
                    >
                        <div className="flex items-center">
                            <ArrowRightOnRectangleIcon className='w-4 h-4' />
                            <span className={`ml-2 ${show ? 'visible' : 'hidden'}`}>Sign out</span>
                        </div>
                    </button>
                </div>
            </aside>
            {
                show ? (
                    <div className="z-9 fixed inset-0 transition-opacity" onClick={() => onToggle()}>
                        <div tabIndex={0} className="absolute inset-0 bg-zinc-900 opacity-50"></div>
                    </div>
                ) : null
            }
        </nav>
    )
}

export default Sidebar