import { useSyncExternalStore } from 'react'

// Tiny progress store shared by the XP bar, achievement toasts and terminal.
// Progress survives reloads via localStorage; if storage is blocked it's per-visit.

export const ACHIEVEMENTS = [
  { id: 'boot', title: 'First Boot', desc: 'Watched the system come online. Press ` for a terminal.' },
  { id: 'chaos', title: 'Chaos Engineer', desc: 'Crashed a live output. The rest survived.' },
  { id: 'shell', title: 'Shell Access', desc: 'Opened the terminal.' },
  { id: 'vim', title: 'Vim Enjoyer', desc: 'Navigated with j / k.' },
  { id: 'pipeline', title: 'Full Pipeline', desc: 'Made it all the way to Contact.' },
  { id: 'sudo', title: 'Root Access', desc: 'Ran sudo hire-me.' },
]

const XP_ACHIEVEMENT = 100
const XP_SECTION = 25
export const XP_PER_LEVEL = 200

const KEY = 'portfolio-progress'
let state = load()
const listeners = new Set()
const unlockListeners = new Set()

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved && Array.isArray(saved.unlocked) && Array.isArray(saved.sections)) return saved
  } catch {
    // blocked or corrupt storage: start fresh
  }
  return { unlocked: [], sections: [] }
}

function set(next) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors (private browsing, etc.)
  }
  listeners.forEach((l) => l())
}

export function unlock(id) {
  if (state.unlocked.includes(id)) return
  set({ ...state, unlocked: [...state.unlocked, id] })
  const achievement = ACHIEVEMENTS.find((a) => a.id === id)
  unlockListeners.forEach((l) => l(achievement))
}

export function visitSection(id) {
  if (state.sections.includes(id)) return
  set({ ...state, sections: [...state.sections, id] })
}

export function onUnlock(listener) {
  unlockListeners.add(listener)
  return () => unlockListeners.delete(listener)
}

// wipe progress and reload from the top, so everything plays like a first visit
export function resetProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing stored to clear
  }
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  window.location.reload()
}

export function progressSnapshot() {
  return state
}

export function isComplete(s) {
  return s.unlocked.length === ACHIEVEMENTS.length
}

export function openReward() {
  window.dispatchEvent(new Event('reward:open'))
}

export function openTerminal(command) {
  window.dispatchEvent(new CustomEvent('terminal:open', { detail: command }))
}

export function xpOf(s) {
  return s.unlocked.length * XP_ACHIEVEMENT + s.sections.length * XP_SECTION
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useProgress() {
  return useSyncExternalStore(subscribe, () => state)
}
