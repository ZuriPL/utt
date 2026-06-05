#!/usr/bin/env deno

import { Command } from 'commander'
import { command as testCommand } from "./commands/test.ts";
import { readWorkspace } from "./runner/finder.ts";
import { loadTest } from './runner/loader.ts'

const program = new Command();

program.name('utt')
    .description("Universal Testing Tool - easily write and run tests for any program")
    .version('0.0.1')

const test = program.command('test')
    .description("Runs tests")
    .argument("[package]", "Test package to run. Runs all found tests if no argument is specified")
    .action(testCommand)

program.command("list")
    .action(readWorkspace)

program.command("load")
    .argument("<path>")
    .action(loadTest)

program.parse()