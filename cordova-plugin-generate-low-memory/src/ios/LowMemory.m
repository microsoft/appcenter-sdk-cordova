// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import "LowMemory.h"

@interface LowMemory ()

@property NSMutableArray *buffers;

@property size_t allocated;

@end

@implementation LowMemory

static size_t const blockSize = 128 * 1024 * 1024;

- (instancetype)init {
  self = [super init];
  if (self) {
    _buffers = [NSMutableArray new];
    _allocated = 0;
  }
  return self;
}

- (void)generateLowMemory:(CDVInvokedUrlCommand *)command
{
  [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK]
                              callbackId:command.callbackId];
  [self produceLowMemory];
}

- (void)produceLowMemory {
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 100 * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
    void *buffer = malloc(blockSize);
    memset(buffer, 42, blockSize);
    [self.buffers addObject:[NSValue valueWithPointer:buffer]];
    self.allocated += blockSize;
    NSLog(@"Allocated %zu MB", self.allocated / (1024 * 1024));
    [self produceLowMemory];
  });
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

@end
