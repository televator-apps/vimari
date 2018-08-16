.PHONY: all test test-watch

NPM=$(shell which npm)
NPM_BIN=$(shell npm bin)

all: deps

deps:
	@$(NPM) install

test:
	@$(NPM_BIN)/jest tests

test-watch:
	@$(NPM_BIN)/jest --watch tests
