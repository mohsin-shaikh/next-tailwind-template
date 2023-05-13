import { Card, Title, Text } from '@tremor/react';

export default function Example() {
	return (
		<main>
			<Title>Dashboard</Title>
			<Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

			{/* Main section */}
			<Card className="mt-6">
				<div className="h-96" />
			</Card>
		</main>
	);
}
