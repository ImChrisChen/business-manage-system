#!/usr/bin/env bash

image_name="imchrisorz/business-manage-system"

# 当前路径是脚本执行路径
ver=$(cat ./package.json | grep -e '"version":' | tr -cd "[0-9].")

docker build -t "${image_name}:${ver}" .

docker tag "${image_name}:${ver}" "${image_name}:latest"

# docker push "${image_name}:latest"
docker push $image_name --all-tags