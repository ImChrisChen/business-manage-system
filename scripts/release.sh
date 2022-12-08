#!/usr/bin/env bash

current_branch_name=$(git symbolic-ref --short HEAD)

npm version patch

ver=$(cat ./package.json | grep -e '"version":' | tr -cd "[0-9].")

git add .

git commit -m "ci: 版本发布,当前版本:${ver}"

git push origin "origin/${current_branch_name}"

image_name="imchrisorz/business-manage-system"

docker build -t "${image_name}:${ver}" .

docker tag "${image_name}:${ver}" "${image_name}:latest"

# docker push "${image_name}:latest"
docker push $image_name --all-tags