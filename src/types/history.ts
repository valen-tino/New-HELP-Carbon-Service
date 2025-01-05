export interface HistoricalData {
    id: string;
    user_id: string;
    history_analytics: string;
    transportation_emission_data: number;
    energy_emission_data: number;
    diet_emission_data: number;
    total_emission_data: number;
    date: string;
  }
  
  export interface HistoryFilters {
    startDate: Date;
    endDate: Date;
    type?: 'transportation' | 'energy' | 'diet' | 'all';
  }