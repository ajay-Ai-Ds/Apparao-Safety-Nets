interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  alignment = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-foreground';
  const subtitleColor = light ? 'text-green-100/80' : 'text-muted-foreground';
  const badgeColor = light ? 'text-green-300' : 'text-primary-600';

  return (
    <div className={`${alignClass} mb-14`}>
      {badge && (
        <p
          className={`${badgeColor} font-semibold text-sm uppercase tracking-widest mb-3`}
        >
          {badge}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold ${titleColor} mb-4 font-heading`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${subtitleColor} max-w-2xl ${
            alignment === 'center' ? 'mx-auto' : ''
          } text-lg leading-relaxed`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
