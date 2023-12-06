# Instructions

## Generating Invoice

1. Clone the repository
2. Run the command `npm install`
3. Replace variables in index.js with your personal details.
4. Use the command `node index.js` to generate your own PDF

## Scheduling it as a cronjob

1. Make sure cron is installed on your system.
2. On Ubuntu you can quickly install cron by running the following command:
   `sudo apt update && sudo apt install cron`
3. Run the command `service cron status` to check if cron is running
4. From the terminal, enter edit mode for your user’s crontab using the following command: `crontab -e`
5. Read through the instructions on how to schedule a cronjob.
   ``
   just provide the full path to node /usr/local/bin/node in your cron job like:

30 6 1 \* \* /usr/local/bin/node /home/steve/example/script.js``

To find the node path, run the command: `which node`

6. Below is an example of the cronjob on my machine.
   `0 10 1 * * cd  /home/deuces/pp/autoInvoicer && /home/deuces/.asdf/shims/node index.js`
   This cronjob runs at 10am on the first of every Month.
   After setting the specific time at which you want the cronjob to run, input the commands that need to be executed.
   In the example above, first, I change directory to where the file is located. Then run `node index.js`.
