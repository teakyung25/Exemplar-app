# Exemplar
## My project is called Exemplar.

### It is an application that connects mentors and mentees on a effective mentoring platform inside of specific nodes created by the administrator of the node.

# Learning Proccess

### Through my experience of programming this application I have learned and intergrated the following:
- Node.js
- Express.js
- PostgreSQL
- Bcyrpt.js
- Passport.js
- React.js
- Babel.js

### In this project I learned how to effectively create a node webserver using express and connecting the webserver to a database. This allows the application to complete more complex tasks it needs to accomplish on the frontend and the backend. I have also experimented with a front end library called react to make a more fluent and dynamic user experience. To summerize, the idea of backend development was something I wanted to understand and learn about, but it was alway hard to find a place to start, I was able to find a bit more sense of direct with this project. 

# Future 

### I will tried to deploy my application to the cloud, but limited budget has prevent a immediate migration, but is something to be implemented in the near future. 

# How to Use
1. Download the Application through the github
2. Download PostgreSQL on your Computer
3. Download Node.js on your Computer 
4. Open pgAdmin select the query tool on the top right of the left navigation. Put in the following lines:
```
CREATE TABLE public.nodes
(
    node_name text COLLATE pg_catalog."default" NOT NULL,
    join_code text COLLATE pg_catalog."default" NOT NULL,
    zip_code integer NOT NULL,
    admin_password text COLLATE pg_catalog."default" NOT NULL,
    fields text[] COLLATE pg_catalog."default",
    CONSTRAINT nodes_pkey PRIMARY KEY (node_name)
)
CREATE TABLE public.users
(
    firstname text COLLATE pg_catalog."default" NOT NULL,
    lastname text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role boolean NOT NULL,
    fields text[] COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    asso_node text COLLATE pg_catalog."default",
    messages text[] COLLATE pg_catalog."default",
    events text[] COLLATE pg_catalog."default",
    asso_users text[] COLLATE pg_catalog."default",
    pending_users text[] COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (username)
)
```
5. Click the lightning button and find your new tables under Databases => postgres => Schemas => Public => Tables
6. Do the following for both tables:
  - Download the corresponding csv file 
  - Right click on the table and click Import/Export
    - Toggle to Import
    - Select File
    - Configure Under Miscellaneous
      - Header to yes
      - Delimiter to comma
    - Click OK
    
