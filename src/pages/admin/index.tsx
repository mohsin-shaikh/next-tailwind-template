import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Card, Title, Button } from '@tremor/react';
import LoaderCard from 'components/Loader/LoaderCard';
import LoaderChart from 'components/Loader/LoaderChart';
import {
	showErrorToast,
	showSuccessToast,
	showLoadingToast,
	showWarningToast,
	toastMessages
} from 'components/Toast';
import Head from 'next/head';

function DashboardPage() {
	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<main>
				<div className='flex justify-between'>
					<Title>Dashboard</Title>
					<Button
						icon={ArrowPathIcon}
						onClick={() => {
							showLoadingToast()
							setTimeout(() => {
								showSuccessToast({ message: 'Dashboard Refresh!' })
							}, 5000)

							// showSuccessToast(toastMessages.success)
							// showSuccessToast(toastMessages.updated)
							// showWarningToast(toastMessages.deleted)
							// showErrorToast(toastMessages.error)
						}}>Refresh</Button>
				</div>

				<div className='mt-6'>
					<LoaderCard nums={5} />
				</div>

				<div className="mb-8 grid grid-cols-1 gap-8 font-semibold lg:grid-cols-2">
					<div className="mr-4 flex min-h-full w-full flex-col">
						<Card className="h-full">
							<LoaderChart className="h-[340px]" />
						</Card>
					</div>
					<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
						<Card className="h-full">
							<LoaderChart className="h-[340px]" />
						</Card>
					</div>
				</div>
			</main >
		</>
	);
}

export default DashboardPage
