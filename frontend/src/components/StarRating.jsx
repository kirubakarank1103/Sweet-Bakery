// ─── Star Rating ─────────────────────────────────────────────────
import { useState } from 'react';
import { FiStar } from 'react-icons/fi';

export default function StarRating({ value = 0, onChange, readonly = false, size = 20 }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div style={{ display: 'inline-flex', gap: '0.2rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={size}
          onClick={!readonly ? () => onChange?.(star) : undefined}
          onMouseEnter={!readonly ? () => setHover(star) : undefined}
          onMouseLeave={!readonly ? () => setHover(0)   : undefined}
          style={{
            color:  star <= active ? '#d4a24c' : '#2a2a2a',
            fill:   star <= active ? '#d4a24c' : 'transparent',
            cursor: readonly ? 'default' : 'pointer',
            transition: 'color 0.15s, fill 0.15s',
            transform: !readonly && star <= hover ? 'scale(1.2)' : 'scale(1)',
            transition: 'all 0.15s',
          }}
        />
      ))}
    </div>
  );
}