let lockCount = 0
let savedScrollY = 0
const savedStyles: Record<string, string> = {}

export function lockBodyScroll(): void {
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    savedStyles.overflow = document.body.style.overflow
    savedStyles.position = document.body.style.position
    savedStyles.top = document.body.style.top
    savedStyles.width = document.body.style.width
    savedStyles.height = document.body.style.height

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.width = "100%"
  }
  lockCount++
}

export function resetScrollLock(): void {
  savedScrollY = 0
}

export function unlockBodyScroll(): void {
  if (lockCount === 0) return
  lockCount--
  if (lockCount === 0) {
    document.body.style.overflow = savedStyles.overflow
    document.body.style.position = savedStyles.position
    document.body.style.top = savedStyles.top
    document.body.style.width = savedStyles.width
    document.body.style.height = savedStyles.height
    window.scrollTo(0, savedScrollY)
  }
}
