import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AnimalRegisterScreen from "../views/register/animalRegister";
import PersonalRegisterScreen from "../views/register/personalRegister";
import PetAdoption from "../views/petAdoption";
import HomeScreen from "../views/home/home";
import MyAnimals from "../views/myAnimals";
import Login from "../views/register/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOut } from "../../redux/actions/signOut";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Chat from "../views/chat";
import Chats from "../views/chats";
import AnimalInfo from "../views/animalInfo";
import { getImageBase64 } from "../../services/user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Confirmation from "../views/confirmation";

const Drawer = createDrawerNavigator();

const CustomHeaderLeft = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const CustomHeaderRight = () => {
  const handleShare = () => {
    console.log(handleShare);
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-social" size={24} color="black" />
    </TouchableOpacity>
  );
};

const DropdownDrawerItem = ({ label, items, onPress, iconName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.drawerItem}>
          <Ionicons
            name={iconName}
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.label)}
            >
              <Text style={styles.dropdownItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export const CustomDrawerContent = ({
  actions,
  navigation,
  state,
  ...props
}) => {
  const [userPhoto, setUserPhoto] = useState("");
  const userStore = useSelector((state) => state.user);

  useEffect(() => {
    const getPhoto = async () => {
      const photo = await getImageBase64(userStore.user.imageRef);
      setUserPhoto(photo);
    };

    getPhoto();

    return () => {
      getPhoto();
    };
  }, [userStore]);

  const handleDropdownItemPress = () => {
    console.log("Selected item:", item);
  };

  const shortcutItems = [
    { label: "Cadastrar um pet" },
    { label: "Adotar um Pet" },
  ];

  const userItems = [{ label: "Meus Pets" }, { label: "Chats" }, { label: "Cadastro Pessoal" }];

  const settingsItems = [{ label: "Privacidade" }];

  const handleSignOut = async () => {
    await actions.signOut();
  };

  const profilePic = () => {
    return (
      <View>
        {userStore.user.imageRef !== "" ? (
          <View style={styles.card}>
            <Image style={styles.image} source={{ uri: userPhoto }} />
            <Text> {userStore.user.name} </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={require("../../assets/images/image_not_found.jpg")}
            />
            <Text> {userStore.user.name} </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View styles={styles.container}>
        {profilePic()}
        <DropdownDrawerItem
          label={userStore.user.name}
          items={userItems}
          onPress={handleDropdownItemPress}
        />
        <DropdownDrawerItem
          label="Atalhos"
          items={shortcutItems}
          onPress={handleDropdownItemPress}
          iconName="paw"
        />
        <DropdownDrawerItem
          label="Configurações"
          items={settingsItems}
          onPress={handleDropdownItemPress}
          iconName="settings"
        />
        <DrawerItem
          label="Sair"
          onPress={handleSignOut}
          labelStyle={styles.bottomItemLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const NotAuthUserDrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

const DrawerNavigation = ({ isValidToken, actions }) => {
  if (isValidToken) {
    return (
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={(props) => (
          <CustomDrawerContent
            actions={{ signOut }}
            navigation={props.navigation}
            state={props.state}
            {...props}
          />
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen
          name="Cadastro Pessoal"
          component={PersonalRegisterScreen}
        />
        <Drawer.Screen
          name="Cadastrar um pet"
          component={AnimalRegisterScreen}
          hide
        />
        <Drawer.Screen name="Meus Pets" component={MyAnimals} />
        <Drawer.Screen name="Adotar um Pet" component={PetAdoption} />
        <Drawer.Screen
          name="Informação Animal"
          component={AnimalInfo}
          options={{
            headerLeft: () => <CustomHeaderLeft />,
            headerRight: () => <CustomHeaderRight />,
          }}
        />
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={{
            headerLeft: () => <CustomHeaderLeft />,
          }}
        />
        <Drawer.Screen name="Chats" component={Chats} />
        <Drawer.Screen name="Confirmation" component={Confirmation} />
      </Drawer.Navigator>
    );
  } else {
    return <NotAuthUserDrawerNavigation />;
  }
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const ActionCreators = {
  signOut,
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    signOut: () => bindActionCreators(ActionCreators, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#88c9bf",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  bottomItemLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#88c9bf",
    paddingVertical: 10,
    width: "100%",
    bottom: 0
  },
  drawerItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "black",
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginRight: 10, // Adjust the margin value as desired
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#2D3032AD",
  },
  dropdown: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 14,
    color: "#2D3032AD",
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'lightgray',
    borderColor: 'red'
  }
});
