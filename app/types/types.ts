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