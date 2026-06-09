# PRIORITY

[x] rewrite hash() to work as a pipe
[x] rewrite test validators to use streams
[x] rewrite loader.ts/runner.ts to work with new .utest format (.zip)
[x] reporting the test status
[] advanced test status reporting
[] break up sdk.ts (and the base Test class) into separate objects

# MISC

[] clean up dependencies
[] move test scripts back to .ts, transpiling with esbuild? or native deno?
[] smaller executable (somehow)

# Test execution

[] Parallel test running
[] Output formatting
[] Asynchronous test state reporting
[] Performance tracking (/usr/bin/time, perf)
[] Valgrind support
[] rewrite runner/finder/compiler so that they can share code 

# SDK

[x] hash() function (parsing)
[x] line()
[] define() for creating objects
[x] rewrite parse (and other parts of the compiler/runner) to use streams
[] Multi tests

# NOTES

- breaking up files into a mixin is left for {break up sdk.ts}
- by multi tests i mean a test that generates n (i. e. 100) instances of itself with randomized values, so esentially generators
- define(): in general, methods that make it easier to create input. For example, if the program requires us to create objects before we can
operate on it, there should be a helper to generate these creation/deletions automatically in the test
