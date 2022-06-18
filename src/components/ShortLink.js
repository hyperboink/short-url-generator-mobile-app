import React, { useState } from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useClipboard } from '@react-native-community/clipboard'

export default ShortLink = (props) => {
    const [clipboardText, setClipboardText] = useClipboard('')
    const [copyMessage, setCopyMessage] = useState('')

    const copyToClipboard = (text) => {
        setClipboardText(text)
        setCopyMessage(props.copyMessage)

        setTimeout(() => {
            setCopyMessage('')
        }, 700)
    };

    return (
        <View style={style.shortLinkRow}>
            <Text style={style.shortLinkLabel}>{props.label}</Text>

            <TouchableOpacity onPress={() => {
                copyToClipboard(props.url)
            }}>
                <View style={style.shortLink}>
                    <Text>{props.url}</Text>

                    <FontAwesomeIcon
                        style={style.shortLinkIcon}
                        icon={faCopy}
                        color={'#848ab7'}
                        size={20}/>
                    
                    <Text style={copyMessage ? style.copyMessage : style.hide}>{copyMessage}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    shortLinkRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    shortLink: {
        backgroundColor: '#e8e4f5',
        paddingTop: 5,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight:  35,
        color: '#444',
        width: 200,
        textAlign: 'left',
        borderRadius: 3,
        position: 'relative',
    },
    shortLinkLabel: {
        color: '#fff',
        paddingRight: 7
    },
    shortLinkIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    shortLinks: {
        marginTop: 15,
    },
    copyMessage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: 200,
        height: 30,
        backgroundColor: '#fff',
        textAlign: 'center',
        paddingTop: 5,
        opacity: 1,
        color: '#848ab7',
        borderRadius: 3,
    },
    hide: {
        position: 'absolute',
        opacity: 0,
    }
})