import { useEffect, useState } from 'react'

import './App.css'
import axios from "axios";
import Formtable from './Formtable';


axios.defaults.baseURL = "http://localhost:8088/"

function App() {

  const [addSection, setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData, setformData] = useState({
    name : "",
    email : "",
    DOB : "",
    contact : "",
    description : ""
  })

  const [formDataEdit, setformDataEdit] = useState({
    name : "",
    email : "",
    DOB : "",
    contact : "",
    description : "",
    _id : ""
  })

  const [DataList ,setDataList] = useState([])

  const handleOnChange = (e) => {
    const {value,name} = e.target
    setformData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/create", formData);
      if(data.data.success){
        setAddSection(false)
        alert(data.data.message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFatchData = async(e)=>{

    const data = await axios.get("/");
  
      if(data.data.success){
        setDataList(data.data.data)
        
      }
  }
  useEffect(() =>{
    getFatchData()
  },[])
 
  const handleDelete = async (id) => {
     const data =  await axios.delete('/delete/'+id)
    if(data.data.success){
      getFatchData()
      alert(data.data.message)
    }
  };

  const handleUpdate = async(e) => {
    e.preventDefault()
    const data = await axios.put('/update/',formDataEdit)
    if(data.data.success){
      getFatchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }

  const handleEditOnChange = async(e) =>{
    const {value,name} = e.target
    setformDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleEdit = (el) =>{
    setformDataEdit(el)
    setEditSection(true)
  }




  return (
    <>
    
    <div className="container">
      
      <button className='btn btn-add' onClick={() => setAddSection(true)}>Add</button>

      {
        addSection && (
          <Formtable
          handlesubmit={handlesubmit}
          handleOnChange={handleOnChange}
          handleclose={(e) => setAddSection(false)}
          rest = {formData}
          />
        )
      }
      {
        editSection && (
          <Formtable
          handlesubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest = {formDataEdit}
          />
        )
      }

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>contact</th>
              <th>Description</th>
              
            </tr>
          </thead>
          <tbody>
            
            { DataList[0] ? (
              DataList.map((el) => {
                return(
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.DOB}</td>
                    <td>{el.contact}</td>
                    <td>{el.description}</td>
                    <td>
                    <button className='btn btn-edit'onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(el.id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              :(
                <p>no data</p>
              )
            }
          </tbody>
        </table>
      </div>

      </div>
    

    </>
  )



}

export default App
