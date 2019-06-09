import database from '../../../database/mysql';

class QueryMediator {

    queryConnection = (query, value = null) => {
        var appData = {
            'error': 1,
            'data': '',
            'satusCode': '',
            'dbResponse': []
        };
        console.log(query , 'values =', value);
        return new Promise((resolve, reject) => {
            database.connection.getConnection((err, connection) => {
                if (err) {
                    console.log('got error ' + err);
                    appData.error = err;
                    appData['data'] = 'Error Occured!';
                    appData['satusCode'] = 500;
                    reject(appData);
                } else {
                    connection.query(query, [value], function (err, rows) {
                        connection.release();
                        if (!err) {
                            appData.error = 0;
                            appData['data'] = '';
                            appData['satusCode'] = 201;
                            appData['dbResponse'] = rows;                            
                            resolve(appData);
                        } else {
                            appData.error = err;
                            appData['data'] = 'Error Occured!';
                            appData['satusCode'] = 400;
                            reject(appData);
                        }
                    });
                }
            });
        });
    }

}

export default new QueryMediator();