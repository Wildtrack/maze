test:
	@./node_modules/.bin/istanbul cover _mocha -- -u bdd -R list

.PHONY: test
