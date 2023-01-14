import type { StackNavigationOptions, StackScreenProps } from "@react-navigation/stack";
export type AuthStackParamsList = {
    TeacherDrawer: undefined;
    ParentStack: undefined;
    StudentStack: undefined;
    Login: undefined;
};
//teacherStacks
export type TeacherStackParamsList = {
    Dashboard: undefined;
    CoursesList: undefined;
    ClassesList:
    | {
        course: any;
    }
    | undefined;
    Course: undefined;
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
        }[],
    };
    Notification: undefined;
    // Attendance: undefined;
    StudentList: {
        class: string;
        course: string;
        slot: number;
        venue: string;
    };
};
export type ParentStackParamsList = {
    Dashboard: undefined;
    CoursesList: {
        childName: string;
    };
    LectureList: {
        courseName: string;
    };
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
export type StudentStackDashboardOptionsCallback =
    (props: {
        navigation: StudentStackScreenProps<"Dashboard">["navigation"],
        route: StudentStackScreenProps<"Dashboard">["route"]
    }) => StackNavigationOptions;
//#region teacher screens
type CoursesListProps = StackScreenProps<TeacherStackParamsList, "CoursesList">;
export type TeacherStackScreenProps<T extends keyof TeacherStackParamsList> =
    StackScreenProps<TeacherStackParamsList, T>;
export type ParentStackScreenProps<T extends keyof ParentStackParamsList> =
    StackScreenProps<ParentStackParamsList, T>;
export type StudentStackScreenProps<T extends keyof StudentStackParamsList> =
    StackScreenProps<StudentStackParamsList, T>;

export type ApiUserType = "Student" | "Admin" | "Parent" | "Teacher";

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
export type AttendanceStatus = "present" | "absent";
export type ChangeStatusCallbackType = (
    regNo: string,
    status: AttendanceStatus
) => void;
//#endregion
export type UserContextType = {
    user: ApiLoginResponseUser | undefined;
    setUser: React.Dispatch<
        React.SetStateAction<ApiLoginResponseUser | undefined>
    >;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};
export type StudentContextType = {
    students: ApiStudentsByClass;
    setStudents: React.Dispatch<React.SetStateAction<ApiStudentsByClass>>;
}

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
