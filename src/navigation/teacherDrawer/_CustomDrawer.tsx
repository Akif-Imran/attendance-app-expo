import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import { Button } from "react-native-paper";
import { useUserContext } from "../../contexts";

const _CustomDrawer = (props) => {
  const { setIsAuthorized, setUser, user } = useUserContext();
  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageBackground}>
          <View>
            <Text style={styles.cardTitleText}>
              {user?.firstName} {user?.lastName}
            </Text>
            {/* <Text style={styles.cardDetailsText}>
              Department: {user?.deparment}
            </Text> */}
          </View>
        </View>
        <View style={styles.drawerItemsListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          color={colors.primary}
          icon="logout"
          labelStyle={globalStyles.descTextPrimaryBold}
          contentStyle={styles.buttonContentStyle}
          onPress={() => {
            setIsAuthorized(false);
            setUser(undefined);
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

export default _CustomDrawer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logoutContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    // borderWidth: 1,
  },
  buttonContentStyle: {},
  cardDetailsText: {
    ...globalStyles.cardDetailsText,
    color: colors.white,
    fontSize: 14,
  },
  cardTitleText: {
    ...globalStyles.cardTitleText,
    color: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.primary,
  },
  imageBackground: {
    backgroundColor: colors.primary,
    padding: 15,
  },
  drawerItemsListContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colors.white,
  },
});
