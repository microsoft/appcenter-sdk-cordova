#import <Foundation/Foundation.h>

@import AppCenterCrashes.MSErrorReport;

NSDictionary* convertReportToJS(MSErrorReport* report);
NSArray* convertReportsToJS(NSArray* reports);
