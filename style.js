import { StyleSheet } from 'react-native';

const baseStyle = StyleSheet.create({
  container: {
    paddingTop: 54,
    flexDirection: 'column',
    flex: 1,
  },
  containerCentering: {
    paddingTop: 54,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBarcodeStyle: {
    backgroundColor: '#039BE5',
    borderRadius: 3,
    borderWidth: 0,
    elevation: 2,
    marginBottom: 40,
    height: 60,
  },
  buttonBarcodeTextStyle: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 20,
  },
  buttonInputCodeStyle: {
    backgroundColor: '#009688',
    borderRadius: 3,
    borderWidth: 0,
    elevation: 2,
    height: 60,
  },
  buttonInputCodeTextStyle: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 20,
  },
});

export default baseStyle;
