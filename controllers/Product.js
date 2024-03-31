const mysqlConnection = require('../connection')



const getData = (req, res) => {
    mysqlConnection.query('SELECT productdata.productId, productdata.productName ,categorydata.categoryName FROM productdata    INNER JOIN categorydata ON productdata.productId = categorydata.categoryId ', (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)

        }
    })
}

const CategoryData = (req, res) => {
    mysqlConnection.query('SELECT * from categorydata', (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)

        }
    })
}


const getPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const totalItemsQuery = 'SELECT COUNT(*) AS total FROM productdata';
        const dataQuery = `SELECT * FROM productdata LIMIT ${limit} OFFSET ${offset}`;

        const [totalResults] = await mysqlConnection.promise().query(totalItemsQuery);
        const [data] = await mysqlConnection.promise().query(dataQuery);

        const totalPages = Math.ceil(totalResults[0].total / limit);

        return res.status(200).json({
            data,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems: totalResults[0].total
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }

}

const PatchData = (req, res) => {
    var emp = req.body;
    mysqlConnection.query("UPDATE productdata SET ? WHERE productId=" + emp.productId, [emp], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            return res.status(200).send(rows)
        }
    })
}

const Patchcate = (req, res) => {
    var emp = req.body;
    mysqlConnection.query("UPDATE categorydata SET ? WHERE categoryId=" + emp.categoryId, [emp], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            return res.status(200).send(rows)
        }
    })
}

const ProductData = (req, res) => {
    var emp = req.body;
    var empdata = [emp.productId, emp.productName];
    mysqlConnection.query("INSERT INTO productdata(productId,productName) values(?)", [empdata], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)
        }
    })
}

const CateData = (req, res) => {
    var emp = req.body;
    var empdata = [emp.categoryId, emp.categoryName];
    mysqlConnection.query("INSERT INTO categorydata(categoryId,categoryName) values(?)", [empdata], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)
        }
    })
}

const PutData = (req, res) => {
    var emp = req.body;
    mysqlConnection.query("UPDATE productdata SET ? WHERE productId=" + emp.productId, [emp], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            if (rows.affectedRows == 0) {

                var empdata = [emp.productName];
                mysqlConnection.query("INSERT INTO productdata(productName) values(?)", [empdata], (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(rows)
                        return res.status(200).send(rows)
                    }
                })

            } else {
                return res.status(200).send(rows)
            }

        }
    })

}

const Putcategory = (req, res) => {
    var emp = req.body;
    mysqlConnection.query("UPDATE categorydata SET ? WHERE categoryId=" + emp.categoryId, [emp], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            if (rows.affectedRows == 0) {

                var empdata = [emp.categoryName];
                mysqlConnection.query("INSERT INTO productdata(categoryName) values(?)", [empdata], (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(rows)
                        return res.status(200).send(rows)
                    }
                })

            } else {
                return res.status(200).send(rows)
            }

        }
    })

}

const DeleteData = (req, res) => {
    mysqlConnection.query('DELETE FROM productdata WHERE productId=? ', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)
        }
    })
}

const Deletecate = (req, res) => {
    mysqlConnection.query('DELETE FROM categorydata WHERE categoryId=? ', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Something went wrong")
        } else {
            console.log(rows)
            return res.status(200).send(rows)
        }
    })
}

module.exports = { getData, getPage, PutData, PatchData, Patchcate, DeleteData, CategoryData, CateData, ProductData, Putcategory, Deletecate }