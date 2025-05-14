# Script Versioning System Guide

## Overview

The WisdomNET Template Drafter Script Versioning System enables developers to maintain a history of code changes directly within script files. This approach provides several advantages over traditional version control:

1. **Quick Rollback**: If a new implementation causes issues, you can immediately switch back to a previous version by changing the active version variable.
2. **Side-by-Side Comparison**: Having multiple versions within the same file makes it easy to compare implementations.
3. **Change Documentation**: Each version includes inline documentation about what changed and why.
4. **Testing Flexibility**: You can easily switch between versions to test different implementations without changing files.

## Implementation Guide

### Step 1: Set Up Version Tracking

At the top of your script file, define a version control block:

```python
# =======================================================================
# VERSION CONTROL BLOCK - ACTIVE VERSIONS
# =======================================================================
# Define which version of each component is currently active
ACTIVE_VERSIONS = {
    "MyClass": "v2.0.0",
    "process_data": "v1.1.0",
    "helper_function": "v1.0.0"
}
```

### Step 2: Document the Original Implementation

When you first create a function or class, document it with version information:

```python
"""
[VERSION: v1.0.0] [DATE: 2025-05-10] [AUTHOR: dev1]
Initial implementation with basic functionality.
"""
def my_function(data):
    # Original implementation
    return data.process()
```

### Step 3: Add New Versions

When modifying the code, add a new version below the original:

```python
"""
[VERSION: v1.1.0] [DATE: 2025-05-12] [AUTHOR: dev2]
Fixed bug related to None values.

Changes:
- Added None check
- Improved error handling
"""
if ACTIVE_VERSIONS["my_function"] == "v1.1.0":
    def my_function(data):
        # New implementation
        if data is None:
            return None
        return data.process()
```

### Step 4: Switch Between Versions

To activate a different version, simply update the `ACTIVE_VERSIONS` dictionary at the top of the file:

```python
ACTIVE_VERSIONS["my_function"] = "v1.0.0"  # Switch back to original version
```

## Best Practices

1. **Versioning Granularity**: Version individual functions and classes, not entire files.
2. **Meaningful Version Numbers**: Use semantic versioning (MAJOR.MINOR.PATCH).
3. **Documentation**: Include the date, author, and detailed description of changes.
4. **Cleanup**: After a new version has been thoroughly tested and accepted, move old versions to an archive file.
5. **Active Version Management**: Consider creating a central version configuration for complex systems.

## Archive Process

When a file becomes cluttered with too many old versions:

1. Create an archive file named `{original_filename}_archive.py`
2. Move the old versions to this file while keeping a reference
3. Add a comment in the main file pointing to the archive location

## Example Archive Reference

```python
"""
[VERSION: v1.0.0] [DATE: 2025-05-10] [AUTHOR: dev1]
Initial implementation. 
MOVED TO ARCHIVE: see my_module_archive.py
"""
```

## Integration with Git

This system works alongside Git, not as a replacement:

- Git tracks the entire file history and facilitates collaboration
- The script versioning system enables quick version switching and detailed change tracking
- Commit new versions to Git after testing to maintain the master history

## Limitations

1. Introduces some code redundancy
2. May increase file size (mitigated by the archive process)
3. Requires discipline in maintaining the version records
4. Not suitable for changes spanning multiple files (use Git branches for that)

## Conclusion

The Script Versioning System provides a pragmatic approach to managing code evolution within the WisdomNET Template Drafter project. It's particularly valuable for experimental features, complex algorithms, and critical system components where rapid rollback capability is essential. 