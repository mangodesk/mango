(async () => {
  const { messager, connect } = await window.bridge.initialize();

  console.log(messager)

  messager.handle('connect', async ({ connectionString }) => {
    console.log('on connect', { connectionString })
    const mongodb = await connect({ connectionString });

    const { databases, collections } = await mongodb.listDatabases()

    return {
      databases,
      collections
    }
  });
})();