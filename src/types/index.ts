import type { StackScreenProps } from "@react-navigation/stack";
export type AuthStackParamsList = {
    TeacherStack: undefined;
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
//teacher screens
type CoursesListProps = StackScreenProps<TeacherStackParamsList, 'CoursesList'>;
export type TeacherStackScreenProps<T extends keyof TeacherStackParamsList> = StackScreenProps<TeacherStackParamsList, T>;