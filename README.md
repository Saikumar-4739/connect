# Connect

Chat App Features

-Authentication
-Messeging
-Voice/Video Calls 
-Channels
-Integrations(Drive, Dropbox, GitHub, etc...)
-Notifications
-Collabration(White Board, Task Assinments, Comments on Shared Files)
-Search 
-Admin Dashboard



Tech Stack

-HTML
-CSS
-JavaScript/TypeScript
-React Js
-Web Scokets, Socket.io
-Redux
-Node JS 
-Nest Js
-MySQL
-Json Web Tokens
-AWS S3
-FireBase

Security

-End to End Encryption
-Role Based Access Control
-Data Backup
-Complience(GDPR, HIPPA)


npx create-nx-workspace connect --preset=ts

cd connect

npm install nx@20.0.5
npm install @nrwl/cli@15.9.3
npm install @nrwl/js@19.4.2
npm install @nrwl/nest@19.6.2
npm install @nrwl/react@19.7.2
npm install @nrwl/workspace@19.7.3


nx g @nrwl/nest:application services/masters

nx generate @nrwl/react:application ui

mkdir libs
cd libs

npx nx generate @nrwl/nest:library backend-utils
npx nx generate @nrwl/nest:library shared-models
npx nx generate @nrwl/nest:library shared-services


nx serve ui

nx serve services-masters

