import type { MetadataRoute } from 'next'

const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!envUrl || envUrl === '' || envUrl === 'http://localhost:3000') {
    return 'http://localhost:3000'
  }
  return envUrl
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/$/, '')

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}


