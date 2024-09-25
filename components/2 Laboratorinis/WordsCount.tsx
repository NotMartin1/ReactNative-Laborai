import { useEffect, useState } from "react";
import { Alert, BackHandler, Button, Text, View } from "react-native";

type WordsCountProps = {
    text: string,
    onBack: (modifiedText: string) => void,
}

const WordsCount = (props: WordsCountProps) => {

    const {
        text,
        onBack,
    } = props;

    const [modifiedText, setModifiedText] = useState<string>(text);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            onBack(modifiedText);
            return true;
        });
    })

    const countWords = () => {
        if (!modifiedText) {
            Alert.alert('Klaida', 'Įvestas tekstas yra tuščias', [{
                text: 'Ok',
                onPress: () => { }
            }]);
            return;
        }

        const wordCount = modifiedText.split(" ").length;

        setModifiedText(`Sakinyje: "${modifiedText}" esti ${wordCount} žodžiai`);
    }

    return (
        <View>
            <View>
                <Text style={{
                    backgroundColor: 'grey',
                    height: 25,
                    color: 'white',
                    fontSize: 15
                }}>{modifiedText}
                </Text>
            </View>
            <View style={{ width: 150, marginLeft: 'auto', marginTop: 10 }}>
                <Button onPress={() =>  countWords()} title="Suskaičiuoti"></Button>
            </View>
        </View>
    )
}

export default WordsCount;