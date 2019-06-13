#!/bin/bash

# Setup
SG_DIST=dist
SG_KSS_ASSETS=kss-assets
SG_ASSETS=assets
SG_SRC=src
SG_TMP_PATH=tmp_styleguide_ui_dir
SG_DOC_PATHS="@PATH_OPENSANS_FONT: '../kss-assets/assets/fonts/opensans';@PATH_FONT_AWESOME_5_7_2: '../kss-assets/assets/fonts/FontAwesome5.7.2';@PATH_SUGAR_FONT: '../kss-assets/assets/fonts/SugarFont';"
RANDOM_HASH=`openssl rand -hex 12`

# This dir also used in collect-less-rules.js and styleguide-doc-frontend/config.less
mkdir -p $SG_TMP_PATH

# For dev mode or debugging when running build multiple times
# and $SG_DIST and $SG_TMP_PATH are not clean
: > ./$SG_TMP_PATH/dump.less
rm -rf ./$SG_DIST/*

# Use random hash to prevent caching annoyance
sed -E -i.bak 's/styles.css/styles.css?'$RANDOM_HASH'/g' kss-config.json

# Build KSS, restore kss-config.json from kss-config.json-e modified above
kss --config kss-config.json && mv $_.bak $_

# [Styleguide Doc specific] Back up original variables.less
cp -f less/undocumented-components/variables.less less/undocumented-components/variables.less.bk

# [Styleguide Doc specific] Remove lines with specific variables (font awesome, sugar font, open sans)
awk '!/PATH_FONT_AWESOME_5_7_2|PATH_SUGAR_FONT|PATH_OPENSANS_FONT/' less/undocumented-components/variables.less.bk > less/undocumented-components/variables.less

# [Styleguide Doc specific] Add these specific variables with different paths for styleguide-doc only representation
cat <(echo "/* Styleguide-doc-specific START*/$SG_DOC_PATHS/* Styleguide-doc-specific END*/") less/undocumented-components/variables.less > less/undocumented-components/variables2.less

# [Styleguide Doc specific] Use newly generated temporary variables2.less in place of original to generate static css
mv less/undocumented-components/variables2.less $_

# [Styleguide UI] Build styles.css
lessc $SG_SRC/styleguide-doc-frontend/config.less $SG_TMP_PATH/styles.css

# [Styleguide Doc specific] Restore original variables.less
mv less/undocumented-components/variables.less.bk less/undocumented-components/variables.less

# [Styleguide UI] Minify and copy it to dist
mkdir -p $SG_DIST/$SG_KSS_ASSETS

# [Styleguide UI] Sometimes relative path doesn't resolve when it goes
# outside of the `dist folder`, especially for docker styleguide doc
cp -rf $SG_ASSETS $SG_DIST/$SG_KSS_ASSETS

csso $SG_TMP_PATH/styles.css --output $SG_DIST/$SG_KSS_ASSETS/styles.css

# [Styleguide UI] Styleguide custom scripts
cp $SG_SRC/styleguide-doc-frontend/styleguide.js $SG_DIST/$SG_KSS_ASSETS/styleguide.js

# Remove tmp dir
rm -fr SG_TMP_PATH
