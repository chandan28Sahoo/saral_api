const fs=require('fs');
const express=require('express');
const { stringify } = require('querystring');
const { setFlagsFromString } = require('v8');
const { isString } = require('underscore');
const app=express();
app.use(express.json());
var data = JSON.parse(fs.readFileSync('file.json'));



app.get('/',(req,res)=>{
    console.log('databases connected');
})

// read data by id
app.get('/get_data/:id',(req,res)=>{
    let found=data.find(function(x){
        return x.id===parseInt(req.params.id);
    });
    if (found){
        res.status(200).json(found);
    }else{
        res.sendStatus(404);
    }
})

// read data by id
app.get('/:id',(req,res)=>{
    for (i of data){
        if (i.id===parseInt(req.params.id)){
            res.send(i)
        }
    }
})


// read by course id
app.get('/get_data/:id/:id2',(req,res)=>{
    for (i of data){
        if (i.id===parseInt(req.params.id)){
            var data1=i.submission;
            for (j of data1){
                if (j.courseid===parseInt(req.params.id2)){
                    res.send(j.usersummision);
                }
            }

        }
    }
})


// read by name 
app.get('/get_data_by_name/:name',(req,res)=>{
    for (i of data){
        if (i["name"]===(req.params.name)){
            res.send(i);
        }
    }
})

// read by name and courseid
app.get('/get_data_by_name/:name/:id2',(req,res)=>{
    for (i of data){
        if (i["name"]===(req.params.name)){
            var data1=i.submission;
            for (j of data1){
                if (j.courseid===parseInt(req.params.id2)){
                    res.send(j.usersummision);
                }
            }

        }
    }
})

// read only course
app.get('/get_only_course',(req,res)=>{
    let list_of_course=[]
    for (i of data){
        delete(i.id)
        delete(i.submission)
        list_of_course.push(i);
        list_of_course.push(i)
    }
    res.send(list_of_course);
})



// read only course by using id
app.get('/get_data_by/:id',(req,res)=>{
    let list_of_course=[]
    for (i of data){
        if (i.id===parseInt(req.params.id)){
            delete(i.submission);
            delete(i.id);
            list_of_course.push(i)
            res.send(list_of_course);

        }
    }
})

// read comment by id;
app.get('/get_comment/:id',(req,res)=>{
    let list_of_course=[];
    for (i of data){
        if (i.id===parseInt(req.params.id)){
            let data1=i.submission;
            for (j of data1){
                data2=(j.usersummision)
                for (k of data2){
                    delete(k.id);
                    delete(k.courseid);
                    delete(k.username);
                    list_of_course.push(k)
                }
            }
        }
    }
    res.send(list_of_course);
})

app.listen(3000,()=>{console.log('server is running on port 3000');}) 
// ##########################33





// app.post("/users", (req, res) => {
//     readFile((data) => {
//       const newUserId = Object.keys(data).length + 1;
  
//       // add the new user
//       data[newUserId] = JSON.parse(req.body.data);
  
//       writeFile(JSON.stringify(data, null, 2), () => {
//         res.status(200).send("new user added");
//       });
//     }, true);
//   });



// read course without submission
// exercises without usersubmission in a list
// exercisedetail in a list
// exercises in a list
// exercises/:id/:course_id/
// comment
// comment/:id
// comment/:id/:courseid'

// const employees = {
//     'sbrown': {
//       firstName: 'Steve',
//       lastName: 'Brown',
//       department: 'Engineering'      
//     },
//     'jsmith': {
//       firstName: 'Janine',
//       lastName: 'Smith',
//       department: 'Marketing'      
//     },
//     'kjones': {
//       firstName: 'Karen',
//       lastName: 'Jones',
//       department: 'Sales'      
//     },
//     'bwilliams': {
//       firstName: 'Ben',
//       lastName: 'Williams',
//       department: 'Administration'
//     }
// }

// app.get('/employee/:id', (req, res) => {
//     let employee=employees[req.params.id];
//     if (!employee) {
//         return res.sendStatus(404)
//       }
    
//       res.json(employee)
// })

// app.post('/employee', (req, res) => {
//     const { firstName, lastName, department } = req.body
//     if (!firstName || !lastName || !department) {
//         // 400 = bad request. It indicates to the user that
//         // there was something wrong with their request.
//         return res.status(400).send('One or more required fields are missing')
//     }
//     const id = (firstName[0] + lastName).toLowerCase()
//     if (employees[id]) {
//         // Provide a custom message so the user knows what the
//         // problem with the request is.
//         return res.status(400).send('A user with that id already exists')
//     }
//     employees[id] = { firstName, lastName, department }
//     console.log(req.body)
//     res.sendStatus(200)
// })