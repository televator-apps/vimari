# Vimari Setup

If you interested in contributing to Vimari or are installing Vimari from source you can follow this guide on setting up the project and some of the tooling around it.

## Linting & Formatting

### SwiftFormat

Vimari uses [SwiftFormat](https://github.com/nicklockwood/SwiftFormat) to format Swift code.

```bash
# Run SwiftFormat
cd path/to/vimari/repo
swift run swiftformat .

# Or if you don't want SwiftFormat to automatically format your changes but
# instead display them to you.
swift run swiftformat --lint .
```

### SwiftLint

Vimari uses [SwiftLint](https://github.com/realm/SwiftLint) to lint Swift code.

```bash
# Run SwiftLint
cd path/to/vimari/repo
swift run swiftlint

# Let SwiftLint fix issues where it can
swift run swiftlint autocorrect
```

### Prettier

Vimari uses [Prettier](https://prettier.io/) to format JavaScript, HTML, JSON and CSS files.

```bash
# Run Prettier
cd path/to/vimari/repo
npx prettier --check .

# Let Prettier do the formatting for you
npx prettier --write .
```

### ESLint

Vimari uses [ESLint](https://eslint.org/) to lint JavaScript code.

```bash
# Run ESLint
cd path/to/vimari/repo
npx eslint .

# Let ESLint fix issues where it can
npx eslint --fix .
```
