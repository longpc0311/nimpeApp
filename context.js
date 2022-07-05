import React, { useState } from "react";

export const Context = React.createContext();

export default ContextProvider = ({ children }) => {
	const [isActiveApp, setIsActiveApp] = useState(false);
	return <Context.Provider value={{ isActiveApp, setIsActiveApp }}>{children}</Context.Provider>;
};
