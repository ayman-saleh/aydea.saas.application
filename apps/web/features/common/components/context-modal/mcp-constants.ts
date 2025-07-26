import { Integration } from './mcp-types'

export const AVAILABLE_INTEGRATIONS: Integration[] = [
  { 
    id: 'linear', 
    name: 'Linear API', 
    logoUrl: 'https://linear.app/favicon.ico', 
    connected: false 
  }
]

export const DEFAULT_INTEGRATIONS: Integration[] = [
  { 
    id: 'linear', 
    name: 'Linear API', 
    logoUrl: 'https://linear.app/favicon.ico', 
    connected: true 
  }
] 