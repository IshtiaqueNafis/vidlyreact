import React, {Component} from 'react';
import Input from "../common/input";
import Joi from 'joi-browser' // this the libray for validation of input.
class LoginForm extends Component {

//region single  Source of truth aka state
    constructor(props, context) {
        super(props, context);
        this.state = {
            account: {username: '', password: ''}, // will be used as a validation to use on account
            errors: {} // this will take care of errors.
        }
    }

//endregion

    //region schema
    // this will be used for input of joi valodation
    schema = {
        username: Joi.string().required().label("Username"),// user name and password both expected to be an input of string and both has to be mandotry
        password: Joi.string().required().label("Password"), // label is used to create friendly messages

    }
    //endregion


    //region methods

    //region  validate method
    // validates input
    validate = () => {
        //region object destrucure
        const options = {abortEarly: false}
        const {error} = Joi.validate(this.state.account, this.schema,options);
        //endregion
        // region code explanation `
        /*
        this.state.account --> this.state.account this is the object of the form with userInput has property of username and password
        this.schema--> is the this.schema --> is the joy object also has same property as this.state.account but they are based on criteria property
        abortEarly: false} --> this means lets say more than one error is found it will show more than one error message.
         */
        //endregion
        if (!error) return null; //-> if error is falst means no value there what so ever error result.error does not have any messages of error
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;

            //region Code explanation
            /*
            result.error.details --> this goes into result.error.details --> result is the object got from --> Joi.validate(this.state.account, this.schema, {abortEarly: false});
                                 --> result has access to result.error.details property

            for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
            --> means item will loopthrough the objects with item.path[0] -> is where all the error messages is located.

            details: Array(2) -->
            0: {message: ""username" is not allowed to be empty", path: Array(1), type: "any.empty", context: {…}}
            1: {message: ""password" is not allowed to be empty", path: Array(1), type: "any.empty", context: {…}}

             */

            //endregion
        }

        return errors;
    }


    //endregion


    //region  sumbitform
    // submits the form
    handleSubmit = e => {

        e.preventDefault(); // this helps with default method which loads the page.-> also e stands for prevent default
        const errors = this.validate(); // this will check for validation
        this.setState({errors: errors || {}}) // --> error property is being set here also -> this prevents null error this error has a key and value here with {} empty
        if (errors) return; // if there is any error this helps with to make sure the program is running fine. this quits the program tight away.
        console.log('submitted')


    }
    //endregion
    //region
    validateProperty = ({name, value}) => {
        //{name,value} --> object destrucutre of currentTarget aka name or value.
        if (name === 'username') {
            if (value.trim() === '') return 'UserName is Required';
        }
        if (name === 'password') {
            if (value.trim() === '') return 'password is required';
        }
    }
    //endregion

    //region handleChange

    handleChange = ({currentTarget: input}) => {
        // this.currentTarget has been renamed to input here
        const errors = {...this.state.errors}; //--> clones all the error messages.
        const errorMessage = this.validateProperty(input); // -> this recives input from the user.

        if (errorMessage) errors[input.name] = errorMessage; //--> this sets the value dynamcially if errormessage is truthy
        else delete errors[input.name]; //-> this is a built in method deletes property

        const account = {...this.state.account}; // cloning the object
        account[input.name] = input.value; //-> input.name set it to input.value.
        //region comment and explantion
        /*
         account[input.name] -->  name="username"  this is from username notice that key an property name in state both arte same
         account[input.name] -->  name="password"  this is from password notice that key an property name in state both are same
         this makes the program dynamic and easy to run.
         */
        //endregion
        this.setState({account, errors}); // -->updating the state.
    }
    //endregion
    //endregion
    render() {
        //region object destrucure
        const {account, errors} = this.state
        //endregion
        return (
            <div>
                <h1>
                    Login
                </h1>
                <form onSubmit={this.handleSubmit}>
                    {/*this is a form submit function its built in on funnction */}
                    <Input
                        name='username' // this is the username propertybeing passed notice that both username in here and state must match
                        value={account.username} // this the value of the account object name
                        label="UserName" // label can be anything I want it to be
                        onChange={this.handleChange} // isreferencing onChange method.
                        error={errors.username} // error object is being passed this wll check whether or not there is any errors.

                    />

                    <Input
                        name='password' // this is the username propertybeing passed notice that both password in here and state must match
                        value={account.password} // this the value of the account object name
                        label="Password" // label can be anything I want it to be
                        onChange={this.handleChange} // isreferencing onChange method.
                        error={errors.password} // error password is being passed this will check whther or not there is any errors.
                    />

                    <button className=" btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;