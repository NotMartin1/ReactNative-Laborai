import { Alert, BackHandler, Button, Dimensions, Switch, Text, View } from "react-native";
import LabeledInput from "./LabeledInput";
import React, { useEffect, useState } from "react";
import DifficultyInput from "./DifficultyInput";
import DateTimeSpinnerPicker, { DateProps } from "./DateTimeSpinnerPicker";
import CitySelect from "./CitySelect";
import RNFS from 'react-native-fs';

type SaveData = {
    name: string,
    subDivision: string,
    difficulty: number,
    city: string,
    date: DateProps,
    register: boolean,
}

const ThirdLab = (props: { onBack: () => void }) => {

    const {
        onBack,
    } = props;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            onBack();
            return true;
        })
    }, []);

    const windowHeight = Dimensions.get('window').height;

    const [data, setData] = useState<SaveData>({ difficulty: 1, date: {
        year: 2024,
        month: 1,
        day: 1,
        hours: 0,
        minutes: 0
    } } as SaveData);

    const validate = () => {
        const invalidFields = [] as string[];

        if (!data.name)
            invalidFields.push('Pavadinimas');

        if (!data.subDivision)
            invalidFields.push('Padalinys');

        if (!data.city)
            invalidFields.push('Miestas');

        if (invalidFields.length)
        {
            Alert.alert('Klaida', `Ne visi laukai yra užpildyti: ${invalidFields.join(', ')}`, [{
                text: 'Ok',
            }]);
            return false;
        }

        return true;
    }

    const showConfirmationAlert = (content: string,) => {
        return new Promise((resolve) => {
            Alert.alert(
                'Patvirtinimas',
                 content,
                [
                    {
                        text: 'Patvirtinu, informacija teisinga',
                        onPress: () => resolve(true),
                    },
                    {
                        text: 'Informacija neteisinga',
                        onPress: () => resolve(false),
                    },
                ],
            );
        });
    };

    const onSave = async () => {
        if (!data.register) return;
        if (!validate()) return;

        const content = `Pavadinimas: ${data.name}\nSudėtingumas: ${data.difficulty}.0\nLaikas:${data.date.hours}:${data.date.minutes}:00\nData: ${data.date.year}-${data.date.month}-${data.date.day}\nPadalinys: ${data.subDivision}\nMiestas: ${data.city}`        
        const continueSave = await showConfirmationAlert(content);
        
        if (!continueSave) return;

        const path = `${RNFS.DownloadDirectoryPath}/example.txt`;
        try {
            await RNFS.writeFile(path, content, 'utf8');
            Alert.alert('', `Duomenys įrašyti sėkmingai į: ${path}`, [{ text: 'Ok '}], { cancelable: true })
        } catch (error) {
            Alert.alert('Klaida', `Nepavyko įrašyti duomenys`, [{ text: 'Ok '}], { cancelable: true })
        }
    }

    return (
        <View style={{ backgroundColor: '#7E909A', height: windowHeight }}>
            <LabeledInput onTextChange={(text) => setData({ ...data, name: text })} label="Pavadinimas"></LabeledInput>
            <LabeledInput onTextChange={(text) => setData({ ...data, subDivision: text })} label="Padalinys"></LabeledInput>
            <DifficultyInput
                difficulty={data.difficulty}
                onDifficultyChanged={(newDifficulty) => setData({ ...data, difficulty: newDifficulty })}
            />
            <View style={{ height: 10, marginTop: 5, marginBottom: 5, backgroundColor: '#1C4E80' }}></View>
            <DateTimeSpinnerPicker onChange={(date) => setData({ ...data, date: date })} date={data.date} />
            <View style={{ height: 10, marginTop: 5, marginBottom: 5, backgroundColor: '#1C4E80' }}></View>
            <CitySelect onCityChanged={(city) => setData({ ...data, city: city })} />
            <View style={{ backgroundColor: '#1C4E80', marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, color: '#fff', padding: 10 }}>Registruoti</Text>
                    <Switch
                        value={data.register}
                        onValueChange={() => setData({ ...data, register: !data.register })}
                    />
                    <View style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}>
                        <Button
                            title="Saugoti"
                            onPress={() => onSave()}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ThirdLab;