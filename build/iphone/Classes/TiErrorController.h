/**
 * _titaniumkookoo _titaniumkookoo Mobile
 * Copyright (c) 2009-2010 by _titaniumkookoo, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

@interface TiErrorController : UIViewController {
	
	NSString *error;
    UILabel *disclosureLabel;
    UILabel *messageLabel;
    UIButton *dismissButton;
    UIView *centerView;
    UILabel *titleLabel;
}

-(id)initWithError:(NSString*)error_;

@end
