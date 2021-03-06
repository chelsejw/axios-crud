// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
const token = document.querySelector("[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;


import Display from './Display'
import Create from './Create'
import Edit from './Edit'


const App = props => {

    const [fruits, setFruits] = useState([]);
    const [createFormInput, setCreateFormInput] = useState({});
    const [createErr, setCreateErr] = useState("");
    const [createSuccess, setCreateSuccess] = useState(false);
    const [editingFruit, setEditingFruit] = useState({name: "", weight: ""})
    const [editFormInput, setEditFormInput] = useState({});

    //DO THIS WHENEVER THE APP IS LOADED (get all fruit data)
      useEffect(() => {
        axios
          .get("/api/v1/fruits")
          .then((res) => {
            console.log(res);
            setFruits(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    
    //To track the input for creating a new fruit
    const createFruitInputTracker = (nameOfField, inputData) => {
      setCreateFormInput((previousValues) => {
        return { ...previousValues, [nameOfField]: inputData };
      });
    };

    //Do this whenever the form input is changed / whenever setCreateFormInput is called.
    useEffect(() => {
      console.log(createFormInput);
    }, [createFormInput]);

    const editFruitInputTracker = (nameOfField, inputData) => {
      setEditFormInput((previousValues)=> {
        return {...previousValues, [nameOfField]: inputData}
      })
    }

    const submitEditHandler = (e) => {
      if (editingFruit.name.length < 1 || editingFruit.weight.length < 1) {
        return
      }

      console.log(`Payload for axios patch:`, {fruit: editFormInput})

      axios
        .patch(`/api/v1/fruits/${editingFruit.id}`, { fruit: editFormInput })
        .then((res) => {
          const updatedFruits = fruits.map((fruit) => {
            return (parseInt(fruit.id) == parseInt(res.data[0].id) ? res.data[0] : fruit)
          });
          setFruits(updatedFruits);
          setEditingFruit({name: "", weight: "" });
          setEditFormInput({name: "", weight: "" });
        })
        .catch((err) => {
          console.log(`Error while editing fruit`);
          console.log(err);
        });

    }

    //When yellow edit button is pressed, set state and form to be targeted fruit.
        const editButton = (fruit) => {
          setEditingFruit(fruit);
          setEditFormInput(fruit);
          console.log(fruit);
        };

        //Track changes for editing fruit.
    useEffect(()=>{
      console.log(`Editing fruit changed!`)
      console.log(editingFruit)
    }, [editingFruit])



        //Track changes for editing form input.

    useEffect(() => {
      console.log(`Edit form input changed!`)
      console.log(editFormInput);
    }, [editFormInput]);


    //For the delete buttons
    
    const deleteButtonHandler = (name, fruitId) => {

      //Alert to confirm if user wants to delete
      const confirmation = confirm(`Are you sure you want to delete ${name}?`)

      if (confirmation) {
             axios
               .delete(`/api/v1/fruits/${fruitId}`)
               .then((res) => {
                 console.log(`Response received while deleting.`);
                 console.log(res);

                 const updatedFruits = fruits.filter((fruit) => {
                   return parseInt(fruitId) !== parseInt(fruit.id);
                 });

                 setFruits(updatedFruits);
               })
               .catch((err) => {
                 console.log(`Error while deleteing.`);
                 console.log(err);
               });
      }
    }
    

    //For create fruit
    
    const submitHandler = () => {
      setCreateErr("");
      setCreateFormInput({name: "", weight: ""})

      //Some validation.
      if (createFormInput.name.length < 4 || isNaN(createFormInput.weight)) {
        createFormInput.name.length < 4 &&
          setCreateErr("Fruit name cannot be shorter than 4 characters.");
        isNaN(createFormInput.weight) && setCreateErr("Weight must be a number");
        return;
      }

      //AXIOS
      axios
        .post("/api/v1/fruits", { fruit: createFormInput })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setCreateSuccess(true);
          setFruits([...fruits, res.data])
        })
        .catch((err) => {
          console.log(`Error in creating new fruit`);
          console.log(err);
        });
    };



  return (
    <div>
      <h1 className="text-center">FRUITS</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <Display data={fruits} edit={editButton} delete={deleteButtonHandler}/>
          </div>
          <div className="col">
            <Create
              tracker={createFruitInputTracker}
              err={createErr}
              input={createFormInput}
              submitHandler={submitHandler}
              success={createSuccess}
            />
          </div>
          <div className="col">
            <Edit tracker={editFruitInputTracker} submit={submitEditHandler} input={editFormInput} fruit={editingFruit}/>
          </div>
        </div>
      </div>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
