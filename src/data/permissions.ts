export const permissions = [
  {
    permission: 'User.Read',
    description: 'Sign in and read user profile',
    permissionUsageType: 'Allows the app to sign in the user and access their basic profile information.',
    glr: false,
    apiScan: false,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'User.ReadWrite',
    description: 'Read and write user profile',
    permissionUsageType: 'Grants the app permission to read and modify the signed-in user’s profile information.',
    glr: false,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-3']
  },
  {
    permission: 'Mail.Read',
    description: 'Read user mail',
    permissionUsageType: 'Enables the app to access and read the user’s email messages.',
    glr: true,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Mail.Send',
    description: 'Send mail as a user',
    permissionUsageType: 'Allows the app to send email messages on behalf of the user.',
    glr: false,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-4']
  },
  {
    permission: 'Mail.ReadWrite',
    description: 'Read and write access to user mail',
    permissionUsageType: 'Grants the app permission to read, create, update, and delete the user’s email messages.',
    glr: true,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-3', 'Approver-5']
  },
  {
    permission: 'Mail.ReadBasic',
    description: 'Read basic user mail information',
    permissionUsageType: 'Allows the app to read basic properties of the user’s emails such as subject and sender, but not the full message content.',
    glr: true,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Mail.Read.Shared',
    description: 'Read shared mail',
    permissionUsageType: 'Enables the app to read email messages from mailboxes that are shared with the signed-in user.',
    glr: true,
    apiScan: true,
    permissionType: 'Delegated',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Directory.Read.All',
    description: 'Read directory data',
    permissionUsageType: 'Grants the app access to read directory data, including users, groups, and other directory objects.',
    glr: true,
    apiScan: false,
    permissionType: 'Application',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Directory.ReadWrite.All',
    description: 'Read and write directory data',
    permissionUsageType: 'Allows the app to read and modify directory data, including managing users, groups, and other objects.',
    glr: true,
    apiScan: true,
    permissionType: 'Application',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-2', 'Approver-3', 'Approver-4']
  },
  {
    permission: 'Application.Read.All',
    description: 'Read all applications',
    permissionUsageType: 'Provides the app with the ability to read the details of all applications in the directory.',
    glr: false,
    apiScan: true,
    permissionType: 'Application',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-3']
  },
  {
    permission: 'Group.Read.All',
    description: 'Read all groups',
    permissionUsageType: 'Allows the app to read all group properties and memberships in the directory.',
    glr: true,
    apiScan: false,
    permissionType: 'Application',
    approvers: ['Business Approver', 'Technical Approver', 'Approver-2', 'Approver-4', 'Approver-5']
  }
];

// Mapping approvers to names
export const approversMap = {
  'Business Approver': 'Dukenrey',
  'Technical Approver': 'Deepanraj',
  'Approver-1': 'Tyson Tesaract',
  'Approver-2': 'Tessa William',
  'Approver-3': 'Thor Ragnarok',
  'Approver-4': 'Tony Stark',
  'Approver-5': 'Steve Adams'
};
