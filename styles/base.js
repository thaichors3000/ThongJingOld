import { StyleSheet } from 'react-native';
import color from './color';

const style = StyleSheet.create({
  container: {
    marginTop: 72,
    paddingLeft: 20,
    paddingRight: 20,
  },
  centering: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    borderWidth: 0,
    elevation: 2,
    height: 60,
  },
  primaryButton: {
    backgroundColor: color.primaryBackground,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 20,
  },
  primaryButtonText: {
    color: color.primaryText,
  },
  secondaryButton: {
    backgroundColor: color.secondaryBackground,
  },
  secondaryButtonText: {
    color: color.secondaryText,
  },
  label: {
    fontWeight: '400',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    height: 60,
    borderWidth: 1,
    marginBottom: 20,
  },
  nav: {
    backgroundColor: color.primaryBackground,
    height: 72,
    elevation: 4,
  },
  title: {
    color: color.primaryText,
    fontWeight: '400',
    fontSize: 18,
  },
  iconButton: {
    width: 64,
    height: 64,
    borderRadius: 100 / 2,
    backgroundColor: color.ascentBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 4,
  },
});

export default style;
