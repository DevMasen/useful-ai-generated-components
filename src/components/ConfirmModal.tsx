import React, { useEffect } from 'react';

export interface ConfirmModalProps {
	/** Controls whether the dialog is visible */
	isOpen: boolean;
	/** Dialog heading/title */
	title?: string;
	/** The question or message to display (with a fallback placeholder) */
	question?: string;
	/** Text for the confirm button (default: "Yes") */
	confirmText?: string;
	/** Text for the cancel button (default: "Cancel") */
	cancelText?: string;
	/** If true, makes the confirm button red for destructive actions */
	isDestructive?: boolean;
	/** Callback fired when the user confirms */
	onConfirm: () => void;
	/** Callback fired when the user cancels or closes the dialog */
	onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	title = 'Confirmation',
	question = 'Are you sure you want to proceed?',
	confirmText = 'Yes',
	cancelText = 'Cancel',
	isDestructive = false,
	onConfirm,
	onCancel,
}) => {
	// Close modal when pressing the "Escape" key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onCancel();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onCancel]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirm-modal-title"
		>
			{/* Backdrop overlay */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
				onClick={onCancel}
				aria-hidden="true"
			/>

			{/* Modal Box */}
			<div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-left shadow-2xl transition-all dark:bg-zinc-900">
				{/* Title */}
				<h3
					id="confirm-modal-title"
					className="text-lg leading-6 font-semibold text-zinc-900 dark:text-zinc-100"
				>
					{title}
				</h3>

				{/* Question / Message Placeholder */}
				<div className="mt-3">
					<p className="text-sm text-zinc-600 dark:text-zinc-400">{question}</p>
				</div>

				{/* Action Buttons */}
				<div className="mt-6 flex justify-end gap-3">
					<button
						type="button"
						onClick={onCancel}
						className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
					>
						{cancelText}
					</button>

					<button
						type="button"
						onClick={onConfirm}
						className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-zinc-900 ${
							isDestructive
								? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
								: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
						}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};
