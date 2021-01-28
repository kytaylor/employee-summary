const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let employeeList = [];

const employeeQuestions = [
    {
        type: "input",
        message: "Enter employee name:",
        name: "name",
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter employee email:",
        name: "email",
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"]
    },
    {
        when: input => {
            return input.role === "Engineer"
        },
        type: "input",
        message: "Enter engineer's GitHub username:",
        name: "github",
    },
    {
        when: input => {
            return input.role === "Intern"
        },
        type: "input",
        message: "Enter intern's school:",
        name: "school",
    },
    {
        when: input => {
            return input.role === "Manager"
        },
        type: "input",
        message: "Enter manager's office number:",
        name: "officeNumber",
    },
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "add",
        choices: ["Yes", "No"]
    }
];

async function init() {
    const data = await inquirer.prompt(employeeQuestions);

    if(data.role === "Engineer") {
        var newEmployee = new Engineer(data.name, data.id, data.email, data.github);
    } else if(data.role === "Intern") {
        var newEmployee = new Intern(data.name, data.id, data.email, data.school);
    } else if (data.role === "Manager") {
        var newEmployee = new Manager(data.name, data.id, data.email, data.officeNumber);
    }
    employeeList.push(newEmployee);

    if(data.add === "Yes") {
        init()
    } else {
        render(employeeList)
    }
}

init()