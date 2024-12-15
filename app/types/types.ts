export interface ScheduleItem {
    time: string; // Use string for time, you can use Date if working with time objects
    title: string;
    content: string;
  }
  
  // Define the TripSchedule interface
export interface TripSchedule {
    startDate: string; // Start date of the trip
    endDate: string;   // End date of the trip
    title: string;
    information: string;
    image: string[]; // Array of strings (image URLs or paths)
    member: string[]; // Array of member names
    schedule: { 
      date: string; 
      timelines: { time: Date; title: string; content: string }[] 
    }[]; // Array of ScheduleItem objects
  }

  export type RootStackParamList = {
    MainContents: undefined;
    WriteTripSchedule?: { selectedImage: string }; // 파라미터가 없는 경우
    ImageSelect: undefined;
    SelectScheduleImage: undefined;
    GoogleLogin: { loginuri: string };
    Main: undefined,
    mypage: undefined,
    TravelDetailNavigation: {travelCode: number}
    // 다른 라우트들 추가
  };

export interface TravelInfo {
  endDate: string;
  imageUrl: string;
  startDate: string;
  travelCode: number;
  travelContent: string;
  travelName: string;
  userNicknames: string[];
}

interface Schedule {
  date: string; // e.g., "2024-12-15"
  timeLines: any[]; // Replace `any` with the specific type if known
}
export interface travelDetail {
  createdAt: string; // e.g., "2024-12-15T16:16:26.000+00:00"
  deletedAt: string | null; // e.g., null or "2024-12-15T16:16:26.000+00:00"
  endDate: string; // e.g., "2024-12-15"
  imageUrl: string[]; // Array of image URLs
  information: string; // e.g., "제주도"
  isDeleted: boolean; // e.g., false
  preparation: any[]; // Replace `any` with the specific type if known
  schedule: Schedule[]; // Array of schedules
  startDate: string; // e.g., "2024-12-15"
  title: string; // e.g., "여행가자"
  travelCode: number; // e.g., 34
  usernames: string[];
}