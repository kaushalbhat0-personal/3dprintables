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

export function forceUnlockAll(): void {
  lockCount = 0
  savedScrollY = 0
  savedStyles.overflow = ""
  savedStyles.position = ""
  savedStyles.top = ""
  savedStyles.width = ""
  savedStyles.height = ""

  document.body.style.overflow = ""
  document.body.style.position = ""
  document.body.style.top = ""
  document.body.style.width = ""
  document.body.style.height = ""

  if (document.body.hasAttribute("data-inquiry-modal-open")) {
    document.body.removeAttribute("data-inquiry-modal-open")
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", forceUnlockAll)
  window.addEventListener("beforeunload", forceUnlockAll)
}