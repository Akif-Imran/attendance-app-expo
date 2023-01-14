import { StyleSheet, Text, View } from "react-native";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { ApiStudentsByClass, StudentContextType } from "../types";

const StudentContext = createContext<StudentContextType>({
  students: [],
  setStudents: () => {},
});

const StudentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [students, setStudents] = useState<ApiStudentsByClass>([]);
  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

export const useStudentContext = () => useContext(StudentContext);

const styles = StyleSheet.create({});
