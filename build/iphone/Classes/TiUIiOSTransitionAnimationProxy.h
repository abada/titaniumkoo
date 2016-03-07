/**
 * _titaniumkookoo _titaniumkookoo Mobile
 * Copyright (c) 2013 by _titaniumkookoo, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_UIIOSTRANSITIONANIMATION
#import "TiProxy.h"
#import "TiAnimation.h"

@interface TiUIiOSTransitionAnimationProxy : TiProxy<UIViewControllerAnimatedTransitioning, TiAnimationDelegate>
{
    id<UIViewControllerContextTransitioning> _transitionContext;
    TiAnimation *_transitionTo;
    TiAnimation *_transitionFrom;
    BOOL _endedTo;
    BOOL _endedFrom;
    NSNumber *_duration;
}


@end
#endif
