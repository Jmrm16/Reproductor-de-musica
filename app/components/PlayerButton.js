import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';

const PlayerButton =props => {
    const { iconType, size = 40, iconcolor = color.FONT,onPress } = props
    const getIconName = (type) => {
        switch (type) {
          case 'PLAY':
            return 'pausecircle';
          case 'PAUSE':
            return 'playcircleo';
          case 'NEXT':
            return 'forward';
          case 'PREV':
            return 'banckward';
        }
      };
      

  return (
    <AntDesign  onPress={onPress} name={getIconName(iconType)} size={size} color={iconcolor} {...props} />
  );
};



export default PlayerButton;
