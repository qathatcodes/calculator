const express = require('express')
const z = require('zod')
const app = express()

app.use(express.json())

function validateInput(req, res, next) {

    const requestBody = z.object({
        num1: z.number({
            required_error: "Num1 is required",
            invalid_type_error: "Num1 must be a number",
          }),
        num2: z.number({
            required_error: "Num2 is required",
            invalid_type_error: "Num2 must be a number",
          }),
        action: z.string({
            required_error: "Action is required",
            invalid_type_error: "Action must be a string",
          })    
    })

    const validatedInput = requestBody.safeParse(req.body)

    console.log("Zod validation -- " + validatedInput)

    if(!validatedInput.success){
        res.json({"msg" : validatedInput["error"]["issues"][0]["message"]})
    }else{
        next()
    }


}

 app.get('/calculate',validateInput, function(req,res){
    calculate(req,res)
 })

function calculate(req,res){
    console.log("in calculate")
    const number1 = req.body["num1"]
    const number2 = req.body["num2"]
    const action = req.body["action"]
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
            res.json({"msg": "Invalid Action!"})
            break;
       }
}

 app.listen(8080)