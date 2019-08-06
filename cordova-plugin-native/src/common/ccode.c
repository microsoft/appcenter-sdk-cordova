//
//  ccode.c
//  Cross-platform C functionality
//

#include "ccode.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void c_generateLowMemory() {
    size_t size = 128 * 1024 * 1024;
    void *buffer = malloc(size);
    memset(buffer, 42, size);
}

