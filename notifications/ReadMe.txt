Hello!

Please clone/download the repo in order to test the "notifications" project.

1: After using the Download as Zip method, extract only the 'notifications' folder and place it on your computer.
2: Access the folder with Visual Studio (any supported IDE).
3: Open two terminals. In first access the 'job' folder. In second access 'server' folder. In both terminals run `npm install`.
4. In the second terminal run `npm run dev`. This will run the Express Server.
5. In the first terminal run `npm run serve`. This will run the front-end.

Open the localhost, and click the notifications icon on the top right to open the notifications widget.

Inspect the network fetches. You will see that I receive a few identical notifications from different organizations in the 'newNotifications' response. The duplicates  will be combined into one.
In the notifications widget, you will see only 1 notification, with an array of organizations it came from.


Also, I added comments in the code. Please let me know if you have any questions by emailing me at haik.nersisian@gmail.com!



