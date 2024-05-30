import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Modal, Platform } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PaperProvider } from 'react-native-paper';

// Components
import ImageViewer from './src/components/ImageViewer';
import CtaButton from './src/components/buttons/CTA';
import { useState } from 'react';
import Wallet from './src/views/Wallet';

export default function App() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  }

  function ChoiceModal() {
    return (
      <Modal visible={open} animationType='slide'>
        <View style={styles.container}>
          <Text style={styles.text}>Zapp the fees away!</Text>
          <CtaButton label='Close' setOpen={setOpen} choice={false} />
          <StatusBar style="auto" />
        </View>
      </Modal>
    )
  }

  return (
    <RootSiblingParent>
      <PaperProvider>
        <View style={styles.container}>
          <ChoiceModal />
          <ImageViewer src={'https://docs.expo.dev/static/images/tutorial/background-image.png'} />
          <Wallet />
          <Text style={styles.text}>Zapp the fees away!</Text>
          <CtaButton label='Get Started' setOpen={setOpen} choice={true} />
          <StatusBar style="light" />
        </View>
      </PaperProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
  imageBox: {
    width: '60%',
    height: '50%',
    borderRadius: 10,
  },
  modal: {
    backgroundColor: '#B9B48D',
    borderRadius: 15,
    height: '75%',
    alignSelf: 'center'
  }

});
