import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './AnimatedOutline.css'

type Primitive = 'circle' | 'square'

interface AnimatedOutlineProps {
  className?: string
  speed?: number
  borderColor?: string
  borderWidth?: number
  padding?: number
  shadow?: boolean
  primitive?: Primitive
  deformIntensity?: number // 0..1 strength of blobbing
  pulseIntensity?: number // 0..1 scale pulse amplitude
  pulseSpeed?: number // multiplier for pulse speed
  children: React.ReactNode
}

const AnimatedOutline: React.FC<AnimatedOutlineProps> = ({
  className = '',
  speed = 1,
  borderColor = '#ffffff',
  borderWidth = 1.5,
  padding = 24,
  shadow = true,
  primitive = 'circle',
  deformIntensity = 2,
  pulseIntensity = 0.06,
  pulseSpeed = 1,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)
  const [boxSize, setBoxSize] = useState<number | undefined>(undefined)

  // Ensure square wrapper so border-radius percent behaves as a circle
  useLayoutEffect(() => {
    const measure = () => {
      if (!contentRef.current) return
      const rect = contentRef.current.getBoundingClientRect()
      const pad = padding * 2
      const contentMax = Math.max(rect.width, rect.height)
      const rawDimension = Math.ceil(contentMax + pad)
      const viewportMin = Math.min(window.innerWidth, window.innerHeight)
      const maxDimension = Math.max(0, viewportMin - 48)
      const dimension = Math.max(
        Math.ceil(contentMax),
        maxDimension > 0 ? Math.min(rawDimension, maxDimension) : rawDimension
      )
      setBoxSize(dimension)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [padding, children])

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime

      const elapsed = (currentTime - startTimeRef.current) * speed
      const time = elapsed * 0.001

      if (shapeRef.current) {
        // Params
        const deform = Math.max(0, Math.min(1, deformIntensity ?? 1))
        const pSpeed = pulseSpeed ?? 1
        const pAmp = Math.max(0, Math.min(1, pulseIntensity ?? 0.08))

        // Phased waves to avoid symmetry
        const t1 = time * 2.0
        const t2 = time * 1.6
        const t3 = time * 3.1

        // Base primitive as starting point
        const prim: Primitive = primitive ?? 'circle'
        const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

        const clearClipPath = (element: HTMLDivElement | null) => {
          if (!element) return
          element.style.clipPath = ''
          ;(element.style as unknown as { webkitClipPath?: string }).webkitClipPath = ''
        }

        clearClipPath(shapeRef.current)
        clearClipPath(glowRef.current)
        clearClipPath(fillRef.current)

        const baseCircle = [55, 48, 57, 49]
        const baseSquare = [26, 34, 24, 36]
        const base = prim === 'square' ? baseSquare : baseCircle
        const staticOffsets = prim === 'square' ? [-7, 9, -5, 11] : [-6, 4, -3, 7]
        const deformScale = prim === 'square' ? 18 : 26

        const tl =
          base[0] +
          staticOffsets[0] +
          (Math.sin(t1 + 0.1) * 0.52 + Math.cos(t2 + 1.2) * 0.34 + Math.sin(t3 + 0.3) * 0.22) *
            (deformScale * deform)
        const tr =
          base[1] +
          staticOffsets[1] +
          (Math.sin(t1 + 1.4) * 0.48 + Math.cos(t2 + 0.4) * 0.36 + Math.sin(t3 + 1.1) * 0.21) *
            (deformScale * 0.85 * deform)
        const br =
          base[2] +
          staticOffsets[2] +
          (Math.sin(t1 + 2.3) * 0.55 + Math.cos(t2 + 1.9) * 0.31 + Math.sin(t3 + 2.0) * 0.26) *
            (deformScale * 0.95 * deform)
        const bl =
          base[3] +
          staticOffsets[3] +
          (Math.sin(t1 + 2.9) * 0.5 + Math.cos(t2 + 2.5) * 0.33 + Math.sin(t3 + 2.8) * 0.24) *
            (deformScale * 0.9 * deform)

        const minRadius = prim === 'square' ? 8 : 28
        const maxRadius = prim === 'square' ? 64 : 82
        const topLeft = clamp(tl, minRadius, maxRadius)
        const topRight = clamp(tr, minRadius, maxRadius)
        const bottomRight = clamp(br, minRadius, maxRadius)
        const bottomLeft = clamp(bl, minRadius, maxRadius)

        const radius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`
        shapeRef.current.style.borderRadius = radius
        if (glowRef.current) glowRef.current.style.borderRadius = radius
        if (fillRef.current) fillRef.current.style.borderRadius = radius

        // Pulsation of outline scale (content remains static)
        const pulse = Math.sin(time * (1.2 * pSpeed))
        const scale = 1 + pAmp * 0.08 * pulse
        shapeRef.current.style.transform = `scale(${scale})`
        shapeRef.current.style.opacity = '1'
        if (glowRef.current) glowRef.current.style.transform = `scale(${scale})`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [speed])

  return (
    <div
      ref={wrapperRef}
      className={`animated-outline ${className}`}
      style={
        {
          '--outline-color': borderColor,
          '--outline-width': `${borderWidth}px`,
          '--outline-shadow': shadow
            ? '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.25)'
            : 'none',
          width: boxSize ? `${boxSize}px` : undefined,
          height: boxSize ? `${boxSize}px` : undefined,
        } as React.CSSProperties
      }
    >
      <div ref={glowRef} className="animated-outline__glow" />
      <div ref={fillRef} className="animated-outline__fill" />
      <div ref={shapeRef} className="animated-outline__shape" />
      <div ref={contentRef} className="animated-outline__content">
        {children}
      </div>
    </div>
  )
}

export default AnimatedOutline
