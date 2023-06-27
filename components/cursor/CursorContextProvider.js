import React, {createContext, useState } from "react";

export const CursorContext = createContext({ active: false });

export const CursorContextProvider = ({ children }) => {

    const [cursor, setCursor] = useState({ active: false });

    return (
        <CursorContext.Provider value={[cursor, setCursor]}>
            {children}
        </CursorContext.Provider>
    );
}
