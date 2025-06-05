// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('db_NIMBUS');

// Create a new document in the collection.
db.getCollection('acessos').insertOne({
    
        "email": "admin@admin.com",
        "senha": "123",
        "admin": true
    
    

});
