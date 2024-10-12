const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const port = 4588;

// Simple in-memory inventory, initially empty or with some predefined items
let inventory = {};

// Initially set fetch to null
let fetch = null;

// Dynamically import node-fetch
(async () => {
    fetch = (await import('node-fetch')).default;

    // Function to send Discord alerts
    const sendDiscordAlert = async (item, quantity) => {
        const webhookUrl = 'https://discord.com/api/webhooks/1213490469305192458/GOOfE8wi8xh9FNwL_evq2JekBvpQk155C7fiO0hwePQlBWqPpupi88Yl2tE4XDX4Rd10'; // Discord webhook
    
        const message = {
            content: `Inventory Alert: Inventory for ${item} is low (${quantity} left).`
        };
    
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            if (response.ok) {
                console.log('Alert sent to Discord successfully.');
            } else {
                console.error('Failed to send alert to Discord.', response.statusText);
            }
        } catch (error) {
            console.error('Error sending alert to Discord:', error);
        }
    };

    // Endpoint to update inventory
    app.post('/updateInventory', (req, res) => {
        const { item, quantity } = req.body;
        if (typeof quantity === 'number') {
            inventory[item] = quantity; 
            console.log(`Inventory updated for ${item}: ${quantity} items.`);
            res.send(`Inventory updated for ${item}: ${quantity} items.`);
            if (inventory[item] < 5) {
                sendDiscordAlert(item, inventory[item]);
            }
        } else {
            res.status(400).send('Invalid request. Please specify both an item and a quantity.');
        }
    });

    // Start the server and listen on the specified port
    const server = app.listen(port, () => {
        console.log(`Inventory microservice running on port ${port}`);
    });

    // Attach an error listener to the server
    server.on('error', (error) => {
        console.error('Server error:', error);
    });

})();