import { useState } from "react"
import { View, Button } from "react-native";
import SecondLab from "./2 Laboratorinis/SecondLab";
import ThirdLab from "./3 Laboratorinis/ThirdLab";
import FourthLab from "./4 Laboratorinis/FourthLab";
import FifthLab from "./5 Laboratorinis/FifthLab";
import SixthLab from "./6 Laboratorinis/SixthLab";
import SeventhLab from "./7 Laboratorinis/SeventhLab";

const ButtonContainer = (props: { children: React.JSX.Element }) => {
    const {
        children
    } = props;

    return (
        <View style={{ width: '100%', padding: 30 }}>
            {children}
        </View>
    )
}

const MainMenu = () => {
    const [activeButton, setActiveButton] = useState<number | undefined>(undefined);

    return (
        <>
            {activeButton == undefined &&
                <>
                    <ButtonContainer>
                        <Button title='2 Laboratorinis' onPress={() => setActiveButton(2)}></Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button title='3 Laboratorinis' onPress={() => setActiveButton(3)}></Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button title='4 Laboratorinis' onPress={() => setActiveButton(4)}></Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button title='5 Laboratorinis' onPress={() => setActiveButton(5)}></Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button title='6 Laboratorinis' onPress={() => setActiveButton(6)}></Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button title='7 Laboratorinis' onPress={() => setActiveButton(7)}></Button>
                    </ButtonContainer>
                </>
            }
            {activeButton == 2 &&
                <SecondLab onBack={() => setActiveButton(undefined)} />
            }
            {activeButton == 3 &&
                <ThirdLab onBack={() => setActiveButton(undefined)} />
            }
            {activeButton == 4 &&
                <FourthLab onBack={() => setActiveButton(undefined)} />
            }
            {activeButton == 5 &&
                <FifthLab onBack={() => setActiveButton(undefined)} />
            }
            {activeButton == 6 &&
                <SixthLab onBack={() => setActiveButton(undefined)} />
            }
            {activeButton == 7 &&
                <SeventhLab onBack={() => setActiveButton(undefined)} />
            }
        </>
    )
}

export default MainMenu;