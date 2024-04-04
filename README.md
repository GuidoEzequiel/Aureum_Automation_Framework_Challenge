"# Aureum_Automation_Framework_Challenge" 

# Aureum - Test Automation Framework Challenge 

This repository contains an automation framework for testing purposes. 
The framework is built using WebDriverIO, Cucumber and Page Object Model. 


## Dependency Installation

To set up the automation framework on your local machine, follow these steps:

### 1. Node.js Installation

Ensure you have Node.js installed on your system. You can download and install it from [here](https://nodejs.org/).

### 2. Clone the Repository

Clone the repository to your local machine using the following command:

```console
git clone XXX
```

### 3. Navigate to the Project Directory
```console
cd <project-directory>
```

### 4. Install Dependencies

Use npm (Node Package Manager) to install the required dependencies:

```console
npm install
```

This command will install all the necessary packages specified in the `package.json` file.


## Running Tests:

To run all current tests, execute the following command:

```console
npm run test
```

### Executing Reports:

This command will take previously generated test results and provide a report with that data.
```console
npx allure serve allure-results
```

## Troubleshooting

If you encounter issues running the tests after pulling changes or setting up the framework for the first time, it's possible that some dependencies have been updated. In such cases, it's recommended to update dependencies before rerunning the tests.

To update dependencies, run the following command:

```console
npm update
```

This will ensure that all dependencies are up to date and compatible with the current configuration of the framework.


## Current Implementations (UI Workflow Coverage):
### UI Tests:
● Verify that an item can be added to the cart and is visible on the cart page.
● Ensure the user can complete the purchase/checkout process.
● Verify that inventory items can be sorted by price, high-to-low, and the sorting is
correct.
● Ensure that inventory can be sorted by name, Z-to-A, and the sorting is correct.

### API Tests:
● A. Create tests for API calls (POST, GET, PUT, DELETE), setting headers, body, and
making proper assertions. You can use this Swagger

### Bonus Task:
● Implement a function in your automation framework that, given a DOM Element on
the page, will visit the element itself and all of its descendants.
● For each element, pass that element to a provided callback function.
● The arguments to the function should be a DOM element and a callback function
(that takes a DOM element as its argument).

## Contact

If you encounter any issues or have questions regarding the framework, feel free to contact:

**Creator:**
Guido Ezequiel Sánchez.
GuidoEzequielSanchez31@gmail.com