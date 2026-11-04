import React, { useContext, createContext, useState } from 'react';

export default function DataProvider({ children }) {

    const [updateData, setUpdateData] = useState(false);

    return (
        <DataContext.Provider value={{ updateData, setUpdateData }}>
            {children}
        </DataContext.Provider>
    );
}

export const DataContext = createContext({

    updateData: false,
    setUpdateData: () => {},
});

export function useUpdateData() {

    const context = useContext(DataContext);

    if (!context) {
        throw new Error('useUpdateData deve ser usado dentro de um DataProvider');
    }

    return context;
}