import React, { createContext, useState } from 'react';

export const MealplanContext = createContext();

export const MealplanProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);

    return (
        <MealplanContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </MealplanContext.Provider>
    );
};
