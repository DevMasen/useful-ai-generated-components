import { useState } from 'react';
import { ConfirmModal } from './components/ConfirmModal';

export default function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleConfirm = () => {
		console.log('User clicked Yes');
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		console.log('User cancelled');
		setIsModalOpen(false);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 dark:bg-zinc-950">
			<button
				onClick={() => setIsModalOpen(true)}
				className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
			>
				Open Confirmation
			</button>

			<ConfirmModal
				isOpen={isModalOpen}
				title="Delete Item"
				question="Are you sure you want to delete this item? This action cannot be undone."
				confirmText="Yes, Delete"
				cancelText="Cancel"
				isDestructive={true}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</div>
	);
}
