import React, { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Activity,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  House,
  BarChart3,
  MessageSquare,
  Shield,
  Star,
  Clock,
  ChevronRight,
  Zap,
  Target,
  Award,
  Briefcase,
} from "lucide-react";

import { supabase } from "../lib/supabase";

// Sidebar Component
const Sidebar = ({ isOpen, onClose, onSignOut }) => {
  const [activeItem, setActiveItem] = useState("overview");

  const menuItems = [
    { id: "overview", icon: House, label: "Overview", badge: null },
    { id: "projects", icon: FileText, label: "Projects", badge: "12" },
    { id: "team", icon: Users, label: "Team", badge: "24" },
    { id: "analytics", icon: BarChart3, label: "Analytics", badge: null },
    { id: "messages", icon: MessageSquare, label: "Messages", badge: "3" },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300/10 backdrop-blur-[1px] z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Dashboard
              </h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeItem === item.id
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:transform hover:scale-102"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    activeItem === item.id ? "text-white" : ""
                  }`}
                />
                <span
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  className="font-medium"
                >
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    activeItem === item.id
                      ? "bg-white bg-opacity-20 text-red-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:transform hover:scale-105 group"
          >
            <LogOut className="w-5 h-5 group-hover:transform group-hover:scale-110" />
            <span
              style={{ fontFamily: "Montserrat, sans-serif" }}
              className="font-medium"
            >
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

// Top Header Component
const TopHeader = ({ userName, onMenuClick, sidebarOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                sidebarOpen
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Welcome back, {userName}! 👋
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <p
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="hidden sm:flex items-center space-x-1 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-48 lg:w-64 transition-all duration-200 text-gray-900 placeholder-gray-500"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              />
            </div>

            <button
              onClick={handleNotificationClick}
              className="p-2 hover:bg-gray-100 rounded-xl relative transition-all duration-200 hover:transform hover:scale-110"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-all duration-200 hover:transform hover:scale-110">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Stats Cards Component
const StatsCards = () => {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);

  const quickStats = [
    {
      icon: Users,
      label: "Team Members",
      value: 24,
      color: "text-blue-600",
      bg: "bg-blue-100",
      change: "+12%",
    },
    {
      icon: FileText,
      label: "Active Projects",
      value: 12,
      color: "text-green-600",
      bg: "bg-green-100",
      change: "+8%",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: 23,
      color: "text-purple-600",
      bg: "bg-purple-100",
      change: "+23%",
    },
    {
      icon: Target,
      label: "Goals Completed",
      value: 8,
      color: "text-red-600",
      bg: "bg-red-100",
      change: "+15%",
    },
  ];

  useEffect(() => {
    const timers = quickStats.map((stat, index) => {
      return setTimeout(() => {
        let current = 0;
        const increment = stat.value / 20;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });
        }, 50);
      }, index * 200);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer hover:transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-gray-600 text-xs sm:text-sm mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {stat.label}
              </p>
              <div className="flex items-end space-x-2">
                <p
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                  style={{ fontFamily: "Unbounded, sans-serif" }}
                >
                  {animatedValues[index]}
                  {stat.label.includes("Growth") || stat.label.includes("Goals")
                    ? "%"
                    : ""}
                </p>
                <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
            <div
              className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// User Profile Card Component
const UserProfileCard = ({ session }) => {
  const userName =
    session.user.user_metadata?.name || session.user.email.split("@")[0];
  const userEmail = session.user.email;
  const joinDate = new Date(session.user.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="text-center">
        <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4 hover:transform hover:scale-110 transition-transform duration-300 cursor-pointer">
          {userName.charAt(0).toUpperCase()}
        </div>
        <h3
          className="text-lg sm:text-xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "Unbounded, sans-serif" }}
        >
          {userName}
        </h3>
        <p
          className="text-gray-600 mb-4 text-sm sm:text-base"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {userEmail}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4" />
            <span
              className="text-xs sm:text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Joined {joinDate}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Shield className="w-4 h-4" />
            <span
              className="text-xs sm:text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Verified Account
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-yellow-600">
            <Star className="w-4 h-4 fill-current" />
            <span
              className="text-xs sm:text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Premium Member
            </span>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      action: "Updated project dashboard",
      time: "2 hours ago",
      icon: FileText,
      type: "update",
    },
    {
      id: 2,
      action: "Added new team member",
      time: "4 hours ago",
      icon: Users,
      type: "add",
    },
    {
      id: 3,
      action: "Completed task review",
      time: "6 hours ago",
      icon: Activity,
      type: "complete",
    },
    {
      id: 4,
      action: "Sent weekly report",
      time: "1 day ago",
      icon: Mail,
      type: "send",
    },
    {
      id: 5,
      action: "Achievement unlocked",
      time: "2 days ago",
      icon: Award,
      type: "achievement",
    },
  ]);

  const getActivityColor = (type) => {
    switch (type) {
      case "update":
        return "from-blue-100 to-blue-200 text-blue-600";
      case "add":
        return "from-green-100 to-green-200 text-green-600";
      case "complete":
        return "from-purple-100 to-purple-200 text-purple-600";
      case "send":
        return "from-yellow-100 to-yellow-200 text-yellow-600";
      case "achievement":
        return "from-pink-100 to-pink-200 text-pink-600";
      default:
        return "from-gray-100 to-gray-200 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-lg sm:text-xl font-bold text-gray-900"
          style={{ fontFamily: "Unbounded, sans-serif" }}
        >
          Recent Activity
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
            All
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105 text-sm">
            <Plus className="w-4 h-4 inline mr-1" />
            Add New
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto overflow-x-hidden px-4 scrollbar-custom">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer hover:transform hover:scale-102 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`p-2 bg-gradient-to-r ${getActivityColor(
                activity.type
              )} rounded-lg group-hover:scale-110 transition-transform duration-200`}
            >
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-gray-900 font-medium text-sm sm:text-base truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {activity.action}
              </p>
              <p
                className="text-gray-500 text-xs sm:text-sm"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {activity.time}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "New Project",
      color: "hover:border-red-300 hover:bg-red-50",
      textColor: "group-hover:text-red-600",
    },
    {
      icon: Users,
      label: "Invite Team",
      color: "hover:border-orange-300 hover:bg-orange-50",
      textColor: "group-hover:text-orange-600",
    },
    {
      icon: FileText,
      label: "Create Report",
      color: "hover:border-green-300 hover:bg-green-50",
      textColor: "group-hover:text-green-600",
    },
    {
      icon: Briefcase,
      label: "New Task",
      color: "hover:border-blue-300 hover:bg-blue-50",
      textColor: "group-hover:text-blue-600",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      color: "hover:border-yellow-300 hover:bg-yellow-50",
      textColor: "group-hover:text-yellow-600",
    },
    {
      icon: Settings,
      label: "Settings",
      color: "hover:border-purple-300 hover:bg-purple-50",
      textColor: "group-hover:text-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3
        className="text-lg sm:text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "Unbounded, sans-serif" }}
      >
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`p-4 border-2 border-dashed border-gray-300 rounded-xl ${action.color} transition-all duration-200 text-center group hover:transform hover:scale-105`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <action.icon
              className={`w-6 sm:w-8 h-6 sm:h-8 text-gray-400 ${action.textColor} mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}
            />
            <span
              className={`text-xs sm:text-sm text-gray-600 ${action.textColor} transition-colors duration-200`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Home Component
const Home = ({ session }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userName =
    session.user.user_metadata?.name || session.user.email.split("@")[0];

  const handleSignOut = async () => {
    try {
      // Mock sign out - in real app this would use supabase
      console.log("Signing out...");
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        onSignOut={handleSignOut}
      />

      <div className="lg:ml-72 transition-all duration-300">
        <TopHeader
          userName={userName}
          onMenuClick={handleMenuClick}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <StatsCards />

          <div className="grid grid-cols-1 laptop-change lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1 space-y-6">
              <UserProfileCard session={session} />
            </div>

            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </div>

          <QuickActions />
        </main>
      </div>
    </div>
  );
};

export default Home;
