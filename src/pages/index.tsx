import Link from 'next/link'
import { Button } from "@tremor/react"
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
	return (
		<div className='container mx-auto'>
			<h1>Home Page</h1>
			<Link href={'/admin'}>
				<Button
					variant={'light'}
					icon={ArrowRightIcon}
					iconPosition={'right'}
				>Admin</Button>
			</Link>
		</div>
	)
}

export default HomePage
