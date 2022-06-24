// Init
import React, { useContext, useState, createContext } from "react";

// Initializing Create Context Hook
const storeContext = createContext();
const storeUpdateContext = createContext();

// We are also initializing useContexts here then we only call these functions where we need that data
export function Store() {
  return useContext(storeContext);
}

export function UpdateStore() {
  return useContext(storeUpdateContext);
}

// Initializing Store Provider
export function StoreProvider({ children }) {
  // Initializing State
  let [store, setStore] = useState({
    // Globals
    isSideBar: true,
    sideBarSelectIndex: 0,

    // All Tickets Screen
    allTickets: {
      isLoading: true,
      recentTickets: [],
      pendingTickets: [],
      inProgressTickets: [],
      completedTickets: [],
    },

    // Add Ticket Screen
    addTicket: {
      isLoading: true,
      buildings: [],
      buildingLevels: [],
      categories: [],
      priorities: [],
    },

    // Statistics Screen
    statistics: {
      isLoading: true,
      data: {
        tilesData: null,
        graphicalData: [],
        buildingTickets: [],
      },
    },
  });

  const updateStore = (data) => {
    setStore((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>{children}</storeUpdateContext.Provider>
    </storeContext.Provider>
  );
}
