export interface MapState {
    selectedDisease: string | null;
    selectedRegion: string | null;
    timeRange: { start: Date; end: Date } | null;
    setSelectedDisease: (disease: string | null) => void;
    setSelectedRegion: (region: string | null) => void;
    setTimeRange: (timeRange: { start: Date; end: Date } | null) => void;
  }
  