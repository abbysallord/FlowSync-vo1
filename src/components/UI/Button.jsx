// src/components/UI/Button.jsx
import './Button.css';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  
  const className = [
    baseClass,
    variantClass,
    sizeClass,
    disabled && 'btn--disabled'
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;