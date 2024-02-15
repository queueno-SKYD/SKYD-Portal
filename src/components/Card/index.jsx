import React from 'react'

const Card = ({children, title, bottomComponent, overFlow=false}) => {
  return (
    <div className="w-100 d-flex flex-column mt-3">
        <div className="card">
          <div className="card-body">
            <h3>{title}</h3>
            <div className={`w-100 d-flex flex-column align-self-center ${overFlow ? "" : "inner overflow-auto"}`}>
              {children}
            </div>
            {bottomComponent}
          </div>
        </div>
      </div>
  )
}

export default Card