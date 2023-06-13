import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import AnimalRegisterScreen from "../views/register/animalRegister";
import PersonalRegisterScreen from "../views/register/personalRegister";
import PetAdoption from "../views/petAdoption";
import HomeScreen from "../views/home/home";
import MyAnimals from "../views/myAnimals";
import Login from "../views/register/login";
import AnimalInfo from "../views/AnimalInfo";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../../redux/actions/signOut';

const Drawer = createDrawerNavigator();

export const CustomDrawerContent = ({ actions, ...props }) => {
  const handleSignOut = async () => {
    await actions.signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={handleSignOut}
      />
    </DrawerContentScrollView>
  );
};

const NotAuthUserDrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home"  component={HomeScreen} />
      <Drawer.Screen name="Login" component={Login}      />
    </Drawer.Navigator>
  );
};

const DrawerNavigation = ({ isValidToken, actions }) => {
  if (isValidToken) {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent actions={{ signOut }} {...props} /> } >
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
        <Drawer.Screen
          name="Meus Pets"
          component={MyAnimals}
        />
        <Drawer.Screen
          name="Adotar um Pet"
          component={PetAdoption}
        />
        <Drawer.Screen
          name="Informação Animal"
          component={AnimalInfo}
        />
      </Drawer.Navigator>
    );
  } else {
    return <NotAuthUserDrawerNavigation />;
  }
};

const mapStateToProps = state => ({
  token: state.token,
});

const ActionCreators = {
  signOut
};

const mapDispatchToProps = dispatch => ({
  actions: {
    signOut: () => bindActionCreators(ActionCreators, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);
