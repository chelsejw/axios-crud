import React, {useState, useEffect} from 'react'


const First = (props)=> {

      const fruitElements = props.data.map((fruit) => {
        return (
          <div className="my-3" key={fruit.id}>
              Fruit ID: #{fruit.id}
              <br/>Name: {fruit.name}
              <br/>Weight: {fruit.weight} kg
              <button className="btn btn-sm btn-warning" onClick={()=> {props.editBtn(fruit)}}>Edit</button>

          </div>
        );
      });

    return (
        <div>
            <h1>Getting all fruit data...</h1>
            {fruitElements}
        </div>
    )
}

export default First