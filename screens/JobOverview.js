import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const func = (list) => {
  return list.map((item, index) => {
    return (
      <Text key={index} style={styles.qualificationsValue}>
        - {item}
      </Text>
    );
  });
};

const JobOverview = ({ route }) => {
  console.log(route.params);
  const {
    title,
    description,
    qualifications,
    niceToHave,
    city,
    contact,
    whatYouWillDo,
  } = route.params;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.fieldLabel}>تفاصيل العمل:</Text>
      <Text style={styles.fieldValue}>{description}</Text>
      <Text style={styles.fieldLabel}>المؤهلات:</Text>
      <View style={styles.qualificationsContainer}>{func(qualifications)}</View>
      {niceToHave.length >= 1 && (
        <View style={styles.qualificationsContainer}>
          {<Text style={styles.fieldLabel}>يفضل ان يعرف:</Text>}
          {func(niceToHave)}
        </View>
      )}

      {whatYouWillDo.length >= 1 && (
        <View style={styles.qualificationsContainer}>
          <Text style={styles.fieldLabel}>انت ستعمل على:</Text>
          {func(whatYouWillDo)}
        </View>
      )}
      <Text style={styles.fieldLabel}>مكان العمل:</Text>
      <Text style={styles.fieldValue}>{city}</Text>
      <Text style={styles.fieldLabel}>التواصل:</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.fieldValue}>{contact}</Text>
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
    marginBottom: 80,
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
