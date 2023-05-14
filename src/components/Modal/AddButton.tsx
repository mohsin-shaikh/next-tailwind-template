import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from '@tremor/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import TooltipText from 'components/TooltipText';

export default function AddButton({ onClick }) {
	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<Button
					icon={PlusIcon}
					onClick={onClick}
				>
					Create
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content hideWhenDetached side="left" className="TooltipContent z-10">
				<TooltipText className="mr-2" text="Open Add Form" shortcut={'a'} />
			</Tooltip.Content>
		</Tooltip.Root>
	)
}
