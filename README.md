# DevTinder

- Create vite + react app
- Install tailwind and daisyUI
- Add Navbar using readymade daisyUI
- Create a navbar component for seprate file
- Install React router dom
- Create BrowserRouter > Routes > Route (Body) > Route children
- Create outlet in body component
- Create footer component in the body component
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever you are making API call so pass axios => { withCredentials: true }
- install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in th store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Conenction REquests
- Feature - Accept/Reject connection request
- Send/Ignore the user card from the feed
- Signup New User
- E2E testing

Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile

# Deployment

- Signup on AWS
- Launch new instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com (To login server)
- Install Node version 18.19.1 (Project current version installing on server).
- Git clone to devTinder && devTinder-web in server.
- Frontend
  - npm install -> dependencies install
  - npm run build (To create dist folder for production)
  - sudo apt update
  - sudo apt install nginx (to create webserver in aws)
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\*/ /var/www/html/
    - scp -> Copy
    - -r -> recursive
    - /\* -> in dist all folders
    - last cmd this location paste it.
  - nginx create and run a server in port 80.
  - Enable port :80 of your instance in security tab in aws site
- Backend
  - allowed ec2 instance (server IP address) on mongoDB server
  - npm install pm2 -g (to run backend server 24/7)
  - pm2 start npm --name "devTinder-backend" --start
  - pm2 logs
  - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api"

# Ngxinx config

Frontend = http://3.110.118.14/
Backend = http://3.110.118.14/:3000/

Domain name = devtinder.com => 3.110.118.14

Frontend = devtinder.com
Backend = devtinder.com:7777 => devtinder.com/api

nginx config :

server_name 3.110.118.14;

location /api/ {
proxy_pass http://localhost:3000/; # Pass the request to the Node.js app
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
