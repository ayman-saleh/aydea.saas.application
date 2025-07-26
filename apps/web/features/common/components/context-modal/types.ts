export interface Document {
  id: string
  title: string
  type: 'pdf' | 'text' | 'website'
  content?: string
  url?: string
  fileData?: string // Base64 encoded for PDFs
  faviconUrl?: string
}

export interface ContextModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface ContextSection {
  label: string
  icon: React.ElementType
  content: React.ReactNode
  expandable?: boolean
}

export interface DocumentItemProps {
  doc: Document
  onRemove: (id: string) => void
  onView: (doc: Document) => void
  getIcon: (type: string) => React.ElementType
} 