import { Stack } from 'expo-router';
import ContextProvider from '../src/context/ContextProvider';
import { View } from 'react-native';


export default function RootLayout() {
  return (
    <ContextProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="index" options={{headerShown: false, title: "Landing"}}/>
          <Stack.Screen name="details" options={{title: "Details"}}/>
        </Stack>
      </ContextProvider>
  );
}
