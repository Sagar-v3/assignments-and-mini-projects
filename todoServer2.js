
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());

function findIndex(arr, id) {

    for(let i=0; i< arr.length; i++) {
        if(arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

function removeAt(arr, index) {
    let newArr = [];

    for(let i =0; i < arr.length; i++) {

        if(arr[i] !== arr[index]) {
            newArr.push(arr[i]);
        }
    }
    return newArr
}


app.get("/todos", (req,res)=> {
    fs.readFile("todos.json", "utf-8", (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get("/todos/:id", (req,res)=> {
    fs.readFile("todos.json","utf8", (err, data)=> {
        if(err) throw err;

        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.params.id));
        console.log(todos[todoIndex]);

        if(todoIndex === -1) {
            return res.status(404).send("Not Found");
        }else {
            return res.json(todos[todoIndex]);
        }
    });
});


app.post("/todos", (req,res)=> {
    const newTodo = {
        id: Math.floor(Math.random()*10000),
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    }

    fs.readFile("todos.json", "utf-8", (err, data)=> {
        if(err) throw err;
        const todos = JSON.parse(data);

        todos.push(newTodo);

        fs.writeFile("todos.json", JSON.stringify(todos), (err)=> {
            if(err) throw err;
            res.status(201).json(newTodo);
        });
    });
});

app.put("/todos/:id", (req,res)=> {
    
    fs.readFile("todos.json", "utf8", (err, data)=> {
        if(err) throw err;
        const todos = JSON.parse(data);

        const todoIndex = findIndex(todos, parseInt(req.params.id));

        if(todoIndex === -1) {
            return res.status(404).send("Not Found");
        } else {
            const newTodos = {
                id: todos[todoIndex].id,
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            }
            todos[todoIndex] = newTodos
            fs.writeFile("todos.json", JSON.stringify(todos), (err)=> {
                if(err) throw err;
                res.status(200).json("Successfully updated");

            });
        }
    });
});

app.delete("/todos/:id", (req,res) => {

    fs.readFile("todos.json", "utf8", (err, data)=> {
        if(err) throw err;
        let todos = JSON.parse(data);

        const todoIndex = findIndex(todos, parseInt(req.params.id));

        if(todoIndex === -1) {
            res.status(404).send();
        }else {
            todos = removeAt(todos, todoIndex);
            fs.writeFile("todos.json",JSON.stringify(todos), (err)=> {
                if(err) throw err;
                res.status(200).send();
            })
        }
    });
});


app.listen(3000, (err)=> {
    console.log("App is running on port 3000");
})