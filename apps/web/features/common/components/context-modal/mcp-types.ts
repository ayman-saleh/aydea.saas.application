export interface Integration {
  id: string
  name: string
  logoUrl?: string
  connected: boolean
}

export interface MCPIntegrationsSectionProps {
  integrations: Integration[]
  onAddIntegration: (integrationId: string) => void
  onRemoveIntegration: (integrationId: string) => void
} 