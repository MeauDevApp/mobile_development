import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles.style";

const Confirmation = () => {
    const [interestedName, setInterestedName] = useState('TODO');
    const [animalName, setAnimalName] = useState('TODO');


    const handleTransferAdoption = async () => {
        console.log("Transfer adoption")
    };

    const handleNotAuthorizeAdoption = async () => {
        console.log("Not authorize adoption")
    };

    const handleGoChat = async () => {
        console.log("Go chat")
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/confirmation.png')}
                style={styles.backgroundImage}
            />
            <View>
                <Text style={styles.text}>
                    {interestedName} deseja adotar o seu pet {animalName}. {"\n"}
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
