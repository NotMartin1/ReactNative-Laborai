import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MenuView } from "@react-native-menu/menu";
import { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Button, Modal, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { MoreVertical } from "react-native-feather";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Picker } from "react-native-wheel-pick";

type MenuProps = {
    buttons: {
        onClick: () => void,
        title: string,
    }[],
    style?: StyleProp<ViewStyle>
    close: () => void,
}

const Menu = (props: MenuProps) => {
    const {
        style,
        buttons,
        close
    } = props;

    return (
        <Modal transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.menuStyle, style]}>
                            <View style={[{ width: 150, backgroundColor: '#fafafa', zIndex: 100 }]}>
                                {buttons.map(button => {
                                    return (
                                        <TouchableOpacity style={{ padding: 10 }} onPress={button.onClick}><Text style={{ color: 'black' }}>{button.title}</Text></TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

type TimePickerProps = {
    onSave: (hours: number, minutes: number) => void,
}

const TimePicker = (props: TimePickerProps) => {

    const {
        onSave
    } = props;

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i); 4

    const [selectedHour, setSelectedHour] = useState<number>(hours[0]);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(minutes[0]);

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                    <Text style={{ color: 'white', marginLeft: 'auto', marginRight: 'auto' }}>Valandos</Text>
                    <Picker
                        pickerData={hours}
                        textColor='black'
                        style={{
                            width: 150,
                        }}
                        onValueChange={(index: number) => setSelectedHour(hours[index])}
                    />
                </View>
                <View>
                    <Text style={{ color: 'white', marginLeft: 'auto', marginRight: 'auto' }}>Minutės</Text>
                    <Picker
                        pickerData={minutes}
                        textColor='black'
                        style={{
                            width: 150,
                        }}
                        onValueChange={(index: number) => setSelectedMinutes(minutes[index])}
                    />
                </View>
            </View>
            <View>
                <Button title="Išsaugoti" onPress={() => onSave(selectedHour, selectedMinutes)}></Button>
            </View>
        </View>
    )
}

const SymbolViewer = (props: { text: string }) => {
    const {
        text
    } = props;

    const [activeSymbol, setActiveSymbol] = useState<string>();
    const timerRef = useRef<NodeJS.Timeout>();

    const iteratePerSymbols = (index: number) => {
        if (index >= text.length) return;

        const timeoutId = setTimeout(() => {
            setActiveSymbol(text[index]);
            iteratePerSymbols(index + 1);
        }, 1000);

        timerRef.current = timeoutId; 
    }

    useEffect(() => {
        iteratePerSymbols(0);
        
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [text]);

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20 }}>Simbolis: </Text>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, backgroundColor: '#1C4E80', width: 20, height: 30, textAlign: 'center', color: '#fff' }}>{activeSymbol}</Text>
            </View>
        </View>
    )
}

const SixthLab = (props: { onBack: () => void }) => {

    const {
        onBack
    } = props;

    useEffect(() => {
        const handleBackPress = () => {
            onBack();
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [])

    const [differenceMenuOpened, setDifferenceMenuOpened] = useState<boolean>(false);
    const [closeAppMenuOpened, setCloseAppMenuOpened] = useState<boolean>(false);
    const [timePickerActive, setTimePickerActive] = useState<boolean>(false);
    const [differenceText, setDifferenceText] = useState<string>();
    const [activeTextMenu, setActiveTextMenu] = useState<string>();
    const [symbolCountText, setSymbolCountText] = useState<string | undefined>(undefined);
    const [symbolViewText, setSymbolViewText] = useState<string | undefined>(undefined);

    const closeAllMenus = () => {
        setDifferenceMenuOpened(false);
        setCloseAppMenuOpened(false);
    };

    const getDifferenceText = (hours: number, minutes: number) => {
        const currentTime = new Date();
        const targetTime = new Date(currentTime);
        targetTime.setHours(hours, minutes, 0, 0);

        let differenceMs = targetTime.getTime() - currentTime.getTime();

        if (differenceMs < 0)
            differenceMs += 24 * 60 * 60 * 1000;

        const differenceMinutes = Math.floor(differenceMs / (1000 * 60));

        return `Skirtumas tarp dabar ir nurodyto laiko yra ${differenceMinutes} minutes`;
    }

    return (
        <View>
            <View style={{ height: 60, backgroundColor: '#1C4E80', flexDirection: 'row' }}>
                <Text style={{ color: '#fff', fontSize: 24, marginTop: 'auto', marginBottom: 'auto', marginLeft: 10 }}>6 Laboratorinis</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', padding: 5, marginLeft: 40 }} onPress={() => setDifferenceMenuOpened(true)}>
                        <Text style={{ color: '#fff' }}>Nustatyti skirtumą</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => setCloseAppMenuOpened(true)}>
                        <MoreVertical width={60} height={30} fill={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
            {differenceMenuOpened && (
                <Menu
                    buttons={[{
                        title: 'Įvesti laiką',
                        onClick: () => {
                            setDifferenceMenuOpened(false);
                            setTimePickerActive(true);
                        }
                    }]}
                    close={closeAllMenus}
                    style={{
                        transform: [{ translateX: 80 }, { translateY: -360 }]
                    }}
                />
            )}
            {closeAppMenuOpened &&
                <Menu
                    buttons={[{
                        title: 'Baigti darbą',
                        onClick: () => BackHandler.exitApp()
                    }]}
                    style={{
                        transform: [
                            { translateX: 135 },
                            { translateY: -360 }
                        ]
                    }}
                    close={closeAllMenus}
                />
            }
            {timePickerActive &&
                <Modal transparent={true} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <TimePicker
                            onSave={(hours, minutes) => {
                                const differenceText = getDifferenceText(hours, minutes);
                                setDifferenceText(differenceText);
                                Alert.alert('Skirtumas minutėmis', differenceText, [{ text: 'Ok' }]);
                                setTimePickerActive(false);
                            }}
                        />
                    </View>
                </Modal>
            }
            {differenceText &&
                <TouchableOpacity onPress={() => setActiveTextMenu(differenceText)} style={{ height: 50, justifyContent: 'center' }}><Text>{differenceText}</Text></TouchableOpacity>
            }
            {activeTextMenu &&
                <Menu
                    buttons={[
                        {
                            title: 'Simbolių skaičius šiame tekste',
                            onClick: () => {
                                setSymbolCountText(`Tekste yra: ${activeTextMenu.length} simbolių`);
                                setActiveTextMenu(undefined);
                            }
                        },
                        {
                            title: 'Rodyti po vieną simbolį',
                            onClick: () => { 
                                setTimeout(() => {
                                    setSymbolViewText(activeTextMenu);
                                    setActiveTextMenu(undefined);
                                }, 10);

                                setSymbolViewText(undefined);
                            }
                        }
                    ]}
                    close={() => setActiveTextMenu(undefined)}
                />
            }
            { symbolCountText &&
                <TouchableOpacity onPress={() => setActiveTextMenu(symbolCountText)} style={{ height: 50, justifyContent: 'center' }}><Text>{symbolCountText}</Text></TouchableOpacity>
            }
            {symbolViewText &&
                <SymbolViewer text={symbolViewText}></SymbolViewer>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuStyle: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
});


const timePickerStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        height: 200,
        backgroundColor: '#7E909A',
    },
});

export default SixthLab;