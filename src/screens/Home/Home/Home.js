import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RideCards from '../../../components/RideCards';
import {useFocusEffect} from '@react-navigation/native';
import {GetCrewRideAPI, GetUserAPI} from '../../../redux/action/user';
import {images} from '../../../utils/Resource';
import ProcessingWheel from '../../../components/ProcessingWheel';
import TokenManager from '../../../utils/TokenManager';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [rideArray, setRideArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {IsAppLoading} = useSelector(state => state.user);
  const theme = useSelector(state => state.theme);
  const {
    getCrewRidesList: {rides = [], truck = {}},
    user: {user = {}} = {},
  } = useSelector(state => state.user);
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = setTimeout(async () => {
        dispatch(GetCrewRideAPI(await TokenManager.retrieveToken()));
        dispatch(GetUserAPI());
      }, 1000);
      return () => unsubscribe;
    }, []),
  );

  const onRefresh = () => {
    setLoading(true);
    dispatch(GetCrewRideAPI());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (rides.length) {
      setRideArray(rides);
    }
  }, [rides]);

  const MainFlatlistHeaderComponent = () => {
    if (!show) return <View />;
    return (
      <View style={styles.mainHeaderWrapper}>
        <View style={[styles.homepageHeaderContainer]}>
          <View style={styles.textWrapper}>
            <AntDesign
              name="close"
              onPress={() => setShow(!show)}
              size={hp('3.5%')}
              color={theme.font_main}
            />
            <Text style={[styles.homePageGeeingText, {color: theme.font_main}]}>
              Good morning, {`${user.firstName} ${user.lastName}`}!Cheers to a
              great day.
            </Text>
            <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
              Here's your work summary:
            </Text>
          </View>
          <Image
            source={images.sun}
            style={styles.sunImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.iconWrapper}>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              <FontAwesome
                name="truck"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Truck
              </Text>
            </View>
            <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
              {truck.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              <FontAwesome
                name="map-pin"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Number of Trips
              </Text>
            </View>
            <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
              {rideArray.length || 'N/A'}
            </Text>
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              <FontAwesome
                name="clock"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Hours
              </Text>
            </View>
            <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
              {truck.shiftTime || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  if (!!IsAppLoading) return <ProcessingWheel isProcessing />;
  return (
    <SafeAreaView
      style={[styles.mainContainer, {backgroundColor: theme.background_main}]}>
      <MainFlatlistHeaderComponent />
      <Text
        style={[styles.homePageSubText, styles.card, {color: theme.font_main}]}>
        Dispatched Trips
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
            }}
            refreshing={loading}
            tintColor={theme.color_blue}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={rideArray}
        contentContainerStyle={{paddingBottom: hp('15%')}}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => <RideCards item={item} index={index} />}
        ListEmptyComponent={() => {
          return (
            <View style={styles.noCard}>
              <Text style={styles.noText}>No rides available</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
