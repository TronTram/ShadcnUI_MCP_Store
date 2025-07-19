# MCP Server Management Interface - shadcn UI Component Mapping

## 1. Login Page (/)
**Block:** `login-01` or `login-02` (complete authentication interface)

**Individual Components:**
- **card** - Login card container
- **form** - Form wrapper  
- **label** - Input field labels
- **input** - Email and password fields
- **button** - Sign in button
- **checkbox** - Remember me checkbox

## 2. Dashboard Page (/dashboard)
**Block:** `dashboard-01` (complete dashboard layout)

**Header Components:**
- **avatar** - User avatar in header
- **button** - Logout and action buttons
- **dropdown-menu** - User menu and filters

**Main Content Components:**
- **card** - Server cards grid
- **badge** - Status badges (Active/Inactive/Error)
- **button** - Action buttons (View Details, Quick Actions)
- **dropdown-menu** - Quick actions menu (⋮)

## 3. Server Detail Page (/server/:id)
**Header:**
- **breadcrumb** - Navigation breadcrumb with back button
- **progress** - CPU, Memory, Storage usage indicators
- **badge** - Status badges

**Main Content:**
- **tabs** - Navigation tabs (Overview/Installation/Configuration/Logs/Settings)
- **card** - Installation method cards and step cards
- **accordion** - Collapsible sections for requirements
- **alert** - System requirement status indicators
- **code-block** - Installation code snippets (custom component using shadcn styling)

## 4. Global Layout Components
- **sidebar** - Optional side navigation (sidebar-01 to sidebar-16 blocks)
- **separator** - Visual separators between sections
- **scroll-area** - Scrollable content areas
- **skeleton** - Loading states

## 5. Interactive Components
- **dialog** - Modals for server actions
- **sheet** - Slide-out panels for quick actions
- **tooltip** - Help text and additional information
- **command** - Search functionality
- **select** - Dropdown selections
- **switch** - Toggle controls

This mapping leverages shadcn's complete blocks for major page layouts while using individual components for detailed customization. 