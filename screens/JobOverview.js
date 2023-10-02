import React from "react";

import moment from "moment";
import momentTz from "moment-timezone";
import "moment/locale/ar";

import * as Sharing from "expo-sharing";

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Share } from "react-native";
import { Button } from "react-native-elements";

const func = (list) => {
  return list.map((item, index) => {
    return (
      <Text key={index} style={styles.qualificationsValue}>
        - {item.value}
      </Text>
    );
  });
};

const JobOverview = ({ route }) => {
  // console.log(route.params);
  const {
    title,
    description,
    qualifications,
    niceToHave,
    city,
    contact,
    youDo,
    salary,
    date,
    _id,
  } = route.params;

  const shareFunction = async () => {
    try {
      const result = await Share.share({
        message: "Instagram | A time wasting application",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const newDate = momentTz.tz(date, "Asia/Baghdad").format();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          وقت النشر: &nbsp;
          {moment(newDate).locale("ar").format("h:mm a  YYYY/MM/D ")}
        </Text>
      </View>

      <View style={styles.qualificationsContainer}>
        <Text style={styles.fieldLabel}>تفاصيل العمل:</Text>
        {func(description)}
      </View>
      <Text style={styles.fieldLabel}>المؤهلات:</Text>
      <View style={styles.qualificationsContainer}>{func(qualifications)}</View>
      {niceToHave.length >= 1 && (
        <View style={styles.qualificationsContainer}>
          {<Text style={styles.fieldLabel}>يفضل ان يعرف:</Text>}
          {func(niceToHave)}
        </View>
      )}

      {youDo.length >= 1 && (
        <View style={styles.qualificationsContainer}>
          <Text style={styles.fieldLabel}>المهام التي ستقوم بها:</Text>
          {func(youDo)}
        </View>
      )}
      {salary && (
        <View style={styles.qualificationsContainer}>
          <Text style={styles.fieldLabel}>الراتب:</Text>
          <Text style={styles.fieldValue}>{salary}</Text>
        </View>
      )}

      <Text style={styles.fieldLabel}>مكان العمل:</Text>
      <Text style={styles.fieldValue}>{city}</Text>
      <Text style={styles.fieldLabel}>التواصل:</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.fieldValue}>{contact}</Text>
      </View>
      <View>
        <Button title="مشاركة" onPress={shareFunction} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  dateContainer: {
    marginBottom: 48,
  },
  date: {
    fontSize: 16,
    textAlign: "right",
    // fontWeight: "bold",
    fontStyle: "italic",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    marginBottom: 24,
  },
  qualificationsValue: {
    fontSize: 16,
    marginBottom: 8,
  },
  qualificationsContainer: {
    marginBottom: 24,
  },
  contactContainer: {
    alignItems: "flex-end",
    marginBottom: 48,
  },
});

export default JobOverview;
