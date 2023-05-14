import { useState } from 'react';
import Head from 'next/head';
import { Card, Title } from '@tremor/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { showSuccessToast, toastMessages } from 'components/Toast';
import AddUser from 'components/Modal/AddUser';
import AddButton from 'components/Modal/AddButton';
import { shortcuts } from 'constants/Shortcuts';

const addShortcutKey = Object.values(shortcuts.users.add.shortcut);

const UsersPage = () => {
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState(false)
	const [selected, setSelected] = useState({})
	useHotkeys(addShortcutKey, () => setShow(true));

	const onHide = () => setShow(false)
	const onEdit = (selected) => {
		setShow(true);
		setSelected(selected);
	}

	const onSubmit = async (data) => {
		setLoading(true)
		console.log({ data })
		showSuccessToast({ message: toastMessages.success })
		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Users</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<main>
				<div className='flex justify-between'>
					<Title>Users</Title>
					<AddButton
						onClick={() => {
							if (selected?.id) setSelected({});
							setShow(true);
						}}
					/>
				</div>
				{/* Main section */}
				<Card className="mt-6">
					<div className="h-96" />
				</Card>

				<AddUser
					onHide={onHide}
					onSubmit={onSubmit}
					loading={loading}
					selected={selected}
					show={show}
				/>
			</main>
		</>
	);
}

export default UsersPage
