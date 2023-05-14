import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	ArrowLeftOnRectangleIcon,
	Bars3Icon,
	ChartPieIcon,
	Cog6ToothIcon,
	UsersIcon,
	XMarkIcon
} from '@heroicons/react/24/solid';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { shortcuts } from 'constants/Shortcuts';
import TooltipText from 'components/TooltipText';
import { signOut, useSession } from 'next-auth/react';

const { sidebar } = shortcuts;
const sidebarShortcutsList = Object.values(sidebar).map((_) => _.shortcut);

const topLinks = [
	{
		link: '/admin',
		activePath: '/admin',
		description: 'Dashboard page',
		name: 'Dashboard',
		Icon: ChartPieIcon,
		shortcutText: sidebar.dashboard.shortcut,
	},
	{
		link: '/admin/users',
		activePath: '/admin/users',
		description: 'Users Page',
		name: 'Users',
		Icon: UsersIcon,
		shortcutText: sidebar.users.shortcut,
	},
];

const bottomLinks = [
	{
		link: '/admin/settings',
		activePath: '/admin/settings',
		description: 'Settings page',
		name: 'Settings',
		Icon: Cog6ToothIcon,
		shortcutText: sidebar.settings.shortcut,
	},
];

type SidebarProps = {
	className: string;
	overrideClassname: string;
	onHide: () => void;
	show: boolean;
	onToggle: () => void;
}

const Sidebar = ({ className, overrideClassname, onHide, show, onToggle }: SidebarProps) => {
	const router = useRouter();
	const { data: session } = useSession()
	console.log({ session })

	useHotkeys(sidebarShortcutsList, (_, handler) => {
		// @ts-expect-error
		const keys = handler.keys.join('');
		if (keys === sidebar.dashboard.shortcut) router.push('/admin/dashboard');
		if (keys === sidebar.users.shortcut) router.push('/admin/users');
		if (keys === sidebar.settings.shortcut) router.push('/admin/settings');
	});

	return (
		<nav
			className={`z-[1] flex min-h-full flex-col bg-zinc-900 pb-2 pl-3 pr-3 pt-2 ${overrideClassname && show ? '' : 'max-sm:hidden'
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
									className={`ml-[-10px] mt-[-3px] items-center text-xl font-black text-slate-100 hover:opacity-80 ${show ? 'flex' : 'hidden'
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
					<div className="mb-2 mt-2 flex w-full flex-col items-center border-t border-zinc-800"></div>
					{topLinks.map((linkItem) => (
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
											<linkItem.Icon className="h-4 w-4" />
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
					{bottomLinks.map((linkItem) => (
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
											<linkItem.Icon className="h-4 w-4" />
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
					<button
						className={`mt-2 flex h-[40px] w-full items-center rounded-lg p-2 text-base tracking-wide text-white hover:bg-zinc-800 ${show ? '' : 'justify-center'
							}`}
						onClick={() => signOut()}
						title={'Sign out'}
					>
						<div className="flex items-center">
							<ArrowLeftOnRectangleIcon className="h-4 w-4" />
							<span className={`ml-2 ${show ? 'visible' : 'hidden'}`}>Sign out</span>
						</div>
					</button>
				</div>
			</aside>
			{show ? (
				<div className="z-9 fixed inset-0 transition-opacity" onClick={() => onToggle()}>
					<div tabIndex={0} className="absolute inset-0 bg-zinc-900 opacity-50"></div>
				</div>
			) : null}
		</nav>
	);
};

export default Sidebar;
