<template>
  <div
    class="p-card"
    :class="{ active: isActive }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Color accent stripe -->
    <div class="p-card__stripe" :style="{ background: accent }" />

    <!-- Image area -->
    <div class="p-card__image-wrap">
      <div class="p-card__image-placeholder" :style="{ background: imageBg }">
        <span class="p-card__image-label">{{ title }}</span>
      </div>

      <!-- Frosted panel on hover -->
      <div class="p-card__overlay" :class="{ visible: hovered }">
        <div class="p-card__links">
          <a v-if="liveUrl" :href="liveUrl" target="_blank" rel="noopener" class="p-card__link">
            ↗ Live Site
          </a>
          <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener" class="p-card__link p-card__link--ghost">
            ⌥ GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-card__content">
      <h3 class="p-card__title">{{ title }}</h3>
      <p class="p-card__desc">{{ description }}</p>
      <div class="p-card__tags">
        <span v-for="t in tech" :key="t" class="p-card__tag">{{ t }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  accent: string
  isActive: boolean
}>()

const hovered = ref(false)

const imageBg = `linear-gradient(135deg, #161616 0%, #1e1e00 100%)`
</script>

<style scoped>
.p-card {
  position: relative;
  width: 420px;
  min-height: 520px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s, filter 0.4s;
  overflow: hidden;
}

.p-card:not(.active) {
  transform: scale(0.92);
  opacity: 0.6;
  filter: brightness(0.7);
}

.p-card.active {
  transform: scale(1);
  opacity: 1;
  filter: brightness(1);
}

.p-card__stripe {
  height: 3px;
  width: 100%;
  flex-shrink: 0;
}

.p-card__image-wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
}

.p-card__image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-card__image-label {
  font-family: var(--font-display);
  font-size: 2rem;
  color: rgba(240,237,230,0.15);
  letter-spacing: 0.05em;
  text-align: center;
  padding: 1rem;
}

.p-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 8, 0.82);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
}

.p-card__overlay.visible {
  transform: translateY(0);
}

.p-card__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.p-card__link {
  padding: 0.45rem 1rem;
  background: var(--color-accent);
  color: #000;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s;
}

.p-card__link:hover { opacity: 0.85; }

.p-card__link--ghost {
  background: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
}

.p-card__content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.p-card__title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--color-text);
  letter-spacing: 0.03em;
  line-height: 1;
}

.p-card__desc {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.65;
  flex: 1;
}

.p-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
}

.p-card__tag {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
}
</style>
