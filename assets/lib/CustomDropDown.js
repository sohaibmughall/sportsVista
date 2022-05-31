import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { windowWidth } from "./../../src/utils/index";

const Dropdown = ({ label, data, onSelect, typeSport }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => {
    if (typeSport === "venue") {
      return (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item.Venuename)}>
          <Text>{item.Venuename}</Text>
        </TouchableOpacity>
      );
    } else if (typeSport === "team") {
      return (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item.TeamName)}>
          <Text>{item.TeamName}</Text>
        </TouchableOpacity>
      );
    } else if (typeSport === "sport") {
      return (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item.label)}>
          <Text>{item.label}</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {
          typeSport == "venue"
            ? selected || label
            : typeSport == "sport"
              ? selected || label
              : typeSport == "team"
                ? selected || label
                : label
        }
      </Text>
      <Icon style={styles.icon} type="font-awesome" name="chevron-down" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000",
  },
  buttonText: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    marginTop: -15,
    padding: 5,
    width: windowWidth / 1.2,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 3,
    backgroundColor: "#fff",
  },
});

export default Dropdown;
