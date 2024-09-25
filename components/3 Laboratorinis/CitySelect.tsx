import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type CitySelectProps = {
    onCityChanged: (value: string) => void,
}

const CitySelect = (props: CitySelectProps) => {

    const {
        onCityChanged,
    } = props;

    const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Panevėžys', 'Šiauliai', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Tauragė', 'Ukmergė', 'Visaginas', 'Palanga', 'Plungė', 'Kretinga', 'Šilutė', 'Gargždai', 'Radviliškis', 'Druskininkai', 'Elektrėnai', 'Rokiškis', 'Kuršėnai', 'Jurbarkas', 'Likiškiai', 'Biržai', 'Vilkaviškis', 'Garliava', 'Grigiškės', 'Raseiniai', 'Lentvaris', 'Prienai', 'Anykščiai', 'Joniškis', 'Kaišiadorys', 'Varėna', 'Kelmė', 'Šalčininkai', 'Pasvalys', 'Kupiškis', 'Zarasai', 'Trakai', 'Širvintos', 'Molėtai', 'Šakiai', 'Skuodas', 'Ignalina', 'Šilalė', 'Pakruojis', 'Švenčionys', 'Kalvarija', 'Lazdijai', 'Rietavas', 'Birštonas', 'Nida'];
    const options = cities.map(c => ({ label: c, value: c }));

    return (
        <View>
            <Text style={{ fontSize: 20, color: '#fff', padding: 5 }}>Pasirinkite miestą</Text>
            <RNPickerSelect
                onValueChange={(value) => onCityChanged(value)}
                items={options}
                placeholder={{
                    label: 'Miestas',
                    value: null,
                    color: '#fff'
                }}
                style={{
                    inputAndroid: {
                        color: '#fff',
                        backgroundColor: '#1C4E80'
                    },
                    placeholder: {
                        color: '#fff',
                    }
                }}
            />
        </View>
    )
}

export default CitySelect;