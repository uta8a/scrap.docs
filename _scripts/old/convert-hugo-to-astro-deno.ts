import { expandGlob } from 'https://deno.land/std@0.172.0/fs/expand_glob.ts'
import { extract } from 'https://deno.land/std@0.172.0/encoding/front_matter/yaml.ts'
import * as uuid from 'https://deno.land/std@0.207.0/uuid/mod.ts'
import file from '../_scripts/data.json' assert { type: 'json' }

import dayjs from 'https://cdn.skypack.dev/dayjs@v1.11.5'
import utc from 'https://cdn.skypack.dev/dayjs@v1.11.5/plugin/utc'
import timezone from 'https://cdn.skypack.dev/dayjs@v1.11.5/plugin/timezone'
import duration from 'https://cdn.skypack.dev/dayjs@v1.11.5/plugin/duration'
import relativeTime from 'https://cdn.skypack.dev/dayjs@v1.11.5/plugin/relativeTime'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.tz.setDefault('Asia/Tokyo')

type Changelog = {
  summary: string
  date: string
}

interface Data {
  type: 'post' | 'diary'
  title: string
  draft: boolean
  description: string
  ogp: string
  changelog: Changelog[]
}

for await (const entry of expandGlob('tmp/**/_index.md')) {
  const raw = await Deno.readTextFile(entry.path)
  const { frontMatter: _, body, attrs } = extract<Data>(raw)
  const created_at = dayjs(attrs.changelog[0].date).tz().format('YYYY-MM-DDTHH:mm:ss+09:00')
  const date = dayjs(attrs.changelog[0].date).tz().format('YYYY-MM-DD')
  const draft = attrs.draft
  const description = attrs.description
  const title = attrs.title
  const path = entry.path.split('/')
  path.pop()
  const poped_date = path.pop()
  const slug = `${date}-${poped_date}`
  const content = `---
id: "${uuid.v1.generate()}"
slug: "${slug}"
title: "${title}"
description: "${description}"
created_at: "${created_at}"
draft: ${draft}
layout: "../../../layouts/MarkdownLayout.astro"
icon: "${file[Math.floor(Math.random() * file.length)]}"
---

{/* import */}

import { Icon } from 'astro-icon'
import { Notification } from 'accessible-astro-components'

{/* content */}

${body}
`

  await Deno.mkdir(`tmp2/${slug}`, { recursive: true })
  await Deno.writeTextFile(`tmp2/${slug}/index.mdx`, content)
  // copy images
  for await (const entry of expandGlob(`tmp/${poped_date}/*`)) {
    if (entry.path.split('/').pop() === '_index.md') continue
    if (entry.isFile) {
      const path = entry.path.split('/')
      const filename = path.pop()
      await Deno.copyFile(entry.path, `tmp2/${slug}/${filename}`)
    }
  }
}
