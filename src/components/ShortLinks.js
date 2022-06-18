import React from 'react'
import ShortLink from './ShortLink'
import Blank from './Blank'

export default ShortLinks = (props) => {
  return (
    <>
        {props.data.length ? (
            props.data.map((value, i) => <ShortLink
                key={i}
                label={value.label}
                url={value.url}
                copyMessage={props.copyMessage} /> )
        ) : <Blank />}

    </>
  )
}