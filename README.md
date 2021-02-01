# disk-space
This module wraps the `df -BK` (or `df -bk` if on OS X) command which shows the amount of disk space available on the file system that a given file is stored on. It returns the used size and total size of the file system in kilobytes.

# Usage example

```
const diskSpace = require('disk-space');
diskSpace('/' , function(error, data) {
  console.log(data);  // returns { usedSize: 20, totalSize: 30 } in Kilobytes
});

```
