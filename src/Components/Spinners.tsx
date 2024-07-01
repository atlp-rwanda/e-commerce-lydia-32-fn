import React from 'react'
import BeatLoader from "react-spinners/DotLoader";


const Spinner: React.FC = () => {
    const color = {
        display: 'block',
        width: '30px',
        margin: '0 auto'
    }
  return (
    <>
      <BeatLoader
       color='#35C2A8'
       cssOverride={color}
       loading={true}
      />
    </>
  )
}

export default Spinner
