import React from 'react'

const Create = (props)=> {
    return (
      <div>
        <h1>New Fruit</h1>
        <label htmlFor="create-name">Name</label>
        <input
          onChange={(e) => props.tracker(e.target.name, e.target.value)}
          id="create-name"
          className="form-control"
          name="name"
          value={props.input.name}
        />
        <label htmlFor="create-weight">Weight</label>

        <input
          onChange={(e) => props.tracker(e.target.name, e.target.value)}
          id="create-weight"
          className="form-control"
          name="weight"
          value={props.input.weight}
        />

        <div className="text-danger">{props.err}</div>

        <div className="text-success">
          {props.success && "Submitted successfully."}
        </div>

        <button
          onClick={() => props.submitHandler()}
          className="mt-3 btn btn-block btn-success"
        >
          Submit
        </button>
      </div>
    );
}

export default Create