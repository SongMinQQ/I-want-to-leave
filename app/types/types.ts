export interface ScheduleItem {
    time: string; // Use string for time, you can use Date if working with time objects
    title: string;
    content: string;
  }
  
  // Define the TripSchedule interface
export interface TripSchedule {
    startDate: Date; // Start date of the trip
    endDate: Date;   // End date of the trip
    title: string;
    image: string[]; // Array of strings (image URLs or paths)
    member: string[]; // Array of member names
    schedule: ScheduleItem[]; // Array of ScheduleItem objects
  }

  export type RootStackParamList = {
    MainContents: undefined;
    WriteTripSchedule: undefined; // 파라미터가 없는 경우
    // 다른 라우트들 추가
  };