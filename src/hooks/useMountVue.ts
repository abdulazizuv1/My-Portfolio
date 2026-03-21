import { useEffect, useRef } from 'react'
import { createApp, type Component } from 'vue'

export function useMountVue(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  VueComponent: Component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any> = {}
) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) return
    const app = createApp(VueComponent, props)
    app.mount(elRef.current)
    return () => { app.unmount() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(props)])

  return elRef
}
