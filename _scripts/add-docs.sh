#!/bin/bash

set -euxo pipefail

# Inputs: $title, $description, $slug

mkdir -p src/pages/articles

# use jq , parse JSON ["a","b","c"] and pick a random one per length
RANDOM_ICON=$(jq -r --arg rand $RANDOM --argjson arr $(cat ./_scripts/data.json) '.[$rand|tonumber % ($arr|length)]' <<< cat ./_scripts/data.json)

ID=$(uuidgen)

cat <<EOF > src/pages/articles/$slug/index.mdx
---
id: "$ID"
slug: "$slug"
title: "$(echo $title | sed 's#\"#\\\"#g')"
description: "$(echo $description | sed 's#\"#\\\"#g')"
created_at: "$(date --iso-8601=seconds)"
draft: false
layout: "../../../layouts/MarkdownLayout.astro"
icon: "$RANDOM_ICON"
---

{/* import */}

import { Icon } from 'astro-icon'
import { Notification } from 'accessible-astro-components'

{/* content */}

# $title


EOF
