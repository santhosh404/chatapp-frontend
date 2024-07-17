import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Emoji({ setMessage, setIsEmoji }) {
    return (
        <>
            <Picker
                theme={'light'}
                data={data}
                onEmojiSelect={(t) => { setMessage(prev => prev + t.native); setIsEmoji(false) }}
            />
        </>
    )
}
