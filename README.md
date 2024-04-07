# Aureum - Test Automation Framework Challenge 

This repository contains an automation framework for testing purposes. 
The framework is built using WebDriverIO, Javascript, Cucumber and Page Object Model. 


## Dependency Installation

To set up the automation framework on your local machine, follow these steps:

### 1. Node.js Installation

Ensure you have Node.js installed on your system. You can download and install it from [here](https://nodejs.org/).

### 2. Clone the Repository

Clone the repository to your local machine using the following command:

```console
git clone https://github.com/GuidoEzequiel/Aureum_Automation_Framework_Challenge.git
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

npx wdio run ./wdio.conf.js
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

## Cucumber Configuration in Visual Studio Code

To enhance the usage with Cucumber in Visual Studio Code, I have set up the project with some specific configurations. These settings enable features like autocompletion and the ability to navigate from the `.feature` files to the step definitions easily.

### Prerequisites

Before starting, ensure to install 'Cucumber (Gherkin) Full Support' extension in Visual Studio Code. 
This extension provides syntax highlighting, snippets, and step definition navigation for Gherkin files.

You can install it directly from the Visual Studio Code Marketplace:

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "Cucumber (Gherkin) Full Support".
4. Click the "Install" button next to the extension.

### Project Settings

Once the extension is installed, it will use the following settings specified in your `settings.json` file to provide its features:

```json
{
    "cucumberautocomplete.steps": [
        "features/step-definitions/*.js"
    ],
    "cucumberautocomplete.syncfeatures": "features/*.feature",
}
```

## Current Implementations

This automation framework covers a variety of UI and API tests to validate the functionality of the application. Below are the tests currently implemented.

### UI Tests:

- **Add to Cart**:
  - Verify that an item can be added to the cart and is visible on the cart page.

- **Checkout Process**:
  - Ensure the user can complete the purchase/checkout process.

- **Sort by Price**:
  - Verify that inventory items can be sorted by price, high-to-low, and the sorting is correct.

- **Sort by Name**:
  - Ensure that inventory can be sorted by name, Z-to-A, and the sorting is correct.

### API Tests:

- **API Call Testing**:
  - Create tests for API calls (POST, GET, PUT, DELETE), setting headers, body, and making proper assertions. For examples of API Testing, refer to the Swagger documentation available at: [Swagger Petstore](https://petstore.swagger.io/)

### Bonus Task:

- **DOM Traversal Function**:
  - Implement a function in your automation framework that, given a DOM Element on the page, will visit the element itself and all of its descendants.
  - For each element, the function will pass that element to a provided callback function.
  - The arguments to the function are a DOM element and a callback function (that takes a DOM element as its argument).

# Pet Store API Automation Project

This project is designed to automate testing for the Pet Store API. The API allows for management of pet inventory, store orders, and user interactions within the Pet Store.

## Implemented Endpoints

- [x] `POST /pet/{petId}/uploadImage` - Uploads an image for a pet.
- [x] `POST /pet` - Add a new pet to the store.
- [x] `PUT /pet` - Update an existing pet.

## Remaining Endpoints to Implement

### Pet Endpoints
- [ ] `GET /pet/findByStatus` - Finds Pets by status.
- [ ] `GET /pet/findByTags` - Finds Pets by tags.
- [ ] `GET /pet/{petId}` - Find pet by ID.
- [ ] `POST /pet/{petId}` - Updates a pet in the store with form data.
- [ ] `DELETE /pet/{petId}` - Deletes a pet.

### Store Endpoints
- [ ] `GET /store/inventory` - Returns pet inventories by status.
- [ ] `POST /store/order` - Place an order for a pet.
- [ ] `GET /store/order/{orderId}` - Find purchase order by ID.
- [ ] `DELETE /store/order/{orderId}` - Delete purchase order by ID.

### User Endpoints
- [ ] `POST /user/createWithList` - Creates list of users with given input array.
- [ ] `GET /user/{username}` - Get user by user name.
- [ ] `PUT /user/{username}` - Update user.
- [ ] `DELETE /user/{username}` - Delete user.
- [ ] `GET /user/login` - Logs user into the system.
- [ ] `GET /user/logout` - Logs out current logged in user session.
- [ ] `POST /user/createWithArray` - Creates list of users with given input array.
- [ ] `POST /user` - Create user.

## PENDING TO IMPLEMENT:
 - Remove console.logs
 - Review and add Comments.
 - Use user data from a .json file instead of hardcoding it.
 - Encrypt credentials.
 - @tags for running different tests


## Considerations:
 - Cucumber expressions don't seem to be working with webdriver.io so Regex was used for passing parameters from the feature files.
 - 'And' cucumber notation does not work natively with webdriver.io in the step definitions.
 
 ### API Considerations

- I took the deliberate decision to include scenarios with explicit HTTP method details to test negative cases since the audience for this has technical knowledge evaluating API testing proficiency.
- This way looks more clear and directly shows how the API handles incorrect or unexpected usage.
- In scenarios involving non-technical people I would rather take the approach to keep this logic into the steps/api methods themselves. And use a less technical languaje to communicate it's actions in business terms.


## Contact

If you encounter any issues or have questions regarding the framework, feel free to contact me.

**Creator:**
Guido Ezequiel Sánchez -
GuidoEzequielSanchez31@gmail.com