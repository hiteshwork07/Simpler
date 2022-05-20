import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const icons = {
    // pause: require('../../assets/Icons/pause.png'),
    // forward: require('../../assets/Icons/forward.png'),
    // rewind: require('../../assets/Icons/rewind.png'),
};

export const images = {
    logo: require('../assets/image/logo.png'),
    user: require('../assets/image/avatar.png'),
    location: require('../assets/image/navigation.png'),
    sun: require('../assets/image/sun.png'),
    // forward: require('../../assets/Icons/forward.png'),
    // rewind: require('../../assets/Icons/rewind.png'),
};

export const texts = {

    xlarge: {
        fontSize: hp('3%'),
    },
    xlargeBold: {
        fontSize: hp('3%'),
        fontWeight:"bold"
    },
    large: {
        fontSize: hp('2.3%'),
    },
    largeBold: {
        fontSize: hp('2.3%'),
        fontWeight:"bold"
    },
    regular: {
        fontSize: hp('1.8%'),
    },
    regularBold: {
        fontSize: hp('1.8%'),
        fontWeight:"bold"
    },
    small: {
        fontSize: hp('1.6%'),
    },
    smallBold: {
        fontSize: hp('1.6%'),
        fontWeight:"bold"
    },
    xsmall: {
        fontSize: hp('1.4%'),
    },
    xsmallBold: {
        fontSize: hp('1%'),
        fontWeight:"bold"
    }
}