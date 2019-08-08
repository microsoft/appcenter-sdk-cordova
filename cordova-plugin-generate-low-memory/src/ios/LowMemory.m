// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import "LowMemory.h"

@interface LowMemory ()

@property NSMutableArray *buffers;

@property size_t allocated;

@end

@implementation LowMemory

static int const blockSize = 256 * 1024 * 1024;

- (instancetype) init {
  self = [super init];
  if (self) {
    _buffers = [NSMutableArray new];
    _allocated = 0;
  }
  return self;
}

- (void) generateLowMemory :(CDVInvokedUrlCommand *) command
{
  const size_t blockSize = 128 * 1024 * 1024;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 100 * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
    void *buffer = malloc(blockSize);
    memset(buffer, 42, blockSize);
    [self.buffers addObject:[NSValue valueWithPointer:buffer]];
    self.allocated += blockSize;
    NSLog(@"Allocated %zu MB", self.allocated / (1024 * 1024));
    [self generateLowMemory];
  });
  [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK]
                                callbackId:command.callbackId];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
