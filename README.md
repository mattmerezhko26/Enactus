### Development and Maintenance Environment

#### Required Tools  
Before starting development or maintenance, make sure the following tools are installed:  
- **VS Code**: Used for editing and debugging code. It's recommended to install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extensions for better workflow.  
- **Git**: Used for version control. Familiarity with basic commands like `git clone`, `git pull`, etc., is required.  
- **Node.js and npm**: Install [Node.js](https://nodejs.org/) LTS version 16 or above, which will also install npm for managing project dependencies.

---

#### Checking Node.js Version  

To confirm that Node.js is installed and check its version, use the following command:

```bash
node -v
```

This will output the version of Node.js installed on your machine. For example, if you have Node.js version 20 or higher, the output will look like:

```
v20.x.x
```

If you have an older version of Node.js, you can download the latest **LTS** version (20 or above) from the official [Node.js website](https://nodejs.org/).

---

#### Local Environment Setup  

1. **Clone the project code**  
   Use the following command to clone the project code from GitHub to your local machine:  
   ```bash
   git clone https://github.com/mattmerezhko26/Enactus.git
   cd Enactus
   ```

2. **Create a new branch before making changes**  
   Always create a new branch before making any changes to avoid modifying the `main` branch. Use the following command to create and switch to a new branch:  
   ```bash
   git checkout -b <new-branch-name>
   ```

3. **Install dependencies**  
   Make sure you're in the root project directory and run the following command to install all dependencies:  
   ```bash
   npm install
   ```

4. **Compile SCSS**  
   To compile SCSS to CSS, use the following command:  
   ```bash
   npm run sass
   ```  

---

#### Development Tools Configuration  
- **Gulp**: This project uses Gulp for automating SCSS compilation. The following modules are required:  
  - `gulp`: version `^5.0.0`  
  - `gulp-sass`: version `^5.1.0`  
  - `sass`: version `^1.80.6`  

  If you need to modify Gulp configurations, refer to the `gulpfile.js` file.  

---

#### Common Issues  

1. **Incorrect VS Code Path**  
   - Make sure to open VS Code from the root project folder to avoid path issues and ensure the correct project structure.  
   - **Wrong Example**: Opening VS Code from `Enactus/Enactus` (Totally Not Recommended)  
   - **Correct Example**: Open VS Code from the **`Enactus`** root folder.  

2. **Can't Find the `npm run sass` Command**  
   - Ensure you have run `npm install` to install all dependencies.  
   - Verify that the directory contains the `package.json` file and that the `scripts` section includes:  
     ```json
     "scripts": {
       "sass": "gulp sass"
     }
     ```

3. **SCSS Compilation Fails**  
   - Check for syntax errors in the SCSS files and ensure the directory structure matches the Gulp task configuration.  