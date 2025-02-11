import express from 'express';
import fs from 'fs';
import path from 'path';
import { render } from './dist/server/entryServer.js'; // Import the compiled server bundle

const server = express();

// Serve static files from the dist/client folder
server.use(express.static('dist/client'));

// Handle all routes
server.get('*', async (req, res) => {
  try {
    // Render the app for the given URL
    const { html } = await render(req.url);

    // Read the index.html template
    const template = fs.readFileSync(
      path.resolve('dist/client/index.html'),
      'utf-8'
    );

    // Replace the SSR placeholder with the rendered HTML
    const appHtml = template.replace('<!--ssr-outlet-->', html);

    // Send the rendered HTML to the client
    res.status(200).send(appHtml);
  } catch (error) {
    // Handle errors
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
