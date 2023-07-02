import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AnimalRegisterScreen from "../views/register/animalRegister";
import PersonalRegisterScreen from "../views/register/personalRegister";
import PetAdoption from "../views/petAdoption";
import HomeScreen from "../views/home/home";
import MyAnimals from "../views/myAnimals";
import Login from "../views/register/login";
import AnimalInfo from "../views/AnimalInfo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOut } from "../../redux/actions/signOut";
import { Ionicons } from "@expo/vector-icons";
import { Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Chat from "../views/chat";
import Chats from "../views/chats";

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
      <Ionicons name="share" size={24} color="black" />
    </TouchableOpacity>
  );
};

export const CustomDrawerContent = ({
  actions,
  navigation,
  state,
  ...props
}) => {
  const handleSignOut = async () => {
    await actions.signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      {state.routeNames.map((routeName, index) => {
        if (routeName === "Informação Animal" || routeName === "Chat") {
          return null;
        }

        return (
          <DrawerItem
            key={routeName}
            label={routeName}
            onPress={() => navigation.navigate(routeName)}
          />
        );
      })}
      <DrawerItem label="Sair" onPress={handleSignOut} />
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
          name="Cadastro Animal"
          component={AnimalRegisterScreen}
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
