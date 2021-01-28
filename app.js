const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
        fs.writeFileSync(outputPath, render(employeeList), "utf8")
    }
}

init()