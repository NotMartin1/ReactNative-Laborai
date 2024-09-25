import { useEffect, useState } from "react";
import { Button, SafeAreaView, TextInput, View, StyleSheet, Alert, Dimensions, Text, BackHandler } from "react-native";
import WebView from "react-native-webview";

const FourthLab = (props: { onBack: () => void }) => {

    const {
        onBack
    } = props;

    useEffect(() => {
        const handleBackPress = () => {
            onBack();
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        }

    }, []);

    const [enteredUrl, setEnteredUrl] = useState<string>('');
    const [loadUrl, setLoadUrl] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleLoadPage = () => {
        const formattedUrl = enteredUrl.startsWith('http') ? enteredUrl : `https://${enteredUrl}`;
        
        try {
            new URL(formattedUrl); 
            setLoadUrl(formattedUrl); 
        } catch (e) {
            Alert.alert("Netinkamas URL", "Įveskite tinkamą URL adresą kuris prasidėda su https://");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.urlInputContainer}>
                <TextInput
                    style={styles.urlInput}
                    onChangeText={(text) => setEnteredUrl(text)}
                    placeholder="Įveskite URL (https://www.example.com)"
                />
                <Button
                    title="Užkrauti puslapį"
                    onPress={() => handleLoadPage()}
                    
                />
            </View>
            { isLoading && <View><Text>Puslapis kraunamas</Text></View>}
            <View style={{ flex: 1, display: isLoading ? 'none' : 'flex', width: Dimensions.get('window').width, height: Dimensions.get('window').height - 50 }}>
                {loadUrl ? (
                    <WebView
                        source={{ uri: loadUrl }}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            Alert.alert('Nepayko užkrauti puslapio', nativeEvent.description);
                        }}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    />
                ) : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    urlInputContainer: {
        flexDirection: 'row',
        height: 50
    },
    urlInput: {
        backgroundColor: 'lightgrey',
        flex: 1,
        marginRight: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default FourthLab;
