export interface Alert {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    date: Date;
  }
  
  export interface AlertState {
    alerts: Alert[];
    addAlert: (alert: Alert) => void;
    removeAlert: (id: string) => void;
    clearAlerts: () => void;
  }
  