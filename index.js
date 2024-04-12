#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow("\n---------------------------|Welcome to the Todo List App|----------------------"); // Animation starts
    await sleep();
    rainbowTitle.stop();
}
await welcome();
let todos = [];
async function createTodo(todos) {
    do {
        let ans = await inquirer.prompt({
            type: "list",
            message: "Choose an action",
            name: "select",
            choices: ["Add", "Update", "View", "Delete"],
        });
        if (ans.select == "Add") {
            let addTodo = await inquirer.prompt({
                type: "input",
                message: chalk.yellowBright("Add items in the list: "),
                name: "todo",
            });
            todos.push(addTodo.todo);
            if (todos.length > 0) {
                todos.forEach((todo, index) => console.log(chalk.cyanBright(` ${index + 1}. ${todo}`)));
                console.log("-------------------------------------------------");
            }
        }
        if (ans.select == "Update") {
            let updateTodo = await inquirer.prompt({
                type: "list",
                message: "select item you want to update: ",
                choices: todos.map(item => item),
                name: "todo"
            });
            let addTodo = await inquirer.prompt({
                type: "input",
                message: chalk.yellowBright("Add items in the list: "),
                name: "todo",
            });
            let newTodo = todos.filter(val => val != updateTodo.todo);
            todos = [...newTodo, addTodo.todo];
            if (todos.length > 0) {
                todos.forEach((todo, index) => console.log(chalk.cyanBright(` ${index + 1}. ${todo}`)));
                console.log("--------------------------------------------------");
            }
        }
        if (ans.select == "View") {
            if (todos.length > 0) {
                console.log(chalk.rgb(233, 101, 143)(" *** Your To do List:***"));
                todos.forEach((todo, index) => console.log(chalk.cyanBright(` ${index + 1}. ${todo}`)));
                console.log(chalk.rgb(233, 101, 143)(" ****************"));
                console.log("--------------------------------------------------");
            }
        }
        if (ans.select == "Delete") {
            let deleteTodo = await inquirer.prompt({
                type: "list",
                message: "select items you want to delete: ",
                choices: todos.map(item => item),
                name: "todo"
            });
            let newTodo = todos.filter(val => val !== deleteTodo.todo);
            todos = [...newTodo];
            if (todos.length > 0) {
                todos.forEach((todo, index) => console.log(chalk.cyanBright(` ${index + 1}. ${todo}`)));
                console.log("---------------------------------------------------");
            }
        }
    } while (true);
}
await createTodo(todos);
