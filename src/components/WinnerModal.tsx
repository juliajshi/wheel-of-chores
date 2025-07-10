import { Winner } from '@/types';

export default function WinnerModal({
  winner,
  onClose,
  onDelete,
}: {
  winner: Winner;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-opacity-10 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md text-center space-y-4'>
        <h2 className='text-xl font-bold'>🎉 Winner!</h2>
        <p className='text-lg'>{winner.label}</p>
        <button
          onClick={onDelete}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Remove Winner
        </button>
        <button
          onClick={onClose}
          className='ml-2 text-sm text-gray-600 underline'
        >
          Close
        </button>
      </div>
    </div>
  );
}
