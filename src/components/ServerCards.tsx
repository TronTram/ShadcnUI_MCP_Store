import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MCPServer } from "@/data/mcp-servers"
import { MoreVertical, Users, Clock, TrendingUp } from "lucide-react"

interface ServerCardsProps {
  servers: MCPServer[]
}

export function ServerCards({ servers }: ServerCardsProps) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>("all")

  const filteredServers = filter === "all" 
    ? servers 
    : servers.filter(server => server.category === filter)

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

  const getCategoryColor = (category: MCPServer['category']) => {
    switch (category) {
      case 'production':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'development':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'staging':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Servers
        </Button>
        <Button 
          variant={filter === "production" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("production")}
        >
          Production
        </Button>
        <Button 
          variant={filter === "development" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("development")}
        >
          Development
        </Button>
        <Button 
          variant={filter === "staging" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("staging")}
        >
          Staging
        </Button>
      </div>

      {/* Server Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServers.map((server) => (
          <Card 
            key={server.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => navigate(`/server/${server.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {server.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold truncate">
                      {server.name}
                    </CardTitle>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/server/${server.id}`)
                    }}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      {server.status === 'active' ? 'Stop' : 'Start'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Restart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex gap-2">
                <Badge className={getStatusColor(server.status)}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    server.status === 'active' ? 'bg-green-500' : 
                    server.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                  {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(server.category)}>
                  {server.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {server.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{server.users.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{server.uptime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Updated {server.lastUpdated}</span>
              </div>

              <Button 
                className="w-full" 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/server/${server.id}`)
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No servers found for the selected filter.</p>
        </div>
      )}
    </div>
  )
} 