
// Mock user data for development and testing
export const mockUsers = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    plan: "premium",
    createdAt: "2023-01-15T10:20:30Z",
    updatedAt: "2023-09-18T16:55:33Z",
    emailVerified: true,
    twoFactorEnabled: true,
    bots: 3,
    joinDate: "2023-01-15"
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "inactive",
    plan: "free",
    createdAt: "2023-02-20T14:30:45Z",
    updatedAt: "2023-08-10T09:15:22Z",
    emailVerified: true,
    twoFactorEnabled: false,
    bots: 1,
    joinDate: "2023-02-20"
  },
  {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "active",
    plan: "premium",
    createdAt: "2023-03-10T08:45:12Z",
    updatedAt: "2023-09-01T11:20:33Z",
    emailVerified: true,
    twoFactorEnabled: true,
    bots: 5,
    joinDate: "2023-03-10"
  },
  {
    id: "user-004",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    status: "active",
    plan: "free",
    createdAt: "2023-04-05T16:22:58Z",
    updatedAt: "2023-07-25T14:58:17Z",
    emailVerified: false,
    twoFactorEnabled: false,
    bots: 0,
    joinDate: "2023-04-05"
  },
  {
    id: "user-005",
    name: "David Brown",
    email: "david.brown@example.com",
    status: "inactive",
    plan: "premium",
    createdAt: "2023-05-12T09:55:04Z",
    updatedAt: "2023-08-18T10:30:29Z",
    emailVerified: true,
    twoFactorEnabled: true,
    bots: 2,
    joinDate: "2023-05-12"
  }
];

export type MockUser = typeof mockUsers[0];
