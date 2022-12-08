import type { StackScreenProps } from "@react-navigation/stack";
export type AuthStackParamsList = {
    TeacherStack: undefined;
    ParentStack: undefined;
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
    Notification: undefined;
    // Attendance: undefined;
    StudentList: undefined;
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
//teacher screens
type CoursesListProps = StackScreenProps<TeacherStackParamsList, 'CoursesList'>;
export type TeacherStackScreenProps<T extends keyof TeacherStackParamsList> = StackScreenProps<TeacherStackParamsList, T>;
export type ParentStackScreenProps<T extends keyof ParentStackParamsList> = StackScreenProps<ParentStackParamsList, T>;