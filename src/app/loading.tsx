import LoaderSpinner from '@/components/LoaderSpinner'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='flex items-center p-10 justify-center'>
            <LoaderSpinner />
        </div>
    )
}

export default Loading