export interface UserProfile {
    _id: string;
    userId: string;
    transportationPreferences: {
      primaryMode: 'car' | 'bus' | 'train' | 'plane';
      averageDistance: number;
    };
    energyPreferences: {
      type: 'electricity' | 'gas' | 'oil';
      averageConsumption: number;
    };
    dietaryPreferences: {
      type: 'meat' | 'dairy' | 'vegetables';
      frequency: 'daily' | 'weekly' | 'monthly';
    };
    reminderSettings: {
      frequency: 'daily' | 'weekly' | 'monthly';
      enabled: boolean;
      lastReminder: string;
    };
    updatedAt: string;
  }
  
  export interface ProfileFormData {
    transportationPreferences: UserProfile['transportationPreferences'];
    energyPreferences: UserProfile['energyPreferences'];
    dietaryPreferences: UserProfile['dietaryPreferences'];
    reminderSettings: Omit<UserProfile['reminderSettings'], 'lastReminder'>;
  }