import React ,{useState, useEffect} from 'react'
import Select from 'react-select';
function App() {

  

  const [selectedOptions, setSelectedOptions] = useState();
  const [occupancyNumber, updateOccupancyNumber] = React.useState(0);
  const [queriedRoom, updateQueriedRoom] = useState();




   useEffect(()=>{
    console.log("fetching api")
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"sensor":"abc","ts":formattedDate,"in":5,"out":1})
  }

  Promise.all([
    fetch('/api/webhook', requestOptions).then(response => response.json()),
  ]).catch(err => console.error(err));
   },[]) 

   const optionList = [
    { value: "abc", label: "abc" },
    { value: "xyz", label: "xyz" },
    { value: "squaresense", label: "squaresense" },

  ]

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  function onClickButton() {
    updateQueriedRoom(selectedOptions.value)
    fetch("/occupancy?sensor="+selectedOptions.label).then(
      res => res.json()
    ).then(
      data =>updateOccupancyNumber(data.inside)      
    )
  }
    


  return (
    <div className='body'>
      <h2>Choose your sensor</h2>
      <div className="dropdown-container">
        <Select
              options={optionList}
              placeholder="Select room"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              
            />
      </div>
      <button className='button' onClick={onClickButton}>Show occupancy</button>

      <div className="result">
        {
          (occupancyNumber==="no room data"||queriedRoom === undefined)?(<p>{queriedRoom} no room data   </p>):(<p>
        Sensor {queriedRoom} reports from room occupancy of {occupancyNumber} people</p>)
        }

      </div>
    </div>
  )
}

export default App