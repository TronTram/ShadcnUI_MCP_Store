import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Copy,
  CheckCircle,
  AlertCircle,
  Cpu,
  HardDrive,
  Network,
  MemoryStick
} from "lucide-react"
import { mcpServers, installationMethods } from "@/data/mcp-servers"
import type { MCPServer } from "@/data/mcp-servers"

export function ServerDetailPage() {
  const { serverId } = useParams<{ serverId: string }>()
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  
  const server = mcpServers.find(s => s.id === serverId)

  if (!server) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Server Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The server you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: MCPServer['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: MCPServer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/dashboard")} className="cursor-pointer">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span>{server.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Server Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {server.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{server.name}</h1>
                <p className="text-blue-100 mt-1">{server.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className={getStatusColor(server.status)}>
                    {getStatusIcon(server.status)}
                    <span className="ml-1">
                      {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/50">
                    {server.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="text-white border-white/50 hover:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              {server.status === 'active' ? (
                <>
                  <Button variant="outline" className="text-white border-white/50 hover:bg-white/20">
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                  <Button variant="outline" className="text-white border-white/50 hover:bg-white/20">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/20">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Cpu className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-100">CPU Usage</p>
                  <div className="flex items-center gap-2">
                    <Progress value={server.cpuUsage} className="w-20" />
                    <span className="text-lg font-bold">{server.cpuUsage}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MemoryStick className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-100">Memory Usage</p>
                  <div className="flex items-center gap-2">
                    <Progress value={server.memoryUsage} className="w-20" />
                    <span className="text-lg font-bold">{server.memoryUsage}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <HardDrive className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-100">Storage Usage</p>
                  <div className="flex items-center gap-2">
                    <Progress value={server.storageUsage} className="w-20" />
                    <span className="text-lg font-bold">{server.storageUsage}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Network className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-100">Network Status</p>
                  <p className="text-lg font-bold">
                    {server.networkStatus.charAt(0).toUpperCase() + server.networkStatus.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Server Information</CardTitle>
                  <CardDescription>
                    Detailed information about this MCP server instance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Server ID</p>
                      <p className="text-sm font-mono">{server.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Category</p>
                      <p className="text-sm">{server.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Users</p>
                      <p className="text-sm">{server.users.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Uptime</p>
                      <p className="text-sm">{server.uptime}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-sm mt-1">{server.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    View Server Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Export Metrics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Create Backup
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation Methods</CardTitle>
                <CardDescription>
                  Choose your preferred installation method for {server.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {installationMethods.map((method) => (
                    <Card 
                      key={method.id}
                      className={`cursor-pointer transition-all ${
                        selectedMethod === method.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <Badge variant="outline" className="mt-2">
                          {method.difficulty}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {method.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedMethod && (
                  <div className="space-y-6">
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Installation Steps - {installationMethods.find(m => m.id === selectedMethod)?.name}
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedMethod === 'docker' && (
                          <>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Step 1: Pull Docker Image</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm relative">
                                  <code>docker pull mcpservers/{server.id}:latest</code>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-2 top-2"
                                    onClick={() => copyToClipboard(`docker pull mcpservers/${server.id}:latest`)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Step 2: Run Container</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm relative">
                                  <code>docker run -d -p 8080:8080 --name {server.id} mcpservers/{server.id}:latest</code>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-2 top-2"
                                    onClick={() => copyToClipboard(`docker run -d -p 8080:8080 --name ${server.id} mcpservers/${server.id}:latest`)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </>
                        )}

                        {selectedMethod === 'npm' && (
                          <>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Step 1: Install Package</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm relative">
                                  <code>npm install -g @mcpservers/{server.id}</code>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-2 top-2"
                                    onClick={() => copyToClipboard(`npm install -g @mcpservers/${server.id}`)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Step 2: Start Server</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm relative">
                                  <code>{server.id} --port 8080</code>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-2 top-2"
                                    onClick={() => copyToClipboard(`${server.id} --port 8080`)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </>
                        )}
                      </div>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="requirements">
                        <AccordionTrigger>System Requirements</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Node.js:</strong> Version 16.0 or higher
                              </AlertDescription>
                            </Alert>
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Memory:</strong> Minimum 2GB RAM
                              </AlertDescription>
                            </Alert>
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Storage:</strong> 1GB available disk space
                              </AlertDescription>
                            </Alert>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                  Server configuration options and environment variables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configuration panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Server Logs</CardTitle>
                <CardDescription>
                  Real-time logs and monitoring information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Logs panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Server Settings</CardTitle>
                <CardDescription>
                  Advanced server configuration and management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 