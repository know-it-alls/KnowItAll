import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import StatsData from "./StatsViewComp/StatsData.js";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default class TeamSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Selected: true,
      team1Name: "",
      team2Name: "",
      team1Icon: "crimson",
      team2Icon: "steelblue",
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText = (team, text) => {
    this.setState({
      [team]: text,
    });
  };

  iconSelection(team, colorName) {
    this.setState(
      {
        [team]: colorName,
      },
      () => console.log(this.state)
    );
  }

  onSubmit() {
    let {
      team1Selected,
      team1Name,
      team2Name,
      team1Icon,
      team2Icon,
    } = this.state;

    if (team1Selected && !team1Name.length) {
      alert("Input remaining fields for Team 1");
    } else if (team1Selected) {
      this.setState({ team1Selected: false });
    }

    if (!team1Selected && !team2Name.length) {
      alert("Input remaining fields for Team 2");
    } else if (!team1Selected) {
      console.log("pass info to Stats, forward page to categoriesSelect");
    }
  }

  render() {
    let message,
      placeholderText,
      currentTeam,
      currentIcon,
      finalIcon,
      finalTeamName;

    let colors = [
      "crimson",
      "steelblue",
      "mediumseagreen",
      "gold",
      "gray",
      "purple",
    ];

    if (this.state.team1Selected) {
      message = "Enter Team 1 Name: ";
      currentTeam = "team1Name";
      currentIcon = "team1Icon";
      finalIcon = this.state.team1Icon;
      finalTeamName = this.state.team1Name;
    } else {
      message = "Enter Team 2 Name: ";
      currentTeam = "team2Name";
      currentIcon = "team2Icon";
      finalIcon = this.state.team2Icon;
      finalTeamName = this.state.team2Name;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.teamNameInput}>
          <Text style={styles.message}>{message}</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="8 Characters Max"
            maxLength={8}
            onChangeText={(text) => this.onChangeText(currentTeam, text)}
          />
        </View>

        <View style={styles.iconMenu}>
          <Text style={styles.message}>Choose an Icon!</Text>

          <View style={styles.colorSelect}>
            {colors.map((color) => {
              return (
                <TouchableOpacity
                  style={styles.inactive}
                  onPress={() => {
                    this.iconSelection(currentIcon, color);
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    size={50}
                    color={color}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewText}>Your Team Info</Text>

          {/* <View style={styles.reviewTextBox}>
            <Text style={styles.reviewText}>Team Name: {finalTeamName}</Text>
          </View> */}

          <View style={styles.reviewIconBox}>
            {/* <Text style={styles.reviewText}>Team Icon:</Text> */}
            <MaterialCommunityIcons name="circle" size={50} color={finalIcon} />
            <Text style={styles.reviewText}>{finalTeamName}</Text>
          </View>
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    // backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: 30,
  },
  // ====================
  // Partial Container Styles
  // ====================
  teamNameInput: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
  message: {
    fontSize: 40,
  },
  inputBox: {
    // borderColor: "gray",
    borderWidth: 1,
    fontSize: 30,
    width: 300,
    padding: 10,
    backgroundColor: "lightblue",
  },
  // ====================
  // Color select Styles
  // ====================
  iconMenu: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "darkred",
  },
  colorSelect: {
    flexDirection: "row",
  },
  // ====================
  // Review Styles
  // ====================
  reviewContainer: {
    alignItems: "center",
    width: "70%",
  },
  reviewText: {
    fontSize: 30,
    // what does team think of underline here
    textDecorationLine: "underline",
    lineHeight: 45,
  },
  reviewIconBox: {
    flexDirection: "row",
  },
  // ====================
  // Submit Styles
  // ====================
  submitContainer: {
    flex: 1,
    width: "70%",
    margin: 10,
    // backgroundColor: ''
  },
  submitButton: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizantal: 10,
    alignItems: "center",
  },
  submitText: {
    paddingHorizantal: 50,
    paddingVertical: 5,
    fontSize: 30,
  },
};
