import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import _ClassCard from "../../components/_ClassCard";
import { api } from "../../helpers";
import { session } from "../../helpers/api";
import { useUserContext } from "../../contexts";
import { TeacherTaughtClassesResponse } from "../../types";
import { useFocusEffect } from "@react-navigation/native";

const ClassesList = () => {
  //get teacher credentials from context api
  const { user } = useUserContext();
  const [data, setData] = useState<TeacherTaughtClassesResponse>([]);

  const memoFetch = useCallback(() => {
    api
      .get(
        `/Teacher/get-teacher-classes?teacherId=${user?.id}&session=${session}`
      )
      .then((res) => {
        if (res.status === 200) {
          const resData: TeacherTaughtClassesResponse = res.data;
          // console.log(resData);
          setData(resData);
        }
      })
      .catch((err) => {
        console.log("error occurred");
      });
  }, [user?.id, session]);

  useFocusEffect(memoFetch);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item }) => <_ClassCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ClassesList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainerStyle: {
    paddingHorizontal: 6,
  },
});

