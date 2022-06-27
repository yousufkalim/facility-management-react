// Default State
const _ = {
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
    gData: {},
  },
};

export default _;
