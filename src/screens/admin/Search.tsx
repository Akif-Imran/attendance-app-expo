import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { PaperTheme, colors, gStyles } from '../../theme';
import { api } from '../../helpers';
import { ApiStudentObject, ApiStudentsByClass } from '../../types';
import { useStudentContext } from '../../contexts/StudentListProvider';
import _StudentCard from './_StudentCard';
import { session } from '../../helpers/api';
import globalStyles from '../../theme/globalStyles';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [students, setStudents] = useState<ApiStudentObject[]>();
  const [filteredStudents, setFilteredStudents] = useState<ApiStudentObject[]>();

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const filtered = students?.filter((value) => value.regno.includes(query));
    setFilteredStudents(filtered);
  };

  const fetchStudents = async () => {
    setIsFetching(true);
    console.log('fetching Students', students);
    api
      .get(`/student/get-students/?session=${session}`)
      .then((res) => {
        if (res.status === 200) {
          const resData: ApiStudentObject[] = res.data;
          console.log(resData);
          setStudents(resData);
          setFilteredStudents(resData);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsFetching(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchStudents();
    return () => {};
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} theme={PaperTheme} />
      <FlatList
        data={filteredStudents}
        style={{ marginTop: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item, index }) => <_StudentCard student={item} key={item.id} />}
        ListEmptyComponent={() => (
          <View>
            {isFetching ? (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator color={colors.primary} size="large" animating={isFetching} />
              </View>
            ) : (
              <View style={styles.mainContainer}>
                <Text style={styles.title}>No match found...</Text>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={isRefreshing}
            colors={[colors.primary]}
            progressBackgroundColor={colors.white}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchStudents();
            }}
          />
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 6,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...gStyles.cardTitleText,
    textAlign: 'center',
    color: colors.titleText,
    fontFamily: 'Visby-Medium',
  },
  listContentContainer: {
    // flex: 1,
    paddingHorizontal: 2,
    // paddingBottom: 45,
  },
  cardsContainer: {
    flex: 9.5,
    // paddingHorizontal: 4,
  },
  submitButton: {
    // display: "flex",
    width: '98%',
    position: 'absolute',
    bottom: 0,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingBottom: 4,
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 50,
  },
  buttonText: {
    ...globalStyles.descText,
    color: colors.white,
  },
});
