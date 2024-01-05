const cors = require('cors')
const express = require('express')
const z = require('zod')
const app = express()

app.use(cors())
app.use(express.json())

function validateInput(req, res, next) {

    
    const num1 = z.number({
            required_error: "Num1 is required",
            invalid_type_error: "Num1 must be a number",
          })
    const num2 = z.number({
            required_error: "Num2 is required",
            invalid_type_error: "Num2 must be a number",
          })

    const action = z.string({
            required_error: "Action is required",
            invalid_type_error: "Action must be a string",
          })    
    

    console.log(typeof(req.query.num1))
    const validateNum1 = num1.safeParse(Number(req.query.num1))
    console.log(validateNum1);
    const validateNum2 = num2.safeParse(Number(req.query.num2))
    const validateAction = action.safeParse(req.query.action)

    if(!validateNum1.success){
        res.json({"result" : validateNum1["error"]["issues"][0]["message"]})
    }else if(!validateNum2.success){
        res.json({"result" : validateNum2["error"]["issues"][0]["message"]})
    }else if(!validateAction.success){
        res.json({"result" : validateAction["error"]["issues"][0]["message"]})
    }else{
        next()
    }
}

 app.get('/calculate',validateInput, function(req,res){
    calculate(req,res)
 })

function calculate(req,res){
    console.log("in calculate")
    const number1 = Number(req.query.num1)
    const number2 = Number(req.query.num2)
    const action = req.query.action
    let result = 0
    switch (action) {
        case "addition":
            result = {
                "result" : number1 + number2
            }
            console.log("Result of action -- " + result)
            res.json(result)
            break;
    
        case "subtraction":
            result = {
                "result" : number1 - number2
            }
            console.log("Result of action -- " + result)
            res.json(result)
            break;
       
        case "multiplication":
            result = {
                "result" : number1 * number2
            }
            console.log("Result of action -- " + result)
            res.json(result)
            break;
    
        case "division":
            result = {
                "result" : number1 / number2
            }
            console.log("Result of action -- " + result)
            res.json(result)
            break;
                                  
        default:
            res.json({"result": "Invalid Action!"})
            break;
       }
}

 app.listen(8080)