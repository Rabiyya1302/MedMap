import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OutbreakAlert } from '../types/api'
import { User, AuthState } from '../types/user'
import { Alert, AlertState } from '../types/alert'
import { UIState } from '../types/ui'
import { MapState } from '../types/map'

interface Store extends AuthState, MapState, AlertState, UIState {}

export const useStore = create<Store>((set) => ({
    // Auth state
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),

    // Map state
    selectedDisease: null,
    selectedRegion: null,
    timeRange: null,
    setSelectedDisease: (disease: string | null) => set({ selectedDisease: disease }),
    setSelectedRegion: (region: string | null) => set({ selectedRegion: region }),
    setTimeRange: (timeRange: { start: Date; end: Date } | null) => set({ timeRange }),

    // Alert state
    alerts: [],
    addAlert: (alert: Alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
    removeAlert: (id: string) => set((state) => ({ alerts: state.alerts.filter(alert => alert.id !== id) })),
    clearAlerts: () => set({ alerts: [] }),

    // UI state
    loading: false,
    error: null,
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error })
}))

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
            setToken: (token: string | null) => set({ token }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user })
        }
    )
)

export const useMapStore = create<MapState>()(
    persist(
        (set) => ({
            selectedDisease: null,
            selectedRegion: null,
            timeRange: null,
            setSelectedDisease: (disease: string | null) => set({ selectedDisease: disease }),
            setSelectedRegion: (region: string | null) => set({ selectedRegion: region }),
            setTimeRange: (timeRange: { start: Date; end: Date } | null) => set({ timeRange }),
        }),
        {
            name: 'map-storage',
            partialize: (state) => ({ 
                selectedDisease: state.selectedDisease,
                selectedRegion: state.selectedRegion,
                timeRange: state.timeRange 
            })
        }
    )
)

export const useAlertStore = create<AlertState>()(
    persist(
        (set) => ({
            alerts: [],
            addAlert: (alert: Alert) => 
                set((state) => ({ alerts: [...state.alerts, alert] })),
            removeAlert: (id: string) =>
                set((state) => ({ alerts: state.alerts.filter(alert => alert.id !== id) })),
            clearAlerts: () => set({ alerts: [] }),
        }),
        {
            name: 'alert-storage',
            partialize: (state) => ({ alerts: state.alerts })
        }
    )
)

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            loading: false,
            error: null,
            setLoading: (loading: boolean) => set({ loading }),
            setError: (error: string | null) => set({ error }),
        }),
        {
            name: 'ui-storage',
            partialize: (state) => ({ error: state.error })
        }
    )
) 