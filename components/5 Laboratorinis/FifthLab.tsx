import { useEffect, useState } from "react";
import { BackHandler, Button, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const buttons = [
    'Tekstas su A raidėmis',
    'Be iėškomo simbolio',
    'Čia yra iėškomas simbolis',
    'Nieko nebus',
    'Rasi ko iėškai',
    'Tekstas su A raidėmis',
    'Be iėškomo simbolio',
    'Čia yra iėškomas simbolis',
    'Nieko nebus',
    'Rasi ko iėškai '
]

const TextButton = (props: { text: string, onPress: (text: string) => void }) => {
    const {
        text,
        onPress,
    } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(text)}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity >
    )
}

const TextInfo = (props: { text: string }) => {
    const {
        text
    } = props;

    const [infoType, setInfoType] = useState<'A_INFO' | 'TEXT_STATISTICS' | undefined>(undefined);

    const getType = () => {
        setInfoType(text.toLowerCase().includes('a') ? 'A_INFO' : 'TEXT_STATISTICS');
    }

    useEffect(() => {
     getType();
    }, [text]);

    const letterCount = (letter: string) => {
        const initialLength = text.length;
        const replacedText = text.toLowerCase().replaceAll(letter, '');
        return initialLength - replacedText.length;
    }
    
    const lowerCaseLettersCount = () => {
        let count = 0;    
        const lithuanianLowercase = "aąbcčdeęėfghiįyjklmnoprsštuųūvzž";

        for (let i = 0; i < text.length; i++) {
            if (lithuanianLowercase.includes(text[i])) {
                count++;
            }
        }
        
        return count;
    } 

    const countVowels = () => {
        const vowels = 'aąeęėiįyouųū';
        
        let count = 0;
        let lowerCaseText = text.toLowerCase();

        for (let i = 0; i < text.length; i++) {
            if (vowels.includes(lowerCaseText[i])) {
                count++;
            }
        }
        
        return count;
    }

    if (infoType == 'A_INFO')
        return (
            <View>
                <View style={{ height: 50, backgroundColor: '#1C4E80', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Raides A(a) paiėškos fragmentas</Text>
                </View>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto', color: 'black', fontSize: 20}}>{`Šiame tekste yra ${letterCount('a')} simboliai A(a)`}</Text>
            </View>
        )

    if (infoType == 'TEXT_STATISTICS') {
        const lowerCaseLetters = lowerCaseLettersCount();
        const upperCaseLetters = text.replaceAll(' ', '').length - lowerCaseLetters;

        return (
            <View>
                <View style={{ height: 50, backgroundColor: '#1C4E80', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Teksto statistikos fragmentas</Text>
                </View>
                <Text style={{ color: 'black', fontSize: 20}}>{`Teksto ilgis: ${text.length} simbolių`}</Text>
                <Text style={{ color: 'black', fontSize: 20}}>{`Tarp jų yra: ${countVowels()} balsių`}</Text>
                <Text style={{ color: 'black', fontSize: 20}}>{`Tarp jų yra ${lowerCaseLetters} mažųjų ir ${upperCaseLetters} didžiųjų raidžių`}</Text>
            </View>
        )
    }
}

const FifthLab = (props: { onBack: () => void }) => {

    const {
        onBack
    } = props;

    const [activeButtonText, setActiveButtonText] = useState<string>();
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const handleBack = () => {
            if (history.length <= 1) return true;

            const previous = history.pop();
            setActiveButtonText(previous);

            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', handleBack);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBack);
        }
    })

    return (
        <View>
            <View style={{ height: 60, backgroundColor: '#1C4E80' }}>
                <View style={{ width: 200, height: '100%', flexDirection: 'row', marginLeft: 10, alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Button title='Atgal' onPress={onBack} />
                    <Text style={{ color: '#fff', marginLeft: 10, fontSize: 20 }}>Fragmentų pavyzdis</Text>
                </View>
            </View>
            <ScrollView style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 300 }}>
                {buttons.map(button => {
                    return (
                        <TextButton
                            text={button}
                            onPress={(text) => {
                                const updatedHistory = [...history];
                                updatedHistory.push(text);
                                setHistory(updatedHistory);
                                setActiveButtonText(text);
                            }}
                        />
                    )
                })}
            </ScrollView>
            <View style={{ width: Dimensions.get('window').width, height: 300 }}>
                {activeButtonText && <TextInfo text={activeButtonText}/>}
            </View>
        </View>
    )
}
export default FifthLab;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: '#e8e8e8'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
    },
});