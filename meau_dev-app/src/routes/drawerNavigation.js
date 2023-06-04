import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import AnimalRegisterScreen from "../views/register/animalRegister";
import PersonalRegisterScreen from "../views/register/personalRegister";
import PetAdoption from "../views/petAdoption";
import HomeScreen from "../views/home/home";
import MyAnimals from "../views/myAnimals";
import Login from "../views/register/login";
import AnimalInfo from "../views/AnimalInfo";

const Drawer = createDrawerNavigator();

export const CustomDrawerContent = (props) => {
  // const dispatch = useDispatch();

  const handleSignOut = () => {
    // dispatch(signOut());
    console.log("signOut");
    // signOut();
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

export const DrawerNavigation = ({ isValidToken }) => {
  if (isValidToken) {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
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