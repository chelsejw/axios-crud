import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Second = (props)=> {
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
          onClick={(e) => props.submitHandler(e)}
          className="mt-3 btn btn-block btn-success"
        >
          Submit
        </button>
      </div>
    );
}

export default Second