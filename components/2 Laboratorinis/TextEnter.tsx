import { useEffect, useState } from "react"
import { BackHandler, Button, TextInput, View } from "react-native"

type TextEnterProps = {
    text: string,
    onSave: (text: string) => void,
    onBack: () => void,
}

const TextEnter = (props: TextEnterProps) => {

    const {
        text,
        onSave,
        onBack,
    } = props;

    const [enteredText, setEnteredText] = useState<string>(text)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            onBack();
            return true;
        });
    }, []);

    return (
        <View>
            <TextInput 
                value={enteredText} 
                placeholder='Tekstas' 
                style={{ backgroundColor: 'grey', color: 'white' }} 
                onChangeText={(text) => setEnteredText(text)}
            ></TextInput>
            <View style={{ marginTop: 10, display: "flex", flexDirection: 'row' }}>
                <View style={{ width: 150, marginLeft: 'auto'}}>
                    <Button title="Išsaugoti" onPress={() => onSave(enteredText)}></Button>
                </View>
            </View>
        </View>
    )
}

export default TextEnter;