(async () => {
  const { messager, connect } = await window.bridge.initialize();

  console.log(messager)

  const mongodb = await connect({ connectionString: 'mongodb://localhost:27017'});

  console.log(await mongodb.listDatabases())

  messager.handle('connect', async ({ connectionString }) => {
    console.log('connectionString', connectionString)
  });
})();