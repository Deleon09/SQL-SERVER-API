import { getConnection, sql, queries } from '../database';

export const getProducts = async(req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProducts);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
};

export const createNewProduct = async(req, res) => {

    const { name, description } = req.body;
    let { quantity } = req.body;

    if(name == null || description == null)
        return res.status(400).json({msg: 'Bad request. Please fill all fields.'});
    
    if(quantity == null) quantity = 0;

    try {
        const pool = await getConnection();

        await pool.request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .query(queries.createNewProduct);

        res.json({
            name,
            description,
            quantity,
            msg: 'Product created successfully'
        });
    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
}

export const getProductById = async(req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input("Id", sql.Int, id)
        .query(queries.getProductById);
        
        res.send(result.recordset[0]);

    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
}

export const deleteProductById = async(req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input("Id", sql.Int, id)
        .query(queries.deleteProduct);
        
        res.sendStatus(204);

    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
}

export const getTotalProducts = async(req, res) => {

    try {
        const pool = await getConnection();

        const result = await pool.request()
        .query(queries.getTotalProducts);
        
        res.send(result.recordset[0]);

    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
}

export const updateProductById = async(req, res) => {

    const { id } = req.params;
    const { name, description, quantity } = req.body;

    if(name == null || description == null || quantity == null)
        return res.status(400).json({msg: 'Bad request. Please fill all fields.'});

    try {
        const pool = await getConnection();

        await pool.request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .input("id", sql.Int, id)
            .query(queries.updateProductById);
        
        res.status(200).json({
            name,
            description,
            quantity,
            msg: 'Updated!'
        });

    } catch (error) {
        res.status(500);
        res.send("Something went wrong.");
        console.log(error);
    }
}