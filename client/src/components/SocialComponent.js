// Importing Required Packages and Libraries

import React from "react";
import SocialLogin from "react-social-login";

// Functional Component for Social Login Element

function SocialComponent({ children, triggerLogin, ...props }) {
	return (
		<div onClick={triggerLogin} {...props}>
			{children}
		</div>
	);
}

// Exporting Functional Components

export default SocialLogin(SocialComponent);
