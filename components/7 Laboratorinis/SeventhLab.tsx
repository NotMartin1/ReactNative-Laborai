import { useEffect, useState } from "react";
import { BackHandler, Button, Switch, Text, View } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import DeviceInfo from "react-native-device-info";
import PushNotification from 'react-native-push-notification';


const SeventhLab = (props: { onBack: () => void }) => {

    const {
        onBack
    } = props;

    const [batteryStatusCheckActive, setBatteryStatusCheckActive] = useState<boolean>(false);
    const [batteryLevel, setBatteryLevel] = useState<number>();

    useEffect(() => {
        const handleBackPress = () => {
            onBack();
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);

    useEffect(() => {
        const fetchBatteryInfo = async () => {
            const level = await DeviceInfo.getBatteryLevel();
            setBatteryLevel(level * 100)
        };

        fetchBatteryInfo();

        const interval = setInterval(() => {
            fetchBatteryInfo();
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('battery level: ', batteryLevel);
    }, [batteryLevel])

    return (
        <View>
            <View style={{ height: 40, backgroundColor: '#1C4E80' }}>
                <Text style={{ color: '#fff', padding: 10 }}>7 Laboratorinis</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text>Sekti akumuliatoriaus lygį</Text>
                <Switch
                    onValueChange={() => setBatteryStatusCheckActive(!batteryStatusCheckActive)}
                    value={batteryStatusCheckActive}
                />
            </View>
        </View>
    )
}
export default SeventhLab;