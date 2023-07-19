import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles.style";
import Animated from "react-native-reanimated";

const Confirmation = ({ route }) => {
    const { user } = route.params;
    const { animal } = route.params;
    const handleTransferAdoption = async () => {
        console.log("Transfer adoption")
    };

    const handleNotAuthorizeAdoption = async () => {
        console.log("Not authorize adoption")
    };

    const handleGoChat = async () => {
        console.log("Go chat")
    };

    useEffect(() => {
        console.log("user", user)
        console.log("animal", animal)
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/confirmation.png')}
                style={styles.backgroundImage}
            />

            <View style={styles.circleContainer}>
                <Image
                    source={user.imageBase64}
                    style={styles.personImage}
                />
                <Image
                    source={animal.imageBase64}
                    style={styles.petImage}
                />
            </View>
            <View>
                <Text style={styles.text}>
                    Um novo amigo está interessado {"\n"}
                    em adotar o(a) {animal.name} {"\n"}
                    Confirma adoção?
                </Text>
            </View>
            <TouchableOpacity style={styles.buttonConfirmation} onPress={() => handleTransferAdoption()}>
                <Text style={styles.buttonText} >Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDisapproval} onPress={() => handleNotAuthorizeAdoption()}>
                <Text style={styles.buttonText} >Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonChat} onPress={() => handleGoChat()}>
                <Text style={styles.buttonText} >Chat</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirmation;
