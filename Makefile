.PHONY: all test

all:
	npm install

test:
	./node_modules/.bin/jest tests

test-watch:
	./node_modules/.bin/jest --watch tests
