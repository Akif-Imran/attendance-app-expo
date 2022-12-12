import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";

const _CustomDrawer = (props) => {
  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageBackground}>
          <View>
            <Text style={styles.cardTitleText}>Kamil Ali</Text>
            <Text style={styles.cardDetailsText}>Lecturer</Text>
          </View>
        </View>
        <View style={styles.drawerItemsListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <Text>Our custom text</Text>
      </View>
    </View>
  );
};

export default _CustomDrawer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
