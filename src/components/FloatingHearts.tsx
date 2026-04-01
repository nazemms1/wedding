import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
  color: string
  drift: number
}

const COLORS = [
  'rgba(56, 189, 248, 0.55)',
  'rgba(125, 211, 252, 0.45)',
  'rgba(212, 175, 110, 0.4)',
  'rgba(15, 37, 87, 0.2)',
  'rgba(14, 165, 233, 0.35)',
]

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.3)
  ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3)
  ctx.bezierCurveTo(x - size * 0.5, y + size * 0.65, x, y + size * 0.9, x, y + size)
  ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.65, x + size * 0.5, y + size * 0.3)
  ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3)
  ctx.closePath()
}

function createHeart(width: number, height: number): Heart {
  return {
    x: Math.random() * width,
    y: height + Math.random() * 200,
    size: 6 + Math.random() * 18,
    speed: 0.4 + Math.random() * 0.9,
    opacity: 0.3 + Math.random() * 0.7,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    drift: (Math.random() - 0.5) * 0.6,
  }
}

export function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const hearts: Heart[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Seed initial hearts spread across the screen
    for (let i = 0; i < 30; i++) {
      const h = createHeart(canvas.width, canvas.height)
      h.y = Math.random() * canvas.height
      hearts.push(h)
    }

    function tick() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new hearts
      if (hearts.length < 45 && Math.random() < 0.08) {
        hearts.push(createHeart(canvas.width, canvas.height))
      }

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i]
        h.y -= h.speed
        h.x += h.drift
        h.rotation += h.rotationSpeed

        if (h.y + h.size * 2 < 0) {
          hearts.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(h.x, h.y)
        ctx.rotate(h.rotation)
        ctx.globalAlpha = h.opacity * Math.min(1, (canvas.height - h.y) / 200)
        ctx.fillStyle = h.color
        drawHeart(ctx, -h.size * 0.5, -h.size * 0.5, h.size)
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
