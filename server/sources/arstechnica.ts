import { load } from "cheerio"
import { defineSource } from "../utils/source"
import type { SourceGetter } from "../types"

export default defineSource(async () => {
  const response = await fetch("https://arstechnica.com/gadgets/")
  const html = await response.text()
  const $ = load(html)

  const items = []

  // Process each article in the main content area
  $("article.article").each((_, article) => {
    const $article = $(article)
    const title = $article.find("h2").text().trim()
    const link = $article.find("h2 a").attr("href")
    const time = $article.find("time").attr("datetime")
    const excerpt = $article.find("p.excerpt").text().trim()

    if (title && link) {
      items.push({
        title,
        url: link,
        time: time ? new Date(time).getTime() : Date.now(),
        description: excerpt || undefined,
      })
    }
  })

  return items
}) as SourceGetter
