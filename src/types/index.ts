import type { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ImageInfo } from 'expo-image-picker';
export type AuthStackParamsList = {
    TeacherDrawer: NavigatorScreenParams<TeacherDrawerParamsList>;
    StudentStack: NavigatorScreenParams<StudentStackParamsList>;
    ParentStack: NavigatorScreenParams<ParentStackParamsList>;
    AdminStack: NavigatorScreenParams<AdminDrawerParamsList>;
    Login: undefined;
};

// mark attendance Stack
export type TeacherStackParamsList = {
    Dashboard: undefined;
    // CoursesList: undefined;
    // ClassesList:
    // | {
    //     course: any;
    // }
    // | undefined;
    // Course: undefined;
    ImageViewer: {
        teacherId: number | undefined;
        courseName: string;
        className: string;
        venue: string;
        slot: number;
        jsonDate: string;
        Session: string;
        attendances: {
            regNo: string;
            status: string;
        }[];
    };
    StudentList: {
        class: string;
        course: string;
        slot: number;
        venue: string;
    };
    Notification: undefined;
};
// attendance view and update stack
export type TeacherAttendanceStackParamsList = {
    ClassesList: undefined;
    LectureList: {
        item: TeacherTaughtClassesClass;
    };
    UpdateStudentList: {
        item: TeacherTaughtClassesClass;
        lectureNo: number;
    };
    ImageViewer: {
        teacherId: number | undefined;
        courseName: string;
        className: string;
        venue: string;
        slot: number;
        jsonDate: string;
        Session: string;
        attendances: {
            regNo: string;
            status: string;
        }[];
    };
};
// teacher drawer
export type TeacherDrawerParamsList = {
    Timetable: NavigatorScreenParams<TeacherStackParamsList>;
    Notifications: undefined;
    Attendance: NavigatorScreenParams<TeacherAttendanceStackParamsList>;
};
export type TeacherAttendanceStackScreenProps<T extends keyof TeacherAttendanceStackParamsList> = StackScreenProps<
    TeacherAttendanceStackParamsList,
    T
>;
export type TeacherDrawerScreenProps<T extends keyof TeacherDrawerParamsList> = DrawerScreenProps<
    TeacherDrawerParamsList,
    T
>;
export type TeacherStackScreenProps<T extends keyof TeacherStackParamsList> = StackScreenProps<
    TeacherStackParamsList,
    T
>;

export type ParentStackParamsList = {
    Dashboard: undefined;
    CoursesList: {
        childName: string;
        courses: {
            session: string;
            course: string;
            title: string;
            percentage: string;
        }[];
    };
    LectureList: {
        courseCode: string;
        courseName: string;
    };
    Notifications: undefined;
};

export type StudentStackParamsList = {
    Dashboard: undefined;
    LectureList: {
        courseCode: string;
        courseName: string;
        attendances: StudentViewAttendanceObject[];
    };
    Notification: undefined;
};
export type AdminDrawerParamsList = {
    EnrollStack: NavigatorScreenParams<EnrollmentStackParamsList>;
    Allocate: undefined;
    Notifications: undefined;
};

export type EnrollmentStackParamsList = {
    Enroll: undefined;
    AddStudent: undefined;
    Enrollment: undefined;
}

export type StudentStackDashboardOptionsCallback = (props: {
    navigation: StudentStackScreenProps<'Dashboard'>['navigation'];
    route: StudentStackScreenProps<'Dashboard'>['route'];
}) => StackNavigationOptions;
//#region teacher screens
// type CoursesProps = StackScreenProps<TeacherStackParamsList, 'Dashboard'>;
export type ParentStackScreenProps<T extends keyof ParentStackParamsList> = StackScreenProps<ParentStackParamsList, T>;
export type StudentStackScreenProps<T extends keyof StudentStackParamsList> = StackScreenProps<StudentStackParamsList, T>;
export type AdminStackScreenProps<T extends keyof AdminDrawerParamsList> = StackScreenProps<AdminDrawerParamsList, T>;
export type EnrollmentStackScreenProps<T extends keyof EnrollmentStackParamsList> = StackScreenProps<EnrollmentStackParamsList, T>;



export type ApiUserType = 'Student' | 'Admin' | 'Parent' | 'Teacher';

export type ApiLoginResponseUser = {
    id: number;
    username: string;
    userType: ApiUserType;
    firstName: string;
    lastName: string;
};

export interface ApiLoginResponseStudent extends ApiLoginResponseUser {
    degree: string;
    discipline: string;
    section: string;
    semester: number;
    classId: number;
    regNo: string;
}

export type ApiTimetableSessionByDay = {
    day: string;
    weekDay: number;
    sessions: ApiTimetableSession[];
};

export type ApiTimetableSession = {
    subject: string;
    class: string;
    venue: string;
    start: string;
    stop: string;
    slot: number;
};
export type ApiStudentsByClass = ApiStudentObject[];

export type ApiStudentObject = {
    id: number;
    regno: string;
    firstName: string;
    lastName: string;
    semester: number;
    discipline: string;
    degree: string;
    section: string;
    classId: number;
    parentId: number;
    imageURL: string;
    status: AttendanceStatus;
    lectureCount: number;
    presentCount: number;
    latestAttendanceStatus: AttendanceStatus;
};
export type AttendanceStatus = 'present' | 'absent';
export type ChangeStatusCallbackType = (regNo: string, status: AttendanceStatus) => void;
//#endregion
export type UserContextType = {
    user: ApiLoginResponseUser | undefined;
    setUser: React.Dispatch<React.SetStateAction<ApiLoginResponseUser | undefined>>;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};
export type StudentContextType = {
    students: ApiStudentsByClass;
    setStudents: React.Dispatch<React.SetStateAction<ApiStudentsByClass>>;
};

//#region StudentStack

export type StudentViewAttendanceObject = {
    heldOnDate: string;
    lectureId: number;
    attendanceNo: number;
    status: AttendanceStatus;
    time: string;
};
export type ApiCourseWithAttendances = {
    courseCode: string;
    courseName: string;
    session: string;
    attendances: StudentViewAttendanceObject[];
    lectureCount: number;
    presentCount: number;
};
export type ApiCourseList = ApiCourseWithAttendances[];
//#endregion

export type AttendanceWithRegNo = {
    status: AttendanceStatus;
    regNo: string;
};
export type AttendancesWithRegNo = AttendanceWithRegNo[];

export type TeacherTaughtClassesLecture = {
    id: number;
    lectureSlotId: number;
    session: string;
    venue: string;
    heldOnDate: string;
};
export type TeacherTaughtClassesClass = {
    teacherId: number;
    courseCode: string;
    courseName: string;
    creditHours: number;
    classId: number;
    className: string;
    lectures: TeacherTaughtClassesLecture[];
};
export type TeacherTaughtClassesResponse = TeacherTaughtClassesClass[];
export type UpdateStudentListType = {
    attendances: ApiStudentsByClass;
    lectureImages: string[];
};

export type Pose = 'Front' | 'Left' | 'Right';
interface PoseObj {
    pose: Pose;
}
export type Features = ImageInfo & PoseObj;