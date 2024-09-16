#import "AppDelegate.h"
#import <BrazeKit/BrazeKit-Swift.h>
#import <BrazeUI/BrazeUI-Swift.h>
#import "BrazeReactBridge.h"
#import <React/RCTBundleURLProvider.h>
#import "RudderBrazeIntegration.h"
#import "RudderBrazeFactory.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"BrazeRudderstack";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  //
  // Setup Braze
  BRZConfiguration *configuration = [[BRZConfiguration alloc] initWithApiKey:@"1ddc040f-3772-42e5-92a8-c3ece590c3b8"
                                                                    endpoint:@"sdk.iad-06.braze.com"];
  // Enable logging and cÏustomize the configuration here.
  configuration.logger.level = BRZLoggerLevelInfo;
  Braze *braze = [BrazeReactBridge initBraze:configuration];
  
  
  // Braze In-App Message
  //  *instance = [RudderBrazeFactory instance];
  
  
  AppDelegate.braze = braze;
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

static Braze *_braze = nil;

-(void)waitForBrazeSDKToInit:(NSTimeInterval)timeInterval {
  if ([RudderBrazeFactory instance].integration == nil) {
    [NSThread sleepForTimeInterval:timeInterval];
  }
}

+ (Braze *)braze {
  return _braze;
}

+ (void)setBraze:(Braze *)braze {
  _braze = braze;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
