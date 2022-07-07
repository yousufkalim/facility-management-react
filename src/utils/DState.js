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
    // priorities: [],
    assignees: [],
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

  // Add User Modal
  addUser: {
    isLoading: true,
    enterprises: [],
    buildings: [],
  },

  // All Users Screen
  allUsers: {
    isLoading: true,
    users: [],
    invitedUsers: [],
    user: null,
  },

  // Settings Screen
  settings: {
    allBuildings: {
      isLoading: true,
      buildings: [],
      building: null,
    },
    allCategories: {
      isLoading: true,
      categories: [],
      toAdd: false,
    },
  },
};

export default _;
