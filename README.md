- Folder Strcucture
  nolawi-bounty-hub/
  ├── backend/
  │ ├── Dockerfile
  │ ├── requirements.txt
  │ ├── main.py
  │ ├── database.py
  │ ├── models.py
  │ └── alembic.ini
  ├── frontend/
  │ ├── Dockerfile
  │ ├── package.json
  │ ├── next.config.js
  │ └── pages/
  │ ├── index.js
  │ ├── signin.js
  │ ├── signup.js
  │ ├── hacker.js
  │ ├── company.js
  │ └── admin.js
  └── docker-compose.yml
  
Test accounts for login.

  Account       	    password	type
hacker1@gmail.com	    123456	    hacker
hacker2@gmail.com	    123456	    hacker
hacker3@gmail.com	    123456	    hacker
bounty@securepay.com	    123456	    company
bounty@finvault.com	    123456	    company
bounty@codefort.com	    123456	    company
master@admin.com	    123456	    admin
