import { ReactNode, useCallback, useState } from 'react';

// import MenuIcon from 'components/Menu/MenuIcon';
import Sidebar from 'components/Sidebar';
import SidebarMobileButton from './SidebarMobileButton';

type LayoutProps = {
	className?: string;
	children: ReactNode;
}

export default function Layout({ className, children }: LayoutProps) {
	const [state, setState] = useState({ show: false, overrideClassname: '' });

	const onToggle = useCallback(
		(isOutsideMenu: boolean) => {
			setState({ show: !state.show, overrideClassname: isOutsideMenu && !state.show ? 'max-sm:flex' : '' });
		},
		[state]
	);

	const onHide = useCallback(() => setState({ ...state, show: false }), [state]);

	return (
		<main className={`relative flex min-h-full w-full bg-zinc-50 ${className}`}>
			<Sidebar
				show={state.show}
				overrideClassname={state.overrideClassname}
				onHide={onHide}
				onToggle={() => onToggle(true)}
				className="fixed bottom-0 left-0 top-0"
			/>
			<div className="ml-[64px] h-full w-full p-4 max-sm:ml-0">
				<SidebarMobileButton onShow={() => onToggle(true)} />
				{children}
			</div>
		</main>
	);
}
