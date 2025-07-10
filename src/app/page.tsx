'use client';

import { useState, useEffect } from 'react';
import SpinningWheel from '@/components/SpinningWheel';
import WinnerModal from '@/components/WinnerModal';
import { Segment, Winner } from '@/types';

const LOCAL_STORAGE_KEY = 'spinningWheelSegments';
const SPIN_DURATION = 3000;

const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [newLabel, setNewLabel] = useState('0');
  const [segments, setSegments] = useState<Segment[]>([]);
  const [winner, setWinner] = useState<Winner | null>(null);

  // Load saved segments
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setSegments(JSON.parse(saved));
      } catch {
        setSegments([]);
      }
    }
  }, []);

  // Save segments on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(segments));
  }, [segments]);

  const spin = () => {
    if (spinning || segments.length === 0) return;

    setSpinning(true);
    setWinner(null);

    const extraSpin = Math.floor(Math.random() * 1080) + 1080;
    const newRotation = rotation + extraSpin;

    setRotation(newRotation);

    setTimeout(() => {
      const normalized = newRotation % 360;
      const anglePerSegment = 360 / segments.length;
      const index = Math.floor(((360 - normalized) % 360) / anglePerSegment);
      setWinner({ label: segments[index].label, index });
      setSpinning(false);
    }, SPIN_DURATION);
  };

  const addSegment = () => {
    if (newLabel.trim()) {
      const newSegment = {
        label: newLabel.trim(),
        color: randomColor(),
      };
      setSegments([...segments, newSegment]);
      setNewLabel('');
    }
  };

  const deleteWinner = () => {
    if (winner) {
      const updated = [...segments];
      updated.splice(winner.index, 1);
      setSegments(updated);
      setWinner(null);
    }
  };

  const deleteAllSegments = () => {
    setSegments([]);
    setWinner(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='absolute top-[calc(50%-256px)] z-10'>
        <div className='w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-black' />
      </div>

      <div className='relative'>
        <SpinningWheel segments={segments} rotation={rotation} />

        <button
          onClick={spin}
          disabled={spinning}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-full shadow-md hover:bg-red-600 transition'
        >
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>

      <div className='flex space-x-2'>
        <input
          type='text'
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder='New segment label'
          className='px-3 py-2 border rounded w-48'
        />
        <button
          onClick={addSegment}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Add Segment
        </button>
      </div>

      <button
        onClick={deleteAllSegments}
        className='text-sm text-red-600 underline'
      >
        Delete All Segments
      </button>

      {winner && (
        <WinnerModal
          winner={winner}
          onClose={() => setWinner(null)}
          onDelete={deleteWinner}
        />
      )}
    </div>
  );
}
