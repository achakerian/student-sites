#!/usr/bin/env sh
# Builds start/starter.zip from template/. Run after editing anything in template/.
set -eu
cd "$(dirname "$0")/.."
rm -rf build/my-site start/starter.zip
mkdir -p build start
cp -R template build/my-site
find build/my-site -name '.DS_Store' -delete
(cd build && zip -qrX ../start/starter.zip my-site)
rm -rf build
echo "Wrote start/starter.zip:"
unzip -l start/starter.zip
