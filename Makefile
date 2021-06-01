.PHONY: sync

.ONESHELL:
SHELL = /bin/bash

sync:
	aws s3 sync --acl public-read ./ s3://practice.playpit.net/
