/**
 * _titaniumkookoo _titaniumkookoo Mobile
 * Copyright (c) 2009-2010 by _titaniumkookoo, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiProxy.h"

@interface TiUIAlertDialogProxy : TiProxy<UIAlertViewDelegate> {
@private
    UIAlertView *alert;
    UIAlertController* alertController;
    BOOL persistentFlag;
    int cancelIndex;
    int destructiveIndex;
    int style;
}

-(void)show:(id)args;
-(void)hide:(id)args;

@end
