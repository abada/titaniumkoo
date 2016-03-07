/**
 * _titaniumkookoo _titaniumkookoo Mobile
 * Copyright (c) 2009-2015 by _titaniumkookoo, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#if IS_XCODE_7
#ifdef USE_TI_UIIOSPREVIEWCONTEXT

#import "TiViewProxy.h"
#import "TiUIiOSPreviewActionProxy.h"

@interface TiUIiOSPreviewActionGroupProxy : TiViewProxy {
    UIPreviewActionGroup *actionGroup;
}

/**
    The actions assigned to the preview action group.
 */
@property(nonatomic, retain) NSMutableArray<UIPreviewAction*> *actions;

/**
    The title of the preview action group.
 */
@property(nonatomic, retain) NSString *title;

/**
    The style of the preview action group.
 */
@property(nonatomic, assign) UIPreviewActionStyle style;

/**
    Returns a configured preview action group.
    @return The configured UIPreviewActionGroup.
 */
-(UIPreviewActionGroup*)actionGroup;

@end
#endif
#endif