import { useEffect, useState } from "react";
import { Alert, BackHandler, Button, Share, Text, TextInput, View } from "react-native";
import TextEnter from "./TextEnter";
import WordsCount from "./WordsCount";

type SecondLabProps = {
    onBack: () => void,
}

const SecondLab = (props: SecondLabProps) => {

    const {
        onBack
    } = props;

    const [textEnterActive, setTextEnterActive] = useState<boolean>(false);
    const [wordsCountActive, setWordsCountActive] = useState<boolean>(false);
    const [enteredText, setEnteredText] = useState<string>('');

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            onBack();
            return true;
        })
    }, [])

    const onShare = async () => {
        try {
            if (!enteredText) {
                Alert.alert('Klaida', 'Įvestas tekstas yra tuščias', [{
                    text: 'Ok',
                    onPress: () => {}
                }]);
                return;
            }

            await Share.share({
              message: enteredText
            });
            
          } catch (error: any) {
            Alert.alert(error.message);
          }
    }

    return (
        <View>
            {!textEnterActive && !wordsCountActive &&
                <>
                    <View style={{ backgroundColor: 'grey', height: 30, marginTop: 20 }}>
                        <Text
                            style={{
                                display: "flex",
                                color: 'white',
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}>
                            {enteredText}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <View style={{ width: 240 }}>
                            <Button onPress={() => setTextEnterActive(true)} title='Įvesti norimą tekstą' />
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <View style={{ width: 240 }}>
                            <Button onPress={() => setWordsCountActive(true)} title='Suskiačiuoti žodžius' />
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <View style={{ width: 240 }}>
                            <Button onPress={onShare} title='Siųsti tekstą su rezultatais' />
                        </View>
                    </View>
                </>
            }
            {textEnterActive &&
                <TextEnter
                    text={enteredText}
                    onBack={() => setTextEnterActive(false)}
                    onSave={(text) => {
                        setEnteredText(text);
                        setTextEnterActive(false);
                    }} />
            }
            { wordsCountActive &&
                <WordsCount
                    text={enteredText}
                    onBack={(modifiedText) => {
                        setEnteredText(modifiedText);
                        setWordsCountActive(false);
                    }}
                />
            }
        </View>

    )

}

export default SecondLab;