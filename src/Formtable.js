import React from 'react'
import "./App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handlesubmit,handleOnChange,handleclose,rest}) => {

    
  return (
          <div className="addContainer">

        <form onSubmit={handlesubmit}> 
        <div className='close-btn' onClick={handleclose}><MdClose/></div>
          <label htmlFor="name">Name :</label>
          <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

          <label htmlFor="DOB">DOB :</label>
          <input type="DOB" id="DOB" name="DOB" onChange={handleOnChange} value={rest.DOB}/>

          <label htmlFor="contact">contact :</label>
          <input type="contact" id="contact" name="contact" onChange={handleOnChange} value={rest.contact}/>

          <label htmlFor="description">Description :</label>
          <input type="description" id="description" name="description" onChange={handleOnChange} value={rest.description}/>

          <button className='btn' onSubmit={handlesubmit}>Submit</button>
        </form>
      </div>
  )
}

export default Formtable
