import React from 'react'

import { Helmet } from 'react-helmet-async'



const Title = ({ title = "Messaging App", description = "This is Fully Functional Messaging Application" }) => {
    return (
        <Helmet>
            <title>
                {title}
            </title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default Title
