import React from 'react'

const Card = ({children, title, bottomComponent}) => {
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div className="card w-75">
          <div className="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>{title}</h3>
              {children}
            </div>
            {bottomComponent}
          </div>
        </div>
      </div>
  )
}

export default Card