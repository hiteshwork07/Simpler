import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import {useSelector} from 'react-redux';

const ConfirmationCard = ({
  item = {},
  status,
  onConfirmationHandler,
  isConfirm,
}) => {
  const theme = useSelector(state => state.theme);

  return (
    <View style={[styles.cardWrapper, {backgroundColor: theme.font_white}]}>
      <View style={styles.textCombo}>
        <Text style={[styles.time, {color: theme.font_main}]}>
          Navigating To
        </Text>
        <Text style={[styles.time, {color: theme.font_main}]}>  {item.travelTime}</Text>
      </View>
      <View style={styles.textCombo}>
        <Text style={[styles.locationText, {color: theme.color_green}]}>
        {`${item.patientName} `}
        </Text>
        <Text style={[styles.locationText, {color: theme.font_main}]}>
        {item.mileage}
        </Text>
      </View>
      <Text style={[styles.name, {color: theme.font_main}]}>
        {item.pickupLocation}
      </Text>
      {status !== 'Completed' && (
        <TouchableOpacity
          onPress={onConfirmationHandler}
          style={[
            styles.button,
            {
              backgroundColor: theme.color_darkBlue,
            },
            styles.buttonWrapper,
          ]}>
          <Text style={[styles.time, {color: theme.font_white}]}>{status}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConfirmationCard;
