````markdown
# Nolawi Bounty Hub

![Nolawi Bounty Hub Cover Image](assets/cover-page.png)

**Nolawi Bounty Hub** is a platform designed to connect **whitehat hackers** and **bounty hunters** with Ethiopian and African companies that lack the resources or knowledge to secure their digital platforms. By bridging this gap, Nolawi Bounty Hub empowers companies to improve their cybersecurity while providing ethical hackers with opportunities to showcase their skills.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the System](#running-the-system)
4. [Deployment](#deployment)
5. [Links](#links)
6. [Team](#team)
7. [License](#license)

---

## Introduction

Nolawi Bounty Hub is a web application that allows **whitehat hackers** and **bounty hunters** to find and apply for bounties (security projects) posted by companies. Companies can post bounties, manage applications, and collaborate with ethical hackers to secure their platforms.

The main purpose of this project is to provide a platform for Ethiopian and African companies that have no way of finding or accessing the expertise of whitehat hackers and bounty hunters. Many companies in these regions lack the resources to secure their digital platforms, making them vulnerable to cyberattacks. Nolawi Bounty Hub bridges this gap by connecting companies with skilled ethical hackers who can help improve their security posture.

This project was developed as part of the ALX Portfolio Project.

---

## Features

Nolawi Bounty Hub offers the following key features:

### 1. Post and Find Bounties

- **Whitehat Hackers** and **Bounty Hunters** can browse available bounties and apply for projects that match their skills.
- **Companies** can post new bounties with detailed requirements and rewards.

### 2. Admins

- review and accept submitted applications and pass to payment processing.

---

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for the frontend)
- [Python](https://www.python.org/) (for the backend)
- [uv](https://github.com/encode/uv) (for running the FastAPI backend)
- [alembic](https://alembic.sqlalchemy.org/en/latest/) (for database migrations)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abelgroot/nolawi-bounty-hub.git
   cd nolawi-bounty-hub
   ```
````

2. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

### Running the System

1. Start the backend, frontend, and Docker logs in parallel:

   ```bash
   make -j3 all
   ```

2. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

---

## Links

- **Landing Page**: [Nolawi Bounty Hub Landing Page](https://nolawi-bounty-hub.vercel.app)
- **YouTube Video Demo**: [Watch the Demo](https://youtube.com/your-video-id)
- **GitHub Repository**: [Nolawi Bounty Hub Repo](https://github.com/abelgroot/nolawi-bounty-hub)

---

## Team

- **[Abel Groot](https://github.com/abelgroot)**
  - LinkedIn: [Abel Mulugeta](https://www.linkedin.com/in/abel-mulugeta-9892a042/)
  - GitHub: [abelgroot](https://github.com/abelgroot)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- ALX for the opportunity to work on this project.
- All contributors and mentors who provided guidance and support.

---

Thank you for visiting Nolawi Bounty Hub! We hope this platform helps Ethiopian and African companies secure their digital platforms while empowering whitehat hackers and bounty hunters to make a difference. 🚀
