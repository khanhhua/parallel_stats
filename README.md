README
====

Install
----
Run `npm install` to install all dependencies.

Usage
----
Run `node main.js path_to_file_a path_to_file_b`. Absolute paths are preferred.

Demo Highlights
----
In your favorite editor, navigate to module main.js. You'll find `wc.mode = 'SYNC';` which you may set to 'ASYNC'.

In case of SYNC, wordcount module uses `fs.statSync()` to get file information. In case of ASYNC, it uses `fs.stat()`.