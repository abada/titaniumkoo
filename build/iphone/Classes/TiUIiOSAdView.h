/**
 * _titaniumkookoo _titaniumkookoo Mobile
 * Copyright (c) 2010-2014 by _titaniumkookoo, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiUIView.h"

#ifdef USE_TI_UIIOSADVIEW

#import "TiUIiOSAdViewProxy.h"
#import <iAd/iAd.h>

@interface TiUIiOSAdView : TiUIView<ADBannerViewDelegate> {

@private
	ADBannerView *adview;
}

@property (nonatomic, readonly) ADBannerView* adview;

#pragma mark - _titaniumkookoo Internal Use
-(CGFloat)contentHeightForWidth:(CGFloat)value;
-(CGFloat)contentWidthForWidth:(CGFloat)value;
@end

#endif
