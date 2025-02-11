import { exec } from 'child_process';

// Build the client bundle
exec(
  'vite build --outDir dist/client',
  (clientError, clientStdout, clientStderr) => {
    if (clientError) {
      console.error('Client build failed:', clientStderr);
      process.exit(1);
    }

    console.log('✅ Client build completed successfully!');

    // Build the server bundle into a separate folder
    exec(
      'vite build --ssr src/entryServer.js --outDir dist/server',
      (serverError, serverStdout, serverStderr) => {
        if (serverError) {
          console.error('Server build failed:', serverStderr);
          process.exit(1);
        }

        console.log('✅ Server build completed successfully!');
        console.log('🎉 All builds completed successfully!');
      }
    );
  }
);
