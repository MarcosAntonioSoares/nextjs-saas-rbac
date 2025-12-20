export function getInitials(name?: string | null): string {
  if (!name) return 'U'

  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  const first = parts[0][0]
  const last = parts[parts.length - 1][0]

  return `${first}${last}`.toUpperCase()
}
