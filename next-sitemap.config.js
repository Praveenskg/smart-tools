/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tools.praveensingh.online',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  transform: async (config, path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }),
};
