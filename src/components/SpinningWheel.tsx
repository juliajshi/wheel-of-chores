import { Segment } from '@/types';

export default function SpinningWheel({
  segments,
  rotation,
}: {
  segments: Segment[];
  rotation: number;
}) {
  const anglePerSegment = 360 / (segments.length || 1);

  return (
    <div
      className='w-128 h-128 rounded-full border-8 border-blue-500 transition-transform duration-[3000ms] ease-out relative'
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className='absolute inset-0 w-full h-full rounded-full'
        style={{
          background: `conic-gradient(from -90deg, ${segments
            .map(
              (segment, i) =>
                `${segment.color} ${i * anglePerSegment}deg ${
                  (i + 1) * anglePerSegment
                }deg`
            )
            .join(', ')})`,
        }}
      />

      {segments.map((segment, i) => (
        <div
          key={i}
          className='absolute top-1/2 left-1/2 origin-left text-black font-semibold'
          style={{
            transform: `rotate(${
              i * anglePerSegment + anglePerSegment / 2
            }deg)`,
            height: '2px',
          }}
        >
          <div
            className='w-64 text-center flex items-center justify-end'
            style={{
              transform: 'rotate(90deg) translateX(-50%)',
              transformOrigin: 'left',
            }}
          >
            {segment.label}
          </div>
        </div>
      ))}
    </div>
  );
}
