import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform, YellowBox } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white, blue } from './utils/colours'
import DecksList from './components/DecksList'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from './reducers'
import Deck from './components/Deck'
import { headerBackTitle } from 'react-navigation'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const composeEnhancers = composeWithDevTools({ realtime: true, port: 19000 });
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
))

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      headerTitle: 'Decks List',
      tabBarLabel: 'Decks List',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-playing-outline' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTitle: 'Add Deck',
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      headerTintColor: purple
    }
  }
},
  {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: headerBackTitle,
      headerTitle: 'Deck',
      headerTintColor: purple
    },
  },
  AddCardToDeck: {
    screen: AddCard,
    navigationOptions: {
      title: headerBackTitle,
      headerTitle: 'Add card',
      headerTintColor: purple
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: headerBackTitle,
      headerTitle: 'Quiz',
      headerTintColor: purple
    }
  }
})


export default class App extends Component {

  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: componentWillUpdate is deprecated',
    ])


    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  containerNavHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textGoBack: {
    color: purple,
    alignItems: "flex-start"
  }
});