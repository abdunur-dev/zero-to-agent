#!/bin/bash
cd /vercel/share/v0-project
git add -A
git commit -m "chore: update GitHub links to abdunur-dev/zero-to-agent"
git push origin portless-proxy-start
echo "Changes pushed to GitHub successfully!"
