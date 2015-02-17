test:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -u bdd -R list

.PHONY: test
