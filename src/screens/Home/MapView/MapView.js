import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Dimensions} from 'react-native';
import styles from './styles';
import Location from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DrawerActions} from '@react-navigation/native';
import {images} from '../../../utils/Resource';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ConfirmationCard from './MapComponents/ConfirmationCard';
import Card from './MapComponents/Card';
import Header from './MapComponents/Header';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

import {UpdateRideStatusAPI} from '../../../redux/action/user';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDeYRRtmStCSHXQBJxZa4t9uB_WXNO55H0';
const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapViewScreen = props => {
  const {
    route: {params = {}},
    navigation,
  } = props;
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const {updatedData: {ride = {}} = {}} = useSelector(state => state.user);
  const [selectedData, setSelectedData] = useState(params.item);
  const [initialRegion, setInitialRegion] = useState({
    latitude: +selectedData.dropoffLatitude,
    longitude: +selectedData.dropoffLongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [destination, setDestination] = useState({
    latitude: +selectedData.dropoffLatitude,
    longitude: +selectedData.dropoffLongitude,
  });
  const [origin, setOrigin] = useState({
    latitude: +selectedData.pickupLatitude,
    longitude: +selectedData.pickupLongitude,
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const [status, setStatus] = useState('Arrived at pickup');

  useEffect(() => {
    setSelectedData(params.item);
    getStatus(params.item);
  }, []);

  useEffect(() => {
    const fetchLocation = Geolocation.watchPosition(
      position => {
        const lat = parseFloat(position.coords.latitude);
        const long = parseFloat(position.coords.longitude);
        const userLocationRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setInitialRegion(userLocationRegion);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
    return () => Geolocation.clearWatch(fetchLocation);
  }, []);

  const getStatus = (item = {}, change = false) => {
    switch (item.status) {
      case 'arrived':
        if (change) {
          setStatus('Arrived at dropoff');
        } else {
          setStatus('Start ride');
        }
        return 'in-progress';
      case 'in-progress':
        if (change) {
          setStatus('Compelted');
        } else {
          setStatus('Arrived at dropoff');
        }
        return 'completed';
      default:
      case 'scheduled' && isConfirm:
        if (change) {
          setStatus('Start ride');
        } else {
          setStatus('Arrived at pickup');
        }
        return 'arrived';
    }
  };

  const onGoHandler = () => () => {
    setSelectedData({
      ...selectedData,
      status: getStatus(selectedData, true),
    });
    dispatch(
      UpdateRideStatusAPI({
        navigation: props.navigation,
        rideId: selectedData.id, // The ride id
        status: getStatus(selectedData, true), // The new status - one of [scheduled, arrived, in-progress, completed, cancelled]
      }),
    );
    if (selectedData.status === 'in-progress') navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header props={props} />

      {selectedData.status !== 'in-progress' ? (
        <MapView
          showsUserLocation={true}
          followUserLocation
          loadingEnabled
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={initialRegion}>
          <Marker
            opacity={0.8}
            tileSize={256}
            description={'Navigating to John Doe'}
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}>
            <View
              style={[
                {
                  backgroundColor: theme.font_white,
                },
                styles.imageWrapper,
              ]}>
              <Image
                source={images.location}
                style={styles.locationImage}
                borderRadius={20}
                resizeMode="contain"
              />
            </View>
          </Marker>
          {isConfirm && (
            <>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={8}
                strokeColor={theme.color_green}
              />
              <Marker
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}>
                <Location
                  name="location-pin"
                  size={hp('5%')}
                  color={theme.color_red}
                />
              </Marker>
            </>
          )}
        </MapView>
      ) : (
        <MapboxNavigation
          origin={[initialRegion.latitude, initialRegion.longitude]}
          destination={[destination.latitude, destination.longitude]}
          shouldSimulateRoute
          showsEndOfRouteFeedback
          onLocationChange={event => {
            const {latitude, longitude} = event.nativeEvent;
          }}
          onRouteProgressChange={event => {
            const {
              distanceTraveled,
              durationRemaining,
              fractionTraveled,
              distanceRemaining,
            } = event.nativeEvent;
          }}
          onError={event => {
            const {message} = event.nativeEvent;
          }}
          onCancelNavigation={() => {
            // User tapped the "X" cancel button in the nav UI
            // or canceled via the OS system tray on android.
            // Do whatever you need to here.
          }}
          onArrive={() => {
            setSelectedData({
              ...selectedData,
              status: 'completed',
            });
            // Called when you arrive at the destination.
          }}
        />
      )}
      {!isConfirm && selectedData?.status === 'scheduled' ? (
        <Card item={selectedData} onGo={() => setIsConfirm(!isConfirm)} />
      ) : (
        <ConfirmationCard
          status={status}
          item={selectedData}
          isConfirm={isConfirm}
          onConfirmationHandler={onGoHandler('arrived')}
        />
      )}
    </SafeAreaView>
  );
};

export default MapViewScreen;
