<template>
  <div
    class="l-card"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="emit('cardClick', cardId)"
    :style="cardStyle"
  >
    <div class="l-card__glow" :style="glowStyle" />
    <span class="l-card__index">{{ String(index).padStart(2, '0') }}</span>
    <div class="l-card__body">
      <h3 class="l-card__role">{{ role }}</h3>
      <p class="l-card__org">{{ org }}</p>
      <p class="l-card__dates">{{ dates }}</p>
      <p class="l-card__desc">{{ description }}</p>
      <div class="l-card__tags">
        <span v-for="tag in skills" :key="tag" class="l-card__tag">{{ tag }}</span>
      </div>
      <span class="l-card__cta">View details →</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  index: number
  role: string
  org: string
  dates: string
  description: string
  skills: string[]
  cardId: string
}>()

const emit = defineEmits<{
  (e: 'cardClick', id: string): void
}>()

const rotateX = ref(0)
const rotateY = ref(0)
const hovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

function onMouseMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  rotateY.value = ((e.clientX - cx) / (rect.width / 2)) * 6
  rotateX.value = -((e.clientY - cy) / (rect.height / 2)) * 6
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 100
  hovered.value = true
}

function onMouseLeave() {
  rotateX.value = 0
  rotateY.value = 0
  hovered.value = false
}

const cardStyle = computed(() => ({
  transform: `perspective(800px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translateY(${hovered.value ? '-6px' : '0'})`,
  transition: hovered.value ? 'transform 0.1s ease' : 'transform 0.5s ease',
  borderLeft: hovered.value ? '3px solid var(--color-accent)' : '1px solid var(--color-border)',
  cursor: 'pointer',
}))

const glowStyle = computed(() => ({
  opacity: hovered.value ? 1 : 0,
  background: `radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, rgba(232,255,0,0.08) 0%, transparent 60%)`,
}))
</script>

<style scoped>
.l-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 1.75rem 1.5rem 1.5rem;
  overflow: hidden;
  will-change: transform;
  border: 2px solid #c4d504c6 !important;
}

.l-card__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.l-card__index {
  font-family: var(--font-display);
  font-size: 3.5rem;
  color: rgba(240, 237, 230, 0.08);
  line-height: 1;
  display: block;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.l-card__role {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
  letter-spacing: 0.03em;
  margin-bottom: 0.25rem;
}

.l-card__org {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.l-card__dates {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.l-card__desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 1rem;
}

.l-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.l-card__tag {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(232, 255, 0, 0.07);
  border: 1px solid rgba(232, 255, 0, 0.2);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.l-card__cta {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  transition: color 0.2s;
}

.l-card:hover .l-card__cta {
  color: var(--color-accent);
}
</style>
