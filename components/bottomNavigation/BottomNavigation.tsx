import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { HomeIcon } from '../../assets/HomeIcon';
import { Calender } from '../../assets/Calender';
import { ToDo } from '../../assets/ToDo';
import { Add } from '../../assets/AddCircle';
import { Settings } from '../../assets/Settings';

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <HomeIcon width={30} height={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Calender width={26} height={26} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Add width={31} height={31} />
      </TouchableOpacity>
      <TouchableOpacity>
        <ToDo width={27} height={27} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Settings width={26} height={26} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
