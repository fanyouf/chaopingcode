export default (opName: string, api: (any) => void) => {
  const bus = useEventBus<string>(opName)

  return {
    on: () => {
      const unsubscribe = bus.on(api)

      onUnmounted(() => {
        unsubscribe()
      })
    },
    emit: () => {
      bus.emit()
    },
  }
}
