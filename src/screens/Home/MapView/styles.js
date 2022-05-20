import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../components/basicStyles';
import {texts} from '../../../utils/Resource';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  locationImage: {
    height: hp('5%'),
    width: wp('10%'),
  },
  imageWrapper: {
    padding: 5,
    borderRadius: 30,
    transform: [{rotate: '10deg'}],
  },
  mainwrapper: {
    flex: 1,
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerButton: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 11,
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
  },
  logoImage: {
    height: verticalScale(50),
    width: horizontalScale(100),
  },
  userImage: {
    height: horizontalScale(30),
    width: horizontalScale(30),
    resizeMode:'contain'
  },
  cardWrapper: {
    padding: horizontalScale(10),
    position: 'absolute',
    bottom: 20,
    borderRadius: horizontalScale(10),
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleHeader: {
    ...texts.smallBold,
  },
  textCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...texts.regular,
  },
  time: {
    ...texts.regularBold,
  },
  divider: {
    height: 1,
    marginVertical: horizontalScale(10),
  },
  flexBox: {flexDirection: 'row'},
  flexBoxColumn: {flexDirection: 'column', justifyContent: 'space-between'},
  locationText: {
    ...texts.regularBold,
    marginVertical: verticalScale(5),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    borderRadius: horizontalScale(10),
    height: verticalScale(30),
    marginRight: horizontalScale(10),
  },
  buttonWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: horizontalScale(10),
  },
});

export default styles;
