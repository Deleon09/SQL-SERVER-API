
export const queries = {
    getAllProducts: 'SELECT * FROM Products',
    createNewProduct: 'INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)',
    getProductById: 'SELECT * FROM Products WHERE Id = @Id',
    deleteProduct: 'DELETE FROM Products WHERE Id = @Id',
    getTotalProducts: 'SELECT COUNT(*) AS Total FROM Products',
    updateProductById: 
        'UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id'
}