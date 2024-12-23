import * as React from 'react';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import { Platform, StatusBar } from 'react-native';

const StackAppbar = ({ 
  title, 
  goBack, 
  styles, 
  statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight 
}) => (
  <Appbar.Header
    style={{ backgroundColor: styles.bgColor, marginTop: statusBarHeight }}
    elevation={0} // Remove shadow
  >
    <Appbar.BackAction onPress={goBack} color={styles.textColor} />
    <Appbar.Content title={title} titleStyle={{ color: styles.textColor }} />
  </Appbar.Header>
);

StackAppbar.propTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
  }).isRequired,
  statusBarHeight: PropTypes.number,
};

export default StackAppbar;
