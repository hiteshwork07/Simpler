import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {texts} from '../../../utils/Resource';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
  },
  mainHeaderWrapper: {
    marginTop: 10,
    paddingHorizontal: wp('5%'),
  },
  homepageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  drawerButton: {
    justifyContent: 'center',
    height: hp('5%'),
    width: hp('5%'),
  },
  homePageGeeingText: {
    marginTop: hp('1.5%'),
    letterSpacing: wp('0.2%'),
    ...texts.largeBold,
  },
  card: {
    marginTop: wp('10%'),
    marginHorizontal: wp('5%'),
    marginBottom: wp('5%'),
  },
  homePageSubText: {
    marginTop: hp('0.7%'),
    letterSpacing: wp('0.2%'),
    ...texts.regular,
  },
  emptyCartTxt: {
    alignSelf: 'center',
    marginTop: hp('25%'),
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  textWrapper: {
    width: '70%',
  },
  sunImage: {
    width: hp('12%'),
    height: hp('12%'),
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 0,
    marginLeft: 5,
    ...texts.regularBold,
  },
  centerFlex: {
    alignItems: 'center',
  },
  noCard: {
    alignItems: 'center',
    marginTop: hp('12%'),
  },
  noText:{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  }
});

export default styles;
