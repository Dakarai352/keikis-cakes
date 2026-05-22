import type { HTMLAttributes } from 'react';

/**
 * Determines whether a hex color is "light" (luminance > 0.5).
 * Used to auto-derive readable text color for the button.
 */
function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  // sRGB relative luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4;
}

interface GradientButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  /**
   * The background color of the surface this button sits on.
   * The button's inner fill and text color are derived automatically:
   *   - Light surfaces (#FAF7F2) → dark text (#1C1008)
   *   - Dark surfaces (#1C1008)  → light text (#FAF7F2)
   *
   * This replaces the old pattern of hardcoding --color-background
   * per instance. Each page/section passes its own surface color.
   */
  bgColor?: string;
}

const CREAM = '#FAF7F2';
const ESPRESSO = '#1C1008';

const GradientButton = ({
  children,
  width = '600px',
  height = '100px',
  className = '',
  onClick,
  disabled = false,
  bgColor,
  ...props
}: GradientButtonProps) => {
  // Derive --color-background and --color-text from the bgColor prop.
  // Falls back to the old style-based overrides if bgColor is not provided
  // (backwards compatibility during migration).
  const resolvedBg = bgColor ?? CREAM;
  const resolvedText = isLightColor(resolvedBg) ? ESPRESSO : CREAM;

  const commonGradientStyles = `
    relative rounded-[50px] cursor-pointer
    after:content-[""] after:block after:absolute after:bg-[var(--color-background)]
    after:inset-[2px] after:rounded-[48px] after:z-[1]
    after:transition-opacity after:duration-300 after:ease-linear
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  // Merge the derived CSS custom properties with any additional styles.
  // The bgColor prop takes priority over legacy --color-background in style.
  const mergedStyle: React.CSSProperties = {
    '--r': '0deg',
    '--color-background': resolvedBg,
    '--color-text': resolvedText,
    width,
    height,
    ...props.style,
    // If bgColor was passed, ensure it overrides any leftover style overrides
    ...(bgColor ? { '--color-background': resolvedBg, '--color-text': resolvedText } : {}),
  } as React.CSSProperties;

  return (
    <div className="text-[#eee] text-center" style={{ display: 'inline-block' }}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`
          ${commonGradientStyles}
          rotatingGradient
          ${className}
        `}
        style={mergedStyle}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        {...props}
      >
        <span className="relative z-10 text-[var(--color-text)] flex items-center justify-center font-body text-xs md:text-sm uppercase tracking-[0.18em] font-medium">
          {children}
        </span>
      </div>
    </div>
  );
};

export default GradientButton;
