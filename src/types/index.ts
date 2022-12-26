import type { StackScreenProps } from "@react-navigation/stack";
export type AuthStackParamsList = {
    TeacherDrawer: undefined;
    ParentStack: undefined;
    StudentStack: undefined;
    Login: undefined;
}
//teacherStacks
export type TeacherStackParamsList = {
    Dashboard: undefined;
    CoursesList: undefined;
    ClassesList: {
        course: any;
    } | undefined;
    Course: undefined;
    ImageViewer: undefined;
    Notification: undefined;
    // Attendance: undefined;
    StudentList: {
        class: string;
        course: string;
    };
}
export type ParentStackParamsList = {
    Dashboard: undefined;
    CoursesList: {
        childName: string;
    };
    LectureList: {
        courseName: string;
    };
}

export type StudentStackParamsList = {
    Dashboard: undefined;
    LectureList: {
        courseName: string;
    };
}
//teacher screens
type CoursesListProps = StackScreenProps<TeacherStackParamsList, 'CoursesList'>;
export type TeacherStackScreenProps<T extends keyof TeacherStackParamsList> = StackScreenProps<TeacherStackParamsList, T>;
export type ParentStackScreenProps<T extends keyof ParentStackParamsList> = StackScreenProps<ParentStackParamsList, T>;
export type StudentStackScreenProps<T extends keyof StudentStackParamsList> = StackScreenProps<StudentStackParamsList, T>;

export type ApiUserType = {
    id: number;
    username: string;
    userType: string;
    firstName: string;
    lastName: string;
}

export type ApiTimetableSessionByDay = {
    day: string;
    weekDay: number;
    sessions: Array<ApiTimetableSession | []>
}

export type ApiTimetableSession = {
    subject: string;
    class: string;
    venue: string;
    start: string;
    stop: string;
    slot: number;
}


export type UserContextType = {
    user: ApiUserType | undefined;
    setUser: React.Dispatch<React.SetStateAction<ApiUserType | undefined>>;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}
