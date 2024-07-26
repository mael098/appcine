#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
  echo "✅ - main branch detected, building can proceed"
  exit 1;

elif [[ "$VERCEL_GIT_COMMIT_REF" != "dev-eli" || "$VERCEL_GIT_COMMIT_REF" != "dev-mael"  ]] ; then
  # Don't build
  echo "🛑 - Personal branch detected, build cancelled"
  exit 0;

elif [[ "$VERCEL_GIT_COMMIT_REF" =~ ^dev(-.*)?$ ]] ; then
  # Proceed with the build
  echo "✅ - dev branch detected, building can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi