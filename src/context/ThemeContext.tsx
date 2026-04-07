import { createContext, useContext } from 'react'
import { theme } from '../theme'

export type AppTheme = typeof theme

export const ThemeContext = createContext<AppTheme>(theme)

export function useTheme(): AppTheme {
  return useContext(ThemeContext)
}
