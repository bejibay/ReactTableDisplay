import React, {useState,useEffect} from 'react';

export default function App(){
   const [tableData, setTableData] = useState([]);
   const [currentFormData, setCurrentFormData] = useState({id:"",date:"",  invoiceno:"", narration:"", 
   quantity:"", unit_cost:"", value:""});
  const [edit, setEdit] = useState(false);
  
  
  
  
    const addformdata =(formData) =>{
    
    setTableData(tableData=>([...tableData, formData]));
     }

    
    
   const handleedit =(formData)=> {
    setEdit(true);
    setCurrentFormData({date:formData.date, invoiceno:formData.invoiceno,narration:formData.narration,
      quantity:formData.quantity,unit_cost:formData.unit_cost,value:formData.value});
}

   
    const handledelete = (id)=>{
    if(window.confirm("Are you sure you want to delete this row") === true)
      {setTableData(tableData.filter((el)=>el.id!==id));
    }
    }

    const updatedata = (id, updatedFormData) => {
      setEdit(false)
    setTableData(tableData.map((formData) => (formData.id === id ? updatedFormData : formData)));
    }

    
   return (
     <>
     <hr/>
     <div>
     {edit ?
    <EditForm  setEdit={setEdit} currentFormData={currentFormData} updatedata={updatedata} /> :
    <AddFormData addformdata={addformdata}/>
     }
     <AddTableData  tableData ={tableData} handleedit = {handleedit} handledelete={handledelete}/>
     </div>
     </>
  );
   }
  

   export function AddTableData(props){
    
      
      
      
     
    return  (
     <form>
         <h2>Stock Purchase Details</h2>
         <table>
      <thead>
      <tr><th>SN</th><th>Date</th><th>Invoice No</th><th>Narration</th><th>Quantity</th><th>Unit Cost</th>
      <th>value</th></tr> 
      </thead>
      <tbody>
       {props.tableData.map((el,index)=>(
      <tr key ={index}>
      <td>{index+1}</td>
  <td>{el.date}</td>
  <td>{el.invoiceno}</td>
  <td>{el.narration}</td>
  <td>{el.quantity}</td>
  <td>{el.unit_cost}</td>
  <td>{el.value}</td>
      <td><button type ="button" onClick={()=>props.handleedit(el)}>Edit</button>
    <button type ="button"  onClick={()=>props.handledelete(el.id)}>Delete</button></td>
      </tr>
     ))}
     </tbody>
     </table>
       <button type ="submit" name ="submit">Submit For Approval</button>
       </form>
       );
        }
       

 export function AddFormData(props){

  const [formData, setFormData] = useState({date:"",  invoiceno:"", narration:"", 
  quantity:"", unit_cost:"", value:""});
  
   
 const handlechange =(event)=>{
 const name = event.target.name;
      const value = event.target.value;
      setFormData((values) => ({...values,[name]: value}));
};

  

   const handlesubmit =(event)=>{
    event.preventDefault();
    props.addformdata(formData);
    setFormData(values=>({...values,invoiceno:"", narration:'',quantity:'',unit_cost:'',value:""}));
  }

  
    return (
    <div>
      <h3>New Purchases Entry Form</h3>
      <form onSubmit  = {handlesubmit}>
  
    <label>Date:</label>
   <input type ='date' name='date' id ="date"  onChange ={handlechange}  required/>
   <input type ='text' name='invoiceno' placeholder ='Enter invoice no' onChange ={handlechange} required/>

   <input type ='text' name='narration' placeholder ='Enter narration' onChange ={handlechange} required/>
  <input type ='number' name='quantity' placeholder ='Enter quantity' onChange ={handlechange}  required/>
  
  <input type ='number' name='unit_cost' placeholder ='Enter unit cost' onChange ={handlechange}  required/>
  <input type ='number' name='value' placeholder ='Enter value' onChange ={handlechange} value = {formData.value} required/>
   <input type ='submit' name='submit' value ='Submit'/>
  </form>
  </div>
    );
    }

    export function EditForm(props){

  const [formData, setFormData] = useState(props.currentFormData);
  
   const handleinputchange = (event)=> {
   const name = event.target.name;
      const value = event.target.value;
      setFormData(values=>({...values, [name]: value}));
     }

      const  submitupdate = (event)=>{
        event.preventDefault();
      props.updatedata(formData.id,formData);
        
      }

      useEffect(() => {
        setFormData(props.currentFormData)
      }, [props])
  
      return (
     <div>
    <form onSubmit = {submitupdate}>
      <p>Edit Form</p>
    <label >Date:</label>
   <input type ='date' name='date' id ='date' onChange ={handleinputchange}   value = {formData.date} required/>
   <label >Invoice No:</label>
   <input type ='text' name='invoiceno' id ='invoiceno' onChange ={handleinputchange}   value = {formData.invoiceno} required/>
   <label>Narration:</label>
   <input type ='text' name='narration' id='narration' onChange ={handleinputchange}   value = {formData.narration} required/>
   <label>quantity:</label>
    <input type ='number' name='quantity' id='quantity' onChange ={handleinputchange}   value= {formData.quantity} required/>
    <label>Unit Cost:</label>
    <input name ='unit_cost' id='unit_cost' onChange ={handleinputchange} value = {formData.unit_cost} required/>
    <label>Value:</label>
    <input type ="text" name ='value' id='value' onChange ={handleinputchange} value = {formData.value} required/>
    <input type ='submit' name='submit' value ='Update'/>
     <input type ='reset' name='reset' value ='Cancel' onClick ={()=>props.setEdit(false)}/>
   </form>
   </div>
     );
     }

    
