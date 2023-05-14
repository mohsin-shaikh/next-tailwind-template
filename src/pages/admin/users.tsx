import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Card, Title } from '@tremor/react';
import Head from 'next/head';

const UsersPage = () => {
	return (
		<>
			<Head>
				<title>Users</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<main>
				<div className='flex justify-between'>
					<Title>Users</Title>
					<Button icon={PlusIcon}>Create</Button>
				</div>
				{/* Main section */}
				<Card className="mt-6">
					<div className="h-96" />
				</Card>
			</main>
		</>
	);
}

export default UsersPage
