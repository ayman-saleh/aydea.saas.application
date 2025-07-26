import { LuFile, LuFileText, LuGlobe } from 'react-icons/lu'

export const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return LuFile
    case 'text':
      return LuFileText
    case 'website':
      return LuGlobe
    default:
      return LuFile
  }
}

export const getFaviconUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    // Use Google's favicon service as a reliable fallback
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return ''
  }
}

export const inferTitleFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    // Extract domain name and format it nicely
    const hostname = urlObj.hostname
    const domainParts = hostname.replace('www.', '').split('.')
    const siteName = domainParts[0]
    // Capitalize first letter
    return siteName.charAt(0).toUpperCase() + siteName.slice(1)
  } catch {
    return ''
  }
} 