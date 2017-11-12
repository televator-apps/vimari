.PHONY: all test

all:
	npm install

test:
	./node_modules/.bin/jest tests
