import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { leadershipData } from '../../data/leadershipData'
import './LeadershipModal.css'

interface Props {
  activeId: string | null
  onClose: () => void
}

export default function LeadershipModal({ activeId, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const entry = activeId ? (leadershipData.find((e) => e.id === activeId) ?? null) : null

  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) return
    gsap.to(modalRef.current, { clipPath: 'inset(0% 0 100% 0)', duration: 0.35, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose })
  }

  // Animate open when entry changes
  useEffect(() => {
    if (!entry || !overlayRef.current || !modalRef.current) return
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(
      modalRef.current,
      { clipPath: 'inset(100% 0 0% 0)' },
      { clipPath: 'inset(0% 0 0% 0)', duration: 0.5, ease: 'power3.out' }
    )

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeId])

  // Escape key
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [entry])

  if (!entry) return null

  const hasExtra = entry.extraImages && entry.extraImages.length > 0
  const hasTwoCols = !hasExtra && entry.image && entry.imageSecondary

  return createPortal(
    <div ref={overlayRef} className="lmodal-overlay" onMouseDown={handleClose}>
      <div ref={modalRef} className="lmodal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="lmodal__close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Image section */}
        <div className="lmodal__images">
          {entry.image === null ? (
            <div className="lmodal__placeholder">
              <div className="lmodal__geo lmodal__geo--1" />
              <div className="lmodal__geo lmodal__geo--2" />
              <div className="lmodal__geo lmodal__geo--3" />
            </div>
          ) : hasTwoCols ? (
            <div className="lmodal__two-col">
              <img src={entry.image} alt={entry.title} className="lmodal__img" />
              <img src={entry.imageSecondary!} alt={entry.title + ' secondary'} className="lmodal__img" />
            </div>
          ) : (
            <img src={entry.image} alt={entry.title} className="lmodal__cover-img" />
          )}

          {hasExtra && (
            <div className="lmodal__extras">
              {entry.extraImages!.map((src, i) => (
                <img key={i} src={src} alt={`${entry.title} ${i + 1}`} className="lmodal__extra-img" />
              ))}
            </div>
          )}

          <div className="lmodal__fade" />
        </div>

        {/* Content */}
        <div className="lmodal__content">
          <p className="lmodal__subtitle">{entry.subtitle}</p>
          <h2 className="lmodal__title">{entry.title}</h2>
          <p className="lmodal__narrative">{entry.narrative}</p>
          <ul className="lmodal__list">
            {entry.contributions.map((c, i) => (
              <li key={i} className="lmodal__item">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  )
}
