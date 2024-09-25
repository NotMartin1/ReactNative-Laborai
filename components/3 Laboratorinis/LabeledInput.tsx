import { Text, TextInput, View } from "react-native";

type LabeledInputProps = {
    label: string,
    onTextChange: (text: string) => void,
}

const LabeledInput = (props: LabeledInputProps) => {

    const {
        label,
        onTextChange
    } = props;

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ paddingLeft: 10, width: 130, color: '#fff', marginRight: 20, fontSize: 17 }}>{label}:</Text>
            <TextInput style={{ width: 230, color: '#fff', fontSize: 16 }} underlineColorAndroid={'#1C4E80'} onChangeText={onTextChange}></TextInput>
        </View>
    )
}

export default LabeledInput;