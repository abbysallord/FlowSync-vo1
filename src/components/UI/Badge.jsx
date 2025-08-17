// src/components/UI/Badge.jsx
import './Badge.css';

function Badge({ text, variant = 'default', size = 'md' }) {
  const className = `badge badge--${variant} badge--${size}`;
  
  return (
    <span className={className}>
      {text}
    </span>
  );
}

export default Badge;