import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 25,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

export default function LocationPDF(props) {
    let locations = props.locations;
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>Recent Search</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Location</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Lat</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Lng</Text>
              </View>
            </View>
            {locations.length > 0 && locations.map((location, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{location.info}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{location.lat}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{location.lng}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
}