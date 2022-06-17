import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
const VenueScreen = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.navigation.navigate("Venue Screen");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const [item, setItem] = useState([]);
  const Venues = [
    {
      name: "Bath island",
      coordinates: { latitude: 24.833953083519397, longitude: 67.03343085842236 },
    }, {
      name: "Sports timeout",
      coordinates: { latitude: 24.820073294651415, longitude: 67.04825749721357 },
    },
    {
      name: "Moin khan Academy",
      coordinates: { latitude: 24.782489417359642, longitude: 67.08938523413416 },
    },
    {
      name: "Kokan ground ",
      coordinates: { latitude: 24.87849721509179, longitude: 67.07347555488623 },
    },
    {
      name: "Eidgah ground",
      coordinates: { latitude: 24.911733149296875, longitude: 67.02990361070844 },
    },
    {
      name: "asghar ali shah",
      coordinates: { latitude: 24.93706154243435, longitude: 67.03139148372323 },
    },
    {
      name: "Phase 6 ",
      coordinates: { latitude: 24.807681537690986, longitude: 67.06091045488468 },
    },
    {
      name: "Zulfiqar avenue",
      coordinates: { latitude: 24.786884897195293, longitude: 67.0838018241985 },
    }
  ];
  const handlerSearch = (e) => {
    try {
      const arrayOfSearch = [];
      const filterValue = Venues.filter((item) => {
        let title = item?.name?.toLowerCase();
        let searchWord = e?.toLowerCase();
        if (title.includes(searchWord)) {
          arrayOfSearch?.push(item);
        }
      });
      console.log(arrayOfSearch);
      if (arrayOfSearch?.length != 0) {
        setItem(arrayOfSearch);
      } else {
      }
    } catch (error) { }
  };
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "montserrat-bold",
            paddingTop: 10,
          }}
        >
          Location
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search By Acdemy Name"
            style={styles.searchTextStyle}
            onChangeText={(e) => {
              // setSearchValue(e);
              handlerSearch(e);
              if (e.length == 0) {
                setItem(Venues);
              }
            }}
          />
          <TouchableOpacity>
            <Feather name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "90%",
            height: 620,
            marginTop: -50,
            borderWidth: 2,
          }}
        >
          <MapView
            region={{
              latitude: 24.782489417359642,
              longitude: 67.08938523413416,

            }}
            maxZoomLevel={20}
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            mapType="standard"
          >
            {item?.length == 0
              ? Venues?.map((marker) => (
                <MapView.Marker coordinate={marker.coordinates} title={marker.name} showsUserLocation={true} />
              ))
              : item?.map((marker) => (
                <MapView.Marker coordinate={marker.coordinates} title={marker.name} showsUserLocation={true}  />
              ))}
          </MapView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 30,
    backgroundColor: "#fff",
    zIndex: 999,
  },
  searchTextStyle: { fontFamily: "montserrat-bold", width: "80%" },
});

export default VenueScreen;
