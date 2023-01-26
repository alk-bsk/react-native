import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/Place/PlacesList'
import { fetchPlaces } from '../util/database';

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlace() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlace();
    }
  }, [isFocused])
  return (
    <PlacesList places={loadedPlaces} />
  )
}
