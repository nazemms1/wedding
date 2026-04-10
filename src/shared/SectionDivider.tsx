interface SectionDividerProps {
  fromColor?: string
  toColor?: string
  height?: number
}

export function SectionDivider({
  fromColor = 'rgba(5,14,31,0)',
  toColor = 'rgba(5,14,31,0)',
  height = 120,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        height,
        marginTop: -height / 2,
        marginBottom: -height / 2,
        background: `linear-gradient(to bottom, ${fromColor}, rgba(212,175,110,0.04) 50%, ${toColor})`,
        position: 'relative',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  )
}
