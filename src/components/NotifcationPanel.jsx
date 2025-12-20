import { useState, useEffect, useRef } from "react";
import { Bell, X, AlertTriangle, CheckCircle, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const getNotificationsByRole = (role) => {
  const baseNotifications = {
    employee: [
      { id: "1", type: "alert", title: "Safety Drill Scheduled", message: "Mandatory fire drill at 14:00 today. Report to muster station B.", time: "10 min ago", read: false },
      { id: "2", type: "success", title: "Shift Approved", message: "Your overtime request for Dec 21 has been approved.", time: "1 hour ago", read: false },
      { id: "3", type: "info", title: "Equipment Update", message: "New PPE has arrived. Collect from supply room.", time: "2 hours ago", read: true },
      { id: "4", type: "warning", title: "Weather Advisory", message: "High winds expected tomorrow. Outdoor operations may be limited.", time: "3 hours ago", read: true },
      { id: "5", type: "info", title: "Training Reminder", message: "Complete H2S certification renewal by end of month.", time: "5 hours ago", read: true },
    ],
    client: [
      { id: "1", type: "success", title: "Production Target Met", message: "Daily production exceeded target by 8%.", time: "30 min ago", read: false },
      { id: "2", type: "info", title: "Quarterly Report Ready", message: "Q4 performance report is now available for download.", time: "2 hours ago", read: false },
      { id: "3", type: "warning", title: "Maintenance Window", message: "Scheduled maintenance Dec 22-23. Minor production impact expected.", time: "1 day ago", read: true },
      { id: "4", type: "success", title: "Contract Milestone", message: "Phase 2 drilling completed ahead of schedule.", time: "2 days ago", read: true },
    ],
    supervisor: [
      { id: "1", type: "alert", title: "Crew Member Absent", message: "John Smith reported sick. Shift coverage needed for Platform A.", time: "15 min ago", read: false },
      { id: "2", type: "warning", title: "Equipment Inspection Due", message: "BOP inspection deadline in 48 hours.", time: "1 hour ago", read: false },
      { id: "3", type: "success", title: "Safety Milestone", message: "Team achieved 180 days without recordable incident.", time: "2 hours ago", read: false },
      { id: "4", type: "info", title: "Schedule Update", message: "Night shift rotation updated for next week.", time: "4 hours ago", read: true },
      { id: "5", type: "alert", title: "Permit Expiring", message: "Hot work permit for Deck C expires in 6 hours.", time: "5 hours ago", read: true },
    ],
    admin: [
      { id: "1", type: "alert", title: "System Alert", message: "Backup power generator showing irregular readings.", time: "5 min ago", read: false },
      { id: "2", type: "warning", title: "Budget Review", message: "Monthly expenditure at 92% of allocated budget.", time: "30 min ago", read: false },
      { id: "3", type: "success", title: "Audit Completed", message: "Environmental compliance audit passed with no findings.", time: "2 hours ago", read: false },
      { id: "4", type: "info", title: "Vendor Contract", message: "Supply vessel contract renewal due in 15 days.", time: "3 hours ago", read: true },
      { id: "5", type: "alert", title: "Security Update", message: "System security patch available. Schedule deployment.", time: "6 hours ago", read: true },
      { id: "6", type: "info", title: "Personnel Update", message: "3 new crew members arriving with next helicopter.", time: "1 day ago", read: true },
    ],
  };

  return baseNotifications[role] || [];
};

const getIcon = (type) => {
  switch (type) {
    case "alert":
      return <AlertTriangle className="w-4 h-4" />;
    case "success":
      return <CheckCircle className="w-4 h-4" />;
    case "warning":
      return <Clock className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

const getTypeStyles = (type) => {
  switch (type) {
    case "alert":
      return "text-destructive bg-destructive/10";
    case "success":
      return "text-success bg-success/10";
    case "warning":
      return "text-warning bg-warning/10";
    default:
      return "text-accent bg-accent/10";
  }
};

const showToastForNotification = (notification) => {
  const toastOptions = {
    description: notification.message,
    duration: 5000,
  };

  if (notification.type === "alert") toast.error(notification.title, toastOptions);
  else if (notification.type === "success") toast.success(notification.title, toastOptions);
  else if (notification.type === "warning") toast.warning(notification.title, toastOptions);
  else toast.info(notification.title, toastOptions);
};

const getRandomNotification = (role) => {
  const notifications = {
    employee: [
      { id: Date.now().toString(), type: "alert", title: "Emergency Assembly", message: "Report to muster station immediately.", time: "Just now", read: false },
      { id: Date.now().toString(), type: "info", title: "Meal Time", message: "Lunch is now being served in the galley.", time: "Just now", read: false },
      { id: Date.now().toString(), type: "success", title: "Task Completed", message: "Your maintenance report has been submitted.", time: "Just now", read: false },
    ],
    client: [
      { id: Date.now().toString(), type: "success", title: "Production Update", message: "Hourly production rate increased by 5%.", time: "Just now", read: false },
      { id: Date.now().toString(), type: "info", title: "Market Update", message: "Oil prices up 2.3% in morning trading.", time: "Just now", read: false },
    ],
    supervisor: [
      { id: Date.now().toString(), type: "warning", title: "Crew Alert", message: "Team B requesting additional personnel.", time: "Just now", read: false },
      { id: Date.now().toString(), type: "alert", title: "Equipment Warning", message: "Pump station 3 showing elevated temperature.", time: "Just now", read: false },
    ],
    admin: [
      { id: Date.now().toString(), type: "alert", title: "System Warning", message: "Network latency detected on monitoring systems.", time: "Just now", read: false },
      { id: Date.now().toString(), type: "info", title: "Compliance Update", message: "New safety regulations published.", time: "Just now", read: false },
    ],
  };

  const roleNotifications = notifications[role] || notifications.employee;
  return roleNotifications[Math.floor(Math.random() * roleNotifications.length)];
};

export const NotificationPanel = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(getNotificationsByRole(role));
  const previousRole = useRef(role);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (previousRole.current !== role) {
      setNotifications(getNotificationsByRole(role));
      previousRole.current = role;
    }
  }, [role]);

  useEffect(() => {
    const pushNotification = () => {
      const newNotification = getRandomNotification(role);
      setNotifications((prev) => [newNotification, ...prev]);
      showToastForNotification(newNotification);
    };

    const initialTimeout = setTimeout(pushNotification, 8000);
    const interval = setInterval(pushNotification, 20000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [role]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 sm:w-96 bg-background border-2 border-primary/20 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-primary/10">
            <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-primary hover:bg-primary/10"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-96 bg-popover">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        "p-4 hover:bg-secondary/50 cursor-pointer transition-all duration-200 relative group",
                        !notification.read && "bg-primary/5 border-l-2 border-l-primary"
                      )}
                    >
                      <div className="flex gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                            getTypeStyles(notification.type)
                          )}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "text-sm font-medium text-foreground",
                              !notification.read && "font-semibold"
                            )}>
                              {notification.title}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                            >
                              <X className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
};