<template>
  <div class="stat" ref="statRef" @mouseenter="triggerGlitch">
    <div class="stat__number">
      <span class="stat__value" :class="{ glitch: glitching }">{{ displayValue }}</span>
      <span class="stat__suffix">{{ suffix }}</span>
    </div>
    <p class="stat__label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  target: number
  suffix?: string
  label: string
  decimals?: number
}>()

const statRef = ref<HTMLElement | null>(null)
const displayValue = ref('0')
const glitching = ref(false)
const animated = ref(false)

function formatVal(v: number) {
  if (props.decimals) return v.toFixed(props.decimals)
  return Math.round(v).toString()
}

function animate() {
  if (animated.value) return
  animated.value = true
  const obj = { val: 0 }
  gsap.to(obj, {
    val: props.target,
    duration: 2,
    ease: 'power2.out',
    onUpdate() {
      displayValue.value = formatVal(obj.val)
    },
    onComplete() {
      displayValue.value = formatVal(props.target)
    },
  })
}

function triggerGlitch() {
  glitching.value = true
  setTimeout(() => { glitching.value = false }, 320)
}

onMounted(() => {
  if (!statRef.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(statRef.value)
})
</script>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background: var(--color-surface);
  transition: border-color 0.25s;
}

.stat:hover {
  border-color: rgba(232, 255, 0, 0.25);
}

.stat__number {
  display: flex;
  align-items: flex-start;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.stat__value {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  color: var(--color-text);
  letter-spacing: 0.02em;
  line-height: 1;
  transition: color 0.1s;
}

.stat__value.glitch {
  animation: glitch 0.32s steps(4) forwards;
}

.stat__suffix {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--color-accent);
  margin-top: 0.3rem;
  margin-left: 0.1rem;
  line-height: 1;
}

.stat__label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-muted);
}
</style>
