import arg from 'arg';
import { versions } from 'process';
import { Reporter } from "../types";

export function parseCliArgs() {
    const args = arg({
      '--help': Boolean,
      '--reporter': String,
      '--cwd': String,
      '-h': '--help',
      '-r': '--reporter',
    });
    const version = args._[0] ?? versions.node;
    const reporter = (args['--reporter']) as Reporter ?? Reporter.Terminal;
    const help = args['--help'];
    const cwd = args['--cwd'];

    return { version, reporter, help, cwd };
}
