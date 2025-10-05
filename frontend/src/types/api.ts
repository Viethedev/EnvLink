// API Endpoints and Request/Response Types
export interface APIEndpoints {
  // AQI Data
  aqi: {
    current: '/api/aqi/current';
    forecast: '/api/aqi/forecast';
    historical: '/api/aqi/historical';
    byLocation: '/api/aqi/location';
  };
  
  // Weather Data
  weather: {
    current: '/api/weather/current';
    forecast: '/api/weather/forecast';
    byLocation: '/api/weather/location';
  };
  
  // Trip Planning
  trips: {
    plan: '/api/trips/plan';
    optimize: '/api/trips/optimize';
    history: '/api/trips/history';
  };
  
  // NASA TEMPO Data
  tempo: {
    current: '/api/tempo/current';
    historical: '/api/tempo/historical';
    coverage: '/api/tempo/coverage';
  };
  
  // Environmental Data
  environmental: {
    global: '/api/environmental/global';
    regional: '/api/environmental/regional';
    trends: '/api/environmental/trends';
  };
  
  // User Data
  user: {
    profile: '/api/user/profile';
    stats: '/api/user/stats';
    achievements: '/api/user/achievements';
    settings: '/api/user/settings';
  };
  
  // Chatbot
  chatbot: {
    chat: '/api/chat';
    suggestions: '/api/suggestions';
  };
}

// Request Types
export interface AQICurrentRequest {
  latitude: number;
  longitude: number;
  includeForecast?: boolean;
  includeHealthAdvice?: boolean;
}

export interface AQIForecastRequest {
  latitude: number;
  longitude: number;
  days?: number; // 1-7 days
  includeHourly?: boolean;
}

export interface TripPlanRequest {
  origin: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address: string;
  };
  departureTime?: string; // ISO string
  transportMode: 'driving' | 'walking' | 'cycling' | 'transit';
  preferences: {
    prioritizeAirQuality: boolean;
    avoidHighTraffic: boolean;
    maxDuration?: number;
    maxDistance?: number;
  };
}

export interface TEMPODataRequest {
  latitude: number;
  longitude: number;
  startDate?: string; // ISO string
  endDate?: string; // ISO string
  includeHistorical?: boolean;
}

// Response Types
export interface AQICurrentResponse {
  current: {
    aqi: number;
    location: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    timestamp: string;
    pollutants: {
      pm25: number;
      pm10: number;
      o3: number;
      no2: number;
      so2: number;
      co: number;
    };
    healthAdvice: {
      general: string;
      sensitiveGroups: string;
      outdoorActivities: string;
      maskRequired: boolean;
      windowsOpen: boolean;
    };
  };
  forecast?: {
    hourly: Array<{
      timestamp: string;
      aqi: number;
      pollutants: any;
    }>;
    daily: Array<{
      date: string;
      aqi: number;
      minAqi: number;
      maxAqi: number;
    }>;
  };
}

export interface TripPlanResponse {
  tripId: string;
  origin: string;
  destination: string;
  totalDuration: string;
  totalDistance: number;
  averageAQI: number;
  segments: Array<{
    location: string;
    aqi: number;
    time: string;
    duration: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    weather: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      uvIndex: number;
    };
    recommendations: string[];
  }>;
  recommendations: string[];
  createdAt: string;
}

export interface TEMPODataResponse {
  data: Array<{
    timestamp: string;
    latitude: number;
    longitude: number;
    no2: number;
    o3: number;
    hcho: number;
    aod: number;
    quality: 'high' | 'medium' | 'low';
    coverage: number;
  }>;
  coverage: {
    global: number;
    regional: number;
    local: number;
  };
  lastUpdated: string;
}

export interface EnvironmentalDataResponse {
  global: {
    co2Levels: number;
    oceanTemperature: number;
    deforestationRate: number;
    globalAQI: number;
    lastUpdated: string;
  };
  regional?: {
    region: string;
    aqi: number;
    trends: {
      co2: number;
      temperature: number;
      airQuality: number;
    };
  };
  trends: Array<{
    date: string;
    co2: number;
    temperature: number;
    aqi: number;
    deforestation: number;
  }>;
}

// Error Response Types
export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

export interface ValidationError extends APIError {
  field: string;
  value: any;
  constraint: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'aqi_update' | 'weather_update' | 'environmental_update' | 'achievement_unlocked' | 'error';
  data: any;
  timestamp: string;
}

export interface AQIUpdateMessage extends WebSocketMessage {
  type: 'aqi_update';
  data: {
    location: string;
    aqi: number;
    pollutants: any;
    timestamp: string;
  };
}

export interface AchievementUnlockedMessage extends WebSocketMessage {
  type: 'achievement_unlocked';
  data: {
    achievementId: string;
    title: string;
    description: string;
    points: number;
  };
}
