# Aureum - Test Automation Framework Challenge 

This repository contains an automation framework for testing purposes. 
The framework is built using WebDriverIO, Javascript, Cucumber and Page Object Model. 


## Dependency Installation

To set up the automation framework on your local machine, follow these steps:

### 1. Node.js Installation

Ensure you have Node.js installed on your system. You can download and install it from [here](https://nodejs.org/).

### 2. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/GuidoEzequiel/Aureum_Automation_Framework_Challenge.git
```

### 3. Navigate to the Project Directory
```bash
cd <project-directory>
```

### 4. Install Dependencies

Use npm (Node Package Manager) to install the required dependencies:

```bash
npm install
```

This command will install all the necessary packages specified in the `package.json` file.


## Running Tests:

### To run current tests, execute the following command:

```bash
npm run tests
```

## Troubleshooting

If you encounter issues running the tests after pulling changes or setting up the framework for the first time, it's possible that some dependencies have been updated. In such cases, it's recommended to update dependencies before rerunning the tests.

To update dependencies, run the following command:

```bash
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

## PENDING TO IMPLEMENT:
 - Encrypt credentials.
 - @tags Added - Configs for tags needed.
 - Defensive programming for APIs.


# Test Strategy Document

For a detailed overview of the testing approach, please check [Test Strategy Document](https://docs.google.com/document/d/1rBFE_hORTAgUARbvsjwHAXEWhhasDg7LBk3rQm9Ywt4/edit?usp=sharing).
The document is also uploaded here in this repo as:

```console
Test Strategy Document.pdf
```


## General Considerations:
 - Cucumber expressions don't seem to be working with webdriver.io so Regex was used for passing parameters from the feature files.
 - 'And' cucumber notation does not work natively with webdriver.io in the step definitions.
 
 ## API Considerations

- I took the deliberate decision to include scenarios with explicit HTTP method details to test negative cases since the audience for this has technical knowledge evaluating API testing proficiency.
- This way looks more clear and directly shows how the API handles incorrect or unexpected usage.
- In scenarios involving non-technical people I would rather take the approach to keep this logic into the steps/api methods themselves. And use a less technical languaje to communicate it's actions in business terms.
- I used cucumber because already dealt with front end ....


## Contact

If you encounter any issues or have questions regarding the framework, feel free to contact me.

**Creator:**
Guido Ezequiel Sánchez -
GuidoEzequielSanchez31@gmail.com