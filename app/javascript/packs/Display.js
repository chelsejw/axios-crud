import React from 'react'

import moment from 'moment';

const Display = (props)=> {

      const fruitElements = props.data.map((fruit) => {
        return (
          <div className="my-3" key={fruit.id}>
            Fruit ID: #{fruit.id}
            <br />
            Name: {fruit.name}
            <br />
            Weight: {fruit.weight} kg
            <br />
            Created: {moment(fruit.created_at).format("MMM Do, h:mm:ss a")}
            <br />
            Updated: {moment(fruit.updated_at).format("MMM Do, h:mm:ss a")}
            <br/>
            <button
              className="mt-3 btn btn-sm btn-warning"
              onClick={() => {
                props.edit(fruit);
              }}
            >
              Edit {fruit.name}
            </button>
            <button
              className="mt-3 btn btn-sm btn-danger"
              onClick={() => {
                props.delete(fruit.name, fruit.id);
              }}
            >
              Delete {fruit.name}
            </button>
          </div>
        );
      });

    return (
        <div>
            <h1>Getting all fruit data...</h1>
            {fruitElements.length > 0 ? fruitElements : "No fruits."}
        </div>
    )
}

export default Display;