import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from './constants/styles';

import Read from './screens/Read';
import ToRead from './screens/ToRead';
import Statistics from './screens/Statistics';
import UpdateBook from './screens/UpdateBook';
import BookInfo from './screens/BookInfo';
import IconButton from './UI/IconButton';
import AddBook from './screens/AddBook';
import ReadBooksContextProvider from './store/read-books-context';
import WantBooksContextProvider from './store/want-books-context';
import CurrentBooksContextProvider from './store/current-books-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {backgroundColor: GlobalStyles.colors.highlight},
      tabBarStyle: {backgroundColor: GlobalStyles.colors.highlight},
      tabBarActiveTintColor: GlobalStyles.colors.dark,
      tabBarInactiveTintColor: GlobalStyles.colors.accent1,
    }}>
      <Tab.Screen 
        name="To Read" 
        component={ToRead}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="library" size={size} color={color}/>,
          headerRight: ({tintColor}) => <IconButton icon="add" size={30} color={tintColor} onPress={() => {}}/>
        }}
      />
      <Tab.Screen 
        name="Read"
        component={Read}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="checkbox" size={size} color={color}/>
        }}
        />
      <Tab.Screen 
        name="Statistics" 
        component={Statistics}
        options={{tabBarIcon: ({color, size}) => <Ionicons name="bar-chart" size={size} color={color}/>}}
      />
    </Tab.Navigator>
  );
} 

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <ReadBooksContextProvider>
        <WantBooksContextProvider>
          <CurrentBooksContextProvider>
            <NavigationContainer>
              <Stack.Navigator 
                screenOptions={{
                  headerStyle: {backgroundColor: GlobalStyles.colors.highlight},
                }} 
              >
                <Stack.Screen name="Overview" component={BottomTabs} options={{headerShown: false}} />
                <Stack.Screen name="UpdateBook" component={UpdateBook} options={{
                  title: 'Update Progress',
                  presentation: 'modal'
                  }}/>
                <Stack.Screen name="BookInfo" component={BookInfo} options={{title: 'Book Info'}}/>
                <Stack.Screen name="AddBook" component={AddBook} options={{
                  title: 'Add Book',
                  presentation: 'modal'
                  }}/>
              </Stack.Navigator>
            </NavigationContainer>
          </CurrentBooksContextProvider>
        </WantBooksContextProvider>
      </ReadBooksContextProvider>
    </>
  );
}
