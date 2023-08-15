import React from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {}

const ToasterContext = (props: Props) => {
    return (
        <Toaster position='bottom-right' reverseOrder={false} />
    )
}

export default ToasterContext