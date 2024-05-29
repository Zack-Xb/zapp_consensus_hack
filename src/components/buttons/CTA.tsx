import { StyleSheet, View, Pressable, Text } from "react-native";

type CtaButtonProps = {
    label: string;
    setOpen: (open: boolean) => void;
    choice: boolean;
}

const CtaButton: React.FC<CtaButtonProps> = ({label, setOpen, choice}) => {
    return (
        <View style={styles.button}>
            <Pressable onPress={() => setOpen(choice)}>
                <Text style={styles.buttonText}>{label}</Text>
            </Pressable>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#B9B48D',
        padding: 10,
        borderRadius: 15,
        margin: 10,
        width: '75%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#232323',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});


export default CtaButton;

