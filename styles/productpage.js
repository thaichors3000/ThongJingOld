import { StyleSheet } from 'react-native';
import color from './color';

const style = StyleSheet.create({
  container: {
    paddingTop: 72,
    paddingBottom: 72,
  },
  header: {
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    paddingTop: 10,
  },
  footer: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
    borderTopWidth: 1,
    borderColor: '#E0F2F1',
    margin: 0,
  },
  button: {
    flex: 1,
    marginBottom: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: color.secondaryBackground,
  },
  divider: {
    backgroundColor: '#29B6F6',
    width: 1,
  },
});

export default style;
