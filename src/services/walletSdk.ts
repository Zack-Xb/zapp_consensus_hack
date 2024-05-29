import { WalletSdk, SecurityQuestion, InputType, ErrorCode, TextConfig, TextsKey, ImageKey, IconTextsKey, IconTextConfig, Error } from '@circle-fin/w3s-pw-react-native-sdk';
import Toast from 'react-native-root-toast';

const _initSdk = async (biometrics: boolean) => {
    try {
           // Set endpoint, app ID and extra settings
  await WalletSdk.init({
    endpoint: 'https://api.circle.com/v1/w3s/',
    appId:'',
    settingsManagement: { enableBiometricsPin: biometrics, disableConfirmationUI: false }
   });
    } catch (e: any) {
    Toast.show(e.message, {duration: Toast.durations.SHORT});
    return;
    }
  };

  const _setSecurityQuestions = () => {
    WalletSdk.setSecurityQuestions([
      new SecurityQuestion('What was your childhood nickname?', InputType.text),
      new SecurityQuestion('When is your favorite date?', InputType.datePicker),
      new SecurityQuestion('What is the name of your first pet?'),
      new SecurityQuestion('What is your favorite country?'),
    ]);
  };

  const _setDismissOnCallbackMap = () => {
      const map = new Map();
      map.set(ErrorCode.userCanceled, true);
      map.set(ErrorCode.networkError, true);
      WalletSdk.setDismissOnCallbackMap(map);
  };

  const _setTextConfigsMap = () => {
      let gradientColors = ['#05184b', '#21bad5'] as Array<string>;
      const map = new Map();
      map.set(TextsKey.newPinCodeHeadline, [
        new TextConfig('ENTER your new ', '#a6183f'),
        new TextConfig(
          'W3s PIN',
          gradientColors,
          'Montserrat'
        ),
      ]);
      map.set(TextsKey.securityIntroLink, [
        new TextConfig('==Learn more==',gradientColors,
        'Montserrat'),
        new TextConfig('https://www.circle.com/en/legal/privacy-policy',gradientColors,
        'Montserrat'),
      ]);
      WalletSdk.setTextConfigsMap(map);
  };

 const _setImageMap = () => {
     const imageMap = new Map();
     imageMap.set(ImageKey.naviBack, require('../../assets/image/ic_back.png'));
     imageMap.set(ImageKey.naviClose, require('../../assets/image/ic_close.png'));
     imageMap.set(
       ImageKey.securityIntroMain,
       require('../../assets/image/grab_confirm_main_icon.png')
     );
     imageMap.set(ImageKey.selectCheckMark, {
       uri: 'https://drive.google.com/uc?id=1UTX1tFnECuj1k3U1bggH0g5YvH_Ens5M',
     });
     imageMap.set(ImageKey.dropdownArrow, {
       uri: 'https://drive.google.com/uc?id=1PR3yYpk4AmsCAlUM8nw6C3y-RAXNjGMv',
     });
     imageMap.set(ImageKey.errorInfo, {
       uri: 'https://drive.google.com/uc?id=1UJjinISU6ZHO0fAoKaZofBMgItaAn9kS',
     });
     imageMap.set(ImageKey.securityConfirmMain, {
       uri: 'https://drive.google.com/uc?id=16OkP3VzEjLICOifNKRQi3FMJntV9F-n-',
     });
     WalletSdk.setImageMap(imageMap);
 };
  const _setIconTextConfigsMap = () => {
      let gradientColors = ['#05184b', '#21bad5'] as Array<string>;
      const map = new Map<IconTextsKey, Array<IconTextConfig>>();
      map.set(IconTextsKey.securityConfirmationItems, [
        new IconTextConfig(
          require('../../assets/image/ic_intro_item0_icon.png'),
          new TextConfig('This is the only way to recover my account access. ',gradientColors,
          'Montserrat')
      ),
        new IconTextConfig(
          require('../../assets/image/ic_intro_item1_icon.png'),
          new TextConfig(
            'Circle won’t store my answers so it’s my responsibility to remember them.',gradientColors,
            'Montserrat'
          )
      ),
       new IconTextConfig(
         require('../../assets/image/ic_intro_item2_icon.png'),
         new TextConfig(
           'I will lose access to my wallet and my digital assets if I forget my answers.',gradientColors,
           'Montserrat'
         )
       ),
     ]);
     WalletSdk.setIconTextConfigsMap(map);
 };
 const _setTextConfigMap = () => {};
 const _setErrorStringMap = () => {};
 const _setDateFormat = () => {};
 const _setDebugging = () => {};

 // execute
 const _executeSdk = (userToken: string, encryptionKey: string, challengeId: string) => {
     try {
         WalletSdk.execute(userToken, encryptionKey, [
           challengeId,
         ], ()=>{} , ()=>{} );
         //console.log(`${result.resultType}, ${result.status}, ${result.data?.signature}`);
     } catch (e: any) {
         console.log(e.message);
     }
  };
  // setBiometricsPin
 const _setBiometricsPin =  (userToken: string, encryptionKey: string) => {
    try {
       WalletSdk.setBiometricsPin(
        userToken,
        encryptionKey,
       ()=> {},
       ()=>{}
      );
      //console.log(`${result.resultType}, ${result.status}`);
    } catch (e: any) {
      console.log(e.message);
    }
  };