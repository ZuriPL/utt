# WORK IN PROGRESS

# `utt` - Universal Testing Tool

## What is `utt`?

`utt` is an all-in-one testing framework, for writing and running end-to-end tests on binary programs. `utt` aims to be as simple as possible to use, while simultaneously offering full freedom in test creation.

## Installation

Install with `npm`
```bash
$ npm i -g utt
```

Or dont! Just download a test bundle from a repo, and a `./utt` binary will be waiting for you there (you might lose out on some cool features though...)


## Usage

### Running tests:

Download a test package
```bash
$ utt pull <link>
```

Configure `utt` in an interactive window
```bash
$ utt config
```

Run all downloaded packages
```bash
$ utt test
```

It's that simple! ...And if it isn't:
```bash
$ utt help      # quickly reference commands
$ utt guide     # step-by-step common usage patters explained
```
Or scroll to documentation for more

### Writing tests:

Create a test package:
```bash
$ utt create <name>
```

Edit a chosen test package:
```bash
$ utt edit <package>
```

Create a test scenario
```bash
$ utt add foo.bar [options]
# Creates a test bar.ts, in the group foo, in the package set by edit
```

Compile tests for distribution:
```bash
$ utt compile <package>
```

Share your package:
```bash
$ utt push <link>
```

