import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper'
import styles from './styles.style';
import AddPhoto from '../../../components/addPhoto';
import { create as createAnimal } from '../../../../services/animal';
import { storage } from '../../../../database/firebaseDb';
import { ref, uploadBytes, uploadString } from 'firebase/storage';
import { get, getCurrentUser } from '../../../../services/user';

const AnimalRegisterScreen = ({ navigation }) => {
    const [checked1, setChecked1]   = useState(false);
    const [checked2, setChecked2]   = useState(false);
    const [checked3, setChecked3]   = useState(false);
    const [checked4, setChecked4]   = useState(false);
    const [checked5, setChecked5]   = useState(false);
    const [checked6, setChecked6]   = useState(false);
    const [checked7, setChecked7]   = useState(false);
    const [checked8, setChecked8]   = useState(false);
    const [checked9, setChecked9]   = useState(false);
    const [checked10, setChecked10] = useState(false);

    const [checked01, setChecked01] = useState(false);
    const [checked02, setChecked02] = useState(false);
    const [checked03, setChecked03] = useState(false);
    const [checked04, setChecked04] = useState(false);
    const [checked05, setChecked05] = useState(false);
    const [checked06, setChecked06] = useState(false);
    const [checked07, setChecked07] = useState(false);

    const [temperance, setTemperance] = useState([]);
    const [guard, setGuard] = useState([]);
    const [health, setHealth] = useState([]);

    const [specie, setSpecie]       = useState('');
    const [gender, setGender]       = useState('');
    const [animal, setAnimal]       = useState({});
    const [name, setName]           = useState('');
    const [size, setSize]           = useState('');
    const [age, setAge]             = useState('');
    const [file, setFile]           = useState({ imagePath: 'animals/', base64: '' });

    const handleRegister = async () => {
        const aleatoryNumber = getRandomNumber(0, 10000);
        const imageRef = file.imagePath + name + aleatoryNumber;
        const userId = (await getCurrentUser()).uid;
        const userName = await get(userId).name;
        const user = {user: userName}
        const animal = { name, specie, gender, size, age, temperance, guard, health, imageRef };
        createAnimal(animal, user);
        sendPhoto(imageRef);
        cleanAnimalFields();
    };

    const sendPhoto = async (imageRef) => {
        await uploadString(ref(storage, imageRef), file.base64, 'base64')
        .then((snapshot) => {
            console.log('File uploaded successfully!');
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    };

    const handleImageChange = (image) => {
        setFile(previous => ({
            ...previous,
            ...{ base64: image }
          }));
    };

    const cleanAnimalFields = () => {
        setAnimal({});
        setSpecie('');
        setGender('');
        setName('');
        setSize('');
        setAge('');
        setTemperance();
        setChecked1(false);
        setTemperance();
        setChecked2(false);
        setTemperance();
        setChecked3(false);
        setGuard();
        setChecked4(false);
        setGuard();
        setChecked5(false);
        setGuard();
        setChecked6(false);
        setHealth();
        setChecked7(false);
        setHealth();
        setChecked8(false);
        setHealth();
        setChecked9(false);
        setHealth();
        setChecked10(false);
        setChecked01(false);
        setChecked02(false);
        setChecked03(false);
        setChecked04(false);
        setChecked05(false);
        setChecked06(false);
        setChecked07(false);
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.textInfo}>Tenho interesse em cadastrar animar para:</Text>
                </View>
                <SafeAreaView style={styles.inLine}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText} >ADOÇÃO</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <Text style={styles.spaceWithLine}></Text>
                <Text style={styles.bold}>Adoção</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Animal"
                    value={name}
                    onChangeText={setName}
                />
                <Text>Fotos do animal</Text>
                <AddPhoto onValueChange={handleImageChange} />
                <RadioButton.Group onValueChange={specie => setSpecie(specie)} value={specie}>
                    <Text>Espécie</Text>
                    <View style={styles.row}>
                        <RadioButton.Item label="Cachorro" value="Cachorro" style={styles.margin} />
                        <RadioButton.Item label="Gato" value="Gato" style={styles.margin} />
                    </View>
                </RadioButton.Group>
                <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
                    <Text>Sexo</Text>
                    <View style={styles.row}>
                        <RadioButton.Item label="Macho" value="Macho" style={styles.margin} />
                        <RadioButton.Item label="Fêmea" value="Fêmea" style={styles.margin} />
                    </View>
                </RadioButton.Group>
                <RadioButton.Group onValueChange={size => setSize(size)} value={size}>
                    <Text>Porte</Text>
                    <View style={styles.row}>
                        <RadioButton.Item label="Pequeno" value="Pequeno" style={styles.margin} />
                        <RadioButton.Item label="Médio" value="Médio" style={styles.margin} />
                        <RadioButton.Item label="Grande" value="Grande" style={styles.margin} />
                    </View>
                </RadioButton.Group>
                <RadioButton.Group onValueChange={age => setAge(age)} value={age}>
                    <Text>Idade</Text>
                    <View style={styles.row}>
                        <RadioButton.Item label="Filhote" value="Filhote" style={styles.margin} />
                        <RadioButton.Item label="Adulto" value="Adulto" style={styles.margin} />
                        <RadioButton.Item label="Idoso" value="Idoso" style={styles.margin} />
                    </View>
                </RadioButton.Group>
                <Text>Temperamento</Text>
                <View style={styles.row1}>
                    <Checkbox.Item
                        label='Brincalhão'
                        status={checked1 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTemperance(oldArray => oldArray? [...oldArray, 'Brincalhão'] : null), 
                            setChecked1(!checked1)
                        }}
                        style={styles.margin}
                    />
                    <Checkbox.Item
                        label='Tímido'
                        status={checked2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTemperance(oldArray => oldArray ? [...oldArray, 'Tímido'] : null), 
                            setChecked2(!checked2)
                        }}
                    />
                    <Checkbox.Item
                        label='Calmo'
                        status={checked3 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTemperance(oldArray => oldArray ? [...oldArray, 'Calmo'] : null), 
                            setChecked3(!checked3)
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Checkbox.Item
                        label='Guarda'
                        status={checked4 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setGuard(oldArray => oldArray ? [...oldArray, 'Guarda'] : null), 
                            setChecked4(!checked4)
                        }}
                        style={styles.margin}
                    />
                    <Checkbox.Item
                        label='Amoroso'
                        status={checked5 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setGuard(oldArray => oldArray ? [...oldArray, 'Amoroso'] : null), 
                            setChecked5(!checked5)
                        }}
                    />
                    <Checkbox.Item
                        label='Preguiçoso'
                        status={checked6 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setGuard(oldArray => oldArray ? [...oldArray, 'Preguiçoso'] : null), 
                            setChecked6(!checked6)
                        }}
                    />
                </View>
                <Text>Saúde</Text>
                <View style={styles.row}>
                    <Checkbox.Item
                        label='Vacinado'
                        status={checked7 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setHealth(oldArray => oldArray ? [...oldArray, 'Vacinado'] : null), 
                            setChecked7(!checked7)
                        }}
                        style={styles.margin}
                    />
                    <Checkbox.Item
                        label='Vermifugado'
                        status={checked8 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setHealth(oldArray =>  oldArray ? [...oldArray, 'Vermifugado'] : null), 
                            setChecked8(!checked8)
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Checkbox.Item
                        label='Castrado'
                        status={checked9 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setHealth(oldArray => oldArray ? [...oldArray, 'Castrado'] : null), 
                            setChecked9(!checked9)
                        }}
                    />
                    <Checkbox.Item
                        label='Doente'
                        status={checked10 ? 'checked' : 'unchecked'}
                        onPress={() => {setHealth(oldArray => oldArray ? [...oldArray, 'Doente'] : null), setChecked10(!checked10)}}
                    />
                </View>
                <Text>Doenças do animal</Text>
                <Text>EXIGÊNCIAS PARA ADOÇÃO</Text>
                <Checkbox.Item
                    label='Termo de adoção'
                    status={checked01 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked01(!checked01)}
                    style={styles.margin}
                />
                <Checkbox.Item
                    label='Fotos da casa'
                    status={checked02 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked02(!checked02)}
                />
                <Checkbox.Item
                    label='Visita prévia do animal'
                    status={checked03 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked03(!checked03)}
                />
                <Checkbox.Item
                    label='Acompanhamento pós adoção'
                    status={checked04 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked04(!checked04)}
                />
                <Checkbox.Item
                    label='1 mês'
                    status={checked05 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked05(!checked05)}
                />
                 <Checkbox.Item
                    label='3 meses'
                    status={checked06 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked06(!checked06)}
                />
                 <Checkbox.Item
                    label='6 meses'
                    status={checked07 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked07(!checked07)}
                />
                <TouchableOpacity 
                    onPress={() => {handleRegister(), navigation.navigate('Home')}}
                    style={styles.buttonCadastro} >
                    <Text style={styles.buttonText} >COLOCAR PARA ADOÇÃO</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
};

export default AnimalRegisterScreen;
