import React, {useState, useRef} from 'react'
import { SafeAreaView, View, Text, TextInput, Pressable, Keyboard, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Bubbles } from 'react-native-loader';
import { BASE_API, MESSAGE } from './src/contants'
import ShortLinks from './src/components/ShortLinks'
import Blank from './src/components/Blank'
import axios from 'axios'

export default function App() {
  const [urls, setUrls] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [url, setUrl] = useState('')
  const shortenerRef = useRef()

  const shortenUrl = () => {
    if(url){
      setLoading(true)
      setErrorMsg('')
      Keyboard.dismiss()

      axios.get(BASE_API + url)
        .then(res => {
            setUrls(res.data)
            setLoading(false)
            setErrorMsg('')
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            setErrorMsg(MESSAGE.error)
            setUrls({})
        })
    }
  }

  const onChangeInput = val => {
    setUrl(val)
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Short URL Generator</Text>

      <View style={style.generator}>
        <Pressable 
          style={style.generator.button}
          onPress={shortenUrl}>
          <FontAwesomeIcon
            icon={faSearch}
            color={style.icon.white}
            size={style.icon.size}/>
        </Pressable>

        <TextInput
          selectionColor={'#fff'}
          style={style.generator.input}
          ref={shortenerRef}
          onChangeText={onChangeInput}
          onSubmitEditing={shortenUrl}/>
      </View>

      {loading ? (
        <View style={style.generator.loader}>
          <Text style={style.generator.loaderTxt}>Generating short links</Text>
          <Bubbles size={4} color="#fff" />
        </View>
      ) : <Blank />}

      {!loading && urls.ok ? (
        <>
          <ShortLinks
            copyMessage={MESSAGE.copied}
            data={[
              {
                label: 'Short Link 1:',
                url: urls.result.short_link
              },
              {
                label: 'Short Link 2:',
                url: urls.result.short_link2
              },
              {
                label: 'Short Link 3:',
                url: urls.result.short_link3
              },
              {
                label: 'Short Link 4:',
                url: urls.result.full_short_link
              },
              {
                label: 'Short Link 5:',
                url: urls.result.full_short_link2
              },
              {
                label: 'Short Link 6:',
                url: urls.result.full_short_link3
              }
            ]}/>
        </>
      ) : (
        errorMsg ? (
          <Text style={style.color.primary}>{errorMsg}</Text>
        ) : <Blank />
      )}
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  color: {
    primary: {
      color: '#fff'
    }
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#848ab7'
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#fff',
  },
  generator: {
    width: '80%',
    input: {
      borderColor: '#fff',
      borderWidth: 1,
      width: '100%',
      textTransform: 'lowercase',
      borderRadius: 20,
      paddingTop: 10,
      paddingRight: 40,
      paddingBottom: 10,
      paddingLeft: 15,
      color: '#fff',
      fontSize: 20,
      letterSpacing: 1,
      height: 47,
      marginTop: 20,
      position: 'relative',
      elevation: 0,
      zIndex: 0,
    },
    button:{
      position: 'absolute',
      right: 0,
      top: 21,
      elevation: 0,
      zIndex: 1,
      width: 40,
      height: 46,
      paddingLeft: 5,
      paddingTop: 10,
      borderColor: 'transparent',
      borderRadius: 0,
    },
    loader:{
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10
    },
    loaderTxt: {
      color: '#fff',
      marginRight: 5,
      letterSpacing: 1,
      fontWeight: 'bold',
    }
  },
  icon: {
    size: 23,
    white: '#fff',
    lavender: '#848ab7',
  }
})