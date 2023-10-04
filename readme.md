# TaskBoard - Kanban Board Style Task Management System

Organization

```javascript
 Email: admin@taskboard.com
 Password: 12345678
```

User 1

```javascript
Email: chandler@gmail.com
Password: 12345678
```

User 2:

```javascript
Email: johndoe@gmail.com
Password: 12345678
```

TaskBoard is a simple and effective task management system that allows organizations to register and manage their employees efficiently. This platform enables users to create boards, assign tasks to employees, and visualize the progress of tasks in a Kanban board style flow. With TaskBoard, your organization can streamline its task management process and improve productivity.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [How it Works](#how-it-works)
6. [Contributing](#contributing)
7. [Support](#support)
8. [License](#license)

## Introduction

TaskBoard is a web-based task management system built to simplify task organization within an organization. It provides an intuitive user interface that enables users to create boards and add employees, assign tasks to them, and track task progress in a visual Kanban board style. TaskBoard aims to boost team collaboration and enhance overall efficiency in handling tasks.

## Features

- User-friendly interface for easy task management.
- Create multiple boards to organize tasks based on different projects or departments.
- Add and manage employee profiles within the system.
- Assign tasks to specific employees and set due dates.
- Track task progress using the Kanban board view, with customizable status columns (e.g., "To Do," "In Progress," "Done").
- Drag and drop tasks across columns to update their status effortlessly.
- Mark tasks as completed and archive them for future reference.
- Receive email notifications for task assignments and updates.
- Responsive design, making it accessible from various devices.

## Installation

To get started with TaskBoard, follow these simple steps:

1. Clone the repository: `git clone https://github.com/codexsusan/taskboard`
2. Change directory to TaskBoard: `cd TaskBoard`
3. Install the required dependencies: `npm install`
4. Set up the database and configure your environment variables.
5. Start the server: `npm start`
6. Open your browser and access TaskBoard at `http://localhost:3000`

## Usage

Once TaskBoard is up and running, you can perform the following actions:

- **Register as Organization**: Register as an organization
- **Create a New Board**: Add a new board to the system for different projects or departments.
- **Add Employees**: Register employees within the organization and assign them to specific boards.
- **Create Tasks**: Add tasks to the boards and assign them to the respective employees.
- **Update Task Status**: Drag and drop tasks across columns to change their status.

## How it Works

TaskBoard utilizes a server-side and client-side architecture to manage tasks efficiently. The backend is built using [Node.js](https://nodejs.org) and [Express.js](https://expressjs.com/), with [PostgreSQL](https://www.postgresql.org/) as the database to store task data. The [PostgreSQL](https://www.postgresql.org/) database is accessed and managed using an Object-Relational Mapping (ORM) library, such as [Sequelize](https://sequelize.org/), to facilitate data manipulation.

The server handles API requests from the frontend, performing CRUD operations to manage organizations, boards, employees, stages and tasks. The frontend provides an interactive user interface that allows users to create boards, assign tasks, and visualize their progress in real-time.

## Contributing

We welcome contributions from the community! To contribute to TaskBoard, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your message here"`
4. Push the changes to your forked repository: `git push origin feature/your-feature-name`
5. Create a pull request to the main repository.

Please ensure your pull request adheres to the project's coding guidelines and includes relevant tests for any new features or bug fixes.

## Support

If you encounter any issues or need assistance with TaskBoard, feel free to [create an issue](https://github.com/codexsusan/taskboard/issues). We will do our best to address the problems and provide timely support.

## License

TaskBoard is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the software as per the terms of this license.

---

Thank you for choosing TaskBoard! We hope this platform helps your organization streamline its task management and improve productivity. If you have any questions or feedback, please do not hesitate to reach out. Happy tasking!
