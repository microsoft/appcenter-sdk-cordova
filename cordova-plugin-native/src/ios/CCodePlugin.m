#import "CCodePlugin.h"
#include "ccode.h"
@implementation CCodePlugin

- (void)generateLowMemory()
{
    c_generateLowMemory();
}

@end
