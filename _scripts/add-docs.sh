#!/bin/bash

set -euxo pipefail

# Inputs: $TITLE, $DESCRIPTION, $SLUG

mkdir -p src/pages/articles

# use jq , parse JSON ["a","b","c"] and pick a random one per length
RANDOM_ICON=$(jq -r --arg rand $RANDOM --argjson arr $(cat ./_scripts/data.json) '.[$rand|tonumber % ($arr|length)]' <<< cat ./_scripts/data.json)

ID=$(uuidgen)

mkdir -p src/pages/articles/$SLUG

cat <<EOF > src/pages/articles/$SLUG/index.mdx
---
id: "$ID"
slug: "$SLUG"
title: "$(echo $TITLE | sed 's#\"#\\\"#g')"
description: "$(echo $DESCRIPTION | sed 's#\"#\\\"#g')"
created_at: "$(date --iso-8601=seconds)"
draft: false
layout: "../../../layouts/MarkdownLayout.astro"
icon: "$RANDOM_ICON"
---

{/* import */}

import { Icon } from 'astro-icon'
import { Notification } from 'accessible-astro-components'

{/* content */}

# $TITLE


EOF
