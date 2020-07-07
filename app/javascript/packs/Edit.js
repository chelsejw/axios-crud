import React from 'react'

const Edit = (props)=> {
    return (
      <div>
        <h1>Editing: {props.fruit.name}</h1>
        <label htmlFor="edit-name">Name</label>
        <input
          id="edit-name"
          disabled={props.fruit.name.length < 1 && true}
          value={props.input.name}
          className="form-control"
          name="name"
          onChange={(e) => props.tracker(e.target.name, e.target.value)}
        />
        <label htmlFor="edit-weight">Weight</label>

        <input
          id="edit-weight"
          className="form-control"
          disabled={props.fruit.weight.length < 1 && true}
          value={props.input.weight}
          onChange={(e) => props.tracker(e.target.name, e.target.value)}
          name="weight"
        />

        <div className="text-danger"></div>

        <div className="text-success"></div>

        <button
          onClick={props.submit}
          className="mt-3 btn btn-block btn-success"
        >
          Submit
        </button>
      </div>
    );
}

export default Edit