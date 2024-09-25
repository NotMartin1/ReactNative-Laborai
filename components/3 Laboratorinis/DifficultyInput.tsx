import { useState } from "react";
import { Text, View } from "react-native";
import { Star } from "react-native-feather";
import { SvgProps } from "react-native-svg";

type DifficultyInputProps = {
    difficulty: number,
    onDifficultyChanged: (difficulty: number) => void,
}

const DifficultyInput = (props: DifficultyInputProps) => {

    const {
        difficulty,
        onDifficultyChanged,
    } = props;

    const commonStarProps = {
        width: 60,
        height: 60
    } as SvgProps;

    const getStartFillColor = (positionNumber: number) => {
        if (positionNumber <= difficulty)
            return '#1C4E80';

        return '#CED2CC';
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ paddingLeft: 10, width: 130, color: '#fff', marginRight: 20, fontSize: 17 }}>Sudėtingumas</Text>
            <Star fill={getStartFillColor(1)} {...commonStarProps} onPress={() => onDifficultyChanged(1)} />            
            <Star fill={getStartFillColor(2)} {...commonStarProps} onPress={() => onDifficultyChanged(2)} />            
            <Star fill={getStartFillColor(3)} {...commonStarProps} onPress={() => onDifficultyChanged(3)} />            
            <Star fill={getStartFillColor(4)} {...commonStarProps} onPress={() => onDifficultyChanged(4)} />            
        </View>
    )
}
export default DifficultyInput;