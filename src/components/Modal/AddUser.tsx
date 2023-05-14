import { useEffect, useMemo, useState } from 'react';
import { Button, TextInput } from '@tremor/react';
import useAutoFocus from 'hooks/useAutoFocus';
import Modal from '.';

const initialState = {
	name: '',
};

export default function AddUser({ show, selected, onHide, onSubmit, loading }) {
	const inputRef = useAutoFocus();
	const [state, setState] = useState(initialState);

	useEffect(() => setState(selected.id ? selected : initialState), [selected]);

	return (
		<Modal inputRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} User`} onHide={onHide}>
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
									setState({ ...state, name: value });
								} else {
									setState({ ...state, name: '' });
								}
							}}
							value={state.name}
						/>
					</label>

					<Button type='submit' loading={loading}>{state.id ? 'Update' : 'Submit'}</Button>
				</form>
			</div>
		</Modal>
	);
}
