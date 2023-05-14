import { useEffect, useState } from 'react';
import { Button, TextInput, Toggle, ToggleItem } from '@tremor/react';
import useAutoFocus from 'hooks/useAutoFocus';
import Modal from '.';

const initialState = {
	title: '',
	published: 'false',
};

export default function AddPost({ show, selected, onHide, onSubmit, loading }) {
	const inputRef = useAutoFocus();
	const [state, setState] = useState(initialState);

	useEffect(() => setState(selected.id ? selected : initialState), [selected]);

	return (
		<Modal inputRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Post`} onHide={onHide}>
			<div className="sm:flex sm:items-start">
				<form
					className="md:[420px] grid w-full grid-cols-1 items-center gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit(state);
						if (!selected.id) setState({ ...initialState });
					}}
				>
					<label className="block">
						<span className="block text-sm font-medium text-zinc-800">Name</span>
						<TextInput
							type="text"
							placeholder="Name"
							required
							autoFocus
							maxLength={30}
							ref={inputRef}
							onChange={({ target }) => {
								const { value } = target;
								if (value.length) {
									setState({ ...state, title: value });
								} else {
									setState({ ...state, title: '' });
								}
							}}
							value={state.title}
						/>
					</label>

					<label className="block">
						<span className="block text-sm font-medium text-zinc-800">Publish</span>
						<Toggle
							color="zinc"
							defaultValue={state.published}
							onValueChange={(value) => setState({ ...state, published: value })}
						>
							<ToggleItem value="false" text="No" />
							<ToggleItem value="true" text="Yes" />
						</Toggle>
					</label>

					<Button type='submit' loading={loading}>{state.id ? 'Update' : 'Submit'}</Button>
				</form>
			</div>
		</Modal>
	);
}
