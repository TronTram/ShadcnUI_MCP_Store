export interface MCPServer {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'error'
  users: number
  uptime: string
  lastUpdated: string
  category: 'production' | 'development' | 'staging'
  image: string
  cpuUsage: number
  memoryUsage: number
  storageUsage: number
  networkStatus: 'good' | 'fair' | 'poor'
}

export const mcpServers: MCPServer[] = [
  {
    id: 'mcp-auth-server',
    name: 'Authentication Server',
    description: 'Primary authentication and user management server for enterprise applications',
    status: 'active',
    users: 1247,
    uptime: '99.9%',
    lastUpdated: '2 minutes ago',
    category: 'production',
    image: '/server-icons/auth.svg',
    cpuUsage: 45,
    memoryUsage: 62,
    storageUsage: 78,
    networkStatus: 'good'
  },
  {
    id: 'mcp-data-processing',
    name: 'Data Processing Hub',
    description: 'High-performance data processing and analytics engine for real-time insights',
    status: 'active',
    users: 892,
    uptime: '98.7%',
    lastUpdated: '5 minutes ago',
    category: 'production',
    image: '/server-icons/data.svg',
    cpuUsage: 72,
    memoryUsage: 85,
    storageUsage: 45,
    networkStatus: 'good'
  },
  {
    id: 'mcp-api-gateway',
    name: 'API Gateway',
    description: 'Central API gateway managing all microservice communications and routing',
    status: 'error',
    users: 0,
    uptime: '95.2%',
    lastUpdated: '1 hour ago',
    category: 'production',
    image: '/server-icons/api.svg',
    cpuUsage: 12,
    memoryUsage: 25,
    storageUsage: 33,
    networkStatus: 'poor'
  },
  {
    id: 'mcp-file-storage',
    name: 'File Storage Service',
    description: 'Distributed file storage system with automatic backup and versioning',
    status: 'active',
    users: 2156,
    uptime: '99.5%',
    lastUpdated: '10 minutes ago',
    category: 'production',
    image: '/server-icons/storage.svg',
    cpuUsage: 38,
    memoryUsage: 56,
    storageUsage: 91,
    networkStatus: 'good'
  },
  {
    id: 'mcp-messaging-queue',
    name: 'Message Queue Server',
    description: 'Reliable message queuing system for asynchronous task processing',
    status: 'active',
    users: 567,
    uptime: '99.8%',
    lastUpdated: '3 minutes ago',
    category: 'production',
    image: '/server-icons/queue.svg',
    cpuUsage: 29,
    memoryUsage: 41,
    storageUsage: 22,
    networkStatus: 'good'
  },
  {
    id: 'mcp-dev-environment',
    name: 'Development Environment',
    description: 'Containerized development environment with hot-reload capabilities',
    status: 'inactive',
    users: 23,
    uptime: '87.3%',
    lastUpdated: '2 hours ago',
    category: 'development',
    image: '/server-icons/dev.svg',
    cpuUsage: 0,
    memoryUsage: 0,
    storageUsage: 15,
    networkStatus: 'fair'
  },
  {
    id: 'mcp-monitoring-service',
    name: 'Monitoring & Analytics',
    description: 'Real-time monitoring and alerting system for infrastructure health',
    status: 'active',
    users: 156,
    uptime: '99.9%',
    lastUpdated: '1 minute ago',
    category: 'production',
    image: '/server-icons/monitor.svg',
    cpuUsage: 52,
    memoryUsage: 67,
    storageUsage: 43,
    networkStatus: 'good'
  },
  {
    id: 'mcp-staging-proxy',
    name: 'Staging Proxy Server',
    description: 'Load balancer and proxy for staging environment testing and validation',
    status: 'inactive',
    users: 8,
    uptime: '92.1%',
    lastUpdated: '45 minutes ago',
    category: 'staging',
    image: '/server-icons/proxy.svg',
    cpuUsage: 0,
    memoryUsage: 12,
    storageUsage: 8,
    networkStatus: 'fair'
  }
]

export const installationMethods = [
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    difficulty: 'Easy',
    description: 'Run using Docker containers'
  },
  {
    id: 'npm',
    name: 'NPM',
    icon: '📦',
    difficulty: 'Easy',
    description: 'Install via Node Package Manager'
  },
  {
    id: 'binary',
    name: 'Binary',
    icon: '⚡',
    difficulty: 'Medium',
    description: 'Download and run binary directly'
  },
  {
    id: 'source',
    name: 'From Source',
    icon: '🔧',
    difficulty: 'Advanced',
    description: 'Build from source code'
  }
] 