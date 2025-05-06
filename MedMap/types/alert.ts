export interface Alert {
  id: string;
  disease: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  timestamp: string;
  description: string;
  status: 'active' | 'resolved';
}

export interface AlertState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
} 