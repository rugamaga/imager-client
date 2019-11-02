#! /bin/bash

cat << EOS
bases:
  - overlays/${KUSTOMIZATION_ENV}
images:
  - name: imager-client
    newName: ${CONTAINER_REGISTRY_URL}/${CONTAINER_IMAGE_NAME}
    newTag: ${CIRCLE_SHA1}
configMapGenerator:
  - name: imager-client-config
    literals:
      - NODE_ENV=production
secretGenerator:
  - name: imager-client-secret
    env: imager-client-secret.env
commonLabels:
  pruneLabel: ${PRUNE_LABEL}
EOS
