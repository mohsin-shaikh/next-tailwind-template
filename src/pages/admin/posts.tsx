import { useState } from 'react';
import Head from 'next/head';
import { Card, Title } from '@tremor/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { showErrorToast, showSuccessToast, toastMessages } from 'components/Toast';
import AddPost from 'components/Modal/AddPost';
import AddButton from 'components/Modal/AddButton';
import { shortcuts } from 'constants/Shortcuts';

const addShortcutKey = Object.values(shortcuts.posts.add.shortcut);

const PostsPage = () => {
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
        const isEditing = selected && selected.id;
        const url = `/api/posts${isEditing ? `/${selected.id}` : ''}`;
        const method = isEditing ? 'PATCH' : 'POST';
        let body = JSON.stringify({
            ...data,
            published: data.published === 'true' ? true : false,
            authorId: 'clhnncrgr0000vgkk2n0lamg2'
        });
        setLoading(true)
        try {
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || res.statusText);
            }

            if (isEditing) {
                showSuccessToast({ message: toastMessages.updated });
            } else {
                showSuccessToast({ message: toastMessages.success });
            }
        } catch (error) {
            showErrorToast({ message: error.message });
        } finally {
            // mutate(); // FIXME: IMP
            setLoading(false);
            onHide();
        }
    }

    return (
        <>
            <Head>
                <title>Posts</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <main>
                <div className='flex justify-between'>
                    <Title>Posts</Title>
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

                <AddPost
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

export default PostsPage
